---
date: 2012-03-27T01:29:40.0000000
draft: false
title: "Windows Home Server 2011 をプリンターサーバとして利用する → 諸事情あってやめた"
tags: ["Windows Home Serever"]
eyecatch: 
---
<p><img src="20120327011258.jpg" alt="f:id:daruyanagi:20120327011258j:plain" title="f:id:daruyanagi:20120327011258j:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%CC%B5%C0%FELAN">無線LAN</a>も安定稼働するようになった<a href="#f1" name="fn1" title="とはいえ、リモートデスクトップ接続がちょっと切れやすいけれど">*1</a>ので、今度はホコリをカブっていたプリンタ複合機を引っ張り出して、Windows Home Server に繋いだ。ふとした縁でタダでもらったものだ。</p><p>これまではメインマシンに直結して使っていたけれど、常時起動が前提のホームサーバーをプリンターサーバとして使えば、メインマシンに電源を入れなくてもいろんなデバイスからアクセスできて便利だろう。</p><p><img src="20120327011912.png" alt="f:id:daruyanagi:20120327011912p:plain" title="f:id:daruyanagi:20120327011912p:plain" class="hatena-fotolife"></p><p>ドライバーのインストールに成功<a href="#f2" name="fn2" title="ただし、Windows 7版">*2</a>。リモートからの印刷にも成功した<a href="#f3" name="fn3" title="ただし、インクがないと言われた">*3</a>。ただ、どうしても古いドライバーのアンインストールに失敗するので、解凍ソフト「Lhaz」で自動解凍形式の書庫ファイルをバラして、デバイスマネージャーから［ドライバーの更新］を利用してインストールした。</p><p><img src="20120327012033.png" alt="f:id:daruyanagi:20120327012033p:plain" title="f:id:daruyanagi:20120327012033p:plain" class="hatena-fotolife"></p><p>しかし、問題が。プリンター本体のボタンを押しても、スキャン → フォルダへ保存が始まらない。ユーティリティソフトを入れても、症状は同じだった。スキャナードライバーのプロパティ画面ではボタンの挙動を設定できるのだけど、実際には動かないらしい。</p><p>こいつはもともとプリンタとしてよりも、スキャナとしての利用頻度のほうが高い。現に、今はインクがない状態でそのまま半年以上は放置されている。なので、本体の操作でほいほいスキャンできないのはちょっと不便だ。まさかいちいちリモートデスクトップでサーバーにつないでユーティリティソフトを起動してスキャン……なんてことはできない。ちょっと残念だけど、やはりメインマシンに繋ぎ直したほうがよさそう。</p><p>何か対応策があればいいのだけど。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">とはいえ、リモートデスクトップ接続がちょっと切れやすいけれど</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">ただし、Windows 7版</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">ただし、インクがないと言われた</span></p>
</div>