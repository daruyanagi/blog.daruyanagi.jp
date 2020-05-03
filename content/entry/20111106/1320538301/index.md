---
date: 2011-11-06T09:11:41.0000000
draft: false
title: "Amazon2Html 1.0, BlackbirdPie 1.5"
tags: ["未分類"]
eyecatch: 
---
<p>新しい NuGet を作ってみました。手元にあるコード片は、とりあえず NuGet にし終えたかなぁ。</p>

<div class="section">
<h4><a href="http://nuget.org/List/Packages/Amazon2Html">Amazon2Html</a></h4>
<p>Amazon の商品リンクを HTML タグに変換します。</p>
<pre class="code" data-unlink>    @Amazon2Html.GetHtml(&#34;http://www.amazon.co.jp/gp/product/4047274968/&#34;)</pre><p>利用には AWS のAPI Key ID と Secret Key が必要です。詳しくは、ヘルプサイト <a href="#f1" name="fn1" title="Amazon2Html">*1</a> を参照のこと。</p>

</div>
<div class="section">
<h4><a href="http://nuget.org/List/Packages/BlackbirdPie">BlackbirdPie</a></h4>

<ul>
<li>StyleSheet is moved to /Styles folder.</li>
<li>IncludeStyle is renamed to EmbedStyle.</li>
<li>Improve Default.cshtml, old one renamed Test.cshtml</li>
</ul><p>機能的な変更点はほとんどないですが、ちょっと変わったところもあるので……ゴメンナサイ。ヘルプサイト <a href="#f2" name="fn2" title="BlackbirdPie">*2</a> を作成したのでそちらも参照してください。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://amazon2html.daruyanagi.net/">Amazon2Html</a></span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://blackbirdpie.daruyanagi.net/">BlackbirdPie</a></span></p>
</div>