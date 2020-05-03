---
date: 2018-02-28T12:25:45.0000000
draft: false
title: "お使いのアカウントで Age of Empires: Definitive Edition は現在利用できません。エラー コード: 0x803F8001"
tags: ["Windows ストア アプリ", "Age of Empires: Definitive Edition"]
eyecatch: 20180226201627.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180226201627.png" alt="f:id:daruyanagi:20180226201627p:plain" title="f:id:daruyanagi:20180226201627p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>症状</h3>
<p>スプラッシュ画面でゲームがクラッシュして、以降、次のようなエラー画面が出て起動できなくなる。</p>

<blockquote>
<p>お使いのアカウントで Age of Empires: Definitive Edition は現在利用できません。エラー コード: 0x803F8001</p>

</blockquote>

</div>
<div class="section">
<h3>回避策その1：なんでもいいからアプリをストアからインストールしてみる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180228121608.png" alt="f:id:daruyanagi:20180228121608p:plain" title="f:id:daruyanagi:20180228121608p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんでもいいので、</p>

<ul>
<li>無料</li>
<li>サイズが軽いもの</li>
</ul><p>がいいんじゃないでしょうか。うちではランキング上位に掲載されていた謎の知育ソフトをインストールしてみましたが、サクッと起動しました。</p>

</div>
<div class="section">
<h3>回避策その2：アンインストールして再度インストール</h3>
<p>再インストールでも治るようですが、毎回 17GB 超をダウンロードするのは正直しんどいと思います。回避策その1 がダメだったら試してみてください。</p>

</div>
<div class="section">
<h3>その他の回避策</h3>
<p>ストアアプリにおける一般的な回避策を列挙しておきます。やっても治らないことが多い気がしますけど、wsreset だけで治ることもあるので、一通り覚えておくと役に立つこともたたないこともあります。</p>

<ul>
<li><code>wsreset.exe</code> を実行する</li>
<li>管理者権限で <code>sfc /scannow</code> を実行する</li>
<li>管理者権限で <code>DISM /Online /Cleanup-image /Restorehealth</code> を実行する</li>
</ul>
</div>
<div class="section">
<h3>結論</h3>
<p>いい加減にしろ。</p>

</div>
<div class="section">
<h3>ToDo（2018/02/28 14:20 追記）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180228141823.png" alt="f:id:daruyanagi:20180228141823p:plain" title="f:id:daruyanagi:20180228141823p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今度エラーに遭遇したら、アプリの詳細オプションにある［リセット］ボタンで治るかどうか試してみる。</p>

</div>
<div class="section">
<h3>追記（2018/03/01）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180301160011.png" alt="f:id:daruyanagi:20180301160011p:plain" title="f:id:daruyanagi:20180301160011p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>またエラーに遭遇したので［リセット］ボタンを試してみましたが……これでは治らないみたい。回避策その1でエラー回避。</p>

</div>