---
date: 2014-11-14T19:48:08.0000000
draft: false
title: "WebMatrix： 型または名前空間 &#39;Linq&#39; は名前空間 &#39;System&#39; に存在しません。アセンブリ参照が不足しています。"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141114193956.png" alt="f:id:daruyanagi:20141114193956p:plain" title="f:id:daruyanagi:20141114193956p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h4>問題</h4>
<p>WebMatrix で作った ASP.NET Web Pages のプロジェクトを Visual Studio で開くと、</p>

<blockquote>
<p>型または名前空間 'Linq' は名前空間 'System' に存在しません。アセンブリ参照が不足しています。</p>

</blockquote>
<p>というエラーが出てコンパイルできない。</p>

</div>
<div class="section">
<h4>解決策</h4>
<p>Web.config で明示的にターゲットフレームワークを指定する。WebMatrix はこれがなくても動くのだけど、Visual Studio の方はちゃんと書いておかないと動かない。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>このエラーが出るたびに「あぁ、あれか」と思うのだけど、いつも具体的なコードが思い出せなくて、結局ググってたりする。</p>

</div>