---
date: 2012-02-25T19:34:53.0000000
draft: false
title: "favicon.ico を置いてないといちいちルーティングに引っかかってめんどくさい"
tags: ["ASP.NET"]
eyecatch: 
---
<p><img src="20120225192952.png" alt="f:id:daruyanagi:20120225192952p:plain" title="f:id:daruyanagi:20120225192952p:plain" class="hatena-fotolife"></p><p><i>エラー：データが見つからないぜ → <a class="keyword" href="http://d.hatena.ne.jp/keyword/favicon">favicon</a>.<a class="keyword" href="http://d.hatena.ne.jp/keyword/ico">ico</a> がルーティングに引っかかってました！</i> というのがめんどくさい時は、</p>

<pre class="code" data-unlink>## Global.asax

public static void RegisterRoutes(RouteCollection routes)
{
routes.IgnoreRoute(&#34;{resource}.axd/{*pathInfo}&#34;);
routes.IgnoreRoute(&#34;favicon.ico&#34;);
:</pre>
<p>と、favicon.ico を無視するルーティングを一行書き加えておくとイイ。</p><p>via <a href="http://stackoverflow.com/questions/6596715/favicon-icon-mvc3-asp-net">Favicon Icon-MVC3 ASP.NET - Stack Overflow</a></p>
