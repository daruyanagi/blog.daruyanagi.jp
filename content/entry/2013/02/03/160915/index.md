---
date: 2013-02-03T16:09:15.0000000
draft: false
title: "WebMatrix 2：OAuth でログインする（２）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/01/27/102043">WebMatrix 2&#xFF1A;OAuth &#x3067;&#x30ED;&#x30B0;&#x30A4;&#x30F3;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。今回は“空のサイト”テンプレートから、OAuth によるログイン処理を書いていくことにする。まぁ、“スターターサイト”テンプレートのコードを読めば分かる人もいると思うけど、こういうのは一度自分で書いてみるに限ると思う。</p>

<div class="section">
<h3>NuGet で必要なものをインストール</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130203152828.png" alt="f:id:daruyanagi:20130203152828p:plain" title="f:id:daruyanagi:20130203152828p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>MuGet で <a href="http://nuget.org/packages/Microsoft.AspNet.WebPages.OAuth">NuGet Gallery | Microsoft.AspNet.WebPages.OAuth 3.2.7</a> をインストール。</p><p>まえにやったとき（<a href="https://blog.daruyanagi.jp/entry/2012/09/04/023414">&#x3055;&#x3066;&#x3001;WebMatrix &#x3067; OAuth &#x8A8D;&#x8A3C;&#x3092;&hellip;&hellip;&Sigma;(&#xFF9F;&#x434;&#xFF9F;lll)&#xFF76;&#xFF9E;&#xFF70;&#xFF9D; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）はインストールできなかったのだけど、今はできるようになってる。何が悪かったのかな？　ま、直ってるならいいや。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130203153208.png" alt="f:id:daruyanagi:20130203153208p:plain" title="f:id:daruyanagi:20130203153208p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これをインストールすると、 DotNetOpenAuth を初めとする必要なライブラリも同時にインストールされる。DotNetOpenAuth 系はいろいろあってどれを入れていいのかよくわからないけれど、Microsoft WebPages OAuth library をいれておけばおっけーなのかな。</p>

</div>
<div class="section">
<h3>~/_AppStart.cshtml</h3>
<p>Web サイトを初めて実行するときにロードされる ~/_AppStart.cshtml で、初期設定を行う。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synComment">// いろんなところで使うので、グローバルにアクセスできるようにしとくか</span>
App.Database = <span class="synConstant">&quot;Database&quot;</span>;

<span class="synComment">// ユーザー管理用のテーブルを初期化・作成</span>
WebSecurity.InitializeDatabaseConnection(
App.Database,
<span class="synConstant">&quot;UserProfile&quot;</span>, <span class="synConstant">&quot;UserId&quot;</span>, <span class="synConstant">&quot;UserName&quot;</span>,
<span class="synStatement">        autoCreateTables:</span> <span class="synConstant">true</span>);

<span class="synComment">// Google の OAuth を使います！</span>
OAuthWebSecurity.RegisterGoogleClient();
}
</pre><p>WebSecurity.InitializeDatabaseConnection は以前（<a href="https://blog.daruyanagi.jp/entry/2012/08/24/095023">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD; &#x2015;&#x2015; &#x6E96;&#x5099;&#x7DE8; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）も使った。OAuth のときもこれを使うみたいだね。</p>

</div>
<div class="section">
<h3>~/Account/Login.cshtml</h3>
<p>お次はログインフォーム。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Page.Title = <span class="synConstant">&quot;ログイン&quot;</span>;

var provider = Request.Form[<span class="synConstant">&quot;provider&quot;</span>];
}

@{  <span class="synComment">// POST のときは外部サイトの認証ページへ飛ばす</span>

<span class="synStatement">if</span> (!provider.IsEmpty() &amp;&amp; IsPost)
{
AntiForgery.Validate(); <span class="synComment">// CSRF 対策</span>

<span class="synComment">// 外部認証サービスでの認証を行う</span>
<span class="synComment">// 成功したら ~/Account/RegisterService.cshtml を開く</span>
OAuthWebSecurity.RequestAuthentication(
provider,
Href(<span class="synConstant">&quot;~/Account/RegisterService&quot;</span>)
);

<span class="synStatement">return</span>;
}
}

@{  <span class="synComment">// GET のとき（だけじゃないけど）は、</span>
<span class="synComment">// 外部認証サービスを選択するフォームを表示する</span>

<span class="synStatement">if</span> (OAuthWebSecurity.RegisteredClientData.Count == <span class="synConstant">0</span>)
{
&lt;p&gt;外部認証サービスが構成されていません。&lt;/p&gt;
}
<span class="synStatement">else</span>
{
&lt;form method=<span class="synConstant">&quot;post&quot;</span>&gt;
@AntiForgery.GetHtml()
&lt;p&gt;
@<span class="synStatement">foreach</span> (var client <span class="synStatement">in</span> OAuthWebSecurity.RegisteredClientData)
{
&lt;button type=<span class="synConstant">&quot;submit&quot;</span> name=<span class="synConstant">&quot;provider&quot;</span>
<span class="synStatement">value</span>=<span class="synConstant">&quot;@client.AuthenticationClient.ProviderName&quot;</span>
title=<span class="synConstant">&quot;@client.DisplayName アカウントを使用してログイン&quot;</span>&gt;
@client.DisplayName
&lt;/button&gt;
}
&lt;/p&gt;
&lt;/form&gt;
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130203155104.png" alt="f:id:daruyanagi:20130203155104p:plain" title="f:id:daruyanagi:20130203155104p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このボタンを押すと、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130203155926.png" alt="f:id:daruyanagi:20130203155926p:plain" title="f:id:daruyanagi:20130203155926p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Google の認証ページに飛ぶはず。</p>

</div>
<div class="section">
<h3>~/Account/RegisterService.cshtml</h3>
<p>Google での認証が成功すると、このページに着地する。まぁ、名前は好きにすればいいと思う。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Page.Title = <span class="synConstant">&quot;登録&quot;</span>;
}

&lt;dl&gt;
@<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> Request.Params.Keys)
{
&lt;dt&gt;@key&lt;/dt&gt;
&lt;dd&gt;@Request.Params[key.ToString()]&lt;/dd&gt;
}
&lt;/dl&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130203160114.png" alt="f:id:daruyanagi:20130203160114p:plain" title="f:id:daruyanagi:20130203160114p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回はパラメーターを列挙するだけにしておいた。ほんとはここから</p>

<ul>
<li>認証がうまくいったか</li>
<li>認証データの取り出し</li>
<li>このサイトでの認証とデータベースへの登録</li>
</ul><p>などを行わないといけない。外部認証サービスによって返ってくるデータは微妙に違うけれど、</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/jj158354(v=vs.111).aspx">OAuthWebSecurity.VerifyAuthentication Method (Microsoft.Web.WebPages.OAuth) | Microsoft Docs</a></li>
<li><a href="http://msdn.microsoft.com/ja-jp/library/microsoft.web.webpages.oauth.oauthwebsecurity.trydeserializeprovideruserid(v=vs.111).aspx">OAuthWebSecurity.TryDeserializeProviderUserId(String, String, String) Method (Microsoft.Web.WebPages.OAuth) | Microsoft Docs</a></li>
<li><a href="http://msdn.microsoft.com/ja-jp/library/microsoft.web.webpages.oauth.oauthwebsecurity.trygetoauthclientdata(v=vs.111).aspx">OAuthWebSecurity.TryGetOAuthClientData(String, AuthenticationClientData) Method (Microsoft.Web.WebPages.OAuth) | Microsoft Docs</a></li>
</ul><p>などを使うことによって、統一的に扱えるようなので安心……という感じのようだ。知らんけど。</p><p>今日のところは、ここまで。</p>

</div>