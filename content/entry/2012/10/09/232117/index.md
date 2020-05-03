---
date: 2012-10-09T23:21:17.0000000
draft: false
title: "WebMatrix/ASP.NET Web Pages で Jekyll っぽいものを"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://github.com/mojombo/jekyll">GitHub - jekyll/jekyll: Jekyll is a blog-aware static site generator in Ruby</a> というのは、Markdown ドキュメントを置いておくとそれを HTML に変換しておいてくれる静的コンテンツの生成システムらしい。</p><p>Jekyll ドキュメントはこんなかんじ。</p>
<pre class="code" data-lang="" data-unlink>---
layout: post
title: テスト投稿タイトル
date: 2012-04-01 09:00:00
category : サンプル
tags : [intro, 初心者, jekyll, tutorial]
---

テスト投稿本文

- a
- b
- c

[http://daruyanagi.net](http://daruyanagi.net/)</pre><p>Markdown テキストの先頭に YAML Front-Matter と呼ばれる設定を書いておけば、タイトル・レイアウト・投稿日時・カテゴリ・タグといったメタデータを付与することもできる。なんだか便利臭がプンプンするぜ。</p><p>さて、これを WebMatrix で HTML ドキュメントに変換してみようというのが今日のお題。<a href="https://blog.daruyanagi.jp/entry/2012/09/27/213159">SignalR + WebMatrix &#x3067;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x306E;&#x76E3;&#x8996;&#x3092;&#x884C;&#x3063;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> などと組み合わせたら面白いものができそうな気がする。</p>

<div class="section">
<h3>必要なライブラリ</h3>

<ul>
<li>MarkdownSharp</li>
<li>YamlSerializer for .NET（<a href="https://blog.daruyanagi.jp/entry/2012/10/07/113945">WebMatrix/ASP.NET Web Pages &#x3067; YAML &#x3092;&#x6271;&#x3046; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）</li>
</ul><p>どちらも NuGet で取得できる。</p>

</div>
<div class="section">
<h3>サンプルコード</h3>
<p>先ほどの Jekyll ドキュメントを ~/Default.md としておき、これを ~/Default.cshtml で読み込んで変換・表示してみる。あくまでもサンプルなので、汚いところ、あからさまにダメなところは無視してほしいかな（笑</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Text.RegularExpressions
@<span class="synStatement">using</span> System.Yaml

@{
var path = Server.MapPath(<span class="synConstant">&quot;~/Default.md&quot;</span>);

var s = System.IO.File.ReadAllText(path);

<span class="synComment">// YAML Front-Matter を抽出する適当な正規表現</span>
var r = <span class="synStatement">new</span> Regex(<span class="synConstant">&quot;---.+---&quot;</span>, RegexOptions.Singleline);

<span class="synComment">// YAML Front-Matter を取得（エラー処理なし！）</span>

<span class="synComment">/* 配列として受け取る → 先頭はマッピング（ハッシュ）のはず */</span>
var node = YamlNode.FromYaml(r.Match(s).ToString())[<span class="synConstant">0</span>]
<span class="synStatement">as</span> YamlMapping;

<span class="synComment">//YAML Front-Matter の値を変数に格納する</span>

<span class="synComment">/* スカラ（値）の場合 */</span>
var title = (node[<span class="synConstant">&quot;title&quot;</span>] <span class="synStatement">as</span> YamlScalar)
.Value; <span class="synComment">// &lt;- 生テキスト！</span>
var date = (node[<span class="synConstant">&quot;date&quot;</span>] <span class="synStatement">as</span> YamlScalar)
.NativeObject; <span class="synComment">// &lt;- DateTime!</span>
var category = (node[<span class="synConstant">&quot;category&quot;</span>] <span class="synStatement">as</span> YamlScalar).Value;
var layout = (node[<span class="synConstant">&quot;layout&quot;</span>] <span class="synStatement">as</span> YamlScalar).Value;

<span class="synComment">/* シーケンス（配列）の場合 */</span>
var tags = (node[<span class="synConstant">&quot;tags&quot;</span>] <span class="synStatement">as</span> YamlSequence)
.Select(_ =&gt; (_ <span class="synStatement">as</span> YamlScalar).Value);

<span class="synComment">// YAML Front-Matter を除去（危険が危ないデシ！）</span>
s = r.Replace(s, <span class="synType">string</span>.Empty);

<span class="synComment">// 残りは Markdown ドキュメントです</span>
var m = <span class="synStatement">new</span> MarkdownSharp.Markdown();
var text = m.Transform(s);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;@title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;@title&lt;/h1&gt;

@Html.Raw(text)

&lt;h2&gt;Posted at&lt;/h2&gt;
&lt;p&gt;@date&lt;/p&gt;

&lt;h2&gt;Category&lt;/h2&gt;
&lt;p&gt;&lt;a href=<span class="synConstant">&quot;~/Category/@category&quot;</span>&gt;@category&lt;/a&gt;&lt;/p&gt;

&lt;h2&gt;Tags&lt;/h2&gt;
&lt;ul&gt;
@<span class="synStatement">foreach</span>(var tag <span class="synStatement">in</span> tags)
{
&lt;li&gt;&lt;a href=<span class="synConstant">&quot;~/Tag/@tag&quot;</span>&gt;@tag&lt;/a&gt;&lt;/li&gt;
}
&lt;/ul&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121009231737.png" alt="f:id:daruyanagi:20121009231737p:plain" title="f:id:daruyanagi:20121009231737p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんとなく動いてるっぽい。</p>

</div>