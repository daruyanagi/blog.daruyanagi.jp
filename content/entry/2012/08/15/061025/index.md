---
date: 2012-08-15T06:10:25.0000000
draft: false
title: "WebMatrix + ASP.NET Web Pages でキレイにコーディングしたい（5）"
tags: []
eyecatch: 
---

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/15/051237">
<p>けれど、これだと IntelliSense の助けが得られないな。無理して App に Theme 関連の変数や関数が属すようにせず、 Static な Theme クラスを作って、そっちで管理するほうがいいかもしれない。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/15/051237">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044;&#xFF08;4&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>さっそくやってみた。</p><p>まず、 App_Code フォルダに Theme.cs を作成して、以下のようにコーディング。前回のと内容的には殆ど変わらない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Theme
{
<span class="synType">const</span> <span class="synType">string</span> ThemeBaseDir = <span class="synConstant">&quot;~/Themes/&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> ThemeLayoutFile = <span class="synConstant">&quot;_Layout.cshtml&quot;</span>;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Load(<span class="synType">string</span> name) { Name = name; }

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Name { get; <span class="synType">private</span> set; }

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Path
{
<span class="synStatement">get</span>
{
<span class="synStatement">return</span> VirtualPathUtility.ToAbsolute(
System.IO.Path.Combine(ThemeBaseDir, Name)
);
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Layout
{
<span class="synStatement">get</span>
{
<span class="synStatement">return</span> VirtualPathUtility.ToAbsolute(
System.IO.Path.Combine(ThemeBaseDir, Name, ThemeLayoutFile)
);
}
}
}
</pre><p>“_AppStart.cshtml”も書き換えておく。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synComment">// App.Theme = &quot;Default&quot;;</span>
Theme.Load(<span class="synConstant">&quot;Default&quot;</span>);
}
</pre><p>最初は Theme.Name を public にして Theme.Name = "Default" みたいな感じで使うようにしていたけれど、 Theme.Load() の方が意図が明確になると思った。</p><p>さてはて、レイアウトファイルの方も書き換えよう。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Reset.css&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Common.css&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synComment">&lt;!-- &lt;link rel=&quot;stylesheet&quot; href=&quot;@App.GetThemePath()/Styles/Main.css&quot; /&gt; --&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@Theme.Path/Styles/Main.css&quot;</span><span class="synIdentifier"> /&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120815053803.png" alt="f:id:daruyanagi:20120815053803p:plain" title="f:id:daruyanagi:20120815053803p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>dynamic 型にしたら入力補完されないけれど、ちゃんとクラスにしたら……ほら！　クラスの責務も明確になるし、断然こっちのほうがいいなと自己満足した。</p>

<div class="section">
<h3>閑話休題</h3>
<p>WebMatrix 2 RC 版はなかなか完成度が高いと思うけれど、テキストのコピーにやたら時間がかかったり<a href="#f-76078fae" name="fn-76078fae" title="とくに［テキストを折り返す］を ON にすると絶望的に遅いことがある">*1</a>、まれにコピー＆ペーストそのものができなくなってしまう。 NuGet のリボンボタンが行方不明になるのもたまに困る。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120815054857.png" alt="f:id:daruyanagi:20120815054857p:plain" title="f:id:daruyanagi:20120815054857p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あと、［Alt］キーでメニューのナビゲーションが出るのだけれど、そっちにフォーカスがとられて矩形選択や IME の切り替え<a href="#f-52b40b4a" name="fn-52b40b4a" title="英語配列だと［Alt］＋［~］キーが標準">*2</a>に支障が出るのもなおしてほしいところかな。［Alt］キー ＝ メニュー操作 というのは確かにわかりやすいのだけれど。</p><p>不具合のいくつかはすでに報告済み。 RTM でちゃんとなおればいいなぁ、と思った。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-76078fae" name="f-76078fae" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">とくに［テキストを折り返す］を ON にすると絶望的に遅いことがある</span></p>
<p class="footnote"><a href="#fn-52b40b4a" name="f-52b40b4a" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">英語配列だと［Alt］＋［~］キーが標準</span></p>
</div>