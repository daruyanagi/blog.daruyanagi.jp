---
date: 2013-05-22T07:10:25.0000000
draft: false
title: "Surface RT: Facebook のイベントをカレンダーと同期する（Outlook.com / Windows 8）"
tags: ["Facebook", "Windows 8", "Surface RT", "Outlook.com"]
eyecatch: 20130522064414.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522064414.png" alt="f:id:daruyanagi:20130522064414p:plain" title="f:id:daruyanagi:20130522064414p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows 8（Windows RT を含む）では、Microsoft アカウントに Facebook を紐づけている場合、Facebook の友だちの誕生日が「カレンダー」アプリに表示されます。同じようにして Facebook のイベントも「カレンダー」アプリと同期できれば便利ですよね、たぶん。</p>

<div class="section">
<h3>Facebook イベントのエクスポート</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522064918.png" alt="f:id:daruyanagi:20130522064918p:plain" title="f:id:daruyanagi:20130522064918p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まずは Facebook イベントのデータを取得。イベント画面の設定メニューで［エクスポート］を選択。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522065052.png" alt="f:id:daruyanagi:20130522065052p:plain" title="f:id:daruyanagi:20130522065052p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>そして、URL（Internet Explorer の場合は“ショートカット”、Google Chrome の場合は“リンク アドレス”）をクリップボードへコピー。</p>
<pre class="code" data-unlink>webcal://www.facebook.com/ical/b.php?uid=***&amp;key=***</pre><p>こんな感じの URL が取得できれば成功です。なるほど、WebCal（<a href="http://en.wikipedia.org/wiki/Webcal">Webcal - Wikipedia, the free encyclopedia</a>）なんですね。</p>

</div>
<div class="section">
<h3>outlook.com へインポート</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522065929.png" alt="f:id:daruyanagi:20130522065929p:plain" title="f:id:daruyanagi:20130522065929p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「カレンダー」アプリのデータは outlook.com のカレンダーと同期されています（普通は）。なので、「カレンダー」アプリと同期するには outlook.com と同期させればいい。ちなみに、メールからカレンダーへ移動するには、Outlook ロゴの右隣にあるボタンを押す（これ、Windows 8 のユーザーインターフェイスに慣れてないとわかりにくいよね？）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522082100.png" alt="f:id:daruyanagi:20130522082100p:plain" title="f:id:daruyanagi:20130522082100p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に［インポート］メニューを開く。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522070211.png" alt="f:id:daruyanagi:20130522070211p:plain" title="f:id:daruyanagi:20130522070211p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは［受信登録］の欄にさきほどの URL を登録するだけ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522070332.png" alt="f:id:daruyanagi:20130522070332p:plain" title="f:id:daruyanagi:20130522070332p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これで outlook.com はもちろん、Surface RT の「カレンダー」アプリとも同期される。「カレンダー」アプリを再起動すると、［オプション］画面で新しく受信登録したカレンダーを ON にすることができる。</p>

</div>
<div class="section">
<h3>注意</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130522070510.png" alt="f:id:daruyanagi:20130522070510p:plain" title="f:id:daruyanagi:20130522070510p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Facebook と outlook.com の同期にはかなりラグがあるので注意。今は 2013/05/22 7:05 で、登録からほぼ丸一日たつけど、いまだに更新されていない。</p>

</div>
<div class="section">
<h3>追記</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130524101555.png" alt="f:id:daruyanagi:20130524101555p:plain" title="f:id:daruyanagi:20130524101555p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>同期されました。数日間のラグは考えておいた方がよさそう。</p>

</div>