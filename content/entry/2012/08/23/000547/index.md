---
date: 2012-08-23T00:05:47.0000000
draft: false
title: "なぜ var d = new Dictionary&lt;string, string&gt; { { &quot;a&quot;, &quot;b&quot; }, { &quot;c&quot;, &quot;d&quot; } } と書けるのか ―― コレクション初期化子"
tags: ["C#"]
eyecatch: 
---

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/22/073342">
<p>Dictionary ってその場で初期化できるんだね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt; AllowedFileType =
<span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;()
{
{ <span class="synConstant">&quot;image/jpeg&quot;</span>, <span class="synConstant">&quot;jpg&quot;</span> },
{ <span class="synConstant">&quot;image/png&quot;</span> , <span class="synConstant">&quot;png&quot;</span> },
{ <span class="synConstant">&quot;image/gif&quot;</span> , <span class="synConstant">&quot;gif&quot;</span> },
};
</pre><p>こっちのほうがいいや。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/22/073342">&#x3053;&#x308C;&#x307E;&#x3067;&#x306E;&#x30B5;&#x30F3;&#x30D7;&#x30EB;&#x3092; NuGet &#x30D1;&#x30C3;&#x30B1;&#x30FC;&#x30B8;&#x306B;&#x3057;&#x3066;&#x307F;&#x307E;&#x3057;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>簡単に書けるのはとっても素晴らしいのだけれど、イマイチこうやって書ける理由がわからなかったので調べてみました。</p>

<div class="section">
<h3>C# 3.0 のコレクション初期化子<a href="#f-a4390923" name="fn-a4390923" title=".NET Framework 3.5">*1</a></h3>
<p>とりあえず、基本となるコレクション初期化子（配列初期化子）の復習から。</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/bb308966.aspx#topic14">
<p>List<Contact> は、次のように作成して初期化することができます。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var contacts = <span class="synStatement">new</span> List&lt;Contact&gt; {
<span class="synStatement">new</span> Contact {
Name = <span class="synConstant">&quot;Chris Smith&quot;</span>,
PhoneNumbers = { <span class="synConstant">&quot;206-555-0101&quot;</span>, <span class="synConstant">&quot;425-882-8080&quot;</span> }
},
<span class="synStatement">new</span> Contact {
Name = <span class="synConstant">&quot;Bob Harris&quot;</span>,
PhoneNumbers = { <span class="synConstant">&quot;650-555-0199&quot;</span> }
}
};
</pre><p>これは、以下と同じ効果を持ちます。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var contacts = <span class="synStatement">new</span> List&lt;Contact&gt;();
var __c1 = <span class="synStatement">new</span> Contact();
__c1.Name = <span class="synConstant">&quot;Chris Smith&quot;</span>;
__c1.PhoneNumbers.Add(<span class="synConstant">&quot;206-555-0101&quot;</span>);
__c1.PhoneNumbers.Add(<span class="synConstant">&quot;425-882-8080&quot;</span>);
contacts.Add(__c1);
var __c2 = <span class="synStatement">new</span> Contact();
__c2.Name = <span class="synConstant">&quot;Bob Harris&quot;</span>;
__c2.PhoneNumbers.Add(<span class="synConstant">&quot;650-555-0199&quot;</span>);
contacts.Add(__c2);
</pre><p>__c1 と __c2 は、このような方法を使用しなければ隠蔽されアクセスできないテンポラリ変数です。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/bb308966.aspx#topic14">Overview of C# 3.0 | Microsoft Docs</a></cite>
</blockquote>
<p>つまり、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var x = List&lt;<span class="synType">string</span>&gt;() { <span class="synConstant">&quot;a&quot;</span>, <span class="synConstant">&quot;b&quot;</span> };
</pre><p>は、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var x = List&lt;<span class="synType">string</span>&gt;();
x.Add(<span class="synConstant">&quot;a&quot;</span>);
x.Add(<span class="synConstant">&quot;b&quot;</span>);
</pre><p>とほぼ同じ。ただし、配列初期化子を利用して初期化できるクラスは、 <b>IEnumerable が実装されている</b>こと、メンバーとして <b>Add() が実装されていること</b>の二つが条件となります。逆に言えば、それさえ満たしていれば内容は問われません（後述）。</p>

</div>
<div class="section">
<h3>足りない条件</h3>
<p>さて、 List の場合はだいたいわかりました。けれど、 Dictionary の場合はそれではまだ説明が足りないと思います。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/aetos382?ref_src=twsrc%5Etfw">@aetos382</a> <a href="https://twitter.com/Grabacr07?ref_src=twsrc%5Etfw">@Grabacr07</a> そうなんですよね。たとえば IEnumerable 実装してて、Add(arg1, arg2) ってシグネチャがあってればOK  とか、そういうルールあるのかなって</p>&mdash; だるやなぎ に天使が舞い降りた！ (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/238089590404153344?ref_src=twsrc%5Etfw">2012年8月22日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>以下のコードで言えば、なぜ { "a", "b" } なんて書けるのか、ちょっとわかりません。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var d = <span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;
{
{ <span class="synConstant">&quot;a&quot;</span>, <span class="synConstant">&quot;b&quot;</span> }, <span class="synComment">// &lt;-- この {} って何さ！</span>
{ <span class="synConstant">&quot;c&quot;</span>, <span class="synConstant">&quot;d&quot;</span> }
}
</pre><p>すると、こんな助言をいただくなど。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/okazuki?ref_src=twsrc%5Etfw">@okazuki</a> なるほどー パラメーターはいくつでもいいのか</p>&mdash; だるやなぎ に天使が舞い降りた！ (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/238098962467393536?ref_src=twsrc%5Etfw">2012年8月22日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>そういうわけで少し試してみました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822235621.png" alt="f:id:daruyanagi:20120822235621p:plain" title="f:id:daruyanagi:20120822235621p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Text;
<span class="synStatement">using</span> System.Threading.Tasks;

<span class="synType">namespace</span> ConsoleApplication1
{
<span class="synStatement">using</span> System.Collections;
<span class="synStatement">using</span> System.Diagnostics;

<span class="synType">class</span> SampleClass : IEnumerable&lt;<span class="synType">string</span>&gt;
{
<span class="synType">public</span> IEnumerator&lt;<span class="synType">string</span>&gt; GetEnumerator()
{ <span class="synStatement">throw</span> <span class="synStatement">new</span> NotImplementedException(); }

IEnumerator GetEnumerator()
{ <span class="synStatement">throw</span> <span class="synStatement">new</span> NotImplementedException(); }

<span class="synType">public</span> <span class="synType">void</span> Add(<span class="synType">string</span> arg1, <span class="synType">string</span> arg2)
{ Debug.WriteLine(<span class="synConstant">&quot;{0}, {1}&quot;</span>, arg1, arg2); }
}

<span class="synType">class</span> Program
{
<span class="synType">static</span> <span class="synType">void</span> Main(<span class="synType">string</span>[] args)
{
var a = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;() { <span class="synConstant">&quot;a&quot;</span>, <span class="synConstant">&quot;b&quot;</span> };
a.ForEach((_) =&gt; Debug.WriteLine(_));

var b = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;() { { <span class="synConstant">&quot;c&quot;</span> }, { <span class="synConstant">&quot;d&quot;</span> } };
b.ForEach((_) =&gt; Debug.WriteLine(_));

<span class="synComment">// var c = { 1 };</span>

var d = <span class="synStatement">new</span> SampleClass() {
{ <span class="synConstant">&quot;o&quot;</span>, <span class="synConstant">&quot;p&quot;</span> }, { <span class="synConstant">&quot;q&quot;</span>, <span class="synConstant">&quot;r&quot;</span> }
};

Console.WriteLine(<span class="synConstant">&quot;何かキーを押してください。&quot;</span>);
Console.ReadLine();
}
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822235856.png" alt="f:id:daruyanagi:20120822235856p:plain" title="f:id:daruyanagi:20120822235856p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>少しずつカラクリが見えてきました。</p>

<div class="section">
<h4>{ x } で Add(x) が呼ばれる</h4>
<pre class="code lang-cs" data-lang="cs" data-unlink>var b = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;() { { <span class="synConstant">&quot;c&quot;</span> }, { <span class="synConstant">&quot;d&quot;</span> } };
</pre><p>全然知らなかったのだけれど、こんな書き方もいけるのですね。つまり、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var a = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;() { <span class="synConstant">&quot;a&quot;</span>, <span class="synConstant">&quot;b&quot;</span> };
</pre><p>において、 "a" は { "a" } の省略記法と見なせそう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var c = { <span class="synConstant">1</span> };
</pre><p>さすがにこれはダメですね。 { } ではなく ( ) ならばそのままコンパイルできるのですが。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822235244.png" alt="f:id:daruyanagi:20120822235244p:plain" title="f:id:daruyanagi:20120822235244p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ゴメンナサイ。</p>

</div>
<div class="section">
<h4>中身はどうでもいい。とりあえず IEnumerable を実装して Add() 書いとけ</h4>
<p>SampleClass は IEnumerable<string> の出来損ないです。しかも、要素に一つの値しか取れないくせに Add() の引数は二つもある！</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">class</span> SampleClass : IEnumerable&lt;<span class="synType">string</span>&gt;
{
<span class="synType">public</span> IEnumerator&lt;<span class="synType">string</span>&gt; GetEnumerator()
{ <span class="synStatement">throw</span> <span class="synStatement">new</span> NotImplementedException(); }

IEnumerator GetEnumerator()
{ <span class="synStatement">throw</span> <span class="synStatement">new</span> NotImplementedException(); }

<span class="synType">public</span> <span class="synType">void</span> Add(<span class="synType">string</span> arg1, <span class="synType">string</span> arg2)
{ Debug.WriteLine(<span class="synConstant">&quot;{0}, {1}&quot;</span>, arg1, arg2); }
}
</pre><p>それでも、これが動くんですね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var d = <span class="synStatement">new</span> SampleClass() {
{ <span class="synConstant">&quot;o&quot;</span>, <span class="synConstant">&quot;p&quot;</span> }, { <span class="synConstant">&quot;q&quot;</span>, <span class="synConstant">&quot;r&quot;</span> }
};
</pre><p>ただ単に Add() してるのを簡易記法で隠蔽しているだけだとわかれば、何も難しくありません。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var d = <span class="synStatement">new</span> SampleClass();
d.Add(<span class="synConstant">&quot;o&quot;</span>, <span class="synConstant">&quot;p&quot;</span>); <span class="synComment">// &lt;-- 実際にはコレクションに値を追加していない！</span>
d.Add(<span class="synConstant">&quot;q&quot;</span>, <span class="synConstant">&quot;r&quot;</span>);
</pre><p>こういうのを糖衣構文（シンタックスシュガー）というのですね。ちなみに、引数の数を間違えると静的にチェックされ、さすがにコンパイルエラーになります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822235203.png" alt="f:id:daruyanagi:20120822235203p:plain" title="f:id:daruyanagi:20120822235203p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var d = <span class="synStatement">new</span> SampleClass() {
{ <span class="synConstant">&quot;o&quot;</span>, <span class="synConstant">&quot;p&quot;</span> }, { <span class="synConstant">&quot;q&quot;</span>, <span class="synConstant">&quot;r&quot;</span>, <span class="synConstant">&quot;s&quot;</span> } <span class="synComment">// &lt;-- アウチ！</span>
};
</pre><p>ちょっと興味深かったのでまとめてみました。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn-a4390923" name="f-a4390923" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">.NET Framework 3.5</span></p>
</div>