---
date: 2012-08-24T10:51:21.0000000
draft: false
title: "WebMatrix でユーザー認証機能（2） ―― WebSecurityってどうやって使うんだ？"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>さて、前回（<a href="https://blog.daruyanagi.jp/entry/2012/08/24/095023">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD; &#x2015;&#x2015; &#x6E96;&#x5099;&#x7DE8; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）準備した WebSecurity Helper ですけど、これってどうやって使うんでしょうね。ちょっとメタデータからプロパティやメソッドを引っ張ってみました。名前と引数をみるだけで使い方がだいたい分かる感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Web;

<span class="synType">namespace</span> WebMatrix.WebData
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> WebSecurity
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">readonly</span> <span class="synType">string</span> EnableSimpleMembershipKey;
</pre><p>WebSecurity は静的クラスです。</p><p>“EnableSimpleMembershipKey”はよくわかりませんが、 readonly だしとくにわからなくても問題無さそう。 AppSetting から読み込んだキーを保存しているみたいですけどね。外部に公開してるんだから、どっかの外部クラスが使うんだろうか……。 ASP.NET の認証システムは全然わかってないけれど、おいおい解決していきたいです。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>        <span class="synType">public</span> <span class="synType">static</span> <span class="synType">int</span> CurrentUserId { get; }
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> CurrentUserName { get; }
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> HasUserId { get; }
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> Initialized { get; }
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsAuthenticated { get; }
</pre><p>お次はプロパティ群ですね。 CurrentUser に関するさまざまな情報を取得できます。 Initialized だけは <a href="http://msdn.microsoft.com/en-us/library/webmatrix.webdata.websecurity(v=vs.99).aspx">http://msdn.microsoft.com/en-us/library/webmatrix.webdata.websecurity(v=vs.99).aspx</a> に記述がなくてわからない。たぶん、前回やった初期化が完了しているかどうかを取得できるのだと思う。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>        <span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> ChangePassword(
<span class="synType">string</span> userName, <span class="synType">string</span> currentPassword,
<span class="synType">string</span> newPassword);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> ConfirmAccount(
<span class="synType">string</span> accountConfirmationToken);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> ConfirmAccount(
<span class="synType">string</span> userName, <span class="synType">string</span> accountConfirmationToken);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> CreateAccount(
<span class="synType">string</span> userName, <span class="synType">string</span> password,
<span class="synType">bool</span> requireConfirmationToken = <span class="synConstant">false</span>);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> CreateUserAndAccount(
<span class="synType">string</span> userName, <span class="synType">string</span> password,
<span class="synType">object</span> propertyValues = <span class="synConstant">null</span>,
<span class="synType">bool</span> requireConfirmationToken = <span class="synConstant">false</span>);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> GeneratePasswordResetToken(
<span class="synType">string</span> userName,
<span class="synType">int</span> tokenExpirationInMinutesFromNow = <span class="synConstant">1440</span>);
<span class="synType">public</span> <span class="synType">static</span> DateTime GetCreateDate(<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> DateTime GetLastPasswordFailureDate(
<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> DateTime GetPasswordChangedDate(
<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">int</span> GetPasswordFailuresSinceLastSuccess(
<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">int</span> GetUserId(<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">int</span> GetUserIdFromPasswordResetToken(
<span class="synType">string</span> token);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> InitializeDatabaseConnection(
<span class="synType">string</span> connectionStringName, <span class="synType">string</span> userTableName,
<span class="synType">string</span> userIdColumn, <span class="synType">string</span> userNameColumn,
<span class="synType">bool</span> autoCreateTables);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> InitializeDatabaseConnection(
<span class="synType">string</span> connectionString, <span class="synType">string</span> providerName,
<span class="synType">string</span> userTableName, <span class="synType">string</span> userIdColumn,
<span class="synType">string</span> userNameColumn, <span class="synType">bool</span> autoCreateTables);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsAccountLockedOut(
<span class="synType">string</span> userName, <span class="synType">int</span> allowedPasswordAttempts,
<span class="synType">int</span> intervalInSeconds);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsAccountLockedOut(
<span class="synType">string</span> userName, <span class="synType">int</span> allowedPasswordAttempts,
TimeSpan interval);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsConfirmed(<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsCurrentUser(<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> Login(
<span class="synType">string</span> userName, <span class="synType">string</span> password,
<span class="synType">bool</span> persistCookie = <span class="synConstant">false</span>);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Logout();
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> RequireAuthenticatedUser();
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> RequireRoles(<span class="synStatement">params</span> <span class="synType">string</span>[] roles);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> RequireUser(<span class="synType">int</span> userId);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> RequireUser(<span class="synType">string</span> userName);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> ResetPassword(
<span class="synType">string</span> passwordResetToken, <span class="synType">string</span> newPassword);
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> UserExists(<span class="synType">string</span> userName);
}
}
</pre><p>WebSecurity クラスのメンバーたち（このうち、InitializeDatabaseConnection() は前回使いました）。</p>

<ul>
<li>メールなどを利用した本人確認</li>
<li>パスワードのリセット（忘れちゃった時のためかな？）</li>
<li>パスワードの入力ミスを複数回繰り返すとアカウントをロック</li>
</ul><p>なんてことができるみたい。</p><p>気になったのは CreateUserAndAccount() ですかね。 Account （メンバーシップアカウント）と User （ユーザープロファイル、ユーザー情報）って別物なんだ。“Starter Site”テンプレートで使っていたのは CreateAccount() で、ほかにサンプルも見当たらなかったのでよくわかりませんが……。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120824104305.png" alt="f:id:daruyanagi:20120824104305p:plain" title="f:id:daruyanagi:20120824104305p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと DB のテーブル構成を見てみましょう。なんかいろいろありますけど、メンバーシップアカウントは webpages_Membership 、ユーザープロファイルは Users（初期設定は UserProfile）で管理するというのがなんとなく想像できます。どうやら webpages_ というプレフィックスがついたテーブルはシステム（WebSecurity Helper）が管理するみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120824103854.png" alt="f:id:daruyanagi:20120824103854p:plain" title="f:id:daruyanagi:20120824103854p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>実際、webpages_Membership テーブルには認証情報を格納するカラムがたくさん用意されていますが、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120824103857.png" alt="f:id:daruyanagi:20120824103857p:plain" title="f:id:daruyanagi:20120824103857p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>UserProfile テーブルのほうはかなりスッキリしていて「好きに使え」と言わんばかり。たとえばユーザーのプロフィール画像なんかの情報はこっちに保存しておいたほうがいいみたいですね。これはおいおい試していきたいと思います。</p>
