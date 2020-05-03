---
date: 2013-09-18T02:47:58.0000000
draft: false
title: "「WebMatrix 2」で利用できるテクノロジー"
tags: ["WebMatrix"]
eyecatch: 20121202135815.png
---
<p>（289日前に書かれた下書きに加筆・修正を加えてみたけど公開レベルに達せず。でも、公開してみるなど）</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202135815.png" alt="f:id:daruyanagi:20121202135815p:plain" title="f:id:daruyanagi:20121202135815p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「WebMatrix 2」を起動してみました。新しい Web サイトを作成するには、“テンプレート”か“アプリ ギャラリー”を選択します。今回は“テンプレート”を選択してみました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202135036.png" alt="f:id:daruyanagi:20121202135036p:plain" title="f:id:daruyanagi:20121202135036p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「WebMatrix 2」では大きく分けて4つのテクノロジーが利用可能です。</p>

<div class="section">
<h3>静的な Web ページ</h3>

<div class="section">
<h4>HTML（＋CSS）</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/daruyanagi/20121202134414" class="hatena-fotolife" itemprop="url"><img src="20121202134414.jpg" alt="f:id:daruyanagi:20121202134414j:image:h78" title="f:id:daruyanagi:20121202134414j:image:h78" class="hatena-fotolife" style="height:78px" itemprop="image"></a></span></p><p>Web ページを作るには、クライアントサイド（おもに Web ブラウザー）で表示するための HTML のソースコード（およびスタイルシート、スクリプト）を出力しなければなりません。「WebMatrix 2」では、HTML を記述するための便利な機能が豊富に備わっています。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202140258.png" alt="f:id:daruyanagi:20121202140258p:plain" title="f:id:daruyanagi:20121202140258p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>後述する ASP.NET、PHP、Node.js も、要はサーバー側（サーバーサイド）で HTML を出力するためのものです。</p>

</div>
</div>
<div class="section">
<h3>動的な Web ページ（サーバーサイドで動的に出力）</h3>
<p>内容が変わらない、“ペライチ”（<a href="http://kotonoha.cc/no/142458">&#x30B3;&#x30C8;&#x30CE;&#x30CF; - &ldquo;&#x30DA;&#x30E9;&#x3044;&#x3061;&rdquo;&#x306E;&#x610F;&#x5473;&#x304C;&#x5206;&#x304B;&#x308B;</a> あんまり使われない？）の Web ページを作るのならば HTML だけでもいいのですが、</p>

<ul>
<li>データベースと連携した検索ページなど、内容を動的に変更させたい</li>
<li>テーマやサイドバー、ウィジェットなど、各 Web ページで共通の部分をひとまとめにしたい</li>
</ul><p>といった場合には、サーバー側で動的に HTML を生成する仕組みがあると便利です。WebMatrix では、そのために以下の3つのテクノロジーがサポートされています。</p>

<div class="section">
<h4>ASP.NET</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/daruyanagi/20121202134615" class="hatena-fotolife" itemprop="url"><img src="20121202134615.png" alt="f:id:daruyanagi:20121202134615p:image:h78" title="f:id:daruyanagi:20121202134615p:image:h78" class="hatena-fotolife" style="height:78px" itemprop="image"></a></span></p><p>ASP.NET は、.NET 言語（C# や Visual Basic）を利用して HTML を出力できます。</p><p>ASP.NET にも色々あるのですけど、「WebMatrix 2」ではおもにその一部である“ASP.NET Web Page 2”が利用できます<a href="#f1" name="fn1" title="ほかの技術――ASP.NET MVC など――も扱えないことはないですが、そのような複雑な技術を利用する場合はツールによるサポートが充実した「Visual Studio」を利用するべきでしょう">*1</a>。</p>

</div>
<div class="section">
<h4>PHP</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/daruyanagi/20121202134706" class="hatena-fotolife" itemprop="url"><img src="20121202134706.jpg" alt="f:id:daruyanagi:20121202134706j:image:h78" title="f:id:daruyanagi:20121202134706j:image:h78" class="hatena-fotolife" style="height:78px" itemprop="image"></a></span></p><p>PHP: Hypertext Preprocessor は、HTML を出力するためのプログラミング言語です。ちまたにある Web アプリケーションの多くは PHP で記述されているので、知っておくと便利かも。</p>

</div>
<div class="section">
<h4>Node.js</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><a href="http://f.hatena.ne.jp/daruyanagi/20121202134939" class="hatena-fotolife" itemprop="url"><img src="20121202134939.png" alt="f:id:daruyanagi:20121202134939p:image:h78" title="f:id:daruyanagi:20121202134939p:image:h78" class="hatena-fotolife" style="height:78px" itemprop="image"></a></span></p><p>Node.js は、クライアントサイドで使い慣れた JavaScript をサーバーサイドでも使ってしまえという、なんとも無謀で楽しそうなプロジェクトです。JavaScript が好きならば挑戦するのもありでしょう。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ほかの技術――ASP.NET MVC など――も扱えないことはないですが、そのような複雑な技術を利用する場合はツールによるサポートが充実した「Visual Studio」を利用するべきでしょう</span></p>
</div>