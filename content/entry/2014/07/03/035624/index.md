---
date: 2014-07-03T03:56:24.0000000
draft: false
title: "WebMatrix：ルビを振るためのヘルパーを作ってみる"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140703034425.png" alt="f:id:daruyanagi:20140703034425p:plain" title="f:id:daruyanagi:20140703034425p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえずオーソドックスに App_Code フォルダ以下に Ruby.cshtml を作ってこんな感じに記述。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Ruby.cshtml

@helper GetHtml(<span class="synType">string</span> text, <span class="synType">string</span> ruby){
&lt;ruby&gt;&lt;rb&gt;@text&lt;/rb&gt;&lt;rp&gt;（&lt;/rp&gt;&lt;rt&gt;@ruby&lt;/rt&gt;&lt;rp&gt;）&lt;/rp&gt;&lt;/ruby&gt;
}
</pre><p>使い方はこんな感じ .cshtml の名前がそのまま静的クラスの名前になっていて、定義したヘルパー関数が呼べる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Test.cshtml

@{

}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@Ruby.GetHtml(<span class="synConstant">&quot;柳 英俊&quot;</span>, <span class="synConstant">&quot;やなぎ ひでとし&quot;</span>)
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140703034801.png" alt="f:id:daruyanagi:20140703034801p:plain" title="f:id:daruyanagi:20140703034801p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>（※見やすいように拡大してある）</p><p>自分はルビのタグなんか覚えるの面倒だし、ましてやルビタグが解釈できない Firefox のことまで考えてコーディングするのは面倒なので、こういうヘルパーを作るのが好み。</p>

<div class="section">
<h3>ちょっとハッテン</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/HtmlHelperExtensions.cs

<span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Web;
<span class="synStatement">using</span> System.Web.WebPages.Html;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> HtmlHelperExtenstion
{
<span class="synType">public</span> <span class="synType">static</span> IHtmlString Ruby(<span class="synStatement">this</span> HtmlHelper helper, <span class="synType">string</span> text, <span class="synType">string</span> ruby)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HtmlString(<span class="synType">string</span>.Format(
<span class="synConstant">&quot;&lt;ruby&gt;&lt;rb&gt;{0}&lt;/rb&gt;&lt;rp&gt;（&lt;/rp&gt;&lt;rt&gt;{1}&lt;/rt&gt;&lt;rp&gt;）&lt;/rp&gt;&lt;/ruby&gt;&quot;</span>,
text, ruby
));
}
}
</pre><p>こうやって HtmlHelper の拡張メソッドとして定義しておけば</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@Html.Ruby(<span class="synConstant">&quot;柳 英俊&quot;</span>, <span class="synConstant">&quot;やなぎ ひでとし&quot;</span>)
</pre><p>で同様のことができるようになる。</p>

</div>