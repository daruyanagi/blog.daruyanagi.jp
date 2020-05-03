---
date: 2012-08-20T20:22:53.0000000
draft: false
title: "WebMatrix でファイルのアップロード（3） - FileUpload ヘルパーを使う"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>まずはお詫びを。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120819115634.png" alt="f:id:daruyanagi:20120819115634p:plain" title="f:id:daruyanagi:20120819115634p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/19/130606">
<p>ASP.NET Web Helpers Library という NuGet をインストールすると、（FileUpload ヘルパーを利用して）複数ファイルのアップロードに対応した Form タグを簡単に生成できる。</p><p>でも、個人的にはあんまり好きじゃなかったので今回は使わなかった。なんか動的に生成されるノードの名前がカブってるし、あんまりよくわかんなかった。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/19/130606">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>そしたらツッコミをもらった。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">だるさん、HTML の name 属性の値は重複してもいいんやで</p>&mdash; しばやん (@shibayan) <a href="https://twitter.com/shibayan/status/237243206683746304?ref_src=twsrc%5Etfw">2012年8月19日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>最初はなんのことかと思ったけど、 HttpFileCollection は NameObjectCollectionBase を継承している。 NameObjectCollectionBase は重複した複数のキーをもてるので、キーで値を取ろうとすると取りこぼしが発生する、ということみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820201127.png" alt="f:id:daruyanagi:20120820201127p:plain" title="f:id:daruyanagi:20120820201127p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>確かにせやな。 Key はひとつだけど、 Value は複数あるわ。</p><p>というわけで、値をすべて取得する拡張メソッド（~/App_Code/HttpFileCollectionBaseExtension.cs）は</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> HttpFileCollectionBaseExtension
{
<span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;HttpPostedFileBase&gt; ToEnumerable(
<span class="synStatement">this</span> HttpFileCollectionBase target)
{
<span class="synStatement">foreach</span> (var key <span class="synStatement">in</span> target.AllKeys) <span class="synComment">//--&gt; Key で……</span>
{
<span class="synStatement">yield</span> <span class="synStatement">return</span> target[key];
}
}
}
</pre><p>ではなくて、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> HttpFileCollectionBaseExtension
{
<span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;HttpPostedFileBase&gt; ToEnumerable(
<span class="synStatement">this</span> HttpFileCollectionBase target)
{
<span class="synStatement">for</span> (<span class="synType">int</span> i = <span class="synConstant">0</span>; i &lt; target.Count; i++) <span class="synComment">//--&gt; Index で！</span>
{
<span class="synStatement">yield</span> <span class="synStatement">return</span> target[i];
}
}
}
</pre><p>じゃないとダメみたい。 for 文なんて久しぶりに書いたわ……。</p><p>んで、 Default.cshtml をこんな感じで書いてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

@{
IEnumerable&lt;dynamic&gt; model = <span class="synConstant">null</span>;

<span class="synStatement">if</span> (IsPost)
{
model = Request.Files.ToEnumerable()
.Select&lt;HttpPostedFileBase, dynamic&gt;((file) =&gt;
{
<span class="synStatement">try</span>
{
var path = <span class="synConstant">&quot;~/Files/&quot;</span> + file.FileName;
file.SaveAs(Server.MapPath(path));

<span class="synStatement">return</span> <span class="synStatement">new</span> {
Result = <span class="synConstant">&quot;Success&quot;</span>,
Src = VirtualPathUtility.ToAbsolute(path),
Message = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;{0} is saved successfully&quot;</span>, file.FileName),
};
}
<span class="synStatement">catch</span> (Exception e)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> {
Result = <span class="synConstant">&quot;Error&quot;</span>,
Message = e.Message,
};
}
});
}
}

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;

&lt;style&gt;
html { font-family: Meiryo, sans-serif; }
.label { color: #fff; font-size: <span class="synConstant">0.8</span>em;
border-radius: 2px; padding: <span class="synConstant">0</span> 5px; }
.success { background-color: #0094ff; }
.error { background-color: #ff6a00; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;File Upload Test&lt;/h1&gt;

&lt;h2&gt;Upload&lt;/h2&gt;
@FileUpload.GetHtml()

&lt;h2&gt;Result&lt;/h2&gt;
@<span class="synStatement">if</span> (model == <span class="synConstant">null</span>)
{
&lt;p&gt;No files are uploaded.&lt;/p&gt;
}
<span class="synStatement">else</span>
{
&lt;ul&gt;
@<span class="synStatement">foreach</span> (var item <span class="synStatement">in</span> model)
{
&lt;li&gt;&lt;span <span class="synType">class</span>=<span class="synConstant">&quot;label @item.Result.ToLower()&quot;</span>&gt;
@item.Result&lt;/span&gt; @item.Message&lt;/li&gt;
}
&lt;/ul&gt;
}
&lt;/body&gt;
&lt;/html&gt;
</pre><p>結果はこんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120820201550.png" alt="f:id:daruyanagi:20120820201550p:plain" title="f:id:daruyanagi:20120820201550p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>できた！</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20110702/1309532938">HTML5 &#x306E; Drag and Drop API &#x3068; File API &#x3092;&#x4F7F;&#x3063;&#x3066;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#x3092;&#x5B9F;&#x88C5;&#x3059;&#x308B; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul>