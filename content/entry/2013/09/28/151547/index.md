---
date: 2013-09-28T15:15:47.0000000
draft: false
title: "Mozilla Firefox 26 の Immersive モード"
tags: ["Mozilla Firefox", "Google Chrome", "Windows 8"]
eyecatch: 20130928151034.png
---

<blockquote cite="http://www.forest.impress.co.jp/docs/news/20130924_616600.html">
<p>「Firefox 26」は、「Windows 8」から導入されている“Immersive”モードをサポート。このモードはタッチ操作に適した“タイル”や、余分なユーザーインターフェイス要素を極力廃したコンテンツ重視のデザインが特長で、ストアアプリが動作するサンドボックス環境“AppContainer”によるセキュリティの恩恵も受けられる。</p>

<cite><a href="http://www.forest.impress.co.jp/docs/news/20130924_616600.html">Mozilla&#x3001;&#x300C;Windows 8&#x300D;&#x306E;&#x30BF;&#x30C3;&#x30C1;UI&#x306B;&#x6700;&#x9069;&#x5316;&#x3055;&#x308C;&#x305F;&#x300C;Firefox Aurora&#x300D;&#x3092;&#x516C;&#x958B; - &#x7A93;&#x306E;&#x675C;</a></cite>
</blockquote>
<p>この後半がウソだという指摘を受けたので検証。結論的には――<i>間違ってた／(＾o＾)＼　</i>おそらくそのうち修正されると思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130928151034.png" alt="f:id:daruyanagi:20130928151034p:plain" title="f:id:daruyanagi:20130928151034p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Mozilla Firefox の Immersive モードは AppContainer ではなく、整合性レベル Medium で動作する。</p><p>ちなみに Google Chrome も調べてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130928151118.png" alt="f:id:daruyanagi:20130928151118p:plain" title="f:id:daruyanagi:20130928151118p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>整合性レベル Medium で動作する親プロセスの下に Untrusted な複数のプロセスがある。</p><p>しかし、これだったら Internet Explorer を使った方が安全なような気もする。また、仮に Microsoft のせいでサードパーティ製ブラウザーが Medium で動作することを強いられているならば、あんまりよい状況ではないと思う。</p>

<div class="section">
<h3>追記</h3>
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/NyaRuRu"><img src="http://a0.twimg.com/profile_images/21112762/Pelican_normal.png" alt="NyaRuRu" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text"><a class="twitter-tweet-url" href="http://t.co/m2ANqmBhyu" target="_top"><span>URL</span></a> 整合性レベルMediumで動作する親プロセスと，サンドボックス内で動く子プロセスという構成はIEもChromeも今のところ同じですかね．OS上の制約は特になくて，提供したい機能から単にそういうデザインになる，という感じかと．</p><p class="twitter-detail-info"><a href="http://twitter.com/NyaRuRu/status/383995701056643072" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-09-29</span> <span class="twitter-detail-info-time">01:44:44</span></a> <span class="twitter-detail-info-source">via web</span></p></div></div></p>

</div>