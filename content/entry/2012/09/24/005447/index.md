---
date: 2012-09-24T00:54:47.0000000
draft: false
title: "Windows ストアアプリでデータベース（SQLite 3）を使う"
tags: ["WinRT"]
eyecatch: 
---
<p><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20120924/20120924010032.gif" alt="f:id:daruyanagi:20120924010032g:plain" title="f:id:daruyanagi:20120924010032g:plain" class="hatena-fotolife"></p><p>UPDATED HOWTO: SQLite with Windows 8 apps<br />
<a href="http://timheuer.com/blog/archive/2012/08/07/updated-how-to-using-sqlite-from-windows-store-apps.aspx">http://timheuer.com/blog/archive/2012/08/07/updated-how-to-using-sqlite-from-windows-store-apps.aspx</a></p><p>@kaorun さんのはてブ経由で知った。前試したときはうまくいかなかったのだけど、今回はうまくできたっぽい。ポータブルなデータベースはやっぱりほしいよねぇ……。</p>

<div class="section">
<h3>拡張機能「SQLite for Windows Runtime」をインストール</h3>
<p><img src="20120924003514.png" alt="f:id:daruyanagi:20120924003514p:plain" title="f:id:daruyanagi:20120924003514p:plain" class="hatena-fotolife"></p><p>グローバルにインストールされるので、最初に一度やればよい。</p>

</div>
<div class="section">
<h3>NuGet パッケージ「sqlite-net」をインストール</h3>
<p><img src="20120924003710.png" alt="f:id:daruyanagi:20120924003710p:plain" title="f:id:daruyanagi:20120924003710p:plain" class="hatena-fotolife"></p><p>これはプロジェクトごとにインストール。マネージドで扱うためのラッパーのようで、C# のソースコードで提供されている。Visual Basic で使いたい場合は一工夫必要みたい。</p>

</div>
<div class="section">
<h3>参照の追加</h3>
<p><img src="20120924004222.png" alt="f:id:daruyanagi:20120924004222p:plain" title="f:id:daruyanagi:20120924004222p:plain" class="hatena-fotolife"></p><p>「Microsoft Visual C++ Runtime Pakage」と「SQLite for Windows Runtime」を参照に追加。</p>

</div>
<div class="section">
<h3>ビルドターゲットを変更</h3>
<p><img src="20120924004424.png" alt="f:id:daruyanagi:20120924004424p:plain" title="f:id:daruyanagi:20120924004424p:plain" class="hatena-fotolife"></p><p>Any CPU では動かないので、ほかの適当なものに変えておく。まぁ、とりあえず x86 とかでいいんじゃないかな。</p>

</div>
<div class="section">
<h3>動かしてみる。</h3>
<p>空のテンプレートで、サンプルコードを試してみる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> App1
{
<span class="synType">sealed</span> <span class="synStatement">partial</span> <span class="synType">class</span> App : Application
{
<span class="synType">public</span> App()
{
<span class="synStatement">this</span>.InitializeComponent();
<span class="synStatement">this</span>.Suspending += OnSuspending;

LoadData();
}

：
：

<span class="synType">public</span> <span class="synType">void</span> LoadData()
{
var dbPath = Path.Combine(
ApplicationData.Current.LocalFolder.Path,
<span class="synConstant">&quot;db.sqlite&quot;</span>);

<span class="synStatement">using</span> (var db = <span class="synStatement">new</span> SQLite.SQLiteConnection(dbPath))
{
db.CreateTable&lt;Person&gt;();

db.RunInTransaction(() =&gt;
{
db.Insert(<span class="synStatement">new</span> Person() {
FirstName = <span class="synConstant">&quot;Tim&quot;</span>, LastName = <span class="synConstant">&quot;Heuer&quot;</span>
});
});
}
}
}
}

<span class="synType">public</span> <span class="synType">class</span> Person
{
[SQLite.AutoIncrement, SQLite.PrimaryKey]
<span class="synType">public</span> <span class="synType">int</span> ID { get; set; }
<span class="synType">public</span> <span class="synType">string</span> FirstName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> LastName { get; set; }
}
</pre><p><img src="20120924004845.png" alt="f:id:daruyanagi:20120924004845p:plain" title="f:id:daruyanagi:20120924004845p:plain" class="hatena-fotolife"></p><p>LocalFolder に db.sqlite ができていた。結構簡単に扱えそうで、こりゃいいな。</p><p><img src="20120924004850.png" alt="f:id:daruyanagi:20120924004850p:plain" title="f:id:daruyanagi:20120924004850p:plain" class="hatena-fotolife"></p><p>データもちゃんと入っていたよ！</p><p>SQLite の GUI ブラウザは <a href="http://www.forest.impress.co.jp/lib/offc/business/db/sqldbbrowser.html">&#x7A93;&#x306E;&#x675C; - SQLite Database Browser</a> あたりが定番かな。</p>

</div>