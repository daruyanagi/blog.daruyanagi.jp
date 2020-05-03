---
date: 2012-03-09T22:14:52.0000000
draft: false
title: "ClickOnce インストーラーで「ハードディスクへの書き込みエラーが発生しました。ディスクに十分な空きがあるかどうか確認してください」と表示される"
tags: ["C#"]
eyecatch: 
---
<p><img src="20120309221105.png" alt="f:id:daruyanagi:20120309221105p:plain" title="f:id:daruyanagi:20120309221105p:plain" class="hatena-fotolife"></p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/ClickOnce">ClickOnce</a> インストーラーで、ディスクにGB単位で余裕があるにもかかわらず、こんなエラーが表示される場合がある。</p><p><img src="20120309221311.png" alt="f:id:daruyanagi:20120309221311p:plain" title="f:id:daruyanagi:20120309221311p:plain" class="hatena-fotolife"></p><p>ウチの場合は、同じDLLが2回インストールされようとしていたのが原因らしい。プロジェクトのプロパティにある［発行］タブで［アプリケーションファイル］ボタンを押し、重複ファイルを除外してやればエラーが解消される。</p>
