---
date: 2015-09-13T03:29:22.0000000
draft: false
title: "WebMatrix： URL にドットを含めたい"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 20150913032211.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150913032211.png" alt="f:id:daruyanagi:20150913032211p:plain" title="f:id:daruyanagi:20150913032211p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Wiki エンジンなんかを作るときなど、「ドット（.）」を URL に含めたい場合は、Web.config に一行、以下のように加えるといいみたい。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;UTF-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;modules </span><span class="synType">runAllManagedModulesForAllRequests</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>静的リソースまでアプリケーションで処理するようになる（？）ので、効率が悪そうだけど。もっとちゃんと対策したければ、以下の URL が参考になりそう。</p><p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F11728846%2Fdots-in-url-causes-404-with-asp-net-mvc-and-iis" title="Dots in URL causes 404 with ASP.NET mvc and IIS" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe></p>
