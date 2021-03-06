---
date: 2012-03-03T20:58:15.0000000
draft: false
title: "VHD に Windows 8 Consumer Preview をインストールしてデュアルブートしてみる"
tags: []
eyecatch: 
---
<p>ウチの環境はパーティションを切らずに Windows 7 をインストールしている。これに Windows 8 CP をインストールしたいのだけど、パーティションを縮めたり切ったりするのはちょっと怖い。なので、今回は <a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> へ Windows 8 CP をインストールして<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%C7%A5%E5%A5%A2%A5%EB%A5%D6%A1%BC%A5%C8">デュアルブート</a>にしてみた。</p>

<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> の作成</h3>
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/03/03/183312">VHD &#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x4F5C;&#x6210; - &#x3060;&#x308B;&#x308D;&#x3050;</a> をみて <a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> ファイルを作る。今回は C:\<a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a>\Win8cp.<a class="keyword" href="http://d.hatena.ne.jp/keyword/vhd">vhd</a> というファイルを作ってみた。</p>

</div>
<div class="section">
<h3>インストールメディアの作成</h3>

<ul>
<li><a href="http://daruyanagi.hatenablog.com/entry/2012/03/01/065626">Windows 8 Consumer Preview &#x3092; DVD-R &#x304B;&#x3089;&#x30A4;&#x30F3;&#x30B9;&#x30C8;&#x30FC;&#x30EB;&hellip;&hellip;&#x5931;&#x6557; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="http://daruyanagi.hatenablog.com/entry/2012/03/01/053229">Windows 8 Consumer Preview &#xFF08;&#x9014;&#x4E2D;&#x307E;&#x3067;&#x30A4;&#x30F3;&#x30B9;&#x30C8;&#x30FC;&#x30EB;&#x3057;&#x305F;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="http://daruyanagi.hatenablog.com/entry/2012/03/02/120740">Windows 8 Consumer Preview &#x306E;&#x30A4;&#x30F3;&#x30B9;&#x30C8;&#x30FC;&#x30EB;USB&#x30E1;&#x30E2;&#x30EA;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>DVD-R でも <a class="keyword" href="http://d.hatena.ne.jp/keyword/USB%A5%E1%A5%E2%A5%EA">USBメモリ</a>でもいいので作る。今回は<a class="keyword" href="http://d.hatena.ne.jp/keyword/USB%A5%E1%A5%E2%A5%EA">USBメモリ</a>を使った。</p>

</div>
<div class="section">
<h3>Windows 8 CP のインストール</h3>
<p><img src="20120303203955.png" alt="f:id:daruyanagi:20120303203955p:plain" title="f:id:daruyanagi:20120303203955p:plain" class="hatena-fotolife"></p><p>カスタム設定を選択。</p><p><img src="20120303204021.png" alt="f:id:daruyanagi:20120303204021p:plain" title="f:id:daruyanagi:20120303204021p:plain" class="hatena-fotolife"></p><p>インストールするパーティションを選択する画面で、［Shift］＋［F10］キーを押す。すると<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B3%A5%DE%A5%F3%A5%C9%A5%D7%A5%ED%A5%F3%A5%D7%A5%C8">コマンドプロンプト</a>が起動するので、ここで <a class="keyword" href="http://d.hatena.ne.jp/keyword/VHD">VHD</a> を接続（Attach）する。</p><p><img src="20120302191323.jpg" alt="f:id:daruyanagi:20120302191323j:plain" title="f:id:daruyanagi:20120302191323j:plain" class="hatena-fotolife"></p>

<pre class="code" data-unlink>DISKPART

DISKPART&gt;SELECT VDISK FILE=&#34;E:\VHD\Win8cp.vhd&#34;

DISKPART&gt;ATTACH VDISK

DISKPART&gt;EXIT

EXIT</pre>
<p>ドライブレターがズレてしまうので、あらかじめ VHD ファイルのパスを再確認しておこう。ウチの場合は、Eドライブにあった。</p><p>VHD を接続して［最新の状態に更新］すると、接続したVHDがパーティションの一覧に現れる。あとはそれを選択してインストール作業を進めればよい。</p><p><img src="20120302192540.jpg" alt="f:id:daruyanagi:20120302192540j:plain" title="f:id:daruyanagi:20120302192540j:plain" class="hatena-fotolife"></p><p>できたよー ＼(^o^)／</p>

</div>
<div class="section">
<h3>トラブルシューティング</h3>

<div class="section">
<h4>このディスクには Windows をインストールできません、と言われる</h4>
<p><img src="20120302191413.jpg" alt="f:id:daruyanagi:20120302191413j:plain" title="f:id:daruyanagi:20120302191413j:plain" class="hatena-fotolife"></p><p>実際にはインストールが可能。</p>

</div>
<div class="section">
<h4>スキャンディスクが……</h4>
<p><img src="20120302192147.jpg" alt="f:id:daruyanagi:20120302192147j:plain" title="f:id:daruyanagi:20120302192147j:plain" class="hatena-fotolife"></p><p>見てみないふりする。</p>

</div>
<div class="section">
<h4>スタートアップの修復が必要だと言われる</h4>
<p><img src="20120302194751.jpg" alt="f:id:daruyanagi:20120302194751j:plain" title="f:id:daruyanagi:20120302194751j:plain" class="hatena-fotolife"></p><p>まず落ち着く。</p><p><img src="20120302194850.jpg" alt="f:id:daruyanagi:20120302194850j:plain" title="f:id:daruyanagi:20120302194850j:plain" class="hatena-fotolife"></p><p>PC叩いて再起動でもすりゃ直る。</p>

</div>
</div>