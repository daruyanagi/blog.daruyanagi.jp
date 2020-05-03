---
date: 2018-04-17T11:41:52.0000000
draft: false
title: "PowerShell：陸上自衛隊のイラク派遣日報をまとめてダウンロードする"
tags: ["PowerShell"]
eyecatch: 20180417114019.png
---
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$source</span> = <span class="synConstant">&quot;https://www.asahi.com/articles/ASL4J669JL4JUEHF016.html&quot;</span>
<span class="synIdentifier">$folder</span> = <span class="synConstant">&quot;C:\Users\Hideto\pdf&quot;</span>

<span class="synIdentifier">$result</span> = <span class="synStatement">Invoke-WebRequest</span> <span class="synIdentifier">$source</span> -UseBasicParsing
<span class="synIdentifier">$urls</span> = <span class="synIdentifier">$result</span>.Links.href | <span class="synStatement">Get-Unique</span> |  <span class="synStatement">where</span> { <span class="synType">$_</span> -<span class="synStatement">match</span> <span class="synConstant">&quot;.pdf&quot;</span> }

<span class="synStatement">foreach</span> (<span class="synIdentifier">$url</span> <span class="synStatement">in</span> <span class="synIdentifier">$urls</span>)
{
<span class="synIdentifier">$file</span> = (<span class="synIdentifier">$url</span>  -<span class="synStatement">split</span> <span class="synConstant">&quot;/&quot;</span>)[-<span class="synConstant">1</span>]
<span class="synStatement">Invoke-WebRequest</span> -Uri <span class="synIdentifier">$url</span> -OutFile (<span class="synStatement">Join-Path</span> <span class="synIdentifier">$folder</span> <span class="synIdentifier">$file</span>)
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180417114019.png" alt="f:id:daruyanagi:20180417114019p:plain" title="f:id:daruyanagi:20180417114019p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>結構量があるんだなぁ……（終わらねぇ。文学作品として割と楽しめるらしいので、ダウンロードが終わるの楽しみ☆（ゝω・）vｷｬﾋﾟ</p><p>それはともかく、PowerShell、もっとうまく、サクッと書けるようになりたいなぁ。</p>

<div class="section">
<h3>元ネタ</h3>
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">イラク日報ぶっこ抜きスターターパック<br>$ curl <a href="https://t.co/nt7h0I8NpE">https://t.co/nt7h0I8NpE</a> | grep &#39;&lt;td class=&quot;link&quot;&gt;&#39; | grep pdf | awk -F&#39;&quot;&#39; &#39;{print $4}&#39; | xargs wget</p>&mdash; opensorter (@opensorter) <a href="https://twitter.com/opensorter/status/985894737071652866?ref_src=twsrc%5Etfw">2018年4月16日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><br />
</p>

</div>
<div class="section">
<h3>追伸</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180417163143.png" alt="f:id:daruyanagi:20180417163143p:plain" title="f:id:daruyanagi:20180417163143p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ナメてたけど、結構量が多かった。ダウンロード中のファイルを一つ開いちゃって、ダウンロードに失敗したにもかかわらずこんなにデカくなったぞ……。</p>

</div>