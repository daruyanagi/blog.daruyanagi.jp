---
date: 2014-09-08T00:33:44.0000000
draft: false
title: "はてなブログが oEmbed に対応したらしいので WebMatrix で使ってみる"
tags: ["WebMatrix"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140908/20140908003018.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140908003018.png" alt="f:id:daruyanagi:20140908003018p:plain" title="f:id:daruyanagi:20140908003018p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li><a href="http://staff.hatenablog.com/entry/2014/09/03/153938">&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;oEmbed API&#x3092;&#x516C;&#x958B;&#x3057;&#x307E;&#x3057;&#x305F;&#x3002;&#x30D6;&#x30ED;&#x30B0;&#x30AB;&#x30FC;&#x30C9;&#x306E;&#x60C5;&#x5831;&#x3092;API&#x3067;&#x53D6;&#x5F97;&#x3067;&#x304D;&#x307E;&#x3059;&#xFF08;&#x958B;&#x767A;&#x8005;&#x5411;&#x3051;&#xFF09; - &#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;&#x958B;&#x767A;&#x30D6;&#x30ED;&#x30B0;</a></li>
</ul><p>せっかくなので、WebMatrix のヘルパーにしてトップページでも使ってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/OEmbed.cshtml

@helper Hatena (<span class="synType">string</span> url) {
<span class="synStatement">try</span>
{
<span class="synStatement">using</span> (var downloader = <span class="synStatement">new</span> WebClient())
{
var request = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;http://hatenablog.com/oembed?url={0}&amp;format={1}&quot;</span>,
url, <span class="synConstant">&quot;json&quot;</span>
);

var oembed_data = downloader.DownloadString(request);
var oembed_json = Json.Decode(oembed_data);

@Html.Raw(oembed_json.html);

<span class="synComment">// @ObjectInfo.Print(oembed_json)</span>
}
}
<span class="synStatement">catch</span> (Exception e)
{
&lt;p <span class="synType">class</span>=<span class="synConstant">'</span><span class="synError">error</span><span class="synConstant">'</span>&gt;@url: @e.Message&lt;/p&gt;
}
}
</pre><p>使い方はこんな感じ。ちゃんと運用するなら WebCache とか使って少し高速化してみるのもいいかもしれない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@OEmbed.Hatena(<span class="synConstant">&quot;https://blog.daruyanagi.jp/entry/2014/07/03/035624&quot;</span>)
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140908003132.png" alt="f:id:daruyanagi:20140908003132p:plain" title="f:id:daruyanagi:20140908003132p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>はてなブログのところだけデザインがカッコよくて違和感があるけれど、まぁ、とりあえずこれで。 </p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140908003322.png" alt="f:id:daruyanagi:20140908003322p:plain" title="f:id:daruyanagi:20140908003322p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>@ObjectInfo.Print() を有効化してみると JSON でもらえる値がわかるので、これを利用して周りにフィットするようにダサくカードをデザインし直してもいいな（何</p>
