---
date: 2013-01-07T02:51:36.0000000
draft: false
title: "WebMatrix 2：RESTful？な Web アプリケーション"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130106043226.png" alt="f:id:daruyanagi:20130106043226p:plain" title="f:id:daruyanagi:20130106043226p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2013/01/06/051815">
<p>たとえば、</p>

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
</ul><p>という処理を書けばいいよね（<a href="https://blog.daruyanagi.jp/entry/2012/07/06/174414">WebMatrix &#x306E;&#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2013/01/06/051815">WebMatrix 2 / Razor&#xFF1A;switch &#x3068; RenderPage() - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p><i>これはウソだ。</i>申し訳ない。まぁ、別に正しいことを書いているブログではないので、いいと言えばいいんだけど。正しくは、</p>

<ul>
<li>~/Posts.cshtml</li>
</ul><p>を作成するだね。ほかにもウソがあるのだけど、それはまた別のエントリーでフォローするから！</p><p>――なにはともあれ。</p><p>この ~/Posts.cshtml をガリガリ書いていけば、いわゆる RESTful な Web アプリケーションが書けるのではないかと思いついた。RESTful の厳密な定義は知らないけど、だいたい</p>

<ul>
<li>Lists：GET /Posts</li>
<li>Show：GET /Posts/:id</li>
<li>New： POST /Posts</li>
<li>Edit：PUT /Posts/:id</li>
<li>Remove：DELETE /Posts/:id</li>
</ul><p>みたいな感じだよね。だったら、下のような感じで書けばいいんじゃないか（本質に関係ない部分は削ってる）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">try</span>{
<span class="synStatement">switch</span> (Request.HttpMethod.ToUpper())
{
<span class="synStatement">case</span> <span class="synConstant">&quot;GET&quot;</span>:
<span class="synStatement">switch</span> (UrlData.Count)
{
<span class="synStatement">case</span> <span class="synConstant">0</span>: <span class="synComment">// GET Posts/ </span>
@List()
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">1</span>:
<span class="synStatement">switch</span> (UrlData[<span class="synConstant">0</span>].ToUpper())
{
<span class="synStatement">case</span> <span class="synConstant">&quot;NEW&quot;</span>: <span class="synComment">// GET Posts/New</span>
@New()
<span class="synStatement">break</span>;
<span class="synStatement">                        default:</span>    <span class="synComment">// GET Posts/1, Posts/Title</span>
@Show(UrlData[<span class="synConstant">0</span>])
<span class="synStatement">break</span>;
}
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">2</span>:
<span class="synStatement">switch</span> (UrlData[<span class="synConstant">0</span>].ToUpper())
{
<span class="synStatement">case</span> <span class="synConstant">&quot;EDIT&quot;</span>:    <span class="synComment">// GET Posts/Edit/1</span>
@Edit(UrlData[<span class="synConstant">1</span>])
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;REMOVE&quot;</span>:  <span class="synComment">// GET Posts/Delete/1</span>
@Remove(UrlData[<span class="synConstant">1</span>])
<span class="synStatement">break</span>;
}
<span class="synStatement">break</span>;
}
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;POST&quot;</span>:
Create();
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;PUT&quot;</span>:
Update(UrlData[<span class="synConstant">0</span>].AsInt());
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;DELETE&quot;</span>:
Delete(UrlData[<span class="synConstant">0</span>].AsInt());
<span class="synStatement">break</span>;
}
}
<span class="synStatement">catch</span> (Exception e)
{
&lt;p&gt;&lt;span <span class="synType">class</span>=<span class="synConstant">&quot;badge error&quot;</span>&gt;Error&lt;/span&gt; @e.Message&lt;/p&gt;
}
</pre><p>@List() や @New() の部分は、@functions で定義してる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@functions
{
HelperResult List()
{
var query = <span class="synConstant">&quot;SELECT * FROM Post ORDER BY CreatedAt DESC&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
var posts = db.Query(query);
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_ListPosts.cshtml&quot;</span>, posts);
}
}
}
</pre><p>HelperResult を返す関数にして @ をつけて呼べば、ちゃんと部分ビューがレンダリングされる。POST/PUT/DELETE のところで使う関数は、どうせ Response.Redirect() するから void でいいし、@Delete() なんて書く必要もない。</p><p>で。</p><p>Create() は動くのだけど、なぜか Update() と Delete() だけが動かない。ちゃんとビューで method も指定したのになぁ……</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#Delete() → RenderPage()  ~/Views/Posts/_RemovePost.cshtml<span class="synConstant">&quot;</span>

@{
var model = PageData.First().Value;
}

&lt;form method=<span class="synConstant">&quot;delete&quot;</span> action=<span class="synConstant">&quot;~/Posts/@model.Id&quot;</span>&gt;
&lt;div&gt;
&lt;label&gt;Title&lt;/label&gt;
&lt;input type=<span class="synConstant">&quot;text&quot;</span> name=<span class="synConstant">&quot;Title&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;@model.Title&quot;</span> disabled /&gt;
&lt;/div&gt;
&lt;div&gt;
&lt;label&gt;Body&lt;/label&gt;
&lt;textarea name=<span class="synConstant">&quot;Body&quot;</span> disabled&gt;@model.Body&lt;/textarea&gt;
&lt;/div&gt;
&lt;div&gt;
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> /&gt;
&lt;/div&gt;
&lt;/form&gt;
</pre><p>なぜかこれを Submit すると GET での呼び出しになってしまう。よく知らんけど、ブラウザーは GET と POST しかサポートしていないらしい<a href="#f-df2a93f7" name="fn-df2a93f7" title="そういえば、Rails でも _method="delete" みたいな感じにして、ここら辺の問題を回避していた気がする">*1</a>。あと、サーバー側にも設定がいるのかな。</p><p>とりあえず、GET と POST しか使えない。道理で、IsPost() なんていうのがお役に立つ訳だわ。なんで IsGet()、IsPut()、IsDelete() しかないのかなって思ってた。こういうのって、たぶん Web 開発者にとっては基本的な知識なんだろうな。やっぱりなにごとも経験しないとだめだねぇ。</p><p>というわけで、GET と POST だけ使っていろいろ書き直したのだけど、それはまた今度。一足先に感想を言えば、こういうのは「ASP.NET MVC」使った方が賢い（ぉ</p>
<div class="footnote">
<p class="footnote"><a href="#fn-df2a93f7" name="f-df2a93f7" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">そういえば、Rails でも _method="delete" みたいな感じにして、ここら辺の問題を回避していた気がする</span></p>
</div>