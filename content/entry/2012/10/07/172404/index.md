---
date: 2012-10-07T17:24:04.0000000
draft: false
title: "「高速リリースの真価」について"
tags: ["とりとめもないこと"]
eyecatch: 
---
<p><a href="http://www.forest.impress.co.jp/docs/serial/moritalk/20121002_563400.html">&#x7B2C;27&#x8A71;&#xFF1A;&#x9AD8;&#x901F;&#x30EA;&#x30EA;&#x30FC;&#x30B9;&#x306E;&#x771F;&#x4FA1; - &#xFF03;&#x30E2;&#x30EA;&#x30C8;&#x30FC;&#x30AF; - &#x7A93;&#x306E;&#x675C;</a> があんまり気に入っていないので、自分なりの意見をまとめておこうと思う。</p>

<div class="section">
<h3>なぜ「高速リリース」にしたいのか</h3>
<p>高速リリースの真価を語るなら、「なぜそれが必要なのか」「なぜ今それが必要になっているのか」をまず明らかにしなければならないかな。たとえば、Mozilla による答えはこうだ。</p>

<blockquote cite="http://www.mozilla.jp/firefox/preview/faq/">

<div class="section">
<h5>なぜリリースサイクルを短縮するのですか？</h5>
<p>Web ブラウザは、他のアプリケーションと異なり、Web という「生き物」を相手にしています。HTML5 や CSS3 など新たな標準技術が次々に考案され、ソーシャルメディアなどのトレンドも目まぐるしく変わっています。Web の進化するスピードが速くなっているので、これまでのように半年から 1 年周期のアップデートでは間に合わなくなっているのです。</p>

</div>
<cite><a href="http://www.mozilla.jp/firefox/preview/faq/">&#x30D7;&#x30EC;&#x30EA;&#x30EA;&#x30FC;&#x30B9;&#x7248;&#x3067;&#x30D6;&#x30E9;&#x30A6;&#x30B6;&#x30FC;&#x306E;&#x65B0;&#x6A5F;&#x80FD;&#x3092;&#x8A66;&#x305D;&#x3046; | Firefox</a></cite>
</blockquote>
<p>ソフトウェアがちゃんと「生き物」を相手にしてくれるようになったとは喜ばしい限りだな！　とはいえここでいう「生き物」とは「変化する外的環境」程度の意味しかなくて、まだまだ「人間」を意味するものではないのだけど。まぁ、そこを嘆くのはやめて、今日はアップデートとは何かを少し考えてみるのでお付き合いいただきたい。</p>

</div>
<div class="section">
<h3>「リリース」とはなにか</h3>
<p>ソフトウェアにはなぜアップデート（リリース）が必要なのか。それは突き詰めると機能の「追加」と「維持」だ。</p><p><b>機能の追加</b>というのはわかりやすい。新機能の搭載や、既存機能の強化といった類のものだ。それが魅力的であれば、開発者が黙っていてもユーザーは競ってアップデートしてくれるだろう。後述の「機能の維持」と比べて主体的で能動的かつオプショナルであるという側面をもち、ユーザーはそれを受け入れるかどうかの選択権をもつ。</p><p><b>機能の維持</b>というのは、おもに「外的環境」からの要請に依る。新しい OS をサポートしなければならない、セキュリティ問題を突く攻撃が編み出されたので対応しなければならない、競合ソフトが機能強化されたのでそれに追随しなければならない、といった外的要求にこたえる受動的な側面が強く、多くの場合ユーザーにとって必要であり、できれば強制したいアップデートでもある。</p><p>もちろん、機能が削られることもある。しかし、外的要求の喪失 → 品質の維持・向上のためにはずすといった場合がほとんどだと思うので、ここでは割愛している。</p><p>「なぜリリースサイクルを短縮するのですか？」でMozilla が暗に仄めかしているのは、おもに Web アプリケーションを中心に「機能の追加」よりも「機能の維持」がより重要視される局面が多くなってきたということだろう。そこで、Mozilla は「高速リリース」にしたかった。これはユーザーにとっても歓迎すべきことのはずだけれども、なぜか反感を買ってしまった。それはなぜなのだろう。</p>

</div>
<div class="section">
<h3>「高速リリース」に必要なものは何か</h3>
<p>結論を言えば、準備不足なまま「高速リリース」へ移行してしまったからだ。</p><p>では、「高速リリース」に必要な準備とは何か。その前に、さきほど説明した「機能の追加」と「機能の維持」というアップデートが担う二つの役割と、それに応じたアップデートの方法を表にまとめてみたのでみてほしい。</p>

<table>
<tr>
<th>アップデート</th>
<th>機能の追加</th>
<td>（インストーラー）</td>
<td></td>
<th>機能の維持</th>
<td>（自動アップデート機能）</td>
</tr>
<tr>
<td>性格</td>
<td>能動的</td>
<td>ユーザーによるアップデートの選択</td>
<td></td>
<td>受動的</td>
<td>開発者からのアップデート要求</td>
</tr>
<tr>
<td>単位</td>
<td>機能の追加</td>
<td>不定期な大型アップデート</td>
<td></td>
<td>メンテナンス</td>
<td>逐次的な小規模アップデート</td>
</tr>
<tr>
<td>緊急性</td>
<td>オプショナル</td>
<td>インストーラーによる配布</td>
<td></td>
<td>必須</td>
<td>自動アップデート</td>
</tr>
</table><p>「機能の追加」を軸としたアップデートでは、開発者が機能を実装した時（不定期）に、インストーラーで配布すればよかった。一方、「機能の維持」を軸としたアップデートでは、アップデート機能を利用した小さなパッチを逐次的に配布する方法が必要になる。</p><p>しかし、そのまま配布してもユーザーはこれを受け入れてくれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121007142304.png" alt="f:id:daruyanagi:20121007142304p:plain" title="f:id:daruyanagi:20121007142304p:plain" class="hatena-fotolife" itemprop="image"></span><br />
<a href="http://gigazine.net/news/20120724-skype-upgrade-week/">&#x8AB0;&#x3082;&#x30BD;&#x30D5;&#x30C8;&#x3092;&#x66F4;&#x65B0;&#x3057;&#x3066;&#x304F;&#x308C;&#x306A;&#x3044;&#x305F;&#x3081;&#x30A2;&#x30C9;&#x30D3;&#x3084;Skype&#x304C;&#x66F4;&#x65B0;&#x30AD;&#x30E3;&#x30F3;&#x30DA;&#x30FC;&#x30F3;&#x3092;&#x958B;&#x59CB; - GIGAZINE</a><br />
</p>

<ul>
<li>「セキュリティが心配だから」</li>
<li>「時間がかかるから」</li>
<li>「更新によるメリットがないから」</li>
<li>「更新してどうなるのかわからないから」</li>
<li>「動作速度が遅くなるから」</li>
<li>「新しいバージョンにバグがいっぱいだから」</li>
</ul><p>“これまでに体験したことのない使い心地”や“誰もが驚くべき新機能”といったまるでアップルの謳い文句のような機能が毎回提供できれば、これまでのインストーラーベースのアップデートでもリリースサイクルの短縮は可能だろう。頼まないでもユーザー側から挙ってアップデートしてくれる。しかし、そんなこと到底不可能だ。</p><p>そこで重要になるのが、新機能や機能強化の訴求なしに、ユーザーをアップデートさせる仕組み――アップデート配布システム・バックグラウンドアップデート・定期アップデート――だ。</p>

<div class="section">
<h4>アップデート配布システム</h4>
<p>まず、アップデート配布システム。これは必須といっていい。どこかで拾ってきたわけのわからないアップデートプログラムを実行するより、正式なアップデート手段が公式に提供されているほうが安心だし、時間もかからない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121007152530.png" alt="f:id:daruyanagi:20121007152530p:plain" title="f:id:daruyanagi:20121007152530p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>オンラインソフトにはアップデート機能がついたものが少ないけれど、たとえば ClickOnce なんかをつければ簡単に追加することができる。使いたくない理由もだいたい察するけど、できれば活用してほしいところ。</p>

</div>
<div class="section">
<h4>バックグラウンドアップデート</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121007143113.png" alt="f:id:daruyanagi:20121007143113p:plain" title="f:id:daruyanagi:20121007143113p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に採用すべきは、いわゆる「サイレントアップデート」機能だろう。「いいえ」って選んでもどうせあとで「更新してください」って言うんでしょ？　だったらハナから黙って入ってくれたほうがいい。</p>

</div>
<div class="section">
<h4>定期的なアップデート</h4>
<p>あと、アップデートの配布がさほど緊急に必要ないのであれば、ある程度まとめて一度に配布したほうがいい。そのほうがユーザーに受け入れられやすいはずだ。</p><p>たとえば、Windows のアップデートは原則1カ月に1回で、月初めの火曜日だか水曜日に配布される。こうしてもらえれば、ユーザー側も対応しやすい。「あー、今日はアップデートの日か」。</p><p>ちなみに、高速リリースサイクルを採用している製品のおもなリリース間隔は以下の通り。</p>

<ul>
<li>Windows Update: 1回/月 <a href="#f-515a43ef" name="fn-515a43ef" title="Windows Update だって高速リリースサイクルに含めていいだろ？　なぜシカトする？">*1</a></li>
<li>Adobe Reader：1回/四半期 → 1回/月<a href="#f-7f92ad16" name="fn-7f92ad16" title="Windows Update と同じ日">*2</a></li>
<li>Mozilla Firefox/Thunderbird：1回/6週間<a href="#f-4d55a2fe" name="fn-4d55a2fe" title="今度はお正月とかぶるのでちょっとイレギュラー">*3</a></li>
<li>Adobe Flash Player: 不定期</li>
</ul><p>なお、Apple Software Update はアップデート機構をもっているけれど、日頃はセキュリティ問題を見て見ないふりをして機能追加時にこっそり修正するというポリシーなので、「逐次的な小規模アップデート」にはあたらない。Apple という会社は、こうした根本的なところで「体験」よりも「機能」に軸を置いたアップデートをしているからあんまり信用がならない。</p>

</div>
</div>
<div class="section">
<h3>「Google Chrome」の無謀と「Mozilla Firefox」の躓き</h3>
<p>アップデート配布システム＋バッググラウンドアップデートの行きつく究極形態は、「Google Chrome」がやっている“問答無用アップデート”だ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121007145101.jpg" alt="f:id:daruyanagi:20121007145101j:plain" title="f:id:daruyanagi:20121007145101j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>初めてみたときは無茶をするなぁと思ったけれど、ユーザーがなぜアップデートを嫌がるのかを考えれば非常に合理的といえる。</p>

<ul>
<li>「セキュリティが心配だから」→こっそり入れれば問題ない</li>
<li>「時間がかかるから」→バックグラウンドでこっそり入れれば気付かない</li>
<li>「更新によるメリットがないから」→メリットあるから勝手に入れるわ</li>
<li>「更新してどうなるのかわからないから」→入れてから体感しろ</li>
<li>「動作速度が遅くなるから」→こっそり入れれば気付かない</li>
<li>「新しいバージョンにバグがいっぱいだから」→こっそり入れれば（ｒｙ</li>
</ul><p>これが道義的に正しいかどうかは置いといて、ユーザーにとって不便が少ないのは認めなくてはいけないだろう。ただ、自分が管理者だったら「Google Chrome」を業務に採用しないだろう。まぁ、便利だから使ってるけどね。</p><p>だいたい、インストーラーによる配布が一般的だった時代から、ユーザーはアップデートを自分で選択できることに慣れている。加えて、社内での導入なども考えれば、ある程度アップデートはユーザー側でも管理したいところ。「Google Chrome」はその点、ちょっとやり過ぎというものだ。</p><p>一方、Mozilla はバックグラウンドアップデートの導入をせずに、定期アップデートのみを当初採用した。その結果がこれ。</p>

<blockquote>
<p>リンクを踏む → 「新しいアップデートがあります」 → 「ダウンロード中です」 → Windows「firefox.exe から応答がありません」＼ﾃﾞﾝｯ！／</p>

</blockquote>
<p>「Google Chrome」がバックグラウンドでアップデートを仕込み、素早く Web ページを開いてくれるのとは対照的。</p><p>ほかにも拡張機能のアップデートが追い付かずに次々と討ち死にしたという経緯などがあるけれど、それも含めて「当然起こりうること」への備えが足りず、いろいろ躓いてしまった感じ。</p><p>こうした「Firefox」の躓きが「高速リリース」へのネガティブな印象につながっているが、「Adobe Flash Player」のケースでは心配しなくていいと思われる。事前にちゃんとバックグラウンドアップデート機能を搭載してあるので、ユーザーへの負担は少ないはず。ただ互換性に関しては……テストが不十分なパッチを配信して世界を混沌の渦へ叩き込む恐れがないわけではない。</p><p>ちなみに、「高速リリース」になったからと言って品質テストが省かれるわけではない。なにも手抜きをするために高速化しているわけではないので・アップデートの品質と、アップデートの配布形態にはあまり関連性がないと思う。もともとテストが行き届いていないだけでアル。</p>

</div>
<div class="section">
<h3>「高速リリース」、「アジャイル」と「クイック実行」</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121004142721.jpg" alt="f:id:daruyanagi:20121004142721j:plain" title="f:id:daruyanagi:20121004142721j:plain" class="hatena-fotolife" itemprop="image"></span><br />
パワポの魔術師・長沢さんのセッションより</p><p><a href="https://blog.daruyanagi.jp/entry/2012/10/04/221735">Developer Camp 2012 Japan Fall &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x307E;&#x3057;&#x305F;&#xFF01;&#xFF08;1&#x65E5;&#x76EE;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でひとつ発見だったのは、「ほんとに“アジャイル開発”って実践してるんだ！」ということ。</p><p>自分は大規模ソフトウェア開発なんかに縁のない人間だけど、“アジャイル開発”の話を聞くたびに「ちょっと“理想論”に寄り過ぎなんじゃないかなぁ」と感じていた。でも、「Visual Studio」をはじめとする支援ツールの準備が整い、しかも“Windows Azure”なんかでも実際に行われている <a href="#f-caea1947" name="fn-caea1947" title="※ただし、Visual Studio は使っていないとのことｗ">*4</a> と聞くと、別に夢物語ではないんだ、と感じる。</p><p>考えてみれば、「リリース」の裏側にはかならず「開発」があるわけで。「高速リリース」の裏側がすべて「アジャイル」だというつもりは毛頭ないけれど、リリースサイクルを早めるならばサイクルそのものの強化も重要になるはず。なので、今後は目に見える機能やデザインだけでなくて、アジャイルに代表されるような開発・管理の手法とその実践にも目を向ける必要があるなぁ、と感じた。</p><p>あと感じたのは、ソフトウェアはどんどん“サービス”化、“オンデマンド”化しているということ。これは前からも言われているけれど、自分はちょっとその意味を軽く評価していた。ソフトウェアそのものには価値はない。ソフトウェアの機能、それが提供する経験こそが価値であり、重要だ。</p><p>実際、「Microsoft Office 2010」「Microsoft Office 2013」なんかは“クイック実行”という仕組みをもっているよね。必要な時に、それを実現するバイナリのカケラだけがネットワークから降ってくる。</p>

<blockquote cite="http://office.microsoft.com/ja-jp/products/HA101868855.aspx">
<p>クイック実行とは、マイクロソフトの仮想化およびストリーミング テクノロジを使用して、Microsoft Office をブロードバンド経由で配信したり、更新したりする新しい方法です。</p>

<cite><a href="http://office.microsoft.com/ja-jp/products/HA101868855.aspx">http://office.microsoft.com/ja-jp/products/HA101868855.aspx</a></cite>
</blockquote>

<blockquote cite="http://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0">
<p>アプリケーションストリーミング（英: Application Streaming）は、アプリケーションのインストールイメージについて、その各部の実行順序、依存関係等を解析し、その解析結果に基づいてバイナリを小さな単位（通常4キロバイト）に分割し、それをストリーミングサーバと呼ばれるサーバ上に登録し、クライアント側におけるユーザによるアプリケーション操作に応じて、その操作に必要なバイナリ部分を逐次配信するという方法である。</p>

<cite><a href="http://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0">&#x30A2;&#x30D7;&#x30EA;&#x30B1;&#x30FC;&#x30B7;&#x30E7;&#x30F3;&#x30B9;&#x30C8;&#x30EA;&#x30FC;&#x30DF;&#x30F3;&#x30B0; - Wikipedia</a></cite>
</blockquote>
<p>もはや、更新と実行の区別すらあやふやになってくる。こういうのをみると、ほんと、いまのソフトウェアはりナマモノだと感じるよね。「生き物」を相手にするには、それ自体も「生き物」に近づいていく必要があるらしい。もちろん、全部が全部こうしたナマモノになっていくわけではないけれど、今後ますますこうした新鮮なナマモノとしてのソフトウェアが多くなってくるのだろう。</p><p>では、あらためて。「高速リリースの真価」とはなにか。</p><p>ひとつは、「高速リリース」で得られるもの。より新しくて、安定・安全で、使いやすい。そんな新鮮なナマモノとしてのアプリケーションがネットワークを通じて瞬時にデリバリーされること。これは明らかに「高速リリース」の“真価”といえる。</p><p>ただ、これだけではない。「高速リリース」というデリバリーの仕組みそのものがアプリケーションの評価につながっていることにも注目したい。単にアップデート配布の仕組みだけに留まらず、アプリケーションライフサイクルそのものの維持・強化、貢献者と利用者の数と質の維持。これからはこういったものすべてがアプリケーションの価値に関わってくる。いわば、「総力戦」の時代に突入してきたのではないかな。それを示してくれたというのも、ひとつの“真価”として評価していい。</p><p>ソフトウェアをひとつ選択すれば、それにロックインされて長く使い続けなければならない場合も多い。だから、今目に見える価値だけでなく、そのビジョンや継続可能性にも目を配るべき時代になっていると感じる。</p><p>趣味プログラマーにとっては、もう想像もつかない世界だよｗ</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-515a43ef" name="f-515a43ef" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">Windows Update だって高速リリースサイクルに含めていいだろ？　なぜシカトする？</span></p>
<p class="footnote"><a href="#fn-7f92ad16" name="f-7f92ad16" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">Windows Update と同じ日</span></p>
<p class="footnote"><a href="#fn-4d55a2fe" name="f-4d55a2fe" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">今度はお正月とかぶるのでちょっとイレギュラー</span></p>
<p class="footnote"><a href="#fn-caea1947" name="f-caea1947" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">※ただし、Visual Studio は使っていないとのことｗ</span></p>
</div>