---
date: 2015-01-18T08:17:20.0000000
draft: false
title: "WebMatrix：愛媛のニュースだけ読みたいので、Google ニュースから引っ張ってくる"
tags: ["WebMatrix", "Google"]
eyecatch: 20150118081201.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150118081201.png" alt="f:id:daruyanagi:20150118081201p:plain" title="f:id:daruyanagi:20150118081201p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>地元のニュースだけ読みたいので、それを Google ニュース引っ張ってくる BOT でも作ろうかと思って少し調べてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/GoogleNews.cshtml

@<span class="synStatement">using</span> System.ServiceModel.Syndication
@<span class="synStatement">using</span> System.Xml

@helper Get(<span class="synType">string</span> query)
{
var url = <span class="synType">string</span>.Format(
<span class="synConstant">&quot;http://news.google.com/news?q={0}&amp;output=rss&quot;</span>,
query
);

<span class="synStatement">using</span> (var reader = XmlReader.Create(url))
{
var feed = SyndicationFeed.Load(reader);

<span class="synComment">// @ObjectInfo.Print(feed);</span>

var data = feed.Items.Select(_ =&gt; <span class="synStatement">new</span> {
Title = _.Title.Text,
Summary = _.Summary.Text,
PublishDate = _.PublishDate,
Url = _.Links.First().Uri.ToString().Split(<span class="synConstant">'='</span>).Last(),
});

<span class="synComment">// @ObjectInfo.Print(data);</span>

<span class="synStatement">foreach</span> (var d <span class="synStatement">in</span> data)
{
<span class="synComment">// &lt;h2&gt;&lt;a href=&quot;@d.Url&quot;&gt;@d.Title&lt;/a&gt;&lt;/h2&gt;</span>
&lt;p&gt;@Html.Raw(d.Summary)&lt;/p&gt;
<span class="synComment">// &lt;p&gt;@d.PublishDate&lt;/p&gt;</span>
}
}
}
</pre><p>パラメーターに output=rss をくっつけると RSS 形式でデータを取得できるので XmlReader と SyndicationFeed で読み込み・整形してやるとよさげ。</p><p>残念なのでは地域ごとに絞れないこと<a href="#f-68c7e51c" name="fn-68c7e51c" title="本当はパラメーターに ned=jp を付けるとその国のニュースのみにデータを絞れるはずなのだけど、日本語版の Google ニュースでは利用できないようだ。">*1</a>。そのため「松山」で検索すると台湾の松山のニュースも引っかかるが……まぁ、これは仕方ないかな。JavaScript の API を利用すれば、ちゃんと制御できるようなので、JavaScript ができる人はそちらで書けばいいと思う。</p>

<div class="section">
<h3>結果</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150118080353.png" alt="f:id:daruyanagi:20150118080353p:plain" title="f:id:daruyanagi:20150118080353p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/Default.cshtml

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;style&gt;
* {
font-family: Meiryo, sans-serif;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
@GoogleNews.Get(<span class="synConstant">&quot;愛媛 OR 松山 -秀樹 -ゴルフ&quot;</span>)
&lt;/body&gt;
&lt;/html&gt;
</pre><p>天気予報機能も付けて（「☀時々☁、最高10度最低0度、西風後南西風海上後南西風稍強、波0.5米後1米」）、Twitter BOT にでもしようかな。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-68c7e51c" name="f-68c7e51c" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">本当はパラメーターに ned=jp を付けるとその国のニュースのみにデータを絞れるはずなのだけど、日本語版の Google ニュースでは利用できないようだ。</span></p>
</div>