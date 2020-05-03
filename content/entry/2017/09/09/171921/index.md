---
date: 2017-09-09T17:19:21.0000000
draft: false
title: "Razor Pages：PhantomJS で動的サイトをスクレイピングする（2）"
tags: ["ASP.NET Core Razor Page", "ASP.NET Core Web API"]
eyecatch: 20170909170801.png
---
<p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F09%2F08%2F235450" title="Razor Pages：PhantomJS で動的サイトをスクレイピングする - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/09/08/235450">blog.daruyanagi.jp</a></cite></p><p>前回、<a href="http://blog.daruyanagi.jp/entry/2017/09/08/235450">AngleSharp</a> を使えばよかったかもといったのですが、結果的にはちょっと大変かなって感じでした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var document = <span class="synStatement">default</span>(IHtmlDocument);

<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> HttpClient())
<span class="synStatement">using</span> (var stream = await client.GetStreamAsync(Target))
{
var parser = <span class="synStatement">new</span> HtmlParser();
document = await parser.ParseAsync(stream);
}

Result = document.QuerySelector(Selector)?.InnerHtml;

<span class="synStatement">return</span> Page();
</pre><p>確かにシンプルなのですが、外部 JavaScript を読んで、評価して……までやりだすと、いろいろ大変な感じ<a href="#f-4db4db9a" name="fn-4db4db9a" title="すごく頑張ればできなくはなさそうだけど、バージョンアップで API が変わってたりでちょっと調べるのが面倒になった">*1</a>。これまで通り PhantomJS でやった方がよさそう。</p><p>――というわけで。</p><p>今回はそっちを置いておいて、Web API として使えるようにしてみました。ASP.NET API（Core）を使うのは初めてだったんですが、今回のような単純なモノであれば一瞬でできました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WebApplication7.Controllers
{
[Route(<span class="synConstant">&quot;api/[controller]&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> ValuesController : Controller
{
<span class="synComment">// GET api/values</span>
[HttpGet]
<span class="synType">public</span> IEnumerable&lt;<span class="synType">string</span>&gt; Get()
{
<span class="synStatement">return</span> <span class="synStatement">new</span> <span class="synType">string</span>[] { <span class="synConstant">&quot;value1&quot;</span>, <span class="synConstant">&quot;value2&quot;</span> };
}
}
}
</pre><p><code>/api/values</code> をゲットでたたくと、<code>{ "value1", "value2" }</code> が返ってくる。これと組み合わせて、API Controller を Razor Pages で呼び出して使いたいなーと、ちょっと四苦八苦していたのですが、それはちょっと筋悪だったよう。結局は、API と Razor Pages で共通のロジックをまとめて（適当に <code>Services</code> フォルダーにまとめました）、共有することにしました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170909170801.png" alt="f:id:daruyanagi:20170909170801p:plain" title="f:id:daruyanagi:20170909170801p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>共有部分はこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>
<span class="synComment">// サービスと名付けたモノ（/Services）</span>

<span class="synType">namespace</span> WebApplication7.Services
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> DynamicScrapingService
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Process(Models.ScrapingRequest request)
{
var root_dir = Hosting.Environment.ContentRootPath;
var work_dir = System.IO.Path.Combine(root_dir, <span class="synConstant">&quot;Tools&quot;</span>);
var script_name = <span class="synConstant">&quot;scrape.js&quot;</span>;

var info = <span class="synStatement">new</span> System.Diagnostics.ProcessStartInfo()
{
Arguments = $<span class="synSpecial">@</span><span class="synConstant">&quot;&quot;&quot;{script_name}&quot;&quot; &quot;&quot;{request?.Target}&quot;&quot; &quot;&quot;{request?.Selector}&quot;&quot;&quot;</span>,
FileName = System.IO.Path.Combine(work_dir, <span class="synConstant">&quot;phantomjs.exe&quot;</span>),
CreateNoWindow = <span class="synConstant">true</span>,
RedirectStandardOutput = <span class="synConstant">true</span>,
StandardOutputEncoding = System.Text.Encoding.UTF8,
UseShellExecute = <span class="synConstant">false</span>,
WorkingDirectory = work_dir,
};

<span class="synStatement">using</span> (var process = <span class="synStatement">new</span> System.Diagnostics.Process() { StartInfo = info, })
{
var output = <span class="synType">string</span>.Empty;

process.OutputDataReceived += (s, a) =&gt; { output += a.Data; };

process.Start();
process.BeginOutputReadLine();
process.WaitForExit();

<span class="synComment">// エラー出力をちょん切る</span>
var r = <span class="synStatement">new</span> System.Text.RegularExpressions.Regex(<span class="synConstant">&quot;{.+}&quot;</span>);
output = r.Match(output).Value;

<span class="synStatement">return</span> output;
}
}
}
}

<span class="synComment">// モデル的なモノ（/Models）</span>

<span class="synType">namespace</span> WebApplication7.Models
{
<span class="synType">public</span> <span class="synType">class</span> ScrapingRequest
{
<span class="synType">public</span> Uri Target { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Selector { get; set; }
}
}

<span class="synType">namespace</span> WebApplication7.Models
{
<span class="synType">public</span> <span class="synType">class</span> ScrapingResult
{
<span class="synType">public</span> <span class="synType">string</span> Url { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Selector { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Status { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Text { get; set; }
}
}
</pre><p>これを Index.cshtml では</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WebApplication7.Pages
{
<span class="synType">public</span> <span class="synType">class</span> IndexModel : PageModel
{
<span class="synType">public</span> IndexModel()
{
ScrapinRequest = <span class="synStatement">new</span> Models.ScrapingRequest()
{
Target = <span class="synStatement">new</span> Uri(<span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>),
Selector = <span class="synConstant">&quot;footer&quot;</span>,
};
}

<span class="synType">public</span> Models.ScrapingRequest ScrapinRequest { get; set; }
<span class="synType">public</span> Models.ScrapingResult ScrapingResult { get; set; }

<span class="synType">public</span> <span class="synType">void</span> OnPost()
{
var output = Services.DynamicScrapingService.Process(ScrapinRequest);
ScrapingResult = Newtonsoft.Json.JsonConvert.DeserializeObject&lt;Models.ScrapingResult&gt;(output);
}
}
}
</pre><p>こんな感じに呼び出します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170909171117.png" alt="f:id:daruyanagi:20170909171117p:plain" title="f:id:daruyanagi:20170909171117p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>API Controller ではこんな感じに使ってみました。JSON で渡して、JSON で返してくれる感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WebApplication7.Controllers
{
[Route(<span class="synConstant">&quot;api/[controller]&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> DynamicScrapingController : Controller
{
[HttpPost]
<span class="synType">public</span> IActionResult Index([FromBody] Models.ScrapingRequest request)
{
var output = Services.DynamicScrapingService.Process(request);
<span class="synStatement">return</span> Json(output);
}
}
}
</pre><p>テストはむかし @nakaji せんせいが教えてくれた Chrome 拡張機能を使ってみました。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.nakajix.jp%2Fentry%2F2014%2F06%2F24%2F005200" title="WebAPIの動作確認にはAdvanced REST clientが便利そう - なか日記" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.nakajix.jp/entry/2014/06/24/005200">blog.nakajix.jp</a></cite></p><p>大変便利なのでこれからも常用していこうと思います。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170909171326.png" alt="f:id:daruyanagi:20170909171326p:plain" title="f:id:daruyanagi:20170909171326p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>追伸</h3>
<p>前回書き忘れたのですが、ASP.NET Core には <code>Server.MapPath()</code> がないみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> WebApplication7
{
<span class="synType">public</span> <span class="synType">class</span> Startup
{
<span class="synType">public</span> Startup(IConfiguration configuration)
{
Configuration = configuration;
}

<span class="synType">public</span> IConfiguration Configuration { get; }

<span class="synComment">// This method gets called by the runtime. Use this method to add services to the container.</span>
<span class="synType">public</span> <span class="synType">void</span> ConfigureServices(IServiceCollection services)
{
services.AddMvc();
}

<span class="synComment">// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.</span>
<span class="synType">public</span> <span class="synType">void</span> Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
app.UseMvc();

Hosting.Environment = env;
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Hosting
{
<span class="synType">public</span> <span class="synType">static</span> IHostingEnvironment Environment { get; set; }
}
}
</pre><p>適当に IHostingEnvironment を保存しておくようにしたのですが（<code>Hosting.Environment.ContentRootPath</code> でルートがわかるので、それを <code>Path.Combine()</code> なんかでごにょごにょする）、これがいい作法なのかどうかは自信がない。</p>

</div>
<div class="section">
<h3>追伸2</h3>
<p>そのまま Azure Web Site に置けなくて泣いてる。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-4db4db9a" name="f-4db4db9a" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">すごく頑張ればできなくはなさそうだけど、バージョンアップで API が変わってたりでちょっと調べるのが面倒になった</span></p>
</div>