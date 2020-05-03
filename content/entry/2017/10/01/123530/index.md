---
date: 2017-10-01T12:35:30.0000000
draft: false
title: "Omawari 1.3.0.0：画面構成を変えた……ダルい作業だった。"
tags: ["告知", "Omawari"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20171001122900.png" alt="f:id:daruyanagi:20171001122900p:plain" title="f:id:daruyanagi:20171001122900p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>画面構成をわかりやすくしてみました。</p>

<ul>
<li>メイン画面（チェックルールの一覧）
<ul>
<li>チェックルールの詳細画面（ログの一覧）
<ul>
<li>ログの詳細画面</li>
</ul></li>
</ul></li>
</ul><p>ひたすら XAML を書き換える作業は辛かったぴょん……でも、ログの詳細画面ではどのログと Diff をとってるのかわかりやすくなったと思う。これまでは作った自分でさえよくわかっていないかった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20171001123111.png" alt="f:id:daruyanagi:20171001123111p:plain" title="f:id:daruyanagi:20171001123111p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは削除確認ダイアログ（＋データも同時に消すか確認）を作ったり、内部的なエラーハンドリングを改善したり、いろいろ。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FOmawari%2Freleases%2Ftag%2Fv1.3" title="daruyanagi/Omawari" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Omawari/releases/tag/v1.3">github.com</a></cite></p><p>また、今回から ClickOnce を Azure に置くことにしました（<a href="https://yanagi.blob.core.windows.net/clickonce-omawari/Omawari.application">https://yanagi.blob.core.windows.net/clickonce-omawari/Omawari.application</a>）。次回リリースしたときにうまくアップデートされるといいなぁ。できたら、これを Chocoraley パッケージにするつもりです。</p>
