---
date: 2013-07-17T07:36:37.0000000
draft: false
title: "WebMatrix 3 で Wiki クローンを作る（番外編）: ローカルの既存プロジェクトを CodePlex でホストする"
tags: ["WebMatrix", "CodePlex"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717071742.png" alt="f:id:daruyanagi:20130717071742p:plain" title="f:id:daruyanagi:20130717071742p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>“WebMatrix 3 で Wiki クローンを作る（<a href="https://blog.daruyanagi.jp/category/WebMatrix%203%20%E3%81%A7%20Wiki%20%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%B3%E3%82%92%E4%BD%9C%E3%82%8B">WebMatrix 3 &#x3067; Wiki &#x30AF;&#x30ED;&#x30FC;&#x30F3;&#x3092;&#x4F5C;&#x308B;</a>）”のソースコードは CodePlex でホストするつもり。WebMatrix にはバージョン管理システムが統合されているので（Git/TFS）、簡単に連携できるんだよね。</p>

<div class="section">
<h3>CodePlex のプロジェクトを作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717072159.png" alt="f:id:daruyanagi:20130717072159p:plain" title="f:id:daruyanagi:20130717072159p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GitHub より多少めんどくさいけれどガンバレ。ソースコントロールのタイプは Git を選択（TFSでもいいのかもしれないけれど、あまり知らない）。</p>

</div>
<div class="section">
<h3>ソースコードのアップロード</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717072352.png" alt="f:id:daruyanagi:20130717072352p:plain" title="f:id:daruyanagi:20130717072352p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ソースコードタブにある［Clone］ボタンから、リモートアドレスを取得。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717072549.png" alt="f:id:daruyanagi:20130717072549p:plain" title="f:id:daruyanagi:20130717072549p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>WebMatrix 3 の［ソース コントロール］－［リモート］ボタンから、取得したリモートアドレスを登録。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717072710.png" alt="f:id:daruyanagi:20130717072710p:plain" title="f:id:daruyanagi:20130717072710p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは［ソース コントロール］－［プッシュ］ボタンで、ソースコードをアップロードすればよい。</p>

</div>
<div class="section">
<h3>逆にリモートの既存プロジェクトを WebMatrix で開きたい</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717073105.png" alt="f:id:daruyanagi:20130717073105p:plain" title="f:id:daruyanagi:20130717073105p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これから新規にプロジェクトを作るならば、CodePlex 側でまずプロジェクトを作成し、それを［ファイル］－［ソース コントロール］メニューから開くのが手軽かもしれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717073126.png" alt="f:id:daruyanagi:20130717073126p:plain" title="f:id:daruyanagi:20130717073126p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>拡張機能「CodePlex」をあらかじめインストールしておけば、このメニューからリモートプロジェクトが開ける。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717073208.png" alt="f:id:daruyanagi:20130717073208p:plain" title="f:id:daruyanagi:20130717073208p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GitHub でホストしているリモートプロジェクトも、拡張機能「GitHub for WebMatrix」で開ける。</p>

</div>