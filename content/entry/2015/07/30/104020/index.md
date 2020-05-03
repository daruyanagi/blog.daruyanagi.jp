---
date: 2015-07-30T10:40:20.0000000
draft: false
title: "エラー 80070057 および 80240020 が発生して Windows 10 へアップグレードできない"
tags: ["Windows 10"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20150730/20150730014156.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150730014156.png" alt="f:id:daruyanagi:20150730014156p:plain" title="f:id:daruyanagi:20150730014156p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>以前のエントリの応用で直せる……はず（知らんけど</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2015%2F03%2F31%2F201453" title="エラー 0x80070520 が発生して Windows 10 Technical Preview Build 10049 へアップデートできない - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>管理者権限で cmd を起動。</p>
<pre class="code" data-lang="" data-unlink>C:Windows\System32&gt;net stop wuauserv
Windows Update サービスを停止中です.
Windows Update サービスは正常に停止されました。

C:Windows\System32&gt;cd %systemroot%

C:Windows&gt;ren SoftwareDistribution SoftwareDistribution.old
（C:Windows&gt;rd /s SoftwareDistribution\Download）

C:Windows&gt;net start wuauserv
Windows Update サービスを開始します.
Windows Update サービスは正常に開始されました。

C:Windows&gt;&lt;b&gt;wuauclt /updatenow</pre><p>これで Windows Update を開けば、Windows 10 のダウンロードが再び始まるので、次はちゃんと成功するように祈る。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150730014459.png" alt="f:id:daruyanagi:20150730014459p:plain" title="f:id:daruyanagi:20150730014459p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なお、例では ren で SoftwareDistribution をリネームしていますが、 rd で消してしまってもいい気がする（ほんとは SoftwareDistribution\Download だけ消せばいいらしい。これならエクスプローラーからでも削除できる。失敗する場合は wuauserv を一度止める）。<code>wuauclt /updatenow</code> は何回か叩かないと動かなかった。</p>

<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150730024254.png" alt="f:id:daruyanagi:20150730024254p:plain" title="f:id:daruyanagi:20150730024254p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これで 80070057 は消えましたが、80240020 はダメだった／(＾o＾)＼</p>

</div>
<div class="section">
<h4>結局</h4>
<p>何回かやれば行けるッぽいのだけど、メディア作成ツールでインストールメディアを作成してアップグレードするのが早いです（ぁ</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fpc.watch.impress.co.jp%2Fdocs%2Fnews%2F20150729_713957.html" title="Windows 10のインストールプログラムが提供開始  ～アップグレードとクリーンインストールに対応" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>実はこれでも一度失敗したのですが、更新プログラムのダウンロードを無効にして再トライするとイケました。</p>

</div>