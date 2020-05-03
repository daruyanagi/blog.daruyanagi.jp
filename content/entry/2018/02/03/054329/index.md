---
date: 2018-02-03T05:43:29.0000000
draft: false
title: "日記：金曜日は半休にして Trello＋Slack を試した＆テントを張る練習をした"
tags: ["日記", "キャンプ", "Ninja 250", "Microsoft Flow", "Trello", "Slack"]
eyecatch: 20180203051643.png
---
<p>金曜日は少しだけお仕事をして、あとはダラダラと過ごした。</p>

<div class="section">
<h3>Trello＋Slack Powered by Mictosoft Flow</h3>
<p>まずは、業務が回っているとなかなか手を出せない、業務フローの改善に着手（半分趣味なので、これはあまり仕事って感じはしない）。今回は「Trello にカードを作って、そのことを Slack にも伝える」というアホの極みな無駄を減らしてみた。</p><p>コードを書くのはだるいので、なるべく Microsoft Flow を使う。Microsoft Flow には Trello 関係のトリガー（If...then... の if）として</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180203051643.png" alt="f:id:daruyanagi:20180203051643p:plain" title="f:id:daruyanagi:20180203051643p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>新しいカードがボードに追加された場合</li>
<li>新しいカードがリストに追加された場合</li>
</ul><p>が利用できる。なので、「特定のリストにカードが追加されたら……」というアクションは簡単に記述できる――んだけど、その時もらえる情報は、新しく追加されたカードに関する情報だけなのだ。つまり</p>

<ul>
<li>新しいカードが追加されたら Slack にそれを投げる</li>
</ul><p>というフローは割と楽に書けるんだけど、</p>

<ul>
<li>新しいカードがリストに追加されたら、そのリストに溜まっているカードのリストを Slack に投げる</li>
</ul><p>というフローはひと手間かかる。Microsoft Flow には「ID でリストを取得する」というアクションがあって、それを使うと「リストの中のカード」が取得できるので、これを使えばよい――んだけど、ちょっとハマった。なぜか「リストの中のカード」を得ようとしても null しか返ってこない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180203051729.png" alt="f:id:daruyanagi:20180203051729p:plain" title="f:id:daruyanagi:20180203051729p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>理由はわかってみれば簡単で、「ID でリストを取得する」アクションは既定で「リストを取得するだけ」になっていて、子のカードまで取ってきてくれない。拡張オプションで、一緒に取ってくるデータをいろいろ指定してあげなくちゃいけないんだね。とりあえず“all”とか“open”とかにしておくと、リストの中のカードまで取ってきてくれると思う。</p><p>あと、JST で現在時刻をとるのが最初よくわからなかった。Microsoft Flow って UtcNow() っていう関数が使えるのだけど（名前の通り、標準世界時で現在日時を取得する）、これって帰ってくるのが文字列名のな。AddHours(9) で日本時間にしてやろうとしても受け付けてくれない。アッーーー！　なんだこの面倒くささ！　結局、こんなキモいコードになったんだけど、もっといい方法はないだろうか……。</p>
<pre class="code" data-lang="" data-unlink>convertTimeZone(utcnow(),&#39;UTC&#39;,&#39;Tokyo Standard Time&#39;,&#39;dd/MM/yyyy HH:mm&#39;)</pre><p>ちなみに、リストの結合の区切り文字なんかに改行コードをぶち込みたい場合は、以下のようにする。</p>
<pre class="code" data-lang="" data-unlink>uriComponentToString(&#39;%0A&#39;)</pre><p><code>\n</code>なんかではエスケープされるのか、そのまま出力されてしまうので、最初ちょっと悩んだ。</p><p>今でもわからないのは Trello のカードについたラベルを適当にテキストとして出力する方法……C# コードだったら一瞬で頭に浮かぶのに、<b>ブロックで記述しろっていわれると逆にわかんなくなる</b>という……つらたん、つらたん。</p>

</div>
<div class="section">
<h3>テントの設営</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180202124822.jpg" alt="f:id:daruyanagi:20180202124822j:plain" title="f:id:daruyanagi:20180202124822j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>午後は、押し入れからテントを引っ張り出して、ベランダに設営して遊んだ。このテントは、バイクでソロキャンプに行きたいなとずっと思ってて、愛媛に来る前に購入したものだ。愛媛にきてもう4年になるから、それ以上の間ずっと、押し入れで脾肉の嘆にくれていたわけやな……すまん……すまん。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180203050749.png" alt="f:id:daruyanagi:20180203050749p:plain" title="f:id:daruyanagi:20180203050749p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちなみに、今頃になってキャンプ道具を引っ張り出す気になったのは――べ、べつに、今期の大傑作アニメ『ゆるキャン』に触発されたからじゃないんだからねっ！　前々からやりたいと思っていて、ちょくちょく装備を整えていたんだからねっ！　たまたまやりたくなってしまっただけなんだからねっ！</p><p>それはともかく、自分がもっていたのはどうやら、モンベルのクロノスドーム 1 型という安い一人用のテント（の旧モデル）だったみたい。塩漬けにし過ぎて、どのメーカーの、どんなモデルを持っていたのかすら覚えてなかったぜ……。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B001CM8SIQ/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/4119CItkXXL._SL160_.jpg" class="hatena-asin-detail-image" alt="モンベル(mont-bell) クロノスドーム1型 スカイブルー [1~2人用] 1122370" title="モンベル(mont-bell) クロノスドーム1型 スカイブルー [1~2人用] 1122370"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B001CM8SIQ/bestylesnet-22/">モンベル(mont-bell) クロノスドーム1型 スカイブルー [1~2人用] 1122370</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> モンベル(mont-bell)</li><li><span class="hatena-asin-detail-label">発売日:</span> 2012/03/02</li><li><span class="hatena-asin-detail-label">メディア:</span> スポーツ用品</li><li><a href="http://d.hatena.ne.jp/asin/B001CM8SIQ/bestylesnet-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>広げてみたところ、傷みや欠品はなく、十分使えそう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180202124135.jpg" alt="f:id:daruyanagi:20180202124135j:plain" title="f:id:daruyanagi:20180202124135j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>先週あたりに購入したバイクのサイドバッグにもキッチリ（マジで横幅ギリギリ）収まる。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00IJSN12O/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/414cJ1pqhzL._SL160_.jpg" class="hatena-asin-detail-image" alt="タナックス (TANAX) ツアーシェルケース モトフィズ(MOTOFIZZ) ヘアラインシルバー MFK-196 (容量40? 片側20?)" title="タナックス (TANAX) ツアーシェルケース モトフィズ(MOTOFIZZ) ヘアラインシルバー MFK-196 (容量40? 片側20?)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B00IJSN12O/bestylesnet-22/">タナックス (TANAX) ツアーシェルケース モトフィズ(MOTOFIZZ) ヘアラインシルバー MFK-196 (容量40? 片側20?)</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> タナックス</li><li><span class="hatena-asin-detail-label">発売日:</span> 2014/03/18</li><li><span class="hatena-asin-detail-label">メディア:</span> Automotive</li><li><a href="http://d.hatena.ne.jp/asin/B00IJSN12O/bestylesnet-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>テントは快適に使いたければ（利用人数）＋1～2人にすべきというけれど、今のバイクは 250cc なので積み過ぎると前に進まなく恐れがある（いや、そこまでじゃないけどな）。クルマだったらともかく、自分にとってはちょうどいいチョイスだと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180202125355.jpg" alt="f:id:daruyanagi:20180202125355j:plain" title="f:id:daruyanagi:20180202125355j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>設営も簡単で、ものの数分で完成した。グランドシードが見当たらなかったので、専用のものを足りないものと一緒に Amazon へ注文。この日はこれだけでいろいろ満足してしまい、ベッドに転がって本を読んでいたら、夕方前に寝落ちしてそのまま夜中過ぎまで爆睡してしまった。日付が変わって今日は、新居浜までおいしいおいしいお寿司を食べに行く。</p><p>なんと<b>無回転寿司</b>だぞ！！</p>

</div>