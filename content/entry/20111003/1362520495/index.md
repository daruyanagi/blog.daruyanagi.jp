---
date: 2011-10-03T06:54:55.0000000
draft: false
title: "NuGet の作成に挑戦してみた"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://blog.daruyanagi.net/archives/256/sshot-2" rel="attachment wp-att-257"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/10/sshot-2-500x408.png" alt="" title="sshot-2" width="500" height="408" class="alignnone size-medium wp-image-257" /></a></p><p>NuGet を4つほど作ってみた。</p><p><a href="http://nuget.org/List/Search?searchTerm=author:%20daruyanagi">NuGet gallery</a></p><p>やり方のほとんどは [NuGet パッケージを作って公開する](<a href="http://d.hatena.ne.jp/shiba-yan/20110306/1299422776">http://d.hatena.ne.jp/shiba-yan/20110306/1299422776</a>) を参照した。しばやん、ありがとう。来世は美人メイドに生まれ変わるわ。</p><p>4つ作ったけど、そのうち2つは依存関係のテストを兼ねて自分で使う便利関数を切りわけただけのもので、実質的に役に立つのは2つだけだ。</p>

<ul>
<li>[Flickr2Html](<a href="http://nuget.org/List/Packages/Flickr2Html">http://nuget.org/List/Packages/Flickr2Html</a>)</li>
</ul><p>    Flickr にアップロードした写真の個別ページのURLを、埋め込みタグへ変換します。</p>
<pre class="code" data-unlink>        @Flickr2Html.GetHtml(&#34;http://www.flickr.com/photos/daruyanagi/6171600135/&#34;)</pre><p>    GetHtml5() で figure タグを使った埋め込みタグを出力することも可能。引数（size:）に Flickr2Html.Size を与えれば、写真の大きさを指定することもできます。</p>

<ul>
<li>[BlackbirdPie](<a href="http://nuget.org/List/Packages/BlackbirdPie">http://nuget.org/List/Packages/BlackbirdPie</a>)</li>
</ul><p>    Twitter のつぶやきを簡単に引用することができます。</p>
<pre class="code" data-unlink>        @BlackbirdPie.GetHtml(&#34;http://twitter.com/#!/daruyanagi/status/120962210225852417&#34;)</pre><p>    スタイルシートの埋め込みをON/OFFすることもできます。背景だけはタグに直接埋めこんであるため制御できませんが。</p><p>ちなみに、DateTimeSupport はRFC2822形式への変換など、StringSupport にはURLのリンク化などの拡張メソッドが入っていて、BlackbirdPie を使うとき勝手にインストールされる。もちろん、単体で使うことも可能。あくまでも自分用のものを公開しているだけなので、たぶんほかのライブラリ使うほうが幸せになれると思う。</p><p>どちらにしろ、いずれも少しずつ改善していくつもりなので、たまに NuGet のパッケージマネージャーでアップデートを確かめてみてほしい。</p>
