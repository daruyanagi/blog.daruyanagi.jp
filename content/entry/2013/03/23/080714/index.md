---
date: 2013-03-23T08:07:14.0000000
draft: false
title: "WebMatrix 3 Preview：TypeScript のサポート"
tags: ["WebMatrix", "TypeScript"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323075832.png" alt="f:id:daruyanagi:20130323075832p:plain" title="f:id:daruyanagi:20130323075832p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<blockquote cite="http://www.microsoft.com/web/post/webmatrix-3-preview-release-notes?category=Documentation">
<p>Hugely improved remote editing experience with great code completion and colorization for PHP, ASP.NET as well as Node.js. Support for TypeScript is now included.</p>

<cite><a href="http://www.microsoft.com/web/post/webmatrix-3-preview-release-notes?category=Documentation">WebMatrix 3 Preview Release Notes</a></cite>
</blockquote>
<p>確かに、追加できるファイルの形式に TypeScript（*.ts）が追加されている。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323075937.png" alt="f:id:daruyanagi:20130323075937p:plain" title="f:id:daruyanagi:20130323075937p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ただ、これは構文色分けのサポートだけみたい。入力補完もコンパイルもできない。</p><p>まぁ、以前のバージョンでは構文色分けもできなかった<a href="#f1" name="fn1" title="http://www.forest.impress.co.jp/docs/review/20121017_566289.html">*1</a>わけで、それだけでもだいぶうれしいところではある。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323080117.png" alt="f:id:daruyanagi:20130323080117p:plain" title="f:id:daruyanagi:20130323080117p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なお、TS ファイルのコンパイルを行うには、今までどおり拡張機能「TypeScript Tools」（<a href="http://extensions.webmatrix.com/packages/TypeScript4WebMatrix">WebMatrix Gallery</a>）が必要。拡張機能ボタンからインストールしてくれたまい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323080306.png" alt="f:id:daruyanagi:20130323080306p:plain" title="f:id:daruyanagi:20130323080306p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは、コンパイルするとできる JS ファイルを……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323080232.png" alt="f:id:daruyanagi:20130323080232p:plain" title="f:id:daruyanagi:20130323080232p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>HTML から呼び出せば……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323080236.png" alt="f:id:daruyanagi:20130323080236p:plain" title="f:id:daruyanagi:20130323080236p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちゃんと使える。</p><p>おれ……TypeScript が Generics に対応したら本気出すんだ……。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">http://www.forest.impress.co.jp/docs/review/20121017_566289.html</span></p>
</div>