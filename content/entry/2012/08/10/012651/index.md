---
date: 2012-08-10T01:26:51.0000000
draft: false
title: "WebMatrix + ASP.NET Web Pages でキレイにコーディングしたい（3）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">だるさん、Razor には <a href="https://twitter.com/functions?ref_src=twsrc%5Etfw">@functions</a> って記法もあるんやで</p>&mdash; しばやん (@shibayan) <a href="https://twitter.com/shibayan/status/233077862264078336?ref_src=twsrc%5Etfw">2012年8月8日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>知ってたさ！　でも、なんか Func&lt;&gt; ってカッコいいから使ってみたかったんだよ！<a href="#f-d33ff292" name="fn-d33ff292" title="忘れてた">*1</a><br />
</p>

<div class="section">
<h3>@functions</h3>
<p>というわけで、レイアウトファイルで @functions を使ってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;@App.Language&quot;</span>&gt;
&lt;head&gt;
:
:
&lt;div id=<span class="synConstant">&quot;site-content&quot;</span>&gt;
&lt;article id=<span class="synConstant">&quot;site-body&quot;</span>&gt;
@RenderBody()
&lt;/article&gt;
&lt;aside id=<span class="synConstant">&quot;site-sidebar&quot;</span>&gt;
@RenderSideBar()
&lt;/aside&gt;
&lt;/div&gt;

&lt;footer id=<span class="synConstant">&quot;site-footer&quot;</span>&gt;
@RenderFooter()
&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;

@functions {
<span class="synType">public</span> HelperResult RenderHeader()
{
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;_Header.cshtml&quot;</span>);
}
<span class="synType">public</span> HelperResult RenderNavigation()
{
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;_Navigation.cshtml&quot;</span>);
}
<span class="synType">public</span> HelperResult RenderSideBar()
{
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;_SideBar.cshtml&quot;</span>);
}
<span class="synType">public</span> HelperResult RenderFooter()
{
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;_Footer.cshtml&quot;</span>);
}
}
</pre><p>@functions{……} を使う利点はいくつかあるけど、</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/08/035745">
<p>とりあえず今のところ単純なラムダ式でなんとかなっているけれど、たとえばRenderFooter でエラー処理を追加する場合（“_Footer.cshtml”がない場合がありえる）を考えると、「レイアウトファイルを簡潔にしたい」という目的からはだいぶ外れてくる。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/08/035745">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>という懸念はないね。ながながとラムダ式を書くのはアレだけれど、一般的な関数ならばまぁ、いいや。あと、冒頭じゃなくて末尾に書けるのも何気に美味しい。レイアウトファイルのメインはあくまでも HTML ファイルだと思うし、ユーティリティ関数みたいなのは隅っこに書いておきたいって思う。 @{……} セクションで宣言した変数だと使う前に宣言しておかないとダメみたいだけれど、 @functions{……} で宣言した関数はあとで宣言してもいいみたいだ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120810011157.png" alt="f:id:daruyanagi:20120810011157p:plain" title="f:id:daruyanagi:20120810011157p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Visual Studio のツールチップでみてみたのだけれど、何がなんだかよくわかんないね。なんなんだろう、このテンポラリクラスは。こうなってくると、ちょっと中身を知りたくなってくる。あと、テンポラリクラス名でわかるかもしれないけれど、テーマ機能もつけてみた。</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/07/054832">
<p>今見返してふと思ったのは、比較的簡単にテーマ機能なんかを実装できるなということ。ただデザインを変えたいがために、毎回一からこんなの作るのはアホらしい。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/07/054832">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>その話はまた今度するかもしれないし、しないかもしれない。</p><p>ちなみに、このコーナーはあくまでも自分の試行錯誤を書いてみただけで、このやり方が正しいというわけでは<b>決してない</b>ので注意してください。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-d33ff292" name="f-d33ff292" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">忘れてた</span></p>
</div>