---
date: 2014-08-27T21:30:46.0000000
draft: false
title: "Clipper の割とどうでもいい使い方"
tags: ["Clipper", "Windows ストア アプリ"]
eyecatch: 20140827212217.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140827212217.png" alt="f:id:daruyanagi:20140827212217p:plain" title="f:id:daruyanagi:20140827212217p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows 8 の「ミュージック」アプリの場合、</p>

<ul>
<li>{{title}} に曲名</li>
<li>{{description}} にアーティスト名</li>
</ul><p>が入るので、</p>
<pre class="code" data-lang="" data-unlink>&#34;{{title}}&#34; by {{desc}} #nowplaying</pre><p>みたいな書式を作ってやると、今聞いている曲がツイートできる。書式をあらかじめ登録してない場合でも、{{comment}} にこの書式を入力すればちゃんと展開される（ハズ）。</p><p><blockquote class="twitter-tweet" lang="ja"><p>&quot;パララックス･ビュー&quot; by 上坂すみれ / <a href="http://t.co/kCvHKlsQt2">http://t.co/kCvHKlsQt2</a></p>&mdash; だるやなぎ（歩兵） (@daruyanagi) <a href="https://twitter.com/daruyanagi/statuses/504604291290513408">2014, 8月 27</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>ただし「ミュージック」アプリを起動した状態で共有しなきゃならない（<a href="http://apps.microsoft.com/windows/ja-jp/app/c9cd525b-1abd-44fb-9f50-3c61ede0f650">Windows &#x30B9;&#x30C8;&#x30A2; &#x306E; Windows &#x7528; &#x3077;&#x308D;&#x306A;&#x307E;&#x306A;&#x3046;&#x3077;&#x308C; &#x30A2;&#x30D7;&#x30EA;</a> も同じ仕組みじゃないかな）。Windows 8/8.1 には今のところ Now Playing を取得できるインターフェイスがないみたいで残念……Windows Phone の場合は XNA を使えばできるみたい。こういう情報は読み取りオンリーでいいんだから、積極的に公開してくれると面白いアプリがたくさん出てくると思うのだけど。</p><p><div class="wsoembed" data-appid="f74908d9-86cf-4624-9c8d-b3dd24987bd3"></div><script src="http://wsoembed.com/widget.js" async="async"></script></p>
