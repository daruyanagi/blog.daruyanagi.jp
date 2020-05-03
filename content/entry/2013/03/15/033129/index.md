---
date: 2013-03-15T03:31:29.0000000
draft: false
title: "WebMatrix 2: 縦書きツイートするためのアプリ作った"
tags: ["WebMatrix", "ASP.net Web Pages", "Twitter"]
eyecatch: 20130315025326.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130315025326.png" alt="f:id:daruyanagi:20130315025326p:plain" title="f:id:daruyanagi:20130315025326p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Twitter の Web UI で改行が使えるようになったとのことで、タイムラインが縦書きでいっぱいです。それをみていたら、自分も漢詩なんかが縦書きで投稿できるアプリがほしくなりました。</p>

<ul>
<li><a href="http://tools.daruyanagi.net/Tategaki/">&#x7E26;&#x66F8;&#x304D; - @daruyanagi</a></li>
</ul>
<div class="section">
<h3>Inside Tategaki</h3>

<div class="section">
<h4>拡張メソッド</h4>
<p>さっそく中身を紹介したいのですが、その前に拡張メソッドをいくつか用意しておきます。クラス名が体を表していないのは見逃してください。拡張メソッドのクラス名なんか飾りなんですよ！</p>

<ul>
<li>Transpose() : 行と列を逆にします</li>
<li>Join() : string.Join() を "hoge".Join() で呼び出す</li>
<li>Times()：string * int がほしかった</li>
</ul><p><b>~/App_Code/EnumerableExtensions.cs</b></p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> EnumerableExtensions
{
<span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;IEnumerable&lt;T&gt;&gt; Transpose&lt;T&gt;(
<span class="synStatement">this</span> IEnumerable&lt;IEnumerable&lt;T&gt;&gt; source)
{
<span class="synStatement">return</span> from row <span class="synStatement">in</span> source
from col <span class="synStatement">in</span> row.Select(
(x, i) =&gt; <span class="synStatement">new</span> KeyValuePair&lt;<span class="synType">int</span>, T&gt;(i, x))
group col.Value by col.Key into c
select c <span class="synStatement">as</span> IEnumerable&lt;T&gt;;
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Join&lt;T&gt;(
<span class="synStatement">this</span> IEnumerable&lt;T&gt; source, <span class="synType">string</span> seperator)
{
<span class="synStatement">return</span> <span class="synType">string</span>.Join(seperator, source);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Times(<span class="synStatement">this</span> <span class="synType">string</span> source, <span class="synType">int</span> times)
{
<span class="synStatement">return</span> Enumerable.Range(<span class="synConstant">0</span>, times).Select(_ =&gt; source).Join(<span class="synConstant">&quot;&quot;</span>);
}
}
</pre>
</div>
</div>
<div class="section">
<h3>メインページ</h3>
<p>“既定のページの管理”で .cshtml を追加してあります。</p><p><b>~/Tategaki/Default.cshtml</b></p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var text = (Request[<span class="synConstant">&quot;text&quot;</span>] ?? <span class="synType">string</span>.Empty);
}

&lt;div style=<span class="synConstant">&quot;width: 300px; margin: 0 auto;&quot;</span>&gt;
&lt;form action=<span class="synConstant">&quot;&quot;</span>&gt;
&lt;p&gt;&lt;textarea name=<span class="synConstant">&quot;text&quot;</span> style=<span class="synConstant">&quot;width: 100%; height: 10em;&quot;</span>&gt;@text&lt;/textarea&gt;&lt;/p&gt;
&lt;p style=<span class="synConstant">&quot;text-align: right;&quot;</span>&gt;&lt;input type=<span class="synConstant">&quot;submit&quot;</span> /&gt;&lt;/p&gt;
&lt;/form&gt;

@{
text = text.Replace(<span class="synConstant">&quot;  &quot;</span>, <span class="synConstant">&quot;　&quot;</span>).Replace(<span class="synConstant">&quot; &quot;</span>, <span class="synConstant">&quot;　&quot;</span>);
text = Microsoft.VisualBasic.Strings
.StrConv(text, Microsoft.VisualBasic.VbStrConv.Wide, <span class="synConstant">0</span>);

var s = Request[<span class="synConstant">&quot;s&quot;</span>].AsInt(<span class="synConstant">1</span>);
var new_line = <span class="synStatement">new</span> [] { <span class="synConstant">&quot;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, <span class="synConstant">&quot;</span><span class="synSpecial">\r</span><span class="synConstant">&quot;</span>, <span class="synConstant">&quot;</span><span class="synSpecial">\n</span><span class="synConstant">&quot;</span> };
var lines = Html.Encode(text).Split(new_line, StringSplitOptions.None);
var width = lines.Max(_ =&gt; _.Length);

var vertical_text = lines
.Reverse()
.Select(_ =&gt; _.PadRight(width, <span class="synConstant">'　'</span>).ToCharArray().AsEnumerable())
.Transpose()
.Select(_ =&gt; _.Join(<span class="synConstant">&quot; &quot;</span>.Times(s)).TrimEnd())
.Join(<span class="synConstant">&quot;</span><span class="synSpecial">\n</span><span class="synConstant">&quot;</span>) + <span class="synConstant">&quot;</span><span class="synSpecial">\n\n</span><span class="synConstant">&quot;</span>;
}
</pre><p>半角 ⇒ 全角 の変換処理はめんどくさいの Visual Basic の機能（StrConv 関数）を引っ張ってきました。Web.config を書き換えて DLL の参照を追加するより、一度「Visual Studio」で開いて［参照の追加］を使うのが簡単。</p><p>AsInt() は ASP.NET Web Pages で提供されている便利なメソッド。ここでは Request[] で受け取った値を Int32 型にしている（失敗したら 0、引数を与えれていればデフォルト値を返す）。ほかにもいろんな型に対応するメソッドが用意されてるよ！</p>

<ul>
<li><a href="http://www.asp.net/web-pages/overview/more-resources/asp-net-web-pages-api-reference">ASP.NET API Quick Reference : The Official Microsoft ASP.NET Site</a></li>
</ul><p>手抜き命名の変数 s は行間に挿入するスペースの数（LINQ の下から二つ目 " ".Times(s) の部分）。</p><p>あとは LINQ で</p>

<ol>
<li>横にスライス（縦書きの時は右上始点で読むのリバースしておく）</li>
<li>それをまた縦にスライスして char の表に（空きは簡便のため全角空白で埋める）</li>
<li>行と列を入れ替えて縦書きに</li>
<li>各行の char[] を連結（うしろの空白は不要なのでカット）</li>
<li>すべての行を連結</li>
</ol><p>するだけ。もっといい方法あるかな？</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@functions
{
<span class="synType">public</span> <span class="synType">string</span> GetShorURL(<span class="synType">string</span> url){
<span class="synType">string</span> endpoint = <span class="synConstant">&quot;https://www.googleapis.com/urlshortener/v1/url&quot;</span>;
<span class="synType">string</span> json = <span class="synConstant">&quot;{</span><span class="synSpecial">\&quot;</span><span class="synConstant">longUrl</span><span class="synSpecial">\&quot;</span><span class="synConstant">: </span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span> + url + <span class="synConstant">&quot;</span><span class="synSpecial">\&quot;</span><span class="synConstant">}&quot;</span>;
WebClient client = <span class="synStatement">new</span> WebClient { Encoding = System.Text.Encoding.UTF8 };
client.Headers[<span class="synConstant">&quot;Content-Type&quot;</span>] = <span class="synConstant">&quot;application/json&quot;</span>;
var response = Json.Decode(client.UploadString(endpoint, json));
<span class="synStatement">return</span> response.id <span class="synStatement">as</span> <span class="synType">string</span>;
}
}

@{
var url = GetShorURL(Request.Url.AbsoluteUri);
}

&lt;pre style=<span class="synConstant">&quot;padding: 1em; background-color: whitesmoke; border: 1px lightgray solid; overflow: auto;&quot;</span>&gt;@vertical_text&lt;/pre&gt;


&lt;div style=<span class="synConstant">&quot;text-align: right;&quot;</span>&gt;
&lt;span&gt;@(<span class="synConstant">140</span> - vertical_text.Length)&lt;/span&gt;
&lt;/div&gt;

&lt;div&gt;
&lt;a href=<span class="synConstant">'</span><span class="synError">https://twitter.com/intent/tweet?text=@HttpUtility.UrlEncode(vertical_text)</span><span class="synConstant">'</span> <span class="synType">class</span>=<span class="synConstant">&quot;twitter-mention-button&quot;</span> data-lang=<span class="synConstant">&quot;ja&quot;</span> data-size=<span class="synConstant">&quot;large&quot;</span> data-related=<span class="synConstant">&quot;daruyanagi&quot;</span> data-url=<span class="synConstant">&quot;@url&quot;</span>&gt;Tweet&lt;/a&gt;
&lt;script&gt;!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[<span class="synConstant">0</span>]; <span class="synStatement">if</span> (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = <span class="synConstant">&quot;//platform.twitter.com/widgets.js&quot;</span>; fjs.parentNode.insertBefore(js, fjs); } }(document, <span class="synConstant">&quot;script&quot;</span>, <span class="synConstant">&quot;twitter-wjs&quot;</span>);&lt;/script&gt;
&lt;/div&gt;
&lt;/div&gt;
</pre><p>goo.gl で短縮するための処理を入れている。リクエストを Json で扱うのだけど、エンコード・でコードするクラスがあるのが便利だった……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130315035335.png" alt="f:id:daruyanagi:20130315035335p:plain" title="f:id:daruyanagi:20130315035335p:plain" class="hatena-fotolife" itemprop="image"></span></p>

</div>