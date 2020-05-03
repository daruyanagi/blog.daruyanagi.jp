---
date: 2014-06-06T13:57:49.0000000
draft: false
title: "インストール済みの Windows Store Apps を列挙する"
tags: ["Windows Runtime"]
eyecatch: 20140606135118.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606135118.png" alt="f:id:daruyanagi:20140606135118p:plain" title="f:id:daruyanagi:20140606135118p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>方針</h3>
<p><a href="http://msdn.microsoft.com/ja-jp/library/windows/apps/br240968.aspx">PackageManager.FindPackagesForUser(String) Method (Windows)</a> を使えばよい――が、この API は Windows Store Apps では使うことができない。今回は Windows Desktop Apps （コンソール）からこの API を呼んでみる。</p>

</div>
<div class="section">
<h3>準備</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606133749.png" alt="f:id:daruyanagi:20140606133749p:plain" title="f:id:daruyanagi:20140606133749p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>適当にコードを書いて実行すると、</p>

<blockquote>
<p>アセンブリ 'System.Runtime, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a' への参照を追加してください。</p>

</blockquote>
<p>というエラーが出る。とりあえず System.Runtime を参照に追加しろということらしいがどうすればよいのだろう……と思ったら、<a href="http://www.atmarkit.co.jp/ait/articles/1304/26/news058_2.html">&#x7279;&#x96C6;&#xFF1A;&#x30C7;&#x30B9;&#x30AF;&#x30C8;&#x30C3;&#x30D7;&#x3067;&#x3082;WinRT&#x6D3B;&#x7528;&#xFF1A;&#x958B;&#x767A;&#x8005;&#x304C;&#x77E5;&#x3063;&#x3066;&#x304A;&#x304F;&#x3079;&#x304D;&#x3001;&#x30E9;&#x30A4;&#x30D6;&#x30E9;&#x30EA;&#x3068;&#x3057;&#x3066;&#x306E;Windows&#x30E9;&#x30F3;&#x30BF;&#x30A4;&#x30E0; (2/5) - &#xFF20;IT</a> に解決策があった。</p><p>まとめると、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134302.png" alt="f:id:daruyanagi:20140606134302p:plain" title="f:id:daruyanagi:20140606134302p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロジェクトを一度アンロードして……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134305.png" alt="f:id:daruyanagi:20140606134305p:plain" title="f:id:daruyanagi:20140606134305p:plain" class="hatena-fotolife" itemprop="image"></span></p><p> *.csproj ファイルを編集し……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134309.png" alt="f:id:daruyanagi:20140606134309p:plain" title="f:id:daruyanagi:20140606134309p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>TargetPlatformVersion を 8.0 にする。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;Project </span><span class="synType">ToolsVersion</span>=<span class="synConstant">&quot;12.0&quot;</span><span class="synIdentifier"> </span><span class="synType">DefaultTargets</span>=<span class="synConstant">&quot;Build&quot;</span><span class="synIdentifier"> </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/developer/msbuild/2003&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Import </span><span class="synType">Project</span>=<span class="synConstant">&quot;$(MSBuildExtensionsPath)\$(MSBuildToolsVersion)\Microsoft.Common.props&quot;</span><span class="synIdentifier"> </span><span class="synType">Condition</span>=<span class="synConstant">&quot;Exists('$(MSBuildExtensionsPath)\$(MSBuildToolsVersion)\Microsoft.Common.props')&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;PropertyGroup&gt;</span>
:
:
<span class="synIdentifier">&lt;TargetPlatformVersion&gt;</span>8.0<span class="synIdentifier">&lt;/TargetPlatformVersion&gt;</span> // <span class="synIdentifier">&lt;-- この行を追加</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134457.png" alt="f:id:daruyanagi:20140606134457p:plain" title="f:id:daruyanagi:20140606134457p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>で、もう一度プロジェクトを読み込んで［参照の追加］をすると、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134515.png" alt="f:id:daruyanagi:20140606134515p:plain" title="f:id:daruyanagi:20140606134515p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［Windows］という欄ができている。今回は、パッケージ関連の API を利用するので Windows.Management と Windows.ApplicationModel を参照に追加。さらに、最初のビルドエラーで要求されていた System.Runtime も参照に追加しておく。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606134654.png" alt="f:id:daruyanagi:20140606134654p:plain" title="f:id:daruyanagi:20140606134654p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>“%ProgramFiles(x86)%\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5\Facades\System.Runtime.dll”ファイルを指定して参照に加える。これで準備は完了。</p>

</div>
<div class="section">
<h3>コード</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Text;
<span class="synStatement">using</span> System.Threading.Tasks;

<span class="synType">namespace</span> Sample3
{
<span class="synStatement">using</span> Windows.Management.Deployment;

<span class="synType">class</span> Program
{
<span class="synType">static</span> <span class="synType">void</span> Main(<span class="synType">string</span>[] args)
{
var manager = <span class="synStatement">new</span> PackageManager();
var packages = manager.FindPackagesForUser(<span class="synType">string</span>.Empty);

<span class="synStatement">foreach</span> (var package <span class="synStatement">in</span> packages)
{
Console.WriteLine(package.DisplayName);
Console.WriteLine(package.Id.Name);
Console.WriteLine(package.Id.Publisher);
Console.WriteLine(package.Id.FullName);
Console.WriteLine(package.Id.FamilyName);
Console.WriteLine(package.Id.Version.Major);
Console.WriteLine(package.Id.Version.Minor);
Console.WriteLine(package.Id.Version.Build);
Console.WriteLine(package.Id.Version.Revision);
Console.WriteLine(package.Description);
Console.WriteLine(package.PublisherDisplayName);
Console.WriteLine(<span class="synConstant">&quot;---&quot;</span>);
}

Console.ReadKey();
}
}
}
</pre><p>適当にこんな感じにして実行。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140606135118.png" alt="f:id:daruyanagi:20140606135118p:plain" title="f:id:daruyanagi:20140606135118p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>package.DisplayName や package.Description などが表示されないが、この情報はそもそも提供されていないらしい。がっかりだ。</p><p>ただ、 <a href="https://github.com/luisrigoni/metro-apps-list">luisrigoni/metro-apps-list &middot; GitHub</a> で示されているように、Win32 API で PRI を読むなどすれば取得できないこともないらしい。だいぶ面倒だな……。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/windows/apps/jj552947.aspx">&#x30EA;&#x30BD;&#x30FC;&#x30B9;&#x7BA1;&#x7406;&#x30B7;&#x30B9;&#x30C6;&#x30E0; (Windows)</a></li>
</ul>
</div>