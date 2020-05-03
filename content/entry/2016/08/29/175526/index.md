---
date: 2016-08-29T17:55:26.0000000
draft: false
title: "Aoba 1.3.0：艦これの画面をビデオキャプチャーできるようにした / Screna っていうライブラリが超便利"
tags: ["WPF", "告知", "Aoba"]
eyecatch: 20160829173657.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829173657.png" alt="f:id:daruyanagi:20160829173657p:plain" title="f:id:daruyanagi:20160829173657p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>艦これの画面を音声付きで動画キャプチャーできるようにしたよ。それに伴い、UI をいろいろ変更。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829173720.png" alt="f:id:daruyanagi:20160829173720p:plain" title="f:id:daruyanagi:20160829173720p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>動画は My Video\Aoba に保存される。もちろん、ボタン一発で開けるようにしてある。フレームレートは弄れるけど、今のところフォーマットは AVI（MotionJPEG）で固定。 設定画面作るのめんどいからね、しょうがないね。</p><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FAoba%2Freleases%2Ftag%2Fv1.3.0" title="daruyanagi/Aoba" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><br />
</p>

<div class="section">
<h4>スクリーンキャプチャー用のライブラリ Screna</h4>
<p>今回は Screna というライブラリのお世話になった。</p><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2FMathewSachin%2FScrena" title="MathewSachin/Screna" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>NuGet で簡単にインストールできる点、動画キャプチャーをサポートしている点などがいい感じ。C# でキャプチャーする方法はいろいろ紹介されてるけど、現時点ではこれが割とモダンだと思った。FFmpeg で MP4 圧縮もできるみたいだけど、今回はそこまでは試していない。</p><p>基本的な使い方はこんな感じ（公式のサンプルそのまま）。</p><p>まず AVI サポートのために Screna.SharpAvi を NuGet でインストール。</p>
<pre class="code" data-lang="" data-unlink>Install-Package Screna.SharpAvi</pre><p>次にネームスペースを追加。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Screna;
<span class="synStatement">using</span> Screna.Avi;
</pre><p>あとはコードをゴリゴリ書いていくだけ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>
<span class="synComment">// どの画像をとってくるかを決める IImageProvider を初期化</span>
var provider = <span class="synStatement">new</span> ScreenProvider(); <span class="synComment">// デスクトップ全体をキャプチャー</span>

<span class="synComment">// 動画を書き込む AviWriter を初期化</span>
var VideoWriter = <span class="synStatement">new</span> AviWriter(<span class="synConstant">&quot;output.avi&quot;</span>, AviCodec.MotionJpeg);

<span class="synComment">// レコーダーを作って録画開始</span>
var Recorder = <span class="synStatement">new</span> Recorder(VideoWriter, provider, <span class="synConstant">10</span>);

Recorder.Start();

<span class="synComment">// なにかの処理</span>

Recorder.Stop();
</pre><p>これだと音声は録音できないけど、こうすればループバックも記録できる。Screna.NAudio だか何だかのパッケージを追加する必要があると思う。 </p>
<pre class="code lang-cs" data-lang="cs" data-unlink>
<span class="synComment">// IImageProvider を初期化</span>
<span class="synComment">// 今回は矩形をキャプチャーするやで</span>
<span class="synComment">// ほかにも Active Window のプロバイダーがあるんかな？</span>
<span class="synComment">// Overlay も付けられる。透かしみたいなもんやろか。試してない</span>
var imageProvider = <span class="synStatement">new</span> RegeionProvider(rect);

<span class="synComment">// AudioProvider を用意（デスクトップで再生されてる音）</span>
var audioProvider = <span class="synStatement">new</span> LoopbackProvider();

var videoWriter = <span class="synStatement">new</span> AviWriter(
<span class="synConstant">&quot;output.avi&quot;</span>, AviCodec.MotionJpeg, audioProvider );

var Recorder = <span class="synStatement">new</span> Recorder(videoWriter, imageProvider , <span class="synConstant">10</span>);

Recorder.Start();

<span class="synComment">// なにかの処理</span>

Recorder.Stop();
</pre><p>ほかにも Gif キャプチャーなんかもできるみたいなので、取り込んでいこうと思う。</p>

</div>