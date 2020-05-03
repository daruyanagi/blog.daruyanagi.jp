---
date: 2013-06-11T22:41:53.0000000
draft: false
title: "WebMatrix 3: はてなブログをデザインする"
tags: ["WebMatrix", "はてな"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611221104.png" alt="f:id:daruyanagi:20130611221104p:plain" title="f:id:daruyanagi:20130611221104p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回は WebMatrix 3 ではてなブログのデザインをいじってみた。みんな、はてなブログのデザインを作るときってどうやってるのかなぁ。あんまり効率のいい方法って思いつかなかったのだけど、こんなのはどうかな、というのを考えてみた。</p>


<div class="section">
<h3>テーマ確認用のブログを開設する</h3>

<ul>
<li><a href="http://help.hatenablog.com/entry/theme/custom-theme">&#x30C7;&#x30B6;&#x30A4;&#x30F3;&#x30C6;&#x30FC;&#x30DE;&#x5236;&#x4F5C;&#x306E;&#x624B;&#x5F15;&#x304D; - &#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0; &#x30D8;&#x30EB;&#x30D7;</a></li>
</ul><p>上記リンクを参考に、テーマ確認用のブログを開設。サンプルエントリーをコピーして、ひととおりの HTML タグをテストできるようにする。自分の場合は、それに追加して、</p>

<ul>
<li>/about</li>
<li>/archive</li>
</ul><p>へのリンクを含むページを作っておいた。そうすると、次のステップではかどる。</p>

</div>
<div class="section">
<h3>テーマ確認用のブログをローカルにダウンロードする</h3>
<p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-343782507562561537');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('343782507562561537',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-343782507562561537"></div></p><p>この手のソフトはいろいろあると思うのだけど、たまたまこういうのを目にしたので、今回はそれを使ってみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611221741.png" alt="f:id:daruyanagi:20130611221741p:plain" title="f:id:daruyanagi:20130611221741p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まぁ、悪くはないかな。</p>

<ul>
<li><a href="http://cyotek.com/cyotek-webcopy">Cyotek WebCopy - Copy websites locally for offline browsing &bull; Cyotek</a></li>
</ul><p>サンプルエントリーには /archive へのリンクがないと思うので、ひと手間かけてリンクを足しておくと、こういったソフトで一気にダウンロードできて便利。</p>

</div>
<div class="section">
<h3>ローカルフォルダを WebMatrix 3 で開く</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611222051.png" alt="f:id:daruyanagi:20130611222051p:plain" title="f:id:daruyanagi:20130611222051p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ダウンロードしたサイトを保存したフォルダを WebMatrix 3 で開く。コンテキストメニューから開けるよ。実行すれば、ローカルサーバーでホストされ、ちゃんとサイトが表示されるはず。</p><p>わざわざ WebMatrix 3 を利用する理由は、いくつかある。</p>

<ul>
<li>テキストエディター：HTML/CSS の入力補完が効く</li>
<li>LESS：構造的に CSS が書ける。はてなでも採用しているみたい（<a href="https://blog.daruyanagi.jp/entry/2012/08/15/161932">WebMatrix &#x3067; LESS &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）</li>
<li>テスト：システムにインストール済みのブラウザーでテストできる（iOS エミュレーターもある）</li>
<li>ASP.NET Web Page 2：ページを分割できる（後述）</li>
<li>レポート：ダメなマークアップを指摘してくれる（参考程度）</li>
<li>セットアップ：IIS とか Apache とか用意するの面倒じゃね？</li>
</ul><p>まぁ、こだわればいくらでもいいツールはあると思うのだけど、オールインワンでめんどくさくないのが WebMatrix のいいところだと思う。</p>

<div class="section">
<h4>ASP.NET Web Page 2</h4>
<p>たとえば、はてなブログにはヘッダーやフッター、記事の下にカスタム HTML が挿入できる。まぁ、それをソースにべた書きしてもいいのだけれど、できれば別ファイルに分離した方がいいよね。</p><p>そういうときに ASP.NET Web Page 2 の美味しい部分を使ってやるといい。</p><p>まず、index.htm を index.cshtml へリネーム。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611223237.png" alt="f:id:daruyanagi:20130611223237p:plain" title="f:id:daruyanagi:20130611223237p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これだけでも ASP.NET Web Page が使えるのだけど、そのままだと v1 をつかう羽目になるので、アップデートしておく。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611223333.png" alt="f:id:daruyanagi:20130611223333p:plain" title="f:id:daruyanagi:20130611223333p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に、#top-editarea 内を以下のように書き換え。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;top-editarea&quot;</span><span class="synIdentifier">&gt;</span>
@RenderPage(&quot;~/Header.cshtml&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
</pre><p>これでヘッダーに挿入できるカスタム HTML を Header.cshtml へ分離できた。</p><p>ほかにもこんな使い方はどうかな。</p><p>スタイルが膨大になると、役割ごとに CSS ファイルを分割したくなる。けれど、はてなのデザイン画面に貼り付けるときは、それを一つに統合しなきゃいけない。</p><p>ので。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/StyleSheet.cshtml

@{
var path = Server.MapPath(<span class="synConstant">&quot;~/&quot;</span>);
}

&lt;pre&gt;
@File.ReadAllText(path + <span class="synConstant">&quot;Content/HatenaBase.css&quot;</span>)
@File.ReadAllText(path + <span class="synConstant">&quot;Content/Site.css&quot;</span>)
@File.ReadAllText(path + <span class="synConstant">&quot;Content/Hatena.css&quot;</span>)
&lt;/pre&gt;
</pre><p>こんな感じのコードを書いてやる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130611223855.png" alt="f:id:daruyanagi:20130611223855p:plain" title="f:id:daruyanagi:20130611223855p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、/StyleSheet を叩くだけで結合済みの CSS が得られる。たいしたことじゃないけど、こういう使い方もありかな。</p><p>ちょっとイレギュラーな使い方かもしれないけど、こういうのもあるということで。</p>

</div>
</div>