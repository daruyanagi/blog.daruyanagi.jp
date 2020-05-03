---
date: 2013-04-17T08:15:01.0000000
draft: false
title: "WebMatrix 3: Markdown で GFM table をサポートする"
tags: ["WebMatrix", "Markdown"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130417080114.png" alt="f:id:daruyanagi:20130417080114p:plain" title="f:id:daruyanagi:20130417080114p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GFM（<a href="https://help.github.com/articles/github-flavored-markdown">Redirecting...</a>）には本家の Markdown にはない機能が結構盛り込まれているのですが、なかでもテーブルのサポートはぜひ真似したいところ。ちょっと頑張ってみました。</p>
<br />
<p>テーブルの仕様は <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Markdown Cheatsheet &middot; adam-p/markdown-here Wiki &middot; GitHub</a> を参考にしています。</p>

<div class="section">
<h3>方針</h3>
<p>Markdown エンジンは <a href="https://code.google.com/p/markdownsharp/">Google Code Archive - Long-term storage for Google Code Project Hosting.</a> を利用し、その前処理としてテーブル記法の部分を検知・処理しちゃいましょう。</p><p>今回は</p>

<ol>
<li>変換対象のテキストを段落（ブロック）へ分割</li>
<li>それぞれのブロックがテーブル記法かどうかを判定</li>
<li>ブロックをテーブルタグへ変換</li>
</ol><p>という三段階で処理してみました。</p>

</div>
<div class="section">
<h3>ブロックへの分割とテーブル記法かどうかの判定</h3>
<p>当該部分を抜き出してみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>text = text.GetParagraphs().Select(p =&gt;
{
<span class="synComment">// 段落の行を得る（行頭・行末の | は無視する）</span>
var lines = p.GetLines().Select(_ =&gt; _.Trim(<span class="synConstant">'|'</span>));

<span class="synComment">// 2 行以上もたない段落は table ではない</span>
<span class="synStatement">if</span> (lines.Count() &lt; <span class="synConstant">2</span>)
{
<span class="synStatement">return</span> p;
}

<span class="synComment">// 1 つ以上の同じ数の | がすべての行に含まれていない段落は table ではない</span>
var count = lines.First().Count(charactor =&gt; charactor == <span class="synConstant">'|'</span>);
<span class="synStatement">if</span> (count == <span class="synConstant">0</span> || lines.Skip(<span class="synConstant">1</span>).Any(line =&gt; line.Count(_ =&gt; _ == <span class="synConstant">'|'</span>) != count))
{
<span class="synStatement">return</span> p;
}

<span class="synStatement">return</span> <span class="synStatement">new</span> Table(p).ToString();
}
).Combine(<span class="synConstant">&quot;</span><span class="synSpecial">\r\n\r\n</span><span class="synConstant">&quot;</span>);
</pre><p>GetParagraphs() は string の拡張メソッドとして実装したもので、単に改行2つで分割しているだけです。GFM table では行頭・行末の“|”は飾りなのだそうで、ついでにとっておきます。</p><p>テーブルかどうかの判定はちょっと悩んだのですが、</p>

<ul>
<li>2行以上あって</li>
<li>行頭・行末以外の“|”の数が 0 ではなく、</li>
<li>なおかつ、すべての行で数が一致している</li>
</ul><p>ことを今回は条件としました。あってるかどうか自信はないのですが、ここはあとで実装を変えてもいいようにカプセル化しておけばよさそう。</p><p>Combine() は <a href="https://blog.daruyanagi.jp/entry/2012/08/28/081228">&#x5BC4;&#x308A;&#x9053;: string &#x30AF;&#x30E9;&#x30B9;&#x306E;&#x62E1;&#x5F35; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で書いた string の拡張メソッドです。</p>

</div>
<div class="section">
<h3>テーブルクラス</h3>
<p>テーブルタグへの変換はだいぶ面倒くさい感じだったので、簡単なクラスにしてみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Text.RegularExpressions;

<span class="synType">enum</span> CellAlignment {
Left,
Center,
Right,
}

<span class="synType">enum</span> CellMode {
Header,
Normal,
}

<span class="synType">class</span> Cell
{
<span class="synType">public</span> <span class="synType">string</span> Text { get; set; }
<span class="synType">public</span> CellAlignment Alignment { get; set; }
<span class="synType">public</span> CellMode Mode { get; set; }

<span class="synType">public</span> Cell(<span class="synType">string</span> text)
{
Text = text;
Alignment = CellAlignment.Left;
Mode = CellMode.Normal;
}

<span class="synType">public</span> <span class="synType">override</span> <span class="synType">string</span> ToString()
{
var align = Alignment.ToString().ToLower();
var text = Text; <span class="synComment">// new MarkdownSharp.Markdown().Transform(Text);</span>

<span class="synStatement">switch</span> (Mode)
{
<span class="synStatement">case</span> CellMode.Header:
<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;th align='{0}'&gt;{1}&lt;/th&gt;&quot;</span>, align, text);
<span class="synStatement">case</span> CellMode.Normal:
<span class="synStatement">default</span>:
<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;td align='{0}'&gt;{1}&lt;/td&gt;&quot;</span>, align, text);
}
}
}

<span class="synType">class</span> Table
{
<span class="synType">private</span> List&lt;List&lt;Cell&gt;&gt; table = <span class="synStatement">new</span> List&lt;List&lt;Cell&gt;&gt;();

<span class="synType">public</span> Table(<span class="synType">string</span> text)
{
<span class="synStatement">foreach</span> (var line <span class="synStatement">in</span> text.GetLines())
{
var row = line
.Split(<span class="synStatement">new</span> [] { <span class="synConstant">'|'</span>, }, StringSplitOptions.RemoveEmptyEntries)
.Select(_ =&gt; <span class="synStatement">new</span> Cell(_.Trim()))
.ToList();

table.Add(row);
}

<span class="synComment">// :--- や ---: に対応する気がなければ以下のコードは要らない</span>

<span class="synStatement">for</span> (var i = table.Count - <span class="synConstant">1</span>; i &gt; <span class="synConstant">0</span>; i--) <span class="synComment">// 下段から処理</span>
{
var row = table.ElementAt(i);
var first_cell = row.ElementAt(<span class="synConstant">0</span>);

<span class="synStatement">if</span> (first_cell.Text.IndexOf(<span class="synConstant">&quot;---&quot;</span>) &gt; -<span class="synConstant">1</span>)
{
table.ElementAt(i - <span class="synConstant">1</span>).ForEach(_ =&gt; _.Mode = CellMode.Header);

<span class="synStatement">for</span> (var j = <span class="synConstant">0</span>; j &lt; row.Count; j++)
{
var cell = row.ElementAt(j);

<span class="synStatement">if</span> (cell.Text.StartsWith(<span class="synConstant">&quot;:&quot;</span>) &amp;&amp; cell.Text.EndsWith(<span class="synConstant">&quot;:&quot;</span>))
{
table.ForEach(r =&gt; r.ElementAt(j).Alignment = CellAlignment.Center);
}
<span class="synStatement">else</span> <span class="synStatement">if</span> (cell.Text.StartsWith(<span class="synConstant">&quot;:&quot;</span>))
{
table.ForEach(r =&gt; r.ElementAt(j).Alignment = CellAlignment.Left);
}
<span class="synStatement">else</span> <span class="synStatement">if</span> (cell.Text.EndsWith(<span class="synConstant">&quot;:&quot;</span>))
{
table.ForEach(r =&gt; r.ElementAt(j).Alignment = CellAlignment.Right);
}
}

table.RemoveAt(i);
}
}
}

<span class="synType">public</span> <span class="synType">override</span> <span class="synType">string</span> ToString()
{
<span class="synStatement">return</span> <span class="synConstant">&quot;&lt;table&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>
+ table.Select(row =&gt;<span class="synConstant">&quot;&lt;tr&gt;&quot;</span> +
row.Select(cell =&gt; cell.ToString()).Combine() +
<span class="synConstant">&quot;&lt;/tr&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>).Combine()
+ <span class="synConstant">&quot;&lt;/table&gt;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>;
}
}

</pre><p>セパレーターとセルの右寄せ・中央寄せ・左寄せ記法への対応がなければ、コードはかなりシンプルだったのですけど。</p>
<pre class="code" data-lang="" data-unlink>| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |</pre><p>“---”のようなセパレーター列の上の列はヘッダー列として扱いたい。というわけで、素直に上から処理するのではなく、下段から処理。これで処理の終わった列を再参照する無駄が省ける。</p><p>右寄せ・中央寄せ・左寄せ記法をみつけたら、同じ行の Cell へアクセスして Alignment プロパティをセット。ForEach() 便利だなぁ。</p><p>というか、for 文は消せるはずなので、そっちの方向で今度書き直したい。</p>

</div>
<div class="section">
<h3>課題</h3>
<p>セル内の Markdown 記法が解釈されない。</p><p>これを直そうと思えば、自分で Markdown のパーサーを書いたほうが早いかなって気がする。何度もテキスト全体を正規表現でナメるのも効率よくないと思うし。</p><p>テキストの処理って基本なことだと思うけれど、自分は苦手だなぁ……なにかいい参考書ないかしら。</p>

</div>