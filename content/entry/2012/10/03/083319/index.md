---
date: 2012-10-03T08:33:19.0000000
draft: false
title: "ちょっとしたサイドバーのようなものを出したい……"
tags: ["WinRT"]
eyecatch: 
---
<p><img src="20121003081253.png" alt="f:id:daruyanagi:20121003081253p:plain" title="f:id:daruyanagi:20121003081253p:plain" class="hatena-fotolife"></p><p>書いたようで書いていなかったので。</p><p>Windows ストアアプリでデータを入力する際、当初は入力ページに遷移していたのだけれど、ちょっと大げさかなと思う。そこで、一時的にサイドバーみたいなものをだして入力するインターフェイスを考えた。標準アプリでも、「カレンダー」なんかがそんな感じだよね。</p><p>で、これを<b>自分で実装しようとした</b>わけだ。AppBar を押したらアニメーション付きで表示して、フォーカスを失ったら閉じる。これが結構めんどくさくて、意図したとおりに動いてくれない。たとえば、サイドバーの表示中にチャームをだしても閉じてくれなかったり、サイドバー内でコントロールが変わった時に非表示になったり……</p><p>でも、そんなダメなひとのために、<a href="http://nuget.org/packages/TCD.Controls">NuGet Gallery | TCD.Controls 1.3.7</a> があるわけなんだな。これの Flyout コントロールを使うと、意図したことがとても簡単に実現できそうだ。</p><p><img src="20121003082307.png" alt="f:id:daruyanagi:20121003082307p:plain" title="f:id:daruyanagi:20121003082307p:plain" class="hatena-fotolife"></p><p><a href="http://kuchenzeit.wordpress.com/2012/03/26/settingscontractwrapper-the-easy-way-to-integrate-w-settings/">SettingsContractWrapper &ndash; the easy way to integrate w/ settings &laquo; Kuchenzeit</a> のサンプルがとてもわかりやすかったので、よくわかんない人は試してみたらいいかもしれない。設定コントラクトのラッパーなんかも用意されている。</p><p><img src="20121003083033.png" alt="f:id:daruyanagi:20121003083033p:plain" title="f:id:daruyanagi:20121003083033p:plain" class="hatena-fotolife"></p>
