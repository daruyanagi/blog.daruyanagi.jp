---
date: 2018-01-11T02:03:37.0000000
draft: false
title: "2018年1月10日の日記：「光あれ！」「インターネットに接続できません」"
tags: ["日記", "今日のお役立ち", "ASP.NET Core"]
eyecatch: https://images-fe.ssl-images-amazon.com/images/I/41%2BHdFE6djL._SL160_.jpg
---
<p>夜中に目を覚ました。「アレクサ、照明をつけて」と闇に呼び掛けた。アレクサが答えた。<i>「インターネットに接続できません。アレクサアプリのヘルプをご確認ください」</i>ここ最近、Amazon Echo Dot と eRemote に頼りっきりで、照明のリモコンなど戸棚の奥にしまってしまっている。せめてメガネがあれば夜目も効くのだが、灯りがないとメガネを探すことすらできない。メガネは灯りを求め、灯りはメガネを求め……その堂々巡りの中、尿意だけが果てしなく高まっていく。インターネットはインフラだな、と実感させられた。</p><p>まぁ、それはともかく。</p><p>昨日はなぜかルーターの調子が悪く、2.4GHz 帯が使えなかった。パソコンのネットは 5GHz 帯でつなげばいいのでなんら問題ないし、むしろそっちの方が輻輳がなく快適なのだと思うけれど、eRemote――説明し忘れていたが、こいつはネットワークに接続できる学習リモコンのようなもので、Amazon Eco Dot（アレクサ）につないで音声で家電をコントロールできる――が 2.4GHz 帯にしか対応していない関係で、2.4GHz 帯をメインに使っていたのだ。おかげで無線でつないでいたプリンターも応答してくれなくなるし……昼過ぎからはなぜか問題が解消されたけど<a href="#f-8865eafb" name="fn-8865eafb" title="俺の脳みそから強い電波が出ていて干渉したのかもしれんな">*1</a>、いろいろ踏んだり蹴ったりだった。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B01MA4W1YD/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/41%2BHdFE6djL._SL160_.jpg" class="hatena-asin-detail-image" alt="LinkJapan eRemote mini IoTリモコン 家でも外からでもいつでもスマホで自宅の家電を操作 【AmazonAlexa対応製品】 MINI" title="LinkJapan eRemote mini IoTリモコン 家でも外からでもいつでもスマホで自宅の家電を操作 【AmazonAlexa対応製品】 MINI"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B01MA4W1YD/bestylesnet-22/">LinkJapan eRemote mini IoTリモコン 家でも外からでもいつでもスマホで自宅の家電を操作 【AmazonAlexa対応製品】 MINI</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> LinkJapan</li><li><span class="hatena-asin-detail-label">メディア:</span> エレクトロニクス</li><li><a href="http://d.hatena.ne.jp/asin/B01MA4W1YD/bestylesnet-22" target="_blank">この商品を含むブログ (1件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>でも、このことが逆に Amazon Echo Dot＋eRemote の最強っぷりを改めて証明してくれたと思う。お布団でぬくぬくしたまま<i>「アレクサ、エアコンつけて」</i><i>「アレクサ、10分後に教えて（← 部屋が温まるまで二度寝）」</i><i>「アレクサ、照明つけて」</i>ができるの、ほんまサイコー<a href="#f-66dd4203" name="fn-66dd4203" title="eRemote を使ったアレクサコントロールは今のところ照明にしか対応していないが、エアコンやテレビを“照明”として登録すれば ON/OFF 程度は可能">*2</a>。<i>「スマートスピーカー？　どうせすぐ飽きるだろ」</i>と思っていたのに、この1カ月ですっかり信者になってしまったよ。</p><p>eRemote は 5GHz 対応の後継機種が出たら買い足してもいい。仕事部屋だけでなく、リビングにも置いてやる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180111015106.png" alt="f:id:daruyanagi:20180111015106p:plain" title="f:id:daruyanagi:20180111015106p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ほんとは iPad の修理に出かけたり、サンドイッチ買ったり、温泉や飲みにも出かけたかったけど、軽く雨が降っていたので引きこもり。アプリの開発は、読書の進捗メモ（のユーザーインターフェイスだけ）が実装できた。JavaScript は苦手＆久しぶりでサッパリだったけど、Bootstrap の Modal Dialog を組み込んだり、input の値に応じて Bootstrap の Progress を操作できるようにしてみたり……数値のアップダウンコントロールは Touch Spin というサードパーティ製コンポーネントが使いやすそうで、これも組み込んでみた。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.virtuosoft.eu%2Fcode%2Fbootstrap-touchspin%2F" title="Bootstrap TouchSpin" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://www.virtuosoft.eu/code/bootstrap-touchspin/">www.virtuosoft.eu</a></cite></p><p>ちなみに、ASP.NET Core MVC/Razor Page でちょっとしたスクリプトを組み込みたい場合は、Scripts セクションに書いてしまえばいいと思う。ここだったら jQuery のロードが終わってるはずなので。というか、他のところに書いてたら jQuery が全然動かなくて……はじめは仕方なくバニラで書いてた。Touch Spin を組み込んだら開発者ツールのコンソールに「jQuery が未定義」みたいなエラーが出てきて、はじめて jQuery がロードされていないことに気づいた。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>@section Scripts <span class="synIdentifier">{</span>
@<span class="synIdentifier">{</span>
await Html.RenderPartialAsync(<span class="synConstant">&quot;_ValidationScriptsPartial&quot;</span>);
<span class="synIdentifier">}</span>

&lt;script src=<span class="synConstant">&quot;~/lib/jquery.bootstrap-touchspin.js&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;
$(<span class="synStatement">document</span>).ready(<span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
$(<span class="synConstant">&quot;#current-page&quot;</span>).TouchSpin(<span class="synIdentifier">{</span>
min: 0,
max: @Model.Book.NumberOfPages,
stepinterval: 1,
postfix: <span class="synConstant">'ページ / '</span> + @Model.Book.NumberOfPages + <span class="synConstant">'ページ'</span>,
<span class="synIdentifier">}</span>);

<span class="synIdentifier">var</span> updateProgressBar = <span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
<span class="synIdentifier">var</span> cur = $(<span class="synIdentifier">this</span>).val();
<span class="synIdentifier">var</span> all = @Model.Book.NumberOfPages;
<span class="synIdentifier">var</span> progress = Math.round((cur / all) * 100) + <span class="synConstant">&quot;%&quot;</span>;
$(<span class="synConstant">&quot;#reaging-progress&quot;</span>).css(<span class="synConstant">&quot;width&quot;</span>, progress);
$(<span class="synConstant">&quot;#reaging-progress&quot;</span>).text(progress);
<span class="synIdentifier">}</span>;

$(<span class="synConstant">&quot;#current-page&quot;</span>).keyup(updateProgressBar);
$(<span class="synConstant">&quot;#current-page&quot;</span>).change(updateProgressBar);
<span class="synIdentifier">}</span>);
&lt;/script&gt;
<span class="synIdentifier">}</span>
</pre><p>Razor と混在して書いても問題なかったから、モデルデータもぶち込める。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-8865eafb" name="f-8865eafb" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">俺の脳みそから強い電波が出ていて干渉したのかもしれんな</span></p>
<p class="footnote"><a href="#fn-66dd4203" name="f-66dd4203" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">eRemote を使ったアレクサコントロールは今のところ照明にしか対応していないが、エアコンやテレビを“照明”として登録すれば ON/OFF 程度は可能</span></p>
</div>