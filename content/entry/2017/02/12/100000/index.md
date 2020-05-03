---
date: 2017-02-12T10:00:00.0000000
draft: false
title: "WebMatrix とおさらばして、Visual Studio 2015 で ASP.NET Web Pages をはじめる"
tags: ["WebMatrix", "ASP.net Web Pages", "Visual Studio"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212020533.png" alt="f:id:daruyanagi:20170212020533p:plain" title="f:id:daruyanagi:20170212020533p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>長年愛用してきた「WebMatrix」ですが、昨年10月に2017年11月1日 でのサポート終了がアナウンスされました。</p>

<blockquote cite="https://forums.iis.net/t/1234128.aspx?WebMatrix+formal+support+ends+November+1st+2017">
<p>Hi everyone</p><p>After a long and successful run, Microsoft has decided to end formal support of WebMatrix.  Formal support will end on November 1st, 2017.  Community support will continue on the WebMatrix forums </p><p>Please take a look at Visual Studio Code, our new, free, open source, multi-platform editor!  VS Code support git integration, extensions and a whole bunch of other great features!</p><p>Thanks!</p><p>The WebMatrix team</p>

<cite><a href="https://forums.iis.net/t/1234128.aspx?WebMatrix+formal+support+ends+November+1st+2017">WebMatrix formal support ends November 1st, 2017 : The Official Microsoft IIS Forums</a></cite>
</blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212020959.png" alt="f:id:daruyanagi:20170212020959p:plain" title="f:id:daruyanagi:20170212020959p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すでにテンプレートをダウンロードする際に 404 が発生することが多くなったほか、拡張機能のダウンロード提供が終了しており、第一線で使うにはつらい状況になっています。そろそろ乗り換えを検討すべきでしょう。</p><p>Microsoft は後継ソフトとして「Visual Studio Code」を推奨していますが、これは統合ターミナルでバリバリとコマンドを打つ感じなので、GUI に甘やかされた僕にはしんどい感じ（最近「Express」を少し触っているのですが、そっちの文化にあわせるなら割と使いやすいですけどねー）。いずれ慣れないといけないなーとは思うんですが、APS.NET Web Pages を使うならば、当面の間は「Visual Studio 2015」が一番楽かなーって感じです。</p>

<div class="section">
<h3>1. 「Visual Studio 2015」で ASP.NET プロジェクトを作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212021454.png" alt="f:id:daruyanagi:20170212021454p:plain" title="f:id:daruyanagi:20170212021454p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず「Visual Studio 2015」で ASP.NET プロジェクトを作成します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212021543.png" alt="f:id:daruyanagi:20170212021543p:plain" title="f:id:daruyanagi:20170212021543p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロジェクトタイプは“Empty”でよいです。というか、「WebMatrix」でいうところのスターターテンプレートの類は「Visual Studio」に用意されていないので、“Empty”が無難な気がします。</p>

</div>
<div class="section">
<h3>2. プロジェクトに Razor ページを追加</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212021735.png" alt="f:id:daruyanagi:20170212021735p:plain" title="f:id:daruyanagi:20170212021735p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このテンプレートは本当にほぼ空なので、プロジェクトのコンテキストメニューなどから Web ページ（Razor）を追加する必要があります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212021905.png" alt="f:id:daruyanagi:20170212021905p:plain" title="f:id:daruyanagi:20170212021905p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>“Razor”などのキーワードで探すと簡単。いろいろあるけど、わかんなかった“Web ページ（Razor v3）”でいいと思います。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212022148.png" alt="f:id:daruyanagi:20170212022148p:plain" title="f:id:daruyanagi:20170212022148p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>最初のページを追加すると、ASP.NET Web Pages に必要な参照が勝手に追加されます。すごーい！</p>

</div>
<div class="section">
<h3>3. ［F5］キーを押して実行</h3>
<p>とりあえずなんか書いて実行してみましょう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>&lt;!DOCTYPE html&gt;
@{
var message = <span class="synConstant">&quot;Hello! World&quot;</span>;
}
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;@message&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>［F5］キーを押すとサーバー＆ブラウザーが立ち上がります。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170212022322.png" alt="f:id:daruyanagi:20170212022322p:plain" title="f:id:daruyanagi:20170212022322p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>message を変えてブラウザーをリロードすると、即座に反映されまっする。なんとなく気軽で「WebMatrix」を使い続けてきましたが、機能面では「Visual Studio」のほうがずっと強力（ブレークポイントとかもしかけられるやで。入力補完はちょっと緩いところあるけど）です。……で、「Visual Studio Code」ではこの手順をどうやるんだ？　</p><p>最後に「WebMatrix」さん、長いことありがとうございました。</p>

</div>