---
date: 2013-01-23T05:32:27.0000000
draft: false
title: "WebMatrix でほかの Web サイトのデザインをパク……じゃなくて、参考にさせていただく"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123042858.png" alt="f:id:daruyanagi:20130123042858p:plain" title="f:id:daruyanagi:20130123042858p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと調べ物をしていて、<a href="http://cereda.github.com/arara/">http://cereda.github.com/arara/</a> というサイトを見つけたのだけど、このデザインがシンプルながら結構いけているな、と思った。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123042916.png" alt="f:id:daruyanagi:20130123042916p:plain" title="f:id:daruyanagi:20130123042916p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>トリッキーなマークアップが少なくて、ちゃんとセマンティック。印刷時の見栄えも素直だ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123043104.png" alt="f:id:daruyanagi:20130123043104p:plain" title="f:id:daruyanagi:20130123043104p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123043110.png" alt="f:id:daruyanagi:20130123043110p:plain" title="f:id:daruyanagi:20130123043110p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なにより素晴らしいのはレスポンシブなところ。ブラウザーの横幅に応じて、デザインが適したものに変わる。</p><p>多少気になるところもないとは言えないけれど、これはぜひ<del>パクらせて</del>参考にさせていただきたい。</p>

<div class="section">
<h3>まずはダウンロード</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123043658.png" alt="f:id:daruyanagi:20130123043658p:plain" title="f:id:daruyanagi:20130123043658p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なにはともあれ、まずはダウンロードやな。“Web ページ、完全”で HTML とそのほかのリソース（CSS/JavaScriptや画像ファイルなど）をゲット。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123044157.png" alt="f:id:daruyanagi:20130123044157p:plain" title="f:id:daruyanagi:20130123044157p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に作業用のフォルダを作って、ダウンロードした HTML ファイルを移動させる。リソースが保存されたフォルダ（今回の場合“arara by cereda_files”フォルダ）は、NTFS の“代替データストリーム”という仕組みで関連付けられているので、HTML ファイルを移動させればそれについてくる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123044205.png" alt="f:id:daruyanagi:20130123044205p:plain" title="f:id:daruyanagi:20130123044205p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>作業フォルダの中身はこんな感じになっているはず。</p>

</div>
<div class="section">
<h3>作業フォルダを Web サイトとして開く</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123044332.png" alt="f:id:daruyanagi:20130123044332p:plain" title="f:id:daruyanagi:20130123044332p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>続いて、これを WebMatrix で開く。フォルダのコンテクストメニューから［Open as a Web Site with Microsoft WebMatrix］を選択しよう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123044635.png" alt="f:id:daruyanagi:20130123044635p:plain" title="f:id:daruyanagi:20130123044635p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これでやりたい放題だな！</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/12/07/125835">WebMatrix 2&#xFF1A;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x304B;&#x3089; Web &#x30B5;&#x30A4;&#x30C8;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/12/24/185100">WebMatrix 2&#xFF1A;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x304B;&#x3089; Web &#x30B5;&#x30A4;&#x30C8;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B;&#x5834;&#x5408;&#x306E;&#x6CE8;&#x610F;&#x70B9; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul>
</div>
<div class="section">
<h3>少し手を入れる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123045321.png" alt="f:id:daruyanagi:20130123045321p:plain" title="f:id:daruyanagi:20130123045321p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さすがにこのままホスティングサービスへアップロードして使うのはダサいので、少しだけ手を入れよう。</p><p>ASP.NET では、</p>

<ul>
<li>Scripts：JavaScript ファイルなどを格納</li>
<li>Content：CSS ファイルなどを格納</li>
</ul><p>するのが慣例となっているようなので、それにあわせてファイルの移動とリンクの書き換えを行う。テキストの検索・置換機能を活用するとよいよ。</p>

</div>
<div class="section">
<h3>ただの HTML ページから ASP.NET Web ページへ</h3>
<p>ここからは個人的なおすすめなのだけど、ASP.NET Web ページのテンプレートにしてしまえば、Web サイト全体のデザインを共通化できていいと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123051348.png" alt="f:id:daruyanagi:20130123051348p:plain" title="f:id:daruyanagi:20130123051348p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このテーマの場合、<section> で囲まれた部分が“本文”なので、それを切り取って“Default.cshtml”へ保存し、冒頭に以下のようなコードを追加してお行く。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Layout = <span class="synConstant">&quot;_SiteLayout.cshtml&quot;</span>;
}
</pre><p>残った“arara by cereda.htm”は“_SiteLayout.cshtml”へリネームし、切り取った <section> の中身を</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;section&gt;
@RenderBody()
&lt;/section&gt;
</pre><p>と書き換えておく。これでレイアウトと内容の分離が完成した。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123052050.png" alt="f:id:daruyanagi:20130123052050p:plain" title="f:id:daruyanagi:20130123052050p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ためしに Test.cshtml をこんな感じに作って、<a href="http://***/Test">http://***/Test</a> を表示させれば、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123052120.png" alt="f:id:daruyanagi:20130123052120p:plain" title="f:id:daruyanagi:20130123052120p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こんな感じになる。 </p><p>ちなみに、なぜ“_SiteLayout.cshtml”などとファイル名の先頭に“_”を入れているのかについては、以下のリンクを参考にされたい。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/07/06/174414">WebMatrix &#x306E;&#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul>
<div class="section">
<h4>ASP.NET Web Pages v2 へアップデート</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123050039.png" alt="f:id:daruyanagi:20130123050039p:plain" title="f:id:daruyanagi:20130123050039p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>話は前後するけど、サイトの設定で ASP.NET Web Pages を v2 にアップデートしておくと少し幸せになれる。たとえば、</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/styles.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/pygment_trac.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/scale.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
</pre><p>という記法が使えるようになる。v1 のころは“href="Url.Content("~/Content/styles.css")"”と書いていたと思うのだけど、v2 では“Url.Content()”が省略できるようになっているんだね。</p><p>“~（チルダ）”は Web サイトのルートを表す。たとえば、ルートが <a href="http://sample.com/sample/">http://sample.com/sample/</a> だったら、~/Content/styles.css は <a href="http://sample.com/sample/Content/styles.css">http://sample.com/sample/Content/styles.css</a> になる。</p>

</div>
</div>
<div class="section">
<h3>魔改造の結果</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130123052332.png" alt="f:id:daruyanagi:20130123052332p:plain" title="f:id:daruyanagi:20130123052332p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>自分の場合は、ちょっとメトロ（死）風の色使いにしてみた。そんなに大きな改修はしていないのだけど、オリジナルとはまったく雰囲気が違うでしょ？</p>

</div>
<div class="section">
<h3>オチ。</h3>
<p>ちなみに、わざわざこんなことしないでも <a href="https://github.com/sodabrew/theme-dinky">GitHub - sodabrew/theme-dinky: The Dinky theme for GitHub pages, ported to Jekyll Bootstrap.</a> でテーマファイルは配布されている。使わせてもらう場合は、クレジットぐらい掲載するといいんじゃないかな。</p>

</div>