---
date: 2012-02-13T00:42:41.0000000
draft: false
title: "RFC822 の日付形式"
tags: ["C#"]
eyecatch: 
---
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/02/02/225759"> RSS 2.0 &#x3092;&#x5B9F;&#x88C5;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の記述に誤りがあった<span style="color: #cccccc">（ちなみにこのブログは誤りだらけなので鵜呑みにしてはいけない）</span>。 <a href="http://hail2u.net/documents/rss20notes.html">RSS 2.0 Notes</a> によれば、日付の形式は RFC822 に従わなければいけなかったらしい。例えばこんな感じ。</p>

<blockquote>
<p>Sun, 12 Feb 2012 21:09:36 +0900</p>

</blockquote>
<p>とりあえず、こうしてみた。</p>

<pre class="code">@LastUpdated.ToString(&#34;ddd, dd MMM yyyy HH:mm:ss zzz&#34;)</pre>
<p>結果</p>

<blockquote>
<p>日, 12 2 2012 21:09:36 +09:00</p>

</blockquote>
<p>カルチャーを指定してみた。</p>

<pre class="code">@LastUpdated.ToString(
&#34;ddd, dd MMM yyyy HH:mm:ss zzz&#34;,
System.Globalization.CultureInfo.InvariantCulture)</pre>
<p>結果</p>

<blockquote>
<p>Sun, 12 Feb 2012 21:09:36 +09:00</p>

</blockquote>
<p>あともう少し。<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BF%A5%A4%A5%E0%A5%BE%A1%BC%A5%F3">タイムゾーン</a>の“:“が要らない。<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BF%A5%A4%A5%E0%A5%BE%A1%BC%A5%F3">タイムゾーン</a>の書式設定を"zz00"にすればいいかと思ったけど、世の中には分単位で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BF%A5%A4%A5%E0%A5%BE%A1%BC%A5%F3">タイムゾーン</a>を決めているとこもあるらしいので、この方法は使えない。</p>

<pre class="code">@LastUpdated.ToString(
&#34;ddd, dd MMM yyyy HH_mm_ss zzz&#34;,
System.Globalization.CultureInfo.InvariantCulture
).Replace(&#34;:&#34;, &#34;&#34;).Replace(&#34;_&#34;, &#34;:&#34;)</pre>

<blockquote>
<p>Sun, 12 Feb 2012 21:09:36 +0900</p>

</blockquote>
<p>毎回書くのはメンドクサイので DateTime の拡張メソッドにしておくとよさげ。その他にもちょいちょい修正してみた。</p>
