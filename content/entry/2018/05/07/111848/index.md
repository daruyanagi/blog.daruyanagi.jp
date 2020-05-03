---
date: 2018-05-07T11:18:48.0000000
draft: false
title: "Windows 10 April 2018 Update 環境で Explorer.exe が頻繁にフリーズ・クラッシュする"
tags: ["Dropbox", "Windows 10"]
eyecatch: 20180507111025.png
---
<p>Dropbox ローカルフォルダーでファイル操作を行うと Explorer をクラッシュさせるようだ。しばらく待っていればファイル操作は完了するが、CPU を1コア使い切ったりするので、OS 全体のパフォーマンスに影響が出る（追記：コラボレーションに利用していると相手側のファイル操作でもこちら側の OS が半分フリーズしてつらい！！）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507111025.png" alt="f:id:daruyanagi:20180507111025p:plain" title="f:id:daruyanagi:20180507111025p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507111055.png" alt="f:id:daruyanagi:20180507111055p:plain" title="f:id:daruyanagi:20180507111055p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Dropbox クライアントのバージョンは 48.4.58。Qt を使ってるみたいだけど、管理 UI の HiDPI 対応もイマイチだし、しょうもない機能を追加するぐらいならばネイティブで作り直してほしい感じする。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507111102.png" alt="f:id:daruyanagi:20180507111102p:plain" title="f:id:daruyanagi:20180507111102p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows 10 April 2018 Update ではそのほかにも Google Chrome や Mozilla Firefox で互換性問題が出ているようだが（Firefox はマイナーアップデートで修正済み、Chrome はウチの環境では問題ない）、これらはかならずしも OS のせいとは言えない。OS の仕様変更がアプリの実装不備を顕在化させるケースもあるわけで、要するにテスト不足だ。</p><p>Insider Preview でもっとサードパーティー製アプリのテストをしてもらうにはどうすればいいか、もう少し考えないといけないかもしれない。わいの仕事ではないけど。</p>

<div class="section">
<h3>追記（2018/06/07 19:00）</h3>
<p>Dropbox をアンインストールして、ビルトインの OneDrive を代わりに利用したところ（OneDrive にも他のユーザーとフォルダーを共有する機能あるんだな！）、少しだけ状況はましになった……けれど、やはり全体的にもっさりしているし、ときどき Explorer が「応答なし」になっているようだ。これは海外でも報告があるらしい。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fnews.softpedia.com%2Fnews%2Fwindows-10-april-2018-update-bug-causes-explorer-exe-to-crash-repeatedly-520995.shtml" title="Windows 10 April 2018 Update Bug Causes Explorer.exe to Crash Repeatedly" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://news.softpedia.com/news/windows-10-april-2018-update-bug-causes-explorer-exe-to-crash-repeatedly-520995.shtml">news.softpedia.com</a></cite></p><p>ワークアラウンドとして</p>

<blockquote>
<p>According to some users, fixing this bug comes down to disabling Windows Timeline. To do this, go to Settings > Privacy > Activity History and set the option called Let Windows sync my activities from this PC to the cloud to off.</p>

</blockquote>
<p>などと書かれているが、うちの環境ではもともとオフだった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507184848.png" alt="f:id:daruyanagi:20180507184848p:plain" title="f:id:daruyanagi:20180507184848p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとはユーザーアカウントデータが壊れているから作り直したら、GPU ドライバーのせいじゃねえのっていう話があるみたいだけど、Insider Preview のときも OneDrive がクラッシュする問題はあったし、リパースポイントなんか、ファイルシステム周りで仕様変更があったんではないかって個人的には想像してるが……どうだろ。</p>

</div>
<div class="section">
<h3>追記（2018/06/07 22:30）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507223320.png" alt="f:id:daruyanagi:20180507223320p:plain" title="f:id:daruyanagi:20180507223320p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><code>CDPUserSvc_****</code> という名前のサービスがあれば止めてみる → あまり効果はないように思えるが、これで直ったという人もいる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180507223650.png" alt="f:id:daruyanagi:20180507223650p:plain" title="f:id:daruyanagi:20180507223650p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><code>C:\Users\（ユーザー名）\AppData\Local\Microsoft\Windows\（数字四桁）\StructuredQuerySchema.bin</code> というファイルをリネームして再起動する → うちの環境ではこれで直ったように思える。</p><p>だんだん当初の問題から離れてきたので、記事を改題。</p>

</div>
<div class="section">
<h3>追記（2018/06/08 02:30）</h3>
<p>Build 2018 を観ながら仕事をしていたけど、また問題が再発したようだ……あと、OneDrive フォルダー以外でもフリーズが激しくなった。「フィードバック Hub」で問題を報告したけど、ロールバックも検討しなきゃいけないな？</p>

</div>
<div class="section">
<h3>追記（2018/06/08 13:30）</h3>
<p>ふと［アクティビティ履歴］の設定を確認すると、いつの間にかチェックが入っていたので外し、念のため再起動して再度無効化されていることを確認してしばらく使っていたが、まぁまぁ、快調に動いている。またぶり返すかもしれないけれど、とりあえずは様子見。</p>

</div>
<div class="section">
<h3>追記（2018/06/09 04:30）</h3>
<p>症状は相変わらず。StructuredQuerySchema.bin をリネームした直後だけなのかな、調子いいのは。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180509042524.png" alt="f:id:daruyanagi:20180509042524p:plain" title="f:id:daruyanagi:20180509042524p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あと、Insider Preview を入れてる Surface 3 でタイムラインがぶっ壊れちゃったことに気づいた……もしかすると Insider Build と Release Build でアクティビティをクラウド同期してたのがまずかったのかなぁ</p>

</div>
<div class="section">
<h3>追記（2018/06/15 18:00）</h3>
<p>5月の定例アップデートを当ててからは症状は治まった。快適快適</p>

</div>