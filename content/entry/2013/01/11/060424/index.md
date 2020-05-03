---
date: 2013-01-11T06:04:24.0000000
draft: false
title: "WebMatrix 2：RESTful？な Web アプリケーション （3）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/01/11/041856">WebMatrix 2&#xFF1A;RESTful&#xFF1F;&#x306A; Web &#x30A2;&#x30D7;&#x30EA;&#x30B1;&#x30FC;&#x30B7;&#x30E7;&#x30F3; &#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。日中戦争、ベトナム戦争並みに泥沼化してきたけど、突き進んでいこう！</p>

<div class="section">
<h3>PUT/DELETE メソッドを扱えるようにする</h3>
<p>とりあえず、前回の宿題をさっさと終わらせる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Layout = <span class="synConstant">&quot;_SiteLayout.cshtml&quot;</span>;

<span class="synComment">// POST で PUT/DELETE を代用</span>
<span class="synType">string</span> method = Request.HttpMethod.ToUpper();
<span class="synStatement">if</span> (IsPost &amp;&amp; Request[<span class="synConstant">&quot;_method&quot;</span>] != <span class="synConstant">null</span>)
{
method = Request[<span class="synConstant">&quot;_method&quot;</span>].ToUpper();
}
}
</pre><p>こんなのでいいのかな。あとはこれを switch すればよさそうだけど……</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">switch</span> (method)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;GET&quot;</span>:
<span class="synComment">// いろいろ</span>
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;POST&quot;</span>:
<span class="synComment">// さまざま</span>
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;PUT&quot;</span>:
<span class="synComment">// ほげほげ</span>
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;DELETE&quot;</span>:
<span class="synComment">// ふがふが</span>
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
<span class="synStatement">throw</span> <span class="synStatement">new</span> Exception(<span class="synConstant">&quot;なにいってんだおまえ&quot;</span>);
}
</pre><p>――ダサいな！</p><p>たまたま今日、北陸の女神様のブログ（<a href="http://d.hatena.ne.jp/miso_soup3/20130110/1357822008">ASP.NET WEB API &#x30EB;&#x30FC;&#x30C6;&#x30A3;&#x30F3;&#x30B0;&#x306B;&#x3064;&#x3044;&#x3066;&#x3044;&#x308D;&#x3044;&#x308D; - miso_soup3 Blog</a>）を読んでいたのだけど、ASP.NET Web API みたいに</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// GET ~/api/values/</span>
<span class="synType">public</span> <span class="synType">void</span> Get() { }

<span class="synComment">// GET ~/api/values/:id</span>
<span class="synType">public</span> <span class="synType">void</span> Get(<span class="synType">int</span> id) { }

<span class="synComment">// POST ~/api/values/</span>
<span class="synType">public</span> <span class="synType">void</span> Post() { }

<span class="synComment">// PUT ~/api/values/</span>
<span class="synType">public</span> <span class="synType">void</span> Put() { }
</pre><p>こういうのを勝手にバインディング（っていうのかな？）して呼び出してくれたら、カッコいいのかもしれない。</p>

</div>
<div class="section">
<h3>メソッドのバインディング</h3>
<p>というわけで、こういうのを考えてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Reflection

@{
Layout = <span class="synConstant">&quot;_SiteLayout.cshtml&quot;</span>;

<span class="synComment">// POST で PUT/DELETE を代用</span>
<span class="synType">string</span> method = Request.HttpMethod.ToUpper();
<span class="synStatement">if</span> (IsPost &amp;&amp; Request[<span class="synConstant">&quot;_method&quot;</span>] != <span class="synConstant">null</span>)
{
method = Request[<span class="synConstant">&quot;_method&quot;</span>].ToUpper();
}

Type type = <span class="synStatement">this</span>.GetType();
MethodInfo method_info = type.GetMethod(
method,
UrlData.Select(_ =&gt; _.GetType()).ToArray()
);

<span class="synComment">// みつからなかったら method_info == null っぽい</span>

&lt;p&gt;@method_info&lt;/p&gt;
}
</pre><p>んでんで、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@functions
{
<span class="synType">public</span> HelperResult GET()
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(_ =&gt; _.WriteLine(<span class="synConstant">&quot;GET()&quot;</span>));
}

<span class="synType">public</span> HelperResult GET(<span class="synType">int</span> id)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(_ =&gt; _.WriteLine(<span class="synConstant">&quot;Get(int id)&quot;</span>));
}

<span class="synType">public</span> HelperResult GET(<span class="synType">string</span> title)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(_ =&gt; _.WriteLine(<span class="synConstant">&quot;Get(string title)&quot;</span>));
}

<span class="synType">public</span> HelperResult GET(<span class="synType">string</span> s1, <span class="synType">string</span> s2)
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(_ =&gt; _.WriteLine(<span class="synConstant">&quot;Get(string s1, s2)&quot;</span>));
}

<span class="synType">public</span> HelperResult POST()
{
<span class="synStatement">return</span> <span class="synStatement">new</span> HelperResult(_ =&gt; _.WriteLine(<span class="synConstant">&quot;POST()&quot;</span>));
}
}
</pre><p>こうやって適当に引数の異なるメソッドを用意しておく。</p>

<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130111054006.png" alt="f:id:daruyanagi:20130111054006p:plain" title="f:id:daruyanagi:20130111054006p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130111054007.png" alt="f:id:daruyanagi:20130111054007p:plain" title="f:id:daruyanagi:20130111054007p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんかいい感じだ。出力を</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;p&gt;@method_info.Invoke(<span class="synStatement">this</span>, UrlData.Select(_ =&gt; _ <span class="synStatement">as</span> <span class="synType">object</span>).ToArray())&lt;/p&gt;
</pre><p>に変えてみてもうまくいった（なんか不細工だなーもっといい書き方ある気がする）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130111055006.png" alt="f:id:daruyanagi:20130111055006p:plain" title="f:id:daruyanagi:20130111055006p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>POST も投げてみたけどイケてるみたい（わかりにくくてごめん、まだあんまり使い方がよくわかっていない！）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130111060244.png" alt="f:id:daruyanagi:20130111060244p:plain" title="f:id:daruyanagi:20130111060244p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは、MethodInfo を取得するとき、単に UrlData の type[] を問い合わせるのではなくて</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>MethodInfo method_info = type.GetMethod(
method,
UrlData.Select(_ =&gt; _.なるべくintに変換する().GetType()).ToArray()
);
</pre><p>みたいなにすれば、GET(int id) でも呼べるはずだよね！　……今日はもう疲れたからやらないけど。ASP.NET MVC/Web API はこういうのをもっとエレガントにやっているんだろうなって思うと、だいぶ尊敬しちゃう。</p>

</div>
</div>