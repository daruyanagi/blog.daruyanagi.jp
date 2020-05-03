---
date: 2013-05-04T04:06:25.0000000
draft: false
title: "Microsoft WebMatrix 3 が正式版に"
tags: ["WebMatrix", "Web Platform Installer"]
eyecatch: http://a0.twimg.com/profile_images/565139568/redshirt_normal.jpg
---
<p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-329685225007362048');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('329685225007362048',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-329685225007362048"></div></p><p>おつかれさま！　URL からも「next」がとれました。</p>

<ul>
<li><a href="http://www.microsoft.com/web/webmatrix/">http://www.microsoft.com/web/webmatrix/</a></li>
</ul><p>あと、TechCrunch が記事にしてくれています。</p>

<ul>
<li><a href="http://jp.techcrunch.com/2013/05/02/20130501microsoft-webmatrix-3-web-development-tool-comes-with-deeper-windows-azure-integration-and-support-for-github/">Microsoft&#x306E;Web&#x958B;&#x767A;&#x30C4;&#x30FC;&#x30EB;WebMatrix&#x304C;&#x30D0;&#x30FC;&#x30B8;&#x30E7;&#x30F3;3&#x3068;&#x306A;&#x308A;GitHub&#x3092;&#x30B5;&#x30DD;&#x30FC;&#x30C8; | TechCrunch Japan</a></li>
</ul><p>僕の出番はなさそうですね（ぁ</p><p>これまでプレビューを使ってきたけれど、クリティカルなバグはあまりなかったんじゃないかな。クラッシュもほとんどなかった。2010年に公開された当初はエディターが重かったり、たまにクラッシュしたりなどと少し困ったところもあったのですが、そういった弱点も少しずつ改善されて、今ではすっかりよい子になりました。とくに Windows Azure Web Sites 連携は最高……楽ちんすぎる！</p><p>正式版はちゃんと日本語化もされているようですね。注目の変更点はこれまでも何回かブログに書いてきたので、興味があれば参照してほしいです。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/04/05/153356">WebMatrix 3 Preview + Team Foundation Service - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/23/080714">WebMatrix 3 Preview&#xFF1A;TypeScript &#x306E;&#x30B5;&#x30DD;&#x30FC;&#x30C8; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/23/073646">WebMatrix 3 Preview &rarr; Windows Azure Web Sites &#x304C;&#x5149;&#x901F;&#x904E;&#x304E;&#x3066;&#x7B11;&#x3046;&#x3057;&#x304B;&#x306A;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/22/060002">Microsoft WebMatrix 3 Preview - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>あと、細かいところではこんなところも変わってるんだよ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035249.png" alt="f:id:daruyanagi:20130504035249p:plain" title="f:id:daruyanagi:20130504035249p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プレリリース版の NuGet パッケージもインストールできます！</p>


<div class="section">
<h3>インストール</h3>
<p>インストールは「Web Platform Installer 4.5」から。「Microsoft WebMatrix 2」を使っている場合は、アップグレードの通知がくるので、そこから「Web Platform Installer」「WebMatrix」のアップデートがまとめて行えるはず。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035833.png" alt="f:id:daruyanagi:20130504035833p:plain" title="f:id:daruyanagi:20130504035833p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035839.png" alt="f:id:daruyanagi:20130504035839p:plain" title="f:id:daruyanagi:20130504035839p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035846.png" alt="f:id:daruyanagi:20130504035846p:plain" title="f:id:daruyanagi:20130504035846p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035850.png" alt="f:id:daruyanagi:20130504035850p:plain" title="f:id:daruyanagi:20130504035850p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035858.png" alt="f:id:daruyanagi:20130504035858p:plain" title="f:id:daruyanagi:20130504035858p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130504035903.png" alt="f:id:daruyanagi:20130504035903p:plain" title="f:id:daruyanagi:20130504035903p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プレビュー版からアップデートした場合は、「WebMatrix」本体の更新だけで済むようですね（あっという間にアップデートできた）。</p><p>「WebMatrix 3」ではインストール処理にも改善が加えられており、初期状態では動作に最低限必要なコンポーネントのみをセットアップするようになっています。わけのわからないコンポーネントをいろいろぶち込まれるのが嫌だという人にも優しいし、なによりセットアップにかかる時間がだいぶ減っているのがうれしいところ。</p><p>XAMPP なんか捨てちまえよ。</p>

</div>