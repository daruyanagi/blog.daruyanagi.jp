---
date: 2017-06-08T19:50:54.0000000
draft: false
title: "Tonjiru v1.2.0 ＋ WPF での起動オプション、ジャンプリスト、トースト"
tags: ["告知", "Tonjiru", "WPF"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170608192727.png" alt="f:id:daruyanagi:20170608192727p:plain" title="f:id:daruyanagi:20170608192727p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>起動オプションの追加（/g で GUI 付きの起動）</li>
<li>ジャンプリストへの対応（GUI 付きの起動を追加）</li>
<li>ウィンドウ情報のクリップボードコピー（JSON 形式）</li>
<li>ウィンドウ情報のファイル保存（JSON 形式）</li>
<li>通知機能</li>
<li>安定性の向上</li>
</ul><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FTonjiru%2Freleases%2Ftag%2Fv1.2.0" title="daruyanagi/Tonjiru" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Tonjiru/releases/tag/v1.2.0">github.com</a></cite><br />
</p>

<div class="section">
<h3>WPF と起動オプション</h3>
<p>起動時に［Shift］キーが押されていたら GUI を起動するという挙動は</p>

<ul>
<li>App.xaml の StartupUri を削除</li>
<li>App.Startup でキーの押し下げ確認と MainWindow の自前生成</li>
</ul><p>という感じで実現していたんだけど、起動オプションを付けたら破綻したので、</p>

<ul>
<li>App.xaml の StartupUri を元に戻す</li>
<li>App.xaml のビルドアクションを Page にして、main 関数を自分で書く</li>
</ul><p>という感じに変えた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>[System.STAThreadAttribute()]
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Main()
{
var args = Environment.GetCommandLineArgs();

<span class="synStatement">if</span> (args.Contains(<span class="synConstant">&quot;/g&quot;</span>) || (Control.ModifierKeys &amp; Keys.Shift) == Keys.Shift)
{
var app = <span class="synStatement">new</span> Tonjiru.App();
app.InitializeComponent();
app.Run();
}
<span class="synStatement">else</span> <span class="synComment">// UI less mode</span>
{
CloseAllWindowsAndExit();
}
}
</pre><p>/h スイッチで CUI ヘルプを出そうかなーと思ったけど、そっちはちょっと面倒くさいのでやめた。AttachConsole() などを使えば行けるのだけど、ちょっと挙動が変。ちゃんとやろうとすると CUI と GUI で EXE を分けないといけないみたいだが、そこまでやる気はないかな。</p>

</div>
<div class="section">
<h3>ジャンプリスト</h3>
<p>起動オプションを付けた副産物として、ジャンプリストへの対応が簡単になった。App.xaml に以下のように記述。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Application </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Class</span>=<span class="synConstant">&quot;Tonjiru.App&quot;</span>
<span class="synIdentifier">             </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;</span>
<span class="synIdentifier">             </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">x</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;</span>
<span class="synIdentifier">             </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">local</span>=<span class="synConstant">&quot;clr-namespace:Tonjiru&quot;</span>
<span class="synIdentifier">             </span><span class="synType">StartupUri</span>=<span class="synConstant">&quot;Views\MainWindow.xaml&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Application</span><span class="synComment">.</span><span class="synIdentifier">Resources&gt;</span>

<span class="synIdentifier">&lt;/Application</span><span class="synComment">.</span><span class="synIdentifier">Resources&gt;</span>

<span class="synIdentifier">&lt;JumpList</span><span class="synComment">.</span><span class="synIdentifier">JumpList&gt;</span>
<span class="synIdentifier">&lt;JumpList&gt;</span>
<span class="synIdentifier">&lt;JumpTask </span><span class="synType">Title</span>=<span class="synConstant">&quot;Launch with GUI&quot;</span>
<span class="synIdentifier">                </span><span class="synType">Description</span>=<span class="synConstant">&quot;Launch with GUI&quot;</span><span class="synIdentifier"> </span>
<span class="synIdentifier">                </span><span class="synType">Arguments</span>=<span class="synConstant">&quot;/g&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/JumpList&gt;</span>
<span class="synIdentifier">&lt;/JumpList</span><span class="synComment">.</span><span class="synIdentifier">JumpList&gt;</span>
<span class="synIdentifier">&lt;/Application&gt;</span>
</pre><p>ジャンプリストは最近忘れられてる気がするけど、割かし便利だと思う。対応アプリが増えるといいな。</p><p>なお、ジャンプリストから起動するとワーキングディレクトリが System フォルダーになった気がする。設定ファイルなどをロードするとき、パス検索をいい加減にしていると痛い目にあう（あった）。</p>

</div>
<div class="section">
<h3>ValueTupple と DataContractJsonSerializer</h3>
<p>ウィンドウ情報の保存は手抜きで DataContractJsonSerializer を使ったんだけど、Model をそのままシリアライズするとサイズがすごく大きくなってしまった。そこで情報を間引いたんだが、ここでタプルが使えるのではないかと気づいた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>list.Select(_ =&gt; (title: _.Title, process: _.ProcessName)); <span class="synComment">// これをシリアライズ</span>
</pre><p>試しにこれを</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>DataContractJsonSerializer(<span class="synStatement">typeof</span>(ValueTupple&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;));

DataContractJsonSerializer(<span class="synStatement">typeof</span>((<span class="synType">string</span> title, <span class="synType">string</span> process)));
</pre><p>みたいに使ってみたところ――とりあえずコンパイルは通り、普通に使えた。けれど、出力される JSON がどっちも</p>
<pre class="code" data-lang="" data-unlink>[{ &#34;Item1&#34;: &#34;hoge&#34;, &#34;Item2&#34;: &#34;fuga&#34; }]</pre><p>みたいな感じになる（ほんとは Item1 のところが title や process になってほしいよね）ので、これを使うのはあきらめた。JSON.net のシリアライズだったら対応していた（or 対応してくれる）かもしれない？</p>

</div>
<div class="section">
<h3>通知</h3>
<p>WPF でトーストを出そうと思うと WindowsRuntime を使わなくちゃーってなりがちだけど、ただ出したいだけであれば NotifyIcon で ShowBalloonTip() するのが楽でいい。Windows 7 だとバルーンだが、Windows 10 ではトーストになる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> (var notify_icon = <span class="synStatement">new</span> System.Windows.Forms.NotifyIcon())
{
notify_icon.Icon = System.Drawing.Icon.ExtractAssociatedIcon(System.Reflection.Assembly.GetEntryAssembly().Location);
notify_icon.Visible = <span class="synConstant">true</span>;

notify_icon.BalloonTipTitle = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name;
notify_icon.BalloonTipText = message;
notify_icon.ShowBalloonTip(<span class="synConstant">3000</span>);
}
</pre><p>簡単だね！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170608194803.png" alt="f:id:daruyanagi:20170608194803p:plain" title="f:id:daruyanagi:20170608194803p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ポイントは Visible を true にしておくこと（じゃないとトーストが出てこない）、最後に Visible を False にするか Dispose() すること（でないとトレイにアイコンがゾンビ）ぐらい。</p>

</div>