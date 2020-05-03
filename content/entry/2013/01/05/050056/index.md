---
date: 2013-01-05T05:00:56.0000000
draft: false
title: "WebMatrix 2：お正月なのでいつもは書かないことを徒然なるままに"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130105035445.png" alt="f:id:daruyanagi:20130105035445p:plain" title="f:id:daruyanagi:20130105035445p:plain" class="hatena-fotolife" itemprop="image"></span></p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var hello = <span class="synConstant">&quot;Hello!&quot;</span>;
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;@hello World!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>これの結果は、当然“Hello! World!”ですね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130105035453.png" alt="f:id:daruyanagi:20130105035453p:plain" title="f:id:daruyanagi:20130105035453p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さて、Razor 構文で変数を埋め込んだ</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;p&gt;@hello World!&lt;/p&gt;
</pre><p>の部分は、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;p&gt;@(hello) World!&lt;/p&gt;
</pre><p>とも書いていい、というか、もともとこの形の省略なんだな（たぶん）。</p><p>括弧を省略した場合は、スペースや記号（要は C# の変数に使えない文字）、HTML タグの手前で一度区切られ、評価が行われる。だから、もし Hello! と World! の間にスペースを入れたくなければ、@(hello)World! と書いて明示的に括弧で区切りを示さなければならない。じゃないと、@(helloWorld)! と解釈される。</p><p>@() の内容は、その値が評価され（ToString() だと思えばいい）、無毒化のうえ（つまり HtmlEncode() やな）出力される。逆に言えば、@() の内容は値をもつ変数か関数でなくてはならない。</p><p>一方、@{} の中には文を記述する。文というのは、要は ; で終わっていたり、{} で囲まれたコードの塊。たとえば、Razor で括弧を省略せずに for 文を書くときは {} が使える。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;ul&gt;
@{
<span class="synStatement">for</span>(<span class="synType">int</span> i = <span class="synConstant">0</span>; i &lt; <span class="synConstant">10</span>; i++)
{
&lt;li&gt;@(i)&lt;/li&gt;
}
}
&lt;/ul&gt;
</pre><p>わざわざこのように読みにくく書くことはないけど（ひとによってはこっちの方がいいか？）。</p><p>ちなみに、for や if のあとの {} の中身はまた少し特殊で（だから省略できないんだな……）、@{} 外と同じ感じで評価される。つまり、HTML タグと @() が使える。まぁ、理屈より書いて慣れた方が早い。Don't think, feel!</p><p>さてはて。</p><p>では、冒頭のコードで @(hello) の代わりに @{hello} を使うとどうなるでしょうか。</p>
<pre class="code lang-" data-lang="" data-unlink>&lt;p&gt;@{hello} World!&lt;/p&gt;</pre><p>@{} には文（手続きや宣言）を記述しなければならなかった。なので、これは当然コンパイルエラーに……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130105040948.png" alt="f:id:daruyanagi:20130105040948p:plain" title="f:id:daruyanagi:20130105040948p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ぉ！　エラーメッセージに ASP.NET が吐いた中間コードのパスが書いてありますな。試しに、これをちょっと覗いてみましょう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130105041116.png" alt="f:id:daruyanagi:20130105041116p:plain" title="f:id:daruyanagi:20130105041116p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ほーほーほー（← あんまりよくわかっていない）。ちょっと面白いかも。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130105041554.png" alt="f:id:daruyanagi:20130105041554p:plain" title="f:id:daruyanagi:20130105041554p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>この中間コードがおさまっているフォルダをのぞいてみると、大量の意味不明なファイルがたくさん。「裏でいろんなことをしてるんだなぁ」ってのが分かると思う。</p><p>ちなみに、冒頭のコンパイル可能なコードの大まかな構造はこんな感じだった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> ASP
{
<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.IO;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Net;
<span class="synStatement">using</span> System.Web;
<span class="synStatement">using</span> System.Web.Helpers;
<span class="synStatement">using</span> System.Web.Security;
<span class="synStatement">using</span> System.Web.UI;
<span class="synStatement">using</span> System.Web.WebPages;
<span class="synStatement">using</span> System.Web.WebPages.Html;
<span class="synStatement">using</span> WebMatrix.Data;
<span class="synStatement">using</span> WebMatrix.WebData;


<span class="synType">public</span> <span class="synType">class</span> _Page_Default_cshtml : System.Web.WebPages.WebPage
{
<span class="synPreProc">#line hidden</span>
<span class="synType">public</span> _Page_Default_cshtml()
{
}

<span class="synType">protected</span> System.Web.HttpApplication ApplicationInstance
{
<span class="synStatement">get</span> {
<span class="synStatement">return</span> ((System.Web.HttpApplication)(Context.ApplicationInstance));
}
}

<span class="synType">public</span> <span class="synType">override</span> <span class="synType">void</span> Execute()
{
<span class="synPreProc">#line 1 &quot;C:\Users\Hidetoshi Yanagi\Documents\My Web Sites\空のサイト\Default.cshtml&quot;</span>
var hello = <span class="synConstant">&quot;Hello!&quot;</span>;
<span class="synPreProc">#line default</span>
<span class="synPreProc">#line hidden</span>

BeginContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">32</span>, <span class="synConstant">28</span>, <span class="synConstant">true</span>);
WriteLiteral(<span class="synConstant">&quot;</span><span class="synSpecial">\r\n\r\n</span><span class="synConstant">&lt;!DOCTYPE html&gt;</span><span class="synSpecial">\r\n\r\n</span><span class="synConstant">&lt;html&quot;</span>);
EndContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">32</span>, <span class="synConstant">28</span>, <span class="synConstant">true</span>);

：

BeginContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">271</span>, <span class="synConstant">5</span>, <span class="synConstant">false</span>);
<span class="synPreProc">#line 14 &quot;C:\Users\Hidetoshi Yanagi\Documents\My Web Sites\空のサイト\Default.cshtml&quot;</span>
Write(hello);
<span class="synPreProc">#line default</span>
<span class="synPreProc">#line hidden</span>
EndContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">271</span>, <span class="synConstant">5</span>, <span class="synConstant">false</span>);

BeginContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">276</span>, <span class="synConstant">35</span>, <span class="synConstant">true</span>);
WriteLiteral(<span class="synConstant">&quot; World!&lt;/p&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">    &lt;/body&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">&lt;/html&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>);
EndContext(<span class="synConstant">&quot;~/Default.cshtml&quot;</span>, <span class="synConstant">276</span>, <span class="synConstant">35</span>, <span class="synConstant">true</span>);
}
}
}
</pre><p>Razor 構文で記述した部分が、まるごと <a href="http://msdn.microsoft.com/ja-jp/library/system.web.webpages.webpageexecutingbase.execute(v=vs.111).aspx">WebPageExecutingBase.Execute &#x30E1;&#x30BD;&#x30C3;&#x30C9; (System.Web.WebPages)</a> になるのですね。@{} 内はそのまま、@() は BeginContext()～Write()～EndContext()、そのほかの HTML タグなどは BeginContext()～WriteLiteral() ～EndContext()で逐次書き込まれる感じ。</p><p>もっと Razor について知りたい人は、@shibayan にでも聞けばいいんじゃないかない。万世の屋上でも奢ればしゃべってくれると思うよ。</p>
