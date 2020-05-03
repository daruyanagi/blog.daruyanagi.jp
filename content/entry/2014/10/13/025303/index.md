---
date: 2014-10-13T02:53:03.0000000
draft: false
title: "Mihari 1.1.0.3"
tags: ["Mihari", "告知", "Windows デスクトップ アプリ"]
eyecatch: 20141013024958.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141013024958.png" alt="f:id:daruyanagi:20141013024958p:plain" title="f:id:daruyanagi:20141013024958p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Mihari.exe.config をイジってください――というのではあまりにも配慮に欠けるかなと思って、かんたんな設定ダイアログをつけました。</p>

<ul>
<li><a href="http://download.daruyanagi.net/Mihari%20for%20Windows%20Desktop">Mihari for Windows Desktop - &#x3060;&#x308B;&#x3084;&#x306A;&#x304E;&#xFF08;0x22&#x6B73;&#x2642;&#xFF09;</a></li>
</ul><p>XAML でプロパティの綴りミスってうまくバインディングされず、小一時間ハマったのは秘密です。</p>

<ul>
<li>1.1.0.3 (2014/10/13)
<ul>
<li>[FIX] Can not save some setting.</li>
</ul></li>
</ul>
<ul>
<li>1.1.0.2 (2014/10/13)
<ul>
<li>[FIX] Get Clickonce Version</li>
</ul></li>
</ul>
<ul>
<li>1.1.0.1 (2014/10/13)
<ul>
<li>Setting Dialog</li>
<li>[FIX] Mutex bug</li>
</ul></li>
</ul><p>メインマシンの環境がぶっ壊れていて、ClickOnce でインストールできないのがツラい……。</p>

<div class="section">
<h4>追記</h4>

<ul>
<li>1.1.0.4 (2014/10/13)
<ul>
<li>[FIX] Ignore RecycleBin does not work.</li>
</ul></li>
</ul><p>パスのチェックで大文字小文字の区別をつけていたので、一部環境で IgnoreRecycleBin オプションが動いてなかった。カッコ悪い。</p>

</div>