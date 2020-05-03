---
date: 2013-04-20T22:45:01.0000000
draft: false
title: "WebMatrix 3: フィードの購読者数を取得する（1：サーバーサイド編）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130420/20130420221551.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420221551.png" alt="f:id:daruyanagi:20130420221551p:plain" title="f:id:daruyanagi:20130420221551p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こんな感じのソーシャル共有＋ RSS 購読ボタンをサイトに追加したいな、と思って、今朝少し WebMatrix と格闘していた。</p><p>SNS における共有数の取得部分は JavaScript だけで完結するのだけれど、RSS 購読数の取得部分は JavaScript だけでは少ししんどいのかなぁ。Same origin policy というものに引っかかってしまう。まぁ、こういうときは WebMatrix でサーバー側に RSS 購読数を取得するようにすればいいよね。</p>
<br />
<p>~/FeedCount/<a href="https://blog.daruyanagi.jp/">https://blog.daruyanagi.jp/</a> で <a href="https://blog.daruyanagi.jp/">https://blog.daruyanagi.jp/</a> の RSS 購読数を取得する FeedCount.cshtml を書いてみた。とりあえず今回は一番簡単な Livedoor Reader だけ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Text
@<span class="synStatement">using</span> System.Text.RegularExpressions

@functions
{
<span class="synType">public</span> <span class="synType">int</span> GetSubscriptionCountOfLiveDoorReader(<span class="synType">string</span> url)
{
<span class="synStatement">try</span>
{
<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> WebClient() {
Encoding = Encoding.UTF8 } )
{
var text = client.DownloadString(
<span class="synSpecial">@</span><span class="synConstant">&quot;http://reader.livedoor.com/about/&quot;</span> + url);
var m = <span class="synStatement">new</span> Regex(
<span class="synSpecial">@</span><span class="synConstant">&quot;&quot;&quot;subscriber_count&quot;&quot;\&gt; \((\d+) users\)&quot;</span>)
.Matches(text);

<span class="synStatement">return</span> m.Count == <span class="synConstant">0</span> ? <span class="synConstant">0</span> : m[<span class="synConstant">0</span>].Groups[<span class="synConstant">1</span>].Value.AsInt();
}
}
<span class="synStatement">catch</span>
{
<span class="synStatement">return</span> <span class="synConstant">0</span>;
}
}
}
</pre><p>Livedoor Reader の購読者数は、<a href="http://reader.livedoor.com/about/">http://reader.livedoor.com/about/</a>（URL）へアクセスすると取得できるらしい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420223407.png" alt="f:id:daruyanagi:20130420223407p:plain" title="f:id:daruyanagi:20130420223407p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは正規表現で当該部分を取得すればいい。AsInt() は ASP.NET Web Pages の便利関数。知っておくと便利だよ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var url = <span class="synType">string</span>.Join(<span class="synConstant">&quot;//&quot;</span>,
UrlData.Where(_ =&gt; !<span class="synType">string</span>.IsNullOrEmpty(_)));

var livedoor = GetSubscriptionCountOfLiveDoorReader(url);

var data = <span class="synStatement">new</span> {
livedoor = livedoor,
total = livedoor,
};

Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(Json.Encode(data));
Response.End();
}
</pre><p>今回は JSON で値を返すことにしました。JsonHelper を使うとカンタン。</p><p>結果はこんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420224202.png" alt="f:id:daruyanagi:20130420224202p:plain" title="f:id:daruyanagi:20130420224202p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code" data-lang="" data-unlink>({&#34;livedoor&#34;:6,&#34;total&#34;:6})</pre><p>次回はこれを JavaScript から呼んで、Web ページの表示しましょう。</p>

<div class="section">
<h4>注記</h4>
<p>なお、UrlDate で <a href="https://blog.daruyanagi.jp/">https://blog.daruyanagi.jp/</a> を取得しようとすると、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420223145.png" alt="f:id:daruyanagi:20130420223145p:plain" title="f:id:daruyanagi:20130420223145p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このようなエラー<a href="#f-755e4e80" name="fn-755e4e80" title="危険な可能性のある Request.Path 値がクライアント (:) から検出されました。 ">*1</a>が発生したり、そのほかにもいろいろあるのだけれど、それについてはまた稿を改めたい。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-755e4e80" name="f-755e4e80" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">危険な可能性のある Request.Path 値がクライアント (:) から検出されました。 </span></p>
</div>