---
date: 2012-03-11T00:15:49.0000000
draft: false
title: "SoundKeyboard 2012 を公開しました"
tags: ["告知"]
eyecatch: 
---
<p><img src="20120311000132.png" alt="f:id:daruyanagi:20120311000132p:plain" title="f:id:daruyanagi:20120311000132p:plain" class="hatena-fotolife"></p><p>「SoundKeyboard 2012」は、キーのタイプで音を鳴らすタスクトレイ常駐型ソフトです<a href="#f1" name="fn1" title="もともとは @subsfn 氏が Delphi で制作したものですが、だいぶ古くなったので C# で作り直しました。">*1</a>。</p><p><a href="http://daruyanagi.net/SoundKeyboard%202012">http://daruyanagi.net/SoundKeyboard%202012</a></p><p>主要な機能は以下のとおりです。</p>

<ul>
<li>ミュート機能（［Ctrl］＋［Alt］＋［M］キー）</li>
<li>デスクトップに入力キーを表示する機能</li>
<li>サウンドパックの切り替え機能</li>
</ul><p>Windows 7 64bit版でのみ動作を確認しています。</p>

<div class="section">
<h4>サウンドパックについて</h4>
<p><img src="20120311001437.png" alt="f:id:daruyanagi:20120311001437p:plain" title="f:id:daruyanagi:20120311001437p:plain" class="hatena-fotolife"></p><p>キーにサウンドを割り当てるには、<b>サウンドパック</b>を作成します。といっても大仰なものではなくて、単にフォルダへWAVEファイルを入れておくだけでです。</p><p>例えば、「サウンド」フォルダに「A.wav」を入れて、それをサウンドパックに指定すると、［A］キーを押した時に「A.wav」が再生されます。キーの名前はキー入力のデスクトップ表示機能を利用して確認しながらつけていくとイイと思います。サウンドパックの名前は、フォルダと同じです。さきの例で言えば、「サウンド」がそのままサウンドパックの名前になります。</p><p>デフォルトでは2つのサウンドパックを収録しています。</p>

<ol>
<li><b>alpha</b>：アルファベットキーを打つと音がなります。</li>
<li><b>mari_skb</b>：スペースやエンターなどを押すと音がなります。</li>
</ol><p>音声を作成してくれました北村真里さんに感謝いたします。</p>

</div>
<div class="section">
<h4>既知の不具合</h4>
<p><img src="20120311001450.png" alt="f:id:daruyanagi:20120311001450p:plain" title="f:id:daruyanagi:20120311001450p:plain" class="hatena-fotolife"></p>

<ul>
<li>サウンドパックの設定は保存されますが、その他のアプリケーションの設定は保存されません。そのうち実装します。</li>
<li>32bit版で動くか不安です。</li>
<li>WAVEファイルの大文字小文字に気をつけて下さい。これはのちのバージョンで修正する予定です。</li>
</ul>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">もともとは @subsfn 氏が <a class="keyword" href="http://d.hatena.ne.jp/keyword/Delphi">Delphi</a> で制作したものですが、だいぶ古くなったので C# で作り直しました。</span></p>
</div>