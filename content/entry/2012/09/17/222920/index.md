---
date: 2012-09-17T22:29:20.0000000
draft: false
title: "燃費記録用の Windows ストアアプリを作ってみた"
tags: ["Windows ストア アプリ"]
eyecatch: 
---
<p><img src="20120917215840.png" alt="f:id:daruyanagi:20120917215840p:plain" title="f:id:daruyanagi:20120917215840p:plain" class="hatena-fotolife"></p><p>昔、Windows Phone 向けに作っていた燃費記録アプリを Windows ストアアプリに移植してみた。移植といっても、コードの共通部分はほとんどないけれど……というのも、移植元のコードが腐ってた（ぁ</p><p>丸二日ぐらい格闘していたのだけれど、ぶっちゃけ疲れた。</p>

<ul>
<li>ライブラリがいろいろ足りない。ファイルベースのデータベースすらない<a href="#f1" name="fn1" title="いくつか試してみたけど動かなかったり……">*1</a></li>
<li>サンプルがてら開いてみたテンプレのコード量に挫折しそう<a href="#f2" name="fn2" title="あとになってみると、それほどたいそうなことをしていないのがわかった">*2</a></li>
<li>WPF/Silverlight と微妙に違うところに足をすくわれる（まぁ、WinRT だし）</li>
<li>XAML に慣れてない＆タイプミスでバインディングがうまくいかず悩みまくり</li>
<li>いろいろなレイアウトに対応しなきゃいけない</li>
</ul><p>とくに最後は素人には酷で、</p><p><img src="20120917220217.png" alt="f:id:daruyanagi:20120917220217p:plain" title="f:id:daruyanagi:20120917220217p:plain" class="hatena-fotolife"></p><p>スナップしたときのデザインがボロボロなのを、</p><p><img src="20120917220222.png" alt="f:id:daruyanagi:20120917220222p:plain" title="f:id:daruyanagi:20120917220222p:plain" class="hatena-fotolife"></p><p>ここまで治すのに3時間ぐらいかかった。しかも、テンプレートをよく読んでみると、もっとエレガントな方法があるらしい<a href="#f3" name="fn3" title="ViewState というのがわからない">*3</a>。Windows ストアアプリで情報発信している人までは追い切れていないけれど、全体的に情報量が少なくてかなりきつかった。だったら自分で書けよ！　って感じなのだけれど、書くためにはその何倍も理解してなきゃダメなんだよ、コンチクショウ！</p><p><img src="20120917222754.png" alt="f:id:daruyanagi:20120917222754p:plain" title="f:id:daruyanagi:20120917222754p:plain" class="hatena-fotolife"></p><p>でも、まぁ、ここまでできて妙な達成感はあった（ぉ</p><p>一つの収穫は M-VM-V を意識したプログラミングの長所を実感できたところ。ちゃんと M-VM を作っておけば、V の変更がとても簡単になり、かつ M への影響を（理想的には）ゼロにすることができる。</p><p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://a0.twimg.com/profile_images/2605393123/l1prcrlo9y1oqshk9ktd_normal.jpeg" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      VM ちゃんと作っておけば、必要な時に適当にプロパティ作ってバインディングしてもモデルが汚れないのだな！</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/247533888572911616" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-09-17</span> <span class="twitter-detail-info-time">12:14:12</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/ugaya40"><img src="http://a0.twimg.com/profile_images/2583339428/65e01d13-db8f-41f3-b27d-6d3e2e14f0df_normal.png" alt="ugaya40" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> さーいえっさー！</p><p class="twitter-detail-info"><a href="http://twitter.com/ugaya40/status/247534106848673792" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-09-17</span> <span class="twitter-detail-info-time">12:15:04</span></a> <span class="twitter-detail-info-source">via <a href="http://krile2.starwing.net/" rel="nofollow">Krile2</a></span> to @<a href="http://twitter.com/daruyanagi/status/247533888572911616"  class="twitter-user-screen-name">daruyanagi</a></p></div></div></p><p>MVVM 星人の言ってたこと、やっと少しだけわかったよ ( ｀ー´)ノ</p><p>年内にはカタチにできそうだけれど、今月中のストア提出はあきらめムードだなぁ。だれだよ、Windows ストアアプリは簡単に作れるとか言ったの。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">いくつか試してみたけど動かなかったり……</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">あとになってみると、それほどたいそうなことをしていないのがわかった</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">ViewState というのがわからない</span></p>
</div>