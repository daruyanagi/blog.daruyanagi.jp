---
date: 2017-09-08T23:54:50.0000000
draft: false
title: "Razor Pages：PhantomJS で動的サイトをスクレイピングする"
tags: ["ASP.NET Core Razor Page"]
eyecatch: 20170908233127.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170908233127.png" alt="f:id:daruyanagi:20170908233127p:plain" title="f:id:daruyanagi:20170908233127p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>（Windows 10 version 1703 の最新ビルドの番号をテキトーに得るサンプル）</p><p>静的サイトのスクレイピングは HTML をダウンロードしてごちゃごちゃっとやればいいけど、動的サイトの場合はブラウザーで JavaScript の評価をしたあとの HTML（DOM ツリーっていうの？）がほしい。というわけで、ヘッドレスブラウザー「PhantomJS」でアクセス → 評価するサンプルを Razor Pages で作ってみた。</p><p>ソリューションはこんな構成になった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170908233703.png" alt="f:id:daruyanagi:20170908233703p:plain" title="f:id:daruyanagi:20170908233703p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ASP.NET Core＋Razor Pagesの導入方法は以下のページを参照のこと（別にこの通りにやる必要はないけど）。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2017%2F08%2F15%2F043634" title="空のアプリケーションから ASP.NET Core Razor Page を始める - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/08/15/043634">blog.daruyanagi.jp</a></cite><br />
</p>

<div class="section">
<h3>基本的な流れ</h3>
<p>PhantomJS.exe にスクリプトと Uri とセレクターを渡し、標準出力を介して結果（JSON）を得る。標準出力には PhantomJS が吐くエラーが混じることがあるので、適当な正規表現で除去しておく。</p>

</div>
<div class="section">
<h3>Index.cshtml</h3>
<p>コードビハインド？　MVVM じゃない方の ViewModel？　なんて言っていいのかは知らんけど（変な言葉遣いしたらその手のケーサツが来そうだし）、Index.cshtml の裏はこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// index.cshtml.cs</span>

<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Threading.Tasks;
<span class="synStatement">using</span> Microsoft.AspNetCore.Mvc;
<span class="synStatement">using</span> Microsoft.AspNetCore.Mvc.RazorPages;
<span class="synStatement">using</span> System.Diagnostics;
<span class="synStatement">using</span> System.IO;

<span class="synType">namespace</span> WebApplication5.Pages
{
<span class="synType">public</span> <span class="synType">class</span> IndexModel : PageModel
{
[BindProperty]
<span class="synType">public</span> Uri Target { get; set; }

[BindProperty]
<span class="synType">public</span> <span class="synType">string</span> Selector { get; set; }

[BindProperty]
<span class="synType">public</span> Models.ScrapingResult Result { get; <span class="synType">private</span> set; }

<span class="synType">public</span> IActionResult OnPost(<span class="synType">string</span> message)
{
<span class="synStatement">if</span> (!ModelState.IsValid) <span class="synStatement">return</span> Page();

var root_dir = Hosting.Environment.ContentRootPath;
var work_dir = System.IO.Path.Combine(root_dir, <span class="synConstant">&quot;Tools&quot;</span>);
var script_name = <span class="synConstant">&quot;scrape.js&quot;</span>;

var info = <span class="synStatement">new</span> ProcessStartInfo()
{
Arguments = $<span class="synSpecial">@</span><span class="synConstant">&quot;&quot;&quot;{script_name}&quot;&quot; &quot;&quot;{Target}&quot;&quot; &quot;&quot;{Selector}&quot;&quot;&quot;</span>,
FileName = Path.Combine(work_dir, <span class="synConstant">&quot;phantomjs.exe&quot;</span>),
CreateNoWindow = <span class="synConstant">true</span>,
RedirectStandardOutput = <span class="synConstant">true</span>,
StandardOutputEncoding = System.Text.Encoding.UTF8,
UseShellExecute = <span class="synConstant">false</span>,
WorkingDirectory = work_dir,
};

<span class="synStatement">using</span> (var process = <span class="synStatement">new</span> Process() { StartInfo = info, })
{
var output = <span class="synType">string</span>.Empty;

process.OutputDataReceived += (s, a) =&gt; { output += a.Data; Debug.WriteLine(a.Data); };

process.Start();
process.BeginOutputReadLine();
process.WaitForExit();

<span class="synComment">// エラー出力をちょん切る</span>
var r = <span class="synStatement">new</span> System.Text.RegularExpressions.Regex(<span class="synConstant">&quot;{.+}&quot;</span>);
output = r.Match(output).Value;

Result = Newtonsoft.Json.JsonConvert.DeserializeObject&lt;Models.ScrapingResult&gt;(output);
}

<span class="synStatement">return</span> Page();
}
}
}
</pre><p>ユーザーインターフェイス（Index.cshtml）はこんな感じ。まだ慣れてないのでこれいいのかよくわかんないけど、タグヘルパーってやつでバインディングできるんだなー。便利ンゴ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// Index.cshtml</span>
@page
@model WebApplication5.Pages.IndexModel
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

&lt;html&gt;
&lt;body&gt;
&lt;style&gt;
*, input { font-family: Meiryo; margin: 8px; }
pre { background-color: linen; width: 480px; overflow: scroll; }
&lt;/style&gt;
&lt;pre&gt;&lt;code&gt;
@Model.Result?.Text
&lt;/code&gt;&lt;/pre&gt;
&lt;div asp-validation-summary=<span class="synConstant">&quot;All&quot;</span>&gt;&lt;/div&gt;
&lt;form method=<span class="synConstant">&quot;POST&quot;</span>&gt;
&lt;div&gt;Target Uri: &lt;input asp-<span class="synStatement">for</span>=<span class="synConstant">&quot;Target&quot;</span> /&gt;&lt;/div&gt;
&lt;div&gt;Selector: &lt;input asp-<span class="synStatement">for</span>=<span class="synConstant">&quot;Selector&quot;</span> /&gt;&lt;/div&gt;
&lt;input type=<span class="synConstant">&quot;submit&quot;</span> /&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
</div>
<div class="section">
<h3>モデル</h3>
<p>スクレイピングの結果を表すモデル（？）クラスはこんな感じ。スクリプトが返す JSON の形式が固まるまでは dynamic にしちゃうと楽だね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Newtonsoft.Json;
<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Threading.Tasks;

<span class="synType">namespace</span> WebApplication5.Models
{

<span class="synType">public</span> <span class="synType">class</span> ScrapingResult
{
[JsonProperty(<span class="synConstant">&quot;uri&quot;</span>)]
<span class="synType">public</span> <span class="synType">string</span> Url { get; set; }

<span class="synComment">//[JsonProperty(&quot;selector&quot;)]</span>
<span class="synType">public</span> <span class="synType">string</span> Selector { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Status { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Text { get; set; }
}
}
</pre><p><code>[JsonProperty("uri")]</code> は要らんのか？　コメントアウトしても動いたから、命名規約ベースでよしなにしてくれるのかもしれない。</p>

</div>
<div class="section">
<h3>PhantomJS スクリプト</h3>
<p>PhantomJS に渡したスクリプトの中身はこんな感じ。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> page = require(<span class="synConstant">'webpage'</span>).create();
<span class="synIdentifier">var</span> system = require(<span class="synConstant">'system'</span>);
<span class="synIdentifier">var</span> url = system.args<span class="synIdentifier">[</span>1<span class="synIdentifier">]</span>;
<span class="synIdentifier">var</span> selector = system.args<span class="synIdentifier">[</span>2<span class="synIdentifier">]</span>;

page.open(url, <span class="synIdentifier">function</span> (<span class="synStatement">status</span>) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> text = <span class="synStatement">null</span>;
<span class="synStatement">if</span> (<span class="synStatement">status</span> === <span class="synConstant">'success'</span>) <span class="synIdentifier">{</span>
text = page.evaluate(<span class="synIdentifier">function</span> (selector) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> element = <span class="synStatement">document</span>.body.querySelector(selector);
<span class="synStatement">if</span> (element == <span class="synStatement">null</span>) <span class="synStatement">return</span> <span class="synStatement">null</span>;
<span class="synStatement">return</span> element.innerHTML;
<span class="synIdentifier">}</span>, selector);
<span class="synIdentifier">}</span>
console.log(JSON.stringify(<span class="synIdentifier">{</span> url: url, selector: selector, <span class="synStatement">status</span>: <span class="synStatement">status</span>, text: text, <span class="synIdentifier">}</span>));
phantom.exit();
<span class="synIdentifier">}</span>);
</pre><p>ちょっと悩んだのは page.evaluate() がサンドボックスになっていたこと。プリミティブ型じゃないとやり取りできないのかな。page.evaluate() に変数を渡す方法も悩んだけど、だいたいこれでイケそう<a href="#f-54d78508" name="fn-54d78508" title="JavaScript のスコープとか、基本があんまりわかってないのですごく悩んだ">*1</a>。</p><p>ほんとは引数チェックしたり、エラートラップして終了コードを渡したりした方がいいよね。まぁ、サンプルなのでいろいろ適当でいい気がする。</p><p>で、ここまで完成させたあとに昔ブックマークしたページのことを思い出した。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fqiita.com%2Fmatarillo%2Fitems%2Fa92e7efbfd2fdec62595" title="C#でモダンにスクレイピングするならAngleSharp - Qiita" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://qiita.com/matarillo/items/a92e7efbfd2fdec62595">qiita.com</a></cite></p><p>JavaScript の評価もできるなら、こっちを使った方がよかったかもしれない。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-54d78508" name="f-54d78508" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">JavaScript のスコープとか、基本があんまりわかってないのですごく悩んだ</span></p>
</div>