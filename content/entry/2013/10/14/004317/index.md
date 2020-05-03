---
date: 2013-10-14T00:43:17.0000000
draft: false
title: "WebMatrix 3: Response.OutputStream"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 20131014003724.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014003724.png" alt="f:id:daruyanagi:20131014003724p:plain" title="f:id:daruyanagi:20131014003724p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>動的に画像を出力したい、という場合はこんな感じでいいのかな。以下は「~/Download/あほー」にアクセスると、「あほー」と描かれた画像を出力する例。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Drawing

@{
var text = UrlData[<span class="synConstant">0</span>] == <span class="synType">string</span>.Empty ? <span class="synConstant">&quot;Sample&quot;</span> : UrlData[<span class="synConstant">0</span>];

<span class="synStatement">try</span>
{
var bitmap = <span class="synStatement">new</span> Bitmap(<span class="synConstant">600</span>, <span class="synConstant">480</span>);

<span class="synStatement">using</span> (var g = Graphics.FromImage(bitmap)) {
<span class="synStatement">using</span> (var font = newFont(<span class="synConstant">&quot;Meiryo&quot;</span>, <span class="synConstant">24</span>))
{
var rect = <span class="synStatement">new</span> RectangleF(<span class="synConstant">0</span>, <span class="synConstant">0</span>, <span class="synConstant">600</span>, <span class="synConstant">480</span>);
var format = StringFormat.GenericDefault;
format.Alignment = StringAlignment.Center;
format.LineAlignment = StringAlignment.Center;

g.FillRectangle(
Brushes.CornflowerBlue,
rect
);

g.DrawString(
text, font,
Brushes.AntiqueWhite,
rect, format
);
} }

bitmap.Save(
Response.OutputStream,
Imaging.ImageFormat.Png
);

Response.ContentType = <span class="synConstant">&quot;image/png&quot;</span>;
Response.Flush();
Response.End();
}
<span class="synStatement">catch</span> (Exception e)
{
Response.ContentType = <span class="synConstant">&quot;text/plain&quot;</span>;
Response.Write(e);
Response.End();
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014003819.png" alt="f:id:daruyanagi:20131014003819p:plain" title="f:id:daruyanagi:20131014003819p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>関係ないけれど、Razor だと using 句の {} が省略できない（if などのほかの制御文でも同じ）なので、using 句を連続して使う場合はネストが深くなる。仕方ないけれど、気持ち悪い。</p>
<p>静的な画像を出力する場合。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synStatement">try</span>
{
var path = Server.MapPath(<span class="synSpecial">@</span><span class="synConstant">&quot;~/Images/image.jpg&quot;</span>);
var bitmap = <span class="synStatement">new</span> System.Drawing.Bitmap(path);

bitmap.Save(
Response.OutputStream,
System.Drawing.Imaging.ImageFormat.Png
);

Response.ContentType = <span class="synConstant">&quot;image/png&quot;</span>;
Response.Flush();
Response.End();
}
<span class="synStatement">catch</span> (Exception e)
{
Response.ContentType = <span class="synConstant">&quot;text/plain&quot;</span>;
Response.Write(e);
Response.End();
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014003954.png" alt="f:id:daruyanagi:20131014003954p:plain" title="f:id:daruyanagi:20131014003954p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>エラーを起こしてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014004024.png" alt="f:id:daruyanagi:20131014004024p:plain" title="f:id:daruyanagi:20131014004024p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<blockquote cite="http://wiz.came.ac/blog/2010/02/aspnet.html">
<p>実際に、Visual Studio でデバッグしてみてもちゃんと動作するので、安心してIIS 5.0に持って行ってみると、「GDI+で一般的なエラーが発生しました」というエラーを吐き出す。</p><p>いろいろと試してみたところ、MemoryStream に一度書き出してからOutputStreamへ送り込めば大丈夫。おそらく、原因は OutputStream がシークと読み取りを禁止している点。Image クラスの Save メソッド内で読み返しが行われているのか、CanSeek / CanReadをチェックしているのかは不明ですが、直接書き出すのは無理っぽい。</p>

<cite><a href="http://wiz.came.ac/blog/2010/02/aspnet.html">&#x300C;ASP.NET&#x3067;&#x52D5;&#x7684;&#x306B;&#x753B;&#x50CF;&#x3092;&#x4F5C;&#x308B;&#x300D;&#x3067;&#x30CF;&#x30DE;&#x3063;&#x305F; - &#x3046;&#x3043;&#x305A;&#x306E;&#x3072;&#x3068;&#x308A;&#x3054;&#x3068;</a></cite>
</blockquote>
<p>試してはないけど、こういうハマりどころもあるみたい。「気をつけねば」<a href="#f1" name="fn1" title="そもそも ASP.NET で GDI+ 使うのはあんまりよくないって聞いたこともある気がする">*1</a></p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">そもそも ASP.NET で GDI+ 使うのはあんまりよくないって聞いたこともある気がする</span></p>
</div>