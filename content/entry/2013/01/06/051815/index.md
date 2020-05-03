---
date: 2013-01-06T05:18:15.0000000
draft: false
title: "WebMatrix 2 / Razor：switch と RenderPage()"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130106043226.png" alt="f:id:daruyanagi:20130106043226p:plain" title="f:id:daruyanagi:20130106043226p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たとえば、</p>

<ul>
<li>~/Posts/ …… ページリストの表示</li>
<li>~/Posts/:id …… 個別ページの表示</li>
</ul><p>というのをやってみたいとき。</p>

<ul>
<li>~/Posts/Default.cshtml</li>
</ul><p>を作成して、</p>

<ul>
<li>UrlData.Count() == 0 ……ページリストの表示</li>
<li>UrlData.Count() == 1 ……個別ページの表示</li>
</ul><p>という処理を書けばいいよね（<a href="https://blog.daruyanagi.jp/entry/2012/07/06/174414">WebMatrix &#x306E;&#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）。</p><p>こういう処理は if で分岐してもいいのだけど、将来的に UrlData.Count() >= 2 の処理を書くことも考えて switch にするのが個人的には好み。いかにも「処理を切り替えています！」みたいな感じで。</p><p>でも、そういえば Razor で switch って書いたことないな。どうやって書くんだろう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>);
var query = <span class="synConstant">&quot;SELECT * FROM Post ORDER BY CreatedAt DESC&quot;</span>;
var posts = db.Query(query);
}

@<span class="synStatement">switch</span> (UrlData.Count)
{
<span class="synStatement">case</span> <span class="synConstant">0</span>:
<span class="synStatement">foreach</span> (var post <span class="synStatement">in</span> posts)
{
@RenderPage(<span class="synConstant">&quot;_Single.cshtml&quot;</span>, post)
}
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
@RenderPage(<span class="synConstant">&quot;_Single.cshtml&quot;</span>, posts.First())
<span class="synStatement">break</span>;
}
</pre><p>……と思ったけど普通に書いて動いた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130106050950.png" alt="f:id:daruyanagi:20130106050950p:plain" title="f:id:daruyanagi:20130106050950p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>リストの時は _Single.cshtml のレンダリングを foreach で回して、個別ページの時は一度だけ出力する。_Single.cshtml は何度も使う単一 Post の表示を切り出したもので、<b>部分ビュー</b>と呼んだりもするのだけど、内容はこんな適当な感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var post = PageData.First().Value;
}

&lt;div&gt;
&lt;header&gt;
&lt;h1&gt;@post.Title&lt;/h1&gt;
&lt;p&gt;@post.CreatedAt&lt;/p&gt;
&lt;/header&gt;
&lt;article&gt;
@post.Body
&lt;/article&gt;
&lt;footer&gt;
&lt;ul&gt;
&lt;li&gt;&lt;a href=<span class="synConstant">&quot;@post.Id&quot;</span>&gt;Show&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href=<span class="synConstant">&quot;Edit/@post.Id&quot;</span>&gt;Edit&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href=<span class="synConstant">&quot;Delete/@post.Id&quot;</span>&gt;Delete&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;/footer&gt;
&lt;/div&gt;
</pre><p>RenderPage() を使ったデータの受け渡しがいまいちよくわからなかったのだけど、PostData を介しているみたいで、PageData.First() と書いたらなんとなく動いた。</p><p>とはいえ、PageData / Page はいろんなところで便利に使っちゃったりする。上書きなどの汚染がちょっと怖いかもしれない。念のため Visual Studio でなかをのぞいてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130106050116.png" alt="f:id:daruyanagi:20130106050116p:plain" title="f:id:daruyanagi:20130106050116p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>RenderPage(…, post, 1, 2) と渡してみたのだけど、params の key は順に 0、1、2 とふられるみたい。なので、Page.Title = "hoge"; といった感じで使う分には問題がなさそう。PageData[0] で post がとれるはず。まぁ、わざわざ上書きしたらこの限りではないと思うけれど。</p>

<div class="section">
<h3>注意</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">switch</span> (UrlData.Count)
{
<span class="synStatement">case</span> <span class="synConstant">0</span>:
<span class="synStatement">foreach</span> (var post <span class="synStatement">in</span> posts)
{
RenderPage(<span class="synConstant">&quot;_Single.cshtml&quot;</span>, post);
}
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
RenderPage(<span class="synConstant">&quot;_Single.cshtml&quot;</span>, posts.First());
<span class="synStatement">break</span>;
}
</pre><p>一応これでもコンパイルは通るのだけど、RenderPage() は動かない。@RenderPage() って書かなきゃいけないんだね<a href="#f-4e69f321" name="fn-4e69f321" title="文末の ; は不要になる">*1</a>。ここら辺はまだわかるようでよくわかっていないところ。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-4e69f321" name="f-4e69f321" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">文末の ; は不要になる</span></p>
</div>