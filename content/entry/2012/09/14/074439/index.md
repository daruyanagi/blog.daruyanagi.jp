---
date: 2012-09-14T07:44:39.0000000
draft: false
title: "WebMatrix 2 でレスポンシブな CSS グリッドを作ってみる"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120914073223.png" alt="f:id:daruyanagi:20120914073223p:plain" title="f:id:daruyanagi:20120914073223p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>WebMatrix 2 は iPhone での見栄えも簡単にチェックできてなかなかいい。</p>

<div class="section">
<h3>CSS グリッド</h3>
<p>最近、Twitter Bootstrap は大げさすぎるなぁ、もうちょっと軽量のグリッドシステムないかな、と思っていたのだけど、こういうのを見つけた。</p>

<ul>
<li><a href="http://webdesignrecipes.com/css-grid-system-layout/">http://webdesignrecipes.com/css-grid-system-layout/</a> </li>
<li><a href="http://jsfiddle.net/ernestohs/nQpSj/">Complex Grid Example - JSFiddle</a></li>
</ul><p>いい感じかもしれない。</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synIdentifier">.container</span> <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">940px</span>; <span class="synType">margin</span>: <span class="synConstant">0</span> <span class="synConstant">auto</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid1</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid2</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid3</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid4</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid5</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid6</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid7</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid8</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid9</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid10</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid11</span> <span class="synIdentifier">{</span>
<span class="synType">float</span>: <span class="synConstant">left</span>;
<span class="synType">display</span>: <span class="synConstant">inline</span>;
<span class="synType">margin-left</span>: <span class="synConstant">20px</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid1</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">60px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid2</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">140px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid3</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">220px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid4</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">300px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid5</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">380px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid6</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">460px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid7</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">540px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid8</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">620px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid9</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">700px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid10</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">780px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid11</span> <span class="synIdentifier">{</span><span class="synType">width</span>: <span class="synConstant">860px</span>;<span class="synIdentifier">}</span>
<span class="synIdentifier">.first</span> <span class="synIdentifier">{</span><span class="synType">margin-left</span>: <span class="synConstant">0</span>;<span class="synType">clear</span>: <span class="synConstant">left</span>;<span class="synIdentifier">}</span>

<span class="synComment">/* clearfix */</span>
<span class="synIdentifier">.clearfix</span>:<span class="synPreProc">after</span> <span class="synIdentifier">{</span>
<span class="synType">visibility</span>: <span class="synConstant">hidden</span>;
<span class="synType">display</span>: <span class="synConstant">block</span>;
<span class="synType">font-size</span>: <span class="synConstant">0</span>;
<span class="synType">content</span>: <span class="synConstant">&quot; &quot;</span>;
<span class="synType">clear</span>: <span class="synConstant">both</span>;
<span class="synType">height</span>: <span class="synConstant">0</span>;
<span class="synIdentifier">}</span>
<span class="synComment">/* IE6 */</span>
<span class="synStatement">*</span> <span class="synStatement">html</span> <span class="synIdentifier">.clearfix</span> <span class="synIdentifier">{</span> <span class="synType">zoom</span>: <span class="synConstant">1</span>;<span class="synIdentifier">}</span>
<span class="synComment">/* IE7 */</span>
<span class="synStatement">*</span>:<span class="synPreProc">first-child</span><span class="synSpecial">+</span><span class="synStatement">html</span> <span class="synIdentifier">.clearfix</span> <span class="synIdentifier">{</span><span class="synType">zoom</span>: <span class="synConstant">1</span>;<span class="synIdentifier">}</span>
</pre><p>で、grid* で幅を指定して、先頭になるグリッドに .first をつければいいみたい。ネストもできるよ。あったまいい！</p>

</div>
<div class="section">
<h3>More responsible！</h3>
<p>でも、それだと一つ問題がある。レスポンシブじゃない。今回はブラウザー幅に応じて並び替えもやってほしいと思っていたのだけれど、このやり方だと先頭になるグリッドを決めなきゃいけない。でも、ブラウザー幅に応じて並び替えが前提だと、事前にどのグリッドが先頭であるかを指定することができない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120914072338.png" alt="f:id:daruyanagi:20120914072338p:plain" title="f:id:daruyanagi:20120914072338p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>640px ぐらいの幅を……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120914072341.png" alt="f:id:daruyanagi:20120914072341p:plain" title="f:id:daruyanagi:20120914072341p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと大きく……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120914072345.png" alt="f:id:daruyanagi:20120914072345p:plain" title="f:id:daruyanagi:20120914072345p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>もっと大きく！</p><p>というわけで、少しだけ手直しをした（ダミーイメージには <a href="https://blog.daruyanagi.jp/entry/2012/09/11/070914">DummyImage 1.0.0 - &#x3060;&#x308B;&#x308D;&#x3050;</a> を使っています（ステマ））。</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synIdentifier">.container</span> <span class="synIdentifier">{</span>
<span class="synType">overflow</span>: <span class="synConstant">auto</span>;
<span class="synType">margin</span>: <span class="synConstant">0</span> <span class="synConstant">auto</span> <span class="synConstant">2em</span> <span class="synConstant">auto</span>;

<span class="synComment">*</span> <span class="synIdentifier">{</span>
<span class="synType">max-width</span>: <span class="synConstant">100%</span>;  // &lt;-- 画像とかがはみ出ないように
<span class="synIdentifier">}</span>
<span class="synError">}</span>

<span class="synIdentifier">.grid1</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid2</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid3</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid4</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid5</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid6</span><span class="synSpecial">,</span>
<span class="synIdentifier">.grid7</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid8</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid9</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid10</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid11</span><span class="synSpecial">,</span> <span class="synIdentifier">.grid12</span> <span class="synIdentifier">{</span>
<span class="synType">float</span>: <span class="synConstant">left</span>;
<span class="synType">display</span>: <span class="synConstant">inline</span>;
<span class="synType">margin-left</span>: <span class="synConstant">20px</span>;
<span class="synType">position</span>: <span class="synConstant">relative</span>; // &lt;-- 追加
<span class="synType">left</span>: <span class="synConstant">-20px</span>;        // &lt;-- 追加
<span class="synIdentifier">}</span>
<span class="synIdentifier">.grid1</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">60px</span>;  <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid2</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">140px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid3</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">220px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid4</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">300px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid5</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">380px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid6</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">460px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid7</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">540px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid8</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">620px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid9</span>  <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">700px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid10</span> <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">780px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid11</span> <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">860px</span>; <span class="synIdentifier">}</span>
<span class="synIdentifier">.grid12</span> <span class="synIdentifier">{</span> <span class="synType">width</span>: <span class="synConstant">940px</span>; <span class="synIdentifier">}</span> // &lt;-- 追加

<span class="synComment">/*.first {margin-left: 0;clear: left;}*/</span>

<span class="synIdentifier">.claerfix</span> <span class="synIdentifier">{</span>
&amp;:after {
visibility: <span class="synConstant">hidden</span>;
<span class="synType">display</span>: <span class="synConstant">block</span>;
<span class="synType">font-size</span>: <span class="synConstant">0</span>;
<span class="synType">content</span>: <span class="synConstant">&quot; &quot;</span>;
<span class="synType">clear</span>: <span class="synConstant">both</span>;
<span class="synType">height</span>: <span class="synConstant">0</span>;
<span class="synIdentifier">}</span>
<span class="synComment">/* IE6 */</span>
<span class="synStatement">*</span> <span class="synStatement">html</span> &amp; <span class="synIdentifier">{</span>
<span class="synType">zoom</span>: <span class="synConstant">1</span>;
<span class="synIdentifier">}</span>
<span class="synComment">/* IE7 */</span>
<span class="synStatement">*</span>:<span class="synPreProc">first-child</span> <span class="synSpecial">+</span> <span class="synStatement">html</span> &amp; <span class="synIdentifier">{</span>
<span class="synType">zoom</span>: <span class="synConstant">1</span>;
<span class="synIdentifier">}</span>
<span class="synError">}</span>
</pre><p>全体に左マージンをつけて、その分左にずらす。これで first は要らなくなった（というか使えなくなった）。 clearfix も LESS で書いておけば意味的にまとめられていい感じ。</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synComment">@media</span><span class="synPreProc"> (</span><span class="synType">min-width</span><span class="synPreProc">: </span><span class="synConstant">981px</span><span class="synPreProc">) </span><span class="synIdentifier">{</span>
<span class="synIdentifier">.container</span> <span class="synIdentifier">{</span>
<span class="synType">width</span>: <span class="synConstant">960px</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>

<span class="synComment">@media</span><span class="synPreProc"> (</span><span class="synType">max-width</span><span class="synPreProc">: </span><span class="synConstant">980px</span><span class="synPreProc">) </span><span class="synIdentifier">{</span>
<span class="synIdentifier">.container</span> <span class="synIdentifier">{</span>
<span class="synType">width</span>: <span class="synConstant">640px</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>

<span class="synComment">@media</span><span class="synPreProc"> (</span><span class="synType">max-width</span><span class="synPreProc">: </span><span class="synConstant">640px</span><span class="synPreProc">) </span><span class="synIdentifier">{</span>
<span class="synIdentifier">.container</span> <span class="synIdentifier">{</span>
<span class="synType">width</span>: <span class="synConstant">300px</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>
</pre><p>ここら辺は適当だけど、あとは MediaQuery でコンテナの幅を変えてやると、さっきみたいなレスポンシブなデザインになる。</p><p>WebMatrix 2 の LESS とモバイルテスト機能があれば、こういう CSS の作成も結構楽になる！　Razor や Node.js がわかんない人でも、WebMatrix は便利やな（ステマ）。あとはこういうのをどんどん NuGet にしてもらえれば……Web 開発はバラ色や！</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/15/161932">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/09/09/172243">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/07/16/011825">&#x300C;WebMatrix 2&#x300D;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30C7;&#x30FC;&#x30C8; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul>
</div>