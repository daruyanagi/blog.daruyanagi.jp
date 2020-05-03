---
date: 2013-03-20T06:47:53.0000000
draft: false
title: "ASP.NET Web ページとは"
tags: ["ASP.net Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130320/20130320053155.gif" alt="f:id:daruyanagi:20130320053155g:plain" title="f:id:daruyanagi:20130320053155g:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://msdn.microsoft.com/ja-jp/library/fddycb06(v=vs.100).aspx">ASP.NET Web &#x30DA;&#x30FC;&#x30B8;</a> （ASP.NET Web Pages）という技術をほかの人に説明するとき、どうすればいいんだろう？　と最近考えているけど、ぶっちゃけよくわからん。</p><p>一応 MSDN ではこのように紹介されている。</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/428509ah(v=vs.100).aspx">
<p>ASP.NET Web ページは、Web アプリケーションのプログラミング可能なユーザー インターフェイスとして使用します。 ASP.NET Web ページは、ブラウザーまたはクライアント デバイスでユーザーに情報を表示し、サーバー側コードを使用してアプリケーション ロジックを実装します。 ASP.NET Web ページの特徴を次に示します。</p>

<ul>
<li>Microsoft の ASP.NET テクノロジに基づいており、サーバー上で動作するコードがブラウザーまたはクライアント デバイスに対して動的に Web ページ出力を生成します。</li>
<li>すべてのブラウザーまたはモバイル デバイスと互換性があります。 ASP.NET Web ページは、スタイルやレイアウトなどの機能に対して正しいブラウザー準拠 HTML を自動的に表示します。</li>
<li>Microsoft Visual Basic や Microsoft Visual C# など、.NET 共通言語ランタイムによってサポートされているすべての言語と互換性があります。</li>
<li>Microsoft .NET Framework 上に構築されています。 これにより、マネージ環境、タイプ セーフ、継承などのフレームワークの利点を利用できます。</li>
<li>高い柔軟性。ユーザーが作成したコントロールやサードパーティ製のコントロールを Web フォーム ページに追加できます。</li>
</ul>
<cite><a href="http://msdn.microsoft.com/ja-jp/library/428509ah(v=vs.100).aspx">ASP.NET Web &#x30DA;&#x30FC;&#x30B8;&#x306E;&#x6982;&#x8981;</a></cite>
</blockquote>
<p>なるほど、よくわからん。</p><p>困ったので、今度は緑タイツ（の片割れ）が授けてくれた“秘伝の書”（P.24）を開いてみた。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4822294544/bestylesnet-22/"><img src="http://ecx.images-amazon.com/images/I/51rOHjYuDwL._SL160_.jpg" class="hatena-asin-detail-image" alt="プログラミングMicrosoft ASP.NET 4 (マイクロソフト公式解説書)" title="プログラミングMicrosoft ASP.NET 4 (マイクロソフト公式解説書)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4822294544/bestylesnet-22/">プログラミングMicrosoft ASP.NET 4 (マイクロソフト公式解説書)</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> ディノエスポシト,クイープ</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> 日経BP社</li><li><span class="hatena-asin-detail-label">発売日:</span> 2012/01/26</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本</li><li><span class="hatena-asin-detail-label">購入</span>: 2人 <span class="hatena-asin-detail-label">クリック</span>: 8回</li><li><a href="http://d.hatena.ne.jp/asin/4822294544/bestylesnet-22" target="_blank">この商品を含むブログ (4件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

<div class="section">
<h3>Web Forms、MVC、Web Pages</h3>

<blockquote>
<p>ASP.NET Web Forms は、どちらかと言えば、開発者やソフトウェア技術者にとって受け入れやすいものでした。ASP.NET MVC の場合は、少し余分な作業が必要になり、試行錯誤による習得や発見はまったくうまくいきません。では、ASP.NET の世界に飛び込むためのハードルはどれくらい高いのでしょうか。</p><p>ASP.NET には Web Pages という新しいアプローチがあります。ASP.NET Web Pages はプロの開発者を対象としたフレームワークではありませんが、やはり ASP.NET プラットフォームの一部であり、今後も更新されていく予定です。</p>

</blockquote>
<p>文脈を端折っているためよくわからない部分もあるが、つまり、</p>

<ul>
<li><b>ASP.NET</b>：.NET Framework を基盤とした Web アプリケーション開発のためのプラットフォーム</li>
</ul><p>であり、その上には歴史的に古い順に</p>

<ul>
<li><b>ASP.NET Web Forms</b>：「Visual Studio」＋「Windows Forms」によるコントロールの“ポトペタ”<a href="#f1" name="fn1" title="たとえば、ボタンをドラッグ＆ドロップでフォームに配置して、イベントハンドラをゴリゴリ書いていくスタイル">*1</a>開発の Web アプリ版。最初は Web のことがあまりわからなくても、用意されたパーツを組み合わせるトップダウン型の手法でサクサク開発できるけど、裏で生成される HTML コードは複雑怪奇でゲロ汚い。</li>
<li><b>ASP.NET MVC</b>：Ruby on Rails などの MVC フレームワークに影響を受けて生まれる。コードを重ねながら複雑さを増していくボトムアップ型。エレガントにしてスケーラブルだけど、ちょっとゴテゴテして大げさな感じ。規約（約束事）ベースなので、最初は覚えることが多い……。</li>
</ul><p>というフレームワークが追加されてきた。でも、こいつらはいかんせんデカい。パワフルだけれど、小回りが利かない。というわけで、</p>

<ul>
<li><b>ASP.NET Web Pages</b>：ASP.NET MVC の大げさな部分を取り去った軽量な、どちらかといえば初心者向けフレームワーク</li>
</ul><p>が生まれたというわけ。</p><p>Web Forms が一体成型のプレートアーマー、MVC をいろんなパーツから成る着脱式の日本鎧とするなら、Web Pages はさしずめ忍者スーツやな。</p><p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B002DOJX5E/bestylesnet-22/"><img src="http://ecx.images-amazon.com/images/I/51a53BXfPUL._SL160_.jpg" class="hatena-asin-detail-image" alt="本格大人用忍者スーツセット Mサイズ・ロゴ無し" title="本格大人用忍者スーツセット Mサイズ・ロゴ無し"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B002DOJX5E/bestylesnet-22/">本格大人用忍者スーツセット Mサイズ・ロゴ無し</a></p><ul><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> しのびや.com</li><li><span class="hatena-asin-detail-label">メディア:</span> その他</li><li><a href="http://d.hatena.ne.jp/asin/B002DOJX5E/bestylesnet-22" target="_blank">この商品を含むブログを見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p>

</div>
<div class="section">
<h3>小さく、単純で、シームレス</h3>

<blockquote>
<p>ASP.NET Web Pages の対象となるユーザーはソフトウェアの専門家ではありません。また、作成するサイトは極めて単純なので、非常に単純なプロジェクトに従事する Web 開発者が対象となります。このユーザーは、</p>

<ul>
<li>単一ページモデル</li>
<li>コードとビューを記述するために単純化された方法（要は Razor 記法）</li>
</ul><p>といった、さらなる単純さの恩恵を受けることになります。ASP.NET Web Pages には、</p>

<ul>
<li>WebMatrix という IDE</li>
<li>IIS Express という IIS の簡易バージョン</li>
</ul><p>が含まれています。特に WebMatrix は、サーバーコード、マークアップ、データベーステーブルを1つのデザイナー環境にまとめて、</p>

<ul>
<li>ページの記述</li>
<li>サイトへの発行</li>
</ul><p>をワンステップで行えるようにします。</p>

</blockquote>
<p>ASP.NET は当初、おもにエンタープライズ向けだったので<a href="#f2" name="fn2" title="たぶん、知らんけど">*2</a>、最初からコンポーネント化（Web Forms）や役割の分担（MVC）を図った大規模フレームワークがドーンとあった。でも、それだけでは初心者が足を踏み入れ難い。大規模な Web サイトならともかく、“ペラいち”<a href="#f3" name="fn3" title="紙一枚の意">*3</a>の Web サイトまで Web Forms や MVC で作るなんて、ちょっとメンドクサイというか、意味ワカンナイ。</p><p>その点、Web Pages は“ごちゃ混ぜ”だけど単純。基本的に、1ファイルのソースコードが 1つの Web ページ。ロジックもビューも一緒に書いちゃう（<b>コードとビューの結合</b>）。でも、ちょっとした用途ならば、むしろこれがわかりやすい。</p><p>Perl や PHP、Ruby がそこから初めて大規模なフレームワークを載せていくように進化したのとはまったく逆のベクトルで生まれているのが、ちょっと面白いかも。 </p>

</div>
<div class="section">
<h3>まとめ</h3>
<p>ASP.NET Web ページというのは、その名の通り<i>“Web ページを書くための ASP.NET 技術”</i>で、ほとんど Razor 構文のことです。たぶん。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">たとえば、ボタンをドラッグ＆ドロップでフォームに配置して、イベントハンドラをゴリゴリ書いていくスタイル</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">たぶん、知らんけど</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">紙一枚の意</span></p>
</div>