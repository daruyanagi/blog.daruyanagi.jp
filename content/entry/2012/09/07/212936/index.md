---
date: 2012-09-07T21:29:36.0000000
draft: false
title: "Twitter の埋め込みタイムラインを WebMatrix で利用する"
tags: ["ASP.net Web Pages", "WebMatrix", "Twitter"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120907205420.png" alt="f:id:daruyanagi:20120907205420p:plain" title="f:id:daruyanagi:20120907205420p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="http://blog.jp.twitter.com/2012/09/blog-post.html">
<p>サイトの上に簡単にTwitterのタイムラインを表示できるツール「埋め込みタイムライン」の提供を始めました。ブログの隣に表示したり、＃ハッシュタグを使ったイベントのページに表示したり、スポーツの試合ページに参加選手のリストを使って選手のツイートを表示するなど、サイト上にリアルタイムのツイートを加えることができます。</p>

<cite><a href="http://blog.jp.twitter.com/2012/09/blog-post.html">http://blog.jp.twitter.com/2012/09/blog-post.html</a></cite>
</blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120907205552.png" alt="f:id:daruyanagi:20120907205552p:plain" title="f:id:daruyanagi:20120907205552p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっそく WebMatrix 2 RC版（！）で試してみよう。<a href="https://twitter.com/settings/widgets">Login on Twitter</a> でウィジェットを作って cshtml へ貼り付けてみる。</p>

<div class="section">
<h3>ちょっとした注意</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120907205557.png" alt="f:id:daruyanagi:20120907205557p:plain" title="f:id:daruyanagi:20120907205557p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><b>ガッデム／(^o^)＼</b></p><p>貼りつけたスクリプトに @ が含まれているときは注意だね。 Razor はこれを処理すべき変数・メソッドと解釈するので、当然エラーになる。 @ をそのまま出力したい場合は、</p>
<pre class="code" data-lang="" data-unlink>@@daruyanagi    // -&gt; &#34;@daruyanagi&#34; </pre><p>と @ を重ねて書けばいい。</p>

</div>
<div class="section">
<h3>もちろんヘルパーにしてみる……</h3>
<p>と思ったけれど、結局わざわざウィジェットページへ行かなければならないので、ヘルパーにしてもあまり美味しくないと思った。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/Twitter.EmbededTimeline.chtml

@helper GetHtml(
<span class="synType">string</span> id, <span class="synType">string</span> url, <span class="synType">string</span> text = <span class="synConstant">null</span>,
<span class="synType">int</span>? width = <span class="synConstant">null</span>, <span class="synType">int</span>? height = <span class="synConstant">null</span>, <span class="synType">string</span> lang = <span class="synConstant">null</span>,
<span class="synType">string</span> theme = <span class="synConstant">null</span>, <span class="synType">string</span> link_color = <span class="synConstant">null</span>,
<span class="synType">string</span>[] related = <span class="synConstant">null</span>, <span class="synType">string</span> aria_polite = <span class="synConstant">null</span>)
{
<span class="synStatement">if</span> (<span class="synType">string</span>.IsNullOrEmpty(text))
{
<span class="synComment">// URL を解析して適当なテキストを生成する処理</span>
<span class="synComment">// たとえば、</span>
<span class="synComment">// twitter.com/daruyanagi -&gt; @daruyanagi からのツイート</span>
}

&lt;a <span class="synType">class</span>=<span class="synConstant">&quot;twitter-timeline&quot;</span> href=<span class="synConstant">&quot;@url&quot;</span>
data-widget-id=<span class="synConstant">&quot;@id&quot;</span>
data-theme=<span class="synConstant">&quot;@theme&quot;</span>
data-link-color=@link_color
data-related=<span class="synConstant">&quot;@string.Join(&quot;</span>, @related)<span class="synConstant">&quot;</span>
data-aria-polite=<span class="synConstant">&quot;@aria_polite&quot;</span>
width=<span class="synConstant">&quot;@width&quot;</span> height=<span class="synConstant">&quot;@height&quot;</span> lang=<span class="synConstant">&quot;@lang&quot;</span>&gt;@text&lt;/a&gt;
}
</pre><p>こんな感じで書いておいて、</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        // これを挿入しておく</span>
<span class="synPreProc">        // Assets か RenderSection() でやるとよいけどこれはまた後ほど</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;twitter-wjs&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;//platform.twitter.com/widgets.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@Twitter_EmbededTimeline.GetHtml(
&quot;244022447123333120&quot;,
@&quot;http://twitter.com/daruyanagi&quot;)
@Twitter_EmbededTimeline.GetHtml(
&quot;244027379142492160&quot;,
@&quot;http://twitter.com/daruyanagi/favorites&quot;)
@Twitter_EmbededTimeline.GetHtml(
&quot;244027809108987904&quot;,
@&quot;http://twitter.com/search?q=#corgi&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>と使うんだけど、まぁ、結構微妙だよね。ウィジェット ID と URL の最低2つをコピってこなければならない。それだったら、何も考えずに<a href="#f-934456ce" name="fn-934456ce" title="@ のエスケープはしなきゃだけど">*1</a>吐かれた公式のコードを張ったほうがマシだ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120907212725.png" alt="f:id:daruyanagi:20120907212725p:plain" title="f:id:daruyanagi:20120907212725p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>試しにウィジェット ID を使いまわしていろんなパラメーターを入れると、 IE がなにかお世話をしてくれるみたい。このメッセージは初めてみたかも。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p>ちなみに Twitter.EmbededTimeline.chtml のクラス名は、 . が _ に置き換えられて Twitter_EmbededTimeline になる。Visual Studio なんかの IntelliSense でみてみればわかるけど、これはほかの WebPage クラス（cshtml ファイル）でも同じみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@Twitter_EmbededTimeline.GetHtml()
</pre><p>これをちゃんと（？）</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@Twitter.EmbededTimeline.GetHtml()
</pre><p>みたいに呼びたい場合は、 ~/App_Code/Twitter/EmbededTimeline.chtml ってな感じにサブフォルダーへ分けてしまえば OK 。一手間かかるからちょっと面倒だけどね。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation&gt;</span>
<span class="synIdentifier">&lt;codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">directoryName</span>=<span class="synConstant">&quot;Twitter&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>試してはないけど、こんな感じで動くんじゃないかな。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/16/182105">App_Code &#x3067;&#x30B5;&#x30D6;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul>
</div><div class="footnote">
<p class="footnote"><a href="#fn-934456ce" name="f-934456ce" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">@ のエスケープはしなきゃだけど</span></p>
</div>