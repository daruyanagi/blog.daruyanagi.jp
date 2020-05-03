---
date: 2012-03-03T18:33:12.0000000
draft: false
title: "VHD ファイルの作成"
tags: []
eyecatch: 
---
<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>（Virtual Hard Disk：仮想ハードディスク）の作成。Windows 8は<a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>にインストールしてブートできるので、これからお世話になることが多くなると思う。</p>

<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> ファイルを作成する</h3>
<p>スタートメニューにある［コンピュータ］のコンテクストメニューで［管理］を選択。</p><p><img src="20120303181710.png" alt="f:id:daruyanagi:20120303181710p:plain" title="f:id:daruyanagi:20120303181710p:plain" class="hatena-fotolife"></p><p>［ディスクの管理］を選択。</p><p><img src="20120303180932.png" alt="f:id:daruyanagi:20120303180932p:plain" title="f:id:daruyanagi:20120303180932p:plain" class="hatena-fotolife"></p><p>右ペインにある［ディスクの管理］－［他の操作］から［<a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>の作成］を選択。</p><p><img src="20120303181448.png" alt="f:id:daruyanagi:20120303181448p:plain" title="f:id:daruyanagi:20120303181448p:plain" class="hatena-fotolife"></p><p>設定。普通は容量固定のほうがいいみたい。</p><p><img src="20120303180627.png" alt="f:id:daruyanagi:20120303180627p:plain" title="f:id:daruyanagi:20120303180627p:plain" class="hatena-fotolife"></p><p>作成が始まる。進捗情報はステータスバーに現れる。案外時間がかかるっぽい。OS をインストールするなら、これ以降の作業は必要がないが、一般のドライブとして利用するには、接続と初期化が必要になる。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> ファイルの接続</h3>
<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> ファイルを接続すると、自動でドライバがインストールされ、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%A1%A5%A4%A5%EB%A5%B7%A5%B9%A5%C6%A5%E0">ファイルシステム</a>にマウントして利用することができる。</p><p><img src="20120303182319.png" alt="f:id:daruyanagi:20120303182319p:plain" title="f:id:daruyanagi:20120303182319p:plain" class="hatena-fotolife"></p><p>［ディスクの管理］－［他の操作］から［<a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>の接続］を選択。</p><p><img src="20120303182405.png" alt="f:id:daruyanagi:20120303182405p:plain" title="f:id:daruyanagi:20120303182405p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>ファイルを選択。これでディスクマネージャーに<a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>ボリュームが現れる。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> の初期化</h3>
<p><img src="20120303182532.png" alt="f:id:daruyanagi:20120303182532p:plain" title="f:id:daruyanagi:20120303182532p:plain" class="hatena-fotolife"></p><p>ディスクの初期化。</p><p><img src="20120303182539.png" alt="f:id:daruyanagi:20120303182539p:plain" title="f:id:daruyanagi:20120303182539p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/MBR">MBR</a> と GTP はどちらを選んだらいいのだろう。普通は <a class="keyword" href="http://d.hatena.ne.jp/keyword/MBR">MBR</a> でイイと思う。</p>

</div>
<div class="section">
<h3>パーティションの作成</h3>
<p><img src="20120303182547.png" alt="f:id:daruyanagi:20120303182547p:plain" title="f:id:daruyanagi:20120303182547p:plain" class="hatena-fotolife"></p><p>［新しいシンプルボリューム］を選択すると……</p><p><img src="20120303182556.png" alt="f:id:daruyanagi:20120303182556p:plain" title="f:id:daruyanagi:20120303182556p:plain" class="hatena-fotolife"></p><p>パーティションの作成ウィザードが現れる。</p><p><img src="20120303182615.png" alt="f:id:daruyanagi:20120303182615p:plain" title="f:id:daruyanagi:20120303182615p:plain" class="hatena-fotolife"></p><p>パーティションサイズの指定。</p><p><img src="20120303182624.png" alt="f:id:daruyanagi:20120303182624p:plain" title="f:id:daruyanagi:20120303182624p:plain" class="hatena-fotolife"></p><p>ドライブレターの割り当て。</p><p><img src="20120303182634.png" alt="f:id:daruyanagi:20120303182634p:plain" title="f:id:daruyanagi:20120303182634p:plain" class="hatena-fotolife"></p><p>フォーマット方法を指定。多分、初期値のままでOK。</p><p><img src="20120303182643.png" alt="f:id:daruyanagi:20120303182643p:plain" title="f:id:daruyanagi:20120303182643p:plain" class="hatena-fotolife"></p><p>あとは待つのみ。</p>

</div>