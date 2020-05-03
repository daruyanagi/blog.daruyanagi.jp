---
date: 2014-12-16T18:18:52.0000000
draft: false
title: "WebMatrix：　@nakaji のコードをパクって「えひめFreeWi-Fi」スポットを Google Map へマッピング"
tags: ["WebMatrix"]
eyecatch: 20140728155412.jpg
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140728155412.jpg" alt="f:id:daruyanagi:20140728155412j:plain" title="f:id:daruyanagi:20140728155412j:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://nakaji.hatenablog.com/entry/2014/12/16/090000">SGMLReader&#x3067;&#x300C;&#x3048;&#x3072;&#x3081;FreeWi-Fi&#x300D;&#x30B5;&#x30FC;&#x30D3;&#x30B9;&#x63D0;&#x4F9B;&#x7B87;&#x6240;&#x3092;&#x30B9;&#x30AF;&#x30EC;&#x30A4;&#x30D4;&#x30F3;&#x30B0; - &#x306A;&#x304B;&#x65E5;&#x8A18;</a> を読んで存在を知った。</p>

<blockquote cite="http://www.pref.ehime.jp/h12600/wifi/osirase260822.html">
<p>産学官で構成する愛媛県公衆無線LAN推進協議会では、外国人観光客や県内外の旅行者、地域住民等が無料で利用できるWi-Fiスポットの整備を民設民営で進めることにより、その利便性を確保し、愛媛県内の地域活性化を図る「えひめFreeWi-Fiプロジェクト」を推進しています。</p>

<cite><a href="http://www.pref.ehime.jp/h12600/wifi/osirase260822.html">&#x611B;&#x5A9B;&#x770C;&#x5E81;&#xFF0F;&#x3048;&#x3072;&#x3081;Free Wi-Fi&#x30B5;&#x30FC;&#x30D3;&#x30B9;&#x63D0;&#x4F9B;&#x7B87;&#x6240;&#x7B49;&#x306E;&#x304A;&#x77E5;&#x3089;&#x305B;</a></cite>
</blockquote>
<p>“利便性を確保し”とか“地域活性化を図る”とかいってる割りには、クソ不便なテーブルデータしか用意してないのって、ほんとお役所だなーと思いますね。</p><p>というわけで、なかじが作ってくれたコードをまるパクリして、それを Google Map へマッピングしてみた。これで、ちょっとは利便性が向上するんじゃないだろうか。</p><p>マッピングのライブラリは、</p>

<ul>
<li><a href="http://www.ryokurian.jp/atelier/google/maps_sample1.html">&#x30B5;&#x30F3;&#x30D7;&#x30EB;&#xFF11; - &#x300C;google&#x30DE;&#x30C3;&#x30D7;&#x3067;&#x8907;&#x6570;&#x4F4F;&#x6240;&#x3092;&#x4E00;&#x62EC;&#x8868;&#x793A;&#x300D;&#x306E;&#x4F5C;&#x308A;&#x65B9; - &#x7DD1;&#x91CC;&#x5EB5;</a></li>
</ul><p>をもらってきた。ちょっとコードが古いので、TypeScript で書き直したりしてみたい。</p><p>Web ページのコードはこんな感じ（spotList あたりのコードとか汚いけど）。WebMatrix（ASP.NET Web Pages）はこういう“ペライチ”のページを作るときに便利よね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Default.cshtml

@<span class="synStatement">using</span> System.Xml.Linq
@<span class="synStatement">using</span> Sgml

@{
var urlString = <span class="synConstant">&quot;http://www.pref.ehime.jp/h12600/wifi/osirase260822.html&quot;</span>;

XDocument xml;
<span class="synStatement">using</span> (var sgml = <span class="synStatement">new</span> SgmlReader() { Href = urlString, IgnoreDtd = <span class="synConstant">true</span> })
{
xml = XDocument.Load(sgml);
}

var ns = xml.Root.Name.Namespace;
var spots = xml.Descendants(ns + <span class="synConstant">&quot;table&quot;</span>)
.Last()
.Descendants(ns + <span class="synConstant">&quot;tr&quot;</span>)
.Skip(<span class="synConstant">1</span>) <span class="synComment">// タイトルをスキップ</span>
.Select(e =&gt; e.Elements(ns + <span class="synConstant">&quot;td&quot;</span>).ToList())
.Select(x =&gt; <span class="synStatement">new</span>
{
Place = x[<span class="synConstant">1</span>].Value,
Address = x[<span class="synConstant">2</span>].Value,
ServiceProvider = x[<span class="synConstant">3</span>].Value
});

var spotList = <span class="synType">string</span>.Join(<span class="synConstant">&quot;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, spots.Select(_ =&gt; _.Address.Replace(<span class="synConstant">&quot;&amp;minus;&quot;</span>, <span class="synConstant">&quot;-&quot;</span>)).ToArray());
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta http-equiv=<span class="synConstant">&quot;Content-Type&quot;</span> content=<span class="synConstant">&quot;text/html; charset=utf-8&quot;</span>/&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;
&lt;script src=<span class="synConstant">&quot;http://maps.google.com/maps/api/js?sensor=false&quot;</span>&gt;&lt;/script&gt;
&lt;script src=<span class="synConstant">&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js&quot;</span>&gt;&lt;/script&gt;
&lt;script src=<span class="synConstant">&quot;~/Scripts/sirusiizu.js&quot;</span>&gt;
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;textarea id=<span class="synConstant">&quot;addressList&quot;</span> style=<span class="synConstant">&quot;width: 80%; height: 120px;&quot;</span>&gt;@spotList&lt;/textarea&gt;

&lt;div id=<span class="synConstant">&quot;map&quot;</span> style=<span class="synConstant">&quot;width: 80%; height: 360px;&quot;</span>&gt;

&lt;/div&gt;

&lt;script&gt;
sirusiizu.initialize(<span class="synConstant">&quot;map&quot;</span>);
sirusiizu.marking(document.getElementById(<span class="synConstant">&quot;addressList&quot;</span>).<span class="synStatement">value</span>);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141216181643.png" alt="f:id:daruyanagi:20141216181643p:plain" title="f:id:daruyanagi:20141216181643p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>割とたくさんあるんやなー。</p><p><blockquote class="twitter-tweet" lang="ja"><p><a href="https://twitter.com/daruyanagi">@daruyanagi</a> 俺かやろうとしてたことを・・・(ToT)</p>&mdash; なかじ (@nakaji) <a href="https://twitter.com/nakaji/status/544782999317778434">2014, 12月 16</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>まじ申し訳ないけど、割とやっつけ仕事なので、キレイに仕上げてくれていいのよ？</p>

<ul>
<li><a href="http://ehime-wifi.azurewebsites.net/">http://ehime-wifi.azurewebsites.net/</a></li>
</ul>