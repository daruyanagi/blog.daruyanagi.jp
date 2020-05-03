---
date: 2017-01-03T14:55:28.0000000
draft: false
title: "「三重県民には無理に飲ませてはいけない」をグラフ化する"
tags: ["とりとめもないこと", "Microsoft Excel", "Google", "三重"]
eyecatch: 20170103144302.png
---
<p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">三重県民には無理に飲ませないように。 <a href="https://t.co/M1GUINZlfB">pic.twitter.com/M1GUINZlfB</a></p>&mdash; 木ゃなこ (@tierra534) <a href="https://twitter.com/tierra534/status/815368024366514176">2017年1月1日</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script><br />
</p>

<div class="section">
<h3>Excel の 3D Maps を利用する</h3>
<p>詳しい方法は「<a href="https://dekiru.net/article/13655/">Excel 2016&#x306E;&#x65B0;&#x6A5F;&#x80FD;&#x300C;3D&#x30DE;&#x30C3;&#x30D7;&#x300D;&#x306E;&#x4F7F;&#x3044;&#x65B9;&#x3002;&#x5730;&#x56F3;&#x4E0A;&#x306B;&#x30B0;&#x30E9;&#x30D5;&#x3092;&#x4F5C;&#x6210;&#x3067;&#x304D;&#x308B;&#xFF01; | &#x3067;&#x304D;&#x308B;&#x30CD;&#x30C3;&#x30C8;</a>」で紹介されている。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170103144302.png" alt="f:id:daruyanagi:20170103144302p:plain" title="f:id:daruyanagi:20170103144302p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まずテーブルを作成。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170103144402.png" alt="f:id:daruyanagi:20170103144402p:plain" title="f:id:daruyanagi:20170103144402p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に［挿入］－［3D マップ］コマンドを選択。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170103144439.png" alt="f:id:daruyanagi:20170103144439p:plain" title="f:id:daruyanagi:20170103144439p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「データ解析アドイン」を有効化するかどうか聞かれるので、［有効］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170103144529.png" alt="f:id:daruyanagi:20170103144529p:plain" title="f:id:daruyanagi:20170103144529p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると 3D Maps の編集画面が現れるので、ごにょごにょイジっていい感じにする。なんか塗りが適当だし、石川県・香川県・福岡県がなぜか欠落しているけど気にしない（詳しい人、直し方教えて）。</p>

</div>
<div class="section">
<h3>Google Chart を利用する</h3>
<p>JavaScript が書けるならこっちの方が簡単。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>&lt;script src=<span class="synConstant">&quot;https://www.google.com/jsapi&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;
google.load(<span class="synConstant">'visualization'</span>, <span class="synConstant">'1'</span>, <span class="synIdentifier">{</span>packages:<span class="synIdentifier">[</span><span class="synConstant">'geochart'</span><span class="synIdentifier">]}</span>);
google.setOnLoadCallback(graphChart);

<span class="synIdentifier">function</span> graphChart() <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> data = google.visualization.arrayToDataTable(<span class="synIdentifier">[</span>
<span class="synIdentifier">[</span><span class="synConstant">&quot;都道府県&quot;</span>, <span class="synConstant">&quot;データ&quot;</span><span class="synIdentifier">]</span>,
<span class="synIdentifier">[</span><span class="synConstant">&quot;秋田&quot;</span>,  76.7<span class="synIdentifier">]</span>  ,
：
：
<span class="synIdentifier">[</span><span class="synConstant">&quot;三重&quot;</span>,  39.7<span class="synIdentifier">]</span>
<span class="synIdentifier">]</span>);
<span class="synIdentifier">var</span> option = <span class="synIdentifier">{</span>
region: <span class="synConstant">'JP'</span>,
resolution: <span class="synConstant">'provinces'</span>
<span class="synIdentifier">}</span>;

<span class="synIdentifier">var</span> chart = <span class="synStatement">new</span> google.visualization
.GeoChart(<span class="synStatement">document</span>.getElementById(<span class="synConstant">'chart'</span>));
chart.draw(data, option);
<span class="synIdentifier">}</span>
&lt;/script&gt;

&lt;div id=<span class="synConstant">&quot;chart&quot;</span>&gt;&lt;/div&gt;
</pre><p>コードを貼り付けると、以下のようにレンダリングされる。</p><p><script src="https://www.google.com/jsapi"></script><br />
<script>
google.load('visualization', '1', {packages:['geochart']});
google.setOnLoadCallback(graphChart);

function graphChart() {
var data = google.visualization.arrayToDataTable([
["都道府県", "データ"],
["秋田",  76.7]  ,
["岩手",  71.4]  ,
["鹿児島",  71.4],
["福島",  70.4]  ,
["埼玉",  65.4]  ,
["山形",  65.1]  ,
["北海道",  64.8],
["沖縄",  64.8]  ,
["熊本",  64.3]  ,
["高知",  64.0]  ,
["千葉",  63.4]  ,
["青森",  63.2]  ,
["宮城",  63.2]  ,
["新潟",  62.4]  ,
["神奈川",  61.9],
["香川",  61.6]  ,
["大分",  60.2]  ,
["宮崎",  60.2]  ,
["東京",  60.0]  ,
["栃木",  59.8]  ,
["茨城",  59.3]  ,
["山梨",  59.3]  ,
["長野",  58.5]  ,
["福井",  58.5]  ,
["鳥取",  58.5]  ,
["島根",  58.5]  ,
["愛媛",  58.5]  ,
["兵庫",  57.8]  ,
["福岡",  57.8]  ,
["静岡",  57.2]  ,
["山口",  56.3]  ,
["佐賀",  56.3]  ,
["長崎",  56.3]  ,
["徳島",  56.0]  ,
["滋賀",  55.8]  ,
["京都",  55.5]  ,
["群馬",  54.8]  ,
["富山",  54.8]  ,
["岡山",  53.8]  ,
["奈良",  53.3]  ,
["大阪",  53.0]  ,
["広島",  52.4]  ,
["和歌山",  49.7],
["岐阜",  47.6]  ,
["石川",  45.7]  ,
["愛知",  41.4]  ,
["三重",  39.7]
]);
var option = {
region: 'JP',
resolution: 'provinces'
};

var chart = new google.visualization
.GeoChart(document.getElementById('chart'));
chart.draw(data, option);
}
</script></p><p><div id="chart"></div></p><p>ちなみに、下記の記事を参照しました。都道府県名に“県”とかつけちゃうとダメみたい。</p><p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fqiita.com%2Fsue738%2Fitems%2F3297c79e62be1cb799c1" title="GoogleChartsのGeochartで都道府県分布マップを簡単作成 - Qiita" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://qiita.com/sue738/items/3297c79e62be1cb799c1">qiita.com</a></cite><br />
</p>

</div>
<div class="section">
<h3>雑感</h3>
<p>東海地方はお酒が弱い人が多いみたい。なんとなくだけど記紀によく登場する地域（紀・畿内・吉備・越＋東海）はお酒に弱い感じがあるので、縄文系はお酒に強く、弥生系はお酒に弱いみたいな違いとかあるのかな。</p>

</div>