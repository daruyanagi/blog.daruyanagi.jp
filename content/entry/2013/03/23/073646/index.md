---
date: 2013-03-23T07:36:46.0000000
draft: false
title: "WebMatrix 3 Preview → Windows Azure Web Sites が光速過ぎて笑うしかない"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323072351.png" alt="f:id:daruyanagi:20130323072351p:plain" title="f:id:daruyanagi:20130323072351p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/03/22/060002">Microsoft WebMatrix 3 Preview - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続きというか、補足のようなもの。</p><p>Windows Azure （Microsoft ID）でログインした状態で Web サイトを新規作成すると、「Windows Azure にもサイトを作らないか？（うほっ」と言われる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323072921.png" alt="f:id:daruyanagi:20130323072921p:plain" title="f:id:daruyanagi:20130323072921p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>素直にそれに従うと……フツーに Windows Azure Web Sites ができちゃう。もう簡単すぎて笑うしかない……。まぁ、もともと Windows Azure は簡単だけれど。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323072932.png" alt="f:id:daruyanagi:20130323072932p:plain" title="f:id:daruyanagi:20130323072932p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さすがにこれだけだと空なので、Default.cshtml でもおいて公開してみる。いつも通り［Publish］ボタンを押すと、初回は互換性チェックが走って……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323073023.png" alt="f:id:daruyanagi:20130323073023p:plain" title="f:id:daruyanagi:20130323073023p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ファイルのアップロードをして……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323073043.png" alt="f:id:daruyanagi:20130323073043p:plain" title="f:id:daruyanagi:20130323073043p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>完成。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130323073053.png" alt="f:id:daruyanagi:20130323073053p:plain" title="f:id:daruyanagi:20130323073053p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あー、全部 Azure Web Sites にしてしまいたいなぁ。実はそれほど高くなさそうなのだけれど、サブドメイン使いまくってるとやっぱり ExpressWeb には勝てないわけで。</p><p>GitHub や CodePlex を使うつもりならば、そっちでプロジェクトを作成し、WebMatrix 3 でクローンするといい。おんなじ感じで Azure Web Sites も簡単に作れる。</p>

<div class="section">
<h4>おまけ</h4>
<p>@ishisaka さんが Git 周りを中心に WebMatrix 3 の記事を書いてくれているので必見やで。</p>

<ul>
<li><a href="http://opcdiary.net/?p=26455">WebMatrix 3 Preview&#x30EA;&#x30EA;&#x30FC;&#x30B9; &#x7279;&#x306B;Git&#x95A2;&#x9023;&#x6A5F;&#x80FD;&#x306E;&#x7D39;&#x4ECB; | OPCDiary</a></li>
</ul>
</div>