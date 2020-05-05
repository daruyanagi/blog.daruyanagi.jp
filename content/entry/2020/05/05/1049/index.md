---
title: "Hugo に Amazon の商品リンクを貼る"
date: 2020-05-05T10:49:40+09:00
draft: false
tags: ["Hugo"]
eyecatch: 
---
Hogo に Amazon の商品リンクを貼る方法はいくつかあるようだが、どれも一長一短のようだ。

- ブックマークレットで紹介リンクを取得する（一番手軽。Markdown に HTML が混じる。移植性が低下する）
- ショートコードで紹介リンクを貼る
    - API サーバーを自前で用意して、リンクを生成する（いろんな情報が取れるが、サーバーのメンテナンスが面倒）
    - [hugo\-amazon\-jp](https://github.com/ikemo3/hugo-amazon-jp) などのテーマコンポーネントを用いる（データ管理がめんどくさそう）

結局、当面の間は一番手軽なブックマークレットを用いることにした。

```
javascript: (function() { const tag = 'bestylesnet-22'; const name = document.getElementById('productTitle').textContent.trim(); const asin = document.URL.match(/([0-9A-Z]{10})/)[0]; const image = `https://images-na.ssl-images-amazon.com/images/P/dp/${asin}.09.MZZZZZZZ.jpg`; const message = `<div class='amazon-item'><img src='${image}' alt='${name}' /> <span class='amazon-item-title'>${name}</span> <span class='amazon-item-link'><a href='https://www.amazon.co.jp/dp/${asin}/?tag=${tag}'>Amazon.co.jp でみる</a></span></div>`; const title = window.prompt('コピーしてください', message); })(); 
```

<a href="javascript: (function() { const tag = 'bestylesnet-22'; const name = document.getElementById('productTitle').textContent.trim(); const asin = document.URL.match(/([0-9A-Z]{10})/)[0]; const image = `https://images-na.ssl-images-amazon.com/images/P/dp/${asin}.09.MZZZZZZZ.jpg`; const message = `<div class='amazon-item'><img src='${image}' alt='${name}' /> <span class='amazon-item-title'>${name}</span> <span class='amazon-item-link'><a href='https://www.amazon.co.jp/dp/${asin}/?tag=${tag}'>Amazon.co.jp でみる</a></span></div>`; const title = window.prompt('コピーしてください', message); })();">Amazon リンクを取得</a>（ブックマークバーにドラッグ＆ドロップして登録する）

## テスト

発売日や出版社のデータも欲しいところだけど、スクレイピングで対応するのは結構面倒くさいようだ。メタタグか何か埋め込んでくれていたら楽なのにな。

<div class='amazon-item'><img src='https://images-na.ssl-images-amazon.com/images/P/dp/4422210963.09.MZZZZZZZ.jpg' alt='古代ギリシア発掘史 (「知の再発見」双書)' /> <span class='amazon-item-title'>古代ギリシア発掘史 (「知の再発見」双書)</span> <span class='amazon-item-link'><a href='https://www.amazon.co.jp/dp/4422210963/?tag=bestylesnet-22'>Amazon.co.jp でみる</a></span></div>

<div class='amazon-item'><img src='https://images-na.ssl-images-amazon.com/images/P/dp/B0854VKPFN.09.MZZZZZZZ.jpg' alt='トミカ Honda シビック TYPE R トミカ50周年記念仕様 designed by HONDA' /> <span class='amazon-item-title'>トミカ Honda シビック TYPE R トミカ50周年記念仕様 designed by HONDA</span> <span class='amazon-item-link'><a href='https://www.amazon.co.jp/dp/B0854VKPFN/?tag=bestylesnet-22'>Amazon.co.jp でみる</a></span></div>