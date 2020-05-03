---
date: 2016-08-29T04:53:12.0000000
draft: false
title: "Aoba 1.2.0：連射モードの追加と通知の改善 / GitHub で Pull Request を Merge できなくなった"
tags: ["GitHub", "Aoba", "告知", "WPF"]
eyecatch: 20160829043442.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829043442.png" alt="f:id:daruyanagi:20160829043442p:plain" title="f:id:daruyanagi:20160829043442p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>連射モードを追加。指定したインターバルでタイマーが動き、取得済みのゲームエリアをパシャパシャするヤツ。タイマーが動いていることを示すインジケーターがいいの思いつかなかったので、とりあえずアイコンをオレンジにしておいた。この辺りは永遠に適当。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829043648.png" alt="f:id:daruyanagi:20160829043648p:plain" title="f:id:daruyanagi:20160829043648p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ビューに Brush をバインドしたつもりが動かずに悩んだけど、System.Windows.Media ではなく System.Drawing になっていた orz</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829043826.png" alt="f:id:daruyanagi:20160829043826p:plain" title="f:id:daruyanagi:20160829043826p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>通知もいい感じにしておいた。通知は切ることもできるけど、ゲームエリアの取得に失敗したときだけはでるようにしている。</p><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FAoba%2Freleases%2Ftag%2Fv1.2.0" title="daruyanagi/Aoba" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><br />
</p>

<div class="section">
<h4>Git の使い方わからん</h4>
<p>GitHub の Visual Studio 拡張機能を使っていたのだけど、操作をミスって Pull Request を Merge できなくなった。GitHub で「コマンドラインでコンフリクトをなんとかしろやボケ」と言われてしまう（スクショとり忘れた）。</p><p>とりあえず閉じておいた。ローカルの master とリモートの master に齟齬ができたみたいだなぁ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829044207.png" alt="f:id:daruyanagi:20160829044207p:plain" title="f:id:daruyanagi:20160829044207p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>直したいのだけど、やり方がさっぱりわからなかったのだが、「GitHub for Windows」を起動してごちゃごちゃしていると……</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160829044434.png" alt="f:id:daruyanagi:20160829044434p:plain" title="f:id:daruyanagi:20160829044434p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんかコンフリクトのあるファイルが表示されたので、当該部分を消してコミットして Sync しておいた（Sync がなにやってんのかはイマイチよくわからんが）。なんかよくわからんけど助かった……。</p><p>Visual Studio 拡張機能にもいいところがあるんだろうけど、<i>ブランチ切って<a href="#f-c3e131e4" name="fn-c3e131e4" title="今回はここで間違ったみたい。remote と local が同期されていないのに remote からブランチをきって local にコミットしたのか？">*1</a>、コードをしこしこ書いて、終わったらプルリクエスト作って、GitHub で Merge して、Release を作成する（、ブランチを削除する）</i>っていうのがシームレスにできる「GitHub for Windows」の方が自分はいいかも。手を動かしてるうちに、いろいろ分かってくるかもだし（ただし、Sync はイマイチよくわからん）。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-c3e131e4" name="f-c3e131e4" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">今回はここで間違ったみたい。remote と local が同期されていないのに remote からブランチをきって local にコミットしたのか？</span></p>
</div>