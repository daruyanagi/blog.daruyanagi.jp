---
date: 2014-05-27T03:26:55.0000000
draft: false
title: "ただの日記： HTML5 Canvas に挑戦したった。"
tags: []
eyecatch: 20140527030620.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140527030620.png" alt="f:id:daruyanagi:20140527030620p:plain" title="f:id:daruyanagi:20140527030620p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>（別に技術的な内容ではない。ただの日記だ。成果をまとめてるといつまでたってもブログが書けないし、それは自分の役割でもない気がする。ただ、近頃はこんなことをして遊んでるというだけの話だ。最近は時間がとれないので、こういう形が増えそうな気がする）</p><p>太平洋戦争期の艦隊編成を年表みたいに表示できたらいいなと思って（<a href="http://www.jyai.net/military/data-08/kuchikutai_00.htm">&#x3053;&#x3093;&#x306A;&#x304B;&#x3093;&#x3058;</a>）、いろいろ頑張ってみた。</p><p>最初は div を position: absolute で配置していく感じにしたのだけど、データが複雑になるにつれて破綻していくように思えたので、Canvas に図を書くことにした。Canvas に書いちゃうとテキストにリンクが貼れないのがちょっとアレだけど、それはそれで仕方ない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140527031021.png" alt="f:id:daruyanagi:20140527031021p:plain" title="f:id:daruyanagi:20140527031021p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず線を引くとこから始めて、半日後にはこんな感じに成長した。HTML5 Canvas は割りと低レベルな API っぽくて、線を一本引くだけでもダルい。みんなどうやっているんだろう。なんかラッパーを書くのかな？　ライブラリを使うのかな？</p><p>まぁ、それはともかく。</p><p>最初はグラフとデータが一体化していたのだけど（1941年12月8日は x px に、1945年8月15日は y px にマッピングしてそれを線で結ぶ、とかとか）、JavaScript に慣れるにしたがって少しずつ分けていった。そのデータも、最初は</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> events = <span class="synIdentifier">[]</span>;
events.push(<span class="synStatement">new</span> Event(<span class="synConstant">&quot;1941/12/08&quot;</span>, <span class="synConstant">&quot;開戦時編成&quot;</span>));
events.push(<span class="synStatement">new</span> Event(<span class="synConstant">&quot;1943/7/1&quot;</span>, <span class="synConstant">&quot;解体&quot;</span>));
events.push(<span class="synStatement">new</span> Event(<span class="synConstant">&quot;1944/8/15&quot;</span>, <span class="synConstant">&quot;再建&quot;</span>));
events.push(<span class="synStatement">new</span> Event(<span class="synConstant">&quot;1945/2/10&quot;</span>, <span class="synConstant">&quot;解体&quot;</span>));
events.push(<span class="synStatement">new</span> Event(<span class="synConstant">&quot;1945/8/15&quot;</span>, <span class="synConstant">&quot;終戦&quot;</span>));
</pre><p>みたいな糞ダサいコードで用意していたのだけど（とりあえず動いてくれ！！）、最後には</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> model = <span class="synIdentifier">{</span>
<span class="synConstant">&quot;fleetEvents&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1944/11/15&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;再編&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1945/1/1&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;再編&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1945/1/20&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;再編&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1945/5/6&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;解体&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>,
<span class="synConstant">&quot;warEvents&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1941/12/08&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;開戦&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1942/2/27&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;スラバヤ沖海戦&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1942/6/5&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;ミッドウェー海戦&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1944/10/25&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;サマール沖海戦&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1945/8/15&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;終戦&quot;</span> <span class="synIdentifier">}</span>,
<span class="synIdentifier">]</span>,
<span class="synConstant">&quot;ships&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span>
<span class="synConstant">&quot;name&quot;</span>: <span class="synConstant">&quot;妙高&quot;</span>,
<span class="synConstant">&quot;comm&quot;</span>: <span class="synConstant">&quot;1929/7/31&quot;</span>,
<span class="synConstant">&quot;lost&quot;</span>: <span class="synConstant">&quot;1946/7/8&quot;</span>,
<span class="synConstant">&quot;join&quot;</span>: <span class="synConstant">&quot;1941/12/08&quot;</span>,
<span class="synConstant">&quot;left&quot;</span>: <span class="synConstant">&quot;1945/1/20&quot;</span>,
<span class="synConstant">&quot;beforeJoin&quot;</span>: <span class="synConstant">&quot;開戦時在籍&quot;</span>,
<span class="synConstant">&quot;afterLeft&quot;</span>: <span class="synConstant">&quot;第一南遣艦隊付属&quot;</span>,
<span class="synConstant">&quot;damaged&quot;</span>: <span class="synIdentifier">[</span>
<span class="synIdentifier">{</span> <span class="synConstant">&quot;date&quot;</span>: <span class="synConstant">&quot;1944/12/13&quot;</span>, <span class="synConstant">&quot;title&quot;</span>: <span class="synConstant">&quot;大破&quot;</span> <span class="synIdentifier">}</span>
<span class="synIdentifier">]</span>
<span class="synIdentifier">}</span>,
</pre><p>みたいな JSON データを読み込む感じにできた。これで、こんな JSON を返すサーバーを作れば動的にグラフが書けるハズ（今度はどうやってサーバーを書けばいいかわからん。Dapper で少し考えてみたけど、自分は結合とかよくわかってないから SQL だけでサクッと書けない。まぁ、C# で書けばいいのか）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140527031652.png" alt="f:id:daruyanagi:20140527031652p:plain" title="f:id:daruyanagi:20140527031652p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>最初のスクリーンショットは第二駆逐艦のデータを使ったけど、次は同じプレゼンテーションコードに第五戦隊のデータをぶち込んでみた。テキストが被りまくってるのを除けば、だいたいうまくできてる（ってことは、ちゃんとデータとビューが分離できたってことなのかな？）。あとは measureText() でちゃんとテキストの大きさを図って、ずらして描画していけばいいはず。</p><p>ちょっと JavaScript が楽しくなってきた。いまだに文法あんまり覚えてなくて、細かいところでハマって時間を浪費しているけれど、これから先 C# しかわかんないのもどうかと思うので頑張る。</p>
