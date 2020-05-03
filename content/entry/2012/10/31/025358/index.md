---
date: 2012-10-31T02:53:58.0000000
draft: false
title: "Windows Phone SDK 8.0 ━━━━(゜∀゜)━━━━ッ!!"
tags: ["Windows Phone"]
eyecatch: 
---
<p><img src="20121031022044.png" alt="f:id:daruyanagi:20121031022044p:plain" title="f:id:daruyanagi:20121031022044p:plain" class="hatena-fotolife"></p><p><a href="http://channel9.msdn.com/">Build 2012 | Channel 9</a> を見ている。だいぶ眠いけれど、「Windows Phone SDK 8.0」がリリースされたのでダウンロードしてみた。</p>

<blockquote>
<p>Windows Phone SDK 8.0 は、Windows Phone 8.0 および Windows Phone 7.5 のアプリとゲームを構築するための全機能を装備した開発環境です。Windows Phone SDK は、Windows Phone 用のスタンドアロンの Visual Studio Express 2012 エディションを提供するか、または Visual Studio 2012 Professional、Premium、Ultimate エディションのアドインとして動作します。この SDK を使用すると、既存のプログラミング スキルやコードを利用して、マネージ コードまたはネイティブ コード アプリを作成できます。さらに、この SDK には、実際の条件下で Windows Phone アプリのプロファイリングやテストを実行できる、複数のエミュレーターおよび追加のツールが含まれています。</p>

</blockquote>
<p>Windows 8 は WPSDK 7.x がサポートされないので、WPSDK 8.0 を利用することになる。ちゃんと Windows Phone 7.5 のアプリも開発できる！</p>

<ul>
<li><a href="http://www.microsoft.com/ja-jp/download/details.aspx?id=35471">Download: WPSDK 8.0 - Microsoft Download Center - Download Details</a></li>
</ul>
<div class="section">
<h3>システム要件</h3>
<p><img src="20121031025240.png" alt="f:id:daruyanagi:20121031025240p:plain" title="f:id:daruyanagi:20121031025240p:plain" class="hatena-fotolife"></p><p><b>64bit 版の</b> Windows 8、Windows 8 Pro で動作する。Windows 7 はバッサリ切られた。あと、4GB のストレージ領域と、4GB のメモリが必要。</p><p>加えて、「Windows Phone 8 Emulator」が Hyper-V 2.0 で動く関係で、エミュレーターでアプリを実行するには</p>

<ul>
<li><b>Windows 8 Pro</b></li>
<li>Second Level Address Translation (<b>SLAT</b>) をサポートするプロセッサ</li>
</ul><p>が必要になる。Nehalem 移行の Core i3/i5/i7 ならば大丈夫みたい。</p><p><img src="20121031025251.png" alt="f:id:daruyanagi:20121031025251p:plain" title="f:id:daruyanagi:20121031025251p:plain" class="hatena-fotolife"></p>

<blockquote>
<p>ご使用のコンピューターがハードウェア要件および OS 要件を満たしているけれども、Windows Phone 8 Emulator の要件を満たしていない場合、Windows Phone SDK 8.0 のインストールと実行は行われます。ただし、Windows Phone 8 Emulator は機能せず、Windows Phone 8 Emulator でアプリを展開またはテストすることはできません。</p>

</blockquote>

</div>
<div class="section">
<h3>「Microsoft Visual Studio 2012 Express for Windows Phone」</h3>
<p><img src="20121031023202.png" alt="f:id:daruyanagi:20121031023202p:plain" title="f:id:daruyanagi:20121031023202p:plain" class="hatena-fotolife"></p><p>「Visual Studio 2012 Express」最後（？）のラインナップ「Microsoft Visual Studio 2012 Express for Windows Phone」が同梱されている。有償の「Visual Studio 2010」にはアドオンが追加される。今のところ Windows Phone OS 7.1（Windows Phone 7.5）と Widnows Phone OS 8.0（Windows Phone 8）向けのアプリが開発可能。Windows Phone 7.8 はどうなるんだろう。</p><p><img src="20121031023311.png" alt="f:id:daruyanagi:20121031023311p:plain" title="f:id:daruyanagi:20121031023311p:plain" class="hatena-fotolife"><img src="20121031023315.png" alt="f:id:daruyanagi:20121031023315p:plain" title="f:id:daruyanagi:20121031023315p:plain" class="hatena-fotolife"><img src="20121031024949.png" alt="f:id:daruyanagi:20121031024949p:plain" title="f:id:daruyanagi:20121031024949p:plain" class="hatena-fotolife"></p><p>HTML5 アプリや Dirext X アプリのテンプレートが追加されたのが新しいのかな。Unity なんかも使えるみたいだけど、触ったことないからよくわからない。あと、テンプレートもだいぶ手が入れられていて、多言語対応なんかが楽になっているとか。</p><p><img src="20121031023531.png" alt="f:id:daruyanagi:20121031023531p:plain" title="f:id:daruyanagi:20121031023531p:plain" class="hatena-fotolife"></p><p>Windows Phone 8 のエミュレーター！　Speach やら Bluetooth ファイル転送やら、そのたにもいろいろできるようになったらしい（Twitter で言ってた）。まぁ、そこらへんは実機がないことにはあんまり。</p><p><img src="20121031023616.png" alt="f:id:daruyanagi:20121031023616p:plain" title="f:id:daruyanagi:20121031023616p:plain" class="hatena-fotolife"></p><p>インストーラーに再起動を要求されたのに無視したせいか、エミュレーターは起動できなかった。まだ BUILD を見ている最中だから、これ以上は試せない。</p><p>とりあえず、メモとして。</p>

</div>