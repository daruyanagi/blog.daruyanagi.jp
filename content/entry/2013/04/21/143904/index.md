---
date: 2013-04-21T14:39:04.0000000
draft: false
title: "WebMatrix 3：危険な可能性のある Request.Path 値がクライアント (:) から検出されました。"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130420/20130420223145.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130420223145.png" alt="f:id:daruyanagi:20130420223145p:plain" title="f:id:daruyanagi:20130420223145p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/04/20/224501">WebMatrix 3: &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x306E;&#x8CFC;&#x8AAD;&#x8005;&#x6570;&#x3092;&#x53D6;&#x5F97;&#x3059;&#x308B;&#xFF08;1&#xFF1A;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30B5;&#x30A4;&#x30C9;&#x7DE8;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の補足。</p>
<pre class="code" data-lang="" data-unlink>http://localhost:11330/FeedCount/https://blog.daruyanagi.jp/</pre><p>このような URL を受け取ると、</p>

<blockquote>
<p>危険な可能性のある Request.Path 値がクライアント (:) から検出されました。</p>

</blockquote>
<p>というエラーが出てしまいます。これは ASP.NET のセキュリティ機能のようですね。ただ、自分は Web 系のセキュリティにあまり詳しくないので、これがどのように悪用できるのかさっぱりわからないのですが……（SQLインジェクションかなにかかなぁ？）。いい本をご存知でしたら、どなたか教えてください。</p><p>とりあえず、今回はこれを解除してしまいます。あとは自己責任で……</p>


<div class="section">
<h3>Web.config を編集する</h3>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;httpRuntime </span><span class="synType">requestPathInvalidCharacters</span>=<span class="synConstant">&quot;</span><span class="synType">&amp;</span><span class="synStatement">lt</span><span class="synType">;</span><span class="synConstant">,</span><span class="synType">&amp;</span><span class="synStatement">gt</span><span class="synType">;</span><span class="synConstant">,*,%,</span><span class="synType">&amp;</span><span class="synStatement">amp</span><span class="synType">;</span><span class="synConstant">,\,?&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>&lt;httpRuntime&gt; の部分を追加すると動きます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421142059.png" alt="f:id:daruyanagi:20130421142059p:plain" title="f:id:daruyanagi:20130421142059p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>当該部分をコメントアウトするとエラーが発生します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421142128.png" alt="f:id:daruyanagi:20130421142128p:plain" title="f:id:daruyanagi:20130421142128p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

</div>
<div class="section">
<h3>RequestPathInvalidCharacters プロパティ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130421142432.png" alt="f:id:daruyanagi:20130421142432p:plain" title="f:id:daruyanagi:20130421142432p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><b>HttpRuntimeSection.RequestPathInvalidCharacters プロパティ</b>は ASP.NET 4 から追加されたもので（たぶん）、指定された文字が含まれたパスに含まれていないか検証します。初期値は、</p>
<pre class="code" data-lang="" data-unlink>&lt;,&gt;,*,%,&amp;,:,\,?</pre><p>です（コンマ区切り）。Web.config で指定する場合は実態参照にしないと正しい XML にならないので注意。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/system.web.configuration.httpruntimesection.requestpathinvalidcharacters.aspx">HttpRuntimeSection.RequestPathInvalidCharacters Property (System.Web.Configuration) | Microsoft Docs</a></li>
</ul><p>ASP.NET 2.x → ASP.NET 4.x の間ではセキュリティの強化もあるらしくて、昔から馴染んでる人にとっては地雷みたいですね。</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/system.web.configuration.httpruntimesection.requestvalidationmode.aspx">
<p>RequestValidationMode プロパティは、どの ASP.NET アプローチを検証に使用するかを指定します。 これは、ASP.NET 4.0 より前のバージョンまたは .NET Framework 4 で使用されているバージョンで使用されているアルゴリズムである場合もあります。 プロパティは次の値に設定できます。</p>

<ul>
<li><b>4.0 (既定値)。</b> HttpRequest オブジェクトは、HTTP 要求データがアクセスされるたびに要求の検証が発生する必要があることを示すフラグを内部的に設定します。 これにより、クッキーなどのデータの前に要求の検証がトリガーされ、URL が要求時にアクセスされることが保証されます。 構成ファイルの pages 要素 (存在する場合) と個々のページの @ Page ディレクティブの要求検証設定は、無視されます。</li>
<li><b>2.0.</b> 要求検証は、ページに対してのみ有効です。すべての HTTP 要求に対して有効ではありません。 さらに、構成ファイルの pages 要素 (存在する場合) と個々のページの @ Page ディレクティブの要求検証設定は、検証対象のページ要求を決定するのに使用されます。</li>
</ul><p>このプロパティに割り当てる値は、ASP.NET の特定のバージョンと一致するように検証されていません。 4.0 より小さい数値 (たとえば、 3.7、2.9、2.0) は、2.0 として解釈されます。 4.0 より大きい数値は、4.0 として解釈されます。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/system.web.configuration.httpruntimesection.requestvalidationmode.aspx">HttpRuntimeSection.RequestValidationMode Property (System.Web.Configuration) | Microsoft Docs</a></cite>
</blockquote>
<p>逆に言えば、それだけ安心になっているということなのですが。</p>

</div>