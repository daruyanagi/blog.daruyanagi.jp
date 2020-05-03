---
date: 2012-09-08T06:23:22.0000000
draft: false
title: "『「.NET開発者」のためのSilverlight入門』"
tags: ["Silverlight", "読書"]
eyecatch: 
---
<p><div class="hatena-asin-detail"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4777517055/bestylesnet-22/"><img src="https://images-fe.ssl-images-amazon.com/images/I/41%2B%2Bc7WK2AL._SL160_.jpg" class="hatena-asin-detail-image" alt="「.NET開発者」のためのSilverlight入門―XAMLからはじめるアプリケーション開発の基礎 (I・O BOOKS)" title="「.NET開発者」のためのSilverlight入門―XAMLからはじめるアプリケーション開発の基礎 (I・O BOOKS)"></a><div class="hatena-asin-detail-info"><p class="hatena-asin-detail-title"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4777517055/bestylesnet-22/">「.NET開発者」のためのSilverlight入門―XAMLからはじめるアプリケーション開発の基礎 (I・O BOOKS)</a></p><ul><li><span class="hatena-asin-detail-label">作者:</span> 森博之</li><li><span class="hatena-asin-detail-label">出版社/メーカー:</span> 工学社</li><li><span class="hatena-asin-detail-label">発売日:</span> 2012/08</li><li><span class="hatena-asin-detail-label">メディア:</span> 単行本</li><li><a href="http://d.hatena.ne.jp/asin/4777517055/bestylesnet-22" target="_blank">この商品を含むブログ (2件) を見る</a></li></ul></div><div class="hatena-asin-detail-foot"></div></div></p><p><a href="https://blog.daruyanagi.jp/entry/2012/08/31/031730">SignalR Deep Dive ! &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x305F;&#xFF0B;WebMatrix &#x3067; SignalR &#x52D5;&#x304B;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で森さん（<a href="http://moriblog.kit-eng.com/">&#x3082;&#x308A;&#x3072;&#x308D;&#x3086;&#x304D;&#x306E;&#x65E5;&#x3005;&#x662F;&#x52C9;&#x5F37; &ndash; &#x65E5;&#x3005;&#x601D;&#x3063;&#x305F;&#x3053;&#x3068;&#x3084;IT&#x95A2;&#x9023;&#x306E;&#x30E1;&#x30E2;&#x3092;&#x7DB4;&#x3063;&#x3066;&#x3044;&#x3053;&#x3046;&#x304B;&#x3068;&hellip;(^^;</a>）に Silverlight の本をいただいた。ありがとうございます！</p>

<blockquote cite="http://moriblog.kit-eng.com/2012/08/12/%E3%80%8C-net%E3%80%8D%E9%96%8B%E7%99%BA%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEsilverlight%E5%85%A5%E9%96%80%E3%82%92%E5%9F%B7%E7%AD%86%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82/">
<p>これから始めようという方は最初から順に読んでいただければ必要な知識を得られるように工夫しました。<br />
そして、既にXAMLを習得されている方にも、確認したい点を理解しやすいように極力各章で独立して説明するように心がけています。</p>

<cite><a href="http://moriblog.kit-eng.com/2012/08/12/%E3%80%8C-net%E3%80%8D%E9%96%8B%E7%99%BA%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEsilverlight%E5%85%A5%E9%96%80%E3%82%92%E5%9F%B7%E7%AD%86%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82/">http://moriblog.kit-eng.com/2012/08/12/%E3%80%8C-net%E3%80%8D%E9%96%8B%E7%99%BA%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEsilverlight%E5%85%A5%E9%96%80%E3%82%92%E5%9F%B7%E7%AD%86%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82/</a></cite>
</blockquote>
<p>図表が多めでわかりやすいと思う。かなり初心者向けに振ってある感じで、これでわからなかったら Silverlight 諦めたほうがよいかもしれない（ぉ</p><p>トイレの中で少しづつ読んでて、まだ2章の終わりらへんまでしか読んでいないのだけれど、 Silverlight と言うよりは XAML に再入門するつもりで読んでいる。XAML が CLR オブジェクトを宣言的に記述するスクリプトだってことはなんとなくわかっていたつもりだけど、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> Sample
{
<span class="synType">public</span> <span class="synType">class</span> MyObject
{
<span class="synType">public</span> <span class="synType">int</span> MyProperty { get; set; }
}
}
</pre><p>というクラスがある場合に、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Sample;

var m = <span class="synStatement">new</span> MyObject() { MyProperty = <span class="synConstant">1</span>, };
</pre><p>が、XAML だと</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;MyObject </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;clr-namespace:Sample&quot;</span><span class="synIdentifier"> </span><span class="synType">MyProperty</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> /&gt;</span>
</pre><p>になるんだぜーっていうところからちゃんと学べるのは自分にとって貴重かもしれない。</p><p>びっくりするぐらい初歩的なことを知らなかったりするので、これで復習だｗ</p>
