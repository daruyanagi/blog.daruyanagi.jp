---
date: 2014-09-10T02:19:08.0000000
draft: false
title: "WinRT：システムにインストールされた Windows ストア アプリを列挙する"
tags: ["Windows Runtime"]
eyecatch: 20140910015930.png
---
<p>WPF アプリケーションからシステムにインストールされた Windows ストア アプリを列挙するには、この Windows Runtime API を使えばいいらしい。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/windows/apps/br240968.aspx">PackageManager.FindPackagesForUser(String) Method (Windows)</a></li>
</ul><p>ちなみに、Windows ストア アプリからは利用できないとのこと。</p>

<div class="section">
<h3>準備</h3>
<p>というわけで、この API を使うために諸々の準備を行う。</p>

<div class="section">
<h4>ターゲットプラットフォームバージョンを指定</h4>
<p>まず *.csproj ファイルをテキストエディターなどで開き、ターゲットプラットフォームとして Windows 8 以降を指定する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910015930.png" alt="f:id:daruyanagi:20140910015930p:plain" title="f:id:daruyanagi:20140910015930p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロジェクトを一度アンロード。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910020152.png" alt="f:id:daruyanagi:20140910020152p:plain" title="f:id:daruyanagi:20140910020152p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロジェクトフォルダをエクスプローラで開く。いつからかコンテキストメニューにこのコマンドが追加されていてうれしい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910020215.png" alt="f:id:daruyanagi:20140910020215p:plain" title="f:id:daruyanagi:20140910020215p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>TargetPlatformVersion<a href="http://msdn.microsoft.com/ja-jp/library/microsoft.build.utilities.targetplatformsdk.targetplatformversion(v=vs.110).aspx">TargetPlatformSDK.TargetPlatformVersion &#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3; (Microsoft.Build.Utilities)</a> を記述して保存。プロジェクトをリロード。</p>

</div>
<div class="section">
<h4>winmd を参照に追加</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910020337.png" alt="f:id:daruyanagi:20140910020337p:plain" title="f:id:daruyanagi:20140910020337p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に、winmd を参照に追加。パスが長いけれど、コモンダイアログで winmd を検索すれば簡単に見つかる。これで IntelliSense で PackageManager クラスが補完できるようになるはず。</p><p>デスクトップアプリから Windows Runtime API を使う時には、毎回こういう作業が必要になるみたい。知らんけど。</p>

</div>
</div>
<div class="section">
<h3>コーディング</h3>
<p>これで準備はだいたい完了なので、コードを記述していく。</p>

<div class="section">
<h4>コードビハインド</h4>
<p>簡便のため、ViewModel は匿名型で済ませる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WinRTAppsUpdateChecker
{
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

DataContext = <span class="synStatement">new</span>
{
Packages = manager.FindPackagesForUser(<span class="synType">string</span>.Empty),
};
}
}
}
</pre>
</div>
<div class="section">
<h4>XAML</h4>
<p>リストボックスを用意するだけ。Package<a href="http://msdn.microsoft.com/ja-jp/library/windows/apps/windows.applicationmodel.package.aspx">&#x30D1;&#x30C3;&#x30B1;&#x30FC;&#x30B8; Class (Windows)</a> の情報は Package Class 直下にぶら下がっているものと、Package.Id にぶら下がっているものがあるっぽいが、前者はあまり役に立たん感じ（後述）。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;ListView </span><span class="synType">ItemsSource</span>=<span class="synConstant">&quot;{Binding Packages}&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;ListView</span><span class="synComment">.</span><span class="synIdentifier">View&gt;</span>
<span class="synIdentifier">&lt;GridView&gt;</span>
<span class="synIdentifier">&lt;GridViewColumn </span><span class="synType">DisplayMemberBinding</span>=<span class="synConstant">&quot;{Binding Path=DisplayName}&quot;</span><span class="synIdentifier"> </span><span class="synType">Header</span>=<span class="synConstant">&quot;DisplayName&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;GridViewColumn </span><span class="synType">DisplayMemberBinding</span>=<span class="synConstant">&quot;{Binding Path=Id.Name}&quot;</span><span class="synIdentifier"> </span><span class="synType">Header</span>=<span class="synConstant">&quot;Name&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/GridView&gt;</span>
<span class="synIdentifier">&lt;/ListView</span><span class="synComment">.</span><span class="synIdentifier">View&gt;</span>
<span class="synIdentifier">&lt;/ListView&gt;</span>
</pre>
</div>
</div>
<div class="section">
<h3>実行</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910020822.png" alt="f:id:daruyanagi:20140910020822p:plain" title="f:id:daruyanagi:20140910020822p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>実行するとエラーが発生するので、System.Rumtime を参照へ追加する（64bit Windows 8.1 Update/Visual Studio 2013 Update 3 で開発してるけれど、32bit版 .NET 4 のアセンブリでいいみたい？）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140910021531.png" alt="f:id:daruyanagi:20140910021531p:plain" title="f:id:daruyanagi:20140910021531p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>残念ながら DisplayName はプロパティがあるにもかかわらず取得できない。ほんとこういうところクソだと思う。InstalledLocation にある AppxManifest.xml を読む必要がある。</p>

</div>