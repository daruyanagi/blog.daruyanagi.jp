---
date: 2013-10-01T08:19:13.0000000
draft: false
title: "WebMatrix 3: @ でハマる（解決編"
tags: ["ASP.net", "ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130929122557.png" alt="f:id:daruyanagi:20130929122557p:plain" title="f:id:daruyanagi:20130929122557p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/09/29/122508">WebMatrix 3: @ &#x3067;&#x30CF;&#x30DE;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。</p><p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-384486530380611584');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('384486530380611584',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-384486530380611584"></div></p><p>というアドバイスをもらった。あ、たぶんそれだ。というわけで書き直した。</p>

<div class="section">
<h3>旧バージョン（Logger.cshtml）</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>#App_Code/Logger.cshtml

@helper Write(<span class="synType">string</span> message)
{
System.IO.File.AppendAllText(
Server.MapPath(<span class="synConstant">&quot;~/log.txt&quot;</span>),
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}:</span><span class="synSpecial">\t</span><span class="synConstant">{1}</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, DateTime.Now, message)
);
}
</pre><p>これって実は public static HelperResult Write(string message) になるんだよね。それにしてもなぜ AppendAllText() が実行されないのかは謎だけど、HTML が含まれていない（出力がない）ならば処理を飛ばしてしまう最適化なんかがあるのかもしれない。とりあえず“Page に対してなんら出力のないヘルパー”という使い方は NG ってことかな。</p>

</div>
<div class="section">
<h3>新バージョン（Logger.cs）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131001075835.png" alt="f:id:daruyanagi:20131001075835p:plain" title="f:id:daruyanagi:20131001075835p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#App_Code/Logger.cs

<span class="synStatement">using</span> System;

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> Logger
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Write(<span class="synType">string</span> message)
{
System.IO.File.AppendAllText(
System.Web.Hosting.HostingEnvironment.MapPath(<span class="synConstant">&quot;~/log.txt&quot;</span>),
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}:</span><span class="synSpecial">\t</span><span class="synConstant">{1}</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, DateTime.Now, message)
);
}
}
</pre><p>CSHTML → CS にして、コードを Razor ではなく C# で書き直す。“<a href="http://msdn.microsoft.com/ja-jp/library/system.web.hosting.hostingenvironment.mappath.aspx">HostingEnvironment.MapPath(String) Method (System.Web.Hosting) | Microsoft Docs</a>”は最近覚えたのだけど、Server.MapPath() が使えない場面でも動く（のだと期待している）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131001080145.png" alt="f:id:daruyanagi:20131001080145p:plain" title="f:id:daruyanagi:20131001080145p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>結果は――期待通りログが出力される。けれど、Default.cshtml も少し書き直さなければならない。</p>

</div>
<div class="section">
<h3>旧バージョン（Default.cshtml）</h3>
<pre class="code lang-html" data-lang="html" data-unlink>@{
@Logger.Write(&quot;冒頭のコードブロック内で記述&quot;);
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
</pre>
</div>
<div class="section">
<h3>新バージョン（Default.cshtml）</h3>
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
@{ Logger.Write(&quot;Body 内で記述&quot;); }
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>Logger.Write が HelperResult を返さなくなったことにより（ヘルパーメソッドとしてシグネチャーが合わなくなったので）、@Logger.Write() という書き方はできなくなり、コードブロックで囲まなければならなくなった。けど、これが正しい。</p><p>そういえば</p>

<ul>
<li><a href="http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx">Templated Razor Delegates | You&rsquo;ve Been Haacked</a></li>
</ul><p>をあんまり理解していないことを思い出したので、これも今度解決しておくことにする。</p>

</div>
<div class="section">
<h3>追記</h3>
<p>この功を表して、しばやんにはもう一枚 CD を贈ることにした。</p>

</div>