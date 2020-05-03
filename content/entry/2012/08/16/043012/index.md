---
date: 2012-08-16T04:30:12.0000000
draft: false
title: "WebMatrix で Markdown を使おう！"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---

<blockquote>
<p><b>Markdown</b> は軽量マークアップ言語で、 テキストを HTML へ変換する記法および変換ツール（パーサー）を指します。 Markdown の記法は英文メールでよく利用されるテキスト装飾がヒントになっており、変換元テキストから変換したあとの HTML マークアップの見当がつけやすく、覚えるのが比較的容易です<a href="#f-731aff19" name="fn-731aff19" title="弱点は若干機能不足なこと。これを補う派生版が幾つかあります">*1</a>。最近では GitHub などで Wiki 記法として用いられることが多くなっているので、覚えておいて損はないです。</p>

</blockquote>
<p>この Markdown パーサーを「WebMatrix 2」で使ってみましょう（<b>所要時間5分</b>）。</p>

<div class="section">
<h3>準備</h3>
<p>まず、 Empty Site テンプレートから新規サイトを作成し<a href="#f-a24137a6" name="fn-a24137a6" title="簡便のため。好きなテンプレートを利用してもよい">*2</a>、適当にフォルダーを作って Markdown テキストのサンプルを配置します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816030739.png" alt="f:id:daruyanagi:20120816030739p:plain" title="f:id:daruyanagi:20120816030739p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回、サンプルは <a href="http://tkns.homelinux.net/modules/manual/ja/data/markdown-sample.text">http://tkns.homelinux.net/modules/manual/ja/data/markdown-sample.text</a> （テキスト形式、UTF-8エンコード）をお借りしました。ちなみに、 “.md” や “.markdown” といった拡張子<a href="#f-6c0192e4" name="fn-6c0192e4" title="べつにこれである必要はないが、 Markdown 書式のテキストであることを示すためにたびたび用いられる">*3</a>のファイルを「WebMatrix 2」で開くには、コンテキストメニューから［WebMatrix で開く］を選択します。</p><p>つぎに、パーサーをインストール。 NuGet で「MarkdownSharp」パッケージを選択しましょう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816031246.png" alt="f:id:daruyanagi:20120816031246p:plain" title="f:id:daruyanagi:20120816031246p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2012/02/12/213437">C# &#x306E; Markdown &#x30A8;&#x30F3;&#x30B8;&#x30F3; - &#x3060;&#x308B;&#x308D;&#x3050;</a> にはいくつかあるのですが、「MarkdownSharp」がもっとも無難だと思います。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816031256.png" alt="f:id:daruyanagi:20120816031256p:plain" title="f:id:daruyanagi:20120816031256p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストールはとっても簡単。勝手にレポジトリからダウンロード・セットアップされます。ほかのパッケージが必要であれば<a href="#f-0c9c2c17" name="fn-0c9c2c17" title="依存関係があるといいます">*4</a>、そのパッケージも自動でセットアップされます。パッケージは自分でも作れるので、やってみると面白いですネ。</p><p>これで準備は完了。</p>

</div>
<div class="section">
<h3>コーディング</h3>
<p>Default.cshtml を開いて、以下のように記述します。 Markdown テキストのサンプルへのパスは適当に環境に合わせて変えてください<a href="#f-e01fe3ef" name="fn-e01fe3ef" title="ほんとは App_Data フォルダに Markdown テキストを格納したかったのだけれど、なんかいろいろファイルが入っていてヤダ">*5</a>。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var markdown = <span class="synStatement">new</span> MarkdownSharp.Markdown();
var path = Server.MapPath(<span class="synConstant">&quot;~/App_Documents/Sample.markdown&quot;</span>);
var encoding = System.Text.Encoding.UTF8;
var text = System.IO.File.ReadAllText(path, encoding);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@Html.Raw(markdown.Transform(text)) &lt;!-- Add <span class="synStatement">this</span> ! --&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>これで終わり！　あとは［実行］ボタンを押せば Markdown テキストが HTML へ変換されて表示されるはずです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816032025.png" alt="f:id:daruyanagi:20120816032025p:plain" title="f:id:daruyanagi:20120816032025p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>new MarkdownSharp.Markdown() でパーサーのインスタンスを生成し、 Transform() で変換します。ただし、結果をそのまま利用しても HTML エンコードされた状態で表示されてしまう<a href="#f-52e7b3cd" name="fn-52e7b3cd" title="セキュリティ上の理由です">*6</a>ので、 Html.Raw() でそれを抑止します。 Server.MapPath() を利用すれば、ディスク上の物理パスを取得できます。ファイルを扱うときはよく利用するので覚えておくといいかも。あとは .NET Framework ではおなじみの処理ですね。</p><p>おしまい！</p>

</div>
<div class="section">
<h3>ステップアップ</h3>

<div class="section">
<h4>ルーティング</h4>
<p>これだけだと面白くないので、ルーティングを利用してみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Page.cshtml

@{
var markdown = <span class="synStatement">new</span> MarkdownSharp.Markdown();

var path = Server.MapPath(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}{1}.markdown&quot;</span>,
<span class="synConstant">&quot;~/App_Documents/&quot;</span>,
UrlData.Count == <span class="synConstant">0</span>
? <span class="synConstant">&quot;Default&quot;</span>
: <span class="synType">string</span>.Join(<span class="synConstant">&quot;/&quot;</span>, UrlData)
));

var encoding = System.Text.Encoding.UTF8;
var text = System.IO.File.ReadAllText(path, encoding);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@Html.Raw(markdown.Transform(text))
&lt;/body&gt;
&lt;/html&gt;
</pre><p>これで ~/Page/サンプル/Sample などというパスも扱えます。 ~/Page.cshtml で受け取った UrlData には  ["サンプル", "Sample"] という配列が格納されているので、それを適当に加工してください（<a href="https://blog.daruyanagi.jp/entry/2012/07/06/174414">WebMatrix &#x306E;&#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0; - &#x3060;&#x308B;&#x308D;&#x3050;</a> も参考にしてみてください）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816035052.png" alt="f:id:daruyanagi:20120816035052p:plain" title="f:id:daruyanagi:20120816035052p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

</div>
<div class="section">
<h4>もう少しキレイに</h4>
<p>ページを表示するごとに MarkdownSharp.Markdown を new したり、 @Html.Raw( markdown.Transform(text) ) を呼び出すのはあまりかっこうがよくない気がしますね。</p><p>そこで試しに、 ~/App_Code/Markdown.cs というコードを書いてみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.IO;
<span class="synStatement">using</span> System.Text;
<span class="synStatement">using</span> System.Web;

<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// Summary description for ClassName</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Markdown
{
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">readonly</span> MarkdownSharp.Markdown md =
<span class="synStatement">new</span> MarkdownSharp.Markdown();
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">readonly</span> Encoding encoding = Encoding.UTF8;

<span class="synType">public</span> <span class="synType">static</span> HtmlString Load(<span class="synType">string</span> path)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HtmlString(
md.Transform(
File.ReadAllText(path, encoding)
)
);
}
}
</pre><p>これで Page.cshtml がちょっとシンプルになりました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var path = Server.MapPath(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}/{1}.markdown&quot;</span>,
<span class="synConstant">&quot;~/App_Documents/&quot;</span>,
UrlData.Count == <span class="synConstant">0</span>
? <span class="synConstant">&quot;Default&quot;</span>
: <span class="synType">string</span>.Join(<span class="synConstant">&quot;/&quot;</span>, UrlData)
));
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@Markdown.Load(path)
&lt;/body&gt;
&lt;/html&gt;
</pre><p>HtmlString 型で返せば、ビューで @Html.Raw() が要りません。あとは、 Url Rewrite を使って /Page/ なしで利用できるようにするとか、 ファイルの作成日時から RSS を吐いてみるとか（キャッシュを使わないとエラいことになりそうですね！）まだまだ改善の余地がありそう。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn-731aff19" name="f-731aff19" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">弱点は若干機能不足なこと。これを補う派生版が幾つかあります</span></p>
<p class="footnote"><a href="#fn-a24137a6" name="f-a24137a6" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">簡便のため。好きなテンプレートを利用してもよい</span></p>
<p class="footnote"><a href="#fn-6c0192e4" name="f-6c0192e4" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">べつにこれである必要はないが、 Markdown 書式のテキストであることを示すためにたびたび用いられる</span></p>
<p class="footnote"><a href="#fn-0c9c2c17" name="f-0c9c2c17" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">依存関係があるといいます</span></p>
<p class="footnote"><a href="#fn-e01fe3ef" name="f-e01fe3ef" class="footnote-number">*5</a><span class="footnote-delimiter">:</span><span class="footnote-text">ほんとは App_Data フォルダに Markdown テキストを格納したかったのだけれど、なんかいろいろファイルが入っていてヤダ</span></p>
<p class="footnote"><a href="#fn-52e7b3cd" name="f-52e7b3cd" class="footnote-number">*6</a><span class="footnote-delimiter">:</span><span class="footnote-text">セキュリティ上の理由です</span></p>
</div>