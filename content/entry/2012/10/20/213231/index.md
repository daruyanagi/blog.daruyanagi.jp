---
date: 2012-10-20T21:32:31.0000000
draft: false
title: "WebMatrix で女の子を落とす"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><blockquote class="twitter-tweet" lang="ja"><p>wget http://localhost/onnnanoko.zip で女の子落とせる</p>&mdash; Be玉さん (@BeMarble) <a href="https://twitter.com/BeMarble/status/259173405063000064" data-datetime="2012-10-19T06:05:29+00:00">10月 19, 2012</a></blockquote><script src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>これは羨ましい！　わしも女の子落としたい！――できれば、WebMatrix で。</p>

<div class="section">
<h3>ヤりたいこと</h3>
<p>まぁ、あらかじめ女の子を Zip で固めておいてアクセスし、「ほら、落ちてきました！」でもいいんだけど、せっかく WebMatrix でやるんだから圧縮ぐらいはオンデマンドでやってみたい。というわけで、</p>

<ul>
<li>http:// localhost: **** へアクセスすると</li>
<li>Grirls フォルダに入っている女の子たちが</li>
<li>Zip でまるごと圧縮されて</li>
<li>落ちてくる！（onnanoko.zip）</li>
</ul><p>が今回の目標。</p>

</div>
<div class="section">
<h3>何も考えずに書いてみる</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>#Default.cshtml <span class="synComment">/* 全部消して以下のコードに置き換える */</span>

@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.IO.Compression

@{
<span class="synType">string</span> dir = Server.MapPath(<span class="synConstant">&quot;~/Girls&quot;</span>);
<span class="synType">string</span> zip = Server.MapPath(<span class="synConstant">&quot;~/Onnanoko.zip&quot;</span>);

<span class="synComment">// ~/Girls を ~/Onnanoko.zip へ圧縮</span>
ZipFile.CreateFromDirectory(dir, zip);

<span class="synComment">// ~/Onnanoko.zip をダウンロード</span>
Response.Redirect(<span class="synConstant">&quot;~/Onnanoko.zip&quot;</span>);
}
</pre><p>もちろん、これは動かない。WebMatrix 2 で作成される ASP.NET Web Pages は .NET Framework 4 をターゲットとしているけれど、ZipFile クラスは .NET Framework 4.5 で追加されたものだからだ。.NET 4 対応のライブラリを使ってこの問題を解決してもいいのだけど、もう誰かがやってそうな気もする。というわけで、今回は WebMatrix 2 のほうを .NET 4.5 で動かしてみることにしよう。</p>

</div>
<div class="section">
<h3>.NET Framework 4.5 で動作させる</h3>
<p>まず初めに考えたのは、Web.config の書き換え。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
// 4.0 を 4.5 に書き換え
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.5&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>しかし、これだけでは動かん。System.IO.Compression.FileSystem.dll を参照に追加せねばならないらしい……。くそぅ、どうやればいいんだ……WebMatrix には参照追加のためのユーザーインターフェイスがない……。ここでオレの、オレたちの夢は途絶えてしまうのか！？</p>

</div>
<div class="section">
<h3>お兄ちゃん！　助けて！</h3>
<p><img src="20121020211304.png" alt="f:id:daruyanagi:20121020211304p:plain" title="f:id:daruyanagi:20121020211304p:plain" class="hatena-fotolife"></p><p>そこで思い出したのが、「Visual Studio」。そう、<del>ターンエー</del>の「WebMatrix」のお兄さんだ！　まぁ、WebMatrix でもたいていのことはできるけど、やっぱり Visual Studio のほうが便利なところも多い。困ったときはサクッと切り替えるのも一つの手だぞ！</p><p><img src="20121020211409.png" alt="f:id:daruyanagi:20121020211409p:plain" title="f:id:daruyanagi:20121020211409p:plain" class="hatena-fotolife"></p><p>というわけで、参照マネージャーで DLL への参照を追加。すると、Web.config はこんな風に書き換わる。</p><p><img src="20121020212000.png" alt="f:id:daruyanagi:20121020212000p:plain" title="f:id:daruyanagi:20121020212000p:plain" class="hatena-fotolife"></p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synComment">&lt;!--</span>
<span class="synComment">    .NET 4.5 対応のための web.config の変更点の説明については、http://go.microsoft.com/fwlink/?LinkId=235367 を参照してください。</span>

<span class="synComment">    次の属性を &lt;httpRuntime&gt; タグに設定できます。</span>
<span class="synComment">      &lt;system.Web&gt;</span>
<span class="synComment">        &lt;httpRuntime targetFramework=&quot;4.5&quot; /&gt;</span>
<span class="synComment">      &lt;/system.Web&gt;</span>
<span class="synComment">  --&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.5&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;assemblies&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">assembly</span>=<span class="synConstant">&quot;System.IO.Compression.FileSystem, Version=4.0.0.0, Culture=neutral, PublicKeyToken=B77A5C561934E089&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/assemblies&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;pages </span><span class="synType">controlRenderingCompatibilityVersion</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>さすが、<del>ターンエー</del>の「WebMatrix」のお兄さん！　っていうか、こんなの手で書いてられるかよ！ ＞ｗ＜</p><p>あとはこれを実行するだけだ！</p>

</div>
<div class="section">
<h3>親方！　空から女の子が！</h3>
<p><img src="20121020211631.png" alt="f:id:daruyanagi:20121020211631p:plain" title="f:id:daruyanagi:20121020211631p:plain" class="hatena-fotolife"></p><p>てぃーてぃーりりりー♪　てぃてぃーりりりー♬</p><p><img src="20121020212011.png" alt="f:id:daruyanagi:20121020212011p:plain" title="f:id:daruyanagi:20121020212011p:plain" class="hatena-fotolife"></p><p>うおおお！　ちゃんと女の子が落せた！　万歳……っ！……万歳っ……！</p><p><img src="20121020211812.png" alt="f:id:daruyanagi:20121020211812p:plain" title="f:id:daruyanagi:20121020211812p:plain" class="hatena-fotolife"></p><p>でも、リロードしたらエラーが発生したので、ちゃんとファイルの存在チェック＆削除のロジックを入れておかねばならぬ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.IO.Compression

@{
<span class="synType">string</span> dir = Server.MapPath(<span class="synConstant">&quot;~/Girls&quot;</span>);
<span class="synType">string</span> zip = Server.MapPath(<span class="synConstant">&quot;~/Onnanoko.zip&quot;</span>);

<span class="synStatement">if</span> (File.Exists(zip))
{
File.Delete(zip);
}

ZipFile.CreateFromDirectory(dir, zip);

Response.Redirect(<span class="synConstant">&quot;~/Onnanoko.zip&quot;</span>);
}
</pre>
</div>
<div class="section">
<h3>がちゆりさんを足してみた</h3>
<p><img src="20121020212113.png" alt="f:id:daruyanagi:20121020212113p:plain" title="f:id:daruyanagi:20121020212113p:plain" class="hatena-fotolife"></p><p>初回テストでは、Girls フォルダに向日葵ちゃんしか入っていなかったけれど、これはちょっと寂しい。というわけで、複数ファイルも行けるかどうかのテストを兼ねて、Girls フォルダにがちゆりさん（<a href="http://dic.nicovideo.jp/a/%E8%B5%A4%E5%BA%A7%E3%81%82%E3%81%8B%E3%81%AD">&#x8D64;&#x5EA7;&#x3042;&#x304B;&#x306D;&#x3068;&#x306F; (&#x30A2;&#x30AB;&#x30B6;&#x30A2;&#x30AB;&#x30CD;&#x3068;&#x306F;) [&#x5358;&#x8A9E;&#x8A18;&#x4E8B;] - &#x30CB;&#x30B3;&#x30CB;&#x30B3;&#x5927;&#x767E;&#x79D1;</a>）を追加。</p><p><img src="20121020212247.png" alt="f:id:daruyanagi:20121020212247p:plain" title="f:id:daruyanagi:20121020212247p:plain" class="hatena-fotolife"></p><p>結果はもちろん成功！</p><p>……というわけで、本日のネタは Web サイト/アプリに「Zipでくれ」機能を付ける、でした！</p><p><img src="20121020212225.png" alt="f:id:daruyanagi:20121020212225p:plain" title="f:id:daruyanagi:20121020212225p:plain" class="hatena-fotolife"></p><p>ちなみに、WebMatrix で画像のプレビューをするには「ImageViewer」拡張機能をインストールするんだよ。</p>

</div>
<div class="section">
<h3>おまけ：これ、デプロイできんの？</h3>
<p>ローカルで動くのはわかったけど、これリモートでも動くんだろうか。答えは「やれないことはないけれど、もう少し待て」。そのうち Azure Web Sites が .NET 4.5 に対応してくれるみたいだから、それを使えば楽にできそう。 Express Web のほうも対応してくれたらありがたいのだけどね。</p>

</div>