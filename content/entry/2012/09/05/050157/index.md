---
date: 2012-09-05T05:01:57.0000000
draft: false
title: "ダミーイメージがもらえなくて激怒したので WebMatrix でスマートに解決してみたけど一部激怒した"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>Web サイトのデザインを考えるとき、ダミーイメージは欠かせないよね。少なくとも、自分はそう。そんな悩める怠惰な子ブタたちのために、 <a href="http://dummyimage.com">http://dummyimage.com</a> はある。</p><p><img src="20120905041606.png" alt="f:id:daruyanagi:20120905041606p:plain" title="f:id:daruyanagi:20120905041606p:plain" class="hatena-fotolife"></p><p>こいつはパラメータを与えて URL を投げるだけで、いろんなサイズ・色のダミーイメージをじぇねれいと<a href="#f1" name="fn1" title="クールに発音してくれよ？　じぇねりっと って感じやな">*1</a>してくれるクールなサービスなんだ。</p>

<div class="section">
<h3>もっとクールに</h3>
<p><img src="20120905041836.png" alt="f:id:daruyanagi:20120905041836p:plain" title="f:id:daruyanagi:20120905041836p:plain" class="hatena-fotolife"></p><p>でも、まさか WebMatrix を使っているおシャレさんのなかに、 &ltimg src="htt... だなんて毎度いちいち手入力してるヤツはいないよな。もちろん、ヘルパーにしておいて自動補完機能に入力させるハズだ。機械でできることを手でやるのはアホのすることだ<a href="#f2" name="fn2" title="おれです、ゴメンナサイゴメンナサイ">*2</a>。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#~/App_Code/DummyImage.cshtml

@helper GetHtml(<span class="synType">string</span> args, <span class="synType">object</span> attrs = <span class="synConstant">null</span>)
{
<span class="synStatement">if</span> (attrs != <span class="synConstant">null</span>)
{
attrs = <span class="synType">string</span>.Join(<span class="synConstant">&quot; &quot;</span>, attrs
.GetType()
.GetProperties()
.Select(_ =&gt; <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0}=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span>,
_.Name, _.GetValue(attrs)
)
)
);
}
&lt;img src=<span class="synConstant">&quot;http://www.dummyimage.com/@Html.Raw(@args)&quot;</span>
@Html.Raw(attrs) /&gt;
}
</pre><p>こうやっておけば、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@DummyImage.GetHtml(<span class="synConstant">&quot;640x16:9&quot;</span>)
</pre><p>と書くだけ<a href="#f3" name="fn3" title="実質的にはほとんど @ , dumm... , g, "640x16:9" と入力するだけ！">*3</a>で、実行時に</p>
<pre class="code lang-cs" data-lang="cs" data-unlink> &lt;img src=<span class="synConstant">&quot;http://www.dummyimage.com/640x16:9&quot;</span>  /&gt;
</pre><p>のような HTML コードへ展開される。画像タグに alt 属性をつけなければ瞬時に息絶える W3C 原理主義者や、 style を埋め込みたいなんていうわがままさんはこんな感じで書けばいい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@DummyImage.GetHtml(<span class="synConstant">300</span>,
<span class="synStatement">new</span> { alt = <span class="synConstant">&quot;Dummy image&quot;</span>, style = <span class="synConstant">&quot;border: 1px red solid;&quot;</span>})
</pre>
</div>
<div class="section">
<h3>激怒してみた</h3>
<p><img src="20120905043110.png" alt="f:id:daruyanagi:20120905043110p:plain" title="f:id:daruyanagi:20120905043110p:plain" class="hatena-fotolife"></p><p>けれど、世の中うまくいかないものだ。 Web ページを実行してもなかなか画像が表示されない。 dummyimage.com が重過ぎるんだ！（怒</p><p>でも、よく考えたらローカルの資源はありあまっているわけで……ダミー画像なんかむしろそっちで作るべきだよね。なんでも Web サービスに頼るのはよくないな。</p><p></p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#~/App_Code/DummyImage.cshtml

@<span class="synStatement">using</span> System.Drawing
@<span class="synStatement">using</span> System.Drawing.Drawing2D
@<span class="synStatement">using</span> System.Drawing.Imaging
@<span class="synStatement">using</span> System.Drawing.Text

@helper GetHtml(<span class="synType">float</span> width, <span class="synType">float</span> height = -<span class="synConstant">1</span>,
Font font = <span class="synConstant">null</span>,
Brush foreBrush = <span class="synConstant">null</span>, Brush backBrush = <span class="synConstant">null</span>,
<span class="synType">object</span> attrs = <span class="synConstant">null</span>)
{
<span class="synComment">// リフレクションで匿名オブジェクトを HTML 属性にするぜー</span>
<span class="synStatement">if</span> (attrs != <span class="synConstant">null</span>)
{
attrs = <span class="synType">string</span>.Join(<span class="synConstant">&quot; &quot;</span>, attrs
.GetType()
.GetProperties()
.Select(_ =&gt; <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0}=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span>,
_.Name, _.GetValue(attrs)
)
)
);
}

<span class="synComment">// 一応引数のチェック。負数ははじくか 16:9 に整形</span>
<span class="synStatement">if</span> (width &lt;= <span class="synConstant">0</span>)
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentException(<span class="synConstant">&quot;Width must be &gt; 0&quot;</span>);
}
height = height &gt; <span class="synConstant">0</span> ? height : width * <span class="synConstant">9</span> / <span class="synConstant">16</span>;

<span class="synComment">// ここから画像生成。さいごに BASE64 に変換してタグに埋め込む</span>
var image = <span class="synStatement">new</span> Bitmap((<span class="synType">int</span>)width, (<span class="synType">int</span>)height);
var base64 = <span class="synType">string</span>.Empty;

<span class="synStatement">using</span> (var g = Graphics.FromImage(image))
{
<span class="synComment">// おまえのパワー、あまってんだろ？　品質最高にしてやんぜー</span>
g.SmoothingMode = SmoothingMode.HighQuality;
g.PixelOffsetMode = PixelOffsetMode.HighQuality;
g.TextRenderingHint = TextRenderingHint.AntiAlias;

<span class="synComment">// 背景塗りつぶすぜー</span>
g.FillRectangle(
backBrush ?? Brushes.LightGray,
<span class="synConstant">0</span>, <span class="synConstant">0</span>, width, height);

<span class="synComment">// どまんなかにテキスト書くぜー</span>
var format = <span class="synStatement">new</span> StringFormat();
format.Alignment = StringAlignment.Center;
format.LineAlignment = StringAlignment.Center;

g.DrawString(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}×{1}&quot;</span>, image.Width, image.Height),
font ?? <span class="synStatement">new</span> Font(<span class="synConstant">&quot;Consolas&quot;</span>, <span class="synConstant">36</span>, FontStyle.Regular),
foreBrush ?? Brushes.Black,
<span class="synStatement">new</span> RectangleF(<span class="synConstant">0</span>, <span class="synConstant">0</span>, width, height),
format
);
}

<span class="synComment">// 画像バイナリをテキスト（BASE64）に変換するぜー</span>
<span class="synStatement">using</span> (var stream = <span class="synStatement">new</span> System.IO.MemoryStream())
{
image.Save(stream, ImageFormat.Png);
base64 = Convert.ToBase64String(stream.ToArray());
}

<span class="synComment">// HTML タグとして出力されるぜー</span>
&lt;img src=<span class="synConstant">&quot;data:image/png;base64,@Html.Raw(@base64)&quot;</span>
@Html.Raw(attrs) /&gt;
}
</pre><p><img src="20120905044715.png" alt="f:id:daruyanagi:20120905044715p:plain" title="f:id:daruyanagi:20120905044715p:plain" class="hatena-fotolife"></p><p>一見長いけど、やってることは FillRect() と DrawImage() 、BASE64 変換だけだよ。</p><p>みんな ImageMagick 好きだけど、わしは .NET Framework の方が慣れていていいや。なぜか動かなくて悩んだりせずに済むしな<a href="#f4" name="fn4" title="お前が使い方をわかってないだけや！">*4</a>。</p>

</div>
<div class="section">
<h3>おまけ激怒</h3>
<p><img src="20120905044930.png" alt="f:id:daruyanagi:20120905044930p:plain" title="f:id:daruyanagi:20120905044930p:plain" class="hatena-fotolife"></p><p>Razor の制限とはいえ…… using をネストしなければならないのは泣ける！（怒<br />
まぁ、あとで画像生成部分を @functions に切り出せばよいかな。</p><p>気が向いたらこいつは NuGet にしておきたいけれど、ダミーテキストを作るヘルパーもほしくなってきたね……なにかおもしろことできないかな。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">クールに発音してくれよ？　じぇねりっと って感じやな</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">おれです、ゴメンナサイゴメンナサイ</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">実質的にはほとんど @ , dumm... , g, "640x16:9" と入力するだけ！</span></p>
<p class="footnote"><a href="#fn4" name="f4" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">お前が使い方をわかってないだけや！</span></p>
</div>