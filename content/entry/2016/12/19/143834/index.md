---
date: 2016-12-19T14:38:34.0000000
draft: false
title: "MacBook に Boot Camp をインストールするとブルースクリーンが出る"
tags: ["MacBook", "Windows 10"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161210152725.jpg" alt="f:id:daruyanagi:20161210152725j:plain" title="f:id:daruyanagi:20161210152725j:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>症状</h3>

<div class="section">
<h4>2016/12/10</h4>
<p>MacBook に Boot Camp で Windows 10 をインストールしている環境で誤ってドライバーのアップデートをしてしまい（<a href="http://forest.watch.impress.co.jp/docs/news/1034135.html">&#x3053;&#x308C;</a>で遊んでいたのさ）、システムの一部を破損させた（Wi-Fi が繋がらない → 補修するとキーボードが効かなくなった）。</p><p>Mac 環境に戻って Boot Camp パーティションを削除＆再セットアップを試みるが――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161210152656.jpg" alt="f:id:daruyanagi:20161210152656j:plain" title="f:id:daruyanagi:20161210152656j:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20161210152704.jpg" alt="f:id:daruyanagi:20161210152704j:plain" title="f:id:daruyanagi:20161210152704j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Broadcom Bluetooth をインストールする段階で SYSTEM_THREAD_EXCEPTION_NOT_HANDLED エラーが発生する。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B01CW0PMSU/bestylesnet-22/"><img src="http://ecx.images-amazon.com/images/I/41KLc3l7jcL._SL160_.jpg" class="hatena-asin-detail-image" alt="HP 16GB USB3.1対応 Type-C + A デュアルUSBメモリ 金属製の360度回転デザイン2in1 OTG フラッシュドライブ (スマートフォン・Mac・タブレット・PCで使える)、Nokia N1、新しいMacBook、GOOGLE PIXEL対応 (16GB, x5000m - シルバー)" title="HP 16GB USB3.1対応 Type-C + A デュアルUSBメモリ 金属製の360度回転デザイン2in1 OTG フラッシュドライブ (スマートフォン・Mac・タブレット・PCで使える)、Nokia N1、新しいMacBook、GOOGLE PIXEL対応 (16GB, x5000m - シルバー)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B01CW0PMSU/bestylesnet-22/">HP 16GB USB3.1対応 Type-C + A デュアルUSBメモリ 金属製の360度回転デザイン2in1 OTG フラッシュドライブ (スマートフォン・Mac・タブレット・PCで使える)、Nokia N1、新しいMacBook、GOOGLE PIXEL対応 (16GB, x5000m - シルバー)</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> ヒューレット・パッカード</li><li><span class="hatena-asin-detail-label">メディア:</span> </li><li><a href="http://d.hatena.ne.jp/asin/B01CW0PMSU/bestylesnet-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>せっかく USB-C な USB メモリまで買ったのに（号泣</p>

</div>
</div>
<div class="section">
<h3>対処</h3>
<p>USB メモリのなかにドライバーを見つけたので、手動でひとつずつ入れてみたが、どうもうまくいかない。しょうがないので、数日間 Mac として利用する羽目になった。</p>

<div class="section">
<h4>2016/12/14</h4>
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/daruyanagi">@daruyanagi</a> macOS のアップデートしたら Boot Camp 直るかもしれんで</p>&mdash; しばやん (@shibayan) <a href="https://twitter.com/shibayan/status/808856435077484544">2016年12月14日</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>macOS Sierra 10.12.2 というのが出ているらしいので、それにアップデートして Boot Camp 環境を再構築してみた。</p><p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fjapan.cnet.com%2Fnews%2Fservice%2F35093669%2F" title="「macOS Sierra 10.12.2」がリリース--「Touch Bar」のスクリーンショット撮影など" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://japan.cnet.com/news/service/35093669/">japan.cnet.com</a></cite></p><p>結果的にはこれがビンゴだったらしく、Windows 10 環境を取り戻すことができましたとさ！（仮想環境にしろよという人もいるけど、仮想環境では動かないアプリもあるんだよ）</p>

</div>
</div>
<div class="section">
<h3>教訓</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161219143735.png" alt="f:id:daruyanagi:20161219143735p:plain" title="f:id:daruyanagi:20161219143735p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>Boot Camp ドライバーのアップデートは Apple さまがお恵み下さるものだけにしておく</li>
<li>macOS のアップデートで Boot Camp も新しくなってる可能性がある。試してみよう</li>
</ul>
</div>