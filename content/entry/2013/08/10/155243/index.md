---
date: 2013-08-10T15:52:43.0000000
draft: false
title: "WebMatrix 3 で Wiki クローンを作る vol.1"
tags: ["WebMatrix 3 で Wiki クローンを作る", "WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p>前回（<a href="https://blog.daruyanagi.jp/entry/2013/07/17/054740">WebMatrix 3 &#x3067; Wiki &#x30AF;&#x30ED;&#x30FC;&#x30F3;&#x3092;&#x4F5C;&#x308B; vol.0 - &#x3060;&#x308B;&#x308D;&#x3050;</a>）からすでに1ヶ月たちましたが、だいたいこんなペースで、気が向いたときにやっていくと思います。すまんやで！</p><p>さて、今回はデータの読み書きです。Wiki と言えば、データはテキストとして保存するるタイプが多いんですかね？　まぁ、それでもいいんですけど、WebMatrix では <b>SQL Server Compact Edition</b>（SQL CE と略されることが多いです）が簡単に扱えるので、それを利用したいと思います。</p><p><b>SQL CE</b> というのは Microsoft SQL Server 兄弟の末弟で、SQLite みたいにポータブルに扱えるタイプのデータベースです。ちなみに、WebMatrix はそのお兄さん（SQL Server）や、お兄さんのライバル（MySQL）なんかともなかよくできるのですけれど、ああいうのはインストールとかセッティングとかメンテナンスとか面倒ですよね。その点、SQL CE はデータベースファイルをひとつポンと作るだけなので楽ちんです。ちなみに、タダ。</p>

<div class="section">
<h3>データベースの作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810152905.png" alt="f:id:daruyanagi:20130810152905p:plain" title="f:id:daruyanagi:20130810152905p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>WebMatrix でデータを扱うには、［データベース］というワークスペースを選択します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810152957.png" alt="f:id:daruyanagi:20130810152957p:plain" title="f:id:daruyanagi:20130810152957p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>では、さっそくデータベースを作りましょう。データベースのファイル名はなんでもいいです。今回はプロジェクト名そのままの“Green Tights.sdf”にしました。続いてテーブルの作成。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810153138.png" alt="f:id:daruyanagi:20130810153138p:plain" title="f:id:daruyanagi:20130810153138p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回はこんなかんじにしてみました。ついでにテーブルの定義も作っておきましょう。テーブルの名前は“Post”で、投稿を管理するテーブルです。</p>

<ul>
<li>PostId：bigint（でっかい整数）型。“主キーかどうか”“ID かどうか”の両方を“はい”にしました。テーブルに行が挿入されると自動でインクリメントされるはずです。</li>
<li>Title：最大60文字の nvarchar（文字列）型。文字数は適当……。“Null（からっぽ）を許可”を“いいえ”にしておきます。</li>
<li>RawText：ntext 型。あらかじめ文字列の数を決めなくてよいテキスト型。本文をぶちこんでおくには最適かな？</li>
<li>CreatedAt：datetime（日時）型。その名の通り作成日時です。</li>
<li>UpdatedAt：datetime（日時）型。今回は使いませんが、のちのち更新日を記録しておきたくなると思うので。</li>
</ul><p>これを“Post”という名前で作っておきます。</p>

</div>
<div class="section">
<h3>データの入力画面の作成</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810153956.png" alt="f:id:daruyanagi:20130810153956p:plain" title="f:id:daruyanagi:20130810153956p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［ファイル］ワークスペースへ移行、とりあえず NewPost.cshtml という名前でデータの入力画面ページをルートフォルダ―に作成します。この画面には、<a href="http://***/NewPost">http://***/NewPost</a> でアクセスできます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810154059.png" alt="f:id:daruyanagi:20130810154059p:plain" title="f:id:daruyanagi:20130810154059p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>コードの方はこんな感じ。ごくごく簡単で、エラー処理っぽいことはしていません。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synStatement">if</span> (IsPost) <span class="synComment">// POST 要求だけを受け付けましょう</span>
{
<span class="synComment">// Request[&quot;name&quot;] で送られてきた名前を取得。</span>
<span class="synComment">// POST データなら Request.Form[&quot;name&quot;] の方がフォーマルな書き方かな</span>
var title = Request[<span class="synConstant">&quot;title&quot;</span>];
var raw_text = Request[<span class="synConstant">&quot;raw-text&quot;</span>];
var now = DateTime.Now;

<span class="synComment">// データベースを開く。拡張子はいらない</span>
<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;Green Tights&quot;</span>))
{
<span class="synType">const</span> <span class="synType">string</span> query = <span class="synSpecial">@</span><span class="synConstant">&quot;</span>
<span class="synConstant">                INSERT INTO Post(Title, CreatedAt, UpdatedAt, RawText)</span>
<span class="synConstant">                VALUES(@0, @1, @2, @3)</span>
<span class="synConstant">                &quot;</span>;
db.Query(query, title, now, now, raw_text);
}
}
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form method=<span class="synConstant">&quot;post&quot;</span>&gt; &lt;!-- Submit すると自分を POST で呼ぶ --&gt;
&lt;p&gt;&lt;input type=<span class="synConstant">&quot;text&quot;</span> id=<span class="synConstant">&quot;title&quot;</span> name=<span class="synConstant">&quot;title&quot;</span> /&gt;&lt;/p&gt;
&lt;p&gt;&lt;textarea id=<span class="synConstant">&quot;raw-text&quot;</span> name=<span class="synConstant">&quot;raw-text&quot;</span>&gt;&lt;/textarea&gt;&lt;/p&gt;
&lt;p&gt;&lt;input type=<span class="synConstant">&quot;submit&quot;</span> /&gt;&lt;/p&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>試しに実行し、［データ］ワークペースでデータを確認してみましょう。表示モードを［定義］から［データ］に切り替えてね！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130810154452.png" alt="f:id:daruyanagi:20130810154452p:plain" title="f:id:daruyanagi:20130810154452p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なにか……入ってますね？　成功！　次回はこれを取り出して表示して見ることにしましょう。おつかれさまです。</p><p><a href="https://blog.daruyanagi.jp/category/WebMatrix%203%20%E3%81%A7%20Wiki%20%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%B3%E3%82%92%E4%BD%9C%E3%82%8B">WebMatrix 3 &#x3067; Wiki &#x30AF;&#x30ED;&#x30FC;&#x30F3;&#x3092;&#x4F5C;&#x308B;</a></p>

</div>