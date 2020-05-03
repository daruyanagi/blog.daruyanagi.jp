---
date: 2014-08-08T18:53:57.0000000
draft: false
title: "WebMatrix 3：oEmbed ヘルパーを作ってみた"
tags: ["WebMatrix"]
eyecatch: 
---

<blockquote cite="http://oembed.com/">
<p>oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.</p>

<cite><a href="http://oembed.com/">oEmbed</a></cite>
</blockquote>
<p>要はこういうのです。</p>
<pre class="code" data-lang="" data-unlink># はてな記法の場合
https://twitter.com/daruyanagi/status/497645195769298944:embed</pre><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">乱暴するんでしょう？　エロ同人誌みたいに！</p>&mdash; だるやなぎ に天使が舞い降りた！ (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/497645195769298944?ref_src=twsrc%5Etfw">2014年8月8日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>URL → 埋め込み HTML を得るための API って感じですかね。</p><p>oEmbed API の提供方法は二種類あります。</p>

<ul>
<li>API Endpoint があらかじめ公開されており、それを叩く</li>
<li>link タグに埋め込み oEmbed のURLが埋め込まれいるので、それを叩く</li>
</ul><p>両方とも提供してくれている場合もありますが（たとえば YouTube）、前者だけだったり（Flickr）、後者だけだったり（Twitter、<a href="https://dev.twitter.com/docs/api/1/get/statuses/oembed">&#x4E00;&#x5FDC;&#x516C;&#x958B;&#x3055;&#x308C;&#x3066;&#x3044;&#x307E;&#x3059;</a>が一般的な API に比べてちょっとめんどいので link タグ探した方がいい）もします。</p><p>今回は後者だけ実装してみました。前者については、</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/07/18/033539">WebMatrix 3: Windows Store oEmbed API &#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>で一度やったことがあります。URL パターンとエンドポイントのディクショナリでももっておいて、URL がパターンにマッチした時はエンドポイントを叩く……みたいに実装すれば汎用的になるかと。</p>

<div class="section">
<h3>準備</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140808184043.png" alt="f:id:daruyanagi:20140808184043p:plain" title="f:id:daruyanagi:20140808184043p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HTML から </p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;alternate&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;application/json+oembed&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;***&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span><span class="synIdentifier">=</span><span class="synConstant">&quot;***&quot;</span><span class="synIdentifier">&gt;</span>
</pre><p>みたいなのを探してとってくる必要があるので、スクレイパー御用達の <a href="http://htmlagilitypack.codeplex.com/">CodePlex Archive</a> を NuGet で追加しておきます。</p>

</div>
<div class="section">
<h3>コード</h3>
<p>んじゃ、ガリガリ書いていきます。</p>

<div class="section">
<h4>~/App_Code/OEmbed.cshtml</h4>
<p>まずは、ヘルパー部分を書き書き。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> HtmlAgilityPack

@helper GetHtml(<span class="synType">string</span> url){
<span class="synStatement">try</span>
{
<span class="synStatement">using</span> (var downloader = <span class="synStatement">new</span> WebClient())
{
var html = downloader.DownloadString(url);

var document = <span class="synStatement">new</span> HtmlDocument();
document.LoadHtml(html);

url = document.DocumentNode.Descendants(<span class="synConstant">&quot;link&quot;</span>)
.Where(_ =&gt; _.GetAttributeValue(<span class="synConstant">&quot;type&quot;</span>, <span class="synType">string</span>.Empty) == <span class="synConstant">&quot;application/json+oembed&quot;</span>)
.Select(_ =&gt; _.GetAttributeValue(<span class="synConstant">&quot;href&quot;</span>, <span class="synType">string</span>.Empty))
.First();

var oembed_data = downloader.DownloadString(url);
var oembed_json = Json.Decode(oembed_data);

@Html.Raw(oembed_json.html)
}
}
<span class="synStatement">catch</span> (Exception e)
{
&lt;p <span class="synType">class</span>=<span class="synConstant">'</span><span class="synError">error</span><span class="synConstant">'</span>&gt;@url: @e.Message&lt;/p&gt;
}
}
</pre><p>oEmbed は XML 形式か JSON 形式でレスポンスを返すのですが、Twitter は JSON のみをサポートします。どのサービスも JSON には対応していることが多いので、JSON だけ処理すればたいていは十分です。</p><p>あと、oembed_json.html を直接使うのは怖い。サニタイズしておいた方がいいかも。ほんとはキャッシュの仕組みとかも入れておきたいですね。</p>

</div>
<div class="section">
<h4>~/Default.cshtml</h4>
<p>次にテスト用のページを書きかき。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@OEmbed.GetHtml(&quot;https://twitter.com/daruyanagi/status/497645195769298944&quot;)
@OEmbed.GetHtml(&quot;https://twitter.com/daruyanagi/status/49764519576929894&quot;)
@OEmbed.GetHtml(&quot;https://www.flickr.com/photos/daruyanagi/6219334657/&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
</div>
<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140808184012.png" alt="f:id:daruyanagi:20140808184012p:plain" title="f:id:daruyanagi:20140808184012p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>2番目は URL を間違ってみた。3番目は oEmbed 対応だけど link タグ形式ではないサービス（Flickr）で試してみた。Flickr については、API Endpoint を叩いてーという処理が必要になりますね。</p>

</div>
</div>