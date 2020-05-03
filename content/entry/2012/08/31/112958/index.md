---
date: 2012-08-31T11:29:58.0000000
draft: false
title: "SignalR を .NET（WPF）からも使ってみた"
tags: ["WebMatrix", "WPF"]
eyecatch: 
---

<blockquote cite="http://shiba-yan.hatenablog.jp/entry/20120823/1345724524">
<p>（SignalR 0.5.3 の）JavaScript のクライアントは .NET 向けの各種クライアントとほぼ同じ API となっています。</p>

<cite><a href="http://shiba-yan.hatenablog.jp/entry/20120823/1345724524">SignalR 0.5.3 &#x3067;&#x5909;&#x308F;&#x3063;&#x305F; JavaScript &#x30AF;&#x30E9;&#x30A4;&#x30A2;&#x30F3;&#x30C8; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></cite>
</blockquote>
<p>そういえば、前回（<a href="https://blog.daruyanagi.jp/entry/2012/08/31/031730">SignalR Deep Dive ! &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x305F;&#xFF0B;WebMatrix &#x3067; SignalR &#x52D5;&#x304B;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）.NET から呼んでみるのを忘れてたよ。「ほぼ同じ」らしいのでこっちも試してみよう。</p><p>WPF アプリケーションを作って、 NuGet で SignalR.Client をインストール。 Hub （サーバー側）のコードは前回のそのまま。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synStatement">partial</span> <span class="synType">class</span> MainWindow : Window
{
HubConnection connection;
IHubProxy sample;

<span class="synType">public</span> MainWindow()
{
InitializeComponent();

<span class="synComment">// サーバーに接続して sample ハブをげっと</span>
connection = <span class="synStatement">new</span> HubConnection(<span class="synConstant">&quot;http://localhost:63112/&quot;</span>);
sample = connection.CreateProxy(<span class="synConstant">&quot;sample&quot;</span>);
connection.Start(); <span class="synComment">/* この3つは順番を守ること！ */</span>

<span class="synComment">// sample ハブで Echo() が呼ばれたら……</span>
sample.On(<span class="synConstant">&quot;Echo&quot;</span>, data =&gt;
<span class="synComment">// 返り値をもらって UI スレッドで textBox につっこむ</span>
Dispatcher.BeginInvoke(
<span class="synStatement">new</span> Action(() =&gt; { textBox.Text = data; })
)
);
}

<span class="synType">private</span> <span class="synType">void</span> buttonAdd_Click(<span class="synType">object</span> sender, RoutedEventArgs e)
{
<span class="synComment">// sample Hub の Add() を呼ぶ</span>
sample.Invoke(<span class="synConstant">&quot;Add&quot;</span>, <span class="synConstant">&quot;.NET! &quot;</span>);
}

<span class="synType">private</span> <span class="synType">void</span> buttonClear_Click(<span class="synType">object</span> sender, RoutedEventArgs e)
{
<span class="synComment">// sample Hub の Clear() を呼ぶ</span>
sample.Invoke(<span class="synConstant">&quot;Clear&quot;</span>);
}
}
</pre><p>XAML は省略。ほんまに JavaScript の時と変わらないな。ただ、プロキシの取得と接続のスタートを逆にすると例外が発生する（JavaScript の場合は呼び出し順序はどっちでもいいみたい）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120831112128.png" alt="f:id:daruyanagi:20120831112128p:plain" title="f:id:daruyanagi:20120831112128p:plain" class="hatena-fotolife" itemprop="image"></span></p>
