---
date: 2017-05-12T00:35:39.0000000
draft: false
title: "PowerShell：String を String で分割する"
tags: ["PowerShell"]
eyecatch: 
---
<p>まだまだ PowerShell がカタコトしかしゃべれないチンカスですが、皆様はいかがお過ごしでしょうか。</p><p>さて、この間こんな感じのコードを書いたんですよ。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$text</span> = <span class="synConstant">'Microsoft Edge on Windows 10 Version 1511 for x64-based Systems'</span>

<span class="synIdentifier">$text</span>.Split(<span class="synConstant">' on '</span>)[-<span class="synConstant">1</span>]
</pre><p>意図としては、文字列を“ on ”で分割して後ろ部分“Windows 10 Version 1511 for x64-based Systems”を取り出したい、みたいな感じだったのですが……結果はこうでした</p>
<pre class="code" data-lang="" data-unlink>Systems</pre><p>そもそも <code>String.Split()</code> のシグネチャを間違えて雰囲気で書いてしまっているので正しく動作するはずはないのですが、一瞬なんでこんな結果になるのかわからず ( ；´Д｀)？ となってしまいました。</p><p>ちょっと考えたらわかるのですが、<code>' on '</code> が <code>char</code> の配列として解釈され、.NET でいうところの</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>text.Split(<span class="synStatement">new</span> <span class="synType">char</span>[] { <span class="synConstant">' '</span>, <span class="synConstant">'o'</span>, <span class="synConstant">'n'</span>, <span class="synConstant">' '</span> })
</pre><p>が実行されたんですね？（C# ならコンパイルエラーで止まる、というか、IntelliSense が補ってくれるから間違えない）　ためしに <code>| write</code> と書き足してみたところ、ぐちゃぐちゃに引き裂かれた文字列たちが出力されました(´；ω；`)ｳｯ…</p><p>でも、これちょっと面白いかも。文字列を文字列で分割したい場合、.NET だと <code>String.Split(string[], StringSplitOptions)</code> を使えばよいので、PowerShell だとこんな感じになるみたいです。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink>// text.Split(new string[] { <span class="synConstant">&quot; on &quot;</span> }, StringSplitOptions.None) のつもり

<span class="synIdentifier">$text</span>.Split(@(<span class="synConstant">&quot; on &quot;</span>), <span class="synConstant">'None'</span>)[-<span class="synConstant">1</span>]
</pre><p>これでいいのかイマイチよくわかっていないのですが、これで意図通りに動きました。</p>
<pre class="code" data-lang="" data-unlink>Windows 10 Version 1511 for x64-based Systems</pre><p>ちょっと気持ち悪いような、なるほど、みたいな、不思議な感じ。でも、みなさんは PowerShell なのだから PowerShell っぽく書くのがよいと思います。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink>(<span class="synIdentifier">$text</span> -<span class="synStatement">split</span> <span class="synConstant">' on '</span>)[-<span class="synConstant">1</span>]
</pre><p><code>-split</code> 演算子というのが用意されているので、これを使えばいいでしょう。なんか正規表現も使えるらしいぜ？</p><p>まだまだ PowerShell がちゃんとしゃべれなくて恥ずかしいですが、少しずつ使いこなせるようになりたいと思います。</p>
