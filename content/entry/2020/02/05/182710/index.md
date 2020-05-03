---
date: 2020-02-05T18:27:10.0000000
draft: false
title: "Shriken 1.0.0"
tags: ["Shriken", "UWP", "告知"]
eyecatch: 20200205180825.jpg
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20200205180825.jpg" alt="f:id:daruyanagi:20200205180825j:plain" title="f:id:daruyanagi:20200205180825j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ブログ掲載のために画像をリサイズするだけのアプリ「Shriken」をリリースしました。「スマホ同期」で［共有］→ 画像をリサイズしてクリップボードへコピー → はてなブログへ貼り付ける というプロセスがちょっとだけ簡単になります<a href="#f-a95b695d" name="fn-a95b695d" title="たとえば「フォト」アプリだと、リサイズの幅・高さを微調整できないし、一度ファイルへ保存する必要があります">*1</a>。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.microsoft.com%2Fja-jp%2Fp%2Fshriken%2F9nwsxb0bxg1j%3Frtc%3D1%26activetab%3Dpivot%3Aoverviewtab" title="Shriken を入手 - Microsoft Store ja-JP" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://www.microsoft.com/ja-jp/p/shriken/9nwsxb0bxg1j?rtc=1&activetab=pivot:overviewtab">www.microsoft.com</a></cite></p><p>とりあえずストアに出して、Surface Pro X で使いたいと思い（だから ARM64 ビルドもあるよ！）、不安定な機能は全部削除しているので、普通の人はあまりこれのお世話になることはないと思いますが、将来的には以下の機能が実装される予定です。</p>

<ul>
<li>クロップ</li>
<li>閲覧時のズーム</li>
<li>ペンによる注釈</li>
<li>顔認識と笑い男化</li>
</ul><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">笑い男機能つけといた <a href="https://t.co/jRU3ibh8lA">pic.twitter.com/jRU3ibh8lA</a></p>&mdash; 新型だるやなぎウイルス (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1216385486526140416?ref_src=twsrc%5Etfw">2020年1月12日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>ここまで完成すれば、まぁ、需要はなくもないんじゃないでしょうか。</p><p>ちなみに、名前が Sh<b>u</b>riken ではなく Shriken なのは、他の人に名前がとられてたからです。でも、Shrink image からもじって付けようと思ってたので、あまり問題はない（キリッ</p>

<div class="section">
<h3>開発秘（？）話</h3>
<p>久しぶりの UWP 開発だったので、どんな UI にしていいのかさっぱりわかりませんでした。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">基本機能はできたので、UI をどうにかする（UWP の UI ってどうデザインすればスタンダードなのか、さっぱり忘れた） <a href="https://t.co/GgKE3nFn6R">pic.twitter.com/GgKE3nFn6R</a></p>&mdash; 新型だるやなぎウイルス (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1212862135639793664?ref_src=twsrc%5Etfw">2020年1月2日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">がんばって UI をマシにしてみた <a href="https://t.co/C1Alq1DvsY">pic.twitter.com/C1Alq1DvsY</a></p>&mdash; 新型だるやなぎウイルス (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1212889342055550976?ref_src=twsrc%5Etfw">2020年1月3日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>いろいろ試行錯誤した結果、標準アプリである「フォト」に似せればいいか、という考えに落ちつくまでに、View は3回ぐらい作り直しました。そのおかげで、最初はコードビハインドにべた書きしていた ViewModel、Model も分離されるようになり（だって、View 作り直すたびにコードビハインドをコピペするの大変じゃん？）、（あくまで個人的には）いい感じに設計できました。怪我の功名ってやつですね。機能追加してもそうそう破綻しなさそうです。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ぇ、ドキュメントサイトからコントロールギャラリーアプリを起動して実際に挙動を確かめられるの、めっちゃ素敵やん<a href="https://t.co/ZUiuvcxFaY">https://t.co/ZUiuvcxFaY</a> <a href="https://t.co/8NRNCsJNSE">pic.twitter.com/8NRNCsJNSE</a></p>&mdash; 新型だるやなぎウイルス (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1212862945274654721?ref_src=twsrc%5Etfw">2020年1月2日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>アプリを開発するうえでは、docs.microsoft.com のお世話になりました。最近は Web ページからサンプルアプリを起動して挙動を確認できるのね。すごくいいと思います。ドキュメントサイトはとかくディスられがちだけど、個人的には昔よりだいぶ良くなってると思います。チュートリアルというか、よくある処理の流れが一通り解説されたページや、似たような機能の違いを解説するページも増えてきて、「そう、それが知りたかったんだよ！」って思うことが増えました。かつては StackOverFlow : 公式ドキュメント：<a href="https://blog.okazuki.jp/">Kazuki &#x3055;&#x3093;&#x306E;&#x30D6;&#x30ED;&#x30B0;</a> ＝ 6:1:3 ぐらいな参照比率でしたが、今回は 5:3:2 ぐらいだったかもしれない。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-a95b695d" name="f-a95b695d" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">たとえば「フォト」アプリだと、リサイズの幅・高さを微調整できないし、一度ファイルへ保存する必要があります</span></p>
</div>