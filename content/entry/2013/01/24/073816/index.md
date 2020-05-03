---
date: 2013-01-24T07:38:16.0000000
draft: false
title: "WebMatrix 2：RESTful？な Web アプリケーション （5）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/01/13/094453">WebMatrix 2&#xFF1A;RESTful&#xFF1F;&#x306A; Web &#x30A2;&#x30D7;&#x30EA;&#x30B1;&#x30FC;&#x30B7;&#x30E7;&#x30F3; &#xFF08;4&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。結局こんな感じになったというのを書くのを忘れていた。実際に動作するサンプルは、Windows Azure に置いておいた。</p>

<ul>
<li><a href="http://daruyanagi-sample1.azurewebsites.net/Posts">http://daruyanagi-sample1.azurewebsites.net/Posts</a></li>
</ul><p>モーダルダイアログの表示に pointer-events というのを使ったのだけど、実はこれ、IE/Opera では使えないらしい。興味のある人は Mozilla Firefox か Google Chrome で試してほしいかな。デザインの過程は <a href="https://blog.daruyanagi.jp/entry/2013/01/23/053227">WebMatrix &#x3067;&#x307B;&#x304B;&#x306E; Web &#x30B5;&#x30A4;&#x30C8;&#x306E;&#x30C7;&#x30B6;&#x30A4;&#x30F3;&#x3092;&#x30D1;&#x30AF;&hellip;&hellip;&#x3058;&#x3083;&#x306A;&#x304F;&#x3066;&#x3001;&#x53C2;&#x8003;&#x306B;&#x3055;&#x305B;&#x3066;&#x3044;&#x305F;&#x3060;&#x304F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> を参照。</p>

<div class="section">
<h3>データベースとのやり取り</h3>
<p>~/App_Code/Post.cs に書いておいた。一つのファイルにごちゃっと書いておけるのが ASP.NET Web Pages のお手軽なところだと思うけれど、まぁ、わけておいた方があとあとメンテナンスしやすそう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Web.WebPages;
<span class="synStatement">using</span> WebMatrix.Data;

<span class="synType">public</span> <span class="synType">class</span> Post
{
<span class="synComment">// ここら辺はテーブルの構造をそのまま定義</span>
<span class="synType">public</span> <span class="synType">long</span> Id { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Title { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Body { get; set; }
<span class="synType">public</span> DateTime CreatedAt { get; set; }
<span class="synType">public</span> DateTime UpdatedAt { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Excerpt <span class="synComment">// 本文の一部だけを取得</span>
{
<span class="synStatement">get</span>
{
<span class="synStatement">return</span> Body.IsEmpty()
? <span class="synType">string</span>.Empty
: <span class="synType">string</span>.Join(<span class="synConstant">&quot;&quot;</span>, Body.Take(<span class="synConstant">40</span>));
}
}

<span class="synComment">// クエリで受け取ったデータ（dynamic）から</span>
<span class="synComment">// Post オブジェクトを生成</span>
<span class="synType">public</span> Post(dynamic record)
{
Id = record.Id;
Title = record.Title;
Body = record.Body;
CreatedAt = record.CreatedAt;
UpdatedAt = record.UpdatedAt;
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> PostRepository
{
<span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;Post&gt; List()
{
<span class="synType">const</span> <span class="synType">string</span> query = <span class="synConstant">&quot;SELECT * FROM Post ORDER BY CreatedAt DESC&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
<span class="synStatement">return</span> db.Query(query).Select(_ =&gt; <span class="synStatement">new</span> Post(_));
}
}

<span class="synType">public</span> <span class="synType">static</span> Post Find(<span class="synType">long</span> id)
{
<span class="synType">const</span> <span class="synType">string</span> query = <span class="synConstant">&quot;SELECT * FROM Post WHERE Id=@0&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
<span class="synStatement">return</span> <span class="synStatement">new</span> Post(db.QuerySingle(query, id));
}
}

<span class="synComment">// タイトルでも検索できるように</span>
<span class="synType">public</span> <span class="synType">static</span> Post Find(<span class="synType">string</span> title)
{
<span class="synType">const</span> <span class="synType">string</span> query = <span class="synConstant">&quot;SELECT * FROM Post WHERE Title=@0&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
<span class="synStatement">return</span> <span class="synStatement">new</span> Post(db.QuerySingle(query, title));
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">long</span> Create(<span class="synType">string</span> title, <span class="synType">string</span> body)
{
<span class="synType">const</span> <span class="synType">string</span> query = <span class="synConstant">&quot;INSERT INTO Post (Title, Body, CreatedAt, UpdatedAt)&quot;</span>
+ <span class="synConstant">&quot;VALUES(@0, @1, @2, @3)&quot;</span>;
var now = DateTime.Now;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, title, body, now, now);
<span class="synComment">// INSERT した列の Id を取得するのってこうやればいいらしい</span>
var result = db.QueryValue(<span class="synConstant">&quot;SELECT @@IDENTITY&quot;</span>);
<span class="synStatement">return</span> Convert.ToInt64(result);
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Update(<span class="synType">long</span> id, <span class="synType">string</span> title, <span class="synType">string</span> body)
{
var query = <span class="synConstant">&quot;UPDATE Post SET Title=@0, Body=@1, UpdatedAt=@2 WHERE Id=@3&quot;</span>;
var now = DateTime.Now;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, title, body, now, id);
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Delete(<span class="synType">long</span> id)
{
var query = <span class="synConstant">&quot;DELETE FROM Post WHERE Id=@0&quot;</span>;

<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;db&quot;</span>))
{
db.Query(query, id);
}
}
}
</pre><p>これで List()、Find()、Create()、Update()、Delete() が使えるようになった。</p>

</div>
<div class="section">
<h3>メソッドに応じて異なるビューを呼び出す</h3>
<p>~/Posts.cshtml の中身。IIS はデフォルトで PUT/DELETE が使えないみたい。Web.config を書き換えてもいいのだけど、ここは _method = "PUT" がリクエストに含まれていたら PUT として処理することにした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Reflection

@<span class="synStatement">try</span>
{
<span class="synComment">// POST で PUT/DELETE を代用</span>
<span class="synType">string</span> method = Request.HttpMethod.ToUpper();
<span class="synStatement">if</span> (IsPost &amp;&amp; Request[<span class="synConstant">&quot;_method&quot;</span>] != <span class="synConstant">null</span>)
{
method = Request[<span class="synConstant">&quot;_method&quot;</span>].ToUpper(); <span class="synComment">// Camelize() とか作っておくといいのかも</span>
}

<span class="synComment">// パラメーターの型を解釈（なるべく long に、無理なものは string のまま）</span>
var args = UrlData.Select&lt;<span class="synType">string</span>, <span class="synType">object</span>&gt;(_ =&gt;
{
<span class="synStatement">try</span> { <span class="synStatement">return</span> <span class="synType">long</span>.Parse(_); } <span class="synStatement">catch</span> { <span class="synStatement">return</span> _; }
}).ToArray();

<span class="synComment">// メソッドの検索</span>
MethodInfo method_info = <span class="synStatement">this</span>.GetType().GetMethod(
method,
args.Select(_ =&gt; _.GetType()).ToArray()
);

<span class="synComment">// 検索したメソッドを呼び出してビューをレンダリング</span>
@method_info.Invoke(<span class="synStatement">this</span>, args);
}
<span class="synStatement">catch</span> (Exception e)
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ApplicationException();
}

@functions <span class="synComment">// HelperResult を返せば、@... で呼び出してビューがレンダリングされる</span>
{
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> VIEW_POST_DETAIL = <span class="synConstant">&quot;~/Views/Posts/_ShowPost.cshtml&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> VIEW_POST_ARCHIVE = <span class="synConstant">&quot;~/Views/Posts/_ListPosts.cshtml&quot;</span>;

<span class="synType">public</span> HelperResult GET() <span class="synComment">// Camelize() すれば Get() で呼び出せるケド</span>
{
var posts = PostRepository.List();

<span class="synStatement">switch</span> (Request.ContentType) <span class="synComment">// JSON でも返せるように！</span>
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
RenderJason(posts);
<span class="synStatement">return</span> <span class="synConstant">null</span>;
<span class="synStatement">default</span>:
<span class="synStatement">return</span> RenderPage(VIEW_POST_ARCHIVE, posts);
}
}

<span class="synType">public</span> HelperResult GET(<span class="synType">long</span> id)
{
var post = PostRepository.Find(id);
CheckIfPostIsNull(post);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">return</span> RenderJason(post);
<span class="synStatement">default</span>:
<span class="synStatement">return</span> RenderPage(VIEW_POST_DETAIL, post);
}
}

<span class="synType">public</span> HelperResult GET(<span class="synType">string</span> title)
{
var post = PostRepository.Find(title);
CheckIfPostIsNull(post);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">return</span> RenderJason(post);
<span class="synStatement">default</span>:
<span class="synStatement">return</span> RenderPage(VIEW_POST_DETAIL, post);
}
}

<span class="synType">public</span> <span class="synType">void</span> POST()
{
var title = Request[<span class="synConstant">&quot;Title&quot;</span>];
var body = Request[<span class="synConstant">&quot;Body&quot;</span>];
var id = PostRepository.Create(title, body);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">default</span>:
RenderJason(id);
<span class="synStatement">break</span>;
}
}

<span class="synType">public</span> <span class="synType">void</span> PUT(<span class="synType">long</span> id)
{
var title = Request[<span class="synConstant">&quot;Title&quot;</span>];
var body = Request[<span class="synConstant">&quot;Body&quot;</span>];
PostRepository.Update(id, title, body);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">default</span>:
RenderJason(id);
<span class="synStatement">break</span>;
}
}

<span class="synType">public</span> <span class="synType">void</span> PUT(<span class="synType">string</span> title)
{
var post = PostRepository.Find(title);
CheckIfPostIsNull(post);

var new_title = Request[<span class="synConstant">&quot;Title&quot;</span>];
var body = Request[<span class="synConstant">&quot;Body&quot;</span>];
PostRepository.Update(post.Id, new_title, body);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">default</span>:
RenderJason(post.Id);
<span class="synStatement">break</span>;
}
}

<span class="synType">public</span> <span class="synType">void</span> DELETE(<span class="synType">long</span> id)
{
PostRepository.Delete(id);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">default</span>:
RenderJason(id);
<span class="synStatement">break</span>;
}
}

<span class="synType">public</span> <span class="synType">void</span> DELETE(<span class="synType">string</span> title)
{
var post = PostRepository.Find(title);
CheckIfPostIsNull(post);

PostRepository.Delete(post.Id);

<span class="synStatement">switch</span> (Request.ContentType)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;application/json&quot;</span>:
<span class="synStatement">default</span>:
RenderJason(post.Id);
<span class="synStatement">break</span>;
}
}
}

@functions
{
<span class="synType">private</span> HelperResult RenderJason(<span class="synType">long</span> id) <span class="synComment">// Id だけを JSON で返す</span>
{
Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(<span class="synType">string</span>.Format(<span class="synSpecial">@</span><span class="synConstant">&quot;{{ &quot;&quot;Id&quot;&quot;: &quot;&quot;{0}&quot;&quot; }}&quot;</span>, id));
Response.End();
<span class="synStatement">return</span> <span class="synConstant">null</span>; <span class="synComment">// null を返すなら HelperResult 型にしなくてもいい気はする</span>
}

<span class="synType">private</span> HelperResult RenderJason(<span class="synType">object</span> post) <span class="synComment">// Post だの Posts だのを JSON で返す</span>
{
Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(Json.Encode(post));
Response.End();
<span class="synStatement">return</span> <span class="synConstant">null</span>;
}

<span class="synType">private</span> <span class="synType">void</span> CheckIfPostIsNull(Post post)
{
<span class="synStatement">if</span> (post == <span class="synConstant">null</span>)
<span class="synStatement">throw</span> <span class="synStatement">new</span> HttpException(<span class="synConstant">404</span>, <span class="synConstant">&quot;Post is not found.&quot;</span>);
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130124072621.png" alt="f:id:daruyanagi:20130124072621p:plain" title="f:id:daruyanagi:20130124072621p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130124072619.png" alt="f:id:daruyanagi:20130124072619p:plain" title="f:id:daruyanagi:20130124072619p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Content-Type によって応答が切り替わるようにしてみた。</p>

</div>
<div class="section">
<h3>ビュー</h3>
<p>全部のっけても仕方ないので、~/Views/Posts/_ShowPost.cshtml" だけを。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
var model = PageData.First().Value as Post; // もはやイディオムかな……
Page.Title = model.Title;
Page.PostId = model.Id;
Layout = &quot;~/_SiteLayout.cshtml&quot;;
}

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>@Page.Title<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>

@model.Body

@section Dialog // 編集作業はモーダルダイアログで処理することにした
{
<span class="synIdentifier">&lt;</span>aside<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;EditDocument&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">        $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">            $</span>(<span class="synConstant">'#edit-document'</span>)<span class="synSpecial">.click</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $.ajax</span>(<span class="synIdentifier">{</span>
<span class="synSpecial">                    url: </span><span class="synConstant">&quot;@Request.Url.AbsolutePath&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                    type: </span><span class="synConstant">'POST'</span><span class="synSpecial">,</span>
<span class="synSpecial">                    data: </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synConstant">'_method'</span><span class="synSpecial">: </span><span class="synConstant">&quot;PUT&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                        </span><span class="synConstant">'Title'</span><span class="synSpecial">: $</span>(<span class="synConstant">'#Edit-Title'</span>)<span class="synSpecial">.val</span>()<span class="synSpecial">,</span>
<span class="synSpecial">                        </span><span class="synConstant">'Body'</span><span class="synSpecial">: $</span>(<span class="synConstant">'#Edit-Body'</span>)<span class="synSpecial">.val</span>()<span class="synSpecial">,</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                    success: </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">data</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synIdentifier">var</span><span class="synSpecial"> uri = </span><span class="synConstant">'@Request.Url.GetRoot()/Posts/'</span><span class="synSpecial"> + data.Id;</span>
<span class="synSpecial">                        </span><span class="synStatement">window</span><span class="synSpecial">.</span><span class="synStatement">location</span><span class="synSpecial">.replace</span>(<span class="synSpecial">uri</span>)<span class="synSpecial">; </span><span class="synComment">// リダイレクト</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                    error: </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">data</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synStatement">alert</span>(<span class="synConstant">'failure'</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)
<span class="synSpecial">        </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-wrapper&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>header<span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-header&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text&quot;</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Edit-Title&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@model.Title&quot;</span><span class="synIdentifier"> /&gt;&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>header<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-content&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">textarea</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Edit-Body&quot;</span><span class="synIdentifier"> placeholder=</span><span class="synConstant">&quot;なんか書いてもええんやでぇ&quot;</span><span class="synIdentifier">&gt;</span>@model.Body<span class="synIdentifier">&lt;/</span><span class="synStatement">textarea</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>footer<span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-footer&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;javascript: void(0)&quot;</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;edit-document&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">OK</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;#close&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Close&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">キャンセル</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>footer<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>aside<span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span>aside<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;RemoveDocument&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">        $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">            $</span>(<span class="synConstant">'#remove-document'</span>)<span class="synSpecial">.click</span>(<span class="synSpecial"> </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $.ajax</span>(<span class="synIdentifier">{</span>
<span class="synSpecial">                    url: </span><span class="synConstant">&quot;@Request.Url.AbsolutePath&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                    type: </span><span class="synConstant">'POST'</span><span class="synSpecial">,</span>
<span class="synSpecial">                    data: </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synConstant">'_method'</span><span class="synSpecial">: </span><span class="synConstant">&quot;DELETE&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                    success: </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">data</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synIdentifier">var</span><span class="synSpecial"> uri = </span><span class="synConstant">'@Request.Url.GetRoot()/Posts/'</span><span class="synSpecial">;</span>
<span class="synSpecial">                        </span><span class="synStatement">window</span><span class="synSpecial">.</span><span class="synStatement">location</span><span class="synSpecial">.replace</span>(<span class="synSpecial">uri</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                    error: </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">data</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synStatement">alert</span>(<span class="synConstant">'failure'</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)
<span class="synSpecial">        </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-wrapper&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>header<span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-header&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">span</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Delete-Title&quot;</span><span class="synIdentifier"> &gt;</span>@model.Title<span class="synIdentifier">&lt;/</span><span class="synStatement">span</span><span class="synIdentifier">&gt;</span> を削除しようとしています……<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>header<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-content&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>本当に削除しますか？<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>footer<span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;modal-footer&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;javascript: void(0)&quot;</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;remove-document&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">OK</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;#close&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Close&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">キャンセル</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>footer<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>aside<span class="synIdentifier">&gt;</span>
}
</pre><p>普通の MVC フレームワークだと</p>

<ul>
<li>GET /Posts/Edit/:Id</li>
</ul><p>なんかで編集画面に遷移すると思うのだけど、今回は</p>

<ul>
<li>GET /Posts/:Id#Edit</li>
</ul><p>で編集ダイアログを表示するようにしてる（今は開発中の可読性のために #EditDocument としているけど）。ルーティング処理を手抜きしたかったのもあるし、こうした方がかっこよくないか？　ってところもあって。そんなわけで、リダイレクト処理もサーバー側が処理するのではなくて、ビューの JavaScript が担当するようになっている。</p><p>積み残した部分もあるけど、とりあえずはこれで終わり。つぎは予定通り Twitter/Facebook 認証を使ってみようかと思う。</p>

</div>