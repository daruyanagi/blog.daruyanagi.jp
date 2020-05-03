---
date: 2018-06-20T23:21:13.0000000
draft: false
title: "未解決：Visual Studio 2017 から Azure へデプロイできなくなった（回避策）"
tags: ["Microsoft Azure"]
eyecatch: 20180620231506.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180620231506.png" alt="f:id:daruyanagi:20180620231506p:plain" title="f:id:daruyanagi:20180620231506p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっと前からだけど、Visual Studio 2017 から Azure Web Pages へ Web サイトを発行するとエラーが発生するようになった。</p>

<blockquote>
<p>Web deployment task failed. ('Microsoft.Web.Deployment.DeploymentManager' のタイプ初期化子が例外をスローしました。)</p>

</blockquote>
<p>コードはちょっといじったけど、定数値を変えただけで、ロジックは変えていない。Visual Studio のアップデートが原因か、インフラ側で何か変更があったのか。</p><p>ググってみたけど対処方法がよく分かんなかったので、今は <b>FTP 経由で発行</b>している。発行のたびにポータルでサイトを一時停止しなくちゃいけないのがすごい面倒……セキュリティ的にも褒められたものではないだろうし、なんとかなんないかなぁ。</p>

<div class="section">
<h3>追記（2018/06/23 19:30）</h3>
<p>一旦 Web サイトを停止したら Web Deploy でも配置できるかなぁ、と思ってやってみたんだけど、ダメだった。</p>

</div>