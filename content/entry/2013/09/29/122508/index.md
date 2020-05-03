---
date: 2013-09-29T12:25:08.0000000
draft: false
title: "WebMatrix 3: @ でハマる"
tags: ["WebMatrix", "ASP.net Web Pages", "ASP.net"]
eyecatch: 20130929121802.png
---
<p>ちょいとログを外部ファイルに吐きたくなって、テキトーにこんなコードを書いてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130929121802.png" alt="f:id:daruyanagi:20130929121802p:plain" title="f:id:daruyanagi:20130929121802p:plain" class="hatena-fotolife" itemprop="image"></span></p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#App_Code/Logger.cshtml

@helper Write(<span class="synType">string</span> message)
{
System.IO.File.AppendAllText(
Server.MapPath(<span class="synConstant">&quot;~/log.txt&quot;</span>),
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}:</span><span class="synSpecial">\t</span><span class="synConstant">{1}</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, DateTime.Now, message)
);
}
</pre><p>これを Default.cshtml でテストしてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130929122015.png" alt="f:id:daruyanagi:20130929122015p:plain" title="f:id:daruyanagi:20130929122015p:plain" class="hatena-fotolife" itemprop="image"></span></p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
Logger.Write(&quot;冒頭のコードブロック内で記述&quot;);
}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@Logger.Write(&quot;Body 内で記述&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>結果はというと――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130929122031.png" alt="f:id:daruyanagi:20130929122031p:plain" title="f:id:daruyanagi:20130929122031p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>――冒頭のコードブロック内で記述したログは記録されない。「あれ、なんでだろう？」と思って、あちこちごちゃごちゃ弄ってみたのだけど、正解はコレだった。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
@Logger.Write(&quot;冒頭のコードブロック内で記述&quot;);
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130929122557.png" alt="f:id:daruyanagi:20130929122557p:plain" title="f:id:daruyanagi:20130929122557p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Logger.Write() のまえに @ を足せば実行される。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
@(
Logger.Write(&quot;冒頭のコードブロック内で記述&quot;)
)
}
</pre><p>でもいいのだけど。</p><p>しっかし、これ、なぜなんだろう。自分はまだまだ Razor がわかってないな。</p>
