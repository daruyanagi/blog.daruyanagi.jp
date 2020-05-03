---
date: 2012-08-25T00:34:21.0000000
draft: false
title: "WebMatrix でユーザー認証機能（3） ―― なにはともあれユーザー登録しないと始まらん"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120824233928.png" alt="f:id:daruyanagi:20120824233928p:plain" title="f:id:daruyanagi:20120824233928p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/24/095023">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD; &#x2015;&#x2015; &#x6E96;&#x5099;&#x7DE8; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/24/105121">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;2&#xFF09; &#x2015;&#x2015; WebSecurity&#x3063;&#x3066;&#x3069;&#x3046;&#x3084;&#x3063;&#x3066;&#x4F7F;&#x3046;&#x3093;&#x3060;&#xFF1F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>のんびりやっていこう。今回はユーザー登録するで。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var name = <span class="synConstant">&quot;&quot;</span>;
var password = <span class="synConstant">&quot;&quot;</span>;
var confirmPassword = <span class="synConstant">&quot;&quot;</span>;

<span class="synStatement">if</span> (IsPost)
{
name = Request.Form[<span class="synConstant">&quot;name&quot;</span>];
password = Request.Form[<span class="synConstant">&quot;password&quot;</span>];
confirmPassword = Request.Form[<span class="synConstant">&quot;confirmPassword&quot;</span>];

<span class="synComment">// ここでバリデーション（値が妥当なものか検証）する</span>

<span class="synStatement">if</span> (Validation.IsValid())
{
<span class="synStatement">if</span> (WebSecurity.GetUserId(name) &gt; -<span class="synConstant">1</span>)
{
ModelState.AddFormError(<span class="synConstant">&quot;Username alredy exists&quot;</span>);
}
<span class="synStatement">else</span>
{
<span class="synStatement">try</span>
{
WebSecurity.CreateUserAndAccount(
name, password, <span class="synStatement">new</span> { Name = name });
WebSecurity.Login(name, password);
Response.Redirect(<span class="synConstant">&quot;~/&quot;</span>);
}
<span class="synStatement">catch</span> (Exception e)
{
ModelState.AddFormError(e.Message);
}
}
}
}
}
</pre><p>まずはバリデーションを関連の記述をとっぱらったサーバー側のコード<a href="#f-8a0f6f9f" name="fn-8a0f6f9f" title="コードビハインドっていうの？　知らんけど">*1</a>。やっていることは簡単で、</p>

<ol>
<li>フォームから値を受け取る</li>
<li>値をバリデーション</li>
<li>ユーザーネームにダブりがないか確認</li>
<li>ユーザープロファイルとメンバーシップアカウントを作成</li>
<li>ログインしてトップページへリダイレクト</li>
<li>エラーが発生したら適宜 ModelState に登録しておく</li>
</ol><p>みたいな感じ。</p>

<div class="section">
<h3>WebSecurity.CreateUserAndAccount()</h3>
<p>WebSecurity では、ユーザーアカウントをユーザープロファイル（開発者が管理）とメンバーシップアカウント（システムが管理）にわけて管理している（<a href="https://blog.daruyanagi.jp/entry/2012/08/24/105121">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;2&#xFF09; &#x2015;&#x2015; WebSecurity&#x3063;&#x3066;&#x3069;&#x3046;&#x3084;&#x3063;&#x3066;&#x4F7F;&#x3046;&#x3093;&#x3060;&#xFF1F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）。両者は同じ UserId で紐付けられる仕組みだ。 </p><p>WebSecurity.CreateUserAndAccount() はそのユーザープロファイルとメンバーシップアカウントの作成を同時に行うメソッド。ユーザープロファイルテーブルに挿入するデータは、第三引数で匿名オブジェクトを与えればよい。今回は名前だけを登録しておいた。</p><p>ちなみに WebSecurity.Create() だけを使った場合、さきにユーザープロファイルテーブルへ UserId とそのほかのデータを挿入しておかなければならない。“Starter Site”テンプレートではそれを SQL で行なっている。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">if</span> (Validation.IsValid())
{
var db = Database.Open(App.Database);

var user = db.QuerySingle(
<span class="synConstant">&quot;SELECT Name FROM Users WHERE LOWER(Name) = LOWER(@0)&quot;</span>,
name);

<span class="synStatement">if</span> (user == <span class="synConstant">null</span>)
{
db.Execute(
<span class="synConstant">&quot;INSERT INTO Users (Name) VALUES (@0)&quot;</span>, name);
WebSecurity.CreateAccount(name, password);
</pre><p>げろげろうげー。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">if</span> (Validation.IsValid())
{
<span class="synStatement">if</span> (WebSecurity.GetUserId(name) &gt; -<span class="synConstant">1</span>)
{
ModelState.AddFormError(<span class="synConstant">&quot;Username alredy exists&quot;</span>);
}
<span class="synStatement">else</span>
{
<span class="synStatement">try</span>
{
WebSecurity.CreateUserAndAccount(
name, password, <span class="synStatement">new</span> { Name = name });
</pre><p>絶対こっちにするやろ。せっかく WebSecurity Helper を使うんだから、大いに頼ればよろしい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120825001002.png" alt="f:id:daruyanagi:20120825001002p:plain" title="f:id:daruyanagi:20120825001002p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

</div>
<div class="section">
<h3>ModelState</h3>
<p>ModelState は WebPage に属しており、フォームのエラーを管理するものだとでも理解しておく。 ModelState.AddFormError() でフォーム関連のエラーが登録できるんだな。</p><p>バリデーション関連のコードはこんな感じ（“Starter Site”からコードをパクってきた）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Validation.RequireField(<span class="synConstant">&quot;name&quot;</span>,
<span class="synConstant">&quot;電子メール アドレスを入力してください。&quot;</span>);
Validation.RequireField(<span class="synConstant">&quot;password&quot;</span>,
<span class="synConstant">&quot;パスワードを空白にすることはできません。&quot;</span>);
Validation.Add(<span class="synConstant">&quot;confirmPassword&quot;</span>,　Validator.EqualsTo(
<span class="synConstant">&quot;password&quot;</span>, <span class="synConstant">&quot;パスワードと確認のパスワードが一致しません。&quot;</span>)
);
Validation.Add(<span class="synConstant">&quot;password&quot;</span>,
Validator.StringLength(
<span class="synStatement">        maxLength:</span> Int32.MaxValue,
<span class="synStatement">        minLength:</span> <span class="synConstant">6</span>,
<span class="synStatement">        errorMessage:</span> <span class="synConstant">&quot;パスワードは 6 文字以上にする必要があります&quot;</span>
)
);
</pre><p>読むだけで何をしているのかわかるのがいい。表示部分はこのようなコードになっていた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;section id=<span class="synConstant">&quot;register&quot;</span>&gt;
&lt;form method=<span class="synConstant">&quot;post&quot;</span>&gt;
@Html.ValidationSummary(<span class="synConstant">&quot;Log in was unsuccessful.&quot;</span> +
<span class="synConstant">&quot;Please correct the errors and try again.&quot;</span>,
<span class="synStatement">            excludeFieldErrors:</span> <span class="synConstant">true</span>, htmlAttributes: <span class="synConstant">null</span>)

&lt;fieldset&gt;
&lt;legend&gt;Register Your Account&lt;/legend&gt;
&lt;ol&gt;
@RenderFormInputWithValidation(<span class="synStatement">this</span>, <span class="synConstant">&quot;name&quot;</span>)
&lt;li <span class="synType">class</span>=<span class="synConstant">&quot;name&quot;</span>&gt;
&lt;label <span class="synStatement">for</span>=<span class="synConstant">&quot;name&quot;</span> @<span class="synStatement">if</span> (!ModelState.IsValidField(<span class="synConstant">&quot;name&quot;</span>)) {&lt;text&gt;<span class="synType">class</span>=<span class="synConstant">&quot;error-label&quot;</span>&lt;/text&gt;}&gt;Name&lt;/label&gt;
&lt;input type=<span class="synConstant">&quot;text&quot;</span>
id=<span class="synConstant">&quot;name&quot;</span> name=<span class="synConstant">&quot;name&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;@name&quot;</span>
@Validation.For(<span class="synConstant">&quot;name&quot;</span>) /&gt;
@Html.ValidationMessage(<span class="synConstant">&quot;name&quot;</span>)
&lt;/li&gt;
&lt;li <span class="synType">class</span>=<span class="synConstant">&quot;password&quot;</span>&gt;
&lt;label <span class="synStatement">for</span>=<span class="synConstant">&quot;password&quot;</span> @<span class="synStatement">if</span> (!ModelState.IsValidField(<span class="synConstant">&quot;password&quot;</span>)) {&lt;text&gt;<span class="synType">class</span>=<span class="synConstant">&quot;error-label&quot;</span>&lt;/text&gt;}&gt;Password&lt;/label&gt;
&lt;input type=<span class="synConstant">&quot;password&quot;</span>
id=<span class="synConstant">&quot;password&quot;</span> name=<span class="synConstant">&quot;password&quot;</span>
@Validation.For(<span class="synConstant">&quot;password&quot;</span>)/&gt;
@Html.ValidationMessage(<span class="synConstant">&quot;password&quot;</span>)
&lt;/li&gt;
&lt;li <span class="synType">class</span>=<span class="synConstant">&quot;confirm-password&quot;</span>&gt;
&lt;label <span class="synStatement">for</span>=<span class="synConstant">&quot;confirm-password&quot;</span> @<span class="synStatement">if</span> (!ModelState.IsValidField(<span class="synConstant">&quot;confirmPassword&quot;</span>)) {&lt;text&gt;<span class="synType">class</span>=<span class="synConstant">&quot;error-label&quot;</span>&lt;/text&gt;}&gt;confirmPassword&lt;/label&gt;
&lt;input type=<span class="synConstant">&quot;password&quot;</span>
id=<span class="synConstant">&quot;confirmPassword&quot;</span> name=<span class="synConstant">&quot;confirmPassword&quot;</span>
@Validation.For(<span class="synConstant">&quot;confirmPassword&quot;</span>)/&gt;

@Html.ValidationMessage(<span class="synConstant">&quot;confirmPassword&quot;</span>)
&lt;/li&gt;
&lt;/ol&gt;
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;Register&quot;</span> /&gt;
&lt;/fieldset&gt;
&lt;/form&gt;
&lt;/section&gt;
</pre><p>ぐちゃぐちゃしてわかりにくいが、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@Html.ValidationSummary(<span class="synConstant">&quot;Log in was unsuccessful.&quot;</span> +
<span class="synConstant">&quot;Please correct the errors and try again.&quot;</span>,
<span class="synStatement">    excludeFieldErrors:</span> <span class="synConstant">true</span>, htmlAttributes: <span class="synConstant">null</span>)
</pre><p>でページ全体についてのバリデーション結果を表示する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120825002435.png" alt="f:id:daruyanagi:20120825002435p:plain" title="f:id:daruyanagi:20120825002435p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>フォームの各フィールドは、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;label <span class="synStatement">for</span>=<span class="synConstant">&quot;name&quot;</span> @<span class="synStatement">if</span> (!ModelState.IsValidField(<span class="synConstant">&quot;name&quot;</span>)) {&lt;text&gt;<span class="synType">class</span>=<span class="synConstant">&quot;error-label&quot;</span>&lt;/text&gt;}&gt;Name&lt;/label&gt;
&lt;input type=<span class="synConstant">&quot;text&quot;</span> id=<span class="synConstant">&quot;name&quot;</span> name=<span class="synConstant">&quot;name&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;@name&quot;</span> @Validation.For(<span class="synConstant">&quot;name&quot;</span>) /&gt;
@Html.ValidationMessage(<span class="synConstant">&quot;name&quot;</span>)
</pre><p>このコードでワンセットみたい。 Validation.For() は JavaScript によるバリデーションに必要な data- 属性を出力する（今回は使ってない）。 Html.ValidationMessage() はバリデーションエラーのメッセージがあれば表示する。このメッセージはさっき ModelState に登録したエラーから取得するみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120825002611.png" alt="f:id:daruyanagi:20120825002611p:plain" title="f:id:daruyanagi:20120825002611p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>後者のコードは使いまわせそうないわばイディオムなので、ヘルパーか拡張メソッドにしておくとよさそうだ。今回は以下のようにしてみたよ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>~/App_Code/WebPageExtension.cs

<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Web;
<span class="synStatement">using</span> System.Web.WebPages;
<span class="synStatement">using</span> System.Web.WebPages.Html;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> WebPageExtension
{
<span class="synType">private</span> <span class="synType">enum</span> InputType
{
Text, Password, Checkbox, Textarea,
}

<span class="synType">private</span> <span class="synType">static</span> HtmlString RenderInputWithValidation(
<span class="synStatement">this</span> WebPage target, InputType input_type,
<span class="synType">string</span> name, <span class="synType">string</span> label = <span class="synConstant">&quot;&quot;</span>, <span class="synType">object</span> additional = <span class="synConstant">null</span>)
{
<span class="synType">const</span> <span class="synType">string</span> HTML_TAG = <span class="synSpecial">@</span><span class="synConstant">&quot;</span>
<span class="synConstant">            &lt;div class=&quot;&quot;validation-input {0} {1}&quot;&quot;&gt;</span>
<span class="synConstant">                &lt;label for=&quot;&quot;{0}&quot;&quot;&gt;{2}&lt;/label&gt;</span>
<span class="synConstant">                &lt;input type=&quot;&quot;{3}&quot;&quot; id=&quot;&quot;{0}&quot;&quot; name=&quot;&quot;{0}&quot;&quot; {4} {5} /&gt;</span>
<span class="synConstant">                {6}</span>
<span class="synConstant">            &lt;/div&gt;&quot;</span>;

var attrs = (additional == <span class="synConstant">null</span>)
? <span class="synType">string</span>.Empty
: <span class="synType">string</span>.Join(<span class="synConstant">&quot; &quot;</span>, additional
.GetType()
.GetProperties()
.Select((p) =&gt; <span class="synType">string</span>
.Format(<span class="synConstant">&quot;{0}=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span>,
p.Name.ToLower(),
p.GetValue(additional)
)
)
);

<span class="synStatement">return</span> <span class="synStatement">new</span> HtmlString(
<span class="synType">string</span>.Format(
HTML_TAG, name,
target.ModelState.IsValidField(name)
? <span class="synType">string</span>.Empty
: <span class="synConstant">&quot;validation-failed&quot;</span>,
label.IsEmpty() ? name : label,
input_type.ToString().ToLower(),
attrs,
target.Validation.For(name),
target.Html.ValidationMessage(name)
)
);
}

<span class="synType">public</span> <span class="synType">static</span> HtmlString RenderTextWithValidation(
<span class="synStatement">this</span> WebPage target, <span class="synType">string</span> name,
<span class="synType">string</span> label = <span class="synConstant">null</span>, <span class="synType">object</span> additional = <span class="synConstant">null</span>)
{
<span class="synStatement">return</span> RenderInputWithValidation(
target, InputType.Text, name, label, additional);
}

<span class="synType">public</span> <span class="synType">static</span> HtmlString RenderPasswordWithValidation(
<span class="synStatement">this</span> WebPage target, <span class="synType">string</span> name,
<span class="synType">string</span> label = <span class="synConstant">null</span>, <span class="synType">object</span> additional = <span class="synConstant">null</span>)
{
<span class="synStatement">return</span> RenderInputWithValidation(
target, InputType.Password, name, label, additional);
}

<span class="synType">public</span> <span class="synType">static</span> HtmlString RenderCheckBoxWithValidation(
<span class="synStatement">this</span> WebPage target, <span class="synType">string</span> name,
<span class="synType">string</span> label = <span class="synConstant">null</span>, <span class="synType">object</span> additional = <span class="synConstant">null</span>)
{
<span class="synStatement">return</span> RenderInputWithValidation(
target, InputType.Checkbox, name, label, additional);
}
}
</pre><p>ModelState が WebPage に属する関係で、 WebPage クラスの拡張メソッドとして定義してある。ほんとは HTML Helper にして、 @Html.TextWithValidation() などと呼べる方がカッコいいな。今度もう少しこのあたりはブラッシュアップしてみたい。</p><p>んで、これを使って書きなおした表示部分はこうなる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;section id=<span class="synConstant">&quot;register&quot;</span>&gt;
&lt;form method=<span class="synConstant">&quot;post&quot;</span>&gt;
@Html.ValidationSummary(
<span class="synConstant">&quot;Log in was unsuccessful.&quot;</span> +
<span class="synConstant">&quot;Please correct the errors and try again.&quot;</span>,
<span class="synConstant">false</span>, <span class="synConstant">null</span>)

&lt;fieldset&gt;
&lt;legend&gt;Register Your Account&lt;/legend&gt;
@<span class="synStatement">this</span>.RenderTextWithValidation(
<span class="synConstant">&quot;name&quot;</span>, <span class="synConstant">&quot;Name&quot;</span>, <span class="synStatement">new</span> { Value = name} )
@<span class="synStatement">this</span>.RenderPasswordWithValidation(
<span class="synConstant">&quot;password&quot;</span>, <span class="synConstant">&quot;Password&quot;</span>)
@<span class="synStatement">this</span>.RenderPasswordWithValidation(
<span class="synConstant">&quot;confirmPassword&quot;</span>, <span class="synConstant">&quot;Confirm Password&quot;</span>)
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;Register&quot;</span> /&gt;
&lt;/fieldset&gt;
&lt;/form&gt;
&lt;/section&gt;
</pre><p>だいぶシンプルになって予はだいぶ満足したぞよ。ほかのヘルパーの真似して new { Value = name} で追加の属性を追加できるようにしてみたのがちょっとだけ自慢だ。リフレクションはちょっと苦手なので、今日は個人的にその勉強などしてみた。</p><p>次回はログインとログアウトだけど、これは一瞬で終わりそう……。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-8a0f6f9f" name="f-8a0f6f9f" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">コードビハインドっていうの？　知らんけど</span></p>
</div>