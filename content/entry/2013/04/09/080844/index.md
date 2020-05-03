---
date: 2013-04-09T08:08:44.0000000
draft: false
title: "Windows 8 のシャットダウン"
tags: ["Windows 8", "Windows"]
eyecatch: 20130409065337.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130409065337.png" alt="f:id:daruyanagi:20130409065337p:plain" title="f:id:daruyanagi:20130409065337p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Windows 8 をシャットダウンする方法が分からない」という声をよく聞く。そのせいか、シャットダウンの方法を解説するブログ記事をよく見かける。チャームを出して、［設定］を押して……というヤツだ。ほかにも［Ctrl］＋［Alt］＋［Delete］キーを押して画面右下のボタンからシャットダウンするという技もある。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130409/20130409072001.gif" alt="f:id:daruyanagi:20130409072001g:plain" title="f:id:daruyanagi:20130409072001g:plain" class="hatena-fotolife" itemprop="image"></span></p><p>でも、一番手っ取り早いのは<i>電源ボタンを押す</i>ことだと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130409065803.png" alt="f:id:daruyanagi:20130409065803p:plain" title="f:id:daruyanagi:20130409065803p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>少なくともうちのデスクトップマシンでは電源ボタンの既定の動作が「シャットダウン」になっていて、押すと実際シャットダウンシーケンスが始まる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130409070844.png" alt="f:id:daruyanagi:20130409070844p:plain" title="f:id:daruyanagi:20130409070844p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちなみに Surface RT の場合はこんな感じ。電源ボタンの操作に加え、カバーを閉じた場合のアクションも指定可能になっており、既定では「スリープ」が割り当てられている。おそらくたいていのラップトップは同じ設定になっているはず。</p>
<p></p>

<div class="section">
<h3>ソフトウェアシャットダウンはもう古い</h3>
<p>けれど、これに納得しない人は少なくないだろう。<i>「わざわざこんな使いにくいところに電源メニューを配置するなんて！　意味わからない！」</i>でも、それは今に始まったことじゃないんですよ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130409071357.jpg" alt="f:id:daruyanagi:20130409071357j:plain" title="f:id:daruyanagi:20130409071357j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たとえば、Windows Vista の電源メニューはこんな感じだった。すでに「スリープ（スタンバイ＋休止状態）」が既定になっていて、再起動やシャットダウンを選択するにはひと手間かかるようになっている。</p><p>なにをいまさら？　Windows 8 ではその“ひと手間”がさらに増えただけだ。</p><p>冷静に考えてみれば、PC をシャットダウンすることなど日に何度あるだろう。再起動だって必要になれば「再起動しますか？」→［はい］ボタンの押し下げで済むことがほとんどだ。そんなことのために“特等席”を用意してあげる意味って？</p><p>たしかに、かつては作法に則ってソフトウェアでシャットダウンすることが推奨されていた。</p>

<blockquote cite="http://irk.or.jp/kaga/pc/1-5.html">
<p>普通の電化製品の常識的に考えれば、電源ボタンをまた押して、電源を切ればいいということになりますが、パソコンに限っては、それは極力やってはならないタブーなんです。後できちんと説明しますが、WINDOWSのメニューから電源を切るを選択して終わらせなければいけません。 それでは、なぜ、電源ボタンを押してはいけないのか？ これには、ちゃんとした理由があるのですが、その説明は初心者の方には難しいので、稀にパソコンが壊れてしまうことがあるからとだけ言っておきましょう。当然ですが、パソコンが壊れたら困りますよね。けして、電源ボタンをむやみに押さないようにして下さい。</p>

<cite><a href="http://irk.or.jp/kaga/pc/1-5.html">&#x7B2C;&#xFF11;&#x7AE0; &#x30D1;&#x30BD;&#x30B3;&#x30F3;&#x3092;&#x59CB;&#x3081;&#x3088;&#x3046; &#xFF08;&#xFF15;&#xFF09;&#x30D1;&#x30BD;&#x30B3;&#x30F3;&#x306E;&#x7D42;&#x4E86;</a></cite>
</blockquote>
<p>けれど、それももう過去の話。ACPI（<a href="http://ja.wikipedia.org/wiki/Advanced_Configuration_and_Power_Interface">Advanced Configuration and Power Interface - Wikipedia</a>）が十分に普及した今、わざわざ古い「タブー」に縛られなければならない理由はない。</p>

<blockquote cite="http://windows.microsoft.com/ja-jp/windows7/turning-off-your-computer-properly">

<div class="section">
<h4>コンピューターの電源を正しくオフにする</h4>
<p>エネルギーを節約するためだけでなく、コンピューターのセキュリティを確保し、データが確実に保存されるようにするためにも、コンピューターでの作業を終えた後、正しく電源をオフにすることが重要です。コンピューターの電源を正しくオフにするには、コンピューターの電源ボタンを押す、スタート メニューの [シャットダウン] ボタン (電源ボタンと呼ばれることもあります) を使用する、カバーを閉じる (ノート PC の場合) の 3 つの方法があります。</p>

</div>
<div class="section">
<h4>スリープの使用</h4>
<p>コンピューターをスリープ解除するには、コンピューター ケースの電源ボタンを押します。Windows が起動するまで待つ必要がないため、数秒内にコンピューターをスリープ解除してすぐに作業を再開できます。</p>

</div>
<cite><a href="http://windows.microsoft.com/ja-jp/windows7/turning-off-your-computer-properly">&#x30B3;&#x30F3;&#x30D4;&#x30E5;&#x30FC;&#x30BF;&#x30FC;&#x306E;&#x96FB;&#x6E90;&#x3092;&#x6B63;&#x3057;&#x304F;&#x30AA;&#x30D5;&#x306B;&#x3059;&#x308B;</a></cite>
</blockquote>
<p>Microsoft のサイトにもこう書いてある。</p>

</div>
<div class="section">
<h3>ユーザーの慣れを継続的にコントロールする</h3>
<p>つまり、Windows 8 で電源メニューが分かりにくい場所に配置されているのは“デザイン”――「使うな」という開発者側の意図の表れ――なのだと思う。そろそろそんなもの使うのやめましょうよ、という Microsoft のメッセージなのだ。さすがに電源メニューをそっくり取り去ってしまうのは問題なので、新しいスタート画面との兼ね合いであそこに御行幸をお願い奉り申し上げたというわけ。</p><p>今思えば、このために Microsoft は Windows Vista の時代からゆっくり時間をかけてユーザーを馴らしていたと言える。OS のデザインというのは、技術の進歩およびユーザーのレベルと共進化していくものらしい。</p><p>その意味で、Windows Vista の商業的失敗は不幸だった。Windows XP から Windows 8 へのアップデートはユーザーの“慣れ”に配慮したデザインの漸進的進歩をまったく無視した行為。10年の時間を一気に取り戻そうとするのだから浦島太郎になっても仕方がない。OS をアップデートしないということは、機能面での遅れだけでなく、デザインへの慣れという点でもかなり不利だ。アップデートに否定的なユーザーは、この代償についても考慮を割くべきだと思う。</p><p>とはいえ、アップデートしないユーザーにすべての責任を負わせるわけにもいかないだろう。アップデートにかかる費用と面倒が馬鹿にならないのも事実で、Microsoft はもっとアップデートのハードルを下げるべきだ。もっと頻繁に新バージョンをリリースし、その分アップデートにかかる費用を下げれば、ユーザーが5年も10年も我慢して旧製品を使い続ける理由はなくなるはずだ。</p><p>というわけで、「Windows 8.1」にはその面での期待をしている。ちょっと気は早いけれど「Windows 8.2」もさっさと出してほしい。</p><p>――「Visual Studio 2012.2」のリリースを祝して、記す。</p>

<ul>
<li><a href="http://www.forest.impress.co.jp/docs/news/20130408_594991.html">Microsoft&#x3001;&#x300C;Visual Studio 2012 Update 2&#x300D;&#x3092;&#x6B63;&#x5F0F;&#x516C;&#x958B; - &#x7A93;&#x306E;&#x675C;</a></li>
</ul>
</div>