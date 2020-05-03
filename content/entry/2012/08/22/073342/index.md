---
date: 2012-08-22T07:33:42.0000000
draft: false
title: "これまでのサンプルを NuGet パッケージにしてみました"
tags: ["ASP.net Web Pages", "WebMatrix", "NuGet"]
eyecatch: 
---

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/19/130606">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/20/020355">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/20/210729">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#xFF08;2&#xFF09; &#x306E;&#x88DC;&#x8DB3; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/20/202253">WebMatrix &#x3067;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#xFF08;3&#xFF09; - FileUpload &#x30D8;&#x30EB;&#x30D1;&#x30FC;&#x3092;&#x4F7F;&#x3046; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>以上の内容を NuGet パッケージ（<a href="https://nuget.org/packages/DADIU/1.1.0">https://nuget.org/packages/DADIU/1.1.0</a>）にしてみました<a href="#f-a0a43786" name="fn-a0a43786" title="ZIPで配ってもよかったのだけど、こっちのほうが楽……かなぁ？">*1</a>。記事では端折った JavaScript なんかも含まれているので<a href="#f-3f729695" name="fn-3f729695" title="正直初心者レベルのソースコードで恥ずかしいです">*2</a>、もし興味があればみていただければと。</p>

<div class="section">
<h3>インストール方法</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065902.png" alt="f:id:daruyanagi:20120822065902p:plain" title="f:id:daruyanagi:20120822065902p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［テンプレート］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065906.png" alt="f:id:daruyanagi:20120822065906p:plain" title="f:id:daruyanagi:20120822065906p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>テンプレートを選択。好きなモノを選んでいいですが、試すだけなら“Empty Site”が無難ですね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065911.png" alt="f:id:daruyanagi:20120822065911p:plain" title="f:id:daruyanagi:20120822065911p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［ファイル］タブを選択。そうしないと［NuGet］ボタンが出てこないみたい<a href="#f-3448857f" name="fn-3448857f" title="たまに押しても出てこなくね？">*3</a>。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065916.png" alt="f:id:daruyanagi:20120822065916p:plain" title="f:id:daruyanagi:20120822065916p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［NuGet］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065921.png" alt="f:id:daruyanagi:20120822065921p:plain" title="f:id:daruyanagi:20120822065921p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>パッケージの検索。検索結果はダウンロード数順になっているのかな？　かなり下の方にスクロールしないとでてこないです。もし検索されない場合はパッケージのソースも変えてみてください。コマンドラインでインストールできる方法も用意されたらいいですね<a href="#f-8f123b19" name="fn-8f123b19" title="できないことはないんだと思うけど、アホでもわかるようにしていただければありがたし">*4</a>。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065924.png" alt="f:id:daruyanagi:20120822065924p:plain" title="f:id:daruyanagi:20120822065924p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>無事パッケージを発見できたらインストール。パッケージ名いいのが思いつかなかったので、頭文字を並べただけです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065928.png" alt="f:id:daruyanagi:20120822065928p:plain" title="f:id:daruyanagi:20120822065928p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回は依存パッケージのインストールも使ってみました（jQuery と HttpFileCollectionBaseExtension）。もしインストールされていない場合は自動で依存性が解決され、ダウンロード・セットアップされます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065933.png" alt="f:id:daruyanagi:20120822065933p:plain" title="f:id:daruyanagi:20120822065933p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストールが成功（するといいな）！　いろいろファイルが追加されているはずです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822065937.png" alt="f:id:daruyanagi:20120822065937p:plain" title="f:id:daruyanagi:20120822065937p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>サンプルは“DADIU.sample”にあるので、ブラウザーで実行してフォルダへアクセスしてください。対応ブラウザーは Google Chrome / FireFox （Opera/IE10？）です。「WebMatrix 2」ではインストール済みのブラウザーのなかから好きなブラウザーを選んで実行できるのが便利ですねぇ。</p>

</div>
<div class="section">
<h3>これまでの記事のウソポイント</h3>
<p>ぶっちゃけこのブログは結構ウソも書いています（ごめんなさい！）<a href="#f-0592dd72" name="fn-0592dd72" title="だって、誰かに「教える」ために書いているのではないもの……あくまでも自分の勉強のためなんです">*5</a>。あんまり完成度を意識してたら、アウトプットなんかできませんからね！<a href="#f-bbad959f" name="fn-bbad959f" title="アウトプットしなければ身につきませんよ？">*6</a>　とはいえ、ほんとごめんなさい的な記述もあるので、気付いたところだけ直しておきます<a href="#f-1b6cba12" name="fn-1b6cba12" title="遡って直すのは面倒だからしない。ブログってこういうところがダメね。はてなブログの場合は過去記事に関連リンクもつかないからなおさらダメだ">*7</a>。</p>

<div class="section">
<h4>NuGet Package Explorer</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120821221424.png" alt="f:id:daruyanagi:20120821221424p:plain" title="f:id:daruyanagi:20120821221424p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/21/222147">
<p>あと、公開（push）の終了がわかりづらい。まぁ、重複して公開するとエラーになる（実害はない）のでわかるのだけれど。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/21/222147">NuGet Package Explorer &#x3067; NuGet &#x30D1;&#x30C3;&#x30B1;&#x30FC;&#x30B8;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>公開が終わったらちゃんとメッセージでてたがな！（見落とし</p>

<blockquote>
<p>（･･････）というフォルダー階層にして .nuspec を開いたら、 <Files> を書いてなくてちゃんと Contentが読み込まれた。なるほど。</p>

</blockquote>
<p>今回のパッケージを作るときは出てこなかった。なんでだろ。まぁ、手動で追加すればいい。</p>

</div>
<div class="section">
<h4>Dictionary の初期化</h4>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt; AllowedFileType =
<span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;();
</pre><p>Dictionary ってその場で初期化できるんだね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt; AllowedFileType =
<span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>, <span class="synType">string</span>&gt;()
{
{ <span class="synConstant">&quot;image/jpeg&quot;</span>, <span class="synConstant">&quot;jpg&quot;</span> },
{ <span class="synConstant">&quot;image/png&quot;</span> , <span class="synConstant">&quot;png&quot;</span> },
{ <span class="synConstant">&quot;image/gif&quot;</span> , <span class="synConstant">&quot;gif&quot;</span> },
};
</pre><p>こっちのほうがいいや。</p>

</div>
<div class="section">
<h4>.NET Framework のターゲット指定</h4>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> </span><span class="synType">debug</span>=<span class="synConstant">&quot;false&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">directoryName</span>=<span class="synConstant">&quot;Highlight&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre>
<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/17/034631">
<p>web.config.transform を少し書き換えて、 .NET 4 を利用するようにしてみたら（targetFramework="4.0"）ちゃんと動きました。ついでに、 NuSpec のタグに「.net 40」を追加して「.NET 4 用ですよ！」とわかるようにしておくと*3いいんじゃないでしょうか。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/17/034631">Highlight.js &#x3092; NuGet &#x30D1;&#x30C3;&#x30B1;&#x30FC;&#x30B8;&#x306B;&#x3057;&#x3066;&#x307F;&#x307E;&#x3057;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>これはよくないかもしれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120822072048.png" alt="f:id:daruyanagi:20120822072048p:plain" title="f:id:daruyanagi:20120822072048p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Visual Studio で開いてデバッグするとき、 compilation 要素がダブってエラーになることがあった。もっとよい作法がありそうな気がする。</p>

</div>
<div class="section">
<h4>App_Code フォルダのサブフォルダで cshtml を使う</h4>

<blockquote cite="https://blog.daruyanagi.jp/entry/2012/08/16/182105">
<p>でも、この方法でサブフォルダーをコンパイル対象に含めても cshtml ファイルの面倒まではみてくれないみたい……。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2012/08/16/182105">App_Code &#x3067;&#x30B5;&#x30D6;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>もしかしたらされるっぽい。前回は動かなかったのだけれど、今回試したら動作した<a href="#f-c2293cdd" name="fn-c2293cdd" title="前回は別の理由で動かなかったのかもしれない">*8</a>。</p><p>ただ、フォルダ名が namespace として扱われるので、呼び出すための記述が長くなる。けれども、場合によってはなかなか使えるのかもしれない。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn-a0a43786" name="f-a0a43786" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ZIPで配ってもよかったのだけど、こっちのほうが楽……かなぁ？</span></p>
<p class="footnote"><a href="#fn-3f729695" name="f-3f729695" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">正直初心者レベルのソースコードで恥ずかしいです</span></p>
<p class="footnote"><a href="#fn-3448857f" name="f-3448857f" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">たまに押しても出てこなくね？</span></p>
<p class="footnote"><a href="#fn-8f123b19" name="f-8f123b19" class="footnote-number">*4</a><span class="footnote-delimiter">:</span><span class="footnote-text">できないことはないんだと思うけど、アホでもわかるようにしていただければありがたし</span></p>
<p class="footnote"><a href="#fn-0592dd72" name="f-0592dd72" class="footnote-number">*5</a><span class="footnote-delimiter">:</span><span class="footnote-text">だって、誰かに「教える」ために書いているのではないもの……あくまでも自分の勉強のためなんです</span></p>
<p class="footnote"><a href="#fn-bbad959f" name="f-bbad959f" class="footnote-number">*6</a><span class="footnote-delimiter">:</span><span class="footnote-text">アウトプットしなければ身につきませんよ？</span></p>
<p class="footnote"><a href="#fn-1b6cba12" name="f-1b6cba12" class="footnote-number">*7</a><span class="footnote-delimiter">:</span><span class="footnote-text">遡って直すのは面倒だからしない。ブログってこういうところがダメね。はてなブログの場合は過去記事に関連リンクもつかないからなおさらダメだ</span></p>
<p class="footnote"><a href="#fn-c2293cdd" name="f-c2293cdd" class="footnote-number">*8</a><span class="footnote-delimiter">:</span><span class="footnote-text">前回は別の理由で動かなかったのかもしれない</span></p>
</div>