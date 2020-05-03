---
date: 2013-03-06T07:39:53.0000000
draft: false
title: "WordPress → はてなブログ"
tags: ["はてな"]
eyecatch: 
---
<p>今のところ、WordPress の記事を直接はてなブログへインポートする手段は用意されていないが、工夫次第ではなんとかなりそう。</p><p>たとえばこんな感じ。</p>

<ol>
<li>「WordPress」のログを WXR（WordPress eXtended RSS）でエクスポート（*.xml）</li>
<li>エクスポートした XML ファイルを「Movable Type」形式へコンバート（*.txt）</li>
<li>「Movable Type」形式のログを「はてなダイアリー」へインポート</li>
<li>「はてなダイアリー」の記事を「はてなブログ」へインポート</li>
</ol><p>結論から言えば、これでうまくいった。</p>

<div class="section">
<h3>WordPress → WXR</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130306071726.png" alt="f:id:daruyanagi:20130306071726p:plain" title="f:id:daruyanagi:20130306071726p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［ツール］－［エクスポート］メニューから、記事を XML 形式で出力。</p>

</div>
<div class="section">
<h3>WXR → Movable Type Format</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130306071845.png" alt="f:id:daruyanagi:20130306071845p:plain" title="f:id:daruyanagi:20130306071845p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://komono.jp/contents/software/web/wxrtomt/">&#x5C0F;&#x7269;&#x7F6E;&#x304D;&#x5834; - WxrToMt</a> が利用できる。</p><p>自分の場合、WordPress の記事を Markdown 記法で記述していたので、ここでテキストエディターを使ってはてな記法へ置換。ちょちょいとマクロを作って大雑把に置換し、あとは諦めるなり、修正を入れるなりして頑張った。</p>

</div>
<div class="section">
<h3>Movable Type Format → はてなダイアリー</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130306071938.png" alt="f:id:daruyanagi:20130306071938p:plain" title="f:id:daruyanagi:20130306071938p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>はてなダイアリーで新規ダイアリーを作成し、そこへ Movable Type 形式のログをインポートする。</p><p>ここでちゃんとデータがインポートされたかをしっかりチェック。</p><p>とくに、WordPress の記事でレベルの高い見出し（h1, h2...）を使っている場合、それがダイアリーで単体の記事と扱われてしまうので注意（要するに、記事が増殖する！）。場合によってはレベルを下げる処理を行う必要がある。</p><p>はてなでは、過去に取得・放棄した URL を再び取得することはできない。つまり、インポートに失敗して、ダイアリーやブログを一旦削除すれば、その URL は二度と使えなくなる。そのため、ダイアリーの段階で入念にインポートのテストを行った方がいいと思う。</p><p>自分の場合、はてなダイアリーを4つ作るハメになった。</p>

</div>
<div class="section">
<h3>はてなダイアリー → はてなブログ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130306072049.png" alt="f:id:daruyanagi:20130306072049p:plain" title="f:id:daruyanagi:20130306072049p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>はてなダイアリーからはてなブログへインポートすれば作業は完了。インポート先は新規ブログでも、既存のブログでも OK。</p><p>このブログに、はてなブログのサービスが始まる前の日付で記事が追加されているのが分かるかな？</p>

</div>