---
date: 2013-07-24T07:09:06.0000000
draft: false
title: "Windows Store oEmbed API を NuGet にしておきました"
tags: ["ASP.net Web Pages", "NuGet", "WebMatrix", "告知"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130724/20130724064818.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724064818.png" alt="f:id:daruyanagi:20130724064818p:plain" title="f:id:daruyanagi:20130724064818p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/07/18/033539">WebMatrix 3: Windows Store oEmbed API &#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> を NuGet にして NuGet Gallery で公開しました。</p>

<ul>
<li><a href="https://www.nuget.org/packages/WSoEmbed">NuGet Gallery | WSoEmbed 1.0.2</a></li>
</ul><p>前回の記事からの変更点は、System.Threading.Thread.CurrentThread.CurrentUICulture で言語を取得して URL をビルドするようにしたことのみ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@WindowsStore.GetHtml(APP_URL)

@WindowsStore.GetHtml(<span class="synConstant">&quot;8289549f-9bae-4d44-9a5c-63d9c3a79f35&quot;</span>)
</pre>

<div class="section">
<h3>ついでに NuGet パッケージの作成・公開方法を復習（簡易版）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724070101.png" alt="f:id:daruyanagi:20130724070101p:plain" title="f:id:daruyanagi:20130724070101p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>NuGet パッケージの作成には、<a href="http://npe.codeplex.com/">CodePlex Archive</a> を使うのがオススメ。今回のように簡単な NuGet ならば nuspec をゴリゴリかいたほうが早いかもしれませんが。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724065907.png" alt="f:id:daruyanagi:20130724065907p:plain" title="f:id:daruyanagi:20130724065907p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>適当に必要項目を埋めたら、［File］－［Publish］するだけ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724065806.png" alt="f:id:daruyanagi:20130724065806p:plain" title="f:id:daruyanagi:20130724065806p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Publish Key は <a href="https://www.nuget.org/account">https://www.nuget.org/account</a> で取得できます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724070407.png" alt="f:id:daruyanagi:20130724070407p:plain" title="f:id:daruyanagi:20130724070407p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>公開したら WebMatrix などでインストールの確認。リポジトリのソースを変えてみたりしないと、検索結果にでてこないかもしれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130724070330.png" alt="f:id:daruyanagi:20130724070330p:plain" title="f:id:daruyanagi:20130724070330p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://www.nuget.org/">NuGet Gallery | Home</a> で公開しておけば、パッケージをリモートから取得して開くこともできます。パブリックに公開したくない場合は、<a href="https://blog.daruyanagi.jp/entry/2013/04/05/133515">WebMatrix&#xFF1A;NuGet &#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x3092;&#x305F;&#x3066;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> なんてこともできます。</p><p>この NuGet Package Explorer、最近は Windows ストア アプリ版もあるみたいですね。こんど Surface RT で遊んでみよう。</p>

</div>