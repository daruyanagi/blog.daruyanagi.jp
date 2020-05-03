---
date: 2012-06-19T03:46:13.0000000
draft: false
title: "08式机上撮影機 v1.6.0"
tags: ["告知"]
eyecatch: 
---
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/06/18/202158">08&#x5F0F;&#x673A;&#x4E0A;&#x64AE;&#x5F71;&#x6A5F; v1.5.0 - &#x3060;&#x308B;&#x308D;&#x3050;</a> に、<a href="http://daruyanagi.hatenablog.com/entry/2012/06/19/022455">&#x30C7;&#x30B9;&#x30AF;&#x30C8;&#x30C3;&#x30D7;&#x5168;&#x4F53;&#x3092;&#x4E00;&#x6642;&#x7684;&#x306B;&#x6697;&#x8EE2;&#x3055;&#x305B;&#x305F;&#x3044; (2) - &#x3060;&#x308B;&#x308D;&#x3050;</a> を追加。</p><p><a href="http://daruyanagi.net/Type08ScreenCapture">Type08ScreenCapture - Daruboard</a></p>

<div class="section">
<h3>1.6.0（12/06/19）</h3>

<ul>
<li>[修正] <a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B9%A5%AF%A5%EA%A1%BC%A5%F3%A5%B7%A5%E7%A5%C3%A5%C8">スクリーンショット</a>エフェクトの復活</li>
<li>[修正] サウンドの存否チェックを追加</li>
</ul>
</div>
<div class="section">
<h3>Merge 頑張ってみた</h3>
<p>修正には直接関係ないけど、 merge ができないヘタレなので git でちょっと困った。</p><p>前回の修正でうっかり README を更新し忘れたので、それを github でチョチョイのちょいと変更したのだけど、<i>それでリモートとローカルでコンフリクトが起こってしまった ／(^o^)＼ </i>気がついたら、作った覚えのないブランチがある。</p><p><img src="20120619032102.png" alt="f:id:daruyanagi:20120619032102p:plain" title="f:id:daruyanagi:20120619032102p:plain" class="hatena-fotolife"></p><p>(ΦωΦ)ﾌﾌﾌ…でも、GitHub for Windows が何とかしてくれるはず！</p><p><img src="20120619032139.png" alt="f:id:daruyanagi:20120619032139p:plain" title="f:id:daruyanagi:20120619032139p:plain" class="hatena-fotolife"></p><p>(´；ω；｀) ﾅﾝﾄﾓﾅﾗﾅｶｯﾀﾖ……</p><p><img src="20120619032214.png" alt="f:id:daruyanagi:20120619032214p:plain" title="f:id:daruyanagi:20120619032214p:plain" class="hatena-fotolife"></p><p><code>git status</code> というコマンドで何が起こったのか見られるみたい。案の定、 README.md が両方で変更されていると。あうあう。そのあと、あちこちでいろいろ調べながら、いろいろ試してみたのだけど（ちゃんと記録とっとけよ！）、もう、何もわからん。とりあえず、最後に適当に <code>git push</code> してみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">C:</span>\Users\Hidetoshi Yanagi\Documents\GitHub\Type08ScreenCapture [master]&gt; git push
To <a class="keyword" href="http://d.hatena.ne.jp/keyword/https">https</a>:<span class="synComment">//github.com/daruyanagi/Type08ScreenCapture.git</span>
! [rejected]        master -&gt; master (non-fast-forward)
<span class="synStatement">error:</span> failed to push some refs to <span class="synConstant">'</span><span class="synError"><a class="keyword" href="http://d.hatena.ne.jp/keyword/https">https</a>://github.com/daruyanagi/Type08ScreenCapture.git</span><span class="synConstant">'</span>
<span class="synStatement">hint:</span> Updates were rejected because the tip of your current branch <span class="synStatement">is</span> behind
<span class="synStatement">hint:</span> its remote counterpart. Merge the remote changes (e.g. <span class="synConstant">'</span><span class="synError">git pull</span><span class="synConstant">'</span>)
<span class="synStatement">hint:</span> before pushing again.
<span class="synStatement">hint:</span> See the <span class="synConstant">'</span><span class="synError">Note about fast-forwards</span><span class="synConstant">'</span> <span class="synStatement">in</span> <span class="synConstant">'</span><span class="synError">git push --help</span><span class="synConstant">'</span> <span class="synStatement">for</span> details.
</pre><p>オーマイガ━━━━(ﾟ∀ﾟ)━━━━!!</p><p>けれどこのおかげで、<a href="http://linux.keicode.com/prog/git-resolve-non-fast-forward-push-problem.php">Non-Fast-Forward Push &#x306E;&#x89E3;&#x6C7A; - Linux &#x5165;&#x9580;</a>というページに辿り着いて、そこで言うとおりにぷちぷちコマンドを打つと……治った！</p><p><img src="20120619032431.png" alt="f:id:daruyanagi:20120619032431p:plain" title="f:id:daruyanagi:20120619032431p:plain" class="hatena-fotolife"></p><p><img src="20120619033919.png" alt="f:id:daruyanagi:20120619033919p:plain" title="f:id:daruyanagi:20120619033919p:plain" class="hatena-fotolife"></p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">C:</span>\Users\Hidetoshi Yanagi\Documents\GitHub\Type08ScreenCapture [master +<span class="synConstant">0</span> ~<span class="synConstant">0</span> -<span class="synConstant">0</span>!<span class="synConstant">1</span> | +<span class="synConstant">0</span> ~<span class="synConstant">0</span> -<span class="synConstant">0</span> !<span class="synConstant">1</span>]&gt; git mergetool
Merging:
README.md

Normal merge conflict <span class="synStatement">for</span> <span class="synConstant">'</span><span class="synError">README.md</span><span class="synConstant">'</span>:
{local}: modified file
{remote}: modified file
<span class="synStatement">C:</span>\Users\Hidetoshi Yanagi\AppData\Local\GitHub\PortableGit_70baf56a054209e5afe24abd9304204b637c5807/libexec/git-core/mergetools/bc3: line <span class="synConstant">9</span>: bcompare: command not found
README.md seems unchanged.
Was the merge successful? [y/n] y
</pre><p>とりあえず、 <code>git mergetool</code> とか言うのがあればそんなにビビらずにマージできるらしいな。コンフリクトしているところにマークがつくので、それを削りながらどっちの変更が意図した変更なのか明らかにしていけばいいらしい。ほうほぅ……。<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B5%A1%BC%A5%C9%A5%D1%A1%BC%A5%C6%A5%A3">サードパーティ</a>製ツールがあればもっと快適マージライフが送れるのかな？　今度探してみよう。ともあれ、やっぱり、そろそろまとまった書籍でも読まなきゃいけないなぁ<a href="#f1" name="fn1" title="説明書を読むのが嫌いな性格、直さなきゃな……">*1</a>。さっぱりわかんないよ。</p><p>しかし、また一つ賢くなってしまった。どうしよう。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">説明書を読むのが嫌いな性格、直さなきゃな……</span></p>
</div>