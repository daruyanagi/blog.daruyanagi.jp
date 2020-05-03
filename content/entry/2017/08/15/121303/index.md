---
date: 2017-08-15T12:13:03.0000000
draft: false
title: "ASP.NET Core アプリを発行したら HTTP Error 502.5 - Process Failure で止まった"
tags: ["Microsoft Azure", "ASP.NET Core"]
eyecatch: 
---
<p>ASP.NET Core 2.0 がリリースされたので、<a href="http://darunagai.jp/">http://darunagai.jp/</a> を Razor Page で書き直しました。大したサイトではないので、MVC よりも Razor Pages にした方がシンプルでいい感じ。ローカルでいい感じに動いていたので、さっそく Azure に発行してみました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170815120543.png" alt="f:id:daruyanagi:20170815120543p:plain" title="f:id:daruyanagi:20170815120543p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>死にました／(^o^)＼　</p><p><b>HTTP Error 502.5 - Process Failure</b> だそうです。見たことないエラーページでちょっと焦る……。</p><p>いろいろガチャガチャいじっていたのですが、どうやらゴミが残っていたようで。Web 発行のときに消すようにしてみたらうまくいきました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170815121048.png" alt="f:id:daruyanagi:20170815121048p:plain" title="f:id:daruyanagi:20170815121048p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170815121051.png" alt="f:id:daruyanagi:20170815121051p:plain" title="f:id:daruyanagi:20170815121051p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><b>発行先の追加ファイルを削除する</b>という日本語がイマイチよくわからなかったのですが、動いたからこれでいいんだろうと思う。</p>
