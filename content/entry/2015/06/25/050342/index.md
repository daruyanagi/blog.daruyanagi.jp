---
date: 2015-06-25T05:03:42.0000000
draft: false
title: "WebMatrix：フィードを読み込んでデータベースへつっこむときに System.Data.SqlServerCe.SqlCeException が発生する。"
tags: ["WebMatrix", "ASP.net Web Pages", "SQL CE"]
eyecatch: 20150625045042.png
---
<p>だいぶ悩んで、Visual Studio まで立ち上げていろいろデバッグしていたのだけど、原因は簡単だった。</p>

<blockquote cite="https://technet.microsoft.com/ja-jp/library/ms172424(v=sql.110).aspx">

<div class="section">
<h3>datetime</h3>
<p>300 分の 1 秒、つまり 3.33 ミリ秒の精度で、<b>1753 年 1 月 1 日から 9999 年 12 月 31 日まで</b>の日付と時刻のデータを格納するデータ型です。値は .000、.003、または .007 ミリ秒の単位になるように丸められます。</p><p>2 つの 4 バイト整数として格納されます。最初の 4 バイトは、base date である 1900 年 1 月 1 日からの日数、またはこの日までの日数を格納します。基準日とは、システムが参照する日付です。datetime 型の値には、1753 年 1 月 1 日より前の日付を使用できません。もう一方の 4 バイトは、午前 0 時から数えた時間をミリ秒単位で格納します。秒の有効範囲は 0 から 59 までです。</p>

</div>
<cite><a href="https://technet.microsoft.com/ja-jp/library/ms172424(v=sql.110).aspx">&#x30C7;&#x30FC;&#x30BF;&#x578B;</a></cite>
</blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150625045042.png" alt="f:id:daruyanagi:20150625045042p:plain" title="f:id:daruyanagi:20150625045042p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>一方、C# の <code>default(DateTime)</code> は <code>0001/01/01 0:00:00</code>。つまり、SyndicationFeed オブジェクトの LastUpdateTime プロパティあたりにちゃんと値がセットされてなくて（そういうフィードを配信しているサイトは割とある）、<code>default(DateTime)</code> を返してくるとき、それをそのまま SQL CE データベースに格納しようとするとエラーになる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150625050249.png" alt="f:id:daruyanagi:20150625050249p:plain" title="f:id:daruyanagi:20150625050249p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>SQL CE の datetime 型を扱う場合は、事前に値の範囲に収まるかチェックして、ダメな場合はハネておかないといけないんだね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var min_date = <span class="synStatement">new</span> DateTime(<span class="synConstant">1753</span>, <span class="synConstant">1</span>, <span class="synConstant">1</span>); <span class="synComment">// ほんとは readonly でどこかに</span>
var updated_at = item.LastUpdatedTime.UtcDateTime &lt; min_date
? <span class="synStatement">new</span> DateTimeOffset(DateTime.Now).UtcDateTime
: item.LastUpdatedTime.UtcDateTime;

<span class="synComment">// Database.Execute();</span>
</pre>
<div class="section">
<h3>教訓</h3>
<p>ちゃんとマニュアルは読もう。</p>

</div>