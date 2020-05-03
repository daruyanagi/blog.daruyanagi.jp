---
date: 2013-04-18T03:13:39.0000000
draft: false
title: "WebMatrix 3: RSS フィードを出力する（解決編）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130417064526.png" alt="f:id:daruyanagi:20130417064526p:plain" title="f:id:daruyanagi:20130417064526p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2013/04/17/065153">
<p>できた！</p><p>と思ったけど、Internet Explorer ではちゃんと表示できない。なんか XML が尻切れトンボで出力されておる……</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2013/04/17/065153">WebMatrix 3: RSS &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x3092;&#x51FA;&#x529B;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>この問題を解決しておきましょう。</p>
<br />
<p>初めは、</p>

<ul>
<li>Response.Write() になにか制限（タイムアウト、バッファーサイズ）がある</li>
<li>Response.End() の使い方が間違ってる</li>
</ul><p>のかなぁ、と思って色々と調べたのだけれど、そうではなさそう。処理に時間がかかっているわけでもないし、出力されるデータのサイズもたいしたことはない。</p><p>結局、単に XmlWriter の使い方を間違っているだけだった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/xml&quot;</span>;
feed.SaveAsRss20(writer);
Response.End();
</pre><p>ではなく、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/xml&quot;</span>;

<span class="synStatement">using</span> (var writer = XmlWriter.Create(Response.Output))
{
feed.SaveAsRss20(writer);
}

Response.End();
</pre><p>と、ちゃんと XmlWriter.Dispose()（実際は、XmlWriter.Close() かな？）を呼び出しておかなくてはいけないみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130418031102.png" alt="f:id:daruyanagi:20130418031102p:plain" title="f:id:daruyanagi:20130418031102p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>無事、すべて出力されたみたい。気をつけよう……</p>
