---
date: 2015-05-02T11:12:06.0000000
draft: false
title: "はてなダイアリーで特定カテゴリーの記事をお知らせとしてトップに掲出する方法を考えてみた。"
tags: ["JavaScript"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20150502/20150502105752.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150502105752.png" alt="f:id:daruyanagi:20150502105752p:plain" title="f:id:daruyanagi:20150502105752p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これな。ドメイン失くしてごめんなさい的な告知を出しておきたかった。</p>

<div class="section">
<h3>カテゴリーのフィードを探す。</h3>
<p>まずはカテゴリーのフィードを探す。カテゴリーページを開いてソースを見ると……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150502110020.png" alt="f:id:daruyanagi:20150502110020p:plain" title="f:id:daruyanagi:20150502110020p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こんな風に書いてある。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;alternate&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;application/atom+xml&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Atom&quot;</span>
<span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;https://blog.daruyanagi.jp/feed/category/%E5%91%8A%E7%9F%A5&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;alternate&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;application/rss+xml&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span><span class="synIdentifier">=</span><span class="synConstant">&quot;RSS2.0&quot;</span>
<span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;https://blog.daruyanagi.jp/rss/category/%E5%91%8A%E7%9F%A5&quot;</span><span class="synIdentifier">/&gt;</span>
</pre><p>なんでもいいと思うのだけど、今回は RSS2.0 の方を使った。</p>

</div>
<div class="section">
<h3>JavaScript でフィードを取得して主力する</h3>
<p>Google Feed API を利用するのが一般的な方法らしい。</p>

<ul>
<li><a href="https://developers.google.com/feed/v1/?hl=ja">Google Developers</a></li>
</ul><p>最初の1個だけ取得して、#target 要素を書き換えるようにしてみる。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>&lt;script type=<span class="synConstant">&quot;text/javascript&quot;</span> src=<span class="synConstant">&quot;http://www.google.com/jsapi&quot;</span>&gt;&lt;/script&gt;
&lt;script type=<span class="synConstant">&quot;text/javascript&quot;</span>&gt;
<span class="synIdentifier">function</span> GetAnnouncement(target, url) <span class="synIdentifier">{</span>
google.load(<span class="synConstant">&quot;feeds&quot;</span>, <span class="synConstant">&quot;1&quot;</span>);

<span class="synIdentifier">function</span> initialize() <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> feed = <span class="synStatement">new</span> google.feeds.Feed(url);
feed.setNumEntries(1);
feed.load(<span class="synIdentifier">function</span> (result) <span class="synIdentifier">{</span>
<span class="synStatement">if</span> (!result.error) <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> container = <span class="synStatement">document</span>.getElementById(target);
<span class="synIdentifier">var</span> feed = result.feed.entries<span class="synIdentifier">[</span>0<span class="synIdentifier">]</span>;
<span class="synIdentifier">var</span> html = <span class="synConstant">&quot;&lt;a href='&quot;</span> + feed.link + <span class="synConstant">&quot;'&gt;&quot;</span> + feed.title + <span class="synConstant">&quot;&lt;/a&gt;&quot;</span>;
container.innerHTML = html;
<span class="synIdentifier">}</span> <span class="synStatement">else</span> <span class="synIdentifier">{</span>
console.log(result.error.code + <span class="synConstant">&quot;:&quot;</span> + result.error.message);
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>

google.setOnLoadCallback(initialize);
<span class="synIdentifier">}</span>

GetAnnouncement(<span class="synConstant">&quot;feed&quot;</span>, <span class="synConstant">&quot;https://blog.daruyanagi.jp/rss/category/%E5%91%8A%E7%9F%A5&quot;</span>);
&lt;/script&gt;

&lt;span id=<span class="synConstant">&quot;feed&quot;</span>&gt;ここにはいる&lt;/span&gt;
</pre><p>JavaScript 力が低い（</p><p>ついでにスタイルシートとかもかいて、装飾しておくとよいかと。ソースコードの見た目？　んなもん気にしない。</p><p>キャッシュが効いていて更新が遅いので、気になる人は URL の尻尾になんかランダムの値を足しておくといいかも。毎回フィードをとりに行くので、表示は遅くなるが。</p>

</div>
<div class="section">
<h3>はてなのトップに掲出する</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150502110738.png" alt="f:id:daruyanagi:20150502110738p:plain" title="f:id:daruyanagi:20150502110738p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>デザイン設定画面のヘッダーのところにさっきのソースコードをペタッと貼る。あとは見栄えをチェックして完了。</p>

</div>