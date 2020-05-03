---
date: 2013-09-12T00:12:54.0000000
draft: false
title: "WebMatrix 3: Twitter でログインしてアクセストークン（秘）を取得する"
tags: ["ASP.net Web Pages", "WebMatrix", "Windows開発", "ASP.net"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130905/20130905064941.png
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/09/05/070245">WebMatrix 3: Twitter &#x3067;&#x30ED;&#x30B0;&#x30A4;&#x30F3;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でめでたく Twitter でのログインが実現できたのだけど、実はひとつ問題があった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905064941.png" alt="f:id:daruyanagi:20130905064941p:plain" title="f:id:daruyanagi:20130905064941p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>AccessTokenSecret が取れない。</p><p>自分もあんまりよくわかっていないのだけど、Twitter の API を利用するには以下の情報が必要であるみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130911233354.png" alt="f:id:daruyanagi:20130911233354p:plain" title="f:id:daruyanagi:20130911233354p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、これ。アプリが Twitter へアクセスするために必要。</p>

<ul>
<li>ConsumerKey</li>
<li>ConsumerSecret</li>
</ul><p>次に、これ。ユーザーに成り代わって Twitter の API を使うために必要。</p>

<ul>
<li>AccessKey</li>
<li>AccessKeySecret</li>
</ul><p>アプリの登録画面で取得できる AccessKey/AccessKeySecret はアプリを登録したユーザーのアクセスキー。このアプリにログインしたユーザーとして API を利用するには、そのユーザーに対して発行される AccessKey/AccessKeySecret が必要だ。</p><p>でも、OAuthWebSecurity では ExtraData から AccessKey をもらうことはできても、AccessKeySecret まではくれないみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130912000225.png" alt="f:id:daruyanagi:20130912000225p:plain" title="f:id:daruyanagi:20130912000225p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>通信を Fiddler でみてみた。ちゃんと authorize したあとに access_token している（ここで AccessKey がもらえる）から、ついでに AccessKeySecret もとってきてくれてもよさそうなのだけど。なにか理由があるのかもしれないが、これではちょっと困る。 </p><p>これを解決するには、Twitter プロバイダーを自分で実装すればよいようだ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// ~/App_Code/TwitterClient.cs</span>

<span class="synStatement">using</span> DotNetOpenAuth.AspNet;
<span class="synStatement">using</span> DotNetOpenAuth.AspNet.Clients;
<span class="synStatement">using</span> DotNetOpenAuth.Messaging;
<span class="synStatement">using</span> DotNetOpenAuth.OAuth;
<span class="synStatement">using</span> DotNetOpenAuth.OAuth.ChannelElements;
<span class="synStatement">using</span> DotNetOpenAuth.OAuth.Messages;
<span class="synStatement">using</span> System.Collections.Generic;

<span class="synComment">// http://stackoverflow.com/questions/12198734/getting-twitter-access-secret-using-dotnetopenauth-in-mvc4</span>

<span class="synType">public</span> <span class="synType">class</span> TwitterClient : OAuthClient
{
<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// The description of Twitter's OAuth protocol URIs for use with their &quot;Sign in with Twitter&quot; feature.</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">readonly</span> ServiceProviderDescription TwitterServiceDescription = <span class="synStatement">new</span> ServiceProviderDescription
{
RequestTokenEndpoint =
<span class="synStatement">new</span> MessageReceivingEndpoint(
<span class="synConstant">&quot;https://api.twitter.com/oauth/request_token&quot;</span>,
HttpDeliveryMethods.GetRequest | HttpDeliveryMethods.AuthorizationHeaderRequest),
UserAuthorizationEndpoint =
<span class="synStatement">new</span> MessageReceivingEndpoint(
<span class="synConstant">&quot;https://api.twitter.com/oauth/authenticate&quot;</span>,
HttpDeliveryMethods.GetRequest | HttpDeliveryMethods.AuthorizationHeaderRequest),
AccessTokenEndpoint =
<span class="synStatement">new</span> MessageReceivingEndpoint(
<span class="synConstant">&quot;https://api.twitter.com/oauth/access_token&quot;</span>,
HttpDeliveryMethods.GetRequest | HttpDeliveryMethods.AuthorizationHeaderRequest),
TamperProtectionElements = <span class="synStatement">new</span> ITamperProtectionChannelBindingElement[] { <span class="synStatement">new</span> HmacSha1SigningBindingElement() },
};

<span class="synType">public</span> TwitterClient(<span class="synType">string</span> consumerKey, <span class="synType">string</span> consumerSecret) :
<span class="synStatement">base</span>(<span class="synConstant">&quot;twitter&quot;</span>, TwitterServiceDescription, consumerKey, consumerSecret) { }
<span class="synType">protected</span> <span class="synType">override</span> AuthenticationResult VerifyAuthenticationCore(AuthorizedTokenResponse response)
{
<span class="synType">string</span> accessToken = response.AccessToken;
<span class="synType">string</span> accessSecret = (response <span class="synStatement">as</span> ITokenSecretContainingMessage).TokenSecret;
<span class="synType">string</span> userId = response.ExtraData[<span class="synConstant">&quot;user_id&quot;</span>];
<span class="synType">string</span> userName = response.ExtraData[<span class="synConstant">&quot;screen_name&quot;</span>];

var extraData = <span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;()
{
{<span class="synConstant">&quot;accesstoken&quot;</span>, accessToken},
{<span class="synConstant">&quot;accesssecret&quot;</span>, accessSecret}
};
<span class="synStatement">return</span> <span class="synStatement">new</span> AuthenticationResult(
<span class="synStatement">            isSuccessful:</span> <span class="synConstant">true</span>,
<span class="synStatement">            provider:</span> ProviderName,
<span class="synStatement">            providerUserId:</span> userId,
<span class="synStatement">            userName:</span> userName,
<span class="synStatement">            extraData:</span> extraData);
}
}
</pre><p>結果はこんな感じ。いつもどおり ObjectInfo.Print() で中身を見てみたよ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130912115257.png" alt="f:id:daruyanagi:20130912115257p:plain" title="f:id:daruyanagi:20130912115257p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>実装としてどうするのが理想的なのかはよくわからないけれど、とりあえずユーザーを管理するテーブルを拡張して、アクセスキーを保管しておくのとかどうでしょうか。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var returnUrl = Request[<span class="synConstant">&quot;returnUrl&quot;</span>];

<span class="synComment">// ログインの検証</span>
var result = OAuthWebSecurity.VerifyAuthentication(
Href(<span class="synConstant">&quot;LogonCallBack&quot;</span>, <span class="synStatement">new</span> { ReturnUrl = returnUrl })
);

<span class="synStatement">if</span> (result.IsSuccessful)
{
<span class="synComment">// ログインが成功すると、</span>
<span class="synComment">// - provider: twitter</span>
<span class="synComment">// - ProviderUserId: twitter の ID</span>
<span class="synComment">// - UserName: twitter のスクリーンネーム</span>
<span class="synComment">// の3つが得られる。自動補完が効かないので変数に入れとく</span>
var provider = result.Provider;
var providerUserId = result.ProviderUserId;
var userName = result.UserName;
var accessToken = result.ExtraData[<span class="synConstant">&quot;accesstoken&quot;</span>];
var accessTokenSecret = result.ExtraData[<span class="synConstant">&quot;accesssecret&quot;</span>];

&lt;p&gt;@ObjectInfo.Print(result.ExtraData)&lt;/p&gt;

<span class="synComment">// ユーザー名が Users テーブルに存在しない場合、</span>
<span class="synComment">// あらかじめユーザー名を追加しておく。</span>
<span class="synComment">// でないと CreateOrUpdateAccount() でコケる</span>
<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;kenzou-memo&quot;</span>))
{
<span class="synType">const</span> <span class="synType">string</span> SELECT = <span class="synConstant">&quot;SELECT * FROM USERS WHERE Name=@0&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> INSERT = <span class="synConstant">&quot;INSERT INTO Users (Name, AccessToken, AccessTokenSecret) VALUES (@0, @1, @2)&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> UPDATE = <span class="synConstant">&quot;UPDATE Users SET AccessToken=@1, AccessTokenSecret=@2 WHERE Name=@0&quot;</span>;

<span class="synStatement">if</span> (db.QuerySingle(SELECT, userName) == <span class="synConstant">null</span>) <span class="synComment">// この処理を追加してみました</span>
{
db.Execute(INSERT, userName, accessToken, accessTokenSecret);
}
<span class="synStatement">else</span>
{
db.Execute(UPDATE, userName, accessToken, accessTokenSecret);
}
}

<span class="synComment">// CreateOrUpdate とか言ってるけど、</span>
<span class="synComment">// やってることは Users テーブルと内部管理テーブルの紐づけ</span>
OAuthWebSecurity.CreateOrUpdateAccount(
provider,
providerUserId,
userName);

<span class="synComment">// ログインチケットの発行</span>
OAuthWebSecurity.Login(
provider,
providerUserId,
<span class="synStatement">            createPersistentCookie:</span> <span class="synConstant">true</span>);

Response.Redirect(returnUrl);
}
<span class="synStatement">else</span>
{
<span class="synComment">// ログインに失敗したときの処理</span>
}
}
</pre><p>自分でプロバイダーを実装するのはそこはかとなくめんどくさいけれど、丸コピで動くのでまぁ、よし。プロバイダーをどうやって実装するのかも少し分かったし。練習として、ほかのサービスを実装してみるのもよいかもしれない。最近なんかだと GitHub なんかが需要ありそうだ。</p><br />
<p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-376007236440428544');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('376007236440428544',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-376007236440428544"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-376007426748600320');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('376007426748600320',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-376007426748600320"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-376007600665415680');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('376007600665415680',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-376007600665415680"></div></p>
