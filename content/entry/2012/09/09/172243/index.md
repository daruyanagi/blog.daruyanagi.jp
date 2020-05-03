---
date: 2012-09-09T17:22:43.0000000
draft: false
title: "WebMatrix で LESS を使おう！（2）"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120829200628.png" alt="f:id:daruyanagi:20120829200628p:plain" title="f:id:daruyanagi:20120829200628p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2012/09/03/093520">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;5&#xFF09; &#x2015;&#x2015; &#x30ED;&#x30FC;&#x30EB; - &#x3060;&#x308B;&#x308D;&#x3050;</a> なんかで使っているラベル用の CSS は LESS で書いている。変数とか関数とか使えないと、この程度の CSS を書くだけで簡単に破たんできるぜ……。</p><p>で、どうやって使うのかというと……例えば、</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span>
<span class="synIdentifier">              </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Content/StyleSheet.css&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span>
<span class="synIdentifier">              </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/css&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;message error&quot;</span><span class="synIdentifier">&gt;</span>
エラーが発生しました。
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;message info&quot;</span><span class="synIdentifier">&gt;</span>
お知らせが1件あります。
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;message warning&quot;</span><span class="synIdentifier">&gt;</span>
注意してください。
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>こんな cshtml があるとする。次に、新規作成のダイアログで［すべて］タブを選択し、LESS ファイルを作成する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120909171100.png" alt="f:id:daruyanagi:20120909171100p:plain" title="f:id:daruyanagi:20120909171100p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>パスは ~/Content/StyleSheet.less （css → less にするだけ）だよ。あとはどんどん書いていくんだぜ～！　保存するたんびに「OrangeBits Compiler」（後述）が CSS （~/Content/StyleSheet.css）へ変換してくれるから楽ちんでいい。</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synStatement">body</span> <span class="synIdentifier">{</span>
<span class="synType">font-family</span>: Meiryo<span class="synSpecial">,</span> <span class="synConstant">sans-serif</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">.error</span> <span class="synIdentifier">{</span>
.message-status(<span class="synConstant">&quot;ERROR&quot;</span>, <span class="synConstant">red</span>)
<span class="synIdentifier">}</span>

<span class="synIdentifier">.info</span> <span class="synIdentifier">{</span>
.message-status(<span class="synConstant">&quot;INFO&quot;</span>, <span class="synConstant">steelblue</span>)
<span class="synIdentifier">}</span>

<span class="synIdentifier">.warning</span> <span class="synIdentifier">{</span>
.message-status(<span class="synConstant">&quot;WARNING&quot;</span>, <span class="synConstant">orange</span>)
<span class="synIdentifier">}</span>
</pre><p>関数<a href="#f-b0036404" name="fn-b0036404" title="Mixin（ミックスイン）っていうのかな？">*1</a>のおかげで、メインの部分はこんなにコンパクトだよ。ちなみに message-status というイケてない名前の関数の中身は、以下の通り。上のスタイルシートの続きに書いていく。だいたいそんな感じで使うんだなっていうのがわかると思う。</p>
<pre class="code lang-css" data-lang="css" data-unlink><span class="synIdentifier">.message-status</span>(@<span class="synStatement">label</span><span class="synSpecial">,</span> @<span class="synStatement">base</span>-color) <span class="synIdentifier">{</span>
// 引数がとれる！

// 変数の宣言と組み込み関数による色の演算
@dark-<span class="synType">color</span>: darken(@base-color<span class="synSpecial">,</span> <span class="synConstant">5%</span>);
@light-<span class="synType">color</span>: lighten(@base-color<span class="synSpecial">,</span> <span class="synConstant">45%</span>);

<span class="synType">border</span>: <span class="synConstant">1px</span> <span class="synConstant">solid</span> <span class="synConstant">black</span>;
<span class="synType">border-color</span>: @dark-color;
<span class="synType">color</span>: @dark-color;
<span class="synType">background-color</span>: @light-color;

<span class="synType">margin</span>: <span class="synConstant">1em</span>;
<span class="synType">padding</span>: <span class="synConstant">1em</span>;
.rounded-box(); // &lt;- スタイルの Mixin

// ネストしたスタイルの指定
// &amp; はちょっと特殊な変数（？）で、現在の要素を表す
// &amp;:before を .label で使うと .label:before になる
&amp;:before {
<span class="synConstant">content</span>: @label;
<span class="synType">font-size</span>: <span class="synConstant">80%</span>;
<span class="synType">color</span>: <span class="synConstant">white</span>;
<span class="synType">background-color</span>: @dark-color;
<span class="synType">padding</span>: <span class="synConstant">0</span> <span class="synConstant">0.5em</span>;
.rounded-box(<span class="synConstant">3px</span>);
<span class="synIdentifier">}</span>
<span class="synError">}</span>

<span class="synIdentifier">.rounded-box</span> (@radius: 5px) <span class="synIdentifier">{</span> // &lt;- 超便利じゃない？
<span class="synType">border-radius</span>: @radius;
<span class="synComment">-webkit-</span><span class="synType">border-radius</span>: @radius;
<span class="synComment">-moz-</span><span class="synType">border-radius</span>: @radius;
<span class="synIdentifier">}</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120909170137.png" alt="f:id:daruyanagi:20120909170137p:plain" title="f:id:daruyanagi:20120909170137p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こうやってまとめられるところはまとめておくと、CSS が肥大化してもメンテナンス性・可読性への影響が少ないんじゃないかな。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120909171526.png" alt="f:id:daruyanagi:20120909171526p:plain" title="f:id:daruyanagi:20120909171526p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>邪魔ならみえないように折りたたんでおくこともできるしね。</p><p>WebMatrix 2 では、追加で「Orangebits Compiler」を導入することで、この LESS が簡単に扱えるようになっているのでぜひ試すべし。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/15/161932">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><div class="footnote">
<p class="footnote"><a href="#fn-b0036404" name="f-b0036404" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">Mixin（ミックスイン）っていうのかな？</span></p>
</div>