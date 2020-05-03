---
date: 2012-08-07T05:48:32.0000000
draft: false
title: "WebMatrix + ASP.NET Web Pages でキレイにコーディングしたい"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---

<blockquote cite="http://www.microsoft.com/ja-jp/download/details.aspx?id=15979">
<p>Razor 構文を使用する <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Pages は web framework および <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> の一部で、Windows を使用した Web サイトの構築で必要なすべてが含まれます。</p>

<cite><a href="http://www.microsoft.com/ja-jp/download/details.aspx?id=15979">
Download: Razor &#x69CB;&#x6587;&#x3092;&#x4F7F;&#x7528;&#x3059;&#x308B; ASP.NET Web Pages - Microsoft Download Center - Download Details
</a></cite>
</blockquote>
<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> + <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Pages でキレイにコーディングしたいなぁ、と思うのだけれど、どうするのが正しいのかよくわからない。自分なりのテンプレみたいなのがほしいんだけれどね。</p>

<div class="section">
<h3>設定の共通化</h3>
<p>まず、 Web サイト全体の設定は一元管理したい。たぶん、これは“_AppStart.cshtml”に記述するのが正しいのだろう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
App.Title = <span class="synConstant">&quot;daruyanagi.net&quot;</span>;
App.Author = <span class="synConstant">&quot;daruyanagi&quot;</span>;
App.Language = <span class="synConstant">&quot;ja&quot;</span>;
App.Encoding = <span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&quot;</span>;
App.Copyright = <span class="synConstant">&quot;Copyright © 2012 daruyanagi. All rights reserved.&quot;</span>;
App.Description = <span class="synConstant">&quot;This is the web site of Hidetoshi Yanagi <a class="keyword" href="http://d.hatena.ne.jp/keyword/a.k.a.">a.k.a.</a> daruyanagi.&quot;</span>;
App.Keyword = <span class="synConstant">&quot;daruyanagi&quot;</span>;
}
</pre><p>これでも十分に簡素だけれど、設定ファイルやデータベースからロードできるようにすればもっとクールかもしれない。</p><p><img src="20120807050527.png" alt="f:id:daruyanagi:20120807050527p:plain" title="f:id:daruyanagi:20120807050527p:plain" class="hatena-fotolife"></p><p>App（や、このあとにでてくる Page）は dynamic 型（WebPageExecutingBase.App<a href="#f1" name="fn1" title="WebPageExecutingBase は The base class for all Plan9 files (_pagestart, _appstart, and regular pages) らしいのだけれど、 Plan9 ってなんぞ。今度調べよう">*1</a>）なので、あらかじめメンバーを定義しておかなくても、あとからいろいろ追加できる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
AppState[<span class="synConstant">&quot;customAppName&quot;</span>] = <span class="synConstant">&quot;Application Name&quot;</span>;
}
</pre><p>ほんとは AppState というのを使うっぽいけど、まぁ、いいや。</p>

</div>
<div class="section">
<h3>レイアウトの共通化</h3>
<p>つぎは、 Web サイトのデザインの共通化。 HTML 5 でレイアウトファイル（“~/Views/Shared/_Layout.cshtml”）記述して、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/jQuery">jQuery</a> / Modernizr / <a class="keyword" href="http://d.hatena.ne.jp/keyword/html5">html5</a>.js あたりのスクリプトをロードしておくのがモダンなやり方というものだろう。あと、リセット <a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a> で一度スタイルをリセットし、そのあとに独自の <a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a> を充てるようにした。ブラウザー幅によってデザインを変更するレスポンシブな部分を担当する <a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a> を切り分ければ、より一層メンテナンス性は上がるかも。ただ、あんまりファイル数は多くしたくないな。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
App.Title = App.Title ?? &quot;Untitled Application&quot;;
App.Language = App.Language ?? &quot;en&quot;;
App.Encoding = App.Encoding ?? &quot;utf-8&quot;;
Page.Title = Page.Title ?? &quot;Untitled Page&quot;;
}
<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Language&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>@Page.Title - @App.Title<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Encoding&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;description&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Description&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;keywords&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Keyword&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;author&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Author&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;copyright&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@App.Copyright&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;genarator&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Microsoft <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2.0&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;viewport&quot;</span>
<span class="synIdentifier">              </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;width=device-width,initial-scale=1&quot;</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Reset.<a class="keyword" href="http://d.hatena.ne.jp/keyword/css">css</a>&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/Site.<a class="keyword" href="http://d.hatena.ne.jp/keyword/css">css</a>&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span>
<span class="synPreProc">        </span><span class="synComment">&lt;!--[if lt IE 9]&gt;</span>
<span class="synComment">        &lt;script src=&quot;http://html5shiv.googlecode.com/<a class="keyword" href="http://d.hatena.ne.jp/keyword/svn">svn</a>/trunk/<a class="keyword" href="http://d.hatena.ne.jp/keyword/html5">html5</a>.js&quot;&gt;&lt;/script&gt;</span>
<span class="synComment">        &lt;![endif]--&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;http://code.<a class="keyword" href="http://d.hatena.ne.jp/keyword/jquery">jquery</a>.com/<a class="keyword" href="http://d.hatena.ne.jp/keyword/jquery">jquery</a>-latest.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;http://www.modernizr.com/downloads/modernizr-latest.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>header<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-header&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_Header.cshtml&quot;)
<span class="synIdentifier">&lt;/</span>header<span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span>nav<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-nav&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_Navigation.cshtml&quot;)
<span class="synIdentifier">&lt;/</span>nav<span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-content&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>article<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-body&quot;</span><span class="synIdentifier">&gt;</span>
@RenderBody()
<span class="synIdentifier">&lt;/</span>article<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>aside<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-<a class="keyword" href="http://d.hatena.ne.jp/keyword/sidebar">sidebar</a>&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_<a class="keyword" href="http://d.hatena.ne.jp/keyword/SideBar">SideBar</a>.cshtml&quot;)
<span class="synIdentifier">&lt;/</span>aside<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span>footer<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;site-footer&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;_Footer.cshtml&quot;)
<span class="synIdentifier">&lt;/</span>footer<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>冒頭は、“_AppStart.cshtml”で Title などを指定し忘れたときに、最低限のパラメータを指定しておくコード。今まで気づかなかったのだけれど、&lt;meta name="author" content="@App.Author"&gt; で @App.Author が null だと、 content 属性は出力されず、 &lt;meta name="author"&gt; だけが出力されるんだね。なかなか頭いいな。</p><p><img src="20120807042822.png" alt="f:id:daruyanagi:20120807042822p:plain" title="f:id:daruyanagi:20120807042822p:plain" class="hatena-fotolife"></p><p>ヘッダーやナビゲーション、サイドバー、フッターは外部ファイルに追い出した。ここらへんは「分割し、統治せよ（divide et impera）」<a href="#f2" name="fn2" title="http://www.kitashirakawa.jp/taro/2011/05/divide-et-impera/">*2</a>ってやつですな。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
Layout = &quot;~/Views/Shared/_Layout.cshtml&quot;;

Page.Title = &quot;Default&quot;;
}
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>Web ページの内容。<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
</pre><p>あとは、こんな感じで @RenderBody() で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%C0%A5%EA%A5%F3%A5%B0">レンダリング</a>する内容を記述すればいいというわけ。ページ固有のデータは、 dynamic 型の変数 Page に格納しておくことができる。</p>
<pre class="code lang-" data-lang="" data-unlink>@{
PageData[&#34;Color1&#34;] = &#34;Red&#34;;
PageData[&#34;Color2&#34;] = &#34;Blue&#34;;
} </pre><p>PageData （IDictionary<object, dynamic>）に入れてもいいっぽい。 Page.Title にいれた値は、 PageData["Title"] で取り出せるし、たぶんその逆も可なので好きなほうを使うといい。もしかしたらパフォーマンス的な違いがあるのかもしれないけれど。</p><p>あとはこれを適当に <a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a> で装飾すると、こんな感じになる。</p><p><img src="20120807045124.png" alt="f:id:daruyanagi:20120807045124p:plain" title="f:id:daruyanagi:20120807045124p:plain" class="hatena-fotolife"></p>

</div>
<div class="section">
<h3>これからの目標</h3>
<p>今見返してふと思ったのは、比較的簡単にテーマ機能なんかを実装できるなということ。ただデザインを変えたいがために、毎回一からこんなの作るのはアホらしい。</p><p>あと、 @RenderPage("_Footer.cshtml")  は @RenderFooter() などと記述できるとカッコいいな。「フッターはテーマフォルダ直下の“_Footer.cshtml”に書く」。なるべく規約ベースで。これも簡単にできそうだ。</p><p>汎用的な部分はガンガン外に追い出して、再利用できるといい。</p>

</div>
<div class="section">
<h3>まとめ</h3>
<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET%20MVC">ASP.NET MVC</a> はとてもすばらしい技術だと思うけれど、素人に毛の生えたレベルではどうもデカ過ぎる。その点、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Pages はちょうどいい。大規模なサービスを作ろうと思うとすぐぐちゃぐちゃになって破綻するけれど（そんな場合は <a class="keyword" href="http://d.hatena.ne.jp/keyword/MVC">MVC</a> パターンの力を借りるべきだ）、“Template.html”をひたすらコピペして新しい記事を作るような個人サイトならば、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Pages で十分なんだ。サーバーを <a class="keyword" href="http://d.hatena.ne.jp/keyword/IIS">IIS</a> にして、拡張子を html から cshtml にするだけでいい。たったこれだけで、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/C%23">C#</a> ＋ Razor を使ってキレイにコーディングできる。今から覚えるんだったら、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/PHP">PHP</a> より <a class="keyword" href="http://d.hatena.ne.jp/keyword/C%23">C#</a> ＋ Razor のほうが簡潔かつ安全でいいと思うし。</p><p>ドキュメントは、とりあえずこれを読んどけばいい。わしも全部は読んでないけれど、これの紙バージョンをもっていてたまに読んでいる。お盆休み中に、また復習してみようと思う。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/asp.net/gg193039">Razor &#x69CB;&#x6587;&#x3068; ASP.NET Web &#x30DA;&#x30FC;&#x30B8;</a></li>
</ul><p>あとは、しばやんのやる気を待つしかない。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20110714/1310652120">PHP &#x3068;&#x6BD4;&#x8F03;&#x3057;&#x3066;&#x899A;&#x3048;&#x308B; ASP.NET Web Pages (1) - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>また、おいおい Razor に関しては備忘録をかねて書いていきたいと思うかも。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">WebPageExecutingBase は The base class for all Plan9 files (_pagestart, _appstart, and regular pages) らしいのだけれど、 Plan9 ってなんぞ。今度調べよう</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">http://www.kitashirakawa.jp/taro/2011/05/divide-et-impera/</span></p>
</div>