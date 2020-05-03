---
date: 2012-08-28T19:11:29.0000000
draft: false
title: "WebMatrix でユーザー認証機能（4） ―― ログインとログオフ"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2012/08/25/003421">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;3&#xFF09; &#x2015;&#x2015; &#x306A;&#x306B;&#x306F;&#x3068;&#x3082;&#x3042;&#x308C;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x767B;&#x9332;&#x3057;&#x306A;&#x3044;&#x3068;&#x59CB;&#x307E;&#x3089;&#x3093; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で無事ユーザー登録ができ、ログインされた。という訳で今回はログアウトを実装しなければならない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Logout.cshtml

@{
WebSecurity.Logout();

var returnUrl = Request.QueryString[<span class="synConstant">&quot;ReturnUrl&quot;</span>];
Response.Redirect(returnUrl.IsEmpty() ? <span class="synConstant">&quot;~/&quot;</span> : returnUrl);
}
</pre><p>おわり！　ほんとにこれだけだよ……。一応、 Logout?ReturnUrl=~/Account/Login なんかで ~/Account/Login へリダイレクトされるようにしてみたけど。</p><p>ちなみに、ログイン処理は少し長くなった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Login.cshtml

@{
var name = <span class="synConstant">&quot;&quot;</span>;
var password = <span class="synConstant">&quot;&quot;</span>;
var rememberMe = <span class="synConstant">true</span>;

Validation.RequireField(
<span class="synConstant">&quot;name&quot;</span>, <span class="synConstant">&quot;You must specify an name address.&quot;</span>);
Validation.RequireField(
<span class="synConstant">&quot;password&quot;</span>, <span class="synConstant">&quot;You must specify a password.&quot;</span>);

<span class="synStatement">if</span> (IsPost)
{
name = Request.Form[<span class="synConstant">&quot;name&quot;</span>];
password = Request.Form[<span class="synConstant">&quot;password&quot;</span>];
rememberMe = Request.Form[<span class="synConstant">&quot;rememberMe&quot;</span>].AsBool();

<span class="synStatement">if</span> (Validation.IsValid())
{
<span class="synStatement">if</span> (WebSecurity.Login(name, password, rememberMe))
{
var returnUrl = Request.QueryString[<span class="synConstant">&quot;ReturnUrl&quot;</span>];
Response.Redirect(
returnUrl.IsEmpty() ? <span class="synConstant">&quot;~/&quot;</span> : returnUrl);
}
<span class="synStatement">else</span>
{
ModelState.AddFormError(
<span class="synConstant">&quot;The user name or password is incorrect.&quot;</span>);
}
}
}
}

&lt;section id=<span class="synConstant">&quot;login&quot;</span>&gt;
&lt;form method=<span class="synConstant">&quot;post&quot;</span>&gt;
@Html.ValidationSummary(<span class="synConstant">&quot;Log in was unsuccessful.&quot;</span> +
<span class="synConstant">&quot;Please correct the errors and try again.&quot;</span>,
<span class="synStatement">            excludeFieldErrors:</span> <span class="synConstant">true</span>, htmlAttributes: <span class="synConstant">null</span>)

&lt;fieldset&gt;
&lt;legend&gt;Log <span class="synStatement">in</span> to Your Account&lt;/legend&gt;
@<span class="synStatement">this</span>.RenderTextWithValidation(<span class="synConstant">&quot;name&quot;</span>)
@<span class="synStatement">this</span>.RenderPasswordWithValidation(<span class="synConstant">&quot;password&quot;</span>)
@<span class="synStatement">this</span>.RenderCheckBoxWithValidation(<span class="synConstant">&quot;rememberMe&quot;</span>)
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;Log in&quot;</span> /&gt;
&lt;/fieldset&gt;
&lt;/form&gt;
&lt;p&gt;
&lt;a href=<span class="synConstant">&quot;~/Account/Register&quot;</span>&gt;Don't have a Account?&lt;/a&gt;
&lt;/p&gt;
&lt;/section&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120828191313.png" alt="f:id:daruyanagi:20120828191313p:plain" title="f:id:daruyanagi:20120828191313p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2012/08/28/081228">&#x5BC4;&#x308A;&#x9053;: string &#x30AF;&#x30E9;&#x30B9;&#x306E;&#x62E1;&#x5F35; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で作ったコードのお陰で、 RenderTextWithValidation() などがシンプルになっている以外はほとんどユーザー登録の処理と変わらない感じ。</p><p>次は OAuth でログインできるようになればいいな。</p>

<div class="section">
<h3>ちなみに</h3>
<p>string.AsBool や string.IsEmpty は ASP.NET Web Pages に含まれているのかな？ このあたりの関数については、 <a href="http://msdn.microsoft.com/ja-jp/asp.net/hh180209.aspx">ASP.NET | The ASP.NET Site</a> でコンパクトに纏められているので、一度目を通しておくとわしみたいに車輪の再発明をせずに済むぞ！</p>

</div>