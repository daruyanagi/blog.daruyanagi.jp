---
date: 2015-09-27T19:14:56.0000000
draft: false
title: "Surface 3 の動作が遅くなる・音が割れる・TypeCover でキー入力とタッチバッド入力ができなくなる"
tags: ["Surface 3"]
eyecatch: 20150927190137.png
---

<div class="section">
<h3>症状</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150927190137.png" alt="f:id:daruyanagi:20150927190137p:plain" title="f:id:daruyanagi:20150927190137p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>Surface 3 の動作が遅くなる（「タスク マネージャー」や「リソース モニター」をみると“System”と“システムの割り込み”が異常に CPU を食っている）</li>
<li>音が割れる</li>
<li>急に TypeCover でキー入力とタッチバッド入力ができなくなる</li>
</ul><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150927190001.png" alt="f:id:daruyanagi:20150927190001p:plain" title="f:id:daruyanagi:20150927190001p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［スタート］ボタンのコンテキストメニュー（右クリックメニュー。このメニューには［Win］＋［X］キーでアクセスすることも可能）から「デバイス マネージャー」を開く。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150927185742.png" alt="f:id:daruyanagi:20150927185742p:plain" title="f:id:daruyanagi:20150927185742p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、「I2C HID デバイス」にビックリマークがついている。</p>

</div>
<div class="section">
<h3>解決</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150927190233.png" alt="f:id:daruyanagi:20150927190233p:plain" title="f:id:daruyanagi:20150927190233p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>コンテキストメニューから「I2C HID デバイス」を削除して、Windows を<b>“完全に”</b>シャットダウンする。Windows を完全にシャットダウンするには“高速スタートアップ”を無効化すればよいが、このケースの場合は Windows の操作が困難だと思われるので、<b>ツー ボタン シャットダウン</b>をお勧めする。</p>

<blockquote cite="http://www.microsoft.com/surface/ja-jp/support/warranty-service-and-recovery/windows-stops-responding?os=windows-8.1-update-1">

<ul>
<li>手順 1: 画面の右端から内側にスワイプして、[設定] をタップまたはクリックします。次に [電源] をタップまたはクリックし、[シャットダウン] をタップまたはクリックして Surface をシャットダウンします。通常の手順で Surface をシャットダウンできない場合は、Surface の電源ボタンを 30 秒間押し続けます。</li>
<li>手順 2:Surface をシャットダウンした後、<b>Surface の音量を上げるボタンと電源ボタンを同時に押し、そのまま 15 秒以上押し続けてから、両方のボタンを離します</b>。</li>
<li>手順 3: 画面に Surface ロゴが短時間表示される場合がありますが、両方のボタンを少なくとも 15 秒間は押し続けてください。</li>
<li>手順 4: <b>ボタンを離した後、10 秒間待ちます</b>。</li>
<li>手順 5: 再度電源ボタンを押して離し、Surface の電源を入れます。</li>
</ul>
<cite><a href="http://www.microsoft.com/surface/ja-jp/support/warranty-service-and-recovery/windows-stops-responding?os=windows-8.1-update-1">Surface &#x3067; Windows &#x304C;&#x5FDC;&#x7B54;&#x3057;&#x306A;&#x3044;</a></cite>
</blockquote>
<p>起動して「デバイス マネージャー」を開き、「I2C HID デバイス」のビックリマークがなくなっていたら解決。</p><p>もし解決しない場合は、落ち着いて手順を正確に繰り返してみよう。それでもダメならば、製造元に問い合わせ。</p>

</div>
<div class="section">
<h3>関係ないかもだけど</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150927191318.png" alt="f:id:daruyanagi:20150927191318p:plain" title="f:id:daruyanagi:20150927191318p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>9月に入って部屋のエアコンを切ってから、どうも Surface 3 の調子があちこち悪い。熱暴走したんかなぁ？</p>

</div>
<div class="section">
<h3>追記（2015/09/28 12:00）</h3>
<p>しばらくしたらまた「I2C HID デバイス」が動作しなくなったので、今度は無効化。このまま使ってみる。</p>

</div>
<div class="section">
<h3>追記（2015/10/01 10:00）</h3>
<p>あきらめて Windows 8.1 に戻して解決？　かも。</p>

</div>