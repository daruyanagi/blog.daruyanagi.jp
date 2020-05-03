---
date: 2013-06-03T21:06:34.0000000
draft: false
title: "Ruby for Windows について"
tags: ["Ruby"]
eyecatch: 
---
<p><iframe width="480" height="302" src="http://www.ustream.tv/embed/recorded/33569275?v=3&amp;wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;">    </iframe><br />
<br /><a href="http://www.ustream.tv/" style="padding: 2px 0px 4px; width: 400px; background: #ffffff; display: block; color: #000000; font-weight: normal; font-size: 10px; text-decoration: underline; text-align: center;" target="_blank">Video streaming by Ustream</a></p><p><a href="http://opcdiary.net/?p=26717">RubyKaigi 2013, Ruby on Windows | OPC Diary - No Code, No Life.</a> 経由で興味をもったのだけど、緑の人がおすすめだというので見てみた。RubyKaigi での @unak さんのセッション。</p>


<div class="section">
<h3>Ruby for Windows の種類</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603203506.png" alt="f:id:daruyanagi:20130603203506p:plain" title="f:id:daruyanagi:20130603203506p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いっぱいあるのだけど、今の主流はだいたい2種類＋1種類なのかな（IronRubyぇ……）。</p>

<div class="section">
<h4>mswin</h4>
<p>コンパイラは Visual C++ 。</p>

<ul>
<li><a href="http://www.garbagecollect.jp/ruby/mswin32/ja/download/release.html">http://www.garbagecollect.jp/ruby/mswin32/ja/download/release.html</a></li>
</ul><p>unak さんがだいたいやっているのかな。</p>

</div>
<div class="section">
<h4>mingw</h4>
<p>コンパイラは gcc 。</p>

<ul>
<li><a href="http://rubyinstaller.org/">http://rubyinstaller.org/</a></li>
</ul><p>luislavana さんがメンテナンス。なんとなくこれをいつも使っているし、ひとにもお勧めしてる。</p>

</div>
<div class="section">
<h4>ActiveScriptRuby</h4>
<p><a href="http://msdn.microsoft.com/ja-jp/library/cc409804.aspx">IActiveScript</a> を mswin に提供する ActiveX コントロール……なのらしい。</p>

<ul>
<li><a href="http://www.artonx.org/data/asr/">http://www.artonx.org/data/asr/</a></li>
</ul><p>作者は arton さん。<a href="http://nougakudo.codeplex.com/">NougakuDoCompanion - Home</a> を作ってる方だったんだね。</p>

</div>
</div>
<div class="section">
<h3>Ruby for Windows の歴史</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603205606.png" alt="f:id:daruyanagi:20130603205606p:plain" title="f:id:daruyanagi:20130603205606p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>割愛。mswin と mingw の Ruby の CI 環境は Windows Azure でやっているのだそうだ。あと、Microsoft から Visual Studio Ultimate が提供されているらしい（太っ腹！</p>

</div>
<div class="section">
<h3>Ruby for Windows の行方</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603205758.png" alt="f:id:daruyanagi:20130603205758p:plain" title="f:id:daruyanagi:20130603205758p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>基本的に「CRuby に追従する」という姿勢らしい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603205947.png" alt="f:id:daruyanagi:20130603205947p:plain" title="f:id:daruyanagi:20130603205947p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<div class="section">
<h4>コマンドラインの Unicode 対応</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603210024.png" alt="f:id:daruyanagi:20130603210024p:plain" title="f:id:daruyanagi:20130603210024p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いたたたたｔ……互換性の問題で難しいところもあるという。</p>

</div>
<div class="section">
<h4>そのほか、Unicode 化が漏れている部分への対応</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603210116.png" alt="f:id:daruyanagi:20130603210116p:plain" title="f:id:daruyanagi:20130603210116p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いててててｔ……</p>

</div>
<div class="section">
<h4>Windows XP 切り捨て</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130603210215.png" alt="f:id:daruyanagi:20130603210215p:plain" title="f:id:daruyanagi:20130603210215p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと面白かったのは Cancelable I/O の話で、並行処理関係の API は Windows Vista（Windows 6.0）でかなり強化されているのだそうだ。というわけで、Windows XP のサポートが切れ次第、さっくり新しい API へ移行したいとのこと（？）。</p><p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/masakit555"><img src="http://a0.twimg.com/profile_images/1383543730/yama2_normal.jpeg" alt="masakit555" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      いい内容ですよ！RT @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> 帰ったら見よう / “RubyKaigi 2013, Ruby on Windows | OPC Diary - No Code, No Life.” <a class="twitter-tweet-url" href="http://t.co/BBuIa7l6Sa" target="_top"><span>URL</span></a></p><p class="twitter-detail-info"><a href="http://twitter.com/masakit555/status/341415673139961856" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-06-03</span> <span class="twitter-detail-info-time">13:46:54</span></a> <span class="twitter-detail-info-source">via <a href="http://www.tweetdeck.com" rel="nofollow">TweetDeck</a></span></p></div></div></p><p>確かに。</p>

</div>
</div>