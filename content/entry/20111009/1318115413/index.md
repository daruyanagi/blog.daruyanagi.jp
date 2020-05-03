---
date: 2011-10-09T08:10:13.0000000
draft: false
title: "WebMatrix で FizzBuzz"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://www.flickr.com/photos/mjm1977/4440551183/" title="Nomi Licking the Canon cat by MJM1977, on Flickr"><img src="http://farm5.static.flickr.com/4009/4440551183_3629c6a16e.jpg" width="500" height="375" alt="Nomi Licking the Canon cat"></a></p>

<blockquote cite="http://www.aoky.net/articles/jeff_atwood/why_cant_programmers_program.htm">
<p>それで、そういった類の開発者を見分けるための質問を作り始め、私が｢Fizz-Buzz問題｣と呼んでいる問題のクラスを考え出した。これはイギリスの学校の子供たちがよくやっている遊び(というかやらされている遊び)にちなんで名付けた。Fizz-Buzz問題の例はこんな感じだ。</p><p>1から100までの数をプリントするプログラムを書け。ただし3の倍数のときは数の代わりに｢Fizz｣と、5の倍数のときは｢Buzz｣とプリントし、3と5両方の倍数の場合には｢FizzBuzz｣とプリントすること。</p><p>ちゃんとしたプログラマであれば、これを実行するプログラムを2分とかからずに紙に書き出せるはずだ。怖い事実を聞きたい?  コンピュータサイエンス学科卒業生の過半数にはそれができないのだ。自称上級プログラマが答えを書くのに10-15分もかかっているのを見たこともある。</p>

<cite><a href="http://www.aoky.net/articles/jeff_atwood/why_cant_programmers_program.htm">&#x3069;&#x3046;&#x3057;&#x3066;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DE;&#x306B;&#x30FB;&#x30FB;&#x30FB;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30E0;&#x304C;&#x66F8;&#x3051;&#x306A;&#x3044;&#x306E;&#x304B;?</a></cite>
</blockquote>
<p>手元にWebMatrixがあったので、試しに FizzBuzz をプリントアウトするコードを書いてみた。</p>

<div class="section">
<h4>本能のおもむくままに</h4>
<pre class="code" data-unlink>    # /App_Code/FizzBuzz.cshtml

@helper Print(int count = 100)
{
foreach (var i in Enumerable.Range(1, count))
{
var s = string.Empty;

if (i % 3 == 0) { s += &#34;Fizz&#34;; }
if (i % 5 == 0) { s += &#34;Buzz&#34;; }
if (s == string.Empty) { s += i.ToString(); }

&lt;p&gt;@s&lt;/p&gt;
}
}</pre><p>何も考えずに、自分なりの素直なコード。<code>@FizzBuzz.Print()</code> で期待通りに出力される。</p>

</div>
<div class="section">
<h4>自己採点 & 反省</h4>
<p>そのあと、いろいろぐぐってみた。普通はだいたいこのように書くみたいだ。</p>
<pre class="code" data-unlink>    @helper Print2(int count = 100)
{
for (int i = 1; i &lt;= count; i++)
{
var fizz = (i % 3 == 0);
var buzz = (i % 5 == 0);

if (fizz &amp;&amp; !buzz) {
&lt;p&gt;Fizz&lt;/p&gt;
} else if (!fizz &amp;&amp; buzz) {
&lt;p&gt;Buzz&lt;/p&gt;
} else if (fizz &amp;&amp; buzz) {
&lt;p&gt;FizzBuzz&lt;/p&gt;
} else {
&lt;p&gt;@i&lt;/p&gt;
}
}
}</pre><p>1. for のほうが速い。けれど、Enumerable.Range のほうが個人的には読みやすい。</p><p>2. <code>s == string.Empty</code> に「3の倍数でも5の倍数でもない」という意味をもたせるより、ちゃんと条件分岐として記述する方がわかりやすい。速度的にもおそらく優れる。</p><p>3. どうせならLINQで書くべきだよね。</p><p>ほかにもなにかあったら教えて下さい。</p>

</div>