---
date: 2013-05-20T08:22:23.0000000
draft: false
title: "Graphics.FillRectangle()　が正常に機能しない → 俺が間違ってました"
tags: [".NET Framework"]
eyecatch: 
---

<div class="section">
<h3>問題編</h3>
<p>たったこれだけのコードが動かなくて、泣いた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> (var fore = <span class="synStatement">new</span> Bitmap(icon_path))
<span class="synStatement">using</span> (var back = <span class="synStatement">new</span> Bitmap(fore.Width, fore.Height))
<span class="synStatement">using</span> (var brush = <span class="synStatement">new</span> SolidBrush (color))
<span class="synStatement">using</span> (var g = Graphics.FromImage(back))
{
var src_rect = <span class="synStatement">new</span> RectangleF(
<span class="synConstant">0</span>, <span class="synConstant">0</span>, back.Width, back.Height);
var dst_rect = <span class="synStatement">new</span> RectangleF(
x, y, back.Width * scale, back.Height * scale);

g.FillRectangle(brush, src_rect); <span class="synComment">// &lt;- 透明になる！！</span>
g.DrawImage(fore, dst_rect);
}
</pre>
</div>
<div class="section">
<h3>ヒント</h3>
<p>new SolidBrush (color) を Brushes.Red なんかにするとちゃんと動く（背景色が赤色になる）んだが……なにがおかしいんだ！</p>

</div>

<div class="section">
<h3>解決編</h3>
<p>Color.FromArgb() の使い方が間違ってた（← 出題範囲外ですまん！！）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>color = Color.FromArgb(
<span class="synType">int</span>.Parse(
color_code.ToLower(),
System.Globalization.NumberStyles.HexNumber
)
);
</pre>
<blockquote cite="http://msdn.microsoft.com/ja-jp/library/2zys7833(v=vs.80).aspx">
<p>32 ビットの ARGB 値のバイト順は AARRGGBB です。AA で表している最上位バイト (MSB) はアルファ コンポーネントの値です。RR、GG、BB で表している 2 番目、3 番目、4 番目のバイトは、それぞれ赤、緑、青のカラー コンポーネントです。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/2zys7833(v=vs.80).aspx">Color.FromArgb Method (System.Drawing) | Microsoft Docs</a></cite>
</blockquote>
<p>color_code が RRGGBB だったので、それをそのまま int にパースして渡すと、アルファ値が“00”、つまり透明になる。直し方はいろいろあるだろうけど、今回は適当に以下のように修正。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>color = Color.FromArgb(
<span class="synType">int</span>.Parse(
<span class="synConstant">&quot;ff&quot;</span> + color_code.ToLower(),
System.Globalization.NumberStyles.HexNumber
)
);
</pre><p>ちゃんと Color.From<b>A</b>rgb() って書いてあるのに！！（恥</p><p>そうやって、苦しみながらコレ（<a href="https://blog.daruyanagi.jp/entry/2013/05/20/080741">&#x30D7;&#x30ED;&#x751F;&#x3061;&#x3083;&#x3093;&#x30A2;&#x30A4;&#x30B3;&#x30F3;&#x30B8;&#x30A7;&#x30CD;&#x30EC;&#x30FC;&#x30BF;&#x30FC; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）を作りました。</p>

</div>