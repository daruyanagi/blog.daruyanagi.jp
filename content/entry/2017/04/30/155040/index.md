---
date: 2017-04-30T15:50:40.0000000
draft: false
title: "PowerShell：スクレイピングすると“HRESULT からの例外:0x800A01B6”が発生する"
tags: ["PowerShell"]
eyecatch: 
---
<p>メインに使っているデスクトップ端末を Windows 10 Creators Update へアップデートしたのだけど、</p><p><iframe src="http://blog.daruyanagi.jp/embed/2017/03/04/220000" title="PowerShell：ストアアプリのセール情報を取得する - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://blog.daruyanagi.jp/entry/2017/03/04/220000">blog.daruyanagi.jp</a></cite></p><p>以前に作った PowerShell が動作しなくなった。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$urls</span> =@(
<span class="synConstant">&quot;https://www.microsoft.com/ja-jp/store/p/nextgen-reader/9wzdncrfj262&quot;</span>
)

<span class="synStatement">foreach</span> (<span class="synIdentifier">$url</span> <span class="synStatement">in</span> <span class="synIdentifier">$urls</span>)
{
<span class="synStatement">try</span>
{
<span class="synIdentifier">$request</span> = <span class="synStatement">Invoke-WebRequest</span> <span class="synIdentifier">$url</span>

<span class="synIdentifier">$body</span> = <span class="synIdentifier">$request</span>.ParsedHtml
<span class="synIdentifier">$price_node</span> = <span class="synIdentifier">$body</span>.getElementsByTagName(<span class="synConstant">&quot;s&quot;</span>) | <span class="synStatement">where</span> {
<span class="synType">$_</span>.getAttributeNode(<span class="synConstant">&quot;class&quot;</span>).Value  -<span class="synStatement">eq</span> <span class="synConstant">&quot;srv_saleprice&quot;</span>
}　<span class="synComment">#&lt;-- ここで例外</span>
</pre><p>――結果。</p>
<pre class="code" data-lang="" data-unlink>HRESULT からの例外:0x800A01B6</pre><p>Internet Explorer（<code>Invoke-WebRequest()</code> などで内部的に利用されている）がメソッドをサポートしていないときにでるエラーみたい。</p>

<div class="section">
<h3>解決</h3>
<p><code>getElementsByTagName()</code> のかわりに <code>IHTMLDocument3_getElementsByTagName()</code> を用いる。以下のメソッドでも同様のエラーが出るので、適宜読み替える。</p>
<pre class="code" data-lang="" data-unlink>getElementsByTagName -&gt;
IHTMLDocument3_getElementsByTagName

getElementsByName -&gt;
IHTMLDocument3_getElementsByName

getElementByID -&gt;
IHTMLDocument3_getElementByID</pre>
<ul>
<li><a href="https://www.sepago.com/blog/2016/05/03/powershell-exception-0x800a01b6-while-using-getelementsbytagname-getelementsbyname">PowerShell Exception 0x800A01B6 while using getElementsByTagName, getElementsByName or getElementByID | sepago</a></li>
</ul>
</div>
<div class="section">
<h3>なぞ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170430154724.png" alt="f:id:daruyanagi:20170430154724p:plain" title="f:id:daruyanagi:20170430154724p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>PowerShell スクリプトからではなく、PowerShell のシェルから <code>getElementsByTagName()</code> を使うとそのまま通った。よくわからんな……。</p>

</div>