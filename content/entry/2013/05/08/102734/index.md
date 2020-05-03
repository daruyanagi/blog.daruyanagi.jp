---
date: 2013-05-08T10:27:34.0000000
draft: false
title: "『プロになるためのJavaScript入門』"
tags: ["JavaScript", "読書"]
eyecatch: 
---
<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4774154385/bestylesnet-22/"><img src="http://ecx.images-amazon.com/images/I/61hioeZiViL._SL160_.jpg" class="hatena-asin-detail-image" alt="プロになるためのJavaScript入門 ~node.js、Backbone.js、HTML5、jQuery-Mobile (Software Design plus)" title="プロになるためのJavaScript入門 ~node.js、Backbone.js、HTML5、jQuery-Mobile (Software Design plus)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4774154385/bestylesnet-22/">プロになるためのJavaScript入門 ~node.js、Backbone.js、HTML5、jQuery-Mobile (Software Design plus)</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> 河村嘉之,川尻剛</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> 技術評論社</li><li><span class="hatena-asin-detail-label">発売日:</span> 2012/12/07</li><li><span class="hatena-asin-detail-label">メディア:</span> 大型本</li><li><span class="hatena-asin-detail-label">購入</span>: 4人 <span class="hatena-asin-detail-label">クリック</span>: 1,144回</li><li><a href="http://d.hatena.ne.jp/asin/4774154385/bestylesnet-22" target="_blank">この商品を含むブログ (6件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>TypeScript 1.0 の足音が聞こえてきた。そろそろ本気を出して TypeScript を学ぶべき時が近づいてきた。しかし、そのまえに JavaScript を知らねばならないだろう。</p><p>というわけで『プロになるためのJavaScript入門』という本を買ってみた。まだ2章までしか読んでないのだけれど、なかなか面白い。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130508090958.jpg" alt="f:id:daruyanagi:20130508090958j:plain" title="f:id:daruyanagi:20130508090958j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たとえば、これはオブジェクト指向プログラミング（OOP）における JavaScript の立ち位置を図式化したもの。筆者によると、OOP には大きく分けて3つの要素が存在するという（以下、わしの独断と偏見も含む）。</p>

<div class="section">
<h4>メッセージ</h4>

<blockquote>
<p>すべての処理 ＝ メッセージの送信 ＋ オブジェクト（レシーバー）</p>

</blockquote>
<p>たとえば Smalltalk には制御構造すらなく、すべてが“メッセージ”として扱われている。元祖オブジェクト指向。</p>

</div>
<div class="section">
<h4>型</h4>

<blockquote>
<p>クラス ＝ 構造化されたデータ ＋ それに所属するメソッド<br />
インスタンス ＝ クラスの具現化</p>

</blockquote>
<p>データとメソッドの<b>カプセル化</b>。コールされたメッセージではなく、それを受け取ったレシーバーによって処理の内容が決められる（<b>多態性</b>）。<b>継承</b>という概念で“あらかじめ静的に”階層設計されたクラスをもつ。</p>

</div>
<div class="section">
<h4>インスタンス</h4>

<blockquote>
<p>オブジェクト ＝ 値でも参照でも関数でもなんでも入れられる連想配列のようなもの（スロット）<br />
インスタンス ＝ 既存オブジェクトのコピー</p>

</blockquote>
<p>データとメソッドをクラスではなくインスタンスで扱う（プロトタイプ）。オブジェクトへあとから機能を追加するのが簡単。</p><p>この3つが等置できるものかと言われればどうかなって気もするけど、自分の中で JavaScript の立ち位置がちょっとクリアになった気がする。要は、今まで馴染んできたものとはまったく別物だと思えばいいんだ。</p>

</div>