---
date: 2014-11-15T16:05:04.0000000
draft: false
title: "テキストエリアの高さをウィンドウサイズに合わせて調節したい"
tags: ["JavaScript"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141115155110.png" alt="f:id:daruyanagi:20141115155110p:plain" title="f:id:daruyanagi:20141115155110p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>テキストエリアの高さって、いつもなやむ。適当に &lt;textarea rows="10" &gt; みたいな感じで決め打ちにすると、最悪、テキストエリアにもウィンドウにもスクロールバーがでてウザい（2重スクロールバーはもっとも避けるべきユーザーインターフェイスだと思う！）。なんかいい感じにウィンドウの高さに合わせてテキストエリアの高さもできるだけ大きくとりたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141115155122.png" alt="f:id:daruyanagi:20141115155122p:plain" title="f:id:daruyanagi:20141115155122p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>要はこうしたいんや！ 最初はググってコードをコピったろうと思っていたのだけど、「入力に応じてサイズを大きくする」みたいなサンプルばっかりで参考にならなかったので、自分で考えてみた――ら、簡単だった。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>&lt;script&gt;
$(<span class="synStatement">window</span>).bind(<span class="synConstant">&quot;resize ready&quot;</span>, <span class="synIdentifier">function</span>(<span class="synStatement">event</span>)<span class="synIdentifier">{</span>
$(<span class="synConstant">'#Content'</span>).height(
$(<span class="synConstant">'#Content'</span>).height()  +
$(<span class="synStatement">window</span>).height() -
$(<span class="synStatement">document</span>.body).height()
);
<span class="synIdentifier">}</span>);
&lt;/script&gt;
</pre><p>#Content がテキストエリアの ID な。JavaScript（jQuery）はさっぱりわからないのだけど、$(window).bind() を使うと複数のイベントに単一の関数を割り当てられるらしい（今回は ready と resize に割り当てたよ！）。テキストエリアが2つ以上になると破たんするけれど、まぁ、とりあえずこれでイケてる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141115160100.png" alt="f:id:daruyanagi:20141115160100p:plain" title="f:id:daruyanagi:20141115160100p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ひよっこなので、コンソールでぷちぷち式を入力して結果を確認しながら作ってみた。入力補完も効くので（jQuery の関数はダメだけど。ここらへんは Visual Studio がすごいらしい）、右も左もわからない状態でも割となんとかなる。</p>
