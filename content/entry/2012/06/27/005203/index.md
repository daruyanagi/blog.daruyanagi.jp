---
date: 2012-06-27T00:52:03.0000000
draft: false
title: "Windows Azure Web Sites と WebMatrix 2 の組み合わせはマーベラス！"
tags: ["Windows Azure", "WordPress", "WebMatrix"]
eyecatch: 
---
<p><img src="20120627001646.png" alt="f:id:daruyanagi:20120627001646p:plain" title="f:id:daruyanagi:20120627001646p:plain" class="hatena-fotolife"></p><p>今日は、 <a href="http://daruyanagi.hatenablog.com/entry/2012/06/25/214555">Windows Azure Web Sites &#x3067;&#x30B5;&#x30AF;&#x30C3;&#x3068; WordPress &#x3092;&#x30BB;&#x30C3;&#x30C8;&#x30A2;&#x30C3;&#x30D7;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> をローカルにダウンロード・管理する。やっと「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2」の登場だ！　またインストールしていない人はしておくように。</p><p><a href="http://www.forest.impress.co.jp/docs/news/20120608_538907.html">&#x7A93;&#x306E;&#x675C; - &#x3010;NEWS&#x3011;&#x300C;WebMatrix 2&#x300D;&#x304C;&#x30EA;&#x30EA;&#x30FC;&#x30B9;&#x5019;&#x88DC;&#x7248;&#x306B;&#x3001;&ldquo;Node.js&rdquo;&#x30B5;&#x30DD;&#x30FC;&#x30C8;&#x3084;&ldquo;Azure&rdquo;&#x9023;&#x643A;&#x3092;&#x8FFD;&#x52A0;</a></p>

<div class="section">
<h3>リモートサイトへの接続</h3>
<p><img src="20120627001655.png" alt="f:id:daruyanagi:20120627001655p:plain" title="f:id:daruyanagi:20120627001655p:plain" class="hatena-fotolife"></p><p>まず起動。［リモートサイト］を選択する。</p><p><img src="20120627001708.png" alt="f:id:daruyanagi:20120627001708p:plain" title="f:id:daruyanagi:20120627001708p:plain" class="hatena-fotolife"></p><p>……とその前に、 Azure の管理ポータルで公開プロファイルをダウンロードしておく。なぜかというと……</p><p><img src="20120627001719.png" alt="f:id:daruyanagi:20120627001719p:plain" title="f:id:daruyanagi:20120627001719p:plain" class="hatena-fotolife"></p><p>次で使うからだ。公開プロファイルを読み込めば、それだけで設定完了！　これすんごい楽チンじゃなイカ！</p>

<div class="section">
<h4>ちょっとトラブル……</h4>
<p><img src="20120627001736.png" alt="f:id:daruyanagi:20120627001736p:plain" title="f:id:daruyanagi:20120627001736p:plain" class="hatena-fotolife"></p><p>しかし、うちの環境ではここで「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2」がフリーズ。</p><p><img src="20120627001747.png" alt="f:id:daruyanagi:20120627001747p:plain" title="f:id:daruyanagi:20120627001747p:plain" class="hatena-fotolife"></p><p>原因は「Git for <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a>」だった。未導入の場合は問題なく作業を進められるんじゃいかな。うちの場合も、再起動すればそのまま作業を進めることができた。</p><p><a href="http://www.forest.impress.co.jp/docs/review/20120620_540492.html">&#x7A93;&#x306E;&#x675C; - &#x3010;REVIEW&#x3011;&#x30D0;&#x30FC;&#x30B8;&#x30E7;&#x30F3;&#x7BA1;&#x7406;&#x30B7;&#x30B9;&#x30C6;&#x30E0;&#x300C;Git&#x300D;&#x3092;&#x300C;WebMatrix 2&#x300D;&#x3078;&#x7D71;&#x5408;&#x300C;Git for WebMatrix&#x300D;</a></p><p>話は変わるけど、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD">拡張機能</a>がクラッシュしたら次回起動時に無効化してくれるのは親切な設計だと思う。当たり前のことかもしれないけれど、当たり前にやってくれるアプリは少ない。まだリリース候補版だけど、なかなか完成度は高い。</p>

</div>
</div>
<div class="section">
<h3>Webサイトのダウンロード</h3>
<p><img src="20120627001800.png" alt="f:id:daruyanagi:20120627001800p:plain" title="f:id:daruyanagi:20120627001800p:plain" class="hatena-fotolife"></p><p>気を取り直して作業再開。リモート接続が完了したら、［ダウンロード］ボタンを押してWebサイトをローカルへダウンロード。「Web配置」を利用しているので、データベースの内容もダウンロードできるのがうれしい。本番（リモート）環境とローカル環境のデータが同期できるため、より近い状態でテストできる。リモートへのデータ反映も［発行］（アップロード）で行える。</p><p><img src="20120627001806.png" alt="f:id:daruyanagi:20120627001806p:plain" title="f:id:daruyanagi:20120627001806p:plain" class="hatena-fotolife"><img src="20120627001812.png" alt="f:id:daruyanagi:20120627001812p:plain" title="f:id:daruyanagi:20120627001812p:plain" class="hatena-fotolife"><img src="20120627001818.png" alt="f:id:daruyanagi:20120627001818p:plain" title="f:id:daruyanagi:20120627001818p:plain" class="hatena-fotolife"></p><p>ダウンロードの際は、必要なパッケージのインストール（依存性解決）も勝手にやってくれる。多少時間がかかる場合があるけれども、ちょっと我慢しよう。今回はそんなに時間がかからなかった。</p>

</div>
<div class="section">
<h3>Webサイトの管理と再発行</h3>
<p><img src="20120627001824.png" alt="f:id:daruyanagi:20120627001824p:plain" title="f:id:daruyanagi:20120627001824p:plain" class="hatena-fotolife"></p><p>完成！　管理画面へのリンクがリボンに追加されている。あと、「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a>」の独自関数を入力補完できるのも「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2」ならではといった感じ。</p><p><img src="20120627001831.png" alt="f:id:daruyanagi:20120627001831p:plain" title="f:id:daruyanagi:20120627001831p:plain" class="hatena-fotolife"></p><p>今回は、 Azure でセットアップした「<a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a>」のバージョンが少し古かったので、プラグイン・テーマともどもローカルでアップデートして、それを［発行］しておいた。リモートで直接アップデートするより、ローカルで一度相性を確認しておいたほうが安全だよね！</p>

</div>