---
date: 2012-08-16T15:57:14.0000000
draft: false
title: "WebMatrix で Markdown を少しだけ拡張してみる"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>前回（<a href="https://blog.daruyanagi.jp/entry/2012/08/16/043012">WebMatrix &#x3067; Markdown &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）は、「WebMatrix 2」で Markdown を使ってみました。ついでに静的クラスを用意して、コードも少しキレイにしてみました。最終的にはこんな感じです。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Markdown.cs

<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.IO;
<span class="synStatement">using</span> System.Text;
<span class="synStatement">using</span> System.Web;

<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// Summary description for ClassName</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Markdown
{
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">readonly</span> MarkdownSharp.Markdown md =
<span class="synStatement">new</span> MarkdownSharp.Markdown();
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">readonly</span> Encoding encoding = Encoding.UTF8;

<span class="synType">public</span> <span class="synType">static</span> HtmlString Parse(<span class="synType">string</span> input)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HtmlString(md.Transform(input));
}

<span class="synType">public</span> <span class="synType">static</span> HtmlString LoadFromFile(<span class="synType">string</span> path)
{
<span class="synStatement">return</span> Parse(File.ReadAllText(path, encoding));
}
}
</pre><p>で、 Web ページ側ではこんな感じに使います。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Page.cshtml

&lt;!DOCTYPE html&gt;

@{
var path = Server.MapPath(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}/{1}.markdown&quot;</span>,
<span class="synConstant">&quot;~/App_Docs/&quot;</span>,
UrlData.Count == <span class="synConstant">0</span>
? <span class="synConstant">&quot;Default&quot;</span>
: <span class="synType">string</span>.Join(<span class="synConstant">&quot;/&quot;</span>, UrlData)
)
);
}

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@Markdown.LoadFromFile(path)
&lt;/body&gt;
&lt;/html&gt;
</pre><p>ところで、前回は脚注にこんなことを書いておきました。</p>

<blockquote>
<p>（Markdown の）弱点は若干機能不足なこと。これを補う派生版が幾つかあります</p>

</blockquote>
<p>その代表例が <a href="http://github.github.com/github-flavored-markdown/">Redirecting...</a> （GFM）です。たとえば、こんな書式でプログラミング言語を指定してシンタックスハイライトが行えます。</p>
<pre class="code" data-lang="" data-unlink>```ruby
require &#39;redcarpet&#39;
markdown = Redcarpet.new(&#34;Hello World!&#34;)
puts markdown.to_html
```</pre><p>これはいいですね！　さっそく取り入れてみましょう。</p>

<div class="section">
<h3>準備</h3>
<p>まずはシンタックスハイライト機能をどうやって実現するか…… Google Code Prettify（<a href="http://google-code-prettify.googlecode.com/svn/trunk/README.html">http://google-code-prettify.googlecode.com/svn/trunk/README.html</a>）ならば NuGet で取得できるのですけど、今回は Highlight.js （<a href="http://softwaremaniacs.org/soft/highlight/en/">highlight.js</a>）を使ってみることにしました。なぜかというと、こっちのほうが言語サポートが幅広いみたいだからデス。ダウンロードして、以下のように配置しました。</p>
<pre class="code" data-lang="" data-unlink>~/
/App_Code
Highlight.cshtml &lt;-- あとで説明します！
/Highlight
Lisence Files
/Content
Highlight
/    Theme Skins
/Scripts
/Highlight
hilight.pack.js</pre><p>こうした状態で、</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;en&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Highlight/default.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/Highlight/highlight.pack.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span><span class="synSpecial">hljs.initHighlightingOnLoad</span>()<span class="synSpecial">;</span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">code</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;language&quot;</span><span class="synIdentifier">&gt;</span>
// Any Code...
<span class="synIdentifier">&lt;/</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">code</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>などと記述すれば、 pre > code 内のコードが色分け表示されます。……しっかし、 Highlight.js は NuGet ないのか……めんどくせえな。久しぶりに作るかな。</p>

</div>
<div class="section">
<h3>コーディング</h3>
<p>お次は Markdown.cs を拡張して、 ```～``` 記法へ対応させます。適当に正規表現で解決してみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>：
：
<span class="synStatement">using</span> System.Text.RegularExpressions;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Markdown
{
：
：
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> HighlightEnabled { get; set; }

<span class="synType">static</span> Markdown()
{
HighlightEnabled = <span class="synConstant">true</span>;
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Highlight(<span class="synType">string</span> input)
{
<span class="synType">const</span> <span class="synType">string</span> R = <span class="synSpecial">@</span><span class="synConstant">&quot;```(?&lt;type&gt;\w+)\r(?&lt;code&gt;.+)```&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> F = <span class="synSpecial">@</span><span class="synConstant">&quot;&lt;pre&gt;&lt;code class=&quot;&quot;{0}&quot;&quot;&gt;{1}&lt;/code&gt;&lt;/pre&gt;&quot;</span>;

Regex r = <span class="synStatement">new</span> Regex(R, RegexOptions.Singleline);

<span class="synStatement">return</span> r.Replace(
input,
(m) =&gt; <span class="synType">string</span>.Format(
F, m.Groups[<span class="synConstant">&quot;type&quot;</span>],
HttpUtility.HtmlEncode(m.Groups[<span class="synConstant">&quot;code&quot;</span>])
)
);
}
}
</pre><p>完成<a href="#f-729061fc" name="fn-729061fc" title="なんで改行が \n でマッチせずに \r ではマッチするんだ……くっそくっそ">*1</a>！ m.Groups["code"] を HTML エンコードする必要があったのでラムダ式になりましたけれど、そうでなければ @"&lt;pre&gt;&lt;code class=""${type}""&gt;${code}&lt;/code&gt;&lt;/pre&gt;" で置換できるんですね。知らなかったわー。ちなみに、正規表現のテストはオンラインツールが便利です（<a href="http://regexhero.net/tester/">The .NET Regex Tester | Regex Hero</a>）。</p><p>できあがりはこんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816153937.png" alt="f:id:daruyanagi:20120816153937p:plain" title="f:id:daruyanagi:20120816153937p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HighlightEnabled = false;</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816153946.png" alt="f:id:daruyanagi:20120816153946p:plain" title="f:id:daruyanagi:20120816153946p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HighlightEnabled = true;</p>

</div>
<div class="section">
<h3>ステップアップ</h3>
<p>最後に、少し細かいところをブラッシュアップしてみましょう。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Highlight/default.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/Highlight/highlight.pack.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span><span class="synSpecial">hljs.initHighlightingOnLoad</span>()<span class="synSpecial">;</span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
</pre><p>Highlight.js を使う際のおまじない、毎回書くの面倒ですね？　なので、ヘルパーとしてまとめてみました。 ~/App_Code/Highlight.cshtml に以下のように記述します。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@helper Include(<span class="synType">string</span> theme = <span class="synConstant">&quot;default&quot;</span>){
&lt;link rel=<span class="synConstant">&quot;stylesheet&quot;</span> href=<span class="synConstant">&quot;~/Content/Highlight/@(theme).css&quot;</span>&gt;
&lt;script src=<span class="synConstant">&quot;~/Scripts/Highlight/highlight.pack.js&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
}
</pre><p>これで Web ページを使うときでも、 @Higjlight.Include() を呼び出すだけでOK！</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;en&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        @Higjlight.Include(&quot;vs&quot;) </span><span class="synIdentifier">&lt;</span>--<span class="synIdentifier"> おまじないに変換される</span>
<span class="synIdentifier">    </span><span class="synError">&lt;</span><span class="synIdentifier">/head&gt;</span>
</pre><p>引数を与えることでテーマを選択できるのもいい感じでしょう？　そうでもないデスか。まぁ、「鬼に金棒」、「怠け者にヘルパー」ってもんですよ。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-729061fc" name="f-729061fc" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">なんで改行が \n でマッチせずに \r ではマッチするんだ……くっそくっそ</span></p>
</div>