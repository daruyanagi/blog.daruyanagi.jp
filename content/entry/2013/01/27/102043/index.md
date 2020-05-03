---
date: 2013-01-27T10:20:43.0000000
draft: false
title: "WebMatrix 2：OAuth でログインする"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>「WebMatrix 2」と「ASP.NET Web Pages」を組み合わせれば、Web サイトへ OAuth 認証の機能を簡単に追加できる。標準で対応するプロバイダは以下の通り。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127100427.png" alt="f:id:daruyanagi:20130127100427p:plain" title="f:id:daruyanagi:20130127100427p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<ul>
<li>Twitter</li>
<li>Facebook</li>
<li>Microsoft（旧 Windows Live）</li>
<li>Yahoo</li>
<li>Google</li>
<li>LinkedIn</li>
</ul><p>そのほかにも、カスタムプロバイダを自作して追加したりもできるみたいだけど、今回は、まぁ、いいや。</p>

<div class="section">
<h3>スターターテンプレート</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127095934.png" alt="f:id:daruyanagi:20130127095934p:plain" title="f:id:daruyanagi:20130127095934p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>で、問題はどうやって使うのか、だけど、「WebMatrix 2」の“スターター”テンプレートが格好の例となっているので、まずはこれを敵情視察したい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127100804.png" alt="f:id:daruyanagi:20130127100804p:plain" title="f:id:daruyanagi:20130127100804p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっそく、画面右上の［ログイン］を押すが……Twitter も Facebook も使えないじゃないか。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127100847.png" alt="f:id:daruyanagi:20130127100847p:plain" title="f:id:daruyanagi:20130127100847p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>どうやら、“_AppStart.cshtml”<a href="#f1" name="fn1" title="アプリケーションの起動時に実行される">*1</a>でプロバイダを有効化する必要があるらしい（知ってた）。有効化したいプロバイダをコメントアウトしてリロードすれば、ちゃんと使えるようになる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127100700.png" alt="f:id:daruyanagi:20130127100700p:plain" title="f:id:daruyanagi:20130127100700p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず Twitter の API キーを取得して試したのだけど、うまくいかない<a href="#f2" name="fn2" title="わしが何かミスってるんだろう">*2</a>。今回は原因を突き止めるのも面倒なので、API キーの要らない Google で試してみたが……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127101058.png" alt="f:id:daruyanagi:20130127101058p:plain" title="f:id:daruyanagi:20130127101058p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127101110.png" alt="f:id:daruyanagi:20130127101110p:plain" title="f:id:daruyanagi:20130127101110p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127101114.png" alt="f:id:daruyanagi:20130127101114p:plain" title="f:id:daruyanagi:20130127101114p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いともあっさり動いた（右上に注目！）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130127101234.png" alt="f:id:daruyanagi:20130127101234p:plain" title="f:id:daruyanagi:20130127101234p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>データベースにもちゃんと登録されている<a href="#f3" name="fn3" title="UserId が 2 になっているのは、Twitter で試して失敗したためかな">*3</a>。Google に認証を委譲したので、こちら側にはパスワードが保存されていない。</p><p>さて、“スターター”テンプレートから不要なものを削り、必要なものを足してアプリを作ってもいいのだけど、それも面倒そうだし、一から勉強する意味でも、次回は“空のサイト”テンプレートで Google 認証によるログインまでを実装しようかな、と思う<a href="#f4" name="fn4" title="実はもうだいたいできてるんだけど！">*4</a>。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">アプリケーションの起動時に実行される</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">わしが何かミスってるんだろう</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">UserId が 2 になっているのは、Twitter で試して失敗したためかな</span></p>
<p class="footnote"><a href="#fn4" name="f4" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">実はもうだいたいできてるんだけど！</span></p>
</div>