---
date: 2012-12-11T08:51:25.0000000
draft: false
title: "WebMatrix 2：ASP.NET と PHP"
tags: ["ASP.net Web Pages", "WebMatrix", "PHP"]
eyecatch: 
---
<p>前回（<a href="https://blog.daruyanagi.jp/entry/2012/12/07/125835">WebMatrix 2&#xFF1A;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x304B;&#x3089; Web &#x30B5;&#x30A4;&#x30C8;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）は、空のフォルダーから Web サイトを作って HTML ファイルを配置し、それをローカル Web サーバー（IIS Express 7.5）でホストするところまで進めた。でも、静的な HTML だけではちょっとつまらないかな。</p><p>「WebMatrix 2」では、サーバーサイドで動的に HTML を生成することもできる<a href="#f-5619c126" name="fn-5619c126" title="クライアントサイドの場合は、JavaScript でやるよね！">*1</a>。“動的”というのは、要求に応じて異なる内容を出力できるということ。これができると、いろいろなメリットがある。</p>

<ul>
<li>データベースと連携できる</li>
<li>ほかの Web サイトの情報を取り込んだり、Web サービスの API が利用できる<a href="#f-dbae782a" name="fn-dbae782a" title="いわゆるマッシュアップ">*2</a></li>
<li>Web サイト共通の部分（パラメーターやデザイン）が一元管理できる</li>
<li>状況に応じて出力がカスタマイズできる（例: モバイル向けWebデザイン）</li>
</ul><p>世の中にはさまざまなサーバ・サイドプログラミング環境があるけれど、「WebMatrix 2」ではそのなかでも“<b>ASP.NET</b>”と“<b>PHP</b>”をサポートしている<a href="#f-af9dfc05" name="fn-af9dfc05" title="node.js も利用できるのだけど、ちょっと理由があって今回は省いている">*3</a>。空のフォルダーから作成した Web サイト でも簡単に利用できる。</p>

<div class="section">
<h3>ASP.NET（C#）<a href="#f-b6e12467" name="fn-b6e12467" title="Visual Basic も利用できる">*4</a></h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211081503.png" alt="f:id:daruyanagi:20121211081503p:plain" title="f:id:daruyanagi:20121211081503p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>拡張子は“.cshtml”（Visual Basic の場合は *.vbhtml）。“<b>Razor</b>”と呼ばれるシンプルな構文で記述できる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var s = <span class="synConstant">&quot;Hello! World&quot;</span>; <span class="synComment">// 追加</span>
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@s &lt;!-- 追加 --&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211082320.png" alt="f:id:daruyanagi:20121211082320p:plain" title="f:id:daruyanagi:20121211082320p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>拡張子を省略してもアクセスできる。</p>

</div>
<div class="section">
<h3>PHP: Hypertext Preprocessor</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211082442.png" alt="f:id:daruyanagi:20121211082442p:plain" title="f:id:daruyanagi:20121211082442p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>拡張子は“.php”。おそらくもっともポピュラーなサーバーサイドプログラミング言語。</p>
<pre class="code lang-php" data-lang="php" data-unlink><span class="synSpecial">&lt;?php</span>
<span class="synStatement">$</span><span class="synIdentifier">s</span> <span class="synStatement">=</span> &quot;<span class="synConstant">Hello! World</span>&quot;; <span class="synComment">// 追加</span>
<span class="synSpecial">?&gt;</span>

<span class="synComment">&lt;!DOCTYPE html&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;en&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">&lt;?php</span> <span class="synPreProc">echo</span><span class="synSpecial">(</span><span class="synStatement">$</span><span class="synIdentifier">s</span><span class="synSpecial">)</span>; <span class="synSpecial">?&gt;</span> <span class="synComment">&lt;!-- 追加 --&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211082528.png" alt="f:id:daruyanagi:20121211082528p:plain" title="f:id:daruyanagi:20121211082528p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h4>PHP を利用するには</h4>
<p>「WebMatrix 2」で PHP を利用するには追加のコンポーネントが必要。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211082852.png" alt="f:id:daruyanagi:20121211082852p:plain" title="f:id:daruyanagi:20121211082852p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、［サイト］タブの［設定］画面を開き、“PHP を有効にする”をチェック。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211082949.png" alt="f:id:daruyanagi:20121211082949p:plain" title="f:id:daruyanagi:20121211082949p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、「PHP 5.4.8 for IIS Express」がインストールされる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211083024.png" alt="f:id:daruyanagi:20121211083024p:plain" title="f:id:daruyanagi:20121211083024p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211083028.png" alt="f:id:daruyanagi:20121211083028p:plain" title="f:id:daruyanagi:20121211083028p:plain" class="hatena-fotolife" itemprop="image"></span><span itemscope itemtype="http://schema.org/Photograph"><img src="20121211083032.png" alt="f:id:daruyanagi:20121211083032p:plain" title="f:id:daruyanagi:20121211083032p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>セットアップはほとんど自動で行われる。</p>

</div>
</div>
<div class="section">
<h3>どちらを利用すべきか？</h3>
<p><b>なんなら混ぜて利用することもできる</b>ので、別にどっちでもよいのだけれど、これから Windows プラットフォームでサーバーサイドプログラミングを始めるならば、ASP.NET の方をお勧めしたい。後発であるがゆえのさまざまなメリットがある。</p>

<ul>
<li>構文がシンプル</li>
<li>言語レベルでのセキュリティ設計で一日の長がある</li>
<li>C# が利用できる。この知識は Web プログラミング以外にも活用できる</li>
</ul><p>PHP の方が優れている面も、もちろんある。</p>

<ul>
<li>Windows / IIS 以外の環境でも動作する</li>
<li>動作実績が豊富でサンプルも多く、学習が容易</li>
<li>Razor より少しだけ速いらしい</li>
</ul>
</div><div class="footnote">
<p class="footnote"><a href="#fn-5619c126" name="f-5619c126" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">クライアントサイドの場合は、JavaScript でやるよね！</span></p>
<p class="footnote"><a href="#fn-dbae782a" name="f-dbae782a" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">いわゆるマッシュアップ</span></p>
<p class="footnote"><a href="#fn-af9dfc05" name="f-af9dfc05" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">node.js も利用できるのだけど、ちょっと理由があって今回は省いている</span></p>
<p class="footnote"><a href="#fn-b6e12467" name="f-b6e12467" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">Visual Basic も利用できる</span></p>
</div>