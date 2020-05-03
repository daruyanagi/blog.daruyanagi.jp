---
date: 2013-09-07T05:50:29.0000000
draft: false
title: "WebMatrix 3: Twitter ライブラリ Tweetinvi API でツイートしてみる"
tags: ["WebMatrix", "ASP.net Web Pages", "Twitter"]
eyecatch: 20130907053932.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130907053932.png" alt="f:id:daruyanagi:20130907053932p:plain" title="f:id:daruyanagi:20130907053932p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たまたま <a href="https://tweetinvi.codeplex.com/">Tweetinvi a friendly Twitter C# API - Home</a> というのをみかけたのだけど、割と便利だった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var token = <span class="synStatement">new</span> TwitterToken.Token(
<span class="synConstant">&quot;*****************Pj5ecAhlw3SqBPU5qHtBUSiTQDcgmUzBU&quot;</span>,
<span class="synConstant">&quot;*****************RZSPVglcM0TfE7mPCFzm334rw&quot;</span>,
<span class="synConstant">&quot;*****************cSizQ&quot;</span>,
<span class="synConstant">&quot;*****************zws06agyxRXImPk9sfETNQeg&quot;</span>);

<span class="synStatement">if</span> (IsPost)
{
var tweet = <span class="synStatement">new</span> Tweetinvi.Tweet(<span class="synConstant">&quot;てすてす&quot;</span>);
tweet.Publish(token);
}
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta http-equiv=<span class="synConstant">&quot;Content-Type&quot;</span> content=<span class="synConstant">&quot;text/html; charset=utf-8&quot;</span>/&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul&gt;
@<span class="synStatement">foreach</span> (var tweet <span class="synStatement">in</span> <span class="synStatement">new</span> Tweetinvi.User(<span class="synConstant">&quot;daruyanagi&quot;</span>, token).GetUserTimeline())
{
&lt;li&gt;@tweet.Text&lt;/li&gt;
}
&lt;/ul&gt;

&lt;form action=<span class="synConstant">&quot;&quot;</span> method=<span class="synConstant">&quot;post&quot;</span>&gt;
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> /&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130907054421.png" alt="f:id:daruyanagi:20130907054421p:plain" title="f:id:daruyanagi:20130907054421p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GET でタイムラインを表示（なんかゴミ（\）が入ってるけど、バグかな。あとで報告しよう）。POST でツイート。</p><p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://a0.twimg.com/profile_images/378800000393919137/3f8f24154e59a5b674e1e6893a34a7e5_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      てすてす</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/376083703023157249" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-09-07</span> <span class="twitter-detail-info-time">05:45:16</span></a> <span class="twitter-detail-info-source">via <a href="http://127.0.0.1:5551/" rel="nofollow">建造メモ</a></span></p></div></div></p><p>Twitter 系のライブラリってピンキリだけど、これは UserStreams も扱えるようで、悪くない感じかな。デスクトップアプリにも組み込める、というか、PIN の認証はあるけど Web アプリの認証は今のところ未実装みたいなので、どっちかっていうと今のところデスクトップアプリ向けって感じ。</p>

<div class="section">
<h3>不具合、直していただきました</h3>

<ul>
<li><a href="https://tweetinvi.codeplex.com/SourceControl/changeset/31484">Tweetinvi a friendly Twitter C# API - Source Code</a></li>
</ul><p>レスポンス、ちょっぱや！　対応の早いところも推せますね、このライブラリ。ちなみに String.CleanString() という処理が入っているのが原因でした。</p>

<blockquote>
<p>If you want to store the Text in a database you can still use the extension method : <br />
String.CleanString() before the INSERT / UPDATE call. </p>

</blockquote>
<p>String.CleanString() は String の拡張メソッドで、サニタイズだかエスケープだかをするのかな？　MySQL はぜんぜん知らない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// Clean a string so that it can be used in a URL and</span>
<span class="synComment">/// sent to Twitter</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">param</span><span class="synIdentifier"> </span><span class="synType">name</span>=<span class="synConstant">&quot;s&quot;</span><span class="synIdentifier">&gt;</span><span class="synComment">String to clean</span><span class="synIdentifier">&lt;/</span><span class="synStatement">param</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">returns</span><span class="synIdentifier">&gt;</span><span class="synComment">Cleaned string</span><span class="synIdentifier">&lt;/</span><span class="synStatement">returns</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> CleanString(<span class="synStatement">this</span> <span class="synType">string</span> s)
{
<span class="synStatement">return</span> s != <span class="synConstant">null</span> ? (s.HTMLDecode().MySQLClean().ReplaceNonPrintableCharacters(<span class="synConstant">'</span><span class="synSpecial">\\</span><span class="synConstant">'</span>)) : <span class="synConstant">null</span>;
}
</pre>
</div>