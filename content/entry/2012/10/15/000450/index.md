---
date: 2012-10-15T00:04:50.0000000
draft: false
title: "はてなブログで Bing ウェブマスターツールを利用する"
tags: []
eyecatch: 
---
<p><img src="20121014234049.png" alt="f:id:daruyanagi:20121014234049p:plain" title="f:id:daruyanagi:20121014234049p:plain" class="hatena-fotolife"></p><p>どうもウチのブログは Google に嫌われているみたいで、検索にまったく引っかからない。でも、Bing さんは引っかけてくれる。やっぱ時代は Bing だな<a href="#f1" name="fn1" title="使ってないけど">*1</a>。</p><p>その Bing さんにも、Google と同じくウェブマスターツールというのがあって、ちゃんと登録しておくと検索順位が上がるかもしれない<a href="#f2" name="fn2" title="知らんけど">*2</a>。</p><p><a href="http://www.bing.com/toolbox/webmaster">Bing - Webmaster Tools</a></p><p>まぁ、そうでなくてもいろいろ面白いデータがみられるかもしれないので、こちらにも一応登録しておくことにした。</p>

<div class="section">
<h3>はてなブログでの設定方法</h3>
<p><img src="20121014235145.png" alt="f:id:daruyanagi:20121014235145p:plain" title="f:id:daruyanagi:20121014235145p:plain" class="hatena-fotolife"></p><p>Bing ウェブマスターツールに Web サイトを登録するには、以下のいずれかの方法によってその Web サイトを所有していることを証明しなければならない。</p>

<ol>
<li>Web サーバーに XML ファイルを配置</li>
<li><meta> タグをコピーして既定の Web ページに貼り付け</li>
<li>CNAME レコードを DNS に追加</li>
</ol><p>しかし、残念ながら <a href="http://hatenablog.com/">&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0; (beta)</a> の場合、1 も 2 も不可能。Pro アカウントを購入して独自ドメインを割り当てている場合のみ、辛うじて 3 の方法が利用できる。<a href="#f3" name="fn3" title="Google ウェブマスターツールには対応しているのにな！">*3</a></p>

</div>
<div class="section">
<h3>CNAME レコードを DNS に追加（VALUE DOMAIN）</h3>
<p><img src="20121014235806.png" alt="f:id:daruyanagi:20121014235806p:plain" title="f:id:daruyanagi:20121014235806p:plain" class="hatena-fotolife"></p><p>「名前が 0ab***55（ながーい値） で値が verify.bing.com の CNAME (エイリアス) レコードを追加します。」という指示が出るので、それに従おう。<a href="http://www.value-domain.com/">VALUE DOMAIN:&#x30D0;&#x30EA;&#x30E5;&#x30FC;&#x30C9;&#x30E1;&#x30A4;&#x30F3;</a> を利用している場合は、ドメインの設定画面で</p>

<blockquote>
<p>cname 0ab***55 verify.bing.com.<br />
cname @ hatenablog.com. // <- はてなブログの DNS 設定</p>

</blockquote>
<p>と記述すればよい<a href="#f4" name="fn4" title="最後のドットを忘れないようにね">*4</a>。反映されるまでちょっと待ってから（30分ぐらいかな？）、［確認］ボタンを押せば設定は完了だよ。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">使ってないけど</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">知らんけど</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">Google ウェブマスターツールには対応しているのにな！</span></p>
<p class="footnote"><a href="#fn4" name="f4" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">最後のドットを忘れないようにね</span></p>
</div>