---
date: 2014-11-27T11:12:49.0000000
draft: false
title: "Google Chrome と Mixed Content"
tags: []
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141127110130.png" alt="f:id:daruyanagi:20141127110130p:plain" title="f:id:daruyanagi:20141127110130p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とあるサイトを Google Chrome で見ていると、なんかデザインが崩れている。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141127110301.png" alt="f:id:daruyanagi:20141127110301p:plain" title="f:id:daruyanagi:20141127110301p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いわゆる Mixed Content （混合コンテンツ）のブロックらしい。混合コンテンツというのは、セキュアなものとセキュアでないものが混じったコンテンツのことを言うようだ。たとえば、https 接続のページに http 接続で取得した外部コンテンツが混じっている、みたいな状況を指す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141127110443.png" alt="f:id:daruyanagi:20141127110443p:plain" title="f:id:daruyanagi:20141127110443p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こういった機能は、最近のブラウザーではもう珍しくない。Google Chrome はもちろん、Internet Explorer や Mozilla Firefox にも同様の機能は搭載されている。</p><p>Google Chrome の場合、アドレスバー右端に盾アイコンが現れ、セキュアでないコンテンツをブロックしたことを通知してくれる。ブロックの解除はここから行える。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141127110537.png" alt="f:id:daruyanagi:20141127110537p:plain" title="f:id:daruyanagi:20141127110537p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>正常なデザインに。アドレスバーの https:// に打消し線が表示されていることに注目。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141127110959.png" alt="f:id:daruyanagi:20141127110959p:plain" title="f:id:daruyanagi:20141127110959p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ただ、ブロック機能を再び有効化するにはどうすればいいのだろう。スクリプトならばサイトごとにブロックできるが……。まぁ、信頼している（ここには悪意がないだろうと個人的に思える）サイトでのみ許可したほうがいいのかもしれない。</p>

<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Security/MixedContent">Mixed Content - Security | MDN</a></li>
</ul>