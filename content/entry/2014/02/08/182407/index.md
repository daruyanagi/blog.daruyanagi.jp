---
date: 2014-02-08T18:24:07.0000000
draft: false
title: "iTunes 関連アプリを根こそぎアンインストールするアプリ「焼きりんご」を作ってみた"
tags: ["告知", "Windows デスクトップ アプリ", "iTunes", "Yakiringo"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140208175951.png" alt="f:id:daruyanagi:20140208175951p:plain" title="f:id:daruyanagi:20140208175951p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>急に <a href="http://d.hatena.ne.jp/asin/B0001DD238/bestylesnet-22">メロディック・ハード・キュア</a> が聞きたくなったので、Amazon から中古の CD を取り寄せた。で、これを iTunes でリッピングして iPhone に転送しようとしたのだけど……</p><p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://pbs.twimg.com/profile_images/425177118587092992/wbSNA4_G_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      なんで全部同期されないの……もういやんなる。iTunes……</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/431704721003274240" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2014-02-07</span> <span class="twitter-detail-info-time">17:23:20</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://pbs.twimg.com/profile_images/425177118587092992/wbSNA4_G_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      iTunes の再インストールだと……ほんまマジで死ね。なにが UX じゃバカ</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/431698966573355008" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2014-02-07</span> <span class="twitter-detail-info-time">17:00:28</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://pbs.twimg.com/profile_images/425177118587092992/wbSNA4_G_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      つうか iPhone と iTunes の同期とか糞メンドイ</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/431696546795507712" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2014-02-07</span> <span class="twitter-detail-info-time">16:50:51</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://pbs.twimg.com/profile_images/425177118587092992/wbSNA4_G_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      iTunes に怒り狂っている</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/431696251973672960" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2014-02-07</span> <span class="twitter-detail-info-time">16:49:41</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://pbs.twimg.com/profile_images/425177118587092992/wbSNA4_G_normal.png" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      iTunes まじむかつく。アップデートごときで OS 再起動させんなよクソが</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/431694823578292224" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2014-02-07</span> <span class="twitter-detail-info-time">16:44:01</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div></p><p>結局、iTunes の音楽ライブラリを抹消したり同期したり一部だけ同期させたり消したり全部同期してみたり iTunes を再インストールしたり iPhone を初期化しようと悩んだりダメモトでもう一回だけ同期したりしてみたところ、やっとお目当ての楽曲が無事転送された。<b>途中で何回も死にたくなった。</b></p><p>そういえば最近 <a href="http://www.forest.impress.co.jp/docs/news/20140206_634223.html">&#x3053;&#x3093;&#x306A;&#x3053;&#x3068;</a>もあったので、根こそぎアンインストールアプリがあれば便利かなと思い、艦これしながら作ってみた。Windows 8.1 の 64bit 版 iTunes でしか試してないので、ほかの環境でうまく動くのかどうかは分からない<a href="#f1" name="fn1" title="自分だったら怖くて試さないと思う">*1</a>。アプリケーションの GUID ってどの環境でも一緒だよね？　アンインストールするアプリを GUID で決め打ちにしちゃったけど、ほんとはインストールリストを全部ナメて DisplayName が一致するかみた方がよかったのかもしれない。</p><p><iframe src="https://skydrive.live.com/embed?cid=8D890D7855B010BC&resid=8D890D7855B010BC%2125717&authkey=AB7XN21lellgmPI" width="98" height="120" frameborder="0" scrolling="no"></iframe></p><p>UI フリーズするからイケていないな……。</p>

<div class="section">
<h3>この子がやること</h3>

<ul>
<li>「iTunes」</li>
<li>「Apple Software Update」</li>
<li>「Apple Mobile Device Support」</li>
<li>「Bonjour」</li>
<li>「Apple Application Support」</li>
</ul><p>の順にアプリケーションをアンインストール（インストーラーを呼び出すだけ）。</p>

<ul>
<li>C:\Program Files\Bonjour</li>
<li>C:\Program Files\Common Files\Apple\Mobile Device Support</li>
<li>C:\Program Files\Common Files\Apple\Apple Application Support</li>
<li>C:\Program Files\Common Files\Apple\CoreFP</li>
<li>C:\Program Files\iTunes\</li>
<li>C:\Program Files\iPod\</li>
<li>C:\Program Files (x86)\Bonjour</li>
<li>C:\Program Files (x86)\Common Files\Apple\Apple Application Support</li>
<li>C:\Program Files (x86)\Common Files\Apple\Mobile Device Support</li>
<li>C:\Program Files (x86)\Common Files\Apple\CoreFP</li>
<li>C:\Program Files (x86)\iTunes\</li>
<li>C:\Program Files (x86)\iPod\</li>
</ul><p>を消そうと頑張ってみる。消せなかったらフォルダをエクスプローラーで開く（自分で消せ）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140208181724.png" alt="f:id:daruyanagi:20140208181724p:plain" title="f:id:daruyanagi:20140208181724p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>名前の由来は <a href="http://d.hatena.ne.jp/asin/4063616533/bestylesnet-22">みなみけ(5) (ヤングマガジンコミックス)</a>。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">自分だったら怖くて試さないと思う</span></p>
</div>