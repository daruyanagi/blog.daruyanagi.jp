---
date: 2015-03-31T20:14:53.0000000
draft: false
title: "エラー 0x80070520 が発生して Windows 10 Technical Preview Build 10049 へアップデートできない"
tags: ["Windows 10"]
eyecatch: 20150331200528.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150331200528.png" alt="f:id:daruyanagi:20150331200528p:plain" title="f:id:daruyanagi:20150331200528p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>fbl_impressive（開発ブランチの名前らしい）という Windows Update パッケージのインストールに失敗する現象に遭遇。</p>

<div class="section">
<h3>解決策その一</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150331201018.png" alt="f:id:daruyanagi:20150331201018p:plain" title="f:id:daruyanagi:20150331201018p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ユーザーが Microsoft アカウントと紐づいている場合、一度ローカルアカウントに切り替えて、再度 Windows Update を実行する。</p><p>自分の環境ではこれでうまくいった。</p>

</div>
<div class="section">
<h3>解決策その二</h3>
<p>cmd.exe を管理者権限で起動し、以下のコマンドを入力。</p>
<pre class="code" data-lang="" data-unlink>Net stop wuauserv
cd %systemroot%
Ren SoftwareDistribution SoftwareDistribution.old
Net start wuauserv</pre><p>要するに Windows Update サービスを一度止め、破損した SoftwareDistribution フォルダ（Windows Update でダウンロードしたファイル群が格納される）を削除（リネーム）し、もう一度 Windows Update サービスを実行する。</p><p>今回はうまくいかなかったけれど、これで直るケースもありそうなので覚えておいた方がいいかも。</p>

<ul>
<li><a href="https://social.technet.microsoft.com/Forums/en-US/726ad1c3-721b-4e86-8682-2835bfb0d784/update-error-code-0x80070520-fblimpressive-10041-professional?forum=WinPreview2014Setup">Update Error Code: 0x80070520 fbl_impressive 10041 Professional</a></li>
</ul>
</div>