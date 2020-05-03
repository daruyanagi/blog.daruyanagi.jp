---
date: 2012-09-08T04:51:20.0000000
draft: false
title: "WebMatrix 2 RTM ファーストインプレッション"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908043800.png" alt="f:id:daruyanagi:20120908043800p:plain" title="f:id:daruyanagi:20120908043800p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2012/09/07/221315">&#x300C;Microsoft WebMatrix 2&#x300D;&#x304C;&#x6B63;&#x5F0F;&#x7248;&#x306B;&hellip;&hellip;&#x30AC;&#x30C3;&#x30C7;&#x30E0;&#xFF0F;(^o^)&#xFF3C; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でファーストインプレッションをすっかり書くのを忘れていた。テンプレートからサイトが新規に作成できない問題はすでにフォーラムへ報告しておいたので、既存の Web サイトを開いてみてほかに気付いた点を。</p>

<div class="section">
<h3>テキストエディターはかなりよくなった</h3>
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">WebMatrix2はパフォーマンスがかなり改善されてます。ときどきやたら反応が重かった問題に対応されてますので、ぜひお試しを</p>&mdash; 帝国兵 (@superriver) <a href="https://twitter.com/superriver/status/243832941581570048?ref_src=twsrc%5Etfw">2012年9月6日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>少し使ってみたけれど、クリップボードへのコピーでもたついたり、ときどきかなり遅くなったり、挙げ句の果てはクラッシュするといったエディター関連の問題はかなり解消されたみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120815054857.png" alt="f:id:daruyanagi:20120815054857p:plain" title="f:id:daruyanagi:20120815054857p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/15/061025">
<p>あと、［Alt］キーでメニューのナビゲーションが出るのだけれど、そっちにフォーカスがとられて矩形選択や IME の切り替えに支障が出るのもなおしてほしいところかな。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/15/061025">WebMatrix + ASP.NET Web Pages &#x3067;&#x30AD;&#x30EC;&#x30A4;&#x306B;&#x30B3;&#x30FC;&#x30C7;&#x30A3;&#x30F3;&#x30B0;&#x3057;&#x305F;&#x3044;&#xFF08;5&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>あんまり期待していなかったこの問題も見事に解消されていた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908042510.png" alt="f:id:daruyanagi:20120908042510p:plain" title="f:id:daruyanagi:20120908042510p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>IME の切り替えで［Alt］＋［~］を利用しても、メニューナビゲーションにキーボードのフォーカスが奪われることがなくなった。最悪「そっちのキーバインド変えれば済むだろ」と言われるのを覚悟していたので、ちょっと嬉しい。</p>

</div>
<div class="section">
<h3>［ギャラリー］ボタンの改良</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908042630.png" alt="f:id:daruyanagi:20120908042630p:plain" title="f:id:daruyanagi:20120908042630p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ギャラリーボタンに「拡張機能」と「NuGet」がまとめられた。</p><p>ただ、これは［ファイル］セクションを開いている場合のみ。［サイト］セクションを開いているとドロップダウンが現れず、「拡張機能ギャラリー」がいきなり起動する。この動作の違いは、ちょっと戸惑う。最初だけだけどね。</p>

</div>
<div class="section">
<h3>リモートサイトの設定</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908043149.png" alt="f:id:daruyanagi:20120908043149p:plain" title="f:id:daruyanagi:20120908043149p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>前からこんなんだっけ？　ちょっと自信はないけれど、わかりやすくなったと思う。 WebMatrix はもう完全に“Widows Azure Web Sites のクライアント”という位置づけなのだなぁ。</p>

</div>
<div class="section">
<h3>コンポーネント・ライブラリのアップデート</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908043455.png" alt="f:id:daruyanagi:20120908043455p:plain" title="f:id:daruyanagi:20120908043455p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>リリース候補版で作った Web サイトを開くと、“APS.NET Web ページ”をアップデートするかと聞かれる。どちらも試してみたけれど、問題なくアップデートできる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908044336.png" alt="f:id:daruyanagi:20120908044336p:plain" title="f:id:daruyanagi:20120908044336p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たぶん、あとからでもバージョンアップできるはず。［サイト］セクションの［設定］を開いてみよう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908043354.png" alt="f:id:daruyanagi:20120908043354p:plain" title="f:id:daruyanagi:20120908043354p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>しかし、“Starter Site”テンプレートの「Microsoft WebPages OAuth Library」をアップデートしようとすると、エラーが発生する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908043656.png" alt="f:id:daruyanagi:20120908043656p:plain" title="f:id:daruyanagi:20120908043656p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これは WebMatrix のせいというわけではないのだけれど、 Microsoft がメンテしてるパッケージだよね……。まぁ、じきに直るんだろうけど。</p>

</div>
<div class="section">
<h3>Web サイトが開始できない</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120908044321.png" alt="f:id:daruyanagi:20120908044321p:plain" title="f:id:daruyanagi:20120908044321p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>手元にあったリリース候補版のテンプレート（初期状態）で幾つか試したのだけれど、“APS.NET Web ページ”のアップデートいかんにかかわらず、すべて動かなかった。</p><p>どうもうちの環境ではいろいろ問題があるみたい。仕事柄プレリリースの製品をインストール・アンインストールする機会が多いので、そろそろダメになっているのかもしれない。まぁ、メイン PC も Windows 8 にしようかなぁと考えていたところなので、その後もう一度試してみるかな。</p>

</div>