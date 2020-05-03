---
date: 2012-08-19T13:06:06.0000000
draft: false
title: "WebMatrix でファイルのアップロード"
tags: ["ASP.net", "WebMatrix"]
eyecatch: 
---
<p><img src="20120819110408.png" alt="f:id:daruyanagi:20120819110408p:plain" title="f:id:daruyanagi:20120819110408p:plain" class="hatena-fotolife"></p><p>今日は「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2」でファイルのアップロードを試してみた。なお、このサンプルは「Empty Sites」テンプレートを元に作成している。</p>

<div class="section">
<h3>Delault.cshtml</h3>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">form</span><span class="synIdentifier"> </span><span class="synType">action</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Upload&quot;</span><span class="synIdentifier"> </span><span class="synType">method</span><span class="synIdentifier">=</span><span class="synConstant">&quot;post&quot;</span>
<span class="synIdentifier">              </span><span class="synType">enctype</span><span class="synIdentifier">=</span><span class="synConstant">&quot;multipart/form-data&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;file&quot;</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;upload&quot;</span><span class="synIdentifier"> /&gt;&lt;</span><span class="synStatement">br</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;submit&quot;</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;submit&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">form</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>拡張子を html にすれば、ただの HTML ドキュメントだね！　ファイルのアップロードを行うので、 multipart/form-data をつけるのを忘れないように。</p><p><img src="20120819110559.png" alt="f:id:daruyanagi:20120819110559p:plain" title="f:id:daruyanagi:20120819110559p:plain" class="hatena-fotolife"></p>

</div>
<div class="section">
<h3>Upload.cshtml</h3>
<p>アップロード処理を行う cshtml はこんな感じにしてみた。</p><p>ほんとは path が存在しなければ例外、 file のサイズが 0 ならば例外、 file が image/*** でなければ例外、といったチェックを入れるのだけれど、ソースが長くなるので割愛している。あと、最初から複数ファイルのアップデートに対応できるように記述している。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO

@functions {
<span class="synType"><a class="keyword" href="http://d.hatena.ne.jp/keyword/enum">enum</a></span> Result { Success, Error };
}

@{
var result = Result.Error;
var message = <span class="synConstant">&quot;You can use only POST method.&quot;</span>;
var link = <span class="synType">string</span>.Empty;

<span class="synStatement">if</span> (IsPost)
{
<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> Request.Files.AllKeys)
{
var file = Request.Files[key];

<span class="synStatement">try</span>
{
<span class="synType">const</span> <span class="synType">string</span> OUTPUT = <span class="synConstant">&quot;~/Files/&quot;</span>;
var path = Server.MapPath(OUTPUT);

var src = Path.GetFileName(file.FileName);
var dst = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0:yyyyMMdd-HHmmssfff}{1}&quot;</span>,
DateTime.Now, Path.GetExtension(src).ToLower()
);

file.SaveAs(Path.Combine(path, dst));

result = Result.Success;
message = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0} is uploaded as {1}.&quot;</span>,
src, dst
);
link = VirtualPathUtility.ToAbsolute(OUTPUT + dst);
}
<span class="synStatement">catch</span> (Exception e)
{
result = Result.Error;
message = e.Message;
}
}
}
}

&lt;h1&gt;@result&lt;/h1&gt;
&lt;p&gt;@message&lt;/p&gt;
<span class="synStatement">if</span> (!<span class="synType">string</span>.IsNullOrEmpty(link))
{
&lt;p&gt;&lt;img src=<span class="synConstant">&quot;@link&quot;</span> /&gt;&lt;/p&gt;
}
&lt;p&gt;&amp;raquo; Back to &lt;a href=<span class="synConstant">&quot;~/&quot;</span>&gt;home&lt;/a&gt;&lt;/p&gt;
</pre><p>基本的には、 Request.Files でファイルを取得し、 SaveAs() で保存するだけ。そのほかはファイル名の決定だのエラー処理だのといったことをしているに過ぎない。</p><p>Default.cshtml から画像ファイルを POST すると、</p><p><img src="20120819111843.png" alt="f:id:daruyanagi:20120819111843p:plain" title="f:id:daruyanagi:20120819111843p:plain" class="hatena-fotolife"></p><p>エラーが出たらこんな感じで……</p><p><img src="20120819111723.png" alt="f:id:daruyanagi:20120819111723p:plain" title="f:id:daruyanagi:20120819111723p:plain" class="hatena-fotolife"></p><p>成功したらこんな感じになる。</p><p><img src="20120819112043.png" alt="f:id:daruyanagi:20120819112043p:plain" title="f:id:daruyanagi:20120819112043p:plain" class="hatena-fotolife"></p><p>"~/Files/"フォルダが夢のようになっておるな！</p>

</div>
<div class="section">
<h3>ステップアップ</h3>

<div class="section">
<h4>ヘルパーで楽をしよ……ぅ？</h4>
<p><img src="20120819114311.png" alt="f:id:daruyanagi:20120819114311p:plain" title="f:id:daruyanagi:20120819114311p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Helpers Library という NuGet をインストールすると、複数ファイルのアップロードに対応した Form タグを簡単に生成できる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@FileUpload.GetHtml()
</pre><p>でも、個人的にはあんまり好きじゃなかったので今回は使わなかった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

@{
<span class="synStatement">if</span> (IsPost)
{
<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> Request.Files.AllKeys)
{
var file = Request.Files[key];

<span class="synStatement">try</span>
{
file.SaveAs(
System.IO.Path.Combine(
Server.MapPath(<span class="synConstant">&quot;~/Files/&quot;</span>),
file.FileName)
);
}
<span class="synStatement">catch</span> (Exception e)
{

}
}
}
}

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@FileUpload.GetHtml()
&lt;/body&gt;
&lt;/html&gt;
</pre><p><img src="20120819115634.png" alt="f:id:daruyanagi:20120819115634p:plain" title="f:id:daruyanagi:20120819115634p:plain" class="hatena-fotolife"></p><p>なんか動的に生成されるノードの名前がカブってるし<a href="#f1" name="fn1" title="JavaScriptの不具合かなぁ">*1</a>、あんまりよくわかんなかった。</p>

</div>
</div>
<div class="section">
<h3>ビューでつかう変数をまとめる</h3>
<p>Upload.cshtml の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9">ソースコード</a>がなんだか冗長なのは、HTML の出力に使う result、message、link という3つの変数を処理するためだけど、こいつらって<b>匿名クラス</b>でまとめてもいいよね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO

@functions { <span class="synType"><a class="keyword" href="http://d.hatena.ne.jp/keyword/enum">enum</a></span> Result { Success, Error }; }

@{
<span class="synType">const</span> <span class="synType">string</span> OUTPUT = <span class="synConstant">&quot;~/Files/&quot;</span>;
dynamic model = <span class="synConstant">null</span>;

<span class="synStatement">if</span> (IsPost)
{
<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> Request.Files.AllKeys)
{
var file = Request.Files[key];

<span class="synStatement">try</span>
{
var path = Server.MapPath(OUTPUT);

var src = Path.GetFileName(file.FileName);
var dst = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0:yyyyMMdd-HHmmssfff}{1}&quot;</span>,
DateTime.Now, Path.GetExtension(src).ToLower()
);

file.SaveAs(Path.Combine(path, dst));

model = <span class="synStatement">new</span> {
Result = Result.Success,
Message = <span class="synType">string</span>
.Format(<span class="synConstant">&quot;{0}'s uploaded as {1}&quot;</span>, src, dst),
Link = VirtualPathUtility
.ToAbsolute(OUTPUT + dst),
};
}
<span class="synStatement">catch</span> (Exception e)
{
model = <span class="synStatement">new</span> {
Result = Result.Error,
Message = e.Message,
Link = <span class="synType">string</span>.Empty,
};
}
}
}
<span class="synStatement">else</span>
{
model = <span class="synStatement">new</span> {
Result = Result.Error,
Message = <span class="synConstant">&quot;You can use only POST method&quot;</span>,
Link = <span class="synType">string</span>.Empty,
};
}
}

&lt;h1&gt;@model.Result&lt;/h1&gt;
&lt;p&gt;@model.Message&lt;/p&gt;
@<span class="synStatement">if</span> (!<span class="synType">string</span>.IsNullOrEmpty(model.Link))
{
&lt;p&gt;&lt;img src=<span class="synConstant">&quot;@model.Link&quot;</span> /&gt;&lt;/p&gt;
}
&lt;p&gt;&amp;raquo; Back to &lt;a href=<span class="synConstant">&quot;~/&quot;</span>&gt;home&lt;/a&gt;&lt;/p&gt;
</pre><p>記述量はかえって多くなったけど、「何かの処理 → 結果（モデル）の生成」という流れが明確になった気がする。この @model っていうのが MVVM の ViewModel じゃない ViewModel という理解でいいんでしょうか。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ajax">Ajax</a> には Json で応える</h3>
<p>ViewModel を返すことの利点は、可読性だけじゃない。たとえばこんなこともできる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">if</span> (IsAjax)
{
<span class="synComment">// Response.ContentType = &quot;application/json&quot;;</span>
Response.Write(Json.Encode(model));
}
<span class="synStatement">else</span>
{
&lt;h1&gt;@model.Result&lt;/h1&gt;
&lt;p&gt;@model.Message&lt;/p&gt;
<span class="synStatement">if</span> (!<span class="synType">string</span>.IsNullOrEmpty(model.Link))
{
&lt;p&gt;&lt;img src=<span class="synConstant">&quot;@model.Link&quot;</span> /&gt;&lt;/p&gt;
}
&lt;p&gt;&amp;raquo; Back to &lt;a href=<span class="synConstant">&quot;~/&quot;</span>&gt;home&lt;/a&gt;&lt;/p&gt;
}
</pre><p><img src="20120819125626.png" alt="f:id:daruyanagi:20120819125626p:plain" title="f:id:daruyanagi:20120819125626p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Ajax">Ajax</a> リクエストに Json で応えるなんてことも簡単にできる！</p>

</div>
<div class="section">
<h3>拡張メソッドのお時間です</h3>
<p>あとさ、これダサいよね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> Request.Files.AllKeys)
{
var file = Request.Files[key];
：
：
</pre><p>拡張メソッドを書いて、シンプルにしましょう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">foreach</span> (var file <span class="synStatement">in</span> Request.Files.ToEnumerable())
{
：
：
</pre><p>~/App_Code/HttpFileCollectionBaseExtension.cs を作成してこのように書いてみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> HttpFileCollectionBaseExtension
{
<span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;HttpPostedFileBase&gt; ToEnumerable(
<span class="synStatement">this</span> HttpFileCollectionBase target)
{
<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> target.AllKeys)
{
<span class="synStatement">yield</span> <span class="synStatement">return</span> target[key];
}
}
}
</pre>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a class="keyword" href="http://d.hatena.ne.jp/keyword/JavaScript">JavaScript</a>の不具合かなぁ</span></p>
</div>