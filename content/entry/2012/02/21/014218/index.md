---
date: 2012-02-21T01:42:18.0000000
draft: false
title: "Web 配置タスクに失敗しました"
tags: ["ASP.net MVC 3"]
eyecatch: 
---
<p><img src="20120221013818.png" alt="f:id:daruyanagi:20120221013818p:plain" title="f:id:daruyanagi:20120221013818p:plain" class="hatena-fotolife"></p>

<blockquote>
<p>エラー	16<br />
Web 配置タスクに失敗しました。(リモート エージェント URL '<a href="https://***:8172/msdeploy.axd?site=***'">https://***:8172/msdeploy.axd?site=***'</a> に対する要求を完了できませんでした。)</p><p>リモート エージェント URL '<a href="https://***:8172/msdeploy.axd?site=***'">https://***:8172/msdeploy.axd?site=***'</a> に対する要求を完了できませんでした。<br />
要求は中止されました: 要求がキャンセルされました<br />
基になる RCW から分割された COM オブジェクトを使うことはできません。</p>

</blockquote>
<p>なんだろう......（＠ｗ＠？</p><p>このエラーが起こった時、ビューと<a class="keyword" href="http://d.hatena.ne.jp/keyword/CSS">CSS</a>しか変更を加えてなかったし、こっちのロジックがおかしかったとも思えない。サーバーの再起動したけどならなかったので、プロバイダー側で何とかしてもらうしかないのかな。</p><p>とりあえず、今日のところは何も進展しなさそうだから寝よう。</p>

<blockquote>
<p>追記：Visual Studio を再起動したら治った。なんだったんだろう。</p>

</blockquote>
