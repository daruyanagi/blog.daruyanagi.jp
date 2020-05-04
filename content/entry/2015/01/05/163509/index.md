---
date: 2015-01-05T16:35:09.0000000
draft: false
title: "ブログにかっちょいいグラフを張り付ける"
tags: ["Google", "JavaScript"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2015/01/04/000000">&#x53BB;&#x5E74; Amazon&#x3067;&#x4F7F;&#x3063;&#x305F;&#x91D1;&#x984D;&#x3092;&#x8A08;&#x7B97;&#x3057;&#x3066;&#x307F;&#x305F;&#x3002; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でグラフを張り付けようと思ったのだけど、「Excel」で作って画像として貼り付けるよりも、Google Chart<a href="https://developers.google.com/chart/">Charts &nbsp;|&nbsp; Google Developers</a> で張り付けた方がカッコイイっぽいことに気付いた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150105162759.png" alt="f:id:daruyanagi:20150105162759p:plain" title="f:id:daruyanagi:20150105162759p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>最近は Material Charts と呼ばれる SVG で実装されたリッチなグラフが書けるようになっている（そのため、古い Internet Explorer では表示できないので注意）。たとえば、グラフにマウスオーバーすると数値が表示されたり。かっちょいい。ただし、ベータ版であることには留意しておこう。</p>

<div class="section">
<h3>コード</h3>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>&lt;script type=<span class="synConstant">&quot;text/javascript&quot;</span> src=<span class="synConstant">&quot;https://www.google.com/jsapi&quot;</span>&gt;&lt;/script&gt;
&lt;script type=<span class="synConstant">&quot;text/javascript&quot;</span>&gt;
google.load(<span class="synConstant">&quot;visualization&quot;</span>, <span class="synConstant">&quot;1.1&quot;</span>, <span class="synIdentifier">{</span>packages:<span class="synIdentifier">[</span><span class="synConstant">&quot;bar&quot;</span><span class="synIdentifier">]}</span>);
google.setOnLoadCallback(drawChart);

<span class="synIdentifier">function</span> drawChart() <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> data = google.visualization.arrayToDataTable(<span class="synIdentifier">[</span>
<span class="synIdentifier">[</span><span class="synConstant">'Year'</span>, <span class="synConstant">'合計金額'</span><span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2006'</span>, 71180 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2007'</span>, 283066 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2008'</span>, 66638 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2009'</span>, 35289 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2010'</span>, 93949 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2010'</span>, 93949 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2011'</span>, 258747 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2012'</span>, 277831 <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2013'</span>, 186103  <span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">'2014'</span>, 258747 <span class="synIdentifier">]</span>,
<span class="synIdentifier">]</span>);

<span class="synIdentifier">var</span> options = <span class="synIdentifier">{</span>
chart: <span class="synIdentifier">{</span>
title: <span class="synConstant">'Amazon 年間消費金額'</span>,
subtitle: <span class="synConstant">'2006-2014'</span>,
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>;

<span class="synIdentifier">var</span> chart = <span class="synStatement">new</span> google.charts.Bar(<span class="synStatement">document</span>.getElementById(<span class="synConstant">'chart_div'</span>));
chart.draw(data, options);
<span class="synIdentifier">}</span>
&lt;/script&gt;
&lt;div id=<span class="synConstant">&quot;chart_div&quot;</span> style=<span class="synConstant">&quot;width: 540px; height: 360px;&quot;</span>&gt;&lt;/div&gt;
</pre><p>詳しい使い方は <a href="https://developers.google.com/chart/interactive/docs/gallery/columnchart">Visualization: Column Chart &nbsp;|&nbsp; Charts &nbsp;|&nbsp; Google Developers</a> で。円グラフとかも今度試してみようかな。</p>

</div>
<div class="section">
<h3>結果</h3>
<p>マウスオーバーしてみるといいやで。</p>

<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
google.load("visualization", "1.1", {packages:["bar"]});
google.setOnLoadCallback(drawChart);

function drawChart() {
var data = google.visualization.arrayToDataTable([
['Year', '合計金額'],
['2006', 71180 ],
['2007', 283066 ],
['2008', 66638 ],
['2009', 35289 ],
['2010', 93949 ],
['2010', 93949 ],
['2011', 258747 ],
['2012', 277831 ],
['2013', 186103  ],
['2014', 258747 ],
]);

var options = {
chart: {
title: 'Amazon 年間消費金額',
subtitle: '2006-2014',
}
};

var chart = new google.charts.Bar(document.getElementById('chart_div'));
chart.draw(data, options);
}
</script>

<div id="chart_div" style="width: 540px; height: 360px;"></div>

</div>