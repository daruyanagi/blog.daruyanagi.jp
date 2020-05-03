---
date: 2018-09-23T13:48:15.0000000
draft: false
title: "9月22日：daruyanagi.jp を HTTPS にした"
tags: ["告知", "GitHub"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180923133157.png" alt="f:id:daruyanagi:20180923133157p:plain" title="f:id:daruyanagi:20180923133157p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今週は3連休。外に行く元気もないので、このお休みは溜まってるインドア仕事を片付ける。まずは、サイトのお手入れ。はてなのおかげで blog.daruyanagi.jp が HTTPS になったのに、メイン（？）の daruyanagi.jp は HTTP のままでカッコ悪いなぁ、と思っていたところだったし、本腰を入れてやる。</p><p>現状、daruyanagi.jp は</p>

<ul>
<li>ASP.NET Core Razor Pages：表はたいして何もないのだけど、ウラで謎の仕組みがいろいろ動いている
<ul>
<li>無職の仕事を楽にするためのツール</li>
<li>旧ブログ（かつて daruyanagi.jp ではてなブログを運営していた）からのリダイレクト</li>
</ul></li>
<li>Microsoft Azure の共有プランで独自ドメインを割り当てて運用（月1,000円ぐらい）</li>
</ul><p>みたいな感じ。Microsoft Azure の共有プランは SSL をサポートしていないので、このままでは HTTPS 化できない。SSL 対応のベーシックプランにアップグレードすると、月7,000円ぐらいかかる。</p><p>たいしたサイトじゃないのに月7,000円もかけてはいられないし、できればタダでできないかなーと思ってたのだけど、GitHub Pages＋Let's encrypt ならば結構簡単にできそうだ。――というわけで、</p>

<ul>
<li>今の daruyanagi.jp は独自ドメインを外す（引き続き daruyanagi.azurewebsites.net でアクセスできるので、ツール類の移行は不要。リダイレクトは数年以上やってたわけで、いい加減いいだろう）</li>
<li>GitHub Pages で HTTPS なペライチのサイトを立てて、これに daruyanagi.jp を割り当てる</li>
</ul><p>みたいな感じでやってみた。</p><p>やり方はあちこちで解説されてるし、ぶっちゃけ公式のマニュアルみれば誰でもできると思うので割愛。ただ、HTTPS のオプションを有効化してから実際に反映されるまで少し時間がかかったのはちょっと不安で、そこだけあわあわしてしまった。ガチャガチャしてるうちに反映されて、無事使えるようになった。</p><p><blockquote class="twitter-tweet" data-lang="HASH(0xc4a5d78)"><p lang="ja" dir="ltr">GitHub Pages で <a href="https://t.co/uJG0Fdi9by">https://t.co/uJG0Fdi9by</a> を HTTPS にしてる。もう少し待たないといけないみたい <a href="https://t.co/kCyLNdKm5M">pic.twitter.com/kCyLNdKm5M</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1043382470861762560?ref_src=twsrc%5Etfw">September 22, 2018</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p><blockquote class="twitter-tweet" data-lang="HASH(0xbcb33c8)"><p lang="ja" dir="ltr">ぉ、いけたわ？ <a href="https://t.co/lnKuBSZjZE">pic.twitter.com/lnKuBSZjZE</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1043382782163005441?ref_src=twsrc%5Etfw">September 22, 2018</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p><blockquote class="twitter-tweet" data-lang="HASH(0xca75af0)"><p lang="ja" dir="ltr">だめだな？ <a href="https://t.co/0Cj76LVvvI">pic.twitter.com/0Cj76LVvvI</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1043383213886853120?ref_src=twsrc%5Etfw">September 22, 2018</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p><blockquote class="twitter-tweet" data-lang="HASH(0xcbbc3b8)"><p lang="ja" dir="ltr">HTTPS なったー <a href="https://t.co/1FSxr4NYUv">pic.twitter.com/1FSxr4NYUv</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1043384844086996994?ref_src=twsrc%5Etfw">September 22, 2018</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>デザインも新しく……っていうか、手打ちでちょろちょろっと組んでポイっとあげておいた。あんまりテストしてないし、なんか味気ないけど、まぁ、おいおい充実させていくことにする。</p>
