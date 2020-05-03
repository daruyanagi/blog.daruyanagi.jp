---
date: 2013-09-04T16:14:20.0000000
draft: false
title: "Windows Live Writer で“はてなブログ”を書いてみた"
tags: ["はてな"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904154218.png" alt="f:id:daruyanagi:20130904154218p:plain" title="f:id:daruyanagi:20130904154218p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<blockquote cite="http://staff.hatenablog.com/entry/2013/09/04/125926">
<p>本日、はてなブログの記事を投稿・編集等できるAPI「はてなブログAtomPub」を公開しました。</p><p>はてなブログAtomPubは、Atom Publishing Protocolに準拠したAPIです。AtomPubを利用すると、Windows Live Writerなど、各種のブログ編集ソフトから記事の投稿等ができます。また、はてなブログ専用のクライアントや、独自サービスの開発なども可能です。どうぞご利用ください。</p>

<cite><a href="http://staff.hatenablog.com/entry/2013/09/04/125926">&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;AtomPub API&#x3092;&#x516C;&#x958B;&#x3057;&#x307E;&#x3057;&#x305F;&#x3002;&#x30B5;&#x30FC;&#x30C9;&#x30D1;&#x30FC;&#x30C6;&#x30A3;&#x306E;&#x30D6;&#x30ED;&#x30B0;&#x6295;&#x7A3F;&#x30C4;&#x30FC;&#x30EB;&#x3092;&#x5229;&#x7528;&#x30FB;&#x4F5C;&#x6210;&#x3067;&#x304D;&#x307E;&#x3059; - &#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;&#x958B;&#x767A;&#x30D6;&#x30ED;&#x30B0;</a></cite>
</blockquote>
<p>最近やる気満々やな！　ありがとねっ！（北上さん風に</p><p>「Windows Live Writer」もサポートされているみたいなので、さっそく AtomPub を叩いてブログを書いてみましょう。それにしても「Windows Live Writer」使うの久しぶりだわ。先代のブログは WordPress で構築していたので、「Windows Live Writer」にはだいぶお世話になったのだけど。実はいくつかプラグインも作っているぐらい、昔は好きだったんだけどね<a href="#f1" name="fn1" title="ソースコード残ってたら再公開してみようっかな">*1</a>。</p>


<div class="section">
<h3>ダウンロードとインストール</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904154625.png" alt="f:id:daruyanagi:20130904154625p:plain" title="f:id:daruyanagi:20130904154625p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Windows Live Writer」はソフトウェアパッケージ「Windows Essentials」の一部として配布されています。</p>

<ul>
<li><a href="http://windows.microsoft.com/ja-JP/windows-live/essentials">Windows Essentials - Windows Live Essentials (&#x65E7;&#x540D;: &#x304A;&#x3059;&#x3059;&#x3081;&#x30D1;&#x30C3;&#x30AF;) &#x3092;&#x30C0;&#x30A6;&#x30F3;&#x30ED;&#x30FC;&#x30C9;&#x3059;&#x308B;</a></li>
</ul><p>こいつを使うと、（今は亡き）“Windows Live”ブランドのアプリがインストール可能。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904154916.png" alt="f:id:daruyanagi:20130904154916p:plain" title="f:id:daruyanagi:20130904154916p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>よくわかんなかったら推奨設定でいい。</p>

</div>
<div class="section">
<h3>ブログアカウントのセットアップ</h3>
<p>初回利用時にブログアカウントのセットアップを行う。</p>

<ul>
<li><a href="http://daru1.hatenablog.jp/">http://daru1.hatenablog.jp/</a></li>
</ul><p>今回はウチのテストブログで説明する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155624.png" alt="f:id:daruyanagi:20130904155624p:plain" title="f:id:daruyanagi:20130904155624p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://blog.hatena.ne.jp/my/config/detail">&#x30ED;&#x30B0;&#x30A4;&#x30F3; - &#x306F;&#x3066;&#x306A;</a> であらかじめ</p>

<ul>
<li>ルートエンドポイント</li>
<li>APIキー</li>
</ul><p>をメモしておくといいよ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155152.png" alt="f:id:daruyanagi:20130904155152p:plain" title="f:id:daruyanagi:20130904155152p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［次へ］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155205.png" alt="f:id:daruyanagi:20130904155205p:plain" title="f:id:daruyanagi:20130904155205p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>一番下の［他のサービス］を選択して［次へ］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155253.png" alt="f:id:daruyanagi:20130904155253p:plain" title="f:id:daruyanagi:20130904155253p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>上から順に</p>

<ul>
<li>ブログのURL（<a href="http://daru1.hatenablog.jp/">http://daru1.hatenablog.jp/</a>）</li>
<li>はてな ID（daruyanagi）</li>
<li>APIキー</li>
</ul><p>を入力して［次へ］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155754.png" alt="f:id:daruyanagi:20130904155754p:plain" title="f:id:daruyanagi:20130904155754p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、ブログ投稿用の API （AtomPub 以外にもいろいろある）を自動判別しようとするが……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904155917.png" alt="f:id:daruyanagi:20130904155917p:plain" title="f:id:daruyanagi:20130904155917p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>失敗するので手動で設定。上のプルダウンリストで“Atom Publishing Protocol”を選択し、下のテキストボックスにルートエンドポイントを入力する。［次へ］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160136.png" alt="f:id:daruyanagi:20130904160136p:plain" title="f:id:daruyanagi:20130904160136p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると今度はちゃんと検出される。なんかブログ名がおかしいけど気にしない。［次へ］。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160217.png" alt="f:id:daruyanagi:20130904160217p:plain" title="f:id:daruyanagi:20130904160217p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>もろもろの最終チェック。ウチの環境ではテーマのダウンロードに失敗するので、テーマの自動検出はスキップ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160333.png" alt="f:id:daruyanagi:20130904160333p:plain" title="f:id:daruyanagi:20130904160333p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>設定終了。［Windows Live でブログを共有する］ボタンは、肝心の“Windows Live”が終了しているので意味はない。「Windows Live Writer」は最近メンテナンスされていないので、こういう時代遅れな機能がいろいろ残っていたりする。</p>

</div>
<div class="section">
<h3>とりあえず書いてみる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160526.png" alt="f:id:daruyanagi:20130904160526p:plain" title="f:id:daruyanagi:20130904160526p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>適当に書いてみる……が。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160545.png" alt="f:id:daruyanagi:20130904160545p:plain" title="f:id:daruyanagi:20130904160545p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>画像のアップロードには対応していない。もし公開 FTP サーバーをもっているなら、そこへアップロードするようにセットアップすることもできる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160706.png" alt="f:id:daruyanagi:20130904160706p:plain" title="f:id:daruyanagi:20130904160706p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>自前の FTP にアップロードして、ブログ記事からそれを参照するってわけだね。</p><p>あと、ブログを投稿したあとにブラウザーでプレビューを開くと……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904160941.png" alt="f:id:daruyanagi:20130904160941p:plain" title="f:id:daruyanagi:20130904160941p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ダッシュボードが開いてしまう。設定を間違ったのかなぁと思ったのだけど、アカウントのセットアップ時に正しくブログの URL を指定しても、AtomPub を検出するときにそれがダッシュボードの URL に書き換えられてしまうので、これは仕様としてあきらめるしかないみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130904161125.png" alt="f:id:daruyanagi:20130904161125p:plain" title="f:id:daruyanagi:20130904161125p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プレビューエンジンも公開してもらえれば、Windows 8 や Windows Phone 向けのクライアントもだれか作ってくれるかも。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ソースコード残ってたら再公開してみようっかな</span></p>
</div>