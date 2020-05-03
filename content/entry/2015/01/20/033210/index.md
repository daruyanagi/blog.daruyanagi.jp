---
date: 2015-01-20T03:32:10.0000000
draft: false
title: "あちこちスクレイピングして、松山の鉄道・船・飛行機の運行状況をまとめるサイトを作ってみた"
tags: ["WebMatrix", "Windows Azure"]
eyecatch: 20150120025457.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150120025457.png" alt="f:id:daruyanagi:20150120025457p:plain" title="f:id:daruyanagi:20150120025457p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li><a href="http://ehime-traffic.azurewebsites.net/">http://ehime-traffic.azurewebsites.net/</a></li>
</ul><p>WebMatrix + Azure Web サイト（<a href="http://www.microsoft.com/ja-jp/mic/bizspark/">&#x30DE;&#x30A4;&#x30AF;&#x30ED;&#x30BD;&#x30D5;&#x30C8;&#x306E;&#x30AF;&#x30E9;&#x30A6;&#x30C9;&#x74B0;&#x5883;&#x3084;&#x958B;&#x767A;&#x30C4;&#x30FC;&#x30EB;&#x3092;&#x7121;&#x511F;&#x63D0;&#x4F9B; | Microsoft BizSpark</a>、ありがとう！）で愛媛・松山の鉄道・船・飛行機の運行状況を集約したサイトを作ってみました（飛行機の英語の綴りミスなんかがボロボロ見つかる程度の成熟度です）。誰の役に立つというものでもないですが、自分的には満足です。そのうちわざわざサイトに行くのも面倒になると思うので、ゆくゆくは Twitter の BOT か何か作って、情報をプッシュできるようにしたいですね。</p><p>このサイトの情報は、大きく分けて二つの方法で取得しています。</p>

<ul>
<li>サイトをスクレイピングして情報取得（鉄道、船、JAL）</li>
<li>（非公開）API を叩いて JSON から情報取得（ANA、ピーチ）</li>
<li>（ジェットスターだけはうまくいかなかった！　今度誰か教えて！<a href="#f-787436cb" name="fn-787436cb" title="幸い JAL とのコードシェアなので、そっちから情報を取得">*1</a>）</li>
</ul><p>スクレイピングで面倒だったのは、情報の形式が一定していないこと、文字コードがバラバラなこと（ローカルでテストしているときは文字化けしないのに、クラウドで動かすと文字化けすることもあった）でしょうか。とくに情報の形式が一定していないのはしんどいですね。イレギュラーなケースを見つけるたびにデータ標準化のための処理が膨れ上がっていくので、最後は妥協、妥協、妥協。ペライチのページにコードをべた書きして、それをまとめていくという開発手法は WebMatrix が得意とする分野だと思うけれど、最後のほうはちょっと力不足かなって感じもしました。まぁ、そんなときはサクッと Visual Studio に切り替えちゃうんですけど。</p>

<div class="section">
<h3>開発の流れ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150120031218.png" alt="f:id:daruyanagi:20150120031218p:plain" title="f:id:daruyanagi:20150120031218p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>運行情報のページをブラウザーでみる。ブラウザーの開発者ツールで DOM をみたり、リクエスト・レスポンスをみたりしながら、静的ページであればスクレイピング、ページを動的に組み立てているなら API を探してそれを叩いてみるという感じ。</p><p>スクレイピングであれば、<a href="https://www.nuget.org/packages/HtmlAgilityPack">NuGet Gallery | HtmlAgilityPack 1.4.9</a> が超簡単。XPath でノードを指定してサクッと中身を取ってこれる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> (var client = <span class="synStatement">new</span> WebClient())
{
var response = client.DownloadString(url);
var json = Json.Decode(response);

var doc = <span class="synStatement">new</span> HtmlAgilityPack.HtmlDocument();
doc.LoadHtml(doc)

<span class="synComment">// &lt;div class=&quot;ss_comment&quot;&gt;ここがほしいやで&lt;/div&gt;</span>
var message = doc.DocumentNode
.SelectSingleNode(<span class="synSpecial">@</span><span class="synConstant">&quot;//div[@class=&quot;&quot;ss_coment&quot;&quot;]&quot;</span>)
.InnerText;

@ObjectInfo.Print(json)
}
</pre><p>これが使えないならば、正規表現で頑張ることになるのかな。今回はそこまでしなければならないケースはなかった。</p><p>非公開 API があるのならば、JSON Helper が便利。Chrome の場合、開発者ツールの［Network］タブでリクエスト・レスポンスをみると、内部 API らしきものが見るかる。今回見つけたなかでは、ANA が出発・到着空港の天気までとれる重量級。一方、ピーチは割と扱いやすい感じ（ASP.NET っぽかった）。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> (var client = <span class="synStatement">new</span> WebClient())
{
var response = client.UploadString(url, postData);
var json = Json.Decode(response);

@ObjectInfo.Print(json)
}
</pre><p>ObjectInfo.Print で Json オプジェクトの中身をみながら、自分が使いやすいようにデータを取捨・加工する。</p><p>コーディング自体はとても簡単で、開発時間のほとんどは API のパラメーター解析に費やされた。</p>

</div>
<div class="section">
<h3>これから</h3>
<p>閲覧時に情報を取りに行く設計になっているので、キャッシュが効いていない場合にロードがとても遅い。相手にも負荷がかかって迷惑<a href="#f-bb29751c" name="fn-bb29751c" title="本当に迷惑になりそうな、体力がなさげなサイトにはすでに対策を入れてある">*2</a>なので、バックグラウンドで情報を取得するようにしたい。Twitter BOT にするにも必要な処理だし。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-787436cb" name="f-787436cb" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">幸い JAL とのコードシェアなので、そっちから情報を取得</span></p>
<p class="footnote"><a href="#fn-bb29751c" name="f-bb29751c" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">本当に迷惑になりそうな、体力がなさげなサイトにはすでに対策を入れてある</span></p>
</div>