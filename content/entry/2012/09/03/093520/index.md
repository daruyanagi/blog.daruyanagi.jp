---
date: 2012-09-03T09:35:20.0000000
draft: false
title: "WebMatrix でユーザー認証機能（5） ―― ロール"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120829200628.png" alt="f:id:daruyanagi:20120829200628p:plain" title="f:id:daruyanagi:20120829200628p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/24/095023">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD; &#x2015;&#x2015; &#x6E96;&#x5099;&#x7DE8; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/24/105121">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;2&#xFF09; &#x2015;&#x2015; WebSecurity&#x3063;&#x3066;&#x3069;&#x3046;&#x3084;&#x3063;&#x3066;&#x4F7F;&#x3046;&#x3093;&#x3060;&#xFF1F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/25/003421">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;3&#xFF09; &#x2015;&#x2015; &#x306A;&#x306B;&#x306F;&#x3068;&#x3082;&#x3042;&#x308C;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x767B;&#x9332;&#x3057;&#x306A;&#x3044;&#x3068;&#x59CB;&#x307E;&#x3089;&#x3093; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/28/191129">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;4&#xFF09; &#x2015;&#x2015; &#x30ED;&#x30B0;&#x30A4;&#x30F3;&#x3068;&#x30ED;&#x30B0;&#x30AA;&#x30D5; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>とりあえずログイン機能があらかた実装できたけれど、これだとだれでもユーザーが作れてしまう。まぁ、そういうアプリもあるけど、“管理者”のみがユーザーを作成できるほうが望ましいこともある。そういった“管理者”権限を実現したいときにはどうするかというと、“ロール（Roles）”を使うんだな。</p>

<div class="section">
<h3>System.Web.Security.Roles</h3>
<p>ロールの作成方法については、ここらあたり（<a href="http://www.asp.net/web-pages/tutorials/security/16-adding-security-and-membership">Adding Security and Membership to an ASP.NET Web Pages (Razor) Site | Microsoft Docs</a>）が詳しい。</p><p>その例だとロールの作成するためにデータベースを直接イジっていて、一瞬「あちゃー、コードでやろうと思ったら SQL 書かなきゃいけないのかな？」と思ってしまったけど、ちゃんと Roles を扱うクラスが用意されていた<a href="#f-f17309a6" name="fn-f17309a6" title="公式ドキュメントでデータベースを直接イジっていたのには、なにか理由があるのだろうか">*1</a>。</p><p><a href="http://msdn.microsoft.com/en-us/library/system.web.security.roles.aspx">http://msdn.microsoft.com/en-us/library/system.web.security.roles.aspx</a></p><p>とりあえずさらっと目を通しておくとよさげ。</p>

<div class="section">
<h4>Roles.RoleExists() / Roles.CreateRole()</h4>
<p>まず、 _AppStart.cshtml で“ロールがなければ作成する”という処理を追加してみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
App.DATABASE = <span class="synConstant">&quot;database&quot;</span>; <span class="synComment">// &lt;-- カッコ悪いし、</span>
App.TABLE_USERS = <span class="synConstant">&quot;Users&quot;</span>; <span class="synComment">//     あとで静的クラスにまとめて</span>
App.ROLE_ADMIN = <span class="synConstant">&quot;admin&quot;</span>;  <span class="synComment">//     リードオンリーにしておくべき</span>

WebSecurity.InitializeDatabaseConnection(
App.DATABASE, App.TABLE_USERS, <span class="synConstant">&quot;UserId&quot;</span>, <span class="synConstant">&quot;Name&quot;</span>, <span class="synConstant">true</span>);

<span class="synStatement">if</span> (!Roles.RoleExists(App.ROLE_ADMIN)) <span class="synComment">// &lt;-- ココ！</span>
{
Roles.CreateRole(App.ROLE_ADMIN);
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120903091135.png" alt="f:id:daruyanagi:20120903091135p:plain" title="f:id:daruyanagi:20120903091135p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>できたっぽい。拍子抜けしたぞなもし。</p>

</div>
<div class="section">
<h4>Roles.AddUserToRole()</h4>
<p>つぎに、“初めて登録されたユーザーは管理者にする”ということにしてみようか。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Account/Register.cshtml

<span class="synStatement">try</span>
{
WebSecurity.CreateUserAndAccount(
name, password, <span class="synStatement">new</span> { Name = name });
WebSecurity.Login(name, password);

<span class="synComment">// 最初のユーザーには管理者権限を付与</span>
<span class="synStatement">if</span> (App.GetUserCount() &lt;= <span class="synConstant">1</span>)
{
Roles.AddUserToRole(name, App.ROLE_ADMIN);
}

Response.Redirect(<span class="synConstant">&quot;~/&quot;</span>);
}
<span class="synStatement">catch</span> (Exception e)
{
ModelState.AddFormError(e.Message);
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120903091712.png" alt="f:id:daruyanagi:20120903091712p:plain" title="f:id:daruyanagi:20120903091712p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちゃんと UserId 1 に RoleId 1（admin）が紐付けられた。ちなみに、複数のユーザーを一度にロールへ突っ込むためのメソッドもある。</p><p>ちなみに、残念ながらユーザーの数を数えるメソッドは用意されていないみたいなので、これは SQL で書かないといけない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
App.GetUserCount = (Func&lt;<span class="synType">int</span>&gt;)GetUserCount; <span class="synComment">// &lt;-- 個人的趣味</span>
}

@functions
{
<span class="synType">int</span> GetUserCount()
{
<span class="synType">const</span> <span class="synType">string</span> sql = <span class="synConstant">&quot;SELECT COUNT(*) FROM {0}&quot;</span>;
<span class="synStatement">return</span> Database
.Open(App.DATABASE)
.QueryValue(<span class="synType">string</span>.Format(sql, App.TABLE_USERS));
}
}
</pre><p>でも、もしかしたらメソッドが用意されていない≒あんまりよくない実装 なのかもしれない。よく利用する処理なら、標準でメソッドが用意されているよね？<a href="#f-ad523936" name="fn-ad523936" title="まぁ、案外そうとも限らないわけだけど">*2</a>　まぁ、それはまた今度考えよう。</p>

</div>
<div class="section">
<h4>Roles.IsUserInRole() / WebSecurity.RequireRoles()</h4>
<p>んで、ロールが必要な処理には一行このように書き加えておく。この場合は、 Register.cshtml だね。 _PageStart.cshtml に書けば、フォルダ内の cshtml すべてに適用することもできる（はず、確かそうだった）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
WebSecurity.RequireRoles(App.ROLE_ADMIN);
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120903091955.png" alt="f:id:daruyanagi:20120903091955p:plain" title="f:id:daruyanagi:20120903091955p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>必要なロールをもたなければ、ログインページにリダイレクトされる<a href="#f-6b31afe3" name="fn-6b31afe3" title="今気付いたけど、 Log in to ってなんやねんｗ">*3</a>ようだ<a href="#f-f34e9562" name="fn-f34e9562" title="既定では ~/Account/LogIn みたい">*4</a>。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synStatement">if</span> (!Roles.IsUserInRole(App.ROLE_ADMIN))
{
:
:
</pre><p>もちろん、ロールをもつかどうかの判定のみを行うこともできる。 <a href="https://blog.daruyanagi.jp/entry/2012/08/29/201834">&#x5BC4;&#x308A;&#x9053;&#xFF1A; Rails &#x306E; Flash &#x3063;&#x307D;&#x3044;&#x6A5F;&#x80FD;&#x3092; WebMatrix &#x3067;&#x4F7F;&#x3044;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a> などを使ってユーザーにメッセージを通知したい場合など、いきなりリダイレクトされると困る場合はこっちを使ったほうがよさげだな。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn-f17309a6" name="f-f17309a6" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">公式ドキュメントでデータベースを直接イジっていたのには、なにか理由があるのだろうか</span></p>
<p class="footnote"><a href="#fn-ad523936" name="f-ad523936" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">まぁ、案外そうとも限らないわけだけど</span></p>
<p class="footnote"><a href="#fn-6b31afe3" name="f-6b31afe3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">今気付いたけど、 Log in to ってなんやねんｗ</span></p>
<p class="footnote"><a href="#fn-f34e9562" name="f-f34e9562" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">既定では ~/Account/LogIn みたい</span></p>
</div>