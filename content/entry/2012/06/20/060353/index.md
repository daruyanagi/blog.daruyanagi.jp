---
date: 2012-06-20T06:03:53.0000000
draft: false
title: "WebMatrix 2 RC でサクッとWebサイトをオシャレにしてみた"
tags: ["WebMatrix", "ASP.NET"]
eyecatch: 
---
<p><img src="20120620051736.png" alt="f:id:daruyanagi:20120620051736p:plain" title="f:id:daruyanagi:20120620051736p:plain" class="hatena-fotolife"></p><p>みてくれたまえ。これが昨日までの <a href="http://download.daruyanagi.net/">http://download.daruyanagi.net/</a> だ。ワイルドだろ？<a href="#f1" name="fn1" title="TVみないので、ネタに影響されるのが人よりかなり遅れております">*1</a>　さすがにこれを放置するのも何なので、<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2.0 <a class="keyword" href="http://d.hatena.ne.jp/keyword/Release%20Candidate">Release Candidate</a> でキレイにしてみることにした。</p>

<div class="section">
<h3>なにはともあれインストール</h3>
<p><img src="20120620052143.png" alt="f:id:daruyanagi:20120620052143p:plain" title="f:id:daruyanagi:20120620052143p:plain" class="hatena-fotolife"></p><p>まず、<a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2 を <a href="http://www.microsoft.com/web/webmatrix/next/">
<br />
WebMatrix 2
<br />
</a> からダウンロードしてくれたまえ。うちの場合は、なんか2・3回インストーラーを実行するハメになったけど（なんでだ？）、まぁ、すんなり入る。</p>

</div>
<div class="section">
<h3>Webサイト側でリモート管理を有効にする</h3>
<p><img src="20120620052554.png" alt="f:id:daruyanagi:20120620052554p:plain" title="f:id:daruyanagi:20120620052554p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%EC%A5%F3%A5%BF%A5%EB%A5%B5%A1%BC%A5%D0">レンタルサーバ</a>ーはもちろん、<a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> がお安く使える <a href="http://www.epw.jp/">
<br />
&#x9AD8;&#x6A5F;&#x80FD;&#x30FB;&#x6FC0;&#x5B89; Windows &#x30EC;&#x30F3;&#x30BF;&#x30EB;&#x30B5;&#x30FC;&#x30D0;&#x30FC; ExpressWeb
<br />
</a> を使ってるよな？　Web配置で楽をしましょう。</p><p><img src="20120620052701.png" alt="f:id:daruyanagi:20120620052701p:plain" title="f:id:daruyanagi:20120620052701p:plain" class="hatena-fotolife"></p><p>設定ファイルをダウンロードしておくとあとで捗る。</p>

</div>
<div class="section">
<h3>Webサイトのダウンロード</h3>
<p><img src="20120620052847.png" alt="f:id:daruyanagi:20120620052847p:plain" title="f:id:daruyanagi:20120620052847p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> でリモートサイトを開く。さっきダウンロードしておいた設定ファイルを読みこめば、かなり楽ちん。リモート管理のアカウント情報を入力するだけで済む。</p><p><img src="20120620052958.png" alt="f:id:daruyanagi:20120620052958p:plain" title="f:id:daruyanagi:20120620052958p:plain" class="hatena-fotolife"><img src="20120620053105.png" alt="f:id:daruyanagi:20120620053105p:plain" title="f:id:daruyanagi:20120620053105p:plain" class="hatena-fotolife"></p><p>無事接続できた。このまま作業をしてもいいのだけど、やっぱりローカルにコピーを作っておいたほうが何かと安全なのでダウンロードしておく。</p><p><img src="20120620053200.png" alt="f:id:daruyanagi:20120620053200p:plain" title="f:id:daruyanagi:20120620053200p:plain" class="hatena-fotolife"><img src="20120620053206.png" alt="f:id:daruyanagi:20120620053206p:plain" title="f:id:daruyanagi:20120620053206p:plain" class="hatena-fotolife"><img src="20120620053211.png" alt="f:id:daruyanagi:20120620053211p:plain" title="f:id:daruyanagi:20120620053211p:plain" class="hatena-fotolife"><img src="20120620053217.png" alt="f:id:daruyanagi:20120620053217p:plain" title="f:id:daruyanagi:20120620053217p:plain" class="hatena-fotolife"><img src="20120620053223.png" alt="f:id:daruyanagi:20120620053223p:plain" title="f:id:daruyanagi:20120620053223p:plain" class="hatena-fotolife"><img src="20120620053229.png" alt="f:id:daruyanagi:20120620053229p:plain" title="f:id:daruyanagi:20120620053229p:plain" class="hatena-fotolife"></p><p>これがやたら時間かかる。なぜか使ってもいない <a class="keyword" href="http://d.hatena.ne.jp/keyword/MySQL">MySQL</a> もインストールされるし。まぁ、細かいことは気にしない。 <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> 4 のインストールにも失敗したけど、とくに問題なく動いているみたい。</p><p><blockquote class="twitter-tweet" data-in-reply-to="214925063458275330" lang="ja"><p>@<a href="https://twitter.com/daruyanagi">daruyanagi</a> そういう時は、<a class="keyword" href="http://d.hatena.ne.jp/keyword/MySQL">MySQL</a>のサイトで日本のサーバーから落とすのが早いっす。</p>&mdash; ウェブマトリクスマンさん (@WebMatrixMan) <a href="https://twitter.com/WebMatrixMan/status/214940986089017344" data-datetime="2012-06-19T04:41:39+00:00">6月 19, 2012</a></blockquote><script src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>WebMatrixman はほんとデキる子だな。</p>

</div>
<div class="section">
<h3>Git for <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> のインストール</h3>
<p><img src="20120620053912.png" alt="f:id:daruyanagi:20120620053912p:plain" title="f:id:daruyanagi:20120620053912p:plain" class="hatena-fotolife"></p><p>この作業はスキップしていいのだけど、どうせならバージョン管理できるようにしておけば<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%ED%A1%BC%A5%EB%A5%D0%A5%C3%A5%AF">ロールバック</a>とか楽になるよね。というわけで、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%B3%C8%C4%A5%B5%A1%C7%BD">拡張機能</a>ギャラリーから「Git for <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a>」をインストールしておく。</p><p><img src="20120620054028.png" alt="f:id:daruyanagi:20120620054028p:plain" title="f:id:daruyanagi:20120620054028p:plain" class="hatena-fotolife"><img src="20120620054031.png" alt="f:id:daruyanagi:20120620054031p:plain" title="f:id:daruyanagi:20120620054031p:plain" class="hatena-fotolife"></p><p>リリース当初はハングアップしたりして大変だったけど、週明けのバージョンアップでかなり使えるようになった。</p>

</div>
<div class="section">
<h3><a class="keyword" href="http://d.hatena.ne.jp/keyword/Twitter">Twitter</a> Bootstrap のインストール</h3>
<p><img src="20120620054150.png" alt="f:id:daruyanagi:20120620054150p:plain" title="f:id:daruyanagi:20120620054150p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2 では NuGet もよりお手軽に利用できるようになっている。どこかの誰かが作ってくれた便利ツールが自由に使えるというわけだ！　使わないなんて損、損。今回は、デザインセンスのない開発者御用達の<a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF">フレームワーク</a> <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a> を利用してみた。 <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> 2 は LESS なんかも扱えるから、今後はカスタマイズ可能な Bootstrap なんかも利用できるようになるかも。夢が広がる……</p>

</div>
<div class="section">
<h3>コーディング</h3>
<p>さて、ようやくコーディングのお時間なのだけど……基本的には <a href="http://twitter.github.com/bootstrap/examples/hero.html">Bootstrap, from Twitter</a> （サンプル）の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9">ソースコード</a>をガバっとコピペしてチョチョイのちょいとイジるだけ。一瞬で終わってしまった。</p>

<div class="section">
<h4>_Layout.cshtml</h4>
<p><img src="20120620054808.png" alt="f:id:daruyanagi:20120620054808p:plain" title="f:id:daruyanagi:20120620054808p:plain" class="hatena-fotolife"><img src="20120620054809.png" alt="f:id:daruyanagi:20120620054809p:plain" title="f:id:daruyanagi:20120620054809p:plain" class="hatena-fotolife"></p><p>Webページのひな形。</p><p>それぞれのWebページの内容を挿入する場所に`@RenderBody()`を埋め込んでおく。ついでに、サイト名や作者名なんかは冒頭の`@{ }`セクションで変数にしておくと、あとで管理するのが楽になる。スクリプトや<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%BF%A5%A4%A5%EB%A5%B7%A1%BC%A5%C8">スタイルシート</a>のパスを /Scripts や /Content に書き換えておくのを忘れずに。</p>

</div>
<div class="section">
<h4>Index.cshtml</h4>
<p><img src="20120620055120.png" alt="f:id:daruyanagi:20120620055120p:plain" title="f:id:daruyanagi:20120620055120p:plain" class="hatena-fotolife"></p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Layout = <span class="synConstant">&quot;~/_Layout.cshtml&quot;</span>;
}
</pre><p>でレイアウトを指定し、レイアウトの `@RenderBody()` を書いていく感じ。 <a href="http://twitter.github.com/bootstrap/examples/hero.html">Bootstrap, from Twitter</a> の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9">ソースコード</a>で言えば、 `&lt;div class="container"&gt;` のヘッダー以外の部分をココにコピーして自分なりに書き換えていく。</p><p>あとは、同じ要領でページを増やしていけばいい。 About.cshtml を書けば download.daruyanagi.net/About になるし、 Contact.cshtml を書けば download.daruyanagi.net/Contact になる。レイアウトを指定すれば、見栄えも共通化できる。</p>

</div>
</div>
<div class="section">
<h3>完成！</h3>
<p><img src="20120620055619.png" alt="f:id:daruyanagi:20120620055619p:plain" title="f:id:daruyanagi:20120620055619p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> だったら、IE/<a class="keyword" href="http://d.hatena.ne.jp/keyword/Chrome">Chrome</a>/<a class="keyword" href="http://d.hatena.ne.jp/keyword/Firefox">Firefox</a>どころか、モバイルOSシミュレーターでもテストできる！　Bootstrap は MediaQuery でモバイルからも快適に閲覧できるけど、それをシミュレーターで確かめられる。</p><p>実際のコーディングはものの10分ぐらい。動的サイトも作れるし、その時、<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D5%A5%EC%A1%BC%A5%E0%A5%EF%A1%BC%A5%AF">フレームワーク</a>を<a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a>/<a class="keyword" href="http://d.hatena.ne.jp/keyword/PHP">PHP</a>/Node.js のなかから自由に選べるのがナイス。 Azure へのデプロイもできるみたいなので、次は試してみたい。</p>

</div>
<div class="section">
<h3>参考</h3>

<ul>
<li><a href="http://blogs.msdn.com/b/chack/archive/2012/06/19/new-features-webmatrix-2-osc-2012-hokkaido-session-follow-up.aspx">
WebMatrix 2 &#x65B0;&#x6A5F;&#x80FD; &#xFF5E; OSC 2012 Hokkaido &#x30BB;&#x30C3;&#x30B7;&#x30E7;&#x30F3; &#x30D5;&#x30A9;&#x30ED;&#x30FC;&#x30A2;&#x30C3;&#x30D7; (&#x305D;&#x306E;&#xFF11;) &#xFF5E; - THE TRUTH IS OUT THERE - Site Home - MSDN Blogs
</a></li>
</ul>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">TVみないので、ネタに影響されるのが人よりかなり遅れております</span></p>
</div>