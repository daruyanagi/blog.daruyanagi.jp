---
date: 2013-05-01T03:11:48.0000000
draft: false
title: "Windows Store Apps：Cookie を取得して、ログインが必要なページを閲覧する（はてなフォトライフ）"
tags: ["Windows ストア アプリ", "C#", "はてな"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130501024203.png" alt="f:id:daruyanagi:20130501024203p:plain" title="f:id:daruyanagi:20130501024203p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さてはて、<a href="https://blog.daruyanagi.jp/entry/2013/04/30/190004">Widows Store Apps: WSSE &#x8A8D;&#x8A3C;&#xFF08;&#x306F;&#x3066;&#x306A;&#x30D5;&#x30A9;&#x30C8;&#x30E9;&#x30A4;&#x30D5;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で AtomPub API（<a href="http://developer.hatena.ne.jp/ja/documents/fotolife/apis/atom">&#x306F;&#x3066;&#x306A;&#x30D5;&#x30A9;&#x30C8;&#x30E9;&#x30A4;&#x30D5;AtomAPI - Hatena Developer Center</a>）を無事叩けるようになったのだが、これがショボい。ファイルの操作系（EditURI）はともかく、情報の取得系（FeedURI）がとくにヘボくて、ちゃんと情報が取れないわ<a href="#f-eed2f1fc" name="fn-eed2f1fc" title="うちの環境では hatena:imageurl の情報が欠損する">*1</a>、ルートフォルダの内容しか取得できないわ。どうやら「情報の取得には RSS を使ってね」ということのようだ。なんだそれ。確かにそれでたいていは十分かもしれないけど、フォルダの列挙なんかはどうするんだ……こんなんだったらスクレイピング前提で組んだほうが早かった。</p><p>まぁ、それはともかく。</p><p>RSS を使えば（直近の）画像は取得できるが、非公開フォルダの画像に関しては、当然ログインが必要だ。なんとかして Cookie を取得し、それを使いまわさなければならない。というわけで、やってみた。</p>


<div class="section">
<h3>ログイン Cookie の取得</h3>
<p><a href="https://www.hatena.ne.jp/login">https://www.hatena.ne.jp/login</a> にユーザー名とアカウントを POST してログインする。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> CookieContainer auth_cookies = <span class="synConstant">null</span>;

<span class="synType">public</span> CookieContainer AuthCookie
{
<span class="synStatement">get</span>
{
<span class="synStatement">if</span> (auth_cookies == <span class="synConstant">null</span>)
{
var base_address = <span class="synStatement">new</span> Uri(<span class="synConstant">&quot;https://www.hatena.ne.jp/&quot;</span>);
var cookie_container = <span class="synStatement">new</span> CookieContainer();

<span class="synStatement">using</span> (var handler = <span class="synStatement">new</span> HttpClientHandler() {
CookieContainer = cookie_container
})
<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> HttpClient(handler) {
BaseAddress = base_address
})
{
var content = <span class="synStatement">new</span> FormUrlEncodedContent(
<span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;
{
{ <span class="synConstant">&quot;name&quot;</span>, UserName},
{ <span class="synConstant">&quot;password&quot;</span>, Password},
{ <span class="synConstant">&quot;auto_login&quot;</span>, <span class="synConstant">&quot;1&quot;</span>},
});

var result = client.PostAsync(<span class="synConstant">&quot;/login&quot;</span>, content).Result;
var text = result.Content.ReadAsStringAsync().Result;
}
auth_cookies = cookie_container;
}
<span class="synStatement">return</span> auth_cookies;
}
}
</pre><p>プロパティにしてみた。初めて利用する際にログイン処理が行われ、Cookie を取得・格納する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130501031030.png" alt="f:id:daruyanagi:20130501031030p:plain" title="f:id:daruyanagi:20130501031030p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>自前で <a href="http://msdn.microsoft.com/ja-jp/library/system.net.http.httpclienthandler.aspx">Microsoft &#x306E;&#x30C6;&#x30AF;&#x30CB;&#x30AB;&#x30EB; &#x30C9;&#x30AD;&#x30E5;&#x30E1;&#x30F3;&#x30C8;&#x306E;&#x4EE5;&#x524D;&#x306E;&#x30D0;&#x30FC;&#x30B8;&#x30E7;&#x30F3; | Microsoft Docs</a> を用意して、HttpClient の動作をカスタマイズしてあげるのがポイント。ここでは <a href="http://msdn.microsoft.com/ja-jp/library/system.net.cookiecontainer(v=vs.110).aspx">CookieContainer Class (System.Net) | Microsoft Docs</a> を取得し、それを保持するようにした<a href="#f-605ccd05" name="fn-605ccd05" title="ほんとはログイン情報だけ抜き取って使いまわすべきだろうけれど、今回は構わないだろうと思う">*2</a>。</p>

</div>
<div class="section">
<h3>ログイン Cookie の利用</h3>
<p>先ほど取得した Cookie を使って RSS を GET する。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> List&lt;FotoItem&gt; GetFotosByRss(<span class="synType">string</span> folder = <span class="synConstant">null</span>)
{
var url = <span class="synType">string</span>.IsNullOrEmpty(folder)
? <span class="synType">string</span>.Format(<span class="synConstant">&quot;http://f.hatena.ne.jp/{0}/rss&quot;</span>, UserName)
: <span class="synType">string</span>.Format(<span class="synConstant">&quot;http://f.hatena.ne.jp/{0}/{1}/rss&quot;</span>, UserName, WebUtility.UrlEncode(folder).Replace(<span class="synConstant">&quot;+&quot;</span>, <span class="synConstant">&quot;%20&quot;</span>));

<span class="synStatement">using</span> (var handler = <span class="synStatement">new</span> HttpClientHandler() { CookieContainer = AuthCookie, })
<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> HttpClient(handler))
{
var response = client.GetAsync().Result;

<span class="synStatement">switch</span> (response.StatusCode)
{
<span class="synStatement">case</span> HttpStatusCode.OK:
<span class="synType">const</span> <span class="synType">string</span> NS_RSS = <span class="synConstant">&quot;{http://purl.org/rss/1.0/}&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> NS_CONTENT = <span class="synConstant">&quot;{http://purl.org/rss/1.0/modules/content/}&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> NS_HATENA = <span class="synConstant">&quot;{http://www.hatena.ne.jp/info/xmlns#}&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> NS_DC = <span class="synConstant">&quot;{http://purl.org/dc/elements/1.1/}&quot;</span>;

<span class="synStatement">return</span> XDocument.Parse(response.Content.ReadAsStringAsync().Result)
.Descendants(NS_RSS + <span class="synConstant">&quot;item&quot;</span>)
.Select(_ =&gt; <span class="synStatement">new</span> FotoItem()
{
Title = _.Element(NS_RSS + <span class="synConstant">&quot;title&quot;</span>).Value,
Url = _.Element(NS_RSS + <span class="synConstant">&quot;link&quot;</span>).Value,
Description = _.Element(NS_RSS + <span class="synConstant">&quot;description&quot;</span>).Value,
Content = _.Element(NS_CONTENT + <span class="synConstant">&quot;encoded&quot;</span>).Value,
Date = _.Element(NS_DC + <span class="synConstant">&quot;date&quot;</span>).Value,
ImageUrl = _.Element(NS_HATENA + <span class="synConstant">&quot;imageurl&quot;</span>).Value,
ImageUrlSmall = _.Element(NS_HATENA + <span class="synConstant">&quot;imageurlsmall&quot;</span>).Value,
ImageUrlMedium = _.Element(NS_HATENA + <span class="synConstant">&quot;imageurlmedium&quot;</span>).Value,
Syntax = _.Element(NS_HATENA + <span class="synConstant">&quot;syntax&quot;</span>).Value,
Colors = _.Element(NS_HATENA + <span class="synConstant">&quot;colors&quot;</span>).Elements().Select(e =&gt; e.Value).ToArray(),
}
).ToList();

<span class="synStatement">default</span>:
Debug.WriteLine(client);
Debug.WriteLine(response);
<span class="synStatement">throw</span> <span class="synStatement">new</span> Exception(<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}: {1}&quot;</span>, response.StatusCode, response.ReasonPhrase));
}

}
}
</pre><p>重要なのは、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var handler = <span class="synStatement">new</span> HttpClientHandler()
{
CookieContainer = AuthCookie,
}
</pre><p>の部分だけ。公開フォルダなら、HttpClientHandler なしでいいね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> FotoItem
{
<span class="synComment">// AtomPub で取得できる情報</span>
<span class="synType">public</span> <span class="synType">string</span> Title { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Url { get; set; }
<span class="synType">public</span> <span class="synType">string</span> EditUrl { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Issued { get; set; }
<span class="synType">public</span> <span class="synType">string</span>[] Autors { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Id { get; set; }
<span class="synType">public</span> <span class="synType">string</span> ImageUrl { get; set; }
<span class="synType">public</span> <span class="synType">string</span> ImageUrlSmall { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Syntax { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Content { get; set; }

<span class="synComment">// RSS で取得できる情報</span>
<span class="synType">public</span> <span class="synType">string</span> Description { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Date { get; set; }
<span class="synType">public</span> <span class="synType">string</span> ImageUrlMedium { get; set; }
<span class="synType">public</span> <span class="synType">string</span>[] Colors { get; set; }

<span class="synComment">// 画像をバインディングするためのプロパティ</span>
<span class="synType">public</span> BitmapSource ImageSource
{
<span class="synStatement">get</span>
{
<span class="synStatement">return</span> <span class="synStatement">new</span> BitmapImage(<span class="synStatement">new</span> Uri(ImageUrl));
}
}
}
</pre><p>RSS を処理して、以上のようなオブジェクトのリストを作り、ListView だかなんだかにバインディングしてあげたらこんな感じになる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130501030722.png" alt="f:id:daruyanagi:20130501030722p:plain" title="f:id:daruyanagi:20130501030722p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>デザインもクソもないけど。</p><p>正直ここで飽きたので、このアプリはもうこれ以上作らない。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-eed2f1fc" name="f-eed2f1fc" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">うちの環境では hatena:imageurl の情報が欠損する</span></p>
<p class="footnote"><a href="#fn-605ccd05" name="f-605ccd05" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">ほんとはログイン情報だけ抜き取って使いまわすべきだろうけれど、今回は構わないだろうと思う</span></p>
</div>