---
date: 2013-09-05T07:02:45.0000000
draft: false
title: "WebMatrix 3: Twitter でログインする"
tags: ["WebMatrix", "ASP.net Web Pages", "Twitter", "Windows開発"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130905/20130905061149.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905061149.png" alt="f:id:daruyanagi:20130905061149p:plain" title="f:id:daruyanagi:20130905061149p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと Twitter と連携するアプリを作ってみたかったのだけど、“スターター サイト”テンプレートを使った例以外はあまり載っていなかったので、今回はそれを使わずに、“空のサイト”テンプレートから作ってみるよ。というのも、ググってたら自分のサイトが検索に引っかかって、<a href="https://blog.daruyanagi.jp/entry/2013/02/03/160915">WebMatrix 2&#xFF1A;OAuth &#x3067;&#x30ED;&#x30B0;&#x30A4;&#x30F3;&#x3059;&#x308B;&#xFF08;&#xFF12;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> を放置することすでに半年経つことが判明したので……さすがにこの当時のことはあまりよく思い出せないのだけど、今回の記事がフォローアップのようなものになれば幸い。</p>

<div class="section">
<h3>下準備</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905063705.png" alt="f:id:daruyanagi:20130905063705p:plain" title="f:id:daruyanagi:20130905063705p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず NuGet で <a href="http://www.nuget.org/packages/Microsoft.AspNet.WebPages.OAuth/">NuGet Gallery | Microsoft.AspNet.WebPages.OAuth 3.2.7</a> をインストール。これで“スターター サイト”テンプレートでも使われている <a href="http://msdn.microsoft.com/ja-jp/library/microsoft.web.webpages.oauth.oauthwebsecurity(v=vs.111).aspx">OAuthWebSecurity Class (Microsoft.Web.WebPages.OAuth) | Microsoft Docs</a> が使えるようになる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905062911.png" alt="f:id:daruyanagi:20130905062911p:plain" title="f:id:daruyanagi:20130905062911p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に <a href="https://dev.twitter.com/apps/">https://dev.twitter.com/apps/</a> でアプリの登録を行っておく。登録祭の必須入力事項は以下のとおり。</p>

<ul>
<li>Name: アプリの名前</li>
<li>Description: title</li>
<li>Website: <a href="http://127.0.0.1:****/">http://127.0.0.1:****/</a> （localhost は無効な URL として蹴られる）</li>
<li>Callback URL: <a href="http://127.0.0.1:****/">http://127.0.0.1:****/</a> （空っぽだと動かないっぽい）</li>
<li>Allow this application to be used to Sign in with Twitter: 無効化</li>
</ul><p>アプリを登録したら、</p>

<ul>
<li>Consumer key</li>
<li>Consumer secret</li>
</ul><p>を取得し、~/_AppStart.cshtml で初期化を行う。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synComment">// DB名: kenzo-memo.sdf</span>
WebSecurity.InitializeDatabaseConnection(<span class="synConstant">&quot;kenzou-memo&quot;</span>, <span class="synConstant">&quot;Users&quot;</span>, <span class="synConstant">&quot;UserId&quot;</span>, <span class="synConstant">&quot;Name&quot;</span>, <span class="synConstant">true</span>);

OAuthWebSecurity.RegisterTwitterClient(
<span class="synConstant">&quot;kFe1j**********LTcSizQ&quot;</span>,
<span class="synConstant">&quot;aKz6C**********Qzws06agyxRXImPk9sfETNQeg&quot;</span>
);
}
</pre><p>これで OAuthWebSecurity の twitter プロバイダーが利用できるようになる。このプロバイダーは OAuth 認証に必要な面倒事の一切を引き受けてくれる。</p>

</div>
<div class="section">
<h3>~/Default.cshtml</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905061617.png" alt="f:id:daruyanagi:20130905061617p:plain" title="f:id:daruyanagi:20130905061617p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ログインしていない場合はログインボタンを、ログインしている場合はログオフのリンクを表示するだけの簡単なコード。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@<span class="synStatement">if</span> (User.Identity.IsAuthenticated)
{
&lt;p&gt;@User.Identity.Name&lt;/p&gt;
&lt;p&gt;&lt;a href=<span class="synConstant">&quot;Logout.cshtml&quot;</span>&gt;Logout&lt;/a&gt;&lt;/p&gt;
}
<span class="synStatement">else</span>
{
&lt;a href=<span class="synConstant">&quot;~/Login.cshtml&quot;</span>&gt;
&lt;img src=<span class="synConstant">&quot;Twitter ボタンを用意する&quot;</span> /&gt;
&lt;/a&gt;
}
&lt;/body&gt;
&lt;/html&gt;
</pre><p>資格関連の情報は User.Identity （<a href="http://msdn.microsoft.com/ja-jp/library/system.web.httpcontext.user.aspx">HttpContext.User Property (System.Web) | Microsoft Docs</a>）でとれる。</p>

</div>
<div class="section">
<h3>~/Login.cshtml</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var returnUrl = Request.UrlReferrer.ToString();

OAuthWebSecurity.RequestAuthentication(
<span class="synConstant">&quot;twitter&quot;</span>, <span class="synComment">// プロバイダー名は文字列で指定</span>
Href(<span class="synConstant">&quot;~/LoginCallback&quot;</span>, <span class="synStatement">new</span> { returnUrl })
);
}
</pre><p><b>OAuthWebSecurity.RequestAuthentication</b> で Twitter へリクエストを投げる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905064446.png" alt="f:id:daruyanagi:20130905064446p:plain" title="f:id:daruyanagi:20130905064446p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>おなじみのこの画面へ飛ばされる。</p>

</div>
<div class="section">
<h3>~/LoginCallback</h3>
<p>Twitter で認証処理を行うと、~/LoginCallback にリダイレクトされてくるので、<b>OAuthWebSecurity.VerifyAuthentication</b> で検証し、成否を得る（今回で言えば result 変数）。Twitter でのログインが成功していたら、その資格情報（OAuth なのでパスワードはないけど）をデータベースに格納し（<b>OAuthWebSecurity.CreateOrUpdateAccount</b>）、アプリにログインさせる（<b>OAuthWebSecurity.Login</b>）。</p>
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

<span class="synComment">// ユーザー名が Users テーブルに存在しない場合、</span>
<span class="synComment">// あらかじめユーザー名を追加しておく。</span>
<span class="synComment">// でないと CreateOrUpdateAccount() でコケる</span>
<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;kenzou-memo&quot;</span>))
{
<span class="synType">const</span> <span class="synType">string</span> SELECT = <span class="synConstant">&quot;SELECT * FROM USERS WHERE Name=@0&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> INSERT = <span class="synConstant">&quot;INSERT INTO Users (Name) VALUES (@0)&quot;</span>;

<span class="synStatement">if</span> (db.QuerySingle(SELECT, userName) == <span class="synConstant">null</span>)
{
db.Execute(INSERT, userName);
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
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905064840.png" alt="f:id:daruyanagi:20130905064840p:plain" title="f:id:daruyanagi:20130905064840p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905064842.png" alt="f:id:daruyanagi:20130905064842p:plain" title="f:id:daruyanagi:20130905064842p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>成功するとこんなかんじにユーザーがデータベースに追加される。ちなみに result の中身はこんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130905064941.png" alt="f:id:daruyanagi:20130905064941p:plain" title="f:id:daruyanagi:20130905064941p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ObjectInfo.Print() はデバッグにとっても便利なヘルパーなのでぜひ覚えておいてね！</p>

</div>
<div class="section">
<h3>~/Logout.cshtml</h3>
<p>最後にログアウトの処理も書いておく。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var returnUrl = Request.UrlReferrer.ToString();

WebSecurity.Logout();

Response.Redirect(returnUrl);
}
</pre><p>ログインの時はもっぱら <a href="http://msdn.microsoft.com/ja-jp/library/microsoft.web.webpages.oauth.oauthwebsecurity(v=vs.111).aspx">OAuthWebSecurity Class (Microsoft.Web.WebPages.OAuth) | Microsoft Docs</a> を使っていたけれど、ログアウトはいつもどおり <a href="http://msdn.microsoft.com/ja-jp/library/webmatrix.webdata.websecurity(v=vs.111).aspx">WebSecurity Class (WebMatrix.WebData) | Microsoft Docs</a> が使える。</p>

</div>
<div class="section">
<h3>まとめ</h3>

<ol>
<li>OAuthWebSecurity.RegisterTwitterClient で twitter プロバイダーを有効化</li>
<li>OAuthWebSecurity.RequestAuthentication で Twitter の認証画面へ飛ばす</li>
<li>OAuthWebSecurity.VerifyAuthentication で Twitter での認証がうまく言ったか確認</li>
<li>OAuthWebSecurity.CreateOrUpdateAccount でアプリのアカウントと紐付ける</li>
<li>OAuthWebSecurity.Login でアプリにログインする</li>
</ol><p>“スターター サイト”テンプレートは手広い実装になっていて、その分複雑になっているけれど、アプリのアカウント＝ Twitter アカウントという運用でよいのならば、このように比較的簡単に実装できる。</p>

</div>