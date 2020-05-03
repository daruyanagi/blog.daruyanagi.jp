---
date: 2012-06-25T21:45:55.0000000
draft: false
title: "Windows Azure Web Sites でサクッと WordPress をセットアップしてみた"
tags: ["Windows Azure", "WordPress"]
eyecatch: 
---
<p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%20Azure">Windows Azure</a> Web Sites でサクッと <a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a> をセットアップしてみたよ。案外サクッといったので、別に説明することもなかった。 <a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%20Live">Windows Live</a> ID <a href="#f1" name="fn1" title="Microsoft ID になるんだっけ？">*1</a> とクレジットカード <a href="#f2" name="fn2" title="いきなり課金されることはないはず……">*2</a> が必要になるので、あらかじめ用意しておくこと。<a href="http://www.windowsazure.com/ja-jp/">
<br />
Windows Azure: Microsoft&#39;s Cloud Platform | Cloud Hosting | Cloud Services
<br />
</a></p>

<div class="section">
<h3>3ヶ月無償評価版の登録</h3>
<p><img src="20120625210606.png" alt="f:id:daruyanagi:20120625210606p:plain" title="f:id:daruyanagi:20120625210606p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%20Azure">Windows Azure</a> は3ヶ月無償で利用できるのだそうな。本番ではいくらかかるんだろう……この3ヶ月のうちにシミュレートできるといいのだけど。</p><p><img src="20120625210611.png" alt="f:id:daruyanagi:20120625210611p:plain" title="f:id:daruyanagi:20120625210611p:plain" class="hatena-fotolife"></p><p>本人確認のためにクレジットカードがいるんだって。ここは素直に登録登録。</p><p><img src="20120625210609.png" alt="f:id:daruyanagi:20120625210609p:plain" title="f:id:daruyanagi:20120625210609p:plain" class="hatena-fotolife"></p><p>設定はこれだけ。さっそく［管理］っていうところをクリックしてみる。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/HTML5">HTML5</a> で作成された <a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%20Azure">Windows Azure</a> の新しいポータル画面</h3>
<p><img src="20120625210610.png" alt="f:id:daruyanagi:20120625210610p:plain" title="f:id:daruyanagi:20120625210610p:plain" class="hatena-fotolife"></p><p>以前までは <a class="keyword" href="http://d.hatena.ne.jp/keyword/Silverlight">Silverlight</a> で作られていたという話だけど、新しいプレピューポータルは <a class="keyword" href="http://d.hatena.ne.jp/keyword/HTML5">HTML5</a> で制作されている。<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AF%A5%ED%A5%B9%A5%D6%A5%E9%A5%A6%A5%B6">クロスブラウザ</a>ーでヌルヌル動くのが気持ちいいですね。</p><p><img src="20120625210615.png" alt="f:id:daruyanagi:20120625210615p:plain" title="f:id:daruyanagi:20120625210615p:plain" class="hatena-fotolife"><img src="20120625210613.png" alt="f:id:daruyanagi:20120625210613p:plain" title="f:id:daruyanagi:20120625210613p:plain" class="hatena-fotolife"><img src="20120625210618.png" alt="f:id:daruyanagi:20120625210618p:plain" title="f:id:daruyanagi:20120625210618p:plain" class="hatena-fotolife"><img src="20120625210620.png" alt="f:id:daruyanagi:20120625210620p:plain" title="f:id:daruyanagi:20120625210620p:plain" class="hatena-fotolife"><img src="20120625210621.png" alt="f:id:daruyanagi:20120625210621p:plain" title="f:id:daruyanagi:20120625210621p:plain" class="hatena-fotolife"></p><p>ウィザードでチュートリアルが表示される。だいたいの使い方をこれで把握できる感じ。まぁ、実際に使ったほうが覚えるのは早いと思う。ぱっと見わかりやすいしね。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a> の設置</h3>
<p><img src="20120625210623.png" alt="f:id:daruyanagi:20120625210623p:plain" title="f:id:daruyanagi:20120625210623p:plain" class="hatena-fotolife"></p><p>さっきのチュートリアルで、新規プロジェクトは左下の［New］アイコンから、と書いてあった気がするのでそれを選択。</p><p><img src="20120625210622.png" alt="f:id:daruyanagi:20120625210622p:plain" title="f:id:daruyanagi:20120625210622p:plain" class="hatena-fotolife"></p><p>まずは［Web Sites］を選択し……</p><p><img src="20120625210627.png" alt="f:id:daruyanagi:20120625210627p:plain" title="f:id:daruyanagi:20120625210627p:plain" class="hatena-fotolife"></p><p>次に［From Gallery］と続き……</p><p><img src="20120625210632.png" alt="f:id:daruyanagi:20120625210632p:plain" title="f:id:daruyanagi:20120625210632p:plain" class="hatena-fotolife"></p><p>ギャラリーの中から <a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a> をチョイス。 <a class="keyword" href="http://d.hatena.ne.jp/keyword/C%23">C#</a> しかわかんないし Orchard <a class="keyword" href="http://d.hatena.ne.jp/keyword/CMS">CMS</a> も考えたのだけど、まぁ、最初はやはり実績のある <a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a> かなぁ、と。ほかにもいっぱいありそうだ。</p><p><img src="20120625210631.png" alt="f:id:daruyanagi:20120625210631p:plain" title="f:id:daruyanagi:20120625210631p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B5%A5%D6%A5%C9%A5%E1%A5%A4%A5%F3">サブドメイン</a>とリージョンの選択。まだアジアのリージョンはないんだな……アメリカ西海岸が無難そうだ。</p><p><img src="20120625210637.png" alt="f:id:daruyanagi:20120625210637p:plain" title="f:id:daruyanagi:20120625210637p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/MySQL">MySQL</a> サーバーの設定。データベース名は……ほかとかぶらなければなんでもいいんじゃないかな。</p><p><img src="20120625210639.png" alt="f:id:daruyanagi:20120625210639p:plain" title="f:id:daruyanagi:20120625210639p:plain" class="hatena-fotolife"></p><p>できたっぽい。デプロイは1分もかからなかったと思う。</p><p><img src="20120625210651.png" alt="f:id:daruyanagi:20120625210651p:plain" title="f:id:daruyanagi:20120625210651p:plain" class="hatena-fotolife"></p><p>あとは管理者アカウントの設定をすれば、見慣れた <a class="keyword" href="http://d.hatena.ne.jp/keyword/WordPress">WordPress</a> のサイトが現れる。ぶっちゃけ、裏が <a class="keyword" href="http://d.hatena.ne.jp/keyword/Windows%20Azure">Windows Azure</a> だってことを意識しなければ、ユーザーインターフェイスがカッコいい普通の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%BF%A5%EB%A5%B5%A1%BC%A5%D0">レンタルサーバ</a>ーって感じだ。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">Microsoft ID になるんだっけ？</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">いきなり課金されることはないはず……</span></p>
</div>