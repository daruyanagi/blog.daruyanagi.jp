---
date: 2014-11-03T18:41:49.0000000
draft: false
title: "引数で匿名型を受け取る"
tags: ["C#"]
eyecatch: 
---
<p>string クラスのためにこんな拡張機能があれば便利かなぁ、と思った。指定した要素タグでソーステキストを括って、HTML タグを出力できる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Wrap(<span class="synStatement">this</span> <span class="synType">string</span> source, <span class="synType">string</span> element)
{
<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;{1}&gt;{0}&lt;/{1}&gt;&quot;</span>, source, element);
}
</pre><p>たとえば、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synConstant">&quot;これを強調してぇ&quot;</span>.Wrap(<span class="synConstant">&quot;strong&quot;</span>)
</pre><p>で</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">strong</span><span class="synIdentifier">&gt;</span>これを強調してぇ<span class="synIdentifier">&lt;/</span><span class="synStatement">strong</span><span class="synIdentifier">&gt;</span>
</pre><p>が得られる。でも、どうせなら class 属性なんかも指定したくなるよね、と思う。たとえばこんな感じかな。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> IsNullOrEmpty(<span class="synStatement">this</span> <span class="synType">string</span> source)
{
<span class="synStatement">return</span> <span class="synType">string</span>.IsNullOrEmpty(source);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Wrap(
<span class="synStatement">this</span> <span class="synType">string</span> source, <span class="synType">string</span> element, <span class="synType">string</span> @<span class="synType">class</span> = <span class="synConstant">null</span>)
{
<span class="synStatement">return</span> @<span class="synType">class</span>.IsNullOrEmpty()
? <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;{1}&gt;{0}&lt;/{1}&gt;&quot;</span>, source, element)
: <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;{1} class=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{2}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;{0}&lt;/{1}&gt;&quot;</span>, source, element, @<span class="synType">class</span>);
}
</pre><p>こうすると、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synConstant">&quot;これを強調してぇ&quot;</span>.Wrap(<span class="synConstant">&quot;span&quot;</span>, <span class="synConstant">&quot;label label-warning&quot;</span>)
</pre><p>で</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">span</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;label label-warning&quot;</span><span class="synIdentifier">&gt;</span>これを強調してぇ<span class="synIdentifier">&lt;/</span><span class="synStatement">span</span><span class="synIdentifier">&gt;</span>
</pre><p>が得られると思う。ここまでするのならば、ほかの属性なんかも指定できるようになった方が便利なはずだ。第二引数（拡張メソッドの第三引数）を匿名型にして、いろいろ受け付けられるようにしてみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Join(<span class="synStatement">this</span> IEnumerable&lt;<span class="synType">string</span>&gt; source, <span class="synType">string</span> delimitter)
{
<span class="synStatement">return</span> <span class="synType">string</span>.Join(delimitter, source);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> Wrap(
<span class="synStatement">this</span> <span class="synType">string</span> source, <span class="synType">string</span> element, <span class="synType">object</span> attributes)
{
var text = attributes.GetType().GetProperties().Select(_ =&gt;
{
var name = _.Name;
var <span class="synStatement">value</span> = _.GetValue(attributes, <span class="synConstant">null</span>).ToString();

<span class="synStatement">if</span> (<span class="synStatement">value</span>.IsNullOrEmpty())
<span class="synStatement">return</span> <span class="synType">string</span>.Empty;
<span class="synStatement">else</span>
<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span>, name, <span class="synStatement">value</span>);
})
.Where(_ =&gt; !_.IsNullOrEmpty())
.Join(<span class="synConstant">&quot; &quot;</span>);

<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;&lt;{1} {2}&gt;{0}&lt;/{1}&gt;&quot;</span>, source, element, text);
}
</pre><p>（Select() のなかで continue 使えたら Where() 要らないのになぁ）</p><p>こんな感じで使える。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// a タグで囲う</span>
title.Wrap(<span class="synConstant">&quot;a&quot;</span>, <span class="synStatement">new</span> { href = source, title = title, });
</pre><p>GetType() した後どうすればいいんだ、と思って、MSDN を彷徨ってしまった。</p>
