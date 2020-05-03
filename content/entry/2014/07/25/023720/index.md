---
date: 2014-07-25T02:37:20.0000000
draft: false
title: "Surface Pro 3：COM Surrogate や Peer Name Resolution Protcol が妙にリソースを食っている"
tags: ["Surface Pro 3"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140725/20140725022254.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140725022254.png" alt="f:id:daruyanagi:20140725022254p:plain" title="f:id:daruyanagi:20140725022254p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これは Surface Pro 3 に限らないかもしれないが、</p>

<ul>
<li>COM Surrogate</li>
</ul><p>や</p>

<ul>
<li>サービスホスト：ローカルサービス（ピア ネットワーク）
<ul>
<li>Peer Name Resolution Protcol</li>
<li>Perr Networking Grouping</li>
<li>Peer Natworking Identity Manager</li>
</ul></li>
</ul><p>あたりのプロセスが常に数％の CPU リソースを食っていて、全体で25％程度の負荷がずっと継続するという症状が見られた。鈍感なのでとくにパフォーマンスの低下は感じなかったが、Surface Pro 3 がやたら熱いので気付いた。</p>

<ul>
<li>セットアップ直後（Windows Search が一生懸命インデックスを作ってたりする）</li>
<li>Windows Update の直後（バックグラウンドで .NET のコンパイラが走ってたりする）</li>
<li>オンラインストレージサービスの同期中</li>
</ul><p>などは Surface Pro 3 が一時的に熱くなる場合があると思うけれど、そうでないのに熱い場合はこうしたプロセスが暴走してる可能性がある。</p>

<div class="section">
<h3>解決策</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140725022907.png" alt="f:id:daruyanagi:20140725022907p:plain" title="f:id:daruyanagi:20140725022907p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回はホームグループへの参加をやめたら症状が収まった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140725023151.png" alt="f:id:daruyanagi:20140725023151p:plain" title="f:id:daruyanagi:20140725023151p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［Windows］ボタンを押して“ホームグループ”と入力すると、ホームグループ関連の設定画面にアクセスできるので、適当にごにょごにょすればいいと思う。</p><p>むかし VAIO を使っていて似たようなトラブルにあったのだけど、そのときもホームグループが原因だったのかな？</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/08/12/223136">VAIO Fit 15 &#x3067;&#x30C7;&#x30A3;&#x30B9;&#x30AF;&#x30A2;&#x30AF;&#x30BB;&#x30B9;&#x304C;&#x304A;&#x3055;&#x307E;&#x3089;&#x306A;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>その時はぶち切れながら Peer *** サービスの停止と IPv6 の無効化で解決していたようだ。</p>

</div>