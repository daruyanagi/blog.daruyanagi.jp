---
date: 2017-07-17T14:33:23.0000000
draft: false
title: "ASP.NET Core MVC：特定のリクエストを他のサイトにリダイレクトする"
tags: ["ASP.NET Core"]
eyecatch: 20170717143025.png
---
<p>6月末、事情があって急遽 daruyanagi.jp を ASP.NET Core MVC で書き直した。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F06%2F27%2F021736" title="空の ASP.NET Core プロジェクトからとりあえず Web サイトのトップページを書いて Azure にデプロイするまで - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/06/27/021736">blog.daruyanagi.jp</a></cite></p><p>しかし、このとき daruyanagi.jp → blog.daruyanagi.jp へのリダイレクト機能を実装していなかった。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F03%2F26%2F234347" title="はてなブログのドメインを daruyanagi.jp から blog.daruyanagi.jp へ引越しした - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/03/26/234347">blog.daruyanagi.jp</a></cite></p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F04%2F02%2F013553" title="Google Search Console から“「404」ページの増加”というメールが来た - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/04/02/013553">blog.daruyanagi.jp</a></cite></p><p>リンク先を読むのがめんどくさい人のために、事情をかいつまんでいうと、</p>

<ul>
<li>むかし、はてなブログを daruyanagi.jp で運営していた</li>
<li>はてなブログをサブドメインなしで運用するのは非推奨だったので、blog.daruyanagi.jp へ移した</li>
<li>当然ながら大量のリンク切れが発生</li>
<li>これを解消するため、daruyanagi.jp にリダイレクト機能を組み込んでいた（ASP.NET Web Pages 製）</li>
<li>ASP.NET Web Pages 製 daruyanagi.jp を ASP.NET Core MVC 製にする過程で、リダイレクト機能を省略した</li>
</ul><p>Visual Studio 2017 Update 3 が正式版になれば、ASP.NET Web Pages のような機能が IDE 側でサポートされるという話を聞いたので、それを待ってから実装してもいいかなと思っていたのだけど、なかなかこない＆ブログにリンク切れが多くて使いにくかったので、とりあえずやっつけの対策を施した。</p><p>まず、ルーティングの書き換え。今回は /entry だけを対策しておく（ほんとは他の URL にも対策を施さないといけないけれど、今回は一番困るやつだけ対策）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// {Root}/startup.cs</span>

app.UseMvc(routes =&gt;
{
routes.MapRoute(
<span class="synStatement">        name:</span> <span class="synConstant">&quot;entry&quot;</span>,
<span class="synStatement">        template:</span> <span class="synConstant">&quot;entry/{*id}&quot;</span>,
<span class="synStatement">        defaults:</span> <span class="synStatement">new</span> { controller = <span class="synConstant">&quot;Entry&quot;</span>, action = <span class="synConstant">&quot;Index&quot;</span> });

routes.MapRoute(
<span class="synStatement">        name:</span> <span class="synConstant">&quot;default&quot;</span>,
<span class="synStatement">        template:</span> <span class="synConstant">&quot;{controller=Home}/{action=Index}/{id?}&quot;</span>);
});
</pre><p>ちゃんとコントローラーに処理が移っているみたい。“*（アスタリスク）”を付ければ、“/（スラッシュ）”も含めてマッチするみたいだね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170717143025.png" alt="f:id:daruyanagi:20170717143025p:plain" title="f:id:daruyanagi:20170717143025p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは EntryController をちょちょいのちょいと書き換え。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// {Root}/Controllers/EntryController.cs</span>

<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Threading.Tasks;
<span class="synStatement">using</span> Microsoft.AspNetCore.Mvc;

<span class="synComment">// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860</span>

<span class="synType">namespace</span> daruyanagi.Controllers
{
<span class="synType">public</span> <span class="synType">class</span> EntryController : Controller
{
<span class="synComment">// GET: /&lt;controller&gt;/</span>
<span class="synType">public</span> IActionResult Index()
{
var url = HttpContext.Request.Path;

<span class="synStatement">return</span> Redirect($<span class="synConstant">&quot;http://blog.daruyanagi.jp{url}&quot;</span>);
}
}
}
</pre><p>これでだいたいイケてるような気がする。</p>
