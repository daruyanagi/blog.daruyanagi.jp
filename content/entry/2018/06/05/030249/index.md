---
date: 2018-06-05T03:02:49.0000000
draft: false
title: "6月5日：『PowerShell実践ガイドブック』"
tags: ["PowerShell", "読書"]
eyecatch: 
---

<ul>
<li>6月1日（金）：お仕事お休み。でも、1日中業務改善のための Trello ＆ Slack 設定や環境のセットアップをしていた。
<ul>
<li><a href="http://blog.daruyanagi.jp/entry/2018/06/02/225431">Trello&#xFF1A;&#x30E1;&#x30FC;&#x30EB;&#x3067;&#x30AB;&#x30FC;&#x30C9;&#x3092;&#x8FFD;&#x52A0;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="http://blog.daruyanagi.jp/entry/2018/06/03/060000">&#x624B;&#x6301;&#x3061;&#x306E; Excel &#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x3068; Microsoft Flow &#x3067;&#x7C21;&#x5358;&#x306A; Web &#x30B5;&#x30FC;&#x30D3;&#x30B9;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul></li>
<li>6月2日（土）：徹夜明けで爆睡。外に出ようかなって思ってたけど、なにもできなかった。クロネコの配達日時指定してたので頑張って起きてたんだけど、知らない間に意識が飛んでたのか、インターホンが聞こえなかったのか、不在通知が入ってた……ごめんなさい</li>
<li>6月3日（日）：不規則な生活の影響で、明るいうちから眠い。この日はクロネコの配達をちゃんと受け取れた。えらい！　夜中から週明けに備えて仕事を始める</li>
<li>6月4日（月）：日付が変わる前から午後5時ぐらいまで寝ずに仕事、そのあと気絶。</li>
<li>6月5日（火）：WWDC を観ているけど、あんまり面白くない。このあと新デバイスの発表とかあるんだろうけど</li>
</ul><p>クロネコで受け取ったのは、食糧・飲料、今年の浴衣（夏着物としても着れそうな、近江ちぢみのやつ）、あと『PowerShell実践ガイドブック』（通称、貝殻本）。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4839965986/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/61pLrWCOvdL._SL160_.jpg" class="hatena-asin-detail-image" alt="PowerShell実践ガイドブック ~クロスプラットフォーム対応の次世代シェルを徹底解説~" title="PowerShell実践ガイドブック ~クロスプラットフォーム対応の次世代シェルを徹底解説~"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4839965986/bestylesnet-22/">PowerShell実践ガイドブック ~クロスプラットフォーム対応の次世代シェルを徹底解説~</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> 吉崎生</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> マイナビ出版</li><li><span class="hatena-asin-detail-label">発売日:</span> 2018/05/30</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本（ソフトカバー）</li><li><a href="http://d.hatena.ne.jp/asin/4839965986/bestylesnet-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p>忙しくてまだちゃんと読めてないのだけど、思ったより分厚かった。</p><p>PowerShell は今 Windows（.NET Framework ） → クロスプラットフォーム（.NET Core、Mac/Linux）な過渡期にあると思うけど、このタイミングでちゃんと勉強しなおしたいなーと思ってたので、Twitter で発刊を耳にするや否や速攻 Amazon で予約した――けど、本屋で買う方が早かったみたいだな！　失敗したぜ。まぁ、時間が取れてなくてまだちゃんと読めてないから、いいっちゃいいんだけど。</p><p>そろそろ PowerShell ISE を卒業して、Visual Studio Code あたりで使えるようになりたいと思っているのだけど、そういうのにもちゃんと応えてくれる内容にもなっているみたい。斜め読みでさらっと全部読んでから、自分に足りないところを、手を動かしながら勉強していきたいなーって思う。</p><p>目標はこうやってワンライナーでカッコよくかけるぐらい！脳みそが C# ベースでモノを考えるようになっているから、なかなかワンライナーでかけないんだよねぇ……</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">スマートにかぁ、こうとか? <br>(Invoke-WebRequest -Uri <a href="https://t.co/VTbIxZiar0">https://t.co/VTbIxZiar0</a>).Links.href<br>.Where({$_.EndsWith(&quot;.pdf&quot;)}).ForEach({Invoke-WebRequest -Uri $_ -OutFile (Split-Path $_ -Leaf)}) // PowerShell：陸上自衛隊のイラク派遣日報をまとめてダウンロードする <a href="https://t.co/eo955O9P9L">https://t.co/eo955O9P9L</a></p>&mdash; guitarrapc_tech (@guitarrapc_tech) <a href="https://twitter.com/guitarrapc_tech/status/1000799574351495168?ref_src=twsrc%5Etfw">2018年5月27日</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
