---
date: 2013-02-26T21:02:21.0000000
draft: false
title: "--&gt; 演算子"
tags: ["C#"]
eyecatch: 
---
<p>C++ で新しい演算子“-->” が採用されたそうだが、これは C# ですでに利用可能である。この演算子は、左辺の変数を右辺値まで 1 ずつ減算する。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synType">int</span> x = <span class="synConstant">10</span>;
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@<span class="synStatement">do</span> {
&lt;p&gt;@x&lt;/p&gt;
}
<span class="synStatement">while</span>(x --&gt; <span class="synConstant">0</span>);
&lt;/body&gt;
&lt;/html&gt;
</pre><p>筆者の趣味により、コードは Razor で示した。結果は以下の通り。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130226205759.png" alt="f:id:daruyanagi:20130226205759p:plain" title="f:id:daruyanagi:20130226205759p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>from: <a href="http://stackoverflow.com/questions/1642028/what-is-the-name-of-this-operator">c++ - What is the name of this operator: &quot;--&gt;&quot;? - Stack Overflow</a> , via <a href="http://siv3d.hateblo.jp/entry/2013/02/19/232040">--&gt; &#x6F14;&#x7B97;&#x5B50; - Siv3D &#x958B;&#x767A;&#x30D6;&#x30ED;&#x30B0;</a></p>
