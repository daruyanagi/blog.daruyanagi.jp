---
date: 2016-02-22T17:46:54.0000000
draft: false
title: "デスクトップ PC の SSD を 256GB → 512GB へ換装し、Windows 10 を再インストールした"
tags: ["PC"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20160222/20160222172419.jpg
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160222172419.jpg" alt="f:id:daruyanagi:20160222172419j:plain" title="f:id:daruyanagi:20160222172419j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>システムドライブの空き容量が心もとなくなっていたところ、512GB の SSD が2万円割れしていたので、思い切ってデスクトップ PC の SSD を換装した。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2012%2F05%2F02%2F083431" title="連休4日目。PCを自作した。 - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>3年9ヵ月ぶりのアップグレードになるみたい。SSD の増強は4年ぶり。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2012%2F03%2F24%2F230235" title="SSD 120GB → 240GB - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>OS の再インストールも2年か、3年ぶりだろうと思う。かつては最低でも1年に1回はやっていた気がするが、最近の OS は頑丈で壊れないし、かつてほどお行儀の悪いアプリも多くないおかげで、環境を再構築しなければならない場面は減った。あと、怪しそうなのは仮想環境で試しているっていうのもちょっとあるかも。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00VX82PA6/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/41D-AF0Z6qL._SL160_.jpg" class="hatena-asin-detail-image" alt="Transcend SSD 512GB 2.5インチ SATA3 6Gb/s MLC採用 TS512GSSD370S" title="Transcend SSD 512GB 2.5インチ SATA3 6Gb/s MLC採用 TS512GSSD370S"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00VX82PA6/bestylesnet-22/">Transcend SSD 512GB 2.5インチ SATA3 6Gb/s MLC採用 TS512GSSD370S</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> トランセンド・ジャパン</li><li><span class="hatena-asin-detail-label">発売日:</span> 2015/04/30</li><li><span class="hatena-asin-detail-label">メディア:</span> Personal Computers</li><li><a href="http://d.hatena.ne.jp/asin/B00VX82PA6/bestylesnet-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>SSD はトランセンドの SSD370 TS512GSSD370S をチョイス。Amazon だと2万を少し超えてしまうが――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160222173238.png" alt="f:id:daruyanagi:20160222173238p:plain" title="f:id:daruyanagi:20160222173238p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>よくわからない割引のおかげで、2万以内で購入できた。価格.com の最安値 ¥19,418 と遜色ない。</p><p>SSD の換装そのものは順調にいった。まぁ、古いのを抜いて、新しいのを挿すだけだしね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160222173535.jpg" alt="f:id:daruyanagi:20160222173535j:plain" title="f:id:daruyanagi:20160222173535j:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160222173537.jpg" alt="f:id:daruyanagi:20160222173537j:plain" title="f:id:daruyanagi:20160222173537j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>……（＾ｖ＾）ﾏｧ､ｿｳｲｳｺﾄﾓｱﾙ</p><p>面倒くさがらず、インストールの際は不要なドライブを切断してからにした方がいいね。GPT うんぬんは、一度パーティションを削除して、再度インストールを試みれば大丈夫だった。</p>

<div class="section">
<h3>追記</h3>
<p>困ったことに、Windows 10 をインストールしたら DVI-D から信号が来なくなった。従来は、</p>

<ul>
<li>プライマリモニター：マザーボードの DVI-D ＋ 三菱 RDT233WLM</li>
<li>セカンダリモニター：マザーボードの VGA ＋ SHARP LL-T2015B</li>
</ul><p>という構成だったのだが、DVI-D が死んだので、</p>

<ul>
<li>プライマリモニター：マザーボードの HDMI ＋ 三菱 RDT233WLM</li>
<li>セカンダリモニター：マザーボードの VGA ＋ SHARP LL-T2015B</li>
</ul><p>という構成で使ってる。まぁ、動くからいいや。</p><p>ちなみに SHARP のモニターは2003年製なので、HDMI 端子なんかない。13年も使っているので、そろそろ爆発してもおかしくないが、まぁ、それまでは頑張ってもらおうかと思う。それにしても、ディスプレイより会社の方が先に潰れるとは思ってもみなかった（まだ潰れてないけど）。長生きはするものだ。</p>

</div>