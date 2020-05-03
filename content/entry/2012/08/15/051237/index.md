---
date: 2012-08-15T05:12:37.0000000
draft: false
title: "WebMatrix + ASP.NET Web Pages でキレイにコーディングしたい（4）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/07/054832">
<p>今見返してふと思ったのは、比較的簡単にテーマ機能なんかを実装できるなということ。ただデザインを変えたいがために、毎回一からこんなの作るのはアホらしい。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/07/054832">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>というわけで、今回はテーマ機能を（試しに）作ってみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120815044918.png" alt="f:id:daruyanagi:20120815044918p:plain" title="f:id:daruyanagi:20120815044918p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>“~/Themes/”フォルダにテーマフォルダを作成（今回は Basic と Default）</li>
<li>それぞれのテーマフォルダにレイアウトファイル、スタイルシート、リソースなどをまとめる</li>
<li>“App.Theme”にテーマフォルダの名前を入れれば、サイト全体のテーマが切り替わる</li>
</ul><p>カッコいいか悪いかは知らないけど、とりあえず書いてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># _AppStart.cshtml

@{  <span class="synComment">/* Configure App Setting */</span>
App.Theme = <span class="synConstant">&quot;Default&quot;</span>;
}

@<span class="synStatement">using</span> System.IO;

@{  <span class="synComment">/* Define Utilities */</span>
<span class="synType">const</span> <span class="synType">string</span> ThemeBaseDir = <span class="synConstant">&quot;~/Themes/&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> ThemeLayoutFile = <span class="synConstant">&quot;_Layout.cshtml&quot;</span>;

App.GetThemePath = <span class="synStatement">new</span> Func&lt;<span class="synType">string</span>&gt;(() =&gt;
VirtualPathUtility.ToAbsolute(
Path.Combine(ThemeBaseDir, App.Theme)
)
);

App.GetLayoutPath = <span class="synStatement">new</span> Func&lt;<span class="synType">string</span>&gt;(() =&gt;
VirtualPathUtility.ToAbsolute(
Path.Combine(ThemeBaseDir, App.Theme, ThemeLayoutFile)
)
);
}
</pre><p>“~/Themes/”を絶対パスへ変換するには、“VirtualPathUtility.ToAbsolute()”を使えばいいみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># _PageStart.cshtml

@{
Layout = App.GetLayoutPath();
Page.Title = Page.Title ?? <span class="synConstant">&quot;Untitled Page&quot;</span>;
}
</pre><p>さっき定義した関数の使い方はこんな感じ。これでページを読み込むときにテーマが適用されると思う。やろうと思えば、 Themes フォルダ内のテーマフォルダを列挙して<a href="#f-65f2844b" name="fn-65f2844b" title="こういう処理に慣れた .NET のやり方が使えるのが嬉しいなぁ">*1</a>、ブラウザーから動的にテーマを変更する、といったこともできないこともない気がする。 </p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;link rel=<span class="synConstant">&quot;stylesheet&quot;</span> href=<span class="synConstant">&quot;~/Content/Reset.css&quot;</span> /&gt;
&lt;link rel=<span class="synConstant">&quot;stylesheet&quot;</span> href=<span class="synConstant">&quot;~/Content/Common.css&quot;</span> /&gt;
&lt;link rel=<span class="synConstant">&quot;stylesheet&quot;</span> href=<span class="synConstant">&quot;@App.GetThemePath()/Styles/Main.css&quot;</span> /&gt;
</pre><p>レイアウトファイルでリソースを読み込むとき、テーマフォルダのパスを知るにはこんな感じで使う。けれど、これだと IntelliSense の助けが得られないな。無理して App に Theme 関連の変数や関数が属すようにせず、 Static な Theme クラスを作って、そっちで管理するほうがいいかもしれない。 </p><p>スタイルシートは、</p>

<ol>
<li><b>~/Content/Reset.css</b>：ブラウザー依存のレイアウトのリセット。適当なライブラリを使えばいいと思う。</li>
<li><b>~/Content/Common.css</b>：テーマに関係ない共通のスタイルを記述。 Reset.css の不満なところを書き換えたりとか<a href="#f-8594263d" name="fn-8594263d" title="Reset.css はなるべく書き換えたくない。ライセンスもあるし、アップデートしたらそのまま差し替えたいし">*2</a>。</li>
<li>テーマフォルダのスタイルシート</li>
</ol><p>という順で読み込んでいくようにしてみた。なるべく分けて、論理的にやらないと、あとからだんだん訳がわからなくなってくる……</p>
<div class="footnote">
<p class="footnote"><a href="#fn-65f2844b" name="f-65f2844b" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">こういう処理に慣れた .NET のやり方が使えるのが嬉しいなぁ</span></p>
<p class="footnote"><a href="#fn-8594263d" name="f-8594263d" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">Reset.css はなるべく書き換えたくない。ライセンスもあるし、アップデートしたらそのまま差し替えたいし</span></p>
</div>