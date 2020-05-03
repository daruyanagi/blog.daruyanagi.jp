---
date: 2013-07-17T05:47:40.0000000
draft: false
title: "WebMatrix 3 で Wiki クローンを作る vol.0"
tags: ["WebMatrix 3 で Wiki クローンを作る", "WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130717/20130717051313.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717051313.png" alt="f:id:daruyanagi:20130717051313p:plain" title="f:id:daruyanagi:20130717051313p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="http://tam.qmix.org/wiki/Minki00.html">
<p>Ruby on Railsには良くかけたチュートリアルがあって、最初の一歩は踏み出 しやすいようになっています。しかし、チュートリアルをひととおり読んで、 scaffoldスゲーということはわかったのだけど、次に何をしたら良いかわから ないという人が多いようです。かくいう筆者もその一人でした。</p>

<cite><a href="http://tam.qmix.org/wiki/Minki00.html">http://tam.qmix.org/wiki/Minki00.html</a></cite>
</blockquote>
<p>昔、Web アプリが作りたいなぁ、と思って手を出したのが Ruby on Rails でした。このサイトを参考にしながら、少しずつ Wiki を作って勉強したのを覚えています。当時は C# で Web アプリが書けるというのを知らなかったし、その環境も整っていなかった。なので、わざわざいちから Ruby という新しい言語を覚える必要がありました。それはそれで楽しいことだったし、今でもその経験は役に立っているのですけど、やっぱり使い慣れた C# で書けるならばそれに越したことはない。</p><p>今なら C# で Web アプリが簡単に作れる WebMatrix という優秀なツールがあります<a href="#f-f61de386" name="fn-f61de386" title="ほかにもできるけど、そっちを推すのはほかの人に任せる">*1</a>。でも、僕がかつてお世話になったチュートリアル的なコンテンツはまだまだ少ないのが現状です。</p><p>んなわけで、“WebMatrix 3 で Wiki クローンを作る（<a href="https://blog.daruyanagi.jp/category/WebMatrix%203%20%E3%81%A7%20Wiki%20%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%B3%E3%82%92%E4%BD%9C%E3%82%8B">WebMatrix 3 &#x3067; Wiki &#x30AF;&#x30ED;&#x30FC;&#x30F3;&#x3092;&#x4F5C;&#x308B;</a>）”というのを、不定期にボチボチやっていこうかなと思います。でも、あんまり期待しないでください。</p>

<div class="section">
<h3>必要なもの</h3>

<ul>
<li><a href="http://www.microsoft.com/web/webmatrix/">Microsoft Developer</a></li>
</ul><p>これだけです。できれば <a href="http://www.microsoft.com/visualstudio/jpn/products/visual-studio-express-for-web">http://www.microsoft.com/visualstudio/jpn/products/visual-studio-express-for-web</a> があるといろいろ便利。フレームワークには <a href="http://msdn.microsoft.com/ja-jp/library/hh396384(v=vs.111).aspx">ASP.NET Web Pages 2 | Microsoft Docs</a> を利用しますが、とりあえず今のところは<i>「C# で PHP っぽく Web アプリが書けるもの」</i>だとでも思っていただければ結構です。</p>

</div>
<div class="section">
<h3>プロジェクトの新規作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717053248.png" alt="f:id:daruyanagi:20130717053248p:plain" title="f:id:daruyanagi:20130717053248p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>テンプレートギャラリーから……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717053316.png" alt="f:id:daruyanagi:20130717053316p:plain" title="f:id:daruyanagi:20130717053316p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ASP.NET の“空のサイト”を選択。今回は @Webmatxirxman（<a href="https://twitter.com/WebMatrixMan">https://twitter.com/WebMatrixMan</a>）に敬意を表して<b>「Green Tights」</b>としました。<i>“C:\Users\***\Documents\My Web Sites\Green Tights”</i>がプロジェクトフォルダーになります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717053725.png" alt="f:id:daruyanagi:20130717053725p:plain" title="f:id:daruyanagi:20130717053725p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、適当に Default.cshtml を編集しましょう。今回は冒頭の <b>@{}</b> コードブロックで <b>App.Name</b> に“Green Tights”という文字列を代入し、HTML で <b>@App.Name</b> のように記述して埋め込んでいます（2ケ所）。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
App.Name = &quot;Green Tights&quot;;
}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>@App.Name<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>Welcome to @App.Name!<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>［実行］ボタンを押し……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130717053731.png" alt="f:id:daruyanagi:20130717053731p:plain" title="f:id:daruyanagi:20130717053731p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ブラウザーでなにか表示されたら成功。ちゃんと動いてますね。この <b>@</b> で変数を評価して出力する記法を <b>Razor</b> と呼びます。</p><p>今日のところはこれで終わり！――次回はデータベースを用意して、書き込みと読み込みを行います。たぶん。</p>

</div>
<div class="section">
<h3>ソースコード</h3>

<ul>
<li><a href="https://greentights.codeplex.com/SourceControl/changeset/97f8b9647ae928e4fc375bbb7d9914d81e9dd314">CodePlex Archive</a></li>
</ul>
</div><div class="footnote">
<p class="footnote"><a href="#fn-f61de386" name="f-f61de386" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ほかにもできるけど、そっちを推すのはほかの人に任せる</span></p>
</div>