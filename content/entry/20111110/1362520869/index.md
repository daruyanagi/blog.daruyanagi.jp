---
date: 2011-11-10T07:01:09.0000000
draft: false
title: "WebMatrix で URL 書き換え"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-12.png"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-12-500x379.png" alt="" title="sshot-12" width="500" height="379" class="alignnone size-medium wp-image-420" /></a></p><p>前回 <a href="#f1" name="fn1" title="WebMatrix + Markdown で手軽に更新できる（？）Webサイトを作る - blog.daruyanagi.net">*1</a> の宿題。 WebMatrix で URL Rewrite をやりたいなぁーと言ってそのまま言いっ放しだったのでやってみた。</p><p>とはいえ、WebMatrix は APS.NET 技術をベースにしているので、そのやり方がそのまま使える。まぁ、わしは ASP.NET とかあまりわからないので、Google さまに聞きながら書いたのだけど。</p><p>ともかく、_<i><a href="http://sample.com/Pages/Hoge">http://sample.com/Pages/Hoge</a> (<a href="http://sample.com/Pages.cshtml/Hoge">http://sample.com/Pages.cshtml/Hoge</a>)</i>_ を _<i><a href="http://sample.com/Hoge">http://sample.com/Hoge</a></i>_に飛ばしたい場合は、Web.comfig <a href="#f2" name="fn2" title="Apacheで言えは .htaccess">*2</a> へ以下のように記述するだけでよい。</p>
<pre class="code" data-unlink>	&lt;?xml version=&#34;1.0&#34;?&gt;
&lt;configuration&gt;
&lt;system.webServer&gt;
&lt;rewrite&gt;
&lt;rules&gt;
&lt;rule name=&#34;Daruboard&#34; stopProcessing=&#34;true&#34;&gt;
&lt;match url=&#34;^(.*)$&#34; ignoreCase=&#34;false&#34; /&gt;
&lt;conditions&gt;
&lt;add input=&#34;{REQUEST_FILENAME}&#34; matchType=&#34;IsFile&#34; ignoreCase=&#34;false&#34; negate=&#34;true&#34; /&gt;
&lt;add input=&#34;{REQUEST_FILENAME}&#34; matchType=&#34;IsDirectory&#34; ignoreCase=&#34;false&#34; negate=&#34;true&#34; /&gt;
&lt;/conditions&gt;
&lt;action type=&#34;Rewrite&#34; url=&#34;Pages.cshtml/{R:1}&#34; /&gt;
&lt;/rule&gt;
&lt;/rules&gt;
&lt;/rewrite&gt;
&lt;/system.webServer&gt;
&lt;/configuration&gt;</pre><p>とても簡単だった。さっそく、 daruyanagi.net をこのアプリケーションで置き換えてみた。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://blog.daruyanagi.net/archives/388">WebMatrix + Markdown で手軽に更新できる（？）Webサイトを作る - blog.daruyanagi.net</a></span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">Apacheで言えは .htaccess</span></p>
</div>