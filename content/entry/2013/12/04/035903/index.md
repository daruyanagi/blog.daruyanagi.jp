---
date: 2013-12-04T03:59:03.0000000
draft: false
title: "Razor で組まれた CMS「razorC.net CMS」"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20131204/20131204034929.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131204034929.png" alt="f:id:daruyanagi:20131204034929p:plain" title="f:id:daruyanagi:20131204034929p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ASP.NET Web Pages（razor syntax）で開発された CMS で、WebMatrix で開いていろいろ改造できるみたい。</p>

<ul>
<li><a href="http://www.razorc.net/">Open Source ASP.net CMS for WebMatrix - razorC.net</a></li>
</ul><p>実際に WebMatrix で動かすとこんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131204035825.png" alt="f:id:daruyanagi:20131204035825p:plain" title="f:id:daruyanagi:20131204035825p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131204035237.png" alt="f:id:daruyanagi:20131204035237p:plain" title="f:id:daruyanagi:20131204035237p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>機能的には割と普通というか、自動バックアップ機能とテーマ機能、レイアウトエディターが気になる程度。</p><p>ちょっと面白いなと思ったのはコレ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// _AppStart.cshtml</span>

@<span class="synStatement">using</span> System.Web.Routing

@{
RouteTable.Routes.MapWebPageRoute(
<span class="synConstant">&quot;{rcPageName}/{rc0}/{rc1}&quot;</span>,
<span class="synConstant">&quot;~/Default.cshtml&quot;</span>,
<span class="synStatement">new</span> {
rcPageName = <span class="synConstant">&quot;default&quot;</span>,
rc0=-<span class="synConstant">1</span>,
rc1=-<span class="synConstant">1</span>
}
);
}
</pre><p>別に<a href="https://blog.daruyanagi.jp/entry/2012/07/06/174414">&#x898F;&#x7D04;&#x30D9;&#x30FC;&#x30B9;&#x306E;&#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0;</a>を無理して使う必要はなかったんだな。言われてみればそうなのだろうけれど、割りと目から鱗だった。</p>

<ul>
<li><a href="http://www.mikesdotnetting.com/Article/187/More-Flexible-Routing-For-ASP.NET-Web-Pages">More Flexible Routing For ASP.NET Web Pages</a></li>
</ul>