---
date: 2014-10-12T13:55:37.0000000
draft: false
title: "winmd を参照していると ClickOnce で配置できない"
tags: ["ClickOnce", "Windows Runtime"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141012134634.png" alt="f:id:daruyanagi:20141012134634p:plain" title="f:id:daruyanagi:20141012134634p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2014/10/12/133551">Mihari 1.0.0.0 - &#x3060;&#x308B;&#x308D;&#x3050;</a> を ClickOnce で配置しようと思ったら、エラーが出てビルドできなくなった。</p>

<blockquote>
<p>マニフェストの生成エラーです。ファイルまたはアセンブリ '…\Windows.winmd'、またはその依存関係の 1 つが読み込めませんでした。間違ったフォーマットのプログラムを読み込もうとしました。</p>

</blockquote>
<p>ガッデム！　ClickOnce のセキュリティ設定を無効にするとビルドはできるようになるのだけど、［発行ウィザード］で配置しようとするとセキュリティ設定が勝手に有効になってビルドに失敗し、配置できない。</p>

<div class="section">
<h4>解決策</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141012134900.png" alt="f:id:daruyanagi:20141012134900p:plain" title="f:id:daruyanagi:20141012134900p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［アプリケーション ファイル］ボタンを押して、Windows.winmd を除外すればいいらしい。</p>

<ul>
<li><a href="https://connect.microsoft.com/VisualStudio/feedback/details/874199/clickonce-resolvemanifestfiles-task-failed-when-using-windows-runtime">Microsoft Connect is Retired - Collaborate | Microsoft Docs</a></li>
</ul><p>WindowsRuntime を使ったデスクトップアプリケーションを ClickOnce で配布しようとするときは注意なのかも。で、ClickOnce ってメンテされてる気配がないのだけど大丈夫なのかな……個人的には気に入っているのだけど。</p>

</div>