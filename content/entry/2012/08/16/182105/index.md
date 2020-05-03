---
date: 2012-08-16T18:21:05.0000000
draft: false
title: "App_Code でサブフォルダーを利用する"
tags: ["ASP.net Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816181253.png" alt="f:id:daruyanagi:20120816181253p:plain" title="f:id:daruyanagi:20120816181253p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>前回（<a href="https://blog.daruyanagi.jp/entry/2012/08/16/155714">WebMatrix &#x3067; Markdown &#x3092;&#x5C11;&#x3057;&#x3060;&#x3051;&#x62E1;&#x5F35;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）、 Hilight.js をこのようなフォルダー構成で配置したの、覚えてますか。</p>
<pre class="code" data-lang="" data-unlink>~/
App_Code/
Highlight.cshtml &lt;-- ぇ？
Highlight/
Lisence Files
Content/
/Highlight
Theme Skins
Scripts/
Highlight/
hilight.pack.js</pre><p>パッとみて「これイケてなくね」って思いません？ Highlight.cshtml は ~/App_Code/Highlight 以下の配置される方がキレイですよね。</p>
<pre class="code" data-lang="" data-unlink>~/
App_Code/
Highlight/
Highlight.cshtml &lt;-- こうだろ！
Lisence Files
Content/
Highlight/
Theme Skins
Scripts/
Highlight/
hilight.pack.js</pre><p>~/App_Code/ フォルダーっていうのは、「ソースコードを置くだけで自動でコンパイルしてくれる不思議なフォルダー」なのですけど、デフォルト状態ではサブフォルダーまではみてくれないんですね。 Web.config にこのような設定を追加してあげる必要があります。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;false&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">directoryName</span>=<span class="synConstant">&quot;Highlight&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>~/App_Code/ フォルダーではソースコードの言語を自動判別してくれるのだけれど、サブフォルダーに分ければ異なる言語を混ぜて利用する、なんてこともできるらしい。へぇ、知らなかった。</p>

<ul>
<li><a href="http://msdn.microsoft.com/en-us/library/t990ks23.aspx">Shared Code Folders in ASP.NET Web Site Projects | Microsoft Docs</a></li>
</ul><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120816181753.png" alt="f:id:daruyanagi:20120816181753p:plain" title="f:id:daruyanagi:20120816181753p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>でも、この方法でサブフォルダーをコンパイル対象に含めても cshtml ファイルの面倒まではみてくれないみたい……。しょうがないので、静的クラスに書き換えてしまおう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Highlight.cshtml

@helper Include(<span class="synType">string</span> theme = <span class="synConstant">&quot;default&quot;</span>){
&lt;link rel=<span class="synConstant">&quot;stylesheet&quot;</span> href=<span class="synConstant">&quot;~/Content/Highlight/@(theme).css&quot;</span>&gt;
&lt;script src=<span class="synConstant">&quot;~/Scripts/Highlight/highlight.pack.js&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
}
</pre><p>書き換え前。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Highlight
{
<span class="synType">const</span> <span class="synType">string</span> STYLE_DIR = <span class="synConstant">&quot;~/Content/Highlight/&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> SCRIPT_DIR = <span class="synConstant">&quot;~/Scripts/Highlight/&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> HTML = <span class="synSpecial">@</span><span class="synConstant">&quot;&lt;!-- for Highlight.js support --&gt;</span>
<span class="synConstant">        &lt;link rel=&quot;&quot;stylesheet&quot;&quot; href=&quot;&quot;{0}{1}.css&quot;&quot;&gt;</span>
<span class="synConstant">        &lt;script src=&quot;&quot;{2}highlight.pack.js&quot;&quot;&gt;&lt;/script&gt;</span>
<span class="synConstant">        &lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;&quot;</span>;

<span class="synType">public</span> <span class="synType">static</span> HtmlString Include(<span class="synType">string</span> theme = <span class="synConstant">&quot;default&quot;</span>)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HtmlString(
<span class="synType">string</span>.Format(
HTML,
VirtualPathUtility.ToAbsolute(STYLE_DIR),
theme,
VirtualPathUtility.ToAbsolute(SCRIPT_DIR)
)
);
}
}
</pre><p>書き換え後。ちょっと長くなったけれど、これはそれだけ「ヘルパーがすげえ！」ということにしておいてください。</p><p>これでブツがそろったので、今度は NuGet パッケージにして公開しましょうかね（予定）。</p>
