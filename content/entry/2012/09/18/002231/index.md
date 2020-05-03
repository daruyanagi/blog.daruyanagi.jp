---
date: 2012-09-18T00:22:31.0000000
draft: false
title: "メトロっぽいカスタムボタンを XAML で作る"
tags: ["Windows ストア アプリ"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120917231926.png" alt="f:id:daruyanagi:20120917231926p:plain" title="f:id:daruyanagi:20120917231926p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>StandardStyles.xaml はお宝の宝庫や！　という話を前回（<a href="https://blog.daruyanagi.jp/entry/2012/09/17/235654">Common &#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x3092;&#x30C1;&#x30E9;&#x898B;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）少しした。たとえば、ボタンなんかはほとんど自分で作る必要がないぐらい、豊富に取り揃えられている。</p><p>けれど、それでも足りない場合があるかもしれない。おれは足りなかった。<a href="https://blog.daruyanagi.jp/entry/2012/09/17/222920">&#x71C3;&#x8CBB;&#x8A18;&#x9332;&#x7528;&#x306E; Windows &#x30B9;&#x30C8;&#x30A2;&#x30A2;&#x30D7;&#x30EA;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> に使う「ガソリン」アイコンのボタンがほしい！　なんでないんだっ？　レドモンドは何をしているっ！</p><p>そこでふと、死んだじいちゃんの言葉を思い出した。「なければ自分で作れ」。そうだ、じいちゃん。作ってみるよ、おれ！</p>

<div class="section">
<h3>まずは偵察</h3>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Style </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Key</span>=<span class="synConstant">&quot;FourBarsAppBarButtonStyle&quot;</span>
<span class="synIdentifier">       </span><span class="synType">TargetType</span>=<span class="synConstant">&quot;ButtonBase&quot;</span>
<span class="synIdentifier">       </span><span class="synType">BasedOn</span>=<span class="synConstant">&quot;{StaticResource AppBarButtonStyle}&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Setter </span><span class="synType">Property</span>=<span class="synConstant">&quot;AutomationProperties.AutomationId&quot;</span>
<span class="synIdentifier">            </span><span class="synType">Value</span>=<span class="synConstant">&quot;FourBarsAppBarButton&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;Setter </span><span class="synType">Property</span>=<span class="synConstant">&quot;AutomationProperties.Name&quot;</span>
<span class="synIdentifier">            </span><span class="synType">Value</span>=<span class="synConstant">&quot;Four Bars&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;Setter </span><span class="synType">Property</span>=<span class="synConstant">&quot;Content&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;</span><span class="synType">&amp;</span><span class="synStatement">#xE1E9</span><span class="synType">;</span><span class="synConstant">&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/Style&gt;</span>
</pre><p>これは StandardStyles.xaml で定義されている「バリ4」アイコンのソース。AppBarButtonStyle を継承していて、AutomationProperties.AutomationId、AutomationProperties.Name、Content の3つのプロパティを書き換えているのがわかる。</p><p>ちなみに、AppBarButtonStyle のコードは読む気が起きなかった。たぶん、Content を丸で囲って、下にテキストを追加する、みたいなことをやっているのだろう。知らんけど。</p><p>Content は文字の実態参照（っていうんだっけ？）で、AppBarButtonStyle はそれを Segoe UI Symbol で描画しているらしい。へぇ、あのアイコンの絵って、全部フォントだったんだ。</p><p>AutomationProperties はアイコンの下にでてくるテキストに関係があるみたい。試しに空にしてみたらテキストが消えた。</p><p>これでだいたい偵察が済んだ。簡単にカスタマイズできそうだ。</p>

</div>
<div class="section">
<h3>適当にカスタマイズしてみる</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120918001039.png" alt="f:id:daruyanagi:20120918001039p:plain" title="f:id:daruyanagi:20120918001039p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、文字コード表から目的の文字を探す。あった！　たいていのモノはありそうだな。</p><p>次に文字コードをもとにさきほどのスタイルをコピペして魔改造する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120918001322.png" alt="f:id:daruyanagi:20120918001322p:plain" title="f:id:daruyanagi:20120918001322p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>んで、実際にバインドして使ってみる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120918001358.png" alt="f:id:daruyanagi:20120918001358p:plain" title="f:id:daruyanagi:20120918001358p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>サークルが、消えている！ (；ﾟДﾟ) ﾅｾﾞﾀﾞ！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120918001514.png" alt="f:id:daruyanagi:20120918001514p:plain" title="f:id:daruyanagi:20120918001514p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんか、FlowLayout を RightToLeft にしていると消えてしまうみたい。理由まで調べるのは面倒だったけど、既定通り LeftToRight に戻したらサークルが出た。</p><p>これを応用したらボタンを腐るほど量産できるな！</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120918002004.jpg" alt="f:id:daruyanagi:20120918002004j:plain" title="f:id:daruyanagi:20120918002004j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>もっとボタンがほしければ、こういうのもある。有名ソフトのアイコンまでカバーされていていい感じ。</p><p><a href="http://www.forest.impress.co.jp/docs/news/20120809_552162.html">&#x7C73;Syncfusion&#x3001;&ldquo;Metro&rdquo;&#x30A2;&#x30A4;&#x30B3;&#x30F3;&#x306E;&#x4F5C;&#x6210;&#x30BD;&#x30D5;&#x30C8;&#x300C;Metro Studio 2&#x300D;&#x3092;&#x6B63;&#x5F0F;&#x516C;&#x958B; - &#x7A93;&#x306E;&#x675C;</a></p>

</div>