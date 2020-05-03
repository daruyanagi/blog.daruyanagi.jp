---
date: 2013-03-24T20:04:29.0000000
draft: false
title: "メモ：Request でつまづく"
tags: ["ASP.net Web Pages", "宿題"]
eyecatch: 
---

<div class="section">
<h3>Request</h3>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/system.web.httprequest.aspx">
<p>QueryString 、Form、Cookies、ServerVariables の各コレクションから指定したオブジェクトを取得します。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/system.web.httprequest.aspx">HttpRequest &#x30AF;&#x30E9;&#x30B9; (System.Web)</a></cite>
</blockquote>
<p>Default.cshtml?Hoge=Fuga というリクエストがあった時、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Request[<span class="synConstant">&quot;Hoge&quot;</span>]  =&gt; <span class="synConstant">&quot;Fuga&quot;</span>
</pre><p>が得られる。つまり、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Request.QueryString[<span class="synConstant">&quot;Hoge&quot;</span>]  =&gt; <span class="synConstant">&quot;Fuga&quot;</span>
</pre><p>これと同様。ちなみに、存在しないキーを指定すると</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Request[<span class="synConstant">&quot;HogeHoge&quot;</span>]  =&gt; <span class="synType">string</span>.Empty
</pre><p>が返る。null じゃないのか！ null だったら、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var text = Request[<span class="synConstant">&quot;Hoge&quot;</span>] ?? <span class="synConstant">&quot;初期値&quot;</span>;
</pre><p>って書けるのになぁ。まぁ、いろいろ大人の事情があるんだろう。</p>

</div>
<div class="section">
<h3>Request.QueryString<span data-unlink> と Request.Form</span></h3>
<p>QueryString でも Form でも "Hoge" というキーが含まれているとき、Request["Hoge"] では Request.QueryString["Hoge"]  の値が返る。</p><p>つまり、優先度は</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>QueryString &gt; Form
</pre><p>であるらしい。QueryString 、Form、Cookies、ServerVariables がどの順番で優先されるのかは知らないけれど、まぁ、この順番なんだろうなって気はしてる（試してない）。</p><p>ついつい Form[] を多用するのだけれど、こういうのが分かってないとたまにハマるみたい orz</p>

</div>
<div class="section">
<h3>Request.QueryString[] におけるキーの重複</h3>
<p>では、</p>
<pre class="code lang-" data-lang="" data-unlink>Default.cshtml?Hoge=1&amp;Hoge=2&amp;Hoge=3</pre><p>で Request["Hoge"] すると何が返るんだろう？　めんどくさくて試してないけど、たぶんこれは 3 じゃないかと思う。なんとなく。</p><p>気が向いた時の宿題にしておこう。</p>

</div>