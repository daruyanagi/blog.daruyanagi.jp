---
date: 2013-04-06T23:22:47.0000000
draft: false
title: "自然数について、アホなりに考えてみた"
tags: ["数学"]
eyecatch: 
---

<blockquote cite="http://ja.wikipedia.org/wiki/%E3%83%9A%E3%82%A2%E3%83%8E%E3%81%AE%E5%85%AC%E7%90%86">

<ol>
<li>自然数 0 が存在する。</li>
<li>任意の自然数 a にはその後者 (successor)、suc(a) が存在する（suc(a) は a + 1 の "意味"）。</li>
<li>0 はいかなる自然数の後者でもない（0 より前の自然数は存在しない）。</li>
<li>異なる自然数は異なる後者を持つ：a ≠ b のとき suc(a) ≠ suc(b) となる。</li>
<li>0 がある性質を満たし、a がある性質を満たせばその後者 suc(a) もその性質を満たすとき、すべての自然数はその性質を満たす。</li>
</ol><p>5番目の公理は、数学的帰納法の原理である。 また、後述するとおり集合論における標準的な構成では、0 を空集合として定義する。</p>

<cite><a href="http://ja.wikipedia.org/wiki/%E3%83%9A%E3%82%A2%E3%83%8E%E3%81%AE%E5%85%AC%E7%90%86">&#x30DA;&#x30A2;&#x30CE;&#x306E;&#x516C;&#x7406; - Wikipedia</a></cite>
</blockquote>
<p>論理的に考えるって、ホント難しいんだなぁ……。</p><p>でも、個人的に納得いっていない部分がある。たとえば、suc() というのは“自然数”という概念に従属すべきなんじゃないかなぁ、って思う。“自然数”から離れた、宙ぶらりんなものとしてある suc() って、あんまり想像がつかない。これって整数でも有理数でも無理数でも使える“動詞”（手続き）なのかなぁ？　まぁ、“動詞”と捉えているのがおかしいのだろうけれど。</p><p>簡単に言うと、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>suc(suc(suc(suc(suc(<span class="synConstant">0</span>))))) = <span class="synConstant">5</span>
</pre><p>って書くよりも、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>N.root = <span class="synConstant">0</span>

N.suc() =&gt; (n) =&gt; { n + <span class="synConstant">1</span> }

<span class="synConstant">0.</span>suc().suc().suc().suc().suc() = <span class="synConstant">5</span>
</pre><p>って書く方が好き。N （自然数）という概念（クラス）と、そのインスタンス（0, 1, 2, ...）は分けて考えるべきだし、逆に言えば、そういった性質をもつインスタンスを N という概念でまとめているだけだと思う。</p><p>でも、1 を出したのは少し先走り過ぎ。これまで、N という概念に</p>

<ul>
<li>N.root（= 0）</li>
<li>N.suc()</li>
<li>1</li>
</ul><p>を前提としていたけれど、実は 1 なんか前提としなくてよくて、</p>

<blockquote>
<p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%5Cforall%20x%20%28%20x.suc%28%29%20-%20x%20%3D%201%20%29" alt="\forall x ( x.suc() - x = 1 )"/></p>

</blockquote>
<p>と定義できる（x > 0）。だから、大事なのは</p>

<ul>
<li>N.root（= 0）</li>
<li>N.suc()（単位 1）</li>
</ul><p>だけ。「自然数とは、.root（0 のこと） から始まって、.suc() する（1 足していく）ことで表せるもの」で、僕らが「値」と呼んでいるのは「0 からそれに達するまでに .suc() する回数」ということだね。すごくシンプルになった。これを広げていけば、幅 p の .suc(p) をもつシステム P なんかも考えられるのかもしれない。</p><p>あー、でも、集合論との接続ができないのか。</p>
