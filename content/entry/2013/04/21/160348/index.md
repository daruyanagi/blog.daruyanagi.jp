---
date: 2013-04-21T16:03:48.0000000
draft: false
title: "WebMatrix 3: フィードの購読者数を取得する（3: CSS 編）"
tags: ["WebMatrix", "CSS"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130421/20130421155340.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421155340.png" alt="f:id:daruyanagi:20130421155340p:plain" title="f:id:daruyanagi:20130421155340p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/04/21/154036">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;2: JavaScript &#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で忘れていたんだけれど、これ、CSS を当てないとすごくさびしい。今回はタイル状にレイアウトしてみたよ。</p>


<div class="section">
<h3>LESS のソース</h3>
<p>~/Content/SocialButtons.less を記述。WebMatrix には OrangeBitsCompiler と呼ばれる LESS コンパイラーが拡張機能として提供されているので、LESS を書けばそのまま CSS にコンパイルできる。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/15/161932">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/09/09/172243">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>役に立つかどうか知らんけど、過去記事も参照してみてね （ゝω・）vｷｬﾋﾟ</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synIdentifier">.social-button</span> <span class="synIdentifier">{</span>

span <span class="synIdentifier">{</span>
<span class="synType">display</span>: <span class="synConstant">inline-block</span>;
<span class="synType">position</span>: <span class="synConstant">relative</span>;
<span class="synType">width</span>: <span class="synConstant">64px</span>;
<span class="synType">height</span>: <span class="synConstant">64px</span>;
<span class="synType">margin</span>: <span class="synConstant">6px</span>;
<span class="synType">padding</span>: <span class="synConstant">6px</span>;
<span class="synType">color</span>: <span class="synConstant">#fff</span>;

a <span class="synIdentifier">{</span>
<span class="synType">position</span>: <span class="synConstant">absolute</span>;

<span class="synType">font-family</span>: Consolas<span class="synSpecial">,</span> <span class="synConstant">monospace</span>;
<span class="synType">color</span>: <span class="synConstant">#fff</span>;
<span class="synType">text-decoration</span>: <span class="synConstant">none</span>;
<span class="synIdentifier">}</span>

<span class="synStatement">a</span><span class="synIdentifier">.service-name</span> <span class="synIdentifier">{</span>
<span class="synType">display</span>: <span class="synConstant">inline-block</span>;

<span class="synType">height</span>: <span class="synConstant">64px</span>;
<span class="synType">width</span>: <span class="synConstant">64px</span>;

<span class="synType">top</span>: <span class="synConstant">6px</span>;
<span class="synType">left</span>: <span class="synConstant">6px</span>;

<span class="synType">font-size</span>: <span class="synConstant">0.8em</span>;
<span class="synIdentifier">}</span>

<span class="synStatement">a</span><span class="synIdentifier">.count</span> <span class="synIdentifier">{</span>
<span class="synType">bottom</span>: <span class="synConstant">12px</span>;
<span class="synType">right</span>: <span class="synConstant">12px</span>;
<span class="synType">font-size</span>: <span class="synConstant">1.25em</span>;
<span class="synIdentifier">}</span>
<span class="synError">}</span>

<span class="synIdentifier">.twitter</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#0094ff</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">.facebook</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#3B5998</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">.hatena</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#557BE8</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">.feed</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#E35427</span>;
<span class="synIdentifier">}</span>
<span class="synError">}</span>
</pre>
</div>
<div class="section">
<h3>CSS のソースコード</h3>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synIdentifier">.social-button</span> <span class="synStatement">span</span> <span class="synIdentifier">{</span>
<span class="synType">display</span>: <span class="synConstant">inline-block</span>;
<span class="synType">position</span>: <span class="synConstant">relative</span>;
<span class="synType">width</span>: <span class="synConstant">64px</span>;
<span class="synType">height</span>: <span class="synConstant">64px</span>;
<span class="synType">margin</span>: <span class="synConstant">6px</span>;
<span class="synType">padding</span>: <span class="synConstant">6px</span>;
<span class="synType">color</span>: <span class="synConstant">#fff</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synStatement">span</span> <span class="synStatement">a</span> <span class="synIdentifier">{</span>
<span class="synType">position</span>: <span class="synConstant">absolute</span>;
<span class="synType">font-family</span>: Consolas<span class="synSpecial">,</span> <span class="synConstant">monospace</span>;
<span class="synType">color</span>: <span class="synConstant">#fff</span>;
<span class="synType">text-decoration</span>: <span class="synConstant">none</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synStatement">span</span> <span class="synStatement">a</span><span class="synIdentifier">.service-name</span> <span class="synIdentifier">{</span>
<span class="synType">display</span>: <span class="synConstant">inline-block</span>;
<span class="synType">height</span>: <span class="synConstant">64px</span>;
<span class="synType">width</span>: <span class="synConstant">64px</span>;
<span class="synType">top</span>: <span class="synConstant">6px</span>;
<span class="synType">left</span>: <span class="synConstant">6px</span>;
<span class="synType">font-size</span>: <span class="synConstant">0.8em</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synStatement">span</span> <span class="synStatement">a</span><span class="synIdentifier">.count</span> <span class="synIdentifier">{</span>
<span class="synType">bottom</span>: <span class="synConstant">12px</span>;
<span class="synType">right</span>: <span class="synConstant">12px</span>;
<span class="synType">font-size</span>: <span class="synConstant">1.25em</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synIdentifier">.twitter</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#0094ff</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synIdentifier">.facebook</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#3B5998</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synIdentifier">.hatena</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#557BE8</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">.social-button</span> <span class="synIdentifier">.feed</span> <span class="synIdentifier">{</span>
<span class="synType">background-color</span>: <span class="synConstant">#E35427</span>;
<span class="synIdentifier">}</span>
</pre><p>ネストが全部ばらされてるけど、初めからこれを書くのはしんどいよね。</p><p>マージンやパディング、色を変数として定義しておくと、さらにのちのちのメンテナンス性が上がると思う。</p><p>WebMatrix は JavaScript も CSS もバッチリだよ！　という一連のお話でした。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/20/224501">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;1&#xFF1A;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30B5;&#x30A4;&#x30C9;&#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/21/154036">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;2: JavaScript &#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/21/160348">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;3: CSS &#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>JavaScript の部分は TypeScript にも挑戦してみたい。Web 標準の方でもウィジェットをサポートする動きがあるみたいなので、ちゃんと追っかけていかないとね！</p>

</div>