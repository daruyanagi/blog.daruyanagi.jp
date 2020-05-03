---
date: 2012-09-16T00:16:25.0000000
draft: false
title: "Windows ストアアプリ開発に挑戦してみたけど難しい……"
tags: ["Windows ストア アプリ"]
eyecatch: 
---
<p><img src="20120915234152.png" alt="f:id:daruyanagi:20120915234152p:plain" title="f:id:daruyanagi:20120915234152p:plain" class="hatena-fotolife"></p><p>「Markdown エディターがあれば便利かなぁ」と思って少し挑戦してみたけれど、だいぶめんどくさい。</p><p>まず、MarkdownSharp が動かない。これは30分ぐらいかけて手直ししたら動くようになった。HashTable 使っているのを Dictionary に、ArrayList を List に……といった感じ。MD5 の計算ルーチンも動かなかったので、これも WinRT 向けに書き直した。RegexOption.Compiled がないっぽいんだけど、どういうことなんだろうか。まぁ、適当に消しといたけど。</p><p>そこまではいいんだ。</p><p>とりあえずデザインなんかを考えずに、エディターとプレビュー用の WebView を同じ画面に置いて、エディターの内容を NavigateToString() で WebView に表示するというのを作った。</p><p>そしたら、 NavigateToString() するたびにフォーカスが WebView にとられてしまう。これは困った。WPF/Silverlight でも似たようなのを作ってあるのだけれど<a href="#f1" name="fn1" title="途中で飽きて放置してある">*1</a>、そっちはそんな挙動じゃなかったのだけど。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>MarkdownSharp.Markdown markdown = <span class="synStatement">new</span> MarkdownSharp.Markdown();

<span class="synType">private</span> <span class="synType">void</span> editor_TextChanged_1(
<span class="synType">object</span> sender, TextChangedEventArgs e)
{
preview.NavigateToString(markdown.Transform(editor.Text));
await Dispatcher.RunAsync(
Windows.UI.Core.CoreDispatcherPriority.High, () =&gt;
editor.Focus(Windows.UI.Xaml.FocusState.Programmatic));
}
</pre><p>ダメもとで強引にエディターへフォーカスを戻そうとしてもやっぱりイマイチだし……どうすればいいんだろうな。ページを遷移させてプレビューさせるのはもちろんできるのだけれど、それはあまりにも不便すぎる。頑張って Rx にして、キー入力のアイドル時にプレビュー → 即座にフォーカスをエディターへ戻すというのも考えたけど、フォーカスが移るたびにソフトウェアキーボードがぴょこぴょこするのが萎える。</p><p>同様の悩みを抱える人はいるみたいで、 Connect にもバグ報告があった。でも、すぐには治りそうにないよなぁ……。どうしよ。また違うネタ考えるかな。RSS のテンプレをちょちょいといじって提出するのでも最悪構わないけれど、それも面白くないしなぁ。</p><p><a href="https://connect.microsoft.com/VisualStudio/feedback/details/753422/webview-in-windows-8-does-not-gain-focus-automatically-when-hovering-mouse-back-to-it">https://connect.microsoft.com/VisualStudio/feedback/details/753422/webview-in-windows-8-does-not-gain-focus-automatically-when-hovering-mouse-back-to-it</a></p><p>まぁ、もうちょっと勉強してから再挑戦するかな。無難に ToDo 管理アプリとか作ってみるか。それにしても、9月末までにちゃんとしたアプリを完成させるのはだいぶ難しそうだ。</p>

<div class="section">
<h3>追記</h3>
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/kamebuchi"><img src="http://a0.twimg.com/profile_images/2255188606/mabi1_normal.png" alt="kamebuchi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> っ <a class="twitter-tweet-url" href="http://t.co/ywv6mUtn" target="_top"><span>URL</span></a></p><p class="twitter-detail-info"><a href="http://twitter.com/kamebuchi/status/246997124988948480" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-09-16</span> <span class="twitter-detail-info-time">00:41:18</span></a> <span class="twitter-detail-info-source">via <a href="http://krile2.starwing.net/" rel="nofollow">Krile2</a></span> to @<a href="http://twitter.com/daruyanagi/"  class="twitter-user-screen-name">daruyanagi</a></p></div></div></p><p>もうすでにあるし（＝＝！</p><p><img src="20120916085918.png" alt="f:id:daruyanagi:20120916085918p:plain" title="f:id:daruyanagi:20120916085918p:plain" class="hatena-fotolife"></p><p>ソースもみてみたけど、 HTML＋JavaScript だった。実は Windows Phone への移植も考えている<a href="#f2" name="fn2" title="というか、そっちがもともと">*2</a>ので、 なるべく C#＋XAML でやりたいんだけどな。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">途中で飽きて放置してある</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">というか、そっちがもともと</span></p>
</div>