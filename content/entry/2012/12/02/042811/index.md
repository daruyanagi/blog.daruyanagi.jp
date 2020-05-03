---
date: 2012-12-02T04:28:11.0000000
draft: false
title: "「WebMatrix 2」の導入"
tags: ["WebMatrix"]
eyecatch: 
---
<p>Windows 環境で Web 開発<a href="#f1" name="fn1" title="要は“ホームページ”を作ることです！">*1</a>を行うならば、まず利用を検討してみてほしいのが「WebMatrix 2」です。</p><p>まぁ、ほかにもいろいろ便利なツールはあると思いますけど、これが一番楽ちんだと思います。だまされたと思って一度インストールしてみてください。</p>

<div class="section">
<h3>「WebMatrix 2」のダウンロード</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202034748.png" alt="f:id:daruyanagi:20121202034748p:plain" title="f:id:daruyanagi:20121202034748p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://www.microsoft.com/web/webmatrix/">WebMatrix 2</a> からインストーラーをダウンロードして実行します。</p>

</div>
<div class="section">
<h3>「WebMatrix 2」のインストール</h3>
<p>インストーラーを実行すると、「Web Platform Installer 4.0」が起動します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202034848.png" alt="f:id:daruyanagi:20121202034848p:plain" title="f:id:daruyanagi:20121202034848p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Web Platform Installer」は、Microsoft による Web 開発に必要なサーバー・フレームワーク・データベース・ツール・アプリケーションを手軽に導入するためのインストーラーです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202035504.png" alt="f:id:daruyanagi:20121202035504p:plain" title="f:id:daruyanagi:20121202035504p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Web Platform Installer」がセットアップされると、続いて「WebMatrix 2」のインストールへ移ります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202035521.png" alt="f:id:daruyanagi:20121202035521p:plain" title="f:id:daruyanagi:20121202035521p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［インストール］ボタンを押せば、インストールが開始されます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202035745.png" alt="f:id:daruyanagi:20121202035745p:plain" title="f:id:daruyanagi:20121202035745p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Web Platform Installer」が便利なのは、「WebMatrix 2」の実行に必要なコンポーネントを勝手にダウンロードしてインストールしてくれるところです<a href="#f2" name="fn2" title="これは「依存性を解決する」と表現することがあります">*2</a>。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040128.png" alt="f:id:daruyanagi:20121202040128p:plain" title="f:id:daruyanagi:20121202040128p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちなみに、現時点での最新版は「WebMatrix 2 Refresh 2」です。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040211.png" alt="f:id:daruyanagi:20121202040211p:plain" title="f:id:daruyanagi:20121202040211p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストールが完了しました。多くのコンポーネントが自動でインストールされているのがわかります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040503.png" alt="f:id:daruyanagi:20121202040503p:plain" title="f:id:daruyanagi:20121202040503p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>起動はスタート画面から。頻繁に利用する場合は、“ピン留め”しておくと便利です。</p>

</div>
<div class="section">
<h3>「Web Platform Installer 4.0」について</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040343.png" alt="f:id:daruyanagi:20121202040343p:plain" title="f:id:daruyanagi:20121202040343p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Web Matrix 2」のインストールが終了すると、「Web Platform Installer 4.0」へ戻ります。もし必要なツールがあれば、続けてインストールすることも可能です。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040610.png" alt="f:id:daruyanagi:20121202040610p:plain" title="f:id:daruyanagi:20121202040610p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202040655.png" alt="f:id:daruyanagi:20121202040655p:plain" title="f:id:daruyanagi:20121202040655p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Web Platform Installer 4.0」は Microsoft の製品ですが、インストールできるのは Microsoft のものに限りません。とくに Web アプリケーションは、オープンソースで開発されたものにも幅広く対応しています。ただ、Web アプリケーションのインストールは「Web Matrix 2」からも行えますので、「Web Platform Installer 4.0」についてはあまり気にしなくてもよいかと。そういうものがあるんだ、とだけ覚えていてもらえれば十分だと思います。</p>

<div class="section">
<h4>おまけ</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121202041202.png" alt="f:id:daruyanagi:20121202041202p:plain" title="f:id:daruyanagi:20121202041202p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Visual Studio 2012 Experess for Web」は無償の Web 開発環境で、いわば「WebMatrix 2」の“お兄さん”にあたります。ついでにインストールしておくと、「WebMatrix 2」では手に負えないときに助かります。</p><p>今日のところはここまで。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">要は“ホームページ”を作ることです！</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">これは「依存性を解決する」と表現することがあります</span></p>
</div>