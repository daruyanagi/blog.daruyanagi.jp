---
date: 2013-01-11T04:18:56.0000000
draft: false
title: "WebMatrix 2：RESTful？な Web アプリケーション （2）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/01/07/025136">WebMatrix 2&#xFF1A;RESTful&#xFF1F;&#x306A; Web &#x30A2;&#x30D7;&#x30EA;&#x30B1;&#x30FC;&#x30B7;&#x30E7;&#x30F3; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。とりあえず、</p>

<ul>
<li>/Posts/ -> GET:List</li>
<li>/Posts/:id -> GET:Show</li>
<li>/Posts/New -> GET:New, POST:Create</li>
<li>/Posts/Edit/:id -> GET:Edit, POST:Update</li>
<li>/Posts/Remove/:id -> GET:Remove, POST:DELETE</li>
</ul><p>って感じにマッピングされるように頑張ってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Posts.cshtml

@{
Layout = <span class="synConstant">&quot;_SiteLayout.cshtml&quot;</span>;
}

@<span class="synStatement">try</span>{
<span class="synStatement">switch</span> (UrlData[<span class="synConstant">0</span>].ToUpper())
{
<span class="synStatement">case</span> <span class="synConstant">&quot;&quot;</span>: <span class="synComment">// &lt;- / へアクセスするととりあえず UrlData[0] には string.empty が入るっぽい</span>
<span class="synStatement">case</span> <span class="synConstant">&quot;LIST&quot;</span>:
<span class="synStatement">if</span> (!IsPost) <span class="synComment">// GET</span>
{
@List()
}
<span class="synStatement">else</span> <span class="synComment">// POST</span>
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ApplicationException();
}
<span class="synStatement">break</span>;

<span class="synStatement">case</span> <span class="synConstant">&quot;NEW&quot;</span>:
<span class="synStatement">case</span> <span class="synConstant">&quot;CREATE&quot;</span>: <span class="synComment">// &lt;- ビューを書き換えるのがめんどいので</span>
<span class="synStatement">if</span> (!IsPost) <span class="synComment">// GET</span>
{
@New(UrlData[<span class="synConstant">1</span>])
}
<span class="synStatement">else</span> <span class="synComment">// POST</span>
{
Create();
}
<span class="synStatement">break</span>;

<span class="synStatement">case</span> <span class="synConstant">&quot;EDIT&quot;</span>:
<span class="synStatement">case</span> <span class="synConstant">&quot;UPDATE&quot;</span>:
<span class="synStatement">if</span> (!IsPost) <span class="synComment">// GET</span>
{
@Edit(UrlData[<span class="synConstant">1</span>])
}
<span class="synStatement">else</span> <span class="synComment">// POST</span>
{
Update(UrlData[<span class="synConstant">1</span>].AsInt());
}
<span class="synStatement">break</span>;

<span class="synStatement">case</span> <span class="synConstant">&quot;REMOVE&quot;</span>:
<span class="synStatement">case</span> <span class="synConstant">&quot;DELETE&quot;</span>:
<span class="synStatement">if</span> (!IsPost) <span class="synComment">// GET</span>
{
@Remove(UrlData[<span class="synConstant">1</span>])
}
<span class="synStatement">else</span> <span class="synComment">// POST</span>
{
Delete(UrlData[<span class="synConstant">1</span>].AsInt());
}
<span class="synStatement">break</span>;

<span class="synStatement">default</span>:
<span class="synStatement">if</span> (!IsPost) <span class="synComment">// GET</span>
{
@Show(UrlData[<span class="synConstant">0</span>])
}
<span class="synStatement">else</span> <span class="synComment">// POST</span>
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ApplicationException();
}
<span class="synStatement">break</span>;
}
}
<span class="synStatement">catch</span> (Exception e)
{
&lt;p&gt;&lt;span <span class="synType">class</span>=<span class="synConstant">&quot;badge error&quot;</span>&gt;Error&lt;/span&gt; @e.Message&lt;/p&gt;
}


@functions
{
dynamic FindPostByIdOrTitle(<span class="synType">string</span> param)
{
<span class="synType">int</span> id = <span class="synConstant">0</span>;
dynamic post;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
<span class="synStatement">if</span> (<span class="synType">int</span>.TryParse(param, <span class="synStatement">out</span> id))
{
var query = <span class="synConstant">&quot;SELECT * FROM Post WHERE Id=@0&quot;</span>;
post = db.QuerySingle(query, id);
}
<span class="synStatement">else</span>
{
var query = <span class="synConstant">&quot;SELECT * FROM Post WHERE Title=@0&quot;</span>;
post = db.QuerySingle(query, param);
}
}

<span class="synStatement">if</span> (post == <span class="synConstant">null</span>)
<span class="synStatement">throw</span> <span class="synStatement">new</span> HttpException(<span class="synConstant">404</span>, <span class="synType">string</span>.Format(
<span class="synSpecial">@</span><span class="synConstant">&quot;Post &quot;&quot;{0}&quot;&quot; is not found.&quot;</span>, param)
);

<span class="synStatement">return</span> post;
}

HelperResult List()
{
var query = <span class="synConstant">&quot;SELECT * FROM Post ORDER BY CreatedAt DESC&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
var posts = db.Query(query);
Page.Title = <span class="synConstant">&quot;Archives&quot;</span>;
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_ListPosts.cshtml&quot;</span>, posts);
}
}

HelperResult Show(<span class="synType">string</span> param)
{
var post = FindPostByIdOrTitle(param);
Page.Title = post.Title;
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_ShowPost.cshtml&quot;</span>, post);
}

HelperResult New(<span class="synType">string</span> param)
{
Page.Title = <span class="synConstant">&quot;New Post:&quot;</span> + param != <span class="synType">string</span>.Empty ? param : <span class="synConstant">&quot;Untitled&quot;</span>;
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_NewPost.cshtml&quot;</span>);
}

HelperResult Edit(<span class="synType">string</span> param)
{
var post = FindPostByIdOrTitle(param);
Page.Title = <span class="synConstant">&quot;Edit: &quot;</span> + post.Title;
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_EditPost.cshtml&quot;</span>, post);
}

HelperResult Remove(<span class="synType">string</span> param)
{
var post = FindPostByIdOrTitle(param);
Page.Title = <span class="synConstant">&quot;Remove: &quot;</span> + post.Title;
<span class="synStatement">return</span> RenderPage(<span class="synConstant">&quot;~/Views/Posts/_RemovePost.cshtml&quot;</span>, post);
}

<span class="synType">void</span> Create()
{
var query = <span class="synConstant">&quot;INSERT INTO Post (Title, Body, CreatedAt, UpdatedAt)&quot;</span>
+ <span class="synConstant">&quot;VALUES(@0, @1, @2, @3)&quot;</span>;
var title = Request[<span class="synConstant">&quot;Title&quot;</span>];
var body = Request[<span class="synConstant">&quot;body&quot;</span>];
var now = DateTime.Now;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, title, body, now, now);
var key = db.QueryValue(<span class="synConstant">&quot;SELECT @@IDENTITY&quot;</span>);
Response.Redirect(<span class="synConstant">&quot;~/Posts/&quot;</span> + key.ToString());
}
}

<span class="synType">void</span> Update(<span class="synType">int</span> id)
{
var query = <span class="synConstant">&quot;UPDATE Post SET Title=@0, Body=@1, UpdatedAt=@2 WHERE Id=@3&quot;</span>;
var title = Request[<span class="synConstant">&quot;Title&quot;</span>];
var body = Request[<span class="synConstant">&quot;body&quot;</span>];
var now = DateTime.Now;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, title, body, now, id);
Response.Redirect(<span class="synConstant">&quot;~/Posts/&quot;</span> + id.ToString());
}
}

<span class="synType">void</span> Delete(<span class="synType">int</span> id)
{
var query = <span class="synConstant">&quot;DELETE FROM Post WHERE Id=@0&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, id);
Response.Redirect(<span class="synConstant">&quot;~/Posts/&quot;</span>);
}
}
}
</pre><p>あんまり気に入らない。なんか当初の目標とズレてきたし。</p><p>でも、よく考えたら、Web Form で GET/POST しかリクエストできないとしても、JavaScript だったらできるわけだよね。そんな Web Form の仕様に合わせなくてもいいんじゃね？</p><p>そんなことを考えていたら、こんなナイスなページを見つけた。</p>

<blockquote cite="http://wiki.unfindable.net/webbook2/index.php/Web%e3%83%9a%e3%83%bc%e3%82%b8%e3%81%8b%e3%82%89%e3%81%aePUT%e3%81%a8DELETE">
<p>HTML5より前のHTMLでは、フォームで利用できるHTTPメソッドはGETとPOSTだけである。そのため、PUTやDELETEを使う場合には、JavaScriptが必要になる（JavaScriptでのHTTPリクエストを参照）。一部のケータイのブラウザのように、JavaScriptをサポートしていないブラウザでは、PUTやDELETEはPOSTで代用しなければならない。PUTやDELETEをPOSTで代用する方法には、以下の2つがあるが、フォームで利用できるのは、パラメータ_methodを利用する方法だけである。 </p>

<cite><a href="http://wiki.unfindable.net/webbook2/index.php/Web%e3%83%9a%e3%83%bc%e3%82%b8%e3%81%8b%e3%82%89%e3%81%aePUT%e3%81%a8DELETE">http://wiki.unfindable.net/webbook2/index.php/Web%e3%83%9a%e3%83%bc%e3%82%b8%e3%81%8b%e3%82%89%e3%81%aePUT%e3%81%a8DELETE</a></cite>
</blockquote>
<p>あーこれだ！ Rails でもやっていたやつだよね？</p><p>というわけで、これベースでまた書き直しする。そのあとは、Twitter/Facebook 認証を追加することにしたいと思ってる。</p>
