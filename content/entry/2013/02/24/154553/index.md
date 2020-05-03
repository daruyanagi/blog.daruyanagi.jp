---
date: 2013-02-24T15:45:53.0000000
draft: false
title: "WebMatrix 2: Markdown を汎用的に拡張する仕組みを考えてみる"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>Markdown は覚えやすくて書きやすいのだけれど、とても非力に感じる。一応 HTML タグの埋め込みも可能なので、原理的にはなんでも書けるのだけれど、たとえばルビを振りたい場合、</p>
<pre class="code lang-html" data-lang="html" data-unlink>国民の<span class="synIdentifier">&lt;</span>ruby<span class="synIdentifier">&gt;</span>税金<span class="synIdentifier">&lt;</span>rp<span class="synIdentifier">&gt;</span>(<span class="synIdentifier">&lt;/</span>rp<span class="synIdentifier">&gt;&lt;</span>rt<span class="synIdentifier">&gt;</span>ぜいきん<span class="synIdentifier">&lt;/</span>rt<span class="synIdentifier">&gt;&lt;</span>rp<span class="synIdentifier">&gt;</span>)<span class="synIdentifier">&lt;/</span>rp<span class="synIdentifier">&gt;&lt;/</span>ruby<span class="synIdentifier">&gt;</span>を２億円使うなんて
</pre><p>などといちいち書くのは、読みにくいし第一めんどくさい。もっと簡単に、たとえば、</p>
<pre class="code lang-html" data-lang="html" data-unlink>国民の[[ruby|税金|ぜいきん]]を２億円使うなんて
</pre><p>などのような、<code>[[コマンド|引数1|引数2...]] </code>といった記法で書ければどうだろう。なるべく規約ベースとし、Hoge コマンドは Hoge / HogeHelper ヘルパーの GetHtml() メソッドを呼び出すようにする。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># App_Code/RubyHelper.cshtml

@helper GetHtml(<span class="synType">string</span> text, <span class="synType">string</span> ruby){
&lt;ruby&gt;@text&lt;rp&gt;(&lt;/rp&gt;&lt;rt&gt;@ruby&lt;/rt&gt;&lt;rp&gt;)&lt;/rp&gt;&lt;/ruby&gt;
}
</pre><p>これならば、Markdown の拡張だけでなく、普通の cshtml でも利用できてよいと思う。</p>
<pre class="code lang-html" data-lang="html" data-unlink>国民の@RubyHelper.GetHtml(&quot;税金&quot;, &quot;ぜいきん&quot;)を２億円使うなんて
</pre>
<div class="section">
<h3>実装</h3>
<p>とりあえずこんな感じにしてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.Reflection
@<span class="synStatement">using</span> System.Text.RegularExpressions

@functions {
<span class="synType">private</span> <span class="synType">string</span> Camelize(<span class="synType">string</span> input)
{
<span class="synStatement">if</span> (input.Length == <span class="synConstant">0</span>) <span class="synStatement">return</span> input;

var chars = input.ToArray();
chars[<span class="synConstant">0</span>] = <span class="synType">char</span>.ToUpper(chars[<span class="synConstant">0</span>]);
<span class="synStatement">return</span> <span class="synType">string</span>.Join(<span class="synType">string</span>.Empty, chars);
}
}

@{
<span class="synComment">// テストテキストをロード</span>
var text = File.ReadAllText(Server.MapPath(<span class="synConstant">&quot;~/Test.txt&quot;</span>));

<span class="synComment">// HtmlHelper の子孫を列挙して型名-型ディクショナリを作成</span>
var type_table = AppDomain.CurrentDomain
.GetAssemblies()
.SelectMany(_ =&gt; _.GetTypes())
.Where(_ =&gt; _.IsSubclassOf(<span class="synStatement">typeof</span>(HelperPage)))
.ToDictionary(_ =&gt; _.ToString(), _ =&gt; _);

<span class="synComment">// [[...]] 構文を置換</span>
var regex = <span class="synStatement">new</span> Regex(<span class="synSpecial">@</span><span class="synConstant">&quot;\[\[(?&lt;params&gt;[^\[\]\r\n]*)\]\]&quot;</span>);
text = regex.Replace(text, (MatchEvaluator)((match) =&gt;
{
<span class="synComment">// [[...]]構文の書式</span>
<span class="synComment">// - [[コマンド|引数1|引数2|...]]</span>
<span class="synComment">// - [[引数1|引数2|引数3...]] : Link コマンドと解釈（規定）</span>
var p = match.Groups[<span class="synConstant">&quot;params&quot;</span>].Value.Split(<span class="synConstant">'|'</span>);

<span class="synComment">// コマンド名は Hoge, HogeHelper ... を許容</span>
var helper_table = <span class="synStatement">new</span> <span class="synType">string</span>[] {
<span class="synType">string</span>.Format(<span class="synConstant">&quot;ASP.{0}&quot;</span>, Camelize(p[<span class="synConstant">0</span>])),
<span class="synType">string</span>.Format(<span class="synConstant">&quot;ASP.{0}Helper&quot;</span>, Camelize(p[<span class="synConstant">0</span>])),
};

Type helper = <span class="synConstant">null</span>;
MethodInfo method = <span class="synConstant">null</span>;
<span class="synType">string</span>[] args = <span class="synConstant">null</span>;

<span class="synComment">// 型名-型ディクショナリから、メソッド</span>
<span class="synComment">// (Type: p[0]).GetHtml(p[1], p[2]...) </span>
<span class="synComment">// をもつ HtmlHelper を探す</span>
var result = helper_table.FirstOrDefault(name =&gt;
{
<span class="synStatement">if</span> (type_table.TryGetValue(name, <span class="synStatement">out</span> helper))
{
args = p.Skip(<span class="synConstant">1</span>).ToArray();
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}
<span class="synStatement">return</span> method != <span class="synConstant">null</span>;
});

<span class="synComment">// 見つからなかった場合は、既定の型・メソッドを利用する</span>
<span class="synStatement">if</span> (<span class="synType">string</span>.IsNullOrEmpty(result))
{
helper = <span class="synStatement">typeof</span>(LinkHelper);
args = p;
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}

<span class="synComment">// メソッドを実行</span>
<span class="synStatement">return</span> (method.Invoke(helper, args) <span class="synStatement">as</span> HelperResult)
.ToHtmlString().ToString().Trim();
}
));

var m = <span class="synStatement">new</span> MarkdownSharp.Markdown();
text = m.Transform(text);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta http-equiv=<span class="synConstant">&quot;Content-Type&quot;</span> content=<span class="synConstant">&quot;text/html; charset=utf-8&quot;</span>/&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;
&lt;/head&gt;
&lt;body&gt;
@Html.Raw(text)
&lt;/body&gt;
&lt;/html&gt;
</pre><p>当初、型名->型 を解決するには Type.GetType() でいけると思っていたのだけど、引数として渡す型名には<b>アセンブリ名やバージョンを含めた完全修飾名</b>が必要みたい。つまり</p>
<pre class="code" data-lang="" data-unlink>var _type = Type.GetType(&#34;ASP.RubyHelper&#34;);</pre><p>ではだめで、</p>
<pre class="code" data-lang="" data-unlink>var _type = Type.GetType(&#34;ASP.RubyHelper, ***, Version=1.0.0.0, Culture=neutral, PublicKeyToken=****&#34;);</pre><p>みたいな感じじゃないとダメらしい。ASP.NET の仕組みはイマイチわかっていないのだけれど、裏でコードをコンパイルして、それを実行してるのだと思う。そのアセンブリ名なんて、実行時にはわかんないよね？</p><p>しょうがないので、今回は AppDomain にある HelperPage 派生クラス（ヘルパー）を列挙してディクショナリを用意し、型名->型 を解決する方法をとった。ヘルパーに限定したのは、全部突っ込もうとするとキーとなる型名の衝突があって、ToDictionary() が失敗するから。</p><p>コマンドを規約通りに検索してみつからない場合は、LinkHelper というリンク生成のためのヘルパーを既定のヘルパーとして呼んでいる。内容はごく簡単なもの。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@helper GetHtml(<span class="synType">string</span> url)
{
&lt;a href=<span class="synConstant">&quot;@url&quot;</span>&gt;@url&lt;/a&gt;
}

@helper GetHtml(<span class="synType">string</span> url, <span class="synType">string</span> title)
{
&lt;a href=<span class="synConstant">&quot;@url&quot;</span> title=<span class="synConstant">&quot;@title&quot;</span>&gt;@title&lt;/a&gt;
}
</pre><p>ちなみに、Camelize() は簡易実装なのでみないふりしてほしい（<a href="https://blog.daruyanagi.jp/entry/2012/08/28/081228">&#x5BC4;&#x308A;&#x9053;: string &#x30AF;&#x30E9;&#x30B9;&#x306E;&#x62E1;&#x5F35; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）。あと、エラーチェックがぬるい。たとえば、引数の数をわざと多くするとエラーになる。</p>

</div>
<div class="section">
<h3>実験</h3>
<p>とりあえず手元ではだいたい動いたので、試しに NuGet から適当なヘルパーを取得して、それを Markdown から呼び出せるかやってみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130224152749.png" alt="f:id:daruyanagi:20130224152749p:plain" title="f:id:daruyanagi:20130224152749p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>QRCode ヘルパーは、その名もズバリ、QRCode が生成できるヘルパー。このヘルパーは</p>
<pre class="code" data-lang="" data-unlink>@QRCode.Render(&#34;http://daruyanagi.net/&#34;)</pre><p>という感じで呼び出すので、残念ながらそのままでは使えない。App_Code/QRCodeHelper.cshtml という補助ヘルパーを別途用意した（NuGet で取得したコードにはあまり手を入れたくないので）。</p>
<pre class="code" data-lang="" data-unlink>@helper GetHtml(string data){
&lt;img src=&#34;@Href(&#34;~/QRCodeImage.cshtml&#34;, new{data, scale = 3})&#34; alt=&#34;@data&#34; /&gt;
}</pre><p>あとは、<code>[[QRCode|http://daruyanagi.net/]]</code>という記法を Markdown に埋め込むと……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130224153033.png" alt="f:id:daruyanagi:20130224153033p:plain" title="f:id:daruyanagi:20130224153033p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こんな感じになる。GetHtml() メソッドをもつヘルパーだったら、無加工でそのまま利用できる！</p>

</div>