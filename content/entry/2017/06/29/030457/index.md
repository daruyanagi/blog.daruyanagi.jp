---
date: 2017-06-29T03:04:57.0000000
draft: false
title: "ASP.NET Core MVC で RSS を出力する（適当版）"
tags: ["ASP.NET Core"]
eyecatch: 
---
<p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F06%2F27%2F021736" title="空の ASP.NET Core プロジェクトからとりあえず Web サイトのトップページを書いて Azure にデプロイするまで - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/06/27/021736">blog.daruyanagi.jp</a></cite></p><p>前回は ASP.NET Web Pages のサイトを、付け焼き刃で ASP.NET Core MVC に移植しました。でも、WebMatrix で作ったフィード配信機能が動作しない……。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2013%2F04%2F17%2F065153" title="WebMatrix 3: RSS フィードを出力する - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2013/04/17/065153">blog.daruyanagi.jp</a></cite></p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2013%2F04%2F18%2F031339" title="WebMatrix 3: RSS フィードを出力する（解決編） - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2013/04/18/031339">blog.daruyanagi.jp</a></cite></p><p>というわけで、こっちも簡易的な対策を行いました。</p><p>ちょっと調べた限りでは、</p>

<ul>
<li>Response は使えない → Context.Response を代わりに使う</li>
<li>System.ServiceModel.Syndication は .NET Core 1.1 で実装されていない → 自分で XML を組み立てる</li>
</ul><p>でイケそう。というわけで、まずはモデルっぽいもの（/Models/FeedItem.cs）を準備。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> FeedItem
{
<span class="synType">public</span> <span class="synType">string</span> Link { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Title { get; set; }
<span class="synType">public</span> HtmlString Content { get; set; }
<span class="synType">public</span> DateTime PublishDate { get; set; }
}
</pre><p>次にコントローラー（/Controllers/FeedController.cs）を作成。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> FeedController : Controller
{
<span class="synType">public</span> async Task&lt;IActionResult&gt; Index()
{
var feeds = <span class="synStatement">new</span> List&lt;FeedItem&gt;();
<span class="synComment">// FeedItem を適当に Add() してね！</span>
<span class="synStatement">return</span> View(feeds);
}
}
</pre><p>最後にビュー（/Views/Feed/Index.cshtml）を作成。今回は Atom で出力してみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@model IList&lt;FeedItem&gt;

@{
Context.Response.ContentType = <span class="synConstant">&quot;application/xml&quot;</span>;

var title = <span class="synConstant">&quot;daruyanagi.jp&quot;</span>;
var link = <span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>;
}

&lt;feed xmlns=<span class="synConstant">&quot;http://www.w3.org/2005/Atom&quot;</span> xml:lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;title&gt;@title&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;@link&quot;</span> /&gt;
&lt;id&gt;@link&lt;/id&gt;
@<span class="synStatement">foreach</span> (var item <span class="synStatement">in</span> Model)
{
&lt;entry&gt;
&lt;title&gt;@item.Title&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;@item.Link&quot;</span> /&gt;
&lt;id&gt;@item.Link&lt;/id&gt;
&lt;published&gt;@item.PublishDate.ToString(<span class="synConstant">&quot;yyyy-MM-dd'T'HH:mm:ss.fffK&quot;</span>)&lt;/published&gt;
&lt;/entry&gt;
}
&lt;/feed&gt;
</pre><p>簡易的な対策ですけど、まぁ、ちゃんと動いているので当面はこれでよし。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170629030059.png" alt="f:id:daruyanagi:20170629030059p:plain" title="f:id:daruyanagi:20170629030059p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>正しい作法ではない気がしますが（ちゃんとフレームワークでやり方が用意されているかも？）、自己流なりに要領をつかめてきた感じで嬉しいです。ほんとは ASP.NET Web Pages で気軽にやりたいんだけど……調べてみたらそろそろ準備が整いつつあるみたいなので楽しみ。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://t.co/8bABHDpik7">https://t.co/8bABHDpik7</a> Web Pages の後継っぽいものに Razer Pages（？）っていうのがあって、次期 VS の Update でツールサポートが付くということを理解したところで、この件に関しては休眠 Zzz……</p>&mdash; だるやなぎ に天使が舞い降りた！ (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/880084125624918016?ref_src=twsrc%5Etfw">2017年6月28日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
