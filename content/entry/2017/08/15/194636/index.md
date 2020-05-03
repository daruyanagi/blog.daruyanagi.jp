---
date: 2017-08-15T19:46:36.0000000
draft: false
title: "ASP.NET Core：特定のリクエストをミドルウェアでリダイレクトする"
tags: ["ASP.NET Core"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170816021356.png" alt="f:id:daruyanagi:20170816021356p:plain" title="f:id:daruyanagi:20170816021356p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>旧ドメインから新ドメインへのリダイレクトを Controller でやっていたのだけど、実はミドルウェアでできることを今日知った……。情報弱者にもほどがある。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Faspnet%2Fcore%2Ffundamentals%2Furl-rewriting" title="URL Rewriting Middleware in ASP.NET Core" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/url-rewriting">docs.microsoft.com</a></cite></p><p>具体的には、こんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> Startup
{
<span class="synType">public</span> <span class="synType">void</span> ConfigureServices(IServiceCollection services)
{
services.AddMvc();
}

<span class="synType">public</span> <span class="synType">void</span> Configure(IApplicationBuilder app, IHostingEnvironment env)
{
<span class="synStatement">if</span> (env.IsDevelopment())
{
app.UseDeveloperExceptionPage();
}

var options = <span class="synStatement">new</span> RewriteOptions()
.AddRedirect(<span class="synConstant">&quot;entry/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/entry/$1&quot;</span>)
.AddRedirect(<span class="synConstant">&quot;category/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/category/$1&quot;</span>)
.AddRedirect(<span class="synConstant">&quot;entries/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/entries/$1&quot;</span>)
.AddRedirect(<span class="synConstant">&quot;search/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/search/$1&quot;</span>)
.AddRedirect(<span class="synConstant">&quot;touch/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/touch/$1&quot;</span>)
.AddRedirect(<span class="synConstant">&quot;embed/(.*)&quot;</span>, <span class="synConstant">&quot;http://blog.daruyanagi.jp/embed/$1&quot;</span>);
app.UseRewriter(options);

app.UseStaticFiles();
app.UseMvc();
}
}
</pre><p>今まで自分がやってきたやり方はクソなので、もう忘れようと思う。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F07%2F17%2F143323" title="ASP.NET Core MVC：特定のリクエストを他のサイトにリダイレクトする - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/07/17/143323">blog.daruyanagi.jp</a></cite></p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F07%2F17%2F143323" title="ASP.NET Core MVC：特定のリクエストを他のサイトにリダイレクトする - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/07/17/143323">blog.daruyanagi.jp</a></cite></p><p>そのほかにも URL リライトを行ったり、IIS や Apache のリライトルールを読み込んで利用したり、ルールをメソッドで記述したり、IRule インターフェースでリライトを定義したりできるみたいですね。　</p>
