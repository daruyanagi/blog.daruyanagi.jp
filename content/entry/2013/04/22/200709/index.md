---
date: 2013-04-22T20:07:09.0000000
draft: false
title: "WebMatrix 3: JSON と JSONP"
tags: ["WebMatrix", "JavaScript", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130421/20130421155340.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421155340.png" alt="f:id:daruyanagi:20130421155340p:plain" title="f:id:daruyanagi:20130421155340p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/20/224501">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;1&#xFF1A;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30B5;&#x30A4;&#x30C9;&#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/21/154036">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;2: JavaScript &#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/21/160348">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;3: CSS &#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>一連の記事では、FeedCount の結果を JSON でやり取りしていました。</p>

<div class="section">
<h3>JSON</h3>

<div class="section">
<h4>サーバーサイド</h4>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// ~/FeedCount.cshtml</span>

Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(Json.Encode(data));
Response.End();
</pre>
</div>
<div class="section">
<h4>渡されるデータ（例）</h4>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">{</span><span class="synConstant">&quot;livedoor&quot;</span>:6,<span class="synConstant">&quot;total&quot;</span>:6<span class="synIdentifier">}</span>
</pre>
</div>
<div class="section">
<h4>クライアントサイド</h4>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synComment">// ~/Script/SocialButtons.js</span>

$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'/FeedCount/'</span> + url,
dataType: <span class="synConstant">'json'</span>,
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json.total || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
</pre><p>けれど、Twitter や Facebook における共有数は JSONP で処理していました。それに合わせて、FeedCount も JSONP で処理できないか？　と思ったのですが、$.ajax の dataType を 'jsonp' にするだけでは動きません。サーバーサイドにも手を加えなければならないみたい。</p>

</div>
</div>

<div class="section">
<h3>JSONP</h3>
<p>どうやればいいのかよくわからないとつぶやいたところ、つもりんが教えてくれました。</p><p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-325426018439553025');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('325426018439553025',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-325426018439553025"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-325427106899169280');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('325427106899169280',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-325427106899169280"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-325427299942031360');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('325427299942031360',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-325427299942031360"></div></p><p>要は、JSON そのままではなく JavaScript の関数にして（コールバック関数）送り返せばいいのですね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130422195758.png" alt="f:id:daruyanagi:20130422195758p:plain" title="f:id:daruyanagi:20130422195758p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>問題はコールバックの関数の名前をどうするかですが、jQuery の場合、指定しなければ勝手に適当な名前を付けて GET[callback="***"] で送ってくるようです。というわけで、Request["callback"] とか Request.QueryStrings["callback"] で取得できますね。</p>

<div class="section">
<h4>サーバーサイド</h4>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// ~/FeedCount.cshtml</span>

Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write( <span class="synComment">// 変更 !</span>
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}({1})&quot;</span>, Request[<span class="synConstant">&quot;callback&quot;</span>], Json.Encode(data))
);
Response.End();
</pre>
</div>
<div class="section">
<h4>渡されるデータ（例）</h4>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>jQuery******(<span class="synIdentifier">{</span><span class="synConstant">&quot;livedoor&quot;</span>:6,<span class="synConstant">&quot;total&quot;</span>:6<span class="synIdentifier">}</span>);
</pre>
</div>
<div class="section">
<h4>クライアントサイド</h4>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synComment">// ~/Script/SocialButtons.js</span>

$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'/FeedCount/'</span> + url,
dataType: <span class="synConstant">'jsonp'</span>,  <span class="synComment">// &lt;- 変更 !</span>
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json.total || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
</pre><p>ちゃんと動くかな？</p><p>Request["callback"] が空であれば JSON データで返すなど、改良の余地はあるかもしれない。</p>

</div>
</div>