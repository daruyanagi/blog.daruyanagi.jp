---
date: 2014-08-26T09:41:10.0000000
draft: false
title: "Clipper 2.0.0.0"
tags: ["Clipper", "告知", "Windows ストア アプリ"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140826/20140826091050.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826091050.png" alt="f:id:daruyanagi:20140826091050p:plain" title="f:id:daruyanagi:20140826091050p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ソースコードなくしたので一から作り直しました orz でも、おかげで</p>

<ul>
<li>共有ターゲットページの表示に時間がかかる</li>
<li>共有ターゲットページの表示に失敗する</li>
</ul><p>といった不具合がだいぶ減っていると思います。</p>

<blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826094535.png" alt="f:id:daruyanagi:20140826094535p:plain" title="f:id:daruyanagi:20140826094535p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>2014/08/26 9:47 追記：<b>ごめんなさい</b>、データの互換性がなくなってるのでもう一度フォーマットの編集と保存をお願いします。保存コマンド（や、Twitter の認証コマンド）はアプリバーにあります。</p>

</blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826091420.png" alt="f:id:daruyanagi:20140826091420p:plain" title="f:id:daruyanagi:20140826091420p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これまではテキストフォーマットの設定ファイルを読みだしてその内容（ObservableCollection）をメインページと共有ターゲットページのビューモデルから参照するようにしていたのですが、いろいろ不具合が出てしまいます（<a href="https://blog.daruyanagi.jp/entry/2014/08/16/211610">WinRT: COM &#x30B3;&#x30F3;&#x30DD;&#x30FC;&#x30CD;&#x30F3;&#x30C8;&#x3092;&#x8868;&#x3059;&#x578B;&#x306E;&#x30A4;&#x30F3;&#x30BF;&#x30FC;&#x30D5;&#x30A7;&#x30A4;&#x30B9;&#x3092; COM &#x30B3;&#x30F3;&#x30DD;&#x30FC;&#x30CD;&#x30F3;&#x30C8;&#x3092;&#x8868;&#x3055;&#x306A;&#x3044;&#x578B;&#x306B;&#x30AD;&#x30E3;&#x30B9;&#x30C8;&#x3059;&#x308B;&#x3053;&#x3068;&#x306F;&#x3067;&#x304D;&#x307E;&#x305B;&#x3093;&#x3002; - &#x3060;&#x308B;&#x308D;&#x3050;</a>、この内容も全然回避になってなくて、共有ターゲットページの表示に失敗する原因になってました）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826091808.png" alt="f:id:daruyanagi:20140826091808p:plain" title="f:id:daruyanagi:20140826091808p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>というわけで、ちょっと無駄になるのだけどそれぞれのビューモデルにそれぞれ同じようなクラスを書き、リストを保持するようにしました（クラスを共用するようにすることもダメみたい）。保守性が下がっちゃったけど、so far, so good って感じですかね。</p><p>あと、そのほかにも</p>

<ul>
<li>ユーザーインターフェイスがちょろっとリッチになりました。</li>
</ul><p>少しはわかりやすくなったかなーって思います。</p><p><div class="wsoembed" data-appid="f74908d9-86cf-4624-9c8d-b3dd24987bd3"></div><script src="http://wsoembed.com/widget.js" async="async"></script></p><p>（ブラウザーなどの［共有］チャームからタイトルや URL、選択テキストなどをあらかじめ記述したテンプレートに従って整形し、クリップボードへコピーしたり、ツイートしたりするアプリです）</p>

<div class="section">
<h3>注意点</h3>
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/daruyanagi?ref_src=twsrc%5Etfw">@daruyanagi</a> Clipper便利でですね！<br>コメント入力テキストボックスが非アクティブになったらソフトキーボード消えるようにしてもらえるとありがたいです</p>&mdash; くつき くれむ（公式）.eXe (@k2kkrm) <a href="https://twitter.com/k2kkrm/status/503920531729424385?ref_src=twsrc%5Etfw">2014年8月25日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>キーボードのない端末でコメントテキストボックスにフォーカスを当て、次にリストボックスを選択すると、オンスクリーンキーボードがとじないようです。</p><p>少し調べてみましたが、残念ながらいい解決が思いつきませんでした。オンスクリーンキーボードの表示・非表示は OS（？）の仕事のようなのですが……最初にリストボックスを選択するとオンスクリーンキーボードは現れないので、編集可能なコントロールからフォーカスがほかに移ったにもかかわらずオンスクリーンキーボードが閉じないのは OS 側の問題かなって気もしないでもないです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826093301.png" alt="f:id:daruyanagi:20140826093301p:plain" title="f:id:daruyanagi:20140826093301p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>橙色で囲った辺りをタップするとオンスクリーンキーボードは消えますので、不便で申し訳ないのですが、当面はそれで回避していただけるとありがたいです。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140826093508.png" alt="f:id:daruyanagi:20140826093508p:plain" title="f:id:daruyanagi:20140826093508p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ダウンロードが 7 もある！ ひとつは多分自分だから、もの好きが6人もいるってことだな！　ありがたい！</p>

</div>