---
date: 2012-12-25T03:07:02.0000000
draft: false
title: "論理演算子"
tags: ["論理学"]
eyecatch: 
---
<p>ちなみに、<img src="http://chart.apis.google.com/chart?cht=tx&chl=p" alt="p"/> や <img src="http://chart.apis.google.com/chart?cht=tx&chl=q" alt="q"/> は特定のできごとや主張を表しており、<b>命題変数</b>と呼ばれる。<b>論理演算子</b>は複数の命題変数を接続し、<b>論理式</b>を作る。論理演算子の基本は以下の4つで、これに矛盾（<img src="http://chart.apis.google.com/chart?cht=tx&chl=%5Cbot" alt="\bot"/>）を加えた5つに命題変数を組み合わせたものをとくに<b>命題論理</b>と呼ぶ。</p>

<div class="section">
<h3>論理積：p かつ q（である）</h3>
<p>数理論理学において論理積（ろんりせき）とは、与えられた複数の命題のいずれもが例外なく真であることを示す論理演算である。合接（ごうせつ）、連言（れんげん、れんごん）とも呼び、ANDとよく表す。</p><p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%20p%20%5Cwedge%20q" alt=" p \wedge q"/></p>

<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink>p <span class="synStatement">\wedge</span> q
p <span class="synStatement">\land</span> q
</pre><p>wedge は「くさび」という意味らしい。はてなブログでは \land（logical and）だと文字化けする（以下、\l- 系は同様）。こっちの方が覚えやすいのにな。C言語系だと「&&」にあたる。</p>

</div>
</div>
<div class="section">
<h3>論理和：p または q（である）</h3>
<p>数理論理学において論理和（ろんりわ、英語: Logical disjunction）とは、与えられた複数の命題のいずれか少なくとも一つが真であることを示す論理演算である。離接（りせつ）、選言（せんげん）とも呼び、ORとよく表す。</p><p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%20p%20%5Cvee%20q" alt=" p \vee q"/></p>

<div class="section">
<h4>Tex 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink>p <span class="synStatement">\vee</span> q
p <span class="synStatement">\lor</span> q
</pre><p>vee は「The name of the Latin script letter V/v.」とのこと。そのまんま「V」やね。C言語系だと「||」にあたる。論理演算だと、和より積を先に書きたくなるのはなぜだろう。</p>

</div>
</div>
<div class="section">
<h3>否定：p で（は）ない</h3>
<p>数理論理学において否定（ひてい）とは、命題の真と偽を反転する論理演算である。</p><p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%20%5Cneg%20p" alt=" \neg p"/></p>

<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink><span class="synStatement">\neg</span> p
<span class="synStatement">\lnot</span> p
</pre><p>これだけ単項・前置なのは、ちょっと不思議な気がする。C言語系だと「!」にあたる。</p>

</div>
</div>
<div class="section">
<h3>含意：p ならば q（である）</h3>
<p>論理包含（ろんりほうがん、含意（がんい）、内含、implication、IMP）は、第1命題が偽または第2命題が真のときに真となる論理演算である。条件文（じょうけんぶん、conditional）とほぼ同じものである。</p><p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%20p%20%5Cto%20q" alt=" p \to q"/></p>

<div class="section">
<h4>TeX 記法</h4>
<pre class="code lang-tex" data-lang="tex" data-unlink>p <span class="synStatement">\to</span> q
</pre><p><img src="http://chart.apis.google.com/chart?cht=tx&chl=%5Cneg" alt="\neg"/> が「演算子」なのは百歩譲っていいとして（実際、そうやって使うことに慣れている）、これも「演算子」だというのだからちょっと不思議。というのも、プログラミング言語だと「if」にあたるわけで、これは「演算子」とは……あれ、やっぱ「条件演算子」っていうな<a href="#f1" name="fn1" title="ここまで考えてびっくりしたのだけど、自分は値・式・文をあまり考えずに使ってきたのかもしれない！">*1</a>。</p>
<pre class="code lang-c" data-lang="c" data-unlink>a ? b : c
</pre><p>C言語なんかだと三項演算子（a ならば b、でなければ C）だけど、後ろ部分がないと思えば普通に使ってるわ。けど、後ろ部分は boolean じゃない。</p>

</div>
</div>
<div class="section">
<h3>ちなみに……</h3>
<p>はてなブログで TeX 記法を利用する場合は、tex:p \vee q と書き、全体を [] で囲う。</p>

<div class="section">
<h4>結果</h4>
<p><img src="http://chart.apis.google.com/chart?cht=tx&chl=p%20%5Cvee%20q" alt="p \vee q"/></p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ここまで考えてびっくりしたのだけど、自分は値・式・文をあまり考えずに使ってきたのかもしれない！</span></p>
</div>