---
date: 2012-10-17T22:45:55.0000000
draft: false
title: "WebMatrix で PDF を出力"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---

<blockquote cite="http://84zume.wordpress.com/2012/10/17/asp-net-mvc-razorpdf/">
<p>RazorPDFはASP.NET MVCのRazor ViewEngineを利用してPDFファイルを出力します。<br />
ViewにはiTextXMLというXMLをPDFに変換するライブラリーを使用します。<br />
もともとSparkというViewEngineにあった機能を移植したものになります。<br />
ぱっと探してみましたけど、ソースコードがどうやら公開されていないですね。</p>

<cite><a href="http://84zume.wordpress.com/2012/10/17/asp-net-mvc-razorpdf/">ASP.NET MVC&#x3067;PDF&#x3092;&#x51FA;&#x529B;&#x3059;&#x308B;&#xFF08;RazorPDF&#xFF09; &laquo; 84zume Works</a></cite>
</blockquote>
<p>Razor と XML の組み合わせで PDF ドキュメントを出力できる。素敵だなぁ。ASP.NET MVC 向けなので、WebMatrix（ASP.NET Web Page）ではちょっと使えなさそうなのが残念だけど。</p><p>でも、PDF を吐くだけだったら WebMatrix でもできるよ！（対抗意識</p><p>調べてみると、「iTextSharp」というライブラリを使えばよさそう。ラッキーなことに NuGet も用意されていて、ライブラリのインストール自体は簡単。</p><p><img src="20121017222440.png" alt="f:id:daruyanagi:20121017222440p:plain" title="f:id:daruyanagi:20121017222440p:plain" class="hatena-fotolife"></p><p>いつも通り、ASP.NET の「空のサイト」テンプレートでごにょごにょとサンプルを書いてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Default.cshtml

@<span class="synStatement">using</span> iTextSharp.text
@<span class="synStatement">using</span> iTextSharp.text.pdf

@{
<span class="synComment">// ドキュメントを作成</span>
Document doc = <span class="synStatement">new</span> Document();

<span class="synComment">// 作成したドキュメントと Response.OutputStream を</span>
<span class="synComment">// 結び付ける Writer オブジェクトを取得</span>
PdfWriter.GetInstance(doc, Response.OutputStream);

<span class="synComment">// 開け、ゴマ！</span>
doc.Open();

<span class="synComment">// あとは、チャプターを追加してみたり……</span>
var p1 = <span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;Chapter 1. Hello, PDF&quot;</span>)
{
SpacingBefore = <span class="synConstant">20</span>,
SpacingAfter = <span class="synConstant">20</span>,
};

var chapter = <span class="synStatement">new</span> Chapter(p1, <span class="synConstant">0</span>)
{
NumberDepth = <span class="synConstant">0</span>,
Indentation = <span class="synConstant">16</span>,
};

chapter.Add(
<span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;This is first paragraph.&quot;</span>.Times(<span class="synConstant">20</span>))
);

<span class="synComment">// セクションを追加してみたり……</span>
{
var p2 = <span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;Section 1. iText Sharp is GREAT!&quot;</span>)
{
SpacingBefore = <span class="synConstant">20</span>,
SpacingAfter = <span class="synConstant">20</span>,
};

var section = chapter.AddSection(p2, <span class="synConstant">0</span>);
section.Indentation = <span class="synConstant">16</span>;

section.Add(
<span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;This is second paragraph.&quot;</span>.Times(<span class="synConstant">20</span>))
);
}
doc.Add(chapter);

<span class="synComment">// パラグラフを追加してみたり……</span>
doc.Add(<span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;Hello iTextSharp&quot;</span>)
{
SpacingBefore = <span class="synConstant">20</span>,
SpacingAfter = <span class="synConstant">20</span>,
}
);

<span class="synComment">// 日本語フォントを用意</span>
var base_font = BaseFont.CreateFont(
<span class="synSpecial">@</span><span class="synConstant">&quot;c:\windows\fonts\msmincho.ttc,0&quot;</span>,
BaseFont.IDENTITY_H, <span class="synConstant">true</span>
);
var font = <span class="synStatement">new</span> Font(base_font, <span class="synConstant">16</span>);

doc.Add(
<span class="synStatement">new</span> Paragraph(<span class="synConstant">&quot;日本語はどうかな&quot;</span>, font)
{
SpacingBefore = <span class="synConstant">20</span>,
SpacingAfter = <span class="synConstant">20</span>,
}
);

<span class="synComment">// ほかにも、リストとかテーブルが作れる</span>
var list = <span class="synStatement">new</span> List(<span class="synConstant">true</span>, <span class="synConstant">10</span>)
{
IndentationLeft = <span class="synConstant">20</span>,
};

list.Add(<span class="synStatement">new</span> ListItem(<span class="synConstant">&quot;あいうえお&quot;</span>.Times(<span class="synConstant">10</span>), font));
list.Add(<span class="synStatement">new</span> ListItem(<span class="synConstant">&quot;さしすせそ&quot;</span>.Times(<span class="synConstant">10</span>), font));

doc.Add(list);

doc.Close(); <span class="synComment">// &lt;- 便所の扉と一緒。開けたら閉める！</span>

Response.ContentType = <span class="synConstant">&quot;application/pdf&quot;</span>;
}
</pre><p><img src="20121017223840.png" alt="f:id:daruyanagi:20121017223840p:plain" title="f:id:daruyanagi:20121017223840p:plain" class="hatena-fotolife"></p><p>できてるみたい。有志によるリファレンス <a href="http://www.vector.co.jp/soft/winnt/writing/se462217.html">iTextSharp &#x30AF;&#x30E9;&#x30B9;&#x30E9;&#x30A4;&#x30D6;&#x30E9;&#x30EA;&#x30EA;&#x30D5;&#x30A1;&#x30EC;&#x30F3;&#x30B9;&#x306E;&#x8A73;&#x7D30;&#x60C5;&#x5831; : Vector &#x30BD;&#x30D5;&#x30C8;&#x3092;&#x63A2;&#x3059;&#xFF01;</a> は必須だなぁ。こういうのがあると、ほんとありがたいよ。</p>

<div class="section">
<h3>追記</h3>
<p>書き忘れたけど、サンプルテキストのコピペでコードが長くなるのが嫌だったので、ちょっとした拡張メソッドを作って使っている。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> StringExtension
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Times(
<span class="synStatement">this</span> <span class="synType">string</span> target, <span class="synType">int</span> times)
{
<span class="synType">string</span> result = <span class="synType">string</span>.Empty;

<span class="synStatement">for</span> (<span class="synType">int</span> i = <span class="synConstant">0</span>; i &lt; times; i++)
result += target.ToString();

<span class="synStatement">return</span> result;
}
}
</pre><p>"a".Times(3) で "aaa" になればうれしい。</p>

</div>