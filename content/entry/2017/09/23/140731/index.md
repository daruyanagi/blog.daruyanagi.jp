---
date: 2017-09-23T14:07:31.0000000
draft: false
title: "Omawari 1.2.0.0：いわゆる Web 更新チェッカーだけど、細かいところを改善した"
tags: ["告知", "Omawari", "PowerShell"]
eyecatch: 20170923135951.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170923135951.png" alt="f:id:daruyanagi:20170923135951p:plain" title="f:id:daruyanagi:20170923135951p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>メインリストビューに Last Update 欄を設ける
<ul>
<li>それに伴うコード整理</li>
<li>Refresh ボタンは不要になったので廃止</li>
</ul></li>
<li>通知トレイで DEBUG モードなのがわかるように</li>
<li>ファイル操作の非同期化 （メイン画面を初期表示＆スクロールする際のカクツキを抑えた）
<ul>
<li>それに伴うリグレッションの修正</li>
<li>ついでにステータスバーに総稼働時間を表示するように</li>
</ul></li>
<li>リファクタリング</li>
<li>Click Once がめんどいのでやめた（ごめんなさい！）</li>
</ul><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FOmawari%2Freleases" title="daruyanagi/Omawari" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Omawari/releases">github.com</a></cite><br />
</p>

<div class="section">
<h3>リリースアーカイブを毎回手で作るの面倒くさくなったので PowerShell にした</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170923140119.png" alt="f:id:daruyanagi:20170923140119p:plain" title="f:id:daruyanagi:20170923140119p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ClickOnce って Web サーバーでホストしない場合、更新するのにいちいち古いバージョンのアンインストールが必要になって大変面倒くさいので、単に ZIP アーカイブでまとめて配布するようにした。そのパッケージを毎回手で作るのは面倒なので、PowerShell でアーカイブを作るスクリプトを描いた。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synComment"># 起点となる bin フォルダー</span>
<span class="synIdentifier">$root</span> = <span class="synStatement">Join-Path</span> <span class="synIdentifier">$PSScriptRoot</span> <span class="synConstant">&quot;Omawari\bin&quot;</span>

<span class="synComment"># 入力フォルダー</span>
<span class="synIdentifier">$src</span> = <span class="synStatement">Join-Path</span> <span class="synIdentifier">$root</span> <span class="synConstant">&quot;Release&quot;</span>

<span class="synComment"># 出力フォルダー</span>
<span class="synIdentifier">$version</span> = (<span class="synStatement">Get-ItemProperty</span> (<span class="synStatement">Join-Path</span> <span class="synIdentifier">$src</span> <span class="synConstant">&quot;Omawari.exe&quot;</span>)).VersionInfo.FileVersion
<span class="synIdentifier">$dest</span> = <span class="synStatement">Join-Path</span> <span class="synIdentifier">$root</span> Omawari-<span class="synIdentifier">$version</span>.zip

<span class="synComment"># ZIP で圧縮</span>
<span class="synStatement">Compress-Archive</span> -Path <span class="synIdentifier">$src</span>/* -DestinationPath <span class="synIdentifier">$dest</span>

<span class="synComment"># フォルダーを開く</span>
<span class="synStatement">Invoke-Item</span> <span class="synIdentifier">$root</span>
</pre><p>リリースビルドの実行ファイルのバージョンを読んで Omawari-*.*.*.*.zip という名前の ZIP アーカイブに圧縮するだけ。この程度の<br />
PowerShell なら割と書けるようになってきた！（バージョンの取得の仕方はググったけど……）</p><p>コレでもアップデートは面倒なので、Chocolatey パッケージにすることも画策してる。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Chocolatey パッケージリジェクトされました……</p>&mdash; だるたにゃん (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/911375028125556736">2017年9月22日</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>

</div>