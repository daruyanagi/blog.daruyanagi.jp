---
date: 2016-04-02T06:15:12.0000000
draft: false
title: "UWP：はてなブックマークアプリを作るときのメモ"
tags: ["UWP", "Windows開発"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160402055718.png" alt="f:id:daruyanagi:20160402055718p:plain" title="f:id:daruyanagi:20160402055718p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ググったら自分のブログが出てきて白目。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2013%2F04%2F30%2F190004" title="Widows Store Apps: WSSE 認証（はてなフォトライフ） - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>フォトライフの記事だったが、これをブックマーク向けにちょろっと編集するだけで動いた。ただし、</p>

<ul>
<li>パスワードによる WSSE 認証は終了 → API キーを代わりに利用する</li>
<li>UA がセットされていないと 500 が返ってくる？ → 適当にセット</li>
<li><a href="http://d.hatena.ne.jp/tomity/20080213/1202890384">&#x306F;&#x3066;&#x306A;&#x304C;&#x30B9;&#x30C6;&#x30FC;&#x30BF;&#x30B9;&#x30B3;&#x30FC;&#x30C9;100 continue&#x3092;&#x30B5;&#x30DD;&#x30FC;&#x30C8;&#x3057;&#x3066;&#x3044;&#x306A;&#x3044;</a> → <a href="http://stackoverflow.com/questions/14595021/how-to-disable-the-expect-100-continue-header-in-winrts-httpwebrequest">&#x7121;&#x52B9;&#x306B;&#x3059;&#x308B;</a></li>
</ul><p>といった手直しをする必要があったけれど。</p><p>たとえば、ブックマークの編集はこんな感じ</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> API_ENDPOINT = <span class="synConstant">&quot;http://b.hatena.ne.jp/atom/&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> API_POST_URL = API_ENDPOINT + <span class="synConstant">&quot;post&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> API_EDIT_URL = API_ENDPOINT + <span class="synConstant">&quot;edit&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> USER_AGENT = <span class="synConstant">&quot;Hateboo&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> XML_ACCEPT_TYPE =
<span class="synConstant">&quot;application/x.atom+xml, application/xml, text/xml, */*&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> XML_CONTENT_TYPE = <span class="synConstant">&quot;application/x.atom+xml&quot;</span>;
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> XML_PAYLOAD
= <span class="synConstant">&quot;&lt;entry xmlns=</span><span class="synSpecial">\&quot;</span><span class="synConstant">http://purl.org/atom/ns#</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&quot;</span>
+ <span class="synConstant">&quot;&lt;title&gt;{0}&lt;/title&gt;&quot;</span>
+ <span class="synConstant">&quot;&lt;link rel=</span><span class="synSpecial">\&quot;</span><span class="synConstant">related</span><span class="synSpecial">\&quot;</span><span class="synConstant"> type=</span><span class="synSpecial">\&quot;</span><span class="synConstant">text/html</span><span class="synSpecial">\&quot;</span><span class="synConstant"> href=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant"> /&gt;&quot;</span>
+ <span class="synConstant">&quot;&lt;summary type=</span><span class="synSpecial">\&quot;</span><span class="synConstant">text/plain</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;{2}&lt;/summary&gt;&quot;</span>
+ <span class="synConstant">&quot;&lt;/entry&gt;&quot;</span>;

<span class="synType">public</span> async Task&lt;PersonalBookmark&gt;
UpdatePersonalBookmarkAsync(<span class="synType">string</span> url, <span class="synType">string</span> title, <span class="synType">string</span> comment)
{
var endpoint = API_EDIT_URL + <span class="synConstant">&quot;?url=&quot;</span> + WebUtility.UrlEncode(url);
var body = <span class="synType">string</span>.Format(XML_PAYLOAD, title, url, comment);

var request = <span class="synStatement">new</span> HttpRequestMessage(HttpMethod.Put, endpoint);
request.Headers.Add(<span class="synConstant">&quot;X-WSSE&quot;</span>, GenerateWsseHeader());
request.Headers.Add(<span class="synConstant">&quot;ContentType&quot;</span>, XML_CONTENT_TYPE);
request.Headers.Add(<span class="synConstant">&quot;User-Agent&quot;</span>, USER_AGENT); <span class="synComment">//！</span>
request.Content = <span class="synStatement">new</span> StringContent(
body, Encoding.UTF8, XML_CONTENT_TYPE);

<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> HttpClient())
{
client.DefaultRequestHeaders.ExpectContinue = <span class="synConstant">false</span>; <span class="synComment">//！</span>

<span class="synStatement">try</span>
{
var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
var entry = await GetPersonalBookmarkAsync(url);

<span class="synStatement">return</span> entry; <span class="synComment">// XML をクラスにデシリアライズしてポイ</span>
}
<span class="synStatement">catch</span>
{
<span class="synStatement">return</span> <span class="synStatement">new</span> PersonalBookmark(); <span class="synComment">// 空インスタンスをポイ</span>
}
}
}
</pre><p>ほんとは WSSE ではなく OAuth＋WebAuthenticator を使いたかったのだけど、うまく動かせなかったのでそれはまた今度。</p>
