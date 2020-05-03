---
date: 2018-06-10T12:39:46.0000000
draft: false
title: "Yakitori 1.1.0.0"
tags: ["Yakitori"]
eyecatch: 
---
<p>GitHub を掃除してたら、<a href="https://github.com/daruyanagi/Yakitori">&#x53E4;&#x3044;&#x30A2;&#x30D7;&#x30EA;</a>を見つけてしまい、ついでなのでいろいろ書き直しちゃいました。タスクバーにピン留めしておくと便利なスクリーンショットツールです。なるべく Windows 10 標準機能と使っている（＆若干の付加機能）のと、タスクトレイに常駐しないのが特徴と言えば特徴。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180610121919.png" alt="f:id:daruyanagi:20180610121919p:plain" title="f:id:daruyanagi:20180610121919p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>ユーザーインターフェイスの刷新</li>
<li>将来的なアップデートに備えたリファクタリング</li>
</ul><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FYakitori%2Freleases%2Ftag%2Fv1.1.0.0" title="daruyanagi/Yakitori" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Yakitori/releases/tag/v1.1.0.0">github.com</a></cite></p><p>トーストを出せるようになりたいなって思っていてそのまま放置だったのですが、WPF ＋ WinRT でごちゃごちゃやるより、WPF ⇔ UWP の仕組みを使えないかなと思い、それに備えたコードの整理を行いました。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180610123808.png" alt="f:id:daruyanagi:20180610123808p:plain" title="f:id:daruyanagi:20180610123808p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>要するに、リクツ上はできるという、これをやってみたい。できるかどうかは知らないけど。</p>
