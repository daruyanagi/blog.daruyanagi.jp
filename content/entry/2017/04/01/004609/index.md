---
date: 2017-04-01T00:46:09.0000000
draft: false
title: "Microsoft Flow × だるやなぎ API で俺さまの年齢をつぶやく"
tags: ["Microsoft Flow", "だるやなぎ"]
eyecatch: 20170401003108.png
---
<p>Microsoft Flow は</p>

<ul>
<li>API にアクセスして</li>
<li>データを解析し</li>
<li>それをツイートする</li>
</ul><p>といったこと（ロジックフローの連鎖）を簡単に実現できるサービスです。“あーして、こうして、そんでもってこうする！”みたいなのをダイアグラム的に書けるわけですね。あとでスクリーンショットをのせておくので見てほしいのですが、割とビジュアルでわかりやすいです。</p><p>この Microsoft Flow はスタンドアロンで</p>

<ul>
<li>定期的に</li>
<li>フィードが配信されたら</li>
</ul><p>みたいなトリガー（処理のきっかけ）を使うこともできますが、モバイルアプリを利用すれば<b>「このボタンを押すと」</b>をトリガーにすることができます。</p><p>今回は だるやなぎ API を利用してモバイルアプリから年齢をつぶやく例を紹介します。毎日、僕の年齢を Twitter につぶやけて、とても便利です。</p>

<div class="section">
<h3>だるやなぎ API</h3>
<p>だるやなぎ API <a href="http://api.daruyanagi.jp/">http://api.daruyanagi.jp/</a> は、だるやなぎのさまざまな情報を取得できる API です。たとえば、<a href="http://api.daruyanagi.jp/?format=xml">http://api.daruyanagi.jp/?format=xml</a> を叩くと、</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;object&gt;</span>
<span class="synIdentifier">&lt;Name&gt;</span>YANAGI, Hidetoshi<span class="synIdentifier">&lt;/Name&gt;</span>
<span class="synIdentifier">&lt;NickName&gt;</span>daruyanagi<span class="synIdentifier">&lt;/NickName&gt;</span>
<span class="synIdentifier">&lt;Birth&gt;</span>1980-04-20T09:00:00<span class="synIdentifier">&lt;/Birth&gt;</span>
<span class="synIdentifier">&lt;DateTime&gt;</span>1998-04-20T09:00:00<span class="synIdentifier">&lt;/DateTime&gt;</span>
<span class="synIdentifier">&lt;Elapsed&gt;</span>
<span class="synIdentifier">&lt;Ticks&gt;</span>5679936000000000<span class="synIdentifier">&lt;/Ticks&gt;</span>
<span class="synIdentifier">&lt;Days&gt;</span>6574<span class="synIdentifier">&lt;/Days&gt;</span>
<span class="synIdentifier">&lt;Hours&gt;</span>0<span class="synIdentifier">&lt;/Hours&gt;</span>
<span class="synIdentifier">&lt;Milliseconds&gt;</span>0<span class="synIdentifier">&lt;/Milliseconds&gt;</span>
<span class="synIdentifier">&lt;Minutes&gt;</span>0<span class="synIdentifier">&lt;/Minutes&gt;</span>
<span class="synIdentifier">&lt;Seconds&gt;</span>0<span class="synIdentifier">&lt;/Seconds&gt;</span>
<span class="synIdentifier">&lt;TotalDays&gt;</span>6574<span class="synIdentifier">&lt;/TotalDays&gt;</span>
<span class="synIdentifier">&lt;TotalHours&gt;</span>157776<span class="synIdentifier">&lt;/TotalHours&gt;</span>
<span class="synIdentifier">&lt;TotalMilliseconds&gt;</span>567993600000<span class="synIdentifier">&lt;/TotalMilliseconds&gt;</span>
<span class="synIdentifier">&lt;TotalMinutes&gt;</span>9466560<span class="synIdentifier">&lt;/TotalMinutes&gt;</span>
<span class="synIdentifier">&lt;TotalSeconds&gt;</span>567993600<span class="synIdentifier">&lt;/TotalSeconds&gt;</span>
<span class="synIdentifier">&lt;/Elapsed&gt;</span>
<span class="synIdentifier">&lt;Age&gt;</span>18<span class="synIdentifier">&lt;/Age&gt;</span>
<span class="synIdentifier">&lt;AgeAtLastBirthday&gt;</span>18<span class="synIdentifier">&lt;/AgeAtLastBirthday&gt;</span>
<span class="synIdentifier">&lt;AgeByCalendarYear&gt;</span>19<span class="synIdentifier">&lt;/AgeByCalendarYear&gt;</span>
<span class="synIdentifier">&lt;Married&gt;</span>false<span class="synIdentifier">&lt;/Married&gt;</span>
<span class="synIdentifier">&lt;Job&gt;</span>Oil King<span class="synIdentifier">&lt;/Job&gt;</span>
<span class="synIdentifier">&lt;Photos&gt;</span>
https://onedrive.live.com/?authkey=%21ALMyzgcuZ67AAng<span class="synError">&amp;</span>id=2260696B6A4680D7%2118945<span class="synError">&amp;</span>cid=2260696B6A4680D7
<span class="synIdentifier">&lt;/Photos&gt;</span>
<span class="synIdentifier">&lt;Place&gt;</span>
<span class="synIdentifier">&lt;Name&gt;</span>愛媛 松山市<span class="synIdentifier">&lt;/Name&gt;</span>
<span class="synIdentifier">&lt;SouthWest&gt;</span>
<span class="synIdentifier">&lt;Latitude&gt;</span>33.687285<span class="synIdentifier">&lt;/Latitude&gt;</span>
<span class="synIdentifier">&lt;Longitude&gt;</span>132.491125<span class="synIdentifier">&lt;/Longitude&gt;</span>
<span class="synIdentifier">&lt;/SouthWest&gt;</span>
<span class="synIdentifier">&lt;NorthEast&gt;</span>
<span class="synIdentifier">&lt;Latitude&gt;</span>34.073779<span class="synIdentifier">&lt;/Latitude&gt;</span>
<span class="synIdentifier">&lt;Longitude&gt;</span>132.926666<span class="synIdentifier">&lt;/Longitude&gt;</span>
<span class="synIdentifier">&lt;/NorthEast&gt;</span>
<span class="synIdentifier">&lt;/Place&gt;</span>
<span class="synIdentifier">&lt;/object&gt;</span>
</pre><p>というデータが返ってきます。年齢や職業も一発ですね！　JSON 形式でも取得できるんですよ。</p>

</div>
<div class="section">
<h3>ざっとした使い方</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003108.png" alt="f:id:daruyanagi:20170401003108p:plain" title="f:id:daruyanagi:20170401003108p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ますは <a href="https://flow.microsoft.com/ja-jp/">https://flow.microsoft.com/ja-jp/</a> からアプリをダウンロードします。iOS 版と Android 版があります。Windows 10 Mobile？……知らない子ですね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401002713.png" alt="f:id:daruyanagi:20170401002713p:plain:w320" title="f:id:daruyanagi:20170401002713p:plain:w320" class="hatena-fotolife" style="width:320px" itemprop="image"></span> <span itemscope itemtype="http://schema.org/Photograph"><img src="20170401002815.png" alt="f:id:daruyanagi:20170401002815p:plain:w320" title="f:id:daruyanagi:20170401002815p:plain:w320" class="hatena-fotolife" style="width:320px" itemprop="image"></span></p><p>ダウンロードしたら、まずなにかフローを作成してみてください。わかんなかったらテンプレートがいっぱいあるので、なにか選んでみましょう。たとえばこの<b>“上司に今日は在宅勤務にするというメールを送信する”</b>なんて便利じゃないでしょうか。これを改造すれば、遅刻メールがワンボタンで送れるようになります。</p>

</div>
<div class="section">
<h3>Microsoft Flow に API を食わせる</h3>
<p>フローはモバイルアプリでも作れますが、個人的にはオンラインで作る方が好きです。画面がでかいので。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003551.png" alt="f:id:daruyanagi:20170401003551p:plain" title="f:id:daruyanagi:20170401003551p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回作ったフローはこんな感じです。シンプルですね！　ほんとうは API が 200（成功）以外のレスポンスを返すことも考慮した方がよいでしょう。失敗したらメールで通知、みたいなのとか、どうでしょう？</p><p>ポイントとなるのは、HTTP アクセスと――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003718.png" alt="f:id:daruyanagi:20170401003718p:plain" title="f:id:daruyanagi:20170401003718p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>JSON の解析でしょうか。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003739.png" alt="f:id:daruyanagi:20170401003739p:plain" title="f:id:daruyanagi:20170401003739p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>JSON の解析は一見難しそうですけど、サンプルの JSON データを一度食べさせると、それを解析し、他の処理に使いまわせるようにしてくれます。めっちゃ簡単ですね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003854.png" alt="f:id:daruyanagi:20170401003854p:plain" title="f:id:daruyanagi:20170401003854p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>だいたいこんな感じです。変数がビジュアルな感じで、わかりやすいと思います。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003944.png" alt="f:id:daruyanagi:20170401003944p:plain:w320" title="f:id:daruyanagi:20170401003944p:plain:w320" class="hatena-fotolife" style="width:320px" itemprop="image"></span> <span itemscope itemtype="http://schema.org/Photograph"><img src="20170401003958.png" alt="f:id:daruyanagi:20170401003958p:plain:w320" title="f:id:daruyanagi:20170401003958p:plain:w320" class="hatena-fotolife" style="width:320px" itemprop="image"></span></p><p>フローを保存するとアプリにボタンが現れるので、さっそく押してみましょう。</p><p><blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">daruyanagi は 18 歳無職独身男性です。今日まで 6574 日生きてきました。ごめんなさい。 <a href="https://t.co/5FcERn6wgP">https://t.co/5FcERn6wgP</a></p>&mdash; だるやなぎドロップアウト (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/847829505712336897">2017年3月31日</a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p><p>ちゃんと 18歳 とツイートされました！</p>

</div>
<div class="section">
<h3>補足</h3>

<ul>
<li>JSON データの解析・変数化は、階層まで考慮してくれません。異なる階層で同じ名前の変数があるとちょっと厄介（見分けがつかない</li>
<li>Twitter に紐づけられるアカウントの数は 2 つまでのようです。無料アカウントで3つ目を登録するとエラーがでます（言い忘れていましたが、<b>MicrosoftFlow は基本タダ</b>です。ただし、回数などに制限があります……が、個人利用ならそんなに気にしなくていいかな）</li>
<li>Twitter でつぶやくテキストは自由に編集できますが
<ul>
<li>スパム防止のために @ は削除されます（メンションできません</li>
<li>そもそも @ を使うとフローが壊れるっぽい</li>
</ul></li>
</ul>
</div>
<div class="section">
<h3>P.S.</h3>
<p>この記事は 4月1日の午前中 に作成されました。</p>

</div>