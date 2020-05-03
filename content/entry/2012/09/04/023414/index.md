---
date: 2012-09-04T02:34:14.0000000
draft: false
title: "さて、WebMatrix で OAuth 認証を……Σ(ﾟдﾟlll)ｶﾞｰﾝ"
tags: ["ASP.net Web Pages", "WebMatrix", "NuGet"]
eyecatch: 
---
<p>WebMatrix 2 では Twitter や Facebook など、外部サービスの OAuth 認証を使ってログインできるサイトも簡単に作れるらしい。というわけで試すことにした。</p><p>いつもどおり Empty Site テンプレートから Webサイトを作成。ついで DotNetOpenAuth extension for ASP.NET (WebPages) を NuGet でインストール。</p><p><img src="20120904015306.png" alt="f:id:daruyanagi:20120904015306p:plain" title="f:id:daruyanagi:20120904015306p:plain" class="hatena-fotolife"><img src="20120904015310.png" alt="f:id:daruyanagi:20120904015310p:plain" title="f:id:daruyanagi:20120904015310p:plain" class="hatena-fotolife"></p><p><b>ガッデム！／(^o^)＼</b> NuGet が古いらしいぞ。</p><p><img src="20120904015418.png" alt="f:id:daruyanagi:20120904015418p:plain" title="f:id:daruyanagi:20120904015418p:plain" class="hatena-fotolife"></p><p>確かに Empty Site テンプレートに含まれるのは 1.6.2 と相当古い。とっくに 2.0 も出てるのにな。しかし、なんで［更新プログラム］のところに出てこないのだろう。自動でアップデートできないじゃないか。一度アンインストールして、再度インストールしてみるかな。</p><p><img src="20120904021510.png" alt="f:id:daruyanagi:20120904021510p:plain" title="f:id:daruyanagi:20120904021510p:plain" class="hatena-fotolife"><img src="20120904021513.png" alt="f:id:daruyanagi:20120904021513p:plain" title="f:id:daruyanagi:20120904021513p:plain" class="hatena-fotolife"></p>

<blockquote cite="https://nuget.org/packages/Microsoft.AspNet.WebPages.Administration">

<div class="section">
<h4>Dependencies</h4>

<ul>
<li>Microsoft.AspNet.WebPages (≥ 2.0.20710.0 && < 2.1)</li>
<li>NuGet.Core (≥ 1.6.2 && < 1.7)</li>
</ul>
</div>
<cite><a href="https://nuget.org/packages/Microsoft.AspNet.WebPages.Administration">NuGet Gallery | Microsoft ASP.NET Web Pages 2 Administration 2.0.20713.0</a></cite>
</blockquote>
<p><b>ジーザス！／(^o^)＼</b> これが依存性地獄か！</p><p>うまくいっているときには気にならないが、こういう状況になると WebMatrix に搭載されている NuGet クライアントは非常に非力かつ情報不足に感じられて、使うのが辛くなる。</p><p>とりあえず、このパッケージが何をしているのかは知らんが、ぶっこ抜くことにした。なに、困ったら初めからやり直せば良い ( ｰ`дｰ´)ｷﾘｯ ＜失うものなどなにもないんだ！</p><p><img src="20120904022334.png" alt="f:id:daruyanagi:20120904022334p:plain" title="f:id:daruyanagi:20120904022334p:plain" class="hatena-fotolife"></p><p><b>ウェルダン！＼(^o^)／</b> これで NuGet.Core のバージョンが 2.0.1 になった。これでもう一度インストールを……</p><p><img src="20120904022727.png" alt="f:id:daruyanagi:20120904022727p:plain" title="f:id:daruyanagi:20120904022727p:plain" class="hatena-fotolife"><img src="20120904022726.png" alt="f:id:daruyanagi:20120904022726p:plain" title="f:id:daruyanagi:20120904022726p:plain" class="hatena-fotolife"></p><p><b>ゴッドイズデス！／(^o^)＼</b> NuGet.Core は関係なかったのか？　Visual Studio の Nuget は最新版なのだけどなぁ。どこかに古いのが残っていて、それを参照しているのかな。面倒くさいことになった。</p><p>まぁ、続きは WebMatrix 2 の正式版まちってことで。ちなみに、今すぐ OAuth を試したい子は Starter Site テンプレートを使うといい。古いバージョンが完璧にセットアップ済みなので、とりあえず試すことができるゾ。</p>
