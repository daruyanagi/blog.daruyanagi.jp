---
date: 2013-06-13T20:47:47.0000000
draft: false
title: "WebMatrix 3: HttpClient を使う"
tags: ["WebMatrix"]
eyecatch: 20130613203301.png
---

<blockquote cite="http://blogs.msdn.com/b/dotnet/archive/2013/05/29/get-httpclient-rtm-200-ok.aspx">
<p>As promised in our last blog post we’re releasing Microsoft.Net.Http as a stable NuGet package today. Yep, that’s right: You can finally start using the portable HttpClient 2.1 in production!</p>

<cite><a href="http://blogs.msdn.com/b/dotnet/archive/2013/05/29/get-httpclient-rtm-200-ok.aspx">Get /httpclient/rtm &ndash; 200 OK - .NET Blog - Site Home - MSDN Blogs</a></cite>
</blockquote>
<p>Microsoft BCL チームが HttpClient を NuGet で利用できるようにして、すでに2週間が経っていた。汎用性の高いこのネットワーククライアントクラスは .NETer の第二の故郷となり、人々はそれでリクエストを飛ばし、受け取り、そして死んでいった。</p><p>――こいつの何が便利なのかは諸兄の解説に譲るとして。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20120822/1345563275">Web API &#x3088;&#x308A;&#x3082; HttpClient &#x306B;&#x6CE8;&#x76EE;&#x3057;&#x305F;&#x3044; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://www.slideshare.net/neuecc/httpclient">HttpClient&#x8A73;&#x89E3;&#x3001;&#x6216;&#x3044;&#x306F;&#x975E;&#x540C;&#x671F;&#x306E;&#x843D;&#x3068;&#x3057;&#x7A74;&#x306B;&#x3064;&#x3044;&#x3066;</a></li>
</ul><p>オラはこれを WebMatrix で使ってみるぞ！……正直 WebMatrix で使うべきものなのかはよくわからんが。</p>


<div class="section">
<h3>NuGet パッケージをインストール</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613203301.png" alt="f:id:daruyanagi:20130613203301p:plain" title="f:id:daruyanagi:20130613203301p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>空のサイト（ASP.NET）を作成。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613203324.png" alt="f:id:daruyanagi:20130613203324p:plain" title="f:id:daruyanagi:20130613203324p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>“HttpClient”で検索して NuGet パッケージをインストール。これでした準備を完了。</p>

</div>
<div class="section">
<h3>とりあえず使ってみる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613203552.png" alt="f:id:daruyanagi:20130613203552p:plain" title="f:id:daruyanagi:20130613203552p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Microsoft のトップページでも Get してみるかの。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@using System.Net.Http

@using (var downloader = new HttpClient())
{
var response = downloader.GetAsync(&quot;http://microsoft.com/&quot;).Result;
var content  = response.Content.ReadAsStringAsync().Result;
Page.Response = response;
Page.Content  = content;
}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Response<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>
@Page.Response
<span class="synIdentifier">&lt;/</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Content<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
@Page.Content
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613203716.png" alt="f:id:daruyanagi:20130613203716p:plain" title="f:id:daruyanagi:20130613203716p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>普通に使えた。WebClient のときよりも微妙にコードが長くなった気がするけど気にしない。今回は使えるかやってみるのが目標なので。</p><p>ちなみに @{ @using(){...} } の外側のカッコは省略できるけど（今回は省略して書いた）、変数のスコープを間違えやすいのでお勧めしない（今回の場合、var response がビューから呼べるような気がするけど呼べない）。</p>

</div>
<div class="section">
<h3>非同期にしてみる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613204245.png" alt="f:id:daruyanagi:20130613204245p:plain" title="f:id:daruyanagi:20130613204245p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これだけではあんまり面白くないので、async/await も使ってみるかな。……で、それで気づいたのだけど、WebMatrix のシンタックスハイライタは async/await に対応していない。まぁ、困りはしないが……</p>
<pre class="code lang-html" data-lang="html" data-unlink>@using System.Net.Http
@using System.Threading.Tasks

@{
var data = HogeAsync().Result;
}

@functions {
private async Task<span class="synIdentifier">&lt;</span>dynamic<span class="synIdentifier">&gt;</span> HogeAsync()
{
using (var downloader = new HttpClient())
{
var response = await downloader.GetAsync(&quot;http://microsoft.com/&quot;);
var content  = await response.Content.ReadAsStringAsync();

return new {
Response = response,
Content = content,
};
}
}
}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Response<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>
@data.Response
<span class="synIdentifier">&lt;/</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Content<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
@data.Content
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130613203716.png" alt="f:id:daruyanagi:20130613203716p:plain" title="f:id:daruyanagi:20130613203716p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>結果は同じ。</p>

</div>
<div class="section">
<h3>まとめ</h3>

<ul>
<li>普通に使える</li>
<li>でも、利点は感じない（ストアアプリなんかだったらバリバリ使うけど）</li>
<li>シンタックスハイライタが async/await に対応していなかった</li>
</ul>
</div>