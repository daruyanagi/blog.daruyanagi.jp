---
date: 2011-11-01T06:56:16.0000000
draft: false
title: "Flickr2Html 1.4"
tags: ["未分類"]
eyecatch: 
---

<div class="section">
<h4>変更点</h4>

<ul>
<li>Embeded API Key is removed</li>
<li>GetPhotUrl() is added</li>
<li>Default.cshtml is re-written.</li>
<li>Old Default.cshtml is renamed to Test.cshtml</li>
</ul><p>これまで Flickr の API Key はソースコードに埋め込まれていましたが、削除されました。このバージョン以降、 _AppStart.cshtml などであらかじめ Flickr2Html.ApiKey にAPIキーをセットしておく必要があります。詳しくはヘルプサイトを作っておいた <a href="#f1" name="fn1" title="Flickr2Html">*1</a> のでそちらを参照してください <a href="#f2" name="fn2" title="Microsoft WebMatrixでササットね！">*2</a> 。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://flickr2html.daruyanagi.net/">Flickr2Html</a></span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text"><a href="http://www.forest.impress.co.jp/docs/special/20110901_473168.html">Microsoft WebMatrix</a>でササットね！</span></p>
</div>