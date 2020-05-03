---
date: 2013-04-21T15:40:36.0000000
draft: false
title: "WebMatrix 3: フィードの購読者数を取得する（2: JavaScript 編）"
tags: ["WebMatrix", "JavaScript"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130420/20130420221551.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420221551.png" alt="f:id:daruyanagi:20130420221551p:plain" title="f:id:daruyanagi:20130420221551p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/04/20/224501">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;1&#xFF1A;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30B5;&#x30A4;&#x30C9;&#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で吐いた JSON を JavaScript で読み取ってみる。</p>


<div class="section">
<h3>SocialButtons.js</h3>
<p>Scrips フォルダの中にいれておく。jQuery が必要なので、NuGet で入手しておく。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">function</span> get_twitter_button(url, dest, text) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> share = <span class="synConstant">'https://twitter.com/share?url='</span> + url + <span class="synConstant">'&amp;text='</span> + text;
<span class="synIdentifier">var</span> comment = <span class="synConstant">'https://twitter.com/search/?q='</span> + url;
<span class="synIdentifier">var</span> span = $(<span class="synConstant">'&lt;span&gt;'</span>).addClass(<span class="synConstant">'twitter'</span>);
$(<span class="synConstant">'#'</span> + dest).append(span);
<span class="synIdentifier">var</span> element;
element = $(<span class="synConstant">'&lt;a&gt;'</span>).text(<span class="synConstant">'twitter'</span>).addClass(<span class="synConstant">'service-name'</span>).attr(<span class="synConstant">'href'</span>, share);
span.append(element);
element = $(<span class="synConstant">'&lt;a&gt;'</span>).addClass(<span class="synConstant">'count'</span>).attr(<span class="synConstant">'href'</span>, comment);
span.append(element);
$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'http://urls.api.twitter.com/1/urls/count.json?url='</span> + url,
dataType: <span class="synConstant">'jsonp'</span>,
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json.count || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>

<span class="synIdentifier">function</span> get_facebook_button(url, dest, text) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> share = <span class="synConstant">'http://www.facebook.com/sharer.php?u='</span> + url + <span class="synConstant">'&amp;t='</span> + text;
<span class="synIdentifier">var</span> comment = <span class="synConstant">''</span>;
<span class="synIdentifier">var</span> span = $(<span class="synConstant">'&lt;span&gt;'</span>).addClass(<span class="synConstant">'facebook'</span>);
$(<span class="synConstant">'#'</span> + dest).append(span);
<span class="synIdentifier">var</span> element;
element = $(<span class="synConstant">'&lt;a&gt;'</span>).text(<span class="synConstant">'facebook'</span>).addClass(<span class="synConstant">'service-name'</span>).attr(<span class="synConstant">'href'</span>, share);
span.append(element);
element = $(<span class="synConstant">'&lt;a&gt;'</span>).addClass(<span class="synConstant">'count'</span>).attr(<span class="synConstant">'href'</span>, comment);
span.append(element);
$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'https://graph.facebook.com/'</span> + url,
dataType: <span class="synConstant">'jsonp'</span>,
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json.shares || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>

<span class="synIdentifier">function</span> get_hatena_button(url, dest, text) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> share = <span class="synConstant">'http://b.hatena.ne.jp/add?mode=confirm&amp;url='</span> + url + <span class="synConstant">'&amp;title='</span> + text;
<span class="synIdentifier">var</span> comment = <span class="synConstant">'http://b.hatena.ne.jp/entry/'</span> + url;
<span class="synIdentifier">var</span> span = $(<span class="synConstant">'&lt;span&gt;'</span>).addClass(<span class="synConstant">'hatena'</span>);
$(<span class="synConstant">'#'</span> + dest).append(span);
<span class="synIdentifier">var</span> element;
element = $(<span class="synConstant">'&lt;a&gt;'</span>).text(<span class="synConstant">'hatena'</span>).addClass(<span class="synConstant">'service-name'</span>).attr(<span class="synConstant">'href'</span>, share);
span.append(element);
element = $(<span class="synConstant">'&lt;a&gt;'</span>).addClass(<span class="synConstant">'count'</span>).attr(<span class="synConstant">'href'</span>, comment);
span.append(element);
$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'http://api.b.st-hatena.com/entry.count?url='</span> + url,
dataType: <span class="synConstant">'jsonp'</span>,
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>

<span class="synIdentifier">function</span> get_feed_button(url, dest, text) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> share = url + <span class="synConstant">'feed'</span>;
<span class="synIdentifier">var</span> comment = url;
<span class="synIdentifier">var</span> span = $(<span class="synConstant">'&lt;span&gt;'</span>).addClass(<span class="synConstant">'feed'</span>);
$(<span class="synConstant">'#'</span> + dest).append(span);
<span class="synIdentifier">var</span> element;
element = $(<span class="synConstant">'&lt;a&gt;'</span>).text(<span class="synConstant">'feed'</span>).addClass(<span class="synConstant">'service-name'</span>).attr(<span class="synConstant">'href'</span>, share);
span.append(element);
element = $(<span class="synConstant">'&lt;a&gt;'</span>).addClass(<span class="synConstant">'count'</span>).attr(<span class="synConstant">'href'</span>, comment);
span.append(element);
$.ajax(<span class="synIdentifier">{</span>
url: <span class="synConstant">'/FeedCount/'</span> + url,
dataType: <span class="synConstant">'json'</span>,
success: <span class="synIdentifier">function</span> (json) <span class="synIdentifier">{</span>
element.text(json.total || 0);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>

<span class="synIdentifier">function</span> get_social_button(url, dest, text) <span class="synIdentifier">{</span>
get_twitter_button(url, dest, text);
get_facebook_button(url, dest, text);
get_hatena_button(url, dest, text);
get_feed_button(url, dest, text);
<span class="synIdentifier">}</span>
</pre>
</div>
<div class="section">
<h3>Default.cshtml でテスト</h3>
<p>これでだいたいうまく動くはず。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

@{
var page_title = &quot;マイ サイトのタイトル&quot;;
}

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>@page_title<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/SocialButtons.css&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/jquery-1.9.1.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/SocialButtons.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;social-buttons&quot;</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;social-button&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">                get_social_button</span>(<span class="synConstant">'https://blog.daruyanagi.jp/'</span><span class="synSpecial">, </span><span class="synConstant">'social-buttons'</span><span class="synSpecial">, </span><span class="synConstant">'@page_title'</span>)
<span class="synSpecial">            </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>今回は別に説明することはなにもない。div#social-buttons 以下にこんな感じの DOM が生成される。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421155340.png" alt="f:id:daruyanagi:20130421155340p:plain" title="f:id:daruyanagi:20130421155340p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>話は変わるけど、最近の Firefox の開発者ツールはかなり進化している。おもにビジュアル的に。機能面では使いこなせていないモノが多数あるので、意見は差し控えておく。</p><p>それにしても JavaScript は苦手だなぁ……もう少しスマートに書けないものなのかな。</p>

</div>