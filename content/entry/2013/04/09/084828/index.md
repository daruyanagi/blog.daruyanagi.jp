---
date: 2013-04-09T08:48:28.0000000
draft: false
title: "ライプニッツの法則（Leibniz&#39; law）"
tags: ["数学", "論理学", "哲学"]
eyecatch: http://ecx.images-amazon.com/images/I/31BtwP5Vx3L.jpg
---

<blockquote cite="http://ja.wikipedia.org/wiki/%E5%90%8C%E4%B8%80%E6%80%A7">
<p>ライプニッツは、識別できない2つの個体はないとする<b>不可識別者同一の原理</b>を立てた。この原理は、Xのもつ全ての性質をYがもち同時にYがもつ全ての性質をXがもつとき、X=Yが成り立つことを示すものと解されている。</p>

<cite><a href="http://ja.wikipedia.org/wiki/%E5%90%8C%E4%B8%80%E6%80%A7">&#x540C;&#x4E00;&#x6027; - Wikipedia</a></cite>
</blockquote>
<p>ライプニッツによれば、「同一であること」は「区別できないこと」と同値であるらしい。</p>

<blockquote>
<p>自然においては、二つの存在がたがいにまったく同一で、そこに内的規定に基づく違いが発見できないなどということはなく、それゆえ、たがいに識別できない二つのものは、実は、同一の１つののものである。</p>

</blockquote>

<blockquote>
<p>真理を損失することなしに、一方が他方に代入できるものは、互いに同じである。</p>

</blockquote>

<ol>
<li>もし X と Y が同一なら、X がもつ属性と Y がもつ属性はすべてまったく同じである。</li>
<li>もし X がもつ属性と Y がもつ属性がすべてまったく同じなら、X と Y は同一である。</li>
<li>もし X がもつ属性と Y がもつ属性になんらかの違いがあれば、X と Y は同一ではない。</li>
</ol><p>同一性は最大限の類似性であり、最大限の類似性は同一性。ここでいう「同一性」は程度の問題ではなく、真か偽かの問題だ。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4062585200/bestylesnet-22/"><img src="http://ecx.images-amazon.com/images/I/31BtwP5Vx3L._SL160_.jpg" class="hatena-asin-detail-image" alt="分析哲学入門 (講談社選書メチエ)" title="分析哲学入門 (講談社選書メチエ)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4062585200/bestylesnet-22/">分析哲学入門 (講談社選書メチエ)</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> 八木沢敬</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> 講談社</li><li><span class="hatena-asin-detail-label">発売日:</span> 2011/11/11</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）</li><li><span class="hatena-asin-detail-label">購入</span>: 11人 <span class="hatena-asin-detail-label">クリック</span>: 129回</li><li><a href="http://d.hatena.ne.jp/asin/4062585200/bestylesnet-22" target="_blank">この商品を含むブログ (21件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>
<br />
<p>以下は全然関係ない話だけれど、たとえば以下のクラスがあるとする。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">class</span> Daruyanagi
{
<span class="synType">string</span> FirstName { get; set; }
<span class="synType">string</span> LastName { get; set; }
<span class="synType">string</span> FullName { <span class="synStatement">get</span> { <span class="synStatement">return</span> FirstName + LastName; } }
DateTime BirthDay { get; }

<span class="synType">public</span> Daruyanagi(<span class="synType">string</span> first_name, <span class="synType">string</span> last_name)
{
FirstName = first_name;
LastName = last_name;
BirthDay = DateTime.Now;
}
}
</pre><p>で、二つの Daruyanagi を生成する。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var A = <span class="synStatement">new</span> Daruyanagi();
var B = <span class="synStatement">new</span> Daruyanagi();
</pre><p>このとき、A と B は同一か。</p><p>ライプニッツ的には A ≠ B だろう。なぜなら、BirthDay が何ミリ秒か違うであろうから。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> Equals(<span class="synStatement">this</span> Daruyanagi src, Daruyanagi dst)
{
<span class="synStatement">return</span> (src.FirstName == dst.FirstName)
&amp;&amp; (src.LastName  == dst.LastName)
&amp;&amp; (src.BirthDay  == dst.BirthDay);
}

A.Equals(B); <span class="synComment">// =&gt; false</span>
</pre><p>けれど、A がもつプロパティと B がもつプロパティがまったく同じであることから、「両方とも同じ（Daruyanagi だ）」ということもできる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">typeof</span>(A) == <span class="synStatement">typeof</span>(B)
</pre><p>厳密に言えば、双方の“同一”とはまったく異なるレベルなのだけれど、日常会話ではあんまり区別されていない。後者の方は“（Daruyanagi という点で）共通している”と呼ぶべきなのかもね。</p><p>あと、仮に</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">class</span> Daruyanagi
{
DateTime BirthDay { get; set } <span class="synComment">// 書き込み可能</span>
}
</pre><p>とすれば、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>B.BirthDay = A.BirthDay;
</pre><p>することで、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>A.Equals(B); <span class="synComment">// =&gt; true</span>
</pre><p>になるのだけど、これはライプニッツ的に言えば“同一”ということになる。ただし、メモリ空間上には二つあるわけで、これは少し不思議な気がする。</p><p>まぁ、メモリ空間におけるアドレスを取得する組み込み関数 addressof() を定義して、Equals() に組み込めば、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> Equals(<span class="synStatement">this</span> Daruyanagi src, Daruyanagi dst)
{
<span class="synStatement">return</span> (src.FirstName  == dst.FirstName)
&amp;&amp; (src.LastName   == dst.LastName)
&amp;&amp; (src.BirthDay   == dst.BirthDay)
&amp;&amp; (addressof(src) == addressof(dst));
}

A.Equals(B); <span class="synComment">// =&gt; false</span>
</pre><p>となるけれど。その場合は、アドレスを属性として考えているということだと思う。そこでふと疑問に思った。このような同一性の定義を受け入れるとして――</p><p>果たして、モノの属性は有限に列挙可能なのだろうか。また、確定しているのだろうか。あーでも、ライプニッツ的には</p>

<blockquote>
<p>与えられた議論の言葉内で互いに区別できない対象は、その議論について同じものとみなされるべきである</p>

</blockquote>
<p>で解決なのか。</p>
