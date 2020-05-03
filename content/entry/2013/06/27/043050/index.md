---
date: 2013-06-27T04:30:50.0000000
draft: false
title: "Surface RT に Windows RT 8.1 Preview をインストール…できなかった → 解決"
tags: ["Surface RT", "Windows 8.1"]
eyecatch: 20130627041654.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627041654.png" alt="f:id:daruyanagi:20130627041654p:plain" title="f:id:daruyanagi:20130627041654p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows RT 8.1 Preview がきた━━━━━━(ﾟ∀ﾟ)━━━━━━!!!!</p>

<ul>
<li><a href="http://windows.microsoft.com/ja-jp/windows-8/preview">Windows 8.1 Preview - Microsoft Windows</a></li>
</ul><p>さっそくインストールしてみました。</p>

<div class="section">
<h3>KB2849636 のインストール</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627042051.png" alt="f:id:daruyanagi:20130627042051p:plain" title="f:id:daruyanagi:20130627042051p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず更新プログラム KB2849636 をダウンロード。これは Windows ストアで Windows RT 8.1 Preview のダウンロードを入手するために必要。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627041842.png" alt="f:id:daruyanagi:20130627041842p:plain" title="f:id:daruyanagi:20130627041842p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>デスクトップでダウンロードした更新プログラムをインストール。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627042010.png" alt="f:id:daruyanagi:20130627042010p:plain" title="f:id:daruyanagi:20130627042010p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows ストアで Windows RT 8.1 Preview が入手できるようになる。</p>

</div>
<div class="section">
<h3>Windows ストアからダウンロード</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627042232.png" alt="f:id:daruyanagi:20130627042232p:plain" title="f:id:daruyanagi:20130627042232p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows ストアで Windows RT 8.1 Preview をダウンロード。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627042327.png" alt="f:id:daruyanagi:20130627042327p:plain" title="f:id:daruyanagi:20130627042327p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>2GB 以上あるのでじっと待つ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627042433.png" alt="f:id:daruyanagi:20130627042433p:plain" title="f:id:daruyanagi:20130627042433p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>死にたい。</p><p>Surface RT を工場出荷時へ初期化してインストールを数回試みたけれど、いずれも 0x8020002e エラーで停止する。</p><p>というわけで、Windows 8.1 Preview のフォーラムへ一番乗りしたった！</p>

<ul>
<li><a href="http://answers.microsoft.com/ja-jp/windows/forum/windows8_1_pr-windows_update/windows-rt-81-preview/ac0096c9-447c-4544-b757-c7f3f687ec53">Windows RT 8.1 Preview &#x306E;&#x30A4;&#x30F3;&#x30B9;&#x30C8;&#x30FC;&#x30EB;&#x306B;&#x5931;&#x6557;&#x3059;&#x308B;&#xFF08;0x8020002e&#xFF09; - &#x30DE;&#x30A4;&#x30AF;&#x30ED;&#x30BD;&#x30D5;&#x30C8; &#x30B3;&#x30DF;&#x30E5;&#x30CB;&#x30C6;&#x30A3;</a></li>
</ul><p>自分でも解決策を模索してみるけれど、もし先に見つけた人がいたら教えてください。</p>

</div>
<div class="section">
<h3>追記: 0x8020002e エラーの解消</h3>
<p>まともな情報がココぐらいしかないので、挙げられている解決策をしらみつぶしに行なってみた。</p>

<ul>
<li><a href="http://answers.microsoft.com/en-us/windows/forum/windows_8-windows_store/error-code-0x8020002e-unable-to-update-or-install/26b83d0b-9385-42a6-a5cd-72ee33e2426d">Error code: 0x8020002e unable to update or install windows 8 pro - Microsoft Community</a></li>
</ul>
<div class="section">
<h4>wsreset.exe によるキャッシュのクリア</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627045335.png" alt="f:id:daruyanagi:20130627045335p:plain" title="f:id:daruyanagi:20130627045335p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ストアアプリのキャッシュを削除する。まずこれを試してみて、動けば幸運。自分の場合、これだけではダメだった。</p>

</div>
<div class="section">
<h4>DNS Client Service の停止</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627045546.png" alt="f:id:daruyanagi:20130627045546p:plain" title="f:id:daruyanagi:20130627045546p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows サービスの管理画面を起動し、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130627045637.png" alt="f:id:daruyanagi:20130627045637p:plain" title="f:id:daruyanagi:20130627045637p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「DNS Client」を停止する（キャッシュのクリアも忘れないこと）。ウチの環境ではこれが正解だった。ダウンロードを再試行したところ、インストールが開始された。</p><p>あとは、安定した回線を利用するようにするといった対策をとるしかないみたい。 </p>

</div>
</div>