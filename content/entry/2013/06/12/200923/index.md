---
date: 2013-06-12T20:09:23.0000000
draft: false
title: "WebMatrix 3: libgit2 がエラーを吐く"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130612200714.png" alt="f:id:daruyanagi:20130612200714p:plain" title="f:id:daruyanagi:20130612200714p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<blockquote>
<p>An error was raised by libgit2. Category = Os (NotFound).<br />
Existing path is not a directory '（プロジェクトフォルダ）': 既に存在するファイルを作成することはできません。</p>

</blockquote>
<p>困った。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130612200816.png" alt="f:id:daruyanagi:20130612200816p:plain" title="f:id:daruyanagi:20130612200816p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず、プロジェクトの保存フォルダを変更。再度 git init することで問題を回避した。</p>
