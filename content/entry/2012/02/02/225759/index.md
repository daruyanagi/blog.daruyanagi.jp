---
date: 2012-02-02T22:57:59.0000000
draft: false
title: "RSS 2.0 を実装する"
tags: ["C#"]
eyecatch: 
---
<p><a href="http://sample.com/Post/LastUpdated.rss">http://sample.com/Post/LastUpdated.rss</a> で <a class="keyword" href="http://d.hatena.ne.jp/keyword/RSS">RSS</a> が吐かれるようにしてみたかった。</p><p>まずはルーティング。</p>

<pre class="code">#Global.asax.cs

routes.MapRoute(
&#34;Mode&#34;, // ルート名
&#34;{controller}/{action}.{mode}&#34;, // パラメーター付きの URL
new { controller = &#34;Home&#34;,
action = &#34;Index&#34;,
id = UrlParameter.Optional,
mode = &#34;html&#34; } // パラメーターの既定値
);</pre>
<p>次はコントローラー。IPagedList は自分で作ったページング機能付きのリスト。"<a href="http://sample.com/Post/LastUpdated?mode=rss">http://sample.com/Post/LastUpdated?mode=rss</a>" でアクセスしてもいい。</p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%DD%A5%B8%A5%C8%A5%EA">レポジトリ</a>パターンにしたのにここで IPagedList 作ってるのはダサいので、あとで直そう…</p>

<pre class="code">#Post.cs

//
// GET: /Post/LastUpdated

public ViewResult LastUpdated(int current = 1, int items_per_page = 10, string mode = &#34;html&#34;)
{
var posts = new PagedList&lt;Post&gt;(
repository.GetList().OrderByDescending(p =&gt; p.UpdatedAt),
current, items_per_page);

switch (mode)
{
case &#34;<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>&#34;:
return View(&#34;LastUpdated.<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>&#34;, posts);
default:
return View(posts);
}
}</pre>
<p>最後にビュー。"LastUpdated.<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>.cshtml"ってのを追加する。<a class="keyword" href="http://d.hatena.ne.jp/keyword/XML">XML</a>宣言をファイルの先頭にしたほうがいいのかな。あと、Response.ContentType に "application/<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>+<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a>" を設定して、「今から返すんは<a class="keyword" href="http://d.hatena.ne.jp/keyword/RSS">RSS</a>やで！」と教えておく。</p>

<pre class="code">&lt;?<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a> version=&#34;1.0&#34; encoding=&#34;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&#34;?&gt;

@model IEnumerable&lt;Daruwiki.Models.Post&gt;

@{
Layout = string.Empty;
Response.ContentType = &#34;application/<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>+<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a>&#34;;

var Title = App.Name;
var SiteUrl = &#34;http://&#34; + Request.Url.Authority;
var RssUrl = Request.Url;
var Description = &#34;&#34;;
var LastUpdated = GetUnixTime(Model
.OrderByDescending(p =&gt; p.CreatedAt).First().CreatedAt);
}

@functions
{
private static DateTime <a class="keyword" href="http://d.hatena.ne.jp/keyword/UNIX">UNIX</a>_EPOCH =  new DateTime(1970, 1, 1, 0, 0, 0, 0);

public static long GetUnixTime(DateTime targetTime)
{
targetTime = targetTime.ToUniversalTime();
TimeSpan elapsedTime = targetTime - <a class="keyword" href="http://d.hatena.ne.jp/keyword/UNIX">UNIX</a>_EPOCH;
return (long)elapsedTime.TotalSeconds;
}
}

&lt;<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a> version=&#34;2.0&#34; xmlns:atom=&#34;http://www.w3.org/2005/Atom&#34;&gt;
&lt;channel&gt;
&lt;title&gt;@Title&lt;/title&gt;
&lt;link&gt;@SiteUrl&lt;/link&gt;
&lt;atom:link href=&#34;@RssUrl&#34; rel=&#34;self&#34; type=&#34;application/<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>+<a class="keyword" href="http://d.hatena.ne.jp/keyword/xml">xml</a>&#34; /&gt;
&lt;description&gt;@Description&lt;/description&gt;
&lt;language&gt;ja&lt;/language&gt;
&lt;lastBuildDate&gt;@LastUpdated&lt;/lastBuildDate&gt;
@foreach (var item in Model)
{
&lt;item&gt;
&lt;title&gt;@item.Title&lt;/title&gt;
&lt;link&gt;@SiteUrl/@item.Title&lt;/link&gt;
&lt;guid&gt;@item.PostId&lt;/guid&gt;
&lt;pubDate&gt;@item.CreatedAt&lt;/pubDate&gt;
&lt;description&gt;&lt;![CDATA[@Html.Raw(item.FormattedBody)]]&gt;&lt;/description&gt;
&lt;/item&gt;
}
&lt;/channel&gt;
&lt;/<a class="keyword" href="http://d.hatena.ne.jp/keyword/rss">rss</a>&gt;</pre>

<blockquote cite="https://twitter.com/#!/daruyanagi/status/165063412446003201">
<p>でけた。でも、その直後に RssResult っていうのがあるっぽいことを知った</p>

<cite><a href="https://twitter.com/#!/daruyanagi/status/165063412446003201">Twitter</a></cite>
</blockquote>

<blockquote cite="https://twitter.com/#!/shibayan/status/165063859919532033">
<p>@daruyanagi <a class="keyword" href="http://d.hatena.ne.jp/keyword/WCF">WCF</a> とか使えば出力できそうな気が</p>

<cite><a href="https://twitter.com/#!/shibayan/status/165063859919532033">Twitter</a></cite>
</blockquote>
<p>勉強が足りない。</p>
