---
date: 2012-08-30T04:06:09.0000000
draft: false
title: "寄り道： Rails の Flash っぽい機能を WebMatrix で使いたい（2） ―― @helper と @functions とわたし"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2012/08/29/201834">&#x5BC4;&#x308A;&#x9053;&#xFF1A; Rails &#x306E; Flash &#x3063;&#x307D;&#x3044;&#x6A5F;&#x80FD;&#x3092; WebMatrix &#x3067;&#x4F7F;&#x3044;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の話は続く。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/_AppCode/Flash.cshtml

@helper Read()
<span class="synComment">/* Razor を書く */</span> {
<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] == <span class="synConstant">null</span>) { <span class="synStatement">return</span>; }
<span class="synComment">// Razor では if 文の {} を省略できない。これ、マメな。</span>

&lt;div <span class="synType">class</span>=<span class="synConstant">&quot;message info&quot;</span>&gt;&lt;p&gt;@Session[<span class="synConstant">&quot;flash&quot;</span>]&lt;/p&gt;&lt;/div&gt;
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>;
}

@functions
<span class="synComment">/* 通常の C# 構文を書く */</span> {
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Write(<span class="synType">string</span> <span class="synStatement">value</span>)
{
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synStatement">value</span>;
}
}
</pre><p>この @helper ってなんなんだろうな。便利なのはいいけれど、中身がわからないのは気持ち悪い。まずは Visual Studio のツールチップでのぞいてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120830023803.png" alt="f:id:daruyanagi:20120830023803p:plain" title="f:id:daruyanagi:20120830023803p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず、 <code>@helper Hoge(args) {……}</code> は <code>public static HelperResult Hoge(args) {……}</code> （引数をとって HelperResult を返す＋なんらかの処理）ということのようだ。実際、 @helper Read() は @functions で表すこともできないことはない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@functions
{
<span class="synType">public</span> <span class="synType">static</span> HelperResult Read()
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(w =&gt;
{
<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] == <span class="synConstant">null</span>) { <span class="synStatement">return</span>; }

<span class="synComment">/* &lt;div class=&quot;message info&quot;&gt;&lt;p&gt;</span>
<span class="synComment">                   @Session[&quot;flash&quot;]</span>
<span class="synComment">               &lt;/p&gt;&lt;/div&gt; */</span>
WriteLiteralTo(w, <span class="synConstant">&quot;&lt;div class=</span><span class="synSpecial">\&quot;</span><span class="synConstant">message info</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;p&gt;&quot;</span>);
WriteTo(w, Session[<span class="synConstant">&quot;flash&quot;</span>]);
WriteLiteralTo(w, <span class="synConstant">&quot;&lt;/p&gt;&lt;/div&gt;&quot;</span>);

Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>;
});
}
}
</pre><p>というわけで書いてみたのがこれ（参考：<a href="http://shiba-yan.hatenablog.jp/entry/20110615/1308070842">Razor Deep Dive (2) - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a>）。たぶんきっと内部ではこういうことをしているんだと思う（ラムダの引数 w は TextWriter型）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120830034439.png" alt="f:id:daruyanagi:20120830034439p:plain" title="f:id:daruyanagi:20120830034439p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HelperPage（<a href="http://msdn.microsoft.com/en-us/library/system.web.webpages.helperpage(v=vs.111).aspx">http://msdn.microsoft.com/en-us/library/system.web.webpages.helperpage(v=vs.111).aspx</a>）っていうのは、WebPage を継承していて「Represents a base class for pages that is used when ASP.NET compiles a .cshtml or .vbhtml file and that exposes page-level and application-level properties and methods.」なんだそうな。</p><p>あと、WriteLiteralTo() はエスケープされず、 WriteTo() はエスケープされないようだ。これで、Razor で書いた HTML タグはそのまま、外から与えられた変数（@Session["flash"]）だけ無毒化される。ほへぇ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@functions
{
<span class="synType">public</span> <span class="synType">static</span> HtmlString Read()
{
<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] == <span class="synConstant">null</span>) <span class="synStatement">return</span> <span class="synConstant">null</span>;

var result = <span class="synStatement">new</span> HtmlString(
<span class="synType">string</span>.Format(
<span class="synSpecial">@</span><span class="synConstant">&quot;&lt;div class=&quot;&quot;message info&quot;&quot;&gt;&lt;p&gt;{0}&lt;/p&gt;&lt;/div&gt;&quot;</span>,
Session[<span class="synConstant">&quot;flash&quot;</span>]
)
);

Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>;

<span class="synStatement">return</span> result;
}
}
</pre><p>今までこんなの書いて「動いたヒャッハー！」とか思ってたけど、ただ HtmlString 型の戻り値を Razor が変数として処理してくれたいたから見かけ上ちゃんと動いていただけなんだな。</p><p>ちなみに、~/_AppCode で Hoge.cshtml を書くと、その内容は <code>namespace ASP { public class Hoge: HelperPage }</code> になる。 @functions にはそのクラスの実装になっているみたいだな。で、普通 @... {} 以外の部分はレンダリング（RenderBody()とか）されるときに変数が逐次解釈されながら TextWriter へ書き込まれるんだけど、 _AppCode はレンダリングで呼ばれることがないから書いても無駄。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/Flash.cs

<span class="synStatement">using</span> System.Web;
<span class="synStatement">using</span> System.Web.WebPages;

<span class="synType">namespace</span> ASP
{
<span class="synType">public</span> <span class="synType">class</span> Flash: HelperPage
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Write(<span class="synType">string</span> <span class="synStatement">value</span>)
{
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synStatement">value</span>;
}

<span class="synType">public</span> <span class="synType">static</span> HelperResult Read()
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(w =&gt;
{
<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] == <span class="synConstant">null</span>) <span class="synStatement">return</span>;

WriteLiteralTo(w, <span class="synConstant">&quot;&lt;div class=</span><span class="synSpecial">\&quot;</span><span class="synConstant">message info</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;p&gt;&quot;</span>);
WriteTo(w, Session[<span class="synConstant">&quot;flash&quot;</span>]);
WriteLiteralTo(w, <span class="synConstant">&quot;&lt;/p&gt;&lt;/div&gt;&quot;</span>);

Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>;
});
}
}
}
</pre><p>今回のヘルパーを cshtml ではなく cs で表現してみた。あっているかどうかイマイチ不安だけれども、ちゃんと動いてるみたい。</p><p>とりあえず、今のところはそういう理解にしておこう。 </p>
