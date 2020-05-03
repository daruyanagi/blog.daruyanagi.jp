---
date: 2012-11-02T19:28:20.0000000
draft: false
title: "Yahoo! の電力使用状況 API を試してみる。"
tags: ["WebMatrix"]
eyecatch: 
---
<p>次の Windows Store アプリのネタ、どうしようかなぁ……などと考えていたのだけど、まだトーストへプッシュ通知するアプリを試していなかった。冬はまた電力需給が逼迫しそうなので、ヤバくなったらデスクトップへ通知してくれるアプリなんかいいかもしれない。</p><p>それにはまず、API の使い方を勉強しなきゃいけない。</p><p><img src="20121102190953.png" alt="f:id:daruyanagi:20121102190953p:plain" title="f:id:daruyanagi:20121102190953p:plain" class="hatena-fotolife"></p>

<ul>
<li><a href="http://developer.yahoo.co.jp/webapi/shinsai/setsuden/v1/latestpowerusage.html">&#x9707;&#x707D;&#x95A2;&#x9023;&#x60C5;&#x5831;:&#x96FB;&#x529B;&#x4F7F;&#x7528;&#x72B6;&#x6CC1;API - Yahoo!&#x30C7;&#x30D9;&#x30ED;&#x30C3;&#x30D1;&#x30FC;&#x30CD;&#x30C3;&#x30C8;&#x30EF;&#x30FC;&#x30AF;</a></li>
</ul>
<div class="section">
<h3>とりあえずアプリの登録</h3>
<p><img src="20121102190957.png" alt="f:id:daruyanagi:20121102190957p:plain" title="f:id:daruyanagi:20121102190957p:plain" class="hatena-fotolife"></p><p>API キーをもらう。名前は適当に「Unagi（うなぎ）」にした。</p>

</div>
<div class="section">
<h3>サンプルコードを試す</h3>
<p><img src="20121102191003.png" alt="f:id:daruyanagi:20121102191003p:plain" title="f:id:daruyanagi:20121102191003p:plain" class="hatena-fotolife"></p><p>するとサンプルコードが吐き出された。これをぺったんこすればそのまま動くらしい。ちょっと拍子抜けだ。</p><p><img src="20121102191032.png" alt="f:id:daruyanagi:20121102191032p:plain" title="f:id:daruyanagi:20121102191032p:plain" class="hatena-fotolife"></p><p>試しに WebMatrix でそのサンプルコードを貼り付けてみた。</p><p><img src="20121102191038.png" alt="f:id:daruyanagi:20121102191038p:plain" title="f:id:daruyanagi:20121102191038p:plain" class="hatena-fotolife"></p><p>動いたし。</p><p>HTML + JavaScript で簡単に作れるのならば、ストアアプリも HTML プロジェクトで作るといいのかもしれない。</p>

</div>