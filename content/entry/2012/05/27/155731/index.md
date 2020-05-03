---
date: 2012-05-27T15:57:31.0000000
draft: false
title: "デスクトップ全体を一時的に暗転させたい"
tags: ["C#"]
eyecatch: 
---
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/03/05/220912">Windows 8 &#x306F;&#xFF3B;Windows&#xFF3D;&#xFF0B;&#xFF3B;PrintScreen&#xFF3D;&#x30AD;&#x30FC;&#x3067;&#x30C7;&#x30B9;&#x30AF;&#x30C8;&#x30C3;&#x30D7;&#x306E;&#x30B9;&#x30AF;&#x30EA;&#x30FC;&#x30F3;&#x30B7;&#x30E7;&#x30C3;&#x30C8;&#x3092;&ldquo;&#x30D4;&#x30AF;&#x30C1;&#x30E3;&#x30FC;&rdquo;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x306B;&#x4FDD;&#x5B58;&#x3067;&#x304D;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> </p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%208">Windows 8</a>では、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A1%BC%A5%F3%A5%B7%A5%E7%A5%C3%A5%C8">スクリーンショット</a>を撮るときデスクトップにエフェクトがかかる。画面が一瞬だけ暗転して徐々に戻る、といった感じのエフェクトなのだけど、どうせなら <a href="http://daruyanagi.net/Type08ScreenCapture">Type08ScreenCapture - Daruboard</a> でもちゃんと再現してみたい。</p><p>ってことで、やってみた。</p><p><script src="https://gist.github.com/2802461.js"> </script></p><p>黒い全画面フォームを用意して、透明度を調整しながら表示・非表示するだけ。透明度の調整は最初手動でやっていたのだけど、Win32 <a class="keyword" href="http://d.hatena.ne.jp/keyword/API">API</a> に AnimateWindow() というそれ専用の <a class="keyword" href="http://d.hatena.ne.jp/keyword/API">API</a> があったので結局はそっちを使った。</p><p>まぁ、悪くない気がする。</p>
