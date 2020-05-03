---
date: 2012-08-28T08:12:28.0000000
draft: false
title: "寄り道: string クラスの拡張"
tags: ["C#"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2012/08/25/003421">WebMatrix &#x3067;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x8A8D;&#x8A3C;&#x6A5F;&#x80FD;&#xFF08;3&#xFF09; &#x2015;&#x2015; &#x306A;&#x306B;&#x306F;&#x3068;&#x3082;&#x3042;&#x308C;&#x30E6;&#x30FC;&#x30B6;&#x30FC;&#x767B;&#x9332;&#x3057;&#x306A;&#x3044;&#x3068;&#x59CB;&#x307E;&#x3089;&#x3093; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の脱線。</p><p>個人的には</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">fieldset</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">legend</span><span class="synIdentifier">&gt;</span>Register Your Account<span class="synIdentifier">&lt;/</span><span class="synStatement">legend</span><span class="synIdentifier">&gt;</span>
@this.RenderTextWithValidation(
&quot;name&quot;, &quot;Name&quot;, new { Value = name} )
@this.RenderPasswordWithValidation(
&quot;password&quot;, &quot;Password&quot;)
@this.RenderPasswordWithValidation(
&quot;confirmPassword&quot;, &quot;Confirm Password&quot;)
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;submit&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Register&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">fieldset</span><span class="synIdentifier">&gt;</span>
</pre><p>って書くのがイケてない。「"password", "Password"」だの、「"confirmPassword", "Confirm Password"」だの、おんなじこと二回も書きたくないじゃん。あと、 HTML 要素の class や id は勝手にハイフン区切りにしてほしい。 Ruby on Rails にはソレ系のユーティリティが用意されているので楽なんだけどな（ActiveSupport）。</p><p>まぁ、なければ作れって話だ。</p><p>まず、あると便利な拡張メソッドを作っていく。先頭を大文字、後を小文字にする Capitalize() は欲しいよね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Capitalize(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target.Length &gt; <span class="synConstant">1</span>
? <span class="synType">char</span>.ToUpper(target[<span class="synConstant">0</span>]) +
target.Substring(<span class="synConstant">1</span>, target.Length - <span class="synConstant">1</span>).ToLower()
: target.ToUpper();
}
</pre><p>char.ToUpper() を 'a'.ToUpper() にしたいが今日のところは面倒なので許してやろう。</p><p>さぁ、どんどん作っていくよ！　つぎは痴漢系、もとい置換系だな。 C# （.NET Framework）ってちょっと文字列操作系のメソッドが充実してもいいと思う。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Gsub(
<span class="synStatement">this</span> <span class="synType">string</span> target, Regex r, <span class="synType">string</span> replacement)
{
<span class="synStatement">return</span> r.Replace(target, replacement);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Gsub(
<span class="synStatement">this</span> <span class="synType">string</span> target, Regex r, MatchEvaluator m)
{
<span class="synStatement">return</span> r.Replace(target, m);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Gsub(
<span class="synStatement">this</span> <span class="synType">string</span> target, <span class="synType">string</span> pattern, <span class="synType">string</span> replacement)
{
<span class="synStatement">return</span> target.Gsub(<span class="synStatement">new</span> Regex(pattern), replacement);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Gsub(
<span class="synStatement">this</span> <span class="synType">string</span> target, <span class="synType">string</span> pattern, MatchEvaluator m)
{
<span class="synStatement">return</span> target.Gsub(<span class="synStatement">new</span> Regex(pattern), m);
}
</pre><p>これの何が便利かというと、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Underscore(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synComment">// 空白やハイフンをアンダースコアに置き換える</span>
<span class="synStatement">return</span> target.Gsub(<span class="synSpecial">@</span><span class="synConstant">&quot;[ 　-]&quot;</span>, <span class="synConstant">&quot;_&quot;</span>);
}
</pre><p>みたいに使える。 string.Replace() みたいに手軽で、それでいて強力！　場合によっては、第一引数に正規表現を渡してもいいし、第二引数で Match を引数にとったラムダを使ってもいい。ホントのことを言えば C# にも正規表現リテラルがあると嬉しいのだけれどね……</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">static</span> <span class="synType">string</span> DivideIntoWords(
<span class="synStatement">this</span> <span class="synType">string</span> target, <span class="synType">string</span> separator = <span class="synConstant">&quot; &quot;</span>)
{
<span class="synStatement">return</span> target.Gsub(
<span class="synSpecial">@</span><span class="synConstant">&quot;([\w-[A-Z]])([A-Z])&quot;</span>,
<span class="synType">string</span>.Format(<span class="synConstant">&quot;$1{0}$2&quot;</span>, separator)
);
}
</pre><p>あと、こんなのも作ってみた。これは「HelloWorld」を「Hello World」に分割する。第二引数を渡せば、「Hello_World」や「Hello-World」も作れる。こいつらを使って、 PascalCase （UpperCamelCase）に変換する拡張メソッドを作ってみよう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">static</span> <span class="synType">readonly</span> <span class="synType">char</span>[] SPACE_AND_DELIMITTER = <span class="synConstant">&quot; 　-_&quot;</span>.ToArray();

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> ToPascalCase(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target                    <span class="synComment">// sampleText_is-Cool</span>
.DivideIntoWords()           <span class="synComment">// sample Text_is-Cool</span>
.Split(SPACE_AND_DELIMITTER) <span class="synComment">// { sample, Text, is, Cool }</span>
.Select(_ =&gt; _.Capitalize()) <span class="synComment">// { Sample, Text, Is, Cool }</span>
.Combine();                  <span class="synComment">// SampleTextIsCool</span>
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> ToUpperCamelCase(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target.ToPascalCase();
}

<span class="synType">private</span> <span class="synType">static</span> <span class="synType">string</span> Combine(
<span class="synStatement">this</span> IEnumerable&lt;<span class="synType">string</span>&gt; target, <span class="synType">string</span> separator = <span class="synConstant">&quot;&quot;</span>)
{
<span class="synStatement">return</span> <span class="synType">string</span>.Join(separator, target.ToArray());
}
</pre><p>Combine() はメソッドチェーンを切らずに string.Join() したいので作った IEnumerable&lt;string&gt; の拡張メソッドで、@xin9le さんが命名してくれた。</p><p>同様にして CamelCase（LowerCamelCase）も作れる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Camelize(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target
.DivideIntoWords()
.Split(SPACE_AND_DELIMITTER_CHARS)
.Select((_, i) =&gt; (i == <span class="synConstant">0</span>) <span class="synComment">// &lt;-- カウンターを使う</span>
? _.ToLower()
: _.Capitalize())
.Combine();
}
</pre><p>1回目（i == 0）のときだけ ToLower()、あとはさっき作った Capitalize() すればいいね。</p><p>今まで知らなかったのだけれど、 Enumerable.Select(Func&lt;TSource, Int32, TResult&gt;) （<a href="http://msdn.microsoft.com/ja-jp/library/bb534869">http://msdn.microsoft.com/ja-jp/library/bb534869</a>）を使うと「今何回目の処理をしているか（インデックス）」が取得できるのね。 Ruby の map {|i| ... } みたいなものかな。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Titlize(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target
.Gsub(<span class="synSpecial">@</span><span class="synConstant">&quot;[_-]&quot;</span>, <span class="synConstant">&quot; &quot;</span>)
.DivideIntoWords()
.Split(SPACE_AND_DELIMITTER)
.Select(_ =&gt; _.Capitalize())
.Combine(<span class="synConstant">&quot; &quot;</span>);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Humanize(<span class="synStatement">this</span> <span class="synType">string</span> target)
{
<span class="synStatement">return</span> target
.Gsub(<span class="synSpecial">@</span><span class="synConstant">&quot;[_-]&quot;</span>, <span class="synConstant">&quot; &quot;</span>)
.DivideIntoWords()
.Split(SPACE_AND_DELIMITTER)
.Select((_, i) =&gt; (i == <span class="synConstant">0</span>) ? _.Capitalize() : _.ToLower())
.Combine(<span class="synConstant">&quot; &quot;</span>);
}
</pre><p>あとは僕の望みの、Titlize() や Humanize() も作ってみた。メソッド名は ActiveSupport から拝借。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120828080159.png" alt="f:id:daruyanagi:20120828080159p:plain" title="f:id:daruyanagi:20120828080159p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code" data-lang="" data-unlink>&#34;man from the boondocks&#34;.Titlize()   # =&gt; &#34;Man From The Boondocks&#34;
&#34;man from the boondocks&#34;.Humanize()  # =&gt; &#34;Man from the boondocks&#34;

&#34;x-men: the last stand&#34;.Titlize()    # =&gt; &#34;X Men: The Last Stand&#34;
&#34;x-men: the last stand&#34;.Humanize()   # =&gt; &#34;X men: the last stand&#34;

&#34;TheManWithoutAPast&#34;.Titlize()       # =&gt; &#34;The Man Without A Past&#34;
&#34;TheManWithoutAPast&#34;.Humanize()      # =&gt; &#34;The man without a past&#34;

&#34;raiders_of_the_lost_ark&#34;.Titlize()  # =&gt; &#34;Raiders Of The Lost Ark&#34;
&#34;raiders_of_the_lost_ark&#34;.Humanize() # =&gt; &#34;Raiders of the lost ark&#34;</pre><p>CSS text-transform の capitalize に相当する処理が Capitalize() ではなく Titlize() なのが罠といえば罠。</p>
