---
date: 2013-01-14T22:13:02.0000000
draft: false
title: "Google Chart を使った数式ツールを作ってみた"
tags: ["WPF", "論理学", "C#"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130114215958.png" alt="f:id:daruyanagi:20130114215958p:plain" title="f:id:daruyanagi:20130114215958p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>晩御飯食べた後にさくっと作ってみた（参考：<a href="https://blog.daruyanagi.jp/entry/2012/11/16/042840">WebMatrix &#x3067;&#x6570;&#x5F0F;&#x3092;&#x8868;&#x73FE;&#x3059;&#x308B;&#xFF08;&#xFF11;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）。自然演繹のブログの続きを書こうと思ったのだけど、プレビューできないと数式が書けない人なので……。</p><p>でも、これ、ネットワークがつながっていないとだめなのはともかく、日本語が化けてしまうんだよなぁ。まぁ、英語使えばいい。</p>

<ul>
<li>仮定 "Assumption" (A)</li>
<li>モーダスポネンス "Modus Ponendo Ponens" (MPP)</li>
<li>二重否定 "Double Negation" (DN)</li>
<li>条件付き証明 "Conditional Proof" (CP)</li>
<li>∧-導入 "∧-introduction" (∧I)</li>
<li>∧-除去 "∧-elimination" (∧E)</li>
<li>∨-導入 "∨-introduction" (∨I)</li>
<li>∨-除去 "∨-elimination" (∨E)</li>
<li>背理法 "Ad Absurdum" (RAA)</li>
</ul><p>これぐらいしかないんだから覚えられるはず (;´Д｀)</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">void</span> FormulaText_TextChanged_1(<span class="synType">object</span> sender, TextChangedEventArgs e)
{
<span class="synType">const</span> <span class="synType">string</span> API = <span class="synConstant">&quot;http://chart.apis.google.com/chart?cht={0}&amp;chl={1}&quot;</span>;
var cht = <span class="synConstant">&quot;tx&quot;</span>;
var chl = HttpUtility.UrlEncode(FormulaText.Text);
var uri = <span class="synStatement">new</span> Uri(<span class="synType">string</span>.Format(API, cht, chl));

FormulaImage.Source = <span class="synStatement">new</span> BitmapImage(uri);
}
</pre><p>あと、なんでか知らんけど、ViewModel がバインディングされないのでコードビハインドで書いたけど<a href="#f-2b762d13" name="fn-2b762d13" title="たぶん、久しぶりに書いたのでどこか間違ってるんだろう">*1</a>、まぁ、これぐらいだとそっちの方が早かったり。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-2b762d13" name="f-2b762d13" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">たぶん、久しぶりに書いたのでどこか間違ってるんだろう</span></p>
</div>