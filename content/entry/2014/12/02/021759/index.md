---
date: 2014-12-02T02:17:59.0000000
draft: false
title: "WebMatrix： Google Analytics API を使って前日の PV を取得するコードを C# で書いてみた"
tags: ["WebMatrix"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20141202/20141202020215.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141202020215.png" alt="f:id:daruyanagi:20141202020215p:plain" title="f:id:daruyanagi:20141202020215p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://blog.shibayan.jp/entry/20140803/1407059293">Google Analytics API &#x3092;&#x4F7F;&#x3063;&#x3066;&#x524D;&#x65E5;&#x306E; PV &#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#x30B3;&#x30FC;&#x30C9;&#x3092; C# &#x3067;&#x66F8;&#x3044;&#x3066;&#x307F;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a> を WebMatrix でやってみた。とりあえず、前日の PV を表示するとことまで。</p>

<div class="section">
<h3>つまづいたところその一</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141202020415.png" alt="f:id:daruyanagi:20141202020415p:plain" title="f:id:daruyanagi:20141202020415p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote>
<p>'/' アプリケーションでサーバー エラーが発生しました。</p><p>Error:"invalid_grant", Description:"", Uri:"" </p>

</blockquote>
<p>パラメーターが間違っていたりすると、認証エラーが出る。自分の場合は、<b>PC の時刻が狂っていた</b>。ちゃんと合わせておきましょう。</p>

</div>
<div class="section">
<h3>つまづいたところその二</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141202020715.png" alt="f:id:daruyanagi:20141202020715p:plain" title="f:id:daruyanagi:20141202020715p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote>
<p>502 - Web server received an invalid response while acting as a gateway or proxy server.</p><p>There is a problem with the page you are looking for, and it cannot be displayed. When the Web server (while acting as a gateway or proxy) contacted the upstream content server, it received an invalid response from the content server.</p>

</blockquote>
<p>ローカルではちゃんと動くのに、Windows Azure に置くと 502 エラーが出る。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var certificate = <span class="synStatement">new</span> X509Certificate2(
HttpContext.Current.Server.MapPath(key),
<span class="synConstant">&quot;notasecret&quot;</span>,
X509KeyStorageFlags.Exportable
);
</pre><p>この部分を、以下のように修正。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var certificate = <span class="synStatement">new</span> X509Certificate2(
HttpContext.Current.Server.MapPath(key),
<span class="synConstant">&quot;notasecret&quot;</span>,
X509KeyStorageFlags.Exportable |
X509KeyStorageFlags.MachineKeySet
);
</pre><p>StackOverflow さまさまやでぇ。</p>

<ul>
<li><a href="http://stackoverflow.com/questions/16992031/google-analytics-api-on-azure">c# - Google Analytics Api on Azure - Stack Overflow</a></li>
</ul>
</div>
<div class="section">
<h3>つまづいたところその三</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141202021217.png" alt="f:id:daruyanagi:20141202021217p:plain" title="f:id:daruyanagi:20141202021217p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>そもそもレポジトリのソースを変えないと <a href="https://www.nuget.org/packages/Google.Apis.Analytics.v3/">NuGet Gallery | Google.Apis.Analytics.v3 1.38.0.1306</a> が出てこない感じ。</p><p>で、やっとこさ検索しても、肝心の NuGet パッケージがインストールできねえ……NuGet Package Manager のバージョンが古いからみたいだけど、結局 Visual Studio にスイッチして NuGet をバージョンアップしたりごにょごにょして解決。</p><p>結局こんな感じになった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/_App_Start.cshtml

@<span class="synStatement">using</span> System.Security.Cryptography.X509Certificates
@<span class="synStatement">using</span> Google.Apis.Auth.OAuth2
@<span class="synStatement">using</span> Google.Apis.Analytics.v3
@<span class="synStatement">using</span> Google.Apis.Services

@{
var key = <span class="synSpecial">@</span><span class="synConstant">&quot;~/API Project-***.p12&quot;</span>;
var mail = <span class="synSpecial">@</span><span class="synConstant">&quot;***@developer.gserviceaccount.com&quot;</span>;
var app_name = <span class="synConstant">&quot;sample app&quot;</span>;
var view_id = <span class="synConstant">&quot;***&quot;</span>;

var certificate = <span class="synStatement">new</span> X509Certificate2(
HttpContext.Current.Server.MapPath(key),
<span class="synConstant">&quot;notasecret&quot;</span>,
X509KeyStorageFlags.Exportable |
X509KeyStorageFlags.MachineKeySet
);

var credential = <span class="synStatement">new</span> ServiceAccountCredential(
<span class="synStatement">new</span> ServiceAccountCredential.Initializer(mail)
{
Scopes = <span class="synStatement">new</span>[] {
AnalyticsService.Scope.Analytics,
AnalyticsService.Scope.AnalyticsReadonly
}
}.FromCertificate(certificate)
);

var service = <span class="synStatement">new</span> AnalyticsService(<span class="synStatement">new</span> BaseClientService.Initializer
{
HttpClientInitializer = credential,
ApplicationName = app_name,
});

<span class="synComment">// Azure は UTC なので +9 時間して -1 日</span>
var date = DateTime.UtcNow.AddHours(<span class="synConstant">9</span>).AddDays(-<span class="synConstant">1</span>).ToString(<span class="synConstant">&quot;yyyy-MM-dd&quot;</span>);

App.PageView = service.Data.Ga
.Get(<span class="synConstant">&quot;ga:&quot;</span> + view_id, date, date, <span class="synConstant">&quot;ga:pageviews&quot;</span>)
.Execute()
.Rows[<span class="synConstant">0</span>][<span class="synConstant">0</span>];
}
</pre><p>（別に ~/_AppStart.cshtml に書く必要はないけど、成り行きで何となくそうしてしまった）</p>
<pre class="code" data-lang="" data-unlink># Default.cshtml

@{

}

&lt;!DOCTYPE html&gt;

&lt;html lang=&#34;ja&#34;&gt;
&lt;head&gt;
&lt;meta http-equiv=&#34;Content-Type&#34; content=&#34;text/html; charset=utf-8&#34;/&gt;
&lt;meta charset=&#34;utf-8&#34; /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=&#34;~/favicon.ico&#34; rel=&#34;shortcut icon&#34; type=&#34;image/x-icon&#34; /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;昨日のだるろぐの PV は @App.PageView でした。 https://blog.daruyanagi.jp/&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre><p>ほとんどしばやんのコードのまるパクリになったので、こんど万世のローストビーフでもおごってあげようと思った。</p>

</div>