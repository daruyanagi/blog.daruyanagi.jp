---
date: 2017-07-02T05:21:35.0000000
draft: false
title: "WinRT：システムにインストールされた Windows ストア アプリを列挙する（3）"
tags: []
eyecatch: 
---
<p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2014%2F09%2F11%2F025615" title="WinRT：システムにインストールされた Windows ストア アプリを列挙する（2） - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2014/09/11/025615">blog.daruyanagi.jp</a></cite></p><p>3年前のブログ記事のソースコードを（ググったらでてきた……）そのままコピーしても動かなかったので。</p><p>復習しておくと、システムにインストールされた Windows ストア アプリを列挙するフローはこんな感じ。</p>

<ul>
<li>Windows.Management.Deployment.PackageManager の FindPackages() などでパッケージ package を取得</li>
<li>package.DisplayName は残念ながら空
<ul>
<li>package.InstalledLocation.Path にある AppxManifest.xml を解析して取得する</li>
<li>Description や Logo なども同様の手段で取得</li>
</ul></li>
<li>AppxManifest.xml から DisplayName を取得すると ms-resource:// で記述されている場合がある
<ul>
<li>SHLoadIndirectString() API で文字列を取得する</li>
</ul></li>
</ul><p>まず、AppxManifest.xml を解析。前回との違いは、ネームスペースが変わっていても大丈夫なよう LocalName で要素を探すようにしたところぐらい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">string</span> GetDisplayNameFromManifest(<span class="synType">string</span> installedPath)
{
var xml = File.ReadAllText(Path.Combine(installedPath, <span class="synConstant">&quot;AppxManifest.xml&quot;</span>));
var doc = XDocument.Parse(xml);
var <span class="synStatement">value</span> = doc.Descendants().First(_ =&gt; _.Name.LocalName == <span class="synConstant">&quot;DisplayName&quot;</span>).Value;

<span class="synStatement">return</span> <span class="synStatement">value</span>;
}
</pre><p>次に ms-resource:// で記述されている場合の処理。ms-resource:// の書き方は数パターンあるようで、それに応じて処理を変えないといけない。</p>

<ul>
<li>ms-resource://Microsoft.SkypeApp/Resources/SkypeVideo_ProductName</li>
<li>ms-resource:///Resources/AppStoreName</li>
<li>ms-resource:PackageDisplayName</li>
</ul><p>最初のパターンに寄せてから、SHLoadIndirectString() を使うことにした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>
[DllImport(<span class="synConstant">&quot;shlwapi.dll&quot;</span>, BestFitMapping = <span class="synConstant">false</span>, CharSet = CharSet.Unicode, ExactSpelling = <span class="synConstant">true</span>, SetLastError = <span class="synConstant">false</span>, ThrowOnUnmappableChar = <span class="synConstant">true</span>)]
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">extern</span> <span class="synType">int</span> SHLoadIndirectString(<span class="synType">string</span> pszSource, StringBuilder pszOutBuf, <span class="synType">int</span> cchOutBuf, IntPtr ppvReserved);

<span class="synType">private</span> <span class="synType">string</span> GetTextFromResource(<span class="synType">string</span> installedPath, <span class="synType">string</span> name, <span class="synType">string</span> key)
{
var pri = Path.Combine(installedPath, <span class="synConstant">&quot;resources.pri&quot;</span>);
var resourceKey = <span class="synType">string</span>.Empty;

<span class="synStatement">if</span> (key.Contains(name))
{
<span class="synComment">// キーにアプリ名が含まれているパターン → そのままリソースキーとして扱う</span>
<span class="synComment">// ms-resource://Microsoft.SkypeApp/Resources/SkypeVideo_ProductName</span>
resourceKey = key;
}
<span class="synStatement">else</span>
{
<span class="synComment">// リソースキーの解析が必要なパターン</span>
<span class="synComment">// → とりあえずプロトコルを省く</span>
<span class="synComment">// ms-resource:///Resources/AppStoreName</span>
<span class="synComment">// ms-resource:/manifest/DisplayName</span>
<span class="synComment">// ms-resource:PackageDisplayName</span>
resourceKey = key.Split(<span class="synConstant">':'</span>).Last();

<span class="synStatement">if</span> (resourceKey.StartsWith(<span class="synConstant">&quot;/&quot;</span>))
{
<span class="synComment">// パスになっているパターン → アプリ名入りのパスに</span>
<span class="synComment">// :///Resources/AppStoreName</span>
<span class="synComment">// :/manifest/DisplayName</span>
resourceKey = resourceKey.TrimStart(<span class="synConstant">'/'</span>);
resourceKey = $<span class="synConstant">&quot;ms-resource://{name}/{resourceKey}&quot;</span>;
}
<span class="synStatement">else</span>
{
<span class="synComment">// リソース名になっているパターン → リソースへのパスに</span>
<span class="synComment">// :PackageDisplayName</span>
resourceKey = $<span class="synConstant">&quot;ms-resource://{name}/resources/{resourceKey}&quot;</span>;
}
}

var buffer = <span class="synStatement">new</span> StringBuilder(<span class="synConstant">1024</span>); <span class="synComment">// ← 適当</span>

var result = SHLoadIndirectString(
$<span class="synConstant">&quot;@{{{pri}? {resourceKey}}}&quot;</span>,
buffer, buffer.Capacity,
IntPtr.Zero
);

<span class="synComment">// 失敗したときはパスをそのまま返しておく</span>
<span class="synStatement">return</span> result == <span class="synConstant">0</span> ? buffer.ToString() : key;
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170702051825.png" alt="f:id:daruyanagi:20170702051825p:plain" title="f:id:daruyanagi:20170702051825p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>うまくいっているみたい。「ストア」アプリと表記の違うパッケージもあるけど、今のところは気にしないことにする。</p>
