---
date: 2016-04-05T05:00:00.0000000
draft: false
title: "UWP：一定時間が経過すると勝手に消えるメッセージを実装する"
tags: ["UWP", "Windows開発"]
eyecatch: 
---
<p>画面に「保存しました」っていうメッセージを出したいけれど、いつまでも表示されてるのも鬱陶しいので、たとえば3秒後に消したい、みたいな。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> MainPageViewModel : BindableBase
{
<span class="synType">private</span> <span class="synType">string</span> message = <span class="synType">string</span>.Empty;

<span class="synType">public</span> <span class="synType">string</span> Message
{
<span class="synStatement">get</span> { <span class="synStatement">return</span> message; }
<span class="synStatement">set</span> { SetProperty(<span class="synStatement">ref</span> message, <span class="synStatement">value</span>); }
}

<span class="synType">private</span> <span class="synType">void</span> ShowMessage(<span class="synType">string</span> message)
{
Message = message;

var timer = <span class="synStatement">new</span> DispatcherTimer()
{
Interval = TimeSpan.FromSeconds(<span class="synConstant">3</span>),
};

timer.Tick += (e, args) =&gt; { Message = <span class="synType">string</span>.Empty; };

timer.Start();
}
}
</pre><p>とにかく DispatcherTimer というのを使うと、遅延タスクみたいなのを実装できるみたい。Message プロパティの setter に処理をぶち込んでもいいかも？　どういう書き方がキレイな書き方なのかまだよくわかんないな。上級者は ReactibeExtension みたいなのを使いこなして、スッキリ書いちゃうのかもしれないが……。</p><p>あと、ほんとは XAML だけでできればカッコいいのだろうけれど、自分には無理だった。</p><p>で、テキトーに作ってみてから思ったのだけど、こういうのはユーザーコントロールにしておけばよさげだよね。というわけで、次回はユーザーコントロールでも作ってみる。</p>
