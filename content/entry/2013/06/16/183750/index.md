---
date: 2013-06-16T18:37:50.0000000
draft: false
title: "WebMatrix 3: Windows Store アプリを紹介するヘルパー（未完成）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130616/20130616181844.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130616181844.png" alt="f:id:daruyanagi:20130616181844p:plain" title="f:id:daruyanagi:20130616181844p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>もしあなたが Windows ストア アプリを作っていて、なおかつ自分のサイトを APS.NET MVC/Web Pages で構築していたならば<a href="#f-a90bc3c5" name="fn-a90bc3c5" title="そんなやつおんのか？">*1</a>、Web ページに Windows ストア アプリの情報を埋め込みたいと思うかもしれませんね。</p><p>公式に oEmbed <a href="#f-928f5a5c" name="fn-928f5a5c" title="http://oembed.com/">*2</a>のような仕組みが提供されていればベストなのですが、残念ながらないみたい。仕方ないので、スクレイピングして埋め込み用のコードを取得する HTML ヘルパーを作ってみたいと思います。</p>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130616182655.png" alt="f:id:daruyanagi:20130616182655p:plain" title="f:id:daruyanagi:20130616182655p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#~/AppCode/WindowsStore.cshtml

@<span class="synStatement">using</span> System.Text
@<span class="synStatement">using</span> System.Text.RegularExpressions

@helper GetHtml(<span class="synType">string</span> id) {
<span class="synType">const</span> <span class="synType">string</span> ENDPOINT = <span class="synConstant">&quot;http://apps.microsoft.com/windows/ja-JP/app/&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> PATTERN1 = <span class="synSpecial">@</span><span class="synConstant">&quot;itemprop=&quot;&quot;(?&lt;itemprop&gt;[^&quot;&quot;]+)&quot;&quot; content=&quot;&quot;(?&lt;content&gt;[^&quot;&quot;&lt;]+)&quot;&quot;&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> PATTERN2 = <span class="synSpecial">@</span><span class="synConstant">&quot;(href|src)=&quot;&quot;(?&lt;content&gt;[^&quot;&quot;&lt;]+)&quot;&quot;.+itemprop=&quot;&quot;(?&lt;itemprop&gt;[^&quot;&quot;]+)&quot;&quot;&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> PATTERN3 = <span class="synSpecial">@</span><span class="synConstant">&quot;itemprop=&quot;&quot;(?&lt;itemprop&gt;[^&quot;&quot;]+)&quot;&quot;[^&quot;&quot;&gt;]*&gt;(?&lt;content&gt;[^&lt;]+)&lt;&quot;</span>;

<span class="synStatement">using</span> (var downloader = <span class="synStatement">new</span> WebClient())
{
downloader.Encoding = Encoding.UTF8;

var s = downloader.DownloadString(ENDPOINT + id);

var result = <span class="synStatement">new</span> Regex(<span class="synSpecial">@</span><span class="synConstant">&quot;background-color:#([0-9a-fA-F]{6});&quot;</span>)
.Matches(s)
.Cast&lt;Match&gt;()
.Skip(<span class="synConstant">1</span>).Take(<span class="synConstant">1</span>) <span class="synComment">// 2番目の background-color を取得</span>
.Select(_ =&gt; <span class="synStatement">new</span> {
ItemProp = <span class="synConstant">&quot;appColor&quot;</span>,
Content = _.Groups[<span class="synConstant">1</span>].Value,
})
.Concat(
<span class="synStatement">new</span> Regex(PATTERN1).Matches(s).Cast&lt;Match&gt;()
.Select(_ =&gt; <span class="synStatement">new</span> {
ItemProp = _.Groups[<span class="synConstant">&quot;itemprop&quot;</span>].Value,
Content = _.Groups[<span class="synConstant">&quot;content&quot;</span>].Value.Trim(),
})
)
.Concat(
<span class="synStatement">new</span> Regex(PATTERN2).Matches(s).Cast&lt;Match&gt;()
.Select(_ =&gt; <span class="synStatement">new</span> {
ItemProp = _.Groups[<span class="synConstant">&quot;itemprop&quot;</span>].Value,
Content = _.Groups[<span class="synConstant">&quot;content&quot;</span>].Value.Trim(),
})
)
.Concat(
<span class="synStatement">new</span> Regex(PATTERN3).Matches(s).Cast&lt;Match&gt;()
.Select(_ =&gt; <span class="synStatement">new</span> {
ItemProp = _.Groups[<span class="synConstant">&quot;itemprop&quot;</span>].Value,
Content = _.Groups[<span class="synConstant">&quot;content&quot;</span>].Value.Trim(),
})
)
<span class="synComment">// 正規表現が手抜きなのでゴミ取り</span>
.Where(_ =&gt; !<span class="synType">string</span>.IsNullOrEmpty(_.Content));

&lt;dl&gt;
@<span class="synStatement">foreach</span> (var item <span class="synStatement">in</span> result)
{
&lt;dt&gt;@item.ItemProp&lt;/dt&gt;
&lt;dd&gt;@item.Content&lt;/dd&gt;
}
&lt;/dl&gt;

}
}
</pre><p>Windows ストアは Microdata<a href="#f-b492556d" name="fn-b492556d" title="http://www.w3.org/html/wg/drafts/microdata/master/">*3</a>で構造化されているみたいなので、基本的に itemprop という属性を探して値らしきものを取得するという方法でいいみたい（それでも数パターンの正規表現が必要だけど）。ただ、アプリのブランディングカラーは CSS でべた書きされているので、それは別途スクレイピング（今回は background-color を探して Take と Skip で二番目に現れたモノだけを取得るつという手抜き実装）。</p><p>あとはこれを実際に使ってみる。</p>
<pre class="code lang-html" data-lang="html" data-unlink>#~/Default.cshtml

@{

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
@WindowsStore.GetHtml(&quot;86b6ecdc-e810-4aa2-9bdb-bb0da5b34737&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>で、結果はこんな感じ（name がダブってたりして、不完全だけど！）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130616183221.png" alt="f:id:daruyanagi:20130616183221p:plain" title="f:id:daruyanagi:20130616183221p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとはビューやスタイルをいじっていい感じに仕上げればいい……のだけど、飽きた。</p><p>しかも、よく考えたら NancyFx <a href="#f-e1ed6ee5" name="fn-e1ed6ee5" title="https://blog.daruyanagi.jp/search?q=Nancy">*4</a>で JSON を返す API か何かにすればよかったね。そっちの方が汎用的に使える。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-a90bc3c5" name="f-a90bc3c5" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">そんなやつおんのか？</span></p>
<p class="footnote"><a href="#fn-928f5a5c" name="f-928f5a5c" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://oembed.com/">http://oembed.com/</a></span></p>
<p class="footnote"><a href="#fn-b492556d" name="f-b492556d" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://www.w3.org/html/wg/drafts/microdata/master/">http://www.w3.org/html/wg/drafts/microdata/master/</a></span></p>
<p class="footnote"><a href="#fn-e1ed6ee5" name="f-e1ed6ee5" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="https://blog.daruyanagi.jp/search?q=Nancy">https://blog.daruyanagi.jp/search?q=Nancy</a></span></p>
</div>