---
date: 2016-09-03T20:21:59.0000000
draft: false
title: "Aoba 1.5.0：艦これキャプチャーツールに アニメーション GIF 録画機能をつけた"
tags: ["Aoba", "告知", "Microsoft Azure", "WPF"]
eyecatch: 20160903200705.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160903200705.png" alt="f:id:daruyanagi:20160903200705p:plain" title="f:id:daruyanagi:20160903200705p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえずほしい機能は全部付けたので、あとは自分で使いながら改良するだけかも。</p>

<ul>
<li><a href="https://yanagi.blob.core.windows.net/aoba/setup.exe">&#x30C0;&#x30A6;&#x30F3;&#x30ED;&#x30FC;&#x30C9;</a></li>
</ul><p>GitHub で ClickOnce するのは、思った以上に制約が多いのでやめて、代わりに Azure Blob Storage に置いてみたよ。初めて使ってみたけど、そんなに難しくなかった。お金はちょっとかかるっぽいけど、割と安いみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160903201543.png" alt="f:id:daruyanagi:20160903201543p:plain" title="f:id:daruyanagi:20160903201543p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GUI クライアントをいくつか比較してみたけど、<a href="http://www.cloudberrylab.com/free-microsoft-azure-explorer.aspx">CloudBerry Explorer</a> というのが一番使いやすかったかも。コマンドラインだったら AzCopy ってのもあるみたいで、自分みたいに ClickOnce のファイルを Azure Blob Storage に置くだけだったらそっちの方が楽かもしれない。</p>

<div class="section">
<h3>更新点</h3>

<ul>
<li>Twitter 投稿画面の改善</li>
<li>Gif キャプチャー機能</li>
<li>設定の保存</li>
<li>コードのリファクタリング</li>
</ul><p>Twitter の投稿画面では、フリップビューのパチモノみたいなのをつけて（アニメーションないし、フリックではめくれない劣化版）、過去の写真も選択できるようにした。連写機能で撮った決定的瞬間をうｐしたいときとかに使えるかも。</p><p>作り方は簡単で、</p>

<ul>
<li>スクショをリスト List&lt;string&gt; でもっておく</li>
<li>ViewModel で int SelectedIndex をもつ</li>
<li>Image に List[SelectedIndex] をバインド</li>
<li>ボタンに SelectedIndex を ++/-- するコマンドをバインドしていい感じに配置</li>
</ul><p>するだけ。ユーザーコントロールにして、切り替えのアニメーションぐらい付けたいけど、自分の XAML 力でそこまでできるかどうかはわからない。</p>

</div>