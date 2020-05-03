---
date: 2015-09-22T17:12:05.0000000
draft: false
title: "一年ぶり： HTML5 Canvas に挑戦したった。"
tags: ["JavaScript"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20150922/20150922170401.png
---
<p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2014%2F05%2F27%2F032655" title="ただの日記： HTML5 Canvas に挑戦したった。 - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p><p>むかし HTML5 Canvas で年表っぽいの作りたいなぁ、って思って一度挑戦したのだけど……すごい、もう一年経ってた。そら、加齢臭も増しますわ。</p><p>コーディングは WebMatrix でやったけれど、いまだに JavaScript をいい感じにコンポーネント化するやり方が分かってない(;´･ω･)</p><p><script src="https://gist.github.com/daruyanagi/a642d35cf017a9231e80.js"> </script></p><p>前と違うのは縦書きである点だけど、HTML は横に広がるより縦に広がる方が読みやすい気がした。あと、デザイン……センスないのどうやったら改善されるんだろう？</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>&lt;script src=<span class="synConstant">&quot;~/Scripts/Chronology.js&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;
<span class="synIdentifier">var</span> graph_settings1 = <span class="synIdentifier">{</span>
:
<span class="synIdentifier">}</span>

<span class="synStatement">window</span>.onload = <span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
chronology(<span class="synConstant">'graph'</span>, graph_settings1);
<span class="synIdentifier">}</span>;
&lt;/script&gt;
</pre><p>ってな感じで使える気がする。ロゴ云々はキニシナイデ。最初はそれぞれのアイテムにロゴをもたせて、名前の代わりにロゴをレンダリングしてやろうと思ったのだけど、なんかいろいろ難しくてやめた。</p>

<div class="section">
<h3>テスト1：三国志の年表</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150922170332.png" alt="f:id:daruyanagi:20150922170332p:plain" title="f:id:daruyanagi:20150922170332p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> graph_settings2 = <span class="synIdentifier">{</span>
<span class="synConstant">&quot;begin_year&quot;</span>: 190,
<span class="synConstant">&quot;end_year&quot;</span>: 290,
<span class="synConstant">&quot;scale&quot;</span>: 5,
<span class="synConstant">&quot;margin&quot;</span>: 6,
<span class="synConstant">&quot;items&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;魏&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: 220, <span class="synConstant">&quot;end&quot;</span>: 265, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;blue&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;呉&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: 222, <span class="synConstant">&quot;end&quot;</span>: 280, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;red&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;蜀&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: 221, <span class="synConstant">&quot;end&quot;</span>: 263, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;orange&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;晋&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: 265, <span class="synConstant">&quot;end&quot;</span>: 316, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;green&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;後漢&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: 23, <span class="synConstant">&quot;end&quot;</span>: 220, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;gray&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>,
<span class="synConstant">&quot;events&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;黄巾の乱&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 184 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;赤壁の戦い&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 208 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;夷陵の戦い&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 221 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;五丈原の戦い&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 234 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;高平陵の変&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 249 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;公孫淵滅亡&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: 238 <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>
<span class="synIdentifier">}</span>;
</pre>
</div>
<div class="section">
<h3>テスト2：共和制ローマ末期（紀元前のテスト）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150922170401.png" alt="f:id:daruyanagi:20150922170401p:plain" title="f:id:daruyanagi:20150922170401p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> graph_settings3 = <span class="synIdentifier">{</span>
<span class="synConstant">&quot;begin_year&quot;</span>: -120,
<span class="synConstant">&quot;end_year&quot;</span>: 20,
<span class="synConstant">&quot;scale&quot;</span>: 5,
<span class="synConstant">&quot;margin&quot;</span>: 6,
<span class="synConstant">&quot;graduation&quot;</span>: 20,
<span class="synConstant">&quot;items&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;キケロ&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: -107, <span class="synConstant">&quot;end&quot;</span>: -43, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;blue&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;スッラ&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: -138, <span class="synConstant">&quot;end&quot;</span>: -78, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;red&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;カエサル&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: -102, <span class="synConstant">&quot;end&quot;</span>: -44, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;orange&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;アントニウス&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: -83, <span class="synConstant">&quot;end&quot;</span>: -30, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;green&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;アウグストゥス&quot;</span>, <span class="synConstant">&quot;start&quot;</span>: -63, <span class="synConstant">&quot;end&quot;</span>: 14, <span class="synConstant">&quot;color&quot;</span>: <span class="synConstant">&quot;gray&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>,
<span class="synConstant">&quot;events&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;アクティウムの海戦&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: -31 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;アレシア攻防戦&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: -51 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;同盟市戦争&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: -90 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;スパルタクスの反乱&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: -73 <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;ユグルタ戦争&quot;</span>, <span class="synConstant">&quot;year&quot;</span>: -109 <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>
<span class="synIdentifier">}</span>;
</pre><p>紀元前0年が発生するのは気にしないことにする（ぉ</p>

</div>