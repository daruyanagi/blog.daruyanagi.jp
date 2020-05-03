---
date: 2012-08-08T03:57:45.0000000
draft: false
title: "WebMatrix + ASP.NET Web Pages でキレイにコーディングしたい（2）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/07/054832">
<p>あと、 @RenderPage("_Footer.cshtml") は @RenderFooter() などと記述できるとカッコいいな。「フッターはテーマフォルダ直下の“_Footer.cshtml”に書く」。なるべく規約ベースで。これも簡単にできそうだ。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/07/054832">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>これをやってみた。なんていうか、“_Footer.cshtml”なんて固定値、あんまりよく目にするところに書いておきたくない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120808030122.png" alt="f:id:daruyanagi:20120808030122p:plain" title="f:id:daruyanagi:20120808030122p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>拡張メソッド</h3>
<p>まずは拡張メソッドを試してみた。 WebPage クラスがあたかも最初から RenderFooter() をもっていたかのように見せかけるのが目的。“App_Code”フォルダを掘って、そのなかに C# クラスファイル（.cs）を作成する。 RenderBody() のシグネチャを参考にこういうのを作ってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Web.WebPages;

<span class="synType">static</span> <span class="synType">public</span> <span class="synType">class</span> WebPageExtensions
{
<span class="synType">static</span> <span class="synType">public</span> HelperResult RenderFooter(
<span class="synStatement">this</span> WebPage target, <span class="synStatement">params</span> <span class="synType">object</span>[] data)
{
<span class="synStatement">return</span> target.RenderPage(<span class="synConstant">&quot;_Footer.cshtml&quot;</span>, data);
}
}
</pre><p>すると、 cshtml ファイルで @this.RenderFooter() という感じで呼べる。</p>
<pre class="code lang-html" data-lang="html" data-unlink>:
:
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-content&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>article<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-body&quot;</span><span class="synIdentifier">&gt;</span>
@RenderBody()
<span class="synIdentifier">&lt;/</span>article<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>aside<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-sidebar&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_SideBar.cshtml&quot;) <span class="synComment">&lt;!-- 古い書き方 --&gt;</span>
<span class="synIdentifier">&lt;/</span>aside<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span>footer<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-footer&quot;</span><span class="synIdentifier">&gt;</span>
@this.RenderFooter() <span class="synComment">&lt;!-- 新しい書き方 --&gt;</span>
<span class="synIdentifier">&lt;/</span>footer<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>そうなんだ、<b> this が要るんだ</b>。 @RenderBody() みたいに this を使わずに呼びたかったけれど、これはどうしようもないっぽい。</p>

</div>
<div class="section">
<h3>Func&lt;HelperResult&gt;</h3>
<p>次に考えたのは、 Func&lt;HelperResult&gt; を使うこと。最初の @{……} セクションで RenderFooter を定義しておけば、 this なしの @RenderFooter() で使えるはず。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

@{
App.Title = App.Title ?? <span class="synConstant">&quot;Untitled Application&quot;</span>;
App.Language = App.Language ?? <span class="synConstant">&quot;en&quot;</span>;
App.Encoding = App.Encoding ?? <span class="synConstant">&quot;utf-8&quot;</span>;
Page.Title = Page.Title ?? <span class="synConstant">&quot;Untitled Page&quot;</span>;

Func&lt;HelperResult&gt; RenderFooter =
() =&gt; RenderPage(<span class="synConstant">&quot;_Footer.cshtml&quot;</span>);
}

&lt;html lang=<span class="synConstant">&quot;@App.Language&quot;</span>&gt;
&lt;head&gt;
:
:
</pre><p>cshtml ファイルはこんなかんじになる。</p>
<pre class="code lang-html" data-lang="html" data-unlink>:
:
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-content&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>article<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-body&quot;</span><span class="synIdentifier">&gt;</span>
@RenderBody()
<span class="synIdentifier">&lt;/</span>article<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>aside<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-sidebar&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_SideBar.cshtml&quot;) <span class="synComment">&lt;!-- 古い書き方 --&gt;</span>
<span class="synIdentifier">&lt;/</span>aside<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span>footer<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-footer&quot;</span><span class="synIdentifier">&gt;</span>
@RenderFooter() <span class="synComment">&lt;!-- 新しい書き方 --&gt;</span>
<span class="synIdentifier">&lt;/</span>footer<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>目的は達成したけれど、これはこれでどうなんだろう。とりあえず今のところ単純なラムダ式でなんとかなっているけれど、たとえばRenderFooter でエラー処理を追加する場合（“_Footer.cshtml”がない場合がありえる）を考えると、「レイアウトファイルを簡潔にしたい」という目的からはだいぶ外れてくる。</p><p>RenderFooter をページの初期化に使う“_PageStart.cshtml”へ逃がそうかと思ったけれど、それもダメそうだし。結局、“_PageStart.cshtml”へ退避できるものだけ退避させて、あとはこんな感じにした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;

@{
Func&lt;HelperResult&gt; RenderHeader =
() =&gt; RenderPage(<span class="synConstant">&quot;_Header.cshtml&quot;</span>);
Func&lt;HelperResult&gt; RenderNavigation =
() =&gt; RenderPage(<span class="synConstant">&quot;_Navigation.cshtml&quot;</span>);
Func&lt;HelperResult&gt; RenderSideBar =
() =&gt; RenderPage(<span class="synConstant">&quot;_SideBar.cshtml&quot;</span>);
Func&lt;HelperResult&gt; RenderFooter =
() =&gt; RenderPage(<span class="synConstant">&quot;_Footer.cshtml&quot;</span>);
}

&lt;html lang=<span class="synConstant">&quot;@App.Language&quot;</span>&gt;
&lt;head&gt;
:
:
</pre><p>マジックワードを一元管理できるだけでも、まぁ、いいかな。</p><p>ちなみに @{……} を DOCTYPE 宣言のあとに書くように変えたのは、 XML ドキュメントを返すときとの統一性を考えて。むかし、 DOCTYPE 宣言の前に @{……} を書いて無駄な改行が入ってしまい、ちゃんと解釈してもらえなかったことがあったので。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p>調べている途中でみつけたのだけれど、これおもしろいな。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Func&lt;dynamic, <span class="synType">object</span>&gt; b = @&lt;strong&gt;@item&lt;/strong&gt;;
}
&lt;span&gt;This sentence <span class="synStatement">is</span> @b(<span class="synConstant">&quot;In Bold&quot;</span>).&lt;/span&gt;
</pre><p>手元で試したらちゃんと動いたし。</p>

<blockquote cite="http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx">
<p>Note that the delegate that’s generated is a Func<T, HelperResult>. Also, the @item parameter is a special magic parameter. These delegates are only allowed one such parameter, but the template can call into that parameter as many times as it needs.</p>

<cite><a href="http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx">Templated Razor Delegates | You&rsquo;ve Been Haacked</a></cite>
</blockquote>
<p>なんでこうなるのかイマイチよくわからんけど……。 @ って結局なんなんだ（＠ｗ＠！</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20110423/1303562559">Templated Razor Delegates &#x304C;&#x9762;&#x767D;&#x3044; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul>
</div>