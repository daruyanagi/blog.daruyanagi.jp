---
date: 2012-07-25T20:32:23.0000000
draft: false
title: "失敗の数だけ強くなりたい（ Jason.NET についての補足"
tags: ["C#"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120725203328.png" alt="f:id:daruyanagi:20120725203328p:plain" title="f:id:daruyanagi:20120725203328p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2012/07/24/201150">&#x5931;&#x6557;&#x306E;&#x6570;&#x3060;&#x3051;&#x5F37;&#x304F;&#x306A;&#x308A;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の補足。</p>
<pre class="code" data-lang="" data-unlink>&#34;files&#34;: {
&#34;close_duplicate_tab.js&#34;: {
&#34;type&#34;: &#34;application/javascript&#34;,
&#34;filename&#34;: &#34;close_duplicate_tab.js&#34;,
&#34;raw_url&#34;: &#34;https://gist.github.com/raw/3175551/c7590ad8cfdd352150a8c845ff96fb9f30bd3a65/close_duplicate_tab.js&#34;,
&#34;language&#34;: &#34;JavaScript&#34;,
&#34;size&#34;: 1465
}
}</pre><p>この Json は Dictionary&lt;string, File&gt; でうけることになるのだけど、 File を最初以下のとおりに定義していた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">struct</span> File
{
<span class="synType">public</span> <span class="synType">string</span> @type;
<span class="synType">public</span> <span class="synType">string</span> filename;
<span class="synType">public</span> <span class="synType">string</span> raw_url;
<span class="synType">public</span> <span class="synType">string</span> language;
<span class="synType">public</span> <span class="synType">string</span> size;
}
</pre><p>これでもいいのだけれど、フィールドはビューへバインディングできないのでプロパティにした、というのは前回に言った<a href="#f-1abcc75c" name="fn-1abcc75c" title="type の前に @ をつけるのは、 type が予約語であるため。アクセスする場合は File.type でよい">*1</a>。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">struct</span> File
{
<span class="synType">public</span> <span class="synType">string</span> @type { get; set; }
<span class="synType">public</span> <span class="synType">string</span> filename { get; set; }
<span class="synType">public</span> <span class="synType">string</span> raw_url { get; set; }
<span class="synType">public</span> <span class="synType">string</span> language { get; set; }
<span class="synType">public</span> <span class="synType">string</span> size { get; set; }
}
</pre><p>これでうまくいったのだけれど……うっかり struct を class にしてなかった。それでも動くんだな…… struct でもプロパティ持てるの？<a href="#f-1fd0fe34" name="fn-1fd0fe34" title="持てるらしい！　struct はメンバ関数をもてるので、プロパティがプライベートメンバ変数およびそのセッター・ゲッターの糖衣構文だと考えれば、別にできてもおかしくはないということかなぁ。教えて、エロいひと！">*2</a>　よくわからなくなってくる。ここでは値を渡すことはないし、のちのち面倒くさいことになったら嫌なので class にしておいたほうが無難かな。</p><p>まぁ、それは置いておこう。</p><p>次に気になるのは、プロパティが Snake Case になっていること。やっぱり Pascal Case にしておきたい。試してみたところ<a href="#f-2b14458a" name="fn-2b14458a" title="ドキュメント読めよ">*3</a>、 Jason.NET でデシリアライズするときには大文字と小文字が区別されないようなので、先頭を大文字にしてもいいようだ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> File
{
<span class="synType">public</span> <span class="synType">string</span> @Type { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Filename { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Raw_Url { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Language { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Size { get; set; }
}
</pre><p>しかし、これでも Raw_Url のようにアンダーバーが残ってしまう。 Snake Case を勝手に Pascal Case のフィールド・プロパティへ割り当ててくれないかなぁ、とほのかに期待していたのだけれど、そこまではやってくれないみたい<a href="#f-82a71e39" name="fn-82a71e39" title="Ruby on Rails ならやってくれただろう">*4</a>。そんなときは、 JasonProperty 属性を利用すればよいようだ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> File
{
<span class="synType">public</span> <span class="synType">string</span> @Type { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Filename { get; set; }
[JsonProperty(<span class="synConstant">&quot;raw_url&quot;</span>)]
<span class="synType">public</span> <span class="synType">string</span> RawUrl { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Language { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Size { get; set; }
}
</pre><p>それだけ。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-1abcc75c" name="f-1abcc75c" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">type の前に @ をつけるのは、 type が予約語であるため。アクセスする場合は File.type でよい</span></p>
<p class="footnote"><a href="#fn-1fd0fe34" name="f-1fd0fe34" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">持てるらしい！　struct はメンバ関数をもてるので、プロパティがプライベートメンバ変数およびそのセッター・ゲッターの糖衣構文だと考えれば、別にできてもおかしくはないということかなぁ。教えて、エロいひと！</span></p>
<p class="footnote"><a href="#fn-2b14458a" name="f-2b14458a" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">ドキュメント読めよ</span></p>
<p class="footnote"><a href="#fn-82a71e39" name="f-82a71e39" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">Ruby on Rails ならやってくれただろう</span></p>
</div>