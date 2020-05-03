---
date: 2016-09-19T22:44:30.0000000
draft: false
title: "UWP：はてなの oAuth 認証"
tags: ["UWP", "はてな", "C#"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160919220838.png" alt="f:id:daruyanagi:20160919220838p:plain" title="f:id:daruyanagi:20160919220838p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プログラミングの秋……なのかな？　最近、またプログラミングをちょろちょろとやっています。今回は、UWP。一つ新しいのができたのでストアに提出して、今はむかし作りかけて放置中のはてブをつけるアプリを完成させようと四苦八苦してる途中。</p><p>実はこのアプリ、ほぼ完成していて、Windows 10 Mobile ではてブみたりはてブつけるのに使っているのだけど、セットアップに AtomPub の APIキー を使うタイプなんだよね。自分で使う分にはこれでもいいんだけど、ちょっとダサいので oAuth でやりたかった。</p>

<div class="section">
<h3>AsyncOAuth を導入する</h3>
<p>さて、oAuth はトークンのやり取りとかハッシュとかヘッダーの生成とか、いろいろややこしい処理がある。自分でも組んでみたけど、どこかちょっと間違ってるみたいで、なかなか認証が通らない。というわけで、ライブラリさまのお力を借りた。</p><p>いろいろ探してみたんだけど、AsyncOAuth が一番気に入ったかも。</p>

<ul>
<li><a href="http://neue.cc/2013/02/27_398.html">neue cc - AsyncOAuth - C#&#x7528;&#x306E;&#x5168;&#x30D7;&#x30E9;&#x30C3;&#x30C8;&#x30D5;&#x30A9;&#x30FC;&#x30E0;&#x5BFE;&#x5FDC;&#x306E;&#x975E;&#x540C;&#x671F;OAuth&#x30E9;&#x30A4;&#x30D6;&#x30E9;&#x30EA;</a></li>
</ul><p>UWP プロジェクトに NuGet でインストールできなかったんだけど、手動で加えたら問題なく動いた。もうメンテナンスされていないのかもしれないけど、せっかくいいものなので UWP でもサクッと使えるようにしてほしいな（賛同してくれるヒトは、みんなで のいえっち にサイレントプレッシャーをかけよう！）。</p><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fneuecc%2FAsyncOAuth%2Fissues%2F23" title="Cannot add nuget to UWP project · Issue #23 · neuecc/AsyncOAuth" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>AsyncOAuth にはコンソールアプリだけど はてな 認証のサンプルもついてる。これを UWP 向けにチョロチョロと改造すればおっけ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var authorizer = <span class="synStatement">new</span> OAuthAuthorizer(ConsumerKey, ConsumerSecret);
var callbackUri = <span class="synConstant">&quot;http://localhost/&quot;</span>;

var requestTokenResponse = await authorizer.GetRequestToken(
<span class="synConstant">&quot;https://www.hatena.com/oauth/initiate&quot;</span>,
<span class="synStatement">new</span>[]
{
<span class="synStatement">new</span> KeyValuePair&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;(
<span class="synConstant">&quot;oauth_callback&quot;</span>,
callbackUri
)
},
<span class="synStatement">new</span> FormUrlEncodedContent(<span class="synStatement">new</span>[] {
<span class="synStatement">new</span> KeyValuePair&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;(
<span class="synConstant">&quot;scope&quot;</span>,
<span class="synConstant">&quot;read_public,write_public,read_private,write_private&quot;</span>
)
}));

var requestToken = requestTokenResponse.Token;

var authorizeUrl = authorizer.BuildAuthorizeUrl(
<span class="synConstant">&quot;https://www.hatena.ne.jp/touch/oauth/authorize&quot;</span>,
requestToken);
</pre><p>たとえば、リクエストトークンをとるまでのところはこんな感じ。めんどくさいところは全部やってくれるので楽ちんだー。</p><p>callbackUri を“oob”にしたら PIN を使った認証になる。WebAuthenticationBroker.GetCurrentApplicationCallbackUri() で取得した URL は はてな では使えないみたいなので、今回は“<a href="http://localhost/">http://localhost/</a>”をセットしておく（これはあとで認証するときに必要になる）。</p>

</div>
<div class="section">
<h3>WebAuthenticationBroker を使って認証する</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160919223009.png" alt="f:id:daruyanagi:20160919223009p:plain" title="f:id:daruyanagi:20160919223009p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次は Web へアクセスして認証。UWP には WebAuthenticationBroker っていうダイアログを出す仕組み（それだけじゃないけど）が用意されているので、それを使うといい感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// さっき取得したリクエストトークンを使って認証 URI を取得</span>
var authorizeUrl = authorizer.BuildAuthorizeUrl(
<span class="synConstant">&quot;https://www.hatena.ne.jp/touch/oauth/authorize&quot;</span>,
requestToken);

<span class="synComment">// ダイアログを開いて結果を取得</span>
var webAuthenticationResult = await WebAuthenticationBroker
.AuthenticateAsync(
WebAuthenticationOptions.None,
<span class="synStatement">new</span> Uri(authorizeUrl), <span class="synStatement">new</span> Uri(callbackUri)
);

<span class="synComment">// 結果をみていろいろ分岐処理</span>
<span class="synStatement">switch</span> (webAuthenticationResult.ResponseStatus)
{
<span class="synStatement">case</span> WebAuthenticationStatus.Success:
<span class="synStatement">try</span>
{
<span class="synComment">// http://localhost?...=...&amp;...=... っていうのが</span>
<span class="synComment">// 返るのでテキトーに千切って verifier だけ取得</span>
var verifier = webAuthenticationResult.ResponseData
.Split(<span class="synConstant">'?'</span>).Last()
.Split(<span class="synConstant">'&amp;'</span>).Last()
.Split(<span class="synConstant">'='</span>).Last();
<span class="synComment">// リクエストトークンと verifier で</span>
<span class="synComment">// アクセストークンをゲット</span>
<span class="synComment">// これでいろいろし放題だ！</span>
var accessTokenTokenResponse = await authorizer
.GetAccessToken(
<span class="synConstant">&quot;https://www.hatena.com/oauth/token&quot;</span>,
requestToken, verifier);

AccessToken = accessTokenTokenResponse.Token;

result = <span class="synConstant">true</span>;
}
<span class="synStatement">catch</span> (Exception exception)
{
<span class="synComment">// エラー処理するんやで</span>
}
<span class="synStatement">break</span>;

<span class="synStatement">case</span> WebAuthenticationStatus.ErrorHttp:
<span class="synStatement">case</span> WebAuthenticationStatus.UserCancel:
<span class="synStatement">default</span>:
<span class="synStatement">break</span>;
}
</pre>
</div>
<div class="section">
<h3>ユーザー情報を取得</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160919223808.png" alt="f:id:daruyanagi:20160919223808p:plain" title="f:id:daruyanagi:20160919223808p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは OAuthUtility.CreateOAuthClient() でクライアントを取得してごにょごにょするだけ。このクライアントは AsyncOAuth が HttpClient にフィルター（？）をかましているだけなので、HttpClient みたいに GetAsync() とかできる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var client = OAuthUtility.CreateOAuthClient(
ConsumerKey, ConsumerSecret, AccessToken
);

var json = await client.GetStringAsync(
<span class="synConstant">&quot;http://n.hatena.com/applications/my.json&quot;</span>
);
</pre><p>これでディスプレイネームやプロフィールイメージなんかが取得できるので、テキトーにバインディングしてあげればおっけ。楽ちんでいいわー。</p>

</div>