---
date: 2012-10-02T20:48:34.0000000
draft: false
title: "未来の JavaScript を先取りする TypeScript"
tags: ["TypeScript", "WebMatrix"]
eyecatch: 
---
<p><iframe style="height:288px;width:512px" src="http://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript/player?w=512&h=288" frameBorder="0" scrolling="no" ></iframe><br />
</p>

<blockquote cite="http://blogs.msdn.com/b/somasegar/archive/2012/10/01/typescript-javascript-development-at-application-scale.aspx">
<p>Today, we’re introducing a new programming language that solves a very specific problem – getting JavaScript development to scale. That language is TypeScript. You can learn more about the TypeScript project, download an early preview, read and discuss the language specification, explore the online playground, and peruse the source of the compiler (on the TypeScript project site on CodePlex, with git).</p>

<cite><a href="http://blogs.msdn.com/b/somasegar/archive/2012/10/01/typescript-javascript-development-at-application-scale.aspx">TypeScript: JavaScript Development at Application Scale &ndash; Somasegar&#39;s blog</a></cite>
</blockquote>
<p>たまにこのブログに載せるコードでもわかるように、わしは JavaScript があんまりわかっていない。見様見真似で jQuery 使ったりするけれど、基本的なことがわかっていなさ過ぎて、キレイにモジュール化して書くことができない。だから、たくさん書くとすぐに破たんする。</p><p>でも、TypeScript だったらちょっと何とかなるんじゃないか。そんな印象を受けた。</p><p>なにより、JavaScript からそんなに離れていないのがいい。TypeScript は ECMAScript 5 のスーパーセットになっていて、付け足された部分も ECMAScript 6 で勧告されている仕様を先取りした形になっている。つまり、TypeScript というのは<i>未来の JavaScript を今の JavaScript へコンパイルする言語</i>なんだな。今までの知識が多少なりとも役に立つし、新たに勉強してもその努力が無駄になることはあるまい<a href="#f-a5d3206c" name="fn-a5d3206c" title="この歳になると、まっさらな言語を一から勉強するのはめんどくさいのよね。">*1</a>。そう考えると、俄然興味がわいてしまう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121002203637.png" alt="f:id:daruyanagi:20121002203637p:plain" title="f:id:daruyanagi:20121002203637p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>で、どうせ使うなら、Visual Studio もいいけど WebMatrix で使いたい。でも、今のところ Node.js プロジェクトの場合 npm でインストールできるけれど、それもコンパイラだけなのかな。シンタックスハイライトや IntelliSense はないみたい<a href="#f-30e541f5" name="fn-30e541f5" title="Visual Studio にはもちろんあるよ">*2</a>。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121002203648.png" alt="f:id:daruyanagi:20121002203648p:plain" title="f:id:daruyanagi:20121002203648p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>というわけで、ツールのサポートもないわ、いちいち tsc でコンパイルすなきゃだわで、WebMatrix で使うにはまだめんどくさい感じ。せめて、「OrangeBits Compiler」（<a href="https://blog.daruyanagi.jp/entry/2012/08/15/161932">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）がやってるみたいに .ts を監視して自動で .js にコンパイルする拡張機能なんかがあれば面白いかもしれない。そのうち誰かが作ってくれそうだな。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-a5d3206c" name="f-a5d3206c" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">この歳になると、まっさらな言語を一から勉強するのはめんどくさいのよね。</span></p>
<p class="footnote"><a href="#fn-30e541f5" name="f-30e541f5" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">Visual Studio にはもちろんあるよ</span></p>
</div>