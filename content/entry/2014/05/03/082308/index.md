---
date: 2014-05-03T08:23:08.0000000
draft: false
title: "Dropbox ＋ Microsoft Azure でサイトを管理する"
tags: ["WebMatrix", "Windows Azure"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503080329.png" alt="f:id:daruyanagi:20140503080329p:plain" title="f:id:daruyanagi:20140503080329p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><del>Windows</del> Microsoft Azure Web サイト（MAWS）では、Dropbox のフォルダーとコードを同期して、サイトをデプロイすることができます。</p>

<ul>
<li>複数の環境でソースコードを同期しておきたい</li>
<li>Git とかよくわかんねーけど、Dropbox なら毎日使ってるぜ</li>
</ul><p>といったユーザーにお勧めかも。</p>

<div class="section">
<h3>サイトの作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503080713.png" alt="f:id:daruyanagi:20140503080713p:plain" title="f:id:daruyanagi:20140503080713p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず MAWS で新規サイトを作成してみました。［Web サイト］-［簡易作成］を選択し、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503080722.png" alt="f:id:daruyanagi:20140503080722p:plain" title="f:id:daruyanagi:20140503080722p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>URL（サブドメイン）を決めるだけ（ほかはよくわからんのでそのままにした）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503080729.png" alt="f:id:daruyanagi:20140503080729p:plain" title="f:id:daruyanagi:20140503080729p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>できあがり。簡単すぎて鼻血が出そうでした。</p>

</div>
<div class="section">
<h3>Dropbox との連携</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503080329.png" alt="f:id:daruyanagi:20140503080329p:plain" title="f:id:daruyanagi:20140503080329p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっきの画面の下の方にある［ソース管理の統合］-［ソース管理からのデプロイの設定］を選択すると、どこに保存されているコードをサイトへデプロイするかが選べます。もちろん、今回は Dropbox を選択。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503081210.png" alt="f:id:daruyanagi:20140503081210p:plain" title="f:id:daruyanagi:20140503081210p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>指示されるがままに Dropbox との連携処理を行うと……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503081309.png" alt="f:id:daruyanagi:20140503081309p:plain" title="f:id:daruyanagi:20140503081309p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんかフォルダが作成されます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503081429.png" alt="f:id:daruyanagi:20140503081429p:plain" title="f:id:daruyanagi:20140503081429p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>確認してみると DROPBPBOX_ROOT\アプリ\Azure にサイトのフォルダがありますね（カタカナ！？）。これを WebMatrix でサイトとして開きます。で、なんでもいいので適当にファイルを置いてみてください。今回は“テストだよ！”と表示するだけの Default.cshtml をルートにおいています。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503081735.png" alt="f:id:daruyanagi:20140503081735p:plain" title="f:id:daruyanagi:20140503081735p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>んで、サイトの管理画面（ブラウザー）に戻り、下の方にある［同期］ボタンを押してデプローイ！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140503081919.png" alt="f:id:daruyanagi:20140503081919p:plain" title="f:id:daruyanagi:20140503081919p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>無事サイトも動き出しました。</p><p>たぶん、デプロイってコマンドでもできるよね。静的ページ（動的なのでもいいけど）を Dropbox で管理して、コマンドでデプロイするようにすればいい感じかもしれない。</p>

</div>