---
date: 2013-02-26T20:52:08.0000000
draft: false
title: "意図が明確なコード"
tags: ["C#"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/02/24/154553">WebMatrix 2: Markdown &#x3092;&#x6C4E;&#x7528;&#x7684;&#x306B;&#x62E1;&#x5F35;&#x3059;&#x308B;&#x4ED5;&#x7D44;&#x307F;&#x3092;&#x8003;&#x3048;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でこんなコードを書いた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 型名-型ディクショナリから、メソッド</span>
<span class="synComment">// (Type: p[0]).GetHtml(p[1], p[2]...) </span>
<span class="synComment">// をもつ HtmlHelper を探す</span>
var result = helper_table.FirstOrDefault(name =&gt;
{
<span class="synStatement">if</span> (type_table.TryGetValue(name, <span class="synStatement">out</span> helper))
{
args = p.Skip(<span class="synConstant">1</span>).ToArray();
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}
<span class="synStatement">return</span> method != <span class="synConstant">null</span>;
});

<span class="synComment">// 見つからなかった場合は、既定の型・メソッドを利用する</span>
<span class="synStatement">if</span> (<span class="synType">string</span>.IsNullOrEmpty(result))
{
helper = <span class="synStatement">typeof</span>(LinkHelper);
args = p;
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}
</pre><p>お詫びして訂正いたします。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 型名-型ディクショナリから、メソッド</span>
<span class="synComment">// (Type: p[0]).GetHtml(p[1], p[2]...) </span>
<span class="synComment">// をもつ HtmlHelper を探す</span>
var helper_exists = helper_table.Any(name =&gt;
{
<span class="synStatement">if</span> (type_table.TryGetValue(name, <span class="synStatement">out</span> helper))
{
args = p.Skip(<span class="synConstant">1</span>).ToArray();
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}
<span class="synStatement">return</span> method != <span class="synConstant">null</span>;
});

<span class="synComment">// 見つからなかった場合は、既定の型・メソッドを利用する</span>
<span class="synStatement">if</span> (!helper_exists)
{
helper = <span class="synStatement">typeof</span>(LinkHelper);
args = p;
method = helper.GetMethod(
<span class="synConstant">&quot;GetHtml&quot;</span>,
args.Select(_ =&gt; _.GetType()).ToArray()
);
}
</pre><p>ほかにもあると思うけど、知らん！</p>
