---
date: 2014-06-24T21:54:37.0000000
draft: false
title: "Google の「Web Starter Kit」を WebMatrix で"
tags: ["WebMatrix"]
eyecatch: 20140624213306.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624213306.png" alt="f:id:daruyanagi:20140624213306p:plain" title="f:id:daruyanagi:20140624213306p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Twitter で小耳にはさんだ「<a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a>」を少し試してみました（別に WebMatrix で、じゃなくていいんだが）。いわゆるボイラープレート（テンプレみたいなもん）ですね。</p>

<ul>
<li>Mobile-optimized HTML boilerplate</li>
<li>Responsive multi-device layout</li>
<li>Visual component style guide</li>
<li>gulp.js build tooling (optional)</li>
<li>LiveReload</li>
<li>Cross-device synchronization of clicks, scrolls, navigation, and form-filling</li>
<li>Image optimization</li>
<li>JavaScript minification and optimization</li>
<li>CSS optimization</li>
<li>HTML minification</li>
<li>PageSpeed performance reporting</li>
<li>CSS autoprefixing</li>
</ul><p>というのが特徴らしい。ブラウザーサポートはこんな感じ。</p>

<ul>
<li>IE10, IE11, IE Mobile 10</li>
<li>FF 30, 31</li>
<li>Chrome 34, 35</li>
<li>Safari 7, 8</li>
<li>Opera 23, 24</li>
<li>iOS Safari 7, 8</li>
<li>Opera Coast</li>
<li>Android / Chrome 4.4, 4.4.3</li>
<li>Blackberry 1.0</li>
</ul><p>IE11 で少しずれてるところがあった気もするけどキニシナイ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624213625.png" alt="f:id:daruyanagi:20140624213625p:plain" title="f:id:daruyanagi:20140624213625p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっそくダウンロードし、アーカイブを展開しました。よくわからんのがぐちゃぐちゃ入ってる（<a href="http://gulpjs.com/">gulp.js - the streaming build system</a> のためのファイルなんだろうか？）けど、メインは app フォルダの中身みたい。このフォルダをさっそく［Microsoft WebMatrix で Web サイトとして開く］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624214238.png" alt="f:id:daruyanagi:20140624214238p:plain" title="f:id:daruyanagi:20140624214238p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>スクリプトはメニュー関連のが最小限度。スタイルシートは SCSS で書かれていて、CSS にコンパイルされています。ほかに Web フォントやらアイコンやらが少し。</p><p>basic.html は HTML5 Boilerplate CSS を読み込んだだけのシンプルなスタイル。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!-- build:css styles/components/main.min.css --&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;styles/h5bp.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synComment">&lt;!-- endbuild --&gt;</span>
</pre><p>inde.html はいろいろ読み込んで Google デザインっぽくしたやつ。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!-- build:css styles/components/main.min.css --&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;styles/h5bp.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;styles/components/components.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;styles/main.css&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synComment">&lt;!-- endbuild --&gt;</span>
</pre><p>とりあえず実行。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624214811.png" alt="f:id:daruyanagi:20140624214811p:plain" title="f:id:daruyanagi:20140624214811p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Google っぽい。日本語フォントで使うなら、少しいろいろいじった方がバランスがいいかもしれないかなー。そういうセンスないからよくわかんないけど。</p><p>スタイルガイドものぞいてみました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624214745.png" alt="f:id:daruyanagi:20140624214745p:plain" title="f:id:daruyanagi:20140624214745p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ボタン。とっても……Google っぽいです……。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624214917.png" alt="f:id:daruyanagi:20140624214917p:plain" title="f:id:daruyanagi:20140624214917p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>グリッド。ここらへんは Bootstrap とかでもお馴染み。ざっとしか見てないけど、2段～4段組みまで割りと柔軟にレイアウトできるみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624215143.png" alt="f:id:daruyanagi:20140624215143p:plain" title="f:id:daruyanagi:20140624215143p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>カラー。色のセンスないので、こういうところだけでも真似してみたい。前景と背景だけ色決めて、ほかはアクセントカラーとその薄いバージョンをうまく使う感じで……。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624215243.png" alt="f:id:daruyanagi:20140624215243p:plain" title="f:id:daruyanagi:20140624215243p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624215247.png" alt="f:id:daruyanagi:20140624215247p:plain" title="f:id:daruyanagi:20140624215247p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20140624215251.png" alt="f:id:daruyanagi:20140624215251p:plain" title="f:id:daruyanagi:20140624215251p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あと、こういう機能紹介っぽい感じのページもいいなぁと思った。まるまる使うと Google 臭がスゴいのであんまり使わない気がするけれど、エッセンスだけでも取り込みたい。</p>
