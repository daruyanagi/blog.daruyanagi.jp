---
date: 2012-08-20T21:07:29.0000000
draft: false
title: "WebMatrix でファイルのアップロード（2） の補足"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014842.png" alt="f:id:daruyanagi:20120820014842p:plain" title="f:id:daruyanagi:20120820014842p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/20/020355">
<p>デカいファイルをアップロードしようとすると発生するのだけれど、この例外をトラップするのが面倒……。無理やり頑張ってトラップしてみたのだけれど、 try 文がやたらネストするし、 Request に少しでもアクセスしようものなら発生するので IsAjax が取れずに少し困っている。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/20/020355">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>思いついたのだけれど、無理してビューまたは Json を返そうとしなくてもステータスコードだけ返せばいいな。最初にわざとエラーを発生させるコードを書いてそこで return してしまえば、 try……catch 文のネストを減らせるし。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synStatement">try</span> <span class="synComment">// Catch Request-too-long Error</span>
{
var dummy = Request.Files;
}
<span class="synStatement">catch</span> (Exception e)
{
Response.StatusCode =
(<span class="synType">int</span>) HttpStatusCode.InternalServerError;
Response.Write(e.Message);
<span class="synStatement">return</span>;
}

<span class="synStatement">if</span> (IsPost)
{
：
：
</pre><p>これをするとどうなるのかというと、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820210027.png" alt="f:id:daruyanagi:20120820210027p:plain" title="f:id:daruyanagi:20120820210027p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、デカいファイルを投げる（既定では約4MB以上）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820210114.png" alt="f:id:daruyanagi:20120820210114p:plain" title="f:id:daruyanagi:20120820210114p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>サーバーでエラーが発生し、ステータスコード（よくわからんけど5**）を返す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820210207.png" alt="f:id:daruyanagi:20120820210207p:plain" title="f:id:daruyanagi:20120820210207p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>$.ajax() の error プロパティでそれを拾って……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014842.png" alt="f:id:daruyanagi:20120820014842p:plain" title="f:id:daruyanagi:20120820014842p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HTML を更新する。ブラウザーからアクセスしたときは、まぁ、なんかエラー画面が表示されるのだろう。とりあえずこれでいいか。</p>
