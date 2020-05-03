---
date: 2014-09-11T02:56:15.0000000
draft: false
title: "WinRT：システムにインストールされた Windows ストア アプリを列挙する（2）"
tags: ["Windows Runtime"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140911/20140911023459.png
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/09/10/021908">WinRT&#xFF1A;&#x30B7;&#x30B9;&#x30C6;&#x30E0;&#x306B;&#x30A4;&#x30F3;&#x30B9;&#x30C8;&#x30FC;&#x30EB;&#x3055;&#x308C;&#x305F; Windows &#x30B9;&#x30C8;&#x30A2; &#x30A2;&#x30D7;&#x30EA;&#x3092;&#x5217;&#x6319;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で未解決だった問題を解決しておく。</p>

<div class="section">
<h3>AppxManifest.xml を読んで DisplayName などを取得する</h3>
<p>とりあえず動けばいいので、dynamic（System.Dynamic.ExpandoObject）に AppxManifest.xml で読み込んだ DisplayName、Description、Logo などをぶち込んで ViewModel を作った。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WinRTAppsUpdateChecker
{
<span class="synStatement">using</span> System.IO;
<span class="synStatement">using</span> System.Xml.Linq;
<span class="synStatement">using</span> Windows.Management.Deployment;

<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// MainWindow.xaml の相互作用ロジック</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synStatement">partial</span> <span class="synType">class</span> MainWindow : Window
{
<span class="synType">public</span> MainWindow()
{
InitializeComponent();

var manager = <span class="synStatement">new</span> PackageManager();
var packages = manager
.FindPackagesForUser(<span class="synType">string</span>.Empty)
.Select(_ =&gt;
{
dynamic result = <span class="synStatement">new</span> System.Dynamic.ExpandoObject();
result.Id = _.Id;

<span class="synStatement">try</span>
{
var path = _.InstalledLocation.Path; <span class="synComment">// -&gt; exception</span>
var xml = File.ReadAllText(Path.Combine(path, <span class="synConstant">&quot;AppxManifest.xml&quot;</span>));
var doc = XDocument.Parse(xml);
XNamespace ns = <span class="synConstant">&quot;http://schemas.microsoft.com/appx/2010/manifest&quot;</span>;

result.InstalledLocation = path;
result.DisplayName = doc.Descendants(ns + <span class="synConstant">&quot;DisplayName&quot;</span>).First().Value;
<span class="synComment">// result.Description = doc.Descendants(ns + &quot;Description&quot;).First().Value;</span>
result.PublisherDisplayName = doc.Descendants(ns + <span class="synConstant">&quot;PublisherDisplayName&quot;</span>).First().Value;
result.Logo = doc.Descendants(ns + <span class="synConstant">&quot;Logo&quot;</span>).First().Value;
result.OSMinVersion = doc.Descendants(ns + <span class="synConstant">&quot;OSMinVersion&quot;</span>).First().Value;
result.OSMaxVersionTested = doc.Descendants(ns + <span class="synConstant">&quot;OSMaxVersionTested&quot;</span>).First().Value;
<span class="synComment">// result.BackgroundColor = doc.Descendants(ns + &quot;VisualElements&quot;).First().Attributes(&quot;BackgroundColor&quot;).First().Value;</span>
}
<span class="synStatement">catch</span> (Exception e)
{
result.Error = e.Message;
}
<span class="synStatement">return</span> result;
}).ToList();

DataContext = <span class="synStatement">new</span>
{
Packages = packages,
};
}
}
}
</pre><p>相変わらずダックタイピングでコーディングしてるので汚いけど、基本的に XDocument で読んでいるだけ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140911023459.png" alt="f:id:daruyanagi:20140911023459p:plain" title="f:id:daruyanagi:20140911023459p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちゃんととれているみたい。</p><p>Description はない場合も多い。タイルの背景色も取得したかったけれど、書いてない AppxManifest.xml も少なくない感じ。もうちょっと調査してみよう。</p>

</div>
<div class="section">
<h3>resources.pri を読んでリソース文字列を取得する</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140911023541.png" alt="f:id:daruyanagi:20140911023541p:plain" title="f:id:daruyanagi:20140911023541p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっきのでだいたいうまくいったかなと思ったのだけど、DisplayName は（おそらく多言語対応のため）ms-resource で指定されている場合がある。ガッデム！</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/windows/apps/jj552947.aspx">Resource Management System | Microsoft Docs</a></li>
</ul><p>これを読むには、<a href="http://msdn.microsoft.com/en-us/library/windows/desktop/bb759919(v=vs.85).aspx">SHLoadIndirectString function | Microsoft Docs</a> を利用する。</p>

<ul>
<li><a href="http://www.pinvoke.net/default.aspx/shlwapi.shloadindirectstring">pinvoke.net: shloadindirectstring (shlwapi)</a></li>
</ul><pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WinRTAppsUpdateChecker
{
<span class="synStatement">using</span> System.IO;
<span class="synStatement">using</span> System.Runtime.InteropServices;
<span class="synStatement">using</span> System.Xml.Linq;
<span class="synStatement">using</span> Windows.Management.Deployment;

<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// MainWindow.xaml の相互作用ロジック</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synStatement">partial</span> <span class="synType">class</span> MainWindow : Window
{
[DllImport(<span class="synConstant">&quot;shlwapi.dll&quot;</span>, BestFitMapping = <span class="synConstant">false</span>, CharSet = CharSet.Unicode, ExactSpelling = <span class="synConstant">true</span>, SetLastError = <span class="synConstant">false</span>, ThrowOnUnmappableChar = <span class="synConstant">true</span>)]
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">extern</span> <span class="synType">int</span> SHLoadIndirectString(<span class="synType">string</span> pszSource, StringBuilder pszOutBuf, <span class="synType">int</span> cchOutBuf, IntPtr ppvReserved);

<span class="synType">public</span> MainWindow()
{
InitializeComponent();

var manager = <span class="synStatement">new</span> PackageManager();
var packages = manager
.FindPackagesForUser(<span class="synType">string</span>.Empty)
.Select(_ =&gt;
{
dynamic result = <span class="synStatement">new</span> System.Dynamic.ExpandoObject();
result.Id = _.Id;

<span class="synStatement">try</span>
{
var path = _.InstalledLocation.Path; <span class="synComment">// -&gt; exception</span>
var xml = File.ReadAllText(Path.Combine(path, <span class="synConstant">&quot;AppxManifest.xml&quot;</span>));
var doc = XDocument.Parse(xml);
XNamespace ns = <span class="synConstant">&quot;http://schemas.microsoft.com/appx/2010/manifest&quot;</span>;

result.InstalledLocation = path;
result.DisplayName = doc.Descendants(ns + <span class="synConstant">&quot;DisplayName&quot;</span>).First().Value;
<span class="synComment">// ここから</span>
<span class="synStatement">if</span> ((result.DisplayName <span class="synStatement">as</span> <span class="synType">string</span>).StartsWith(<span class="synConstant">&quot;ms-resource&quot;</span>))
{
var pri = Path.Combine(path, <span class="synConstant">&quot;resources.pri&quot;</span>);
var resourceKey = (result.DisplayName <span class="synStatement">as</span> <span class="synType">string</span>).Split(<span class="synConstant">':'</span>).Last();
var resourcePath = <span class="synType">string</span>.Format(<span class="synConstant">&quot;@{{{0}? ms-resource://{1}/resources/{2}}}&quot;</span>, pri, _.Id.Name, resourceKey);
var buffer = <span class="synStatement">new</span> StringBuilder(<span class="synConstant">1024</span>);
SHLoadIndirectString(resourcePath, buffer, buffer.Capacity, IntPtr.Zero);
result.DisplayName = buffer.ToString();
}
<span class="synComment">// ここまで</span>
<span class="synComment">// result.Description = doc.Descendants(ns + &quot;Description&quot;).First().Value;</span>
result.PublisherDisplayName = doc.Descendants(ns + <span class="synConstant">&quot;PublisherDisplayName&quot;</span>).First().Value;
result.Logo = doc.Descendants(ns + <span class="synConstant">&quot;Logo&quot;</span>).First().Value;
result.OSMinVersion = doc.Descendants(ns + <span class="synConstant">&quot;OSMinVersion&quot;</span>).First().Value;
result.OSMaxVersionTested = doc.Descendants(ns + <span class="synConstant">&quot;OSMaxVersionTested&quot;</span>).First().Value;
<span class="synComment">// result.BackgroundColor = doc.Descendants(ns + &quot;VisualElements&quot;).First().Attributes(&quot;BackgroundColor&quot;).First().Value;</span>
}
<span class="synStatement">catch</span> (Exception e)
{
result.Error = e.Message;
}
<span class="synStatement">return</span> result;
}).ToList();

DataContext = <span class="synStatement">new</span>
{
Packages = packages,
};
}
}
}
</pre><p>リソースのパスの指定がよくわかんなかったのだけど、いろいろ試した結果、これでイケている感じ。ms-resource の読み込み処理はべた書きしたけど、ViewModel をちゃんとクラス化するときに関数にパッケージングして、Description などがリソースで指定されているときにも対応できるようにしておけばいいと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140911025259.png" alt="f:id:daruyanagi:20140911025259p:plain" title="f:id:daruyanagi:20140911025259p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちゃんと名前もとれている感じ。よくみたら WinJS の名前が取れてないケド、見ないことにした。</p>

</div>
<div class="section">
<h3>追記（2014/09/11 03:08）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140911030830.png" alt="f:id:daruyanagi:20140911030830p:plain" title="f:id:daruyanagi:20140911030830p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>リソースパスの指定方法をちょっと変えたら、WinJS にも対応できた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var resourceKey = (result.DisplayName <span class="synStatement">as</span> <span class="synType">string</span>).Split(<span class="synConstant">':'</span>).Last();
<span class="synStatement">if</span> (!resourceKey.StartsWith(<span class="synConstant">&quot;/&quot;</span>)) resourceKey = <span class="synConstant">&quot;/resources/&quot;</span> + resourceKey;
var resourcePath = <span class="synType">string</span>.Format(<span class="synConstant">&quot;@{{{0}? ms-resource://{1}{2}}}&quot;</span>, pri, _.Id.Name, resourceKey);
</pre><p>だたキーが指定されているときは /resources/* で、階層付きで指定されているときはそれをそのまま渡してやればいいみたい。ドキュメントちゃんと読んでないから知らんけど。</p>

</div>