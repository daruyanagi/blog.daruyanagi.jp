---
date: 2012-08-20T02:03:55.0000000
draft: false
title: "WebMatrix でファイルのアップロード（2）"
tags: ["ASP.net MVC 3", "WebMatrix"]
eyecatch: 
---
<p>まずはお詫びを。</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/19/130606">
<p>あと、最初から複数ファイルのアップデートに対応できるように記述している。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/19/130606">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9; - &#x3060;&#x308B;&#x308D;&#x3050;</a><a href="https://blog.daruyanagi.jp/entry/2012/08/19/130606">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>あれはウソだ。</p><p>いや、複数ファイルのアップロード自体はできるのだけれど、結果を返す処理が単体ファイルを前提としていたので最後のファイルの結果しか得られない。正しくは、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var model = <span class="synStatement">new</span> List&lt;dynamic&gt;();
</pre><p>とでもして、複数のファイルの結果を格納できるようにすべきだった。</p><p>さてはて。</p><p>このように Upload.cshtml はめでたく複数ファイルのアップロードに対応できたし、 Ajax には Json で応答するようにもなった。ならば、ドラッグ＆ドロップで複数ファイルのアップロードもしてみたいよね。というわけでやってみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014053.png" alt="f:id:daruyanagi:20120820014053p:plain" title="f:id:daruyanagi:20120820014053p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>初期状態。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014058.png" alt="f:id:daruyanagi:20120820014058p:plain" title="f:id:daruyanagi:20120820014058p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ファイルをドラッグ＆ドロップ。これにはもちろん、 Drag & Drop の API を利用する。</p><p>画像のプレビューは HTML5 の File Reader API を利用して実装してある。JavaScript は見よう見まねで書いてみたけれどなかなか難しい……けれど、 cshtml ならば自動補完機能の恩恵をうけることができるのでまだマシ。jQuery だと</p>
<pre class="code" data-lang="" data-unlink>$.event.props.push(&#39;dataTransfer&#39;);</pre><p>という呪文を唱えないと動かないのを知らなくて、かなり悩んだ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014101.png" alt="f:id:daruyanagi:20120820014101p:plain" title="f:id:daruyanagi:20120820014101p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Ajax でファイルを Upload.cshtml へ送ると、画面遷移なしで結果が表示される。これには FormData という仕組みを利用した。</p><p>まぁ、ここで JavaScript の話をする気はないので本題に入るけど、これ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820014842.png" alt="f:id:daruyanagi:20120820014842p:plain" title="f:id:daruyanagi:20120820014842p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>デカいファイルをアップロードしようとすると発生するのだけれど、この例外をトラップするのが面倒……。無理やり頑張ってトラップしてみたのだけれど、 try 文がやたらネストするし、 Request に少しでもアクセスしようものなら発生するので IsAjax が取れずに少し困っている<a href="#f-b7512c63" name="fn-b7512c63" title="例外自体は IIS のリクエストのサイズ制限を緩和すれば抑制できるはず">*1</a>。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Upload.cs

@<span class="synStatement">using</span> System.IO

@functions
{
<span class="synType">private</span> <span class="synType">enum</span> Result
{
Success = <span class="synConstant">0</span>,
Error   = -<span class="synConstant">1</span>,
};

<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> OUTPUT_DIR = <span class="synConstant">&quot;~/Files/&quot;</span>;
<span class="synType">private</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt; AllowedFileType = <span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;();

<span class="synType">private</span> <span class="synType">void</span> VerifyOutputDir(<span class="synType">string</span> path)
{
<span class="synStatement">if</span> (!Directory.Exists(path))
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> DirectoryNotFoundException(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0} does not exists.&quot;</span>, path)
);
}
}

<span class="synType">private</span> <span class="synType">void</span> VerifyPostedFile(HttpPostedFileBase file)
{
<span class="synStatement">if</span> (file.ContentLength == <span class="synConstant">0</span>)
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentException(<span class="synConstant">&quot;File is null.&quot;</span>);
}

<span class="synStatement">if</span> (!AllowedFileType.ContainsKey(file.ContentType))
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentException(
<span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0} is not allowed format&quot;</span>,
file.ContentType
)
);
}
}

<span class="synType">private</span> <span class="synType">string</span> GetOutputFilename(HttpPostedFileBase file)
{
<span class="synStatement">return</span> <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0:yyyyMMdd-HHmmssfff}.{1}&quot;</span>,
DateTime.Now,
AllowedFileType[file.ContentType].ToLower()
);
}
}

@{
var model = <span class="synStatement">new</span> List&lt;dynamic&gt;();

AllowedFileType.Add(<span class="synConstant">&quot;image/jpeg&quot;</span>, <span class="synConstant">&quot;jpg&quot;</span>);
AllowedFileType.Add(<span class="synConstant">&quot;image/png&quot;</span> , <span class="synConstant">&quot;png&quot;</span>);
AllowedFileType.Add(<span class="synConstant">&quot;image/gif&quot;</span> , <span class="synConstant">&quot;gif&quot;</span>);

var dir = Server.MapPath(OUTPUT_DIR);

<span class="synStatement">try</span>
{
<span class="synStatement">if</span> (IsPost) <span class="synComment">// &lt;-- ここでもエラーが発生しうるので try…catcgh せざるを得ない</span>
{
<span class="synStatement">foreach</span> (var file <span class="synStatement">in</span> Request.Files.ToEnumerable())
{
<span class="synStatement">try</span>
{
VerifyOutputDir(dir);
VerifyPostedFile(file);

var src = Path.GetFileName(file.FileName);
var dst = GetOutputFilename(file);

file.SaveAs(Path.Combine(dir, dst));

model.Add( <span class="synStatement">new</span> {
Result = Result.Success,
Message = <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0} is uploaded as {1}.&quot;</span>, src, dst),
Link = VirtualPathUtility.ToAbsolute(Path.Combine(OUTPUT_DIR, dst)),
});
}
<span class="synStatement">catch</span> (Exception e)
{
model.Add(<span class="synStatement">new</span>
{
Result = Result.Error,
Message = e.Message,
Link = <span class="synType">string</span>.Empty,
});
}
}
}
<span class="synStatement">else</span>
{
model.Add (<span class="synStatement">new</span> {
Result = Result.Error,
Message = <span class="synConstant">&quot;You can use only POST method.&quot;</span>,
Link = <span class="synType">string</span>.Empty,
});
}

<span class="synStatement">if</span> (IsAjax)
{
Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(Json.Encode(model));
<span class="synStatement">return</span>;
}
}
<span class="synStatement">catch</span> (Exception e)
{
model.Add( <span class="synStatement">new</span> {
Result = Result.Error,
Message = e.Message,
Link = <span class="synType">string</span>.Empty,
});

Response.ContentType = <span class="synConstant">&quot;application/json&quot;</span>;
Response.Write(Json.Encode(model));
<span class="synStatement">return</span>; <span class="synComment">// &lt;-- IsAjax が使えない（エラーが起こりうる）ので出力先を分岐できない</span>
}
}

&lt;h1&gt;Uploading Result&lt;/h1&gt;

@<span class="synStatement">foreach</span> (var item <span class="synStatement">in</span> model)
{
&lt;h2&gt;@item.Result&lt;/h2&gt;
&lt;p&gt;@item.Message&lt;/p&gt;
<span class="synStatement">if</span> (!<span class="synType">string</span>.IsNullOrEmpty(item.Link))
{
&lt;p&gt;&lt;img src=<span class="synConstant">&quot;@item.Link&quot;</span> /&gt;&lt;/p&gt;
}
}

&lt;p&gt;&amp;raquo; Back to &lt;a href=<span class="synConstant">&quot;~/&quot;</span>&gt;home&lt;/a&gt;&lt;/p&gt;
</pre><p>とりあえず動くけど、ブラウザーからアクセスした時にリクエストサイズ超過のエラーが出てもそれをユーザーに知らせることができない（Json で返せるのみ）。やっぱりこういうのは Json のみを返す API として作って、ビューは完全に分離したほうがいいなと思った。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-b7512c63" name="f-b7512c63" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">例外自体は IIS のリクエストのサイズ制限を緩和すれば抑制できるはず</span></p>
</div>