---
date: 2014-02-05T17:00:00.0000000
draft: false
title: "WebMatrix: 自分が書いた記事の数を数えてみた"
tags: []
eyecatch: 20140205163749.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140205163749.png" alt="f:id:daruyanagi:20140205163749p:plain" title="f:id:daruyanagi:20140205163749p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>こういうのは別に WebMatrix でやる必要はないのだけど……慣れているので。あと、もっときれいに書き直そうかと思ったけど、面倒くさくなってやめた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Text
@<span class="synStatement">using</span> System.Text.RegularExpressions

@{
<span class="synComment">// 2008年まではシステムが旧かったので、</span>
<span class="synComment">// http://www.forest.impress.co.jp/article/ 以下に過去ログがある</span>
var archives = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;()
{
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200704.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200705.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200706.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200707.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200708.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200709.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200710.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200711.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200712.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200801.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200802.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200803.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200804.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200805.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200806.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200807.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200808.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200809.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200810.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200811.html&quot;</span>,
<span class="synConstant">&quot;http://www.forest.impress.co.jp/article/200812.html&quot;</span>,
};

<span class="synComment">// おニューなシステムの過去ログの URL を足す</span>
var d = <span class="synStatement">new</span> DateTime(<span class="synConstant">2009</span>, <span class="synConstant">1</span>, <span class="synConstant">1</span>);
<span class="synStatement">while</span> (d &lt; DateTime.Today)
{
archives.Add(<span class="synType">string</span>.Format(<span class="synConstant">&quot;http://www.forest.impress.co.jp/backno/top/index{0:0000}{1:00}.html&quot;</span>, d.Year, d.Month));
d = d.AddMonths(<span class="synConstant">1</span>);
}

<span class="synComment">// システム変更時に UTF-8 にすべきって主張しておけばよかった</span>
var encoding = Encoding.GetEncoding(<span class="synConstant">&quot;Shift_JIS&quot;</span>);

<span class="synComment">// 自分の記事を保持しておくリスト</span>
var my_articles = <span class="synStatement">new</span> List&lt;<span class="synType">string</span>&gt;();
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
@<span class="synStatement">foreach</span> (var archive <span class="synStatement">in</span> archives)
{
<span class="synComment">// 過去ログページの解析</span>
var month = <span class="synStatement">new</span> WebClient(){ Encoding = encoding, }.DownloadString(archive);
var regex = <span class="synStatement">new</span> Regex(<span class="synSpecial">@</span><span class="synConstant">&quot;&quot;&quot;(\/[^&quot;&quot;]+\.html)&quot;&quot;&quot;</span>);
var links = regex.Matches(month).Cast&lt;Match&gt;();

<span class="synStatement">foreach</span> (var link <span class="synStatement">in</span> links)
{
var l = <span class="synConstant">&quot;http://www.forest.impress.co.jp&quot;</span> + link.Groups[<span class="synConstant">1</span>];

<span class="synComment">// ダイジェストニュース、アップデート、バックナンバーは読み飛ばす</span>
<span class="synStatement">if</span> (l.IndexOf(<span class="synConstant">&quot;digest&quot;</span>) &gt;= <span class="synConstant">0</span>)
{
<span class="synStatement">continue</span>;
}

<span class="synStatement">if</span> (l.IndexOf(<span class="synConstant">&quot;update&quot;</span>) &gt;= <span class="synConstant">0</span>)
{
<span class="synStatement">continue</span>;
}

<span class="synStatement">if</span> (l.IndexOf(<span class="synConstant">&quot;backno&quot;</span>) &gt;= <span class="synConstant">0</span>)
{
<span class="synStatement">continue</span>;
}

<span class="synComment">// ニュースやレビュー記事の場合、著者名を拾う</span>
<span class="synStatement">try</span>
{
var article = <span class="synStatement">new</span> WebClient(){ Encoding = encoding, }.DownloadString(l);
<span class="synStatement">if</span> (article.IndexOf(<span class="synConstant">&quot;柳 英俊&quot;</span>) &gt;= <span class="synConstant">0</span>)
{
my_articles.Add(l); <span class="synComment">// おれのだー！</span>
}
}
<span class="synStatement">catch</span>
{
<span class="synComment">// リンク切れとかあるかもしれん</span>
}
}
}

&lt;ul&gt;
@<span class="synStatement">foreach</span>(var my_article <span class="synStatement">in</span> my_articles.Distinct())
{
&lt;li&gt;&lt;a href=<span class="synConstant">&quot;@my_article&quot;</span>&gt;@my_article&lt;/a&gt;&lt;/li&gt;
}
&lt;/ul&gt;

&lt;p&gt;@my_articles.Distinct().Count() 件の記事が見つかりました。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>Distinct() 2回呼んでたりするし、見る人が見たら殺されかねないコードだけど、まぁ、使い捨てだし！　たぶんちゃんとカウントできてる気がする。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140205165911.png" alt="f:id:daruyanagi:20140205165911p:plain" title="f:id:daruyanagi:20140205165911p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ただ、時間は割とかかる。ローカルで動かすだけなら問題ないみたいだけど。</p>

<div class="section">
<h3>追記</h3>
<p>なかじ様が面白いことをしていた。</p>

<ul>
<li><a href="http://nakaji.hatenablog.com/entry/2014/02/06/013046">PowerShell&#xFF1A;&#x3060;&#x308B;&#x3084;&#x306A;&#x304E;&#x69D8;&#x304C;&#x66F8;&#x3044;&#x305F;&#x8A18;&#x4E8B;&#x306E;&#x6570;&#x3092;&#x6570;&#x3048;&#x3066;&#x307F;&#x305F; - &#x306A;&#x304B;&#x65E5;&#x8A18;</a></li>
</ul>
</div>