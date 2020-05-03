---
date: 2016-10-25T08:42:16.0000000
draft: false
title: "Civilization 6 のロードが遅い場合"
tags: ["Civlization"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161025083512.png" alt="f:id:daruyanagi:20161025083512p:plain" title="f:id:daruyanagi:20161025083512p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>昨日から急に Civilization 6 のロードが遅くなった。とくに新規ゲーム画面で読み込みが終わらず、ゲームが開始されないのは痛い。</p><p>調べてみると、<b>Antimalware Service Executable</b> が CPU を食っていたので、たぶん Windows Defender が悪さをしているのだと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161025083547.png" alt="f:id:daruyanagi:20161025083547p:plain" title="f:id:daruyanagi:20161025083547p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20161025083549.png" alt="f:id:daruyanagi:20161025083549p:plain" title="f:id:daruyanagi:20161025083549p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「設定」アプリを開いて［更新とセキュリティ］－［Windows Defender］－［除外を追加する］画面を開き、Steam のアプリフォルダー（<b>C:\Program Files(x86)\Steam</b>）を丸ごと除外指定したら、正常にゲームがロードできるようになった。あんまりお勧めできない方法かもしれないけど、急場しのぎとして。</p>
