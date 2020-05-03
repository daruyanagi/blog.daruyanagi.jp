---
date: 2013-01-05T00:24:15.0000000
draft: false
title: "述語論理"
tags: ["論理学"]
eyecatch: 
---

<div class="section">
<h3>すべての、任意の</h3>
<p><b>全称記号（ぜんしょうきごう、universal quantifier）</b>とは、数理論理学において「全ての」（全称量化）を表す記号である。通常「∀」と表記され、全称量化子（ぜんしょうりょうかし）、全称限量子（ぜんしょうげんりょうし）、全称限定子（ぜんしょうげんていし）、普遍量化子（ふへんりょうかし）、普通限定子（ふつうげんていし）などとも呼ばれる。</p>

<blockquote>
<p><img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cforall%20x" alt="\forall x"/>（すべての x について、任意の x について）</p>

</blockquote>

<ul>
<li><a href="http://ja.wikipedia.org/wiki/%E5%85%A8%E7%A7%B0%E8%A8%98%E5%8F%B7">&#x5168;&#x79F0;&#x8A18;&#x53F7; - Wikipedia</a></li>
</ul>
<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink><span class="synSpecial">[</span>tex:<span class="synStatement">\forall</span> x<span class="synSpecial">]</span>
</pre>
</div>
</div>
<div class="section">
<h3>ある、適当な</h3>
<p><b>存在記号（そんざいきごう、existential quantifier）</b>とは、数理論理学（特に述語論理）において、少なくとも1つのメンバーが述語の特性や関係を満たすことを表す記号である。通常「∃」と表記され、存在量化子（そんざいりょうかし）、存在限量子（そんざいげんりょうし）、存在限定子（そんざいげんていし）などとも呼ばれる。</p>

<blockquote>
<p><img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cexists%20x" alt="\exists x"/>（ある x について、適当な x について）</p>

</blockquote>
<p><img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cexists%20x%28P%28x%29%29" alt="\exists x(P(x))"/> で、「P という条件に当てはまる x が存在する」ってな感じかな。</p>

<ul>
<li><a href="http://ja.wikipedia.org/wiki/%E5%AD%98%E5%9C%A8%E8%A8%98%E5%8F%B7">&#x5B58;&#x5728;&#x8A18;&#x53F7; - Wikipedia</a></li>
</ul>
<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink><span class="synSpecial">[</span>tex:<span class="synStatement">\exists</span> x<span class="synSpecial">]</span>
</pre><p><img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cforall" alt="\forall"/> や <img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cexists" alt="\exists"/> で指示されている変数のことを<b>束縛変数（bound variable）</b>と呼び、そうでないものを<b>自由変数（free variable）</b>と呼ぶ。</p>

</div>
</div>
<div class="section">
<h3>述語</h3>
<p>そもそも述語とは、形式論理学における命題<AはBである>のB（Aについて語る事柄）に当たるものを、アリストテレスがギリシア語でκατεγορωυμενον katēgoroumenonと表現したことにさかのぼるという。これが、その後ラテン語でpraedictumと表現され、論理学及び文法の用語として次第に定着、今日のヨーロッパ諸言語でも継承され（例えば英語predicate）、また他の言語でも用いられる様になり、日本でも述語と訳してきたものである（形式論理学では賓辞とも、文法では述部とも訳す）。</p>

<blockquote>
<p><img src="https://chart.apis.google.com/chart?cht=tx&chl=P%28x%29" alt="P(x)"/> （たとえば、「～は素数である」「～は3歳だ」など）</p>

</blockquote>

<ul>
<li><a href="http://ja.wikipedia.org/wiki/%E8%BF%B0%E8%AA%9E">&#x8FF0;&#x8A9E; - Wikipedia</a></li>
</ul>
<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink><span class="synSpecial">[</span>tex:P(x)<span class="synSpecial">]</span>
</pre><p>述語はその引数（？）の数に応じて、性質が決まる。</p>

<ul>
<li>0：命題</li>
<li>1：性質</li>
<li>n：関係</li>
</ul><p>述語論理は、命題論理を含んでいる。</p>

</div>
</div>
<div class="section">
<h3>述語論理</h3>
<p>以上の記号と、 <a href="https://blog.daruyanagi.jp/entry/2012/12/25/030702">&#x8AD6;&#x7406;&#x6F14;&#x7B97;&#x5B50; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で出てきた <img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cvee%20%5Cwedge%20%5Cneg%20%5Cto%20%5Cbot" alt="\vee \wedge \neg \to \bot"/> を組み合わせて組み立てる。</p>

<div class="section">
<h4>例：ゴールドバッハ予想</h4>
<p>「4以上のすべての偶数は、2つの素数の和で表せる」</p><p>ここでは以下の述語を仮定する。</p>

<ul>
<li><img src="https://chart.apis.google.com/chart?cht=tx&chl=G_4%28x%29" alt="G_4(x)"/>：x は4以上である</li>
<li><img src="https://chart.apis.google.com/chart?cht=tx&chl=E%28x%29" alt="E(x)"/>：x は偶数である</li>
<li><img src="https://chart.apis.google.com/chart?cht=tx&chl=P%28x%29" alt="P(x)"/>：x は素数である</li>
</ul>
<blockquote>
<p><img src="https://chart.apis.google.com/chart?cht=tx&chl=%5Cforall%20n%20%5Cexists%20x%20%5Cexists%20y%20%5C%7B%28G_4%28n%29%20%5Cwedge%20E%28n%29%29%5Cto%28P%28x%29%20%5Cwedge%20P%28y%29%20%5Cwedge%20%28n%3Dx%2By%29%29%20%5C%7D" alt="\forall n \exists x \exists y \{(G_4(n) \wedge E(n))\to(P(x) \wedge P(y) \wedge (n=x+y)) \}"/></p>

</blockquote>
<pre class="code lang-tex" data-lang="tex" data-unlink><span class="synSpecial">[</span>tex:<span class="synStatement">\forall</span> n <span class="synStatement">\exists</span> x <span class="synStatement">\exists</span> y <span class="synSpecial">\{</span>(G<span class="synError">_</span>4(n) <span class="synStatement">\wedge</span> E(n))<span class="synStatement">\to</span>(P(x) <span class="synStatement">\wedge</span> P(y) <span class="synStatement">\wedge</span> (n=x+y)) <span class="synSpecial">\}]</span>
</pre><p>このように、述語論理さえ使えば通常の数学はすべて表現できる。</p><p>次は導出図やなぁ……</p>

</div>
</div>