---
date: 2017-06-07T19:18:44.0000000
draft: false
title: "Tonjiru v1.1.0 ＋ GitHub Flow × GitHub for Windows"
tags: ["Tonjiru", "GitHub", "告知"]
eyecatch: 20170607185555.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607185555.png" alt="f:id:daruyanagi:20170607185555p:plain" title="f:id:daruyanagi:20170607185555p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>アイコンを付けた</li>
<li>SendMessage と PostMessage を選択できるように</li>
<li>不具合の修正</li>
</ul><p>SendMessage だと相手がメッセージの処理を完了するまで制御が返ってこないので、PostMessage を使う方がいいかなって思った。</p><p><iframe src="//hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FTonjiru%2Freleases%2Ftag%2Fv1.1.0" title="daruyanagi/Tonjiru" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Tonjiru/releases/tag/v1.1.0">github.com</a></cite><br />
</p>

<div class="section">
<h3>関係のない話：GitHub Flow × GitHub for Windows</h3>

<blockquote cite="https://gist.github.com/Gab-km/3705015">
<p>GitHub Flowとは何だろうか？</p>

<ul>
<li>masterブランチのものは何であれデプロイ可能である</li>
<li>新しい何かに取り組む際は、説明的な名前のブランチをmasterから作成する（例: new-oauth2-scopes）</li>
<li>作成したブランチにローカルでコミットし、サーバー上の同じ名前のブランチにも定期的に作業内容をpushする</li>
<li>フィードバックや助言が欲しい時、ブランチをマージしてもよいと思ったときは、 プルリクエスト を作成する</li>
<li>他の誰かがレビューをして機能にOKを出してくれたら、あなたはコードをmasterへマージすることができる</li>
<li>マージをしてmasterへpushしたら、直ちにデプロイをする</li>
</ul><p>これがフローのすべてだ。 </p>

<cite><a href="https://gist.github.com/Gab-km/3705015">GitHub Flow (Japanese translation) &middot; GitHub</a></cite>
</blockquote>
<p>去年ぐらいからこれを実践している（つもり）なのだけど、如何せん、一人でやっているのであまり自信がない。ので、自分のやり方をさらしておく。</p>

<div class="section">
<h4>1. 何か改善を思いついたら issue にメモする</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190042.png" alt="f:id:daruyanagi:20170607190042p:plain" title="f:id:daruyanagi:20170607190042p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>この作業が一番面倒くさい……なにかいいアプリ（できればモバイル）があればいいんだけどな。</p>

</div>
<div class="section">
<h4>2. GitHub for Windows を起動して Sync</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190154.png" alt="f:id:daruyanagi:20170607190154p:plain" title="f:id:daruyanagi:20170607190154p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>コマンドだと間違えるマンなので、GUI クライアントを使う。GitHub for Windows（現行安定版）を起動したらこまめに Sync しておく。</p>

</div>
<div class="section">
<h4>3. ブランチを切って Visual Studio で実装する</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190318.png" alt="f:id:daruyanagi:20170607190318p:plain" title="f:id:daruyanagi:20170607190318p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ローカルでブランチを切る。名前は……最近は解決する issue の名前を付けている。今回は issue #12 を直したいので、“issue12”と付けた。</p><p>Visual Studio でしばし開発――中断するときは Sync しておく。</p>

</div>
<div class="section">
<h4>4. コミット</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190501.png" alt="f:id:daruyanagi:20170607190501p:plain" title="f:id:daruyanagi:20170607190501p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>終わったらコミットする。コメントを“resolve #”にすると、issue が保管されるのが GitHub for Windows のよいところ。</p>

<div class="section">
<h5>追記（2017/07/08）</h5>
<p>書き忘れたけど、こうしておくと issue が自動でクローズされて便利。</p>

</div>
</div>
<div class="section">
<h4>5. プルリクエストを作成</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190639.png" alt="f:id:daruyanagi:20170607190639p:plain" title="f:id:daruyanagi:20170607190639p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>画面左上の［Pull request］ボタンを押してプルリクエストを作成する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190714.png" alt="f:id:daruyanagi:20170607190714p:plain" title="f:id:daruyanagi:20170607190714p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>送信したら［Visit it on GitHub］をクリック。ブラウザーでプルリクエストの画面を開く。</p>

</div>
<div class="section">
<h4>6. プルリクエストをマージ</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190809.png" alt="f:id:daruyanagi:20170607190809p:plain" title="f:id:daruyanagi:20170607190809p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あまり何も考えずにマージ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190843.png" alt="f:id:daruyanagi:20170607190843p:plain" title="f:id:daruyanagi:20170607190843p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>マージが終わったら、ブランチを削除しておく。</p>

</div>
<div class="section">
<h4>7. ローカルを master に切り替えて Sync</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170607190925.png" alt="f:id:daruyanagi:20170607190925p:plain" title="f:id:daruyanagi:20170607190925p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GitHub for Windows に戻ってブランチを master に切り替えて、Sync ボタンを押す。プルリクエストがにょきっと表れて、master にむちょちょ～っと追加されるのを眺めて達成感に浸る。</p><p>→ 3 に戻る。</p>

</div>
<div class="section">
<h4>注意点</h4>

<ul>
<li>ブランチを切った後に master を更新してしまったら、［Update from master］する。</li>
<li>とりあえずミスしても落ち着く（master に戻すのを忘れて、サブブランチからブランチを切ったとか）。シンプルに保っていれば、復旧はそんなに難しくない。小幅な変更なら思い切って捨てて、master に戻れ</li>
<li>master で作業しないようにだけ気を付ける。バージョンのインクリメントとか、しょうもないのはそのまま作業していいことにしてるけど。</li>
<li>アレしてる間にコレしたくなっても我慢しろ。コレは issue に書いておけ。あとでブランチ切って コレ に取り組め。</li>
</ul><p>いろいろ試してみたけどダメだった／(^o^)＼ ってときにブランチごと捨てられるので、昔みたいにプロジェクトをコピペしてサンプルコードを書く（！！）みたいなことはしなくなった。“test”なんちゃらというブランチを切って、試して捨てる。これだけでもだいぶ進歩したのかなって思うけれど、一人でやってるとこれでいいのかさっぱりわかんなくて不安になるネ。</p>

</div>
</div>