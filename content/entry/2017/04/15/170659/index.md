---
date: 2017-04-15T17:06:59.0000000
draft: false
title: "Azure Web App＋Job＋Table Storage ：Twitter の位置情報を拾ってマッピングする"
tags: ["Microsoft Azure", "Visual Studio", "ASP.NET Web Pages"]
eyecatch: 20170415163622.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170415163622.png" alt="f:id:daruyanagi:20170415163622p:plain" title="f:id:daruyanagi:20170415163622p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>以前 WebMatrix＋SQL CE で作っていたものを Visual Studio 2017 で編集したら、ランタイムだかライブラリのバージョンの食い違いで起動不能になった＆いろいろ試行錯誤したけど Visual Studio 2017 から SQL CE（WebMatrix.Data）がうまく扱えなかったので、データを Azure Table Storage へ保存するように書き換えた。</p>

<ul>
<li><a href="http://api.daruyanagi.jp/map">Daruyanagi API : Check-ins</a></li>
</ul><p>ぶっちゃけよくわかっていないのだけど、ちゃんと動いているみたいなのでよしとする（ぉ</p>

<div class="section">
<h3>Twitter の位置情報</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170415163522.png" alt="f:id:daruyanagi:20170415163522p:plain" title="f:id:daruyanagi:20170415163522p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Twitter の位置情報は</p>

<ul>
<li>Place：大まかな位置を共有（矩形）</li>
<li>Coordinates：経度・緯度を正確に共有（点）</li>
</ul><p>の2つがあるみたい。</p><p>面倒な話だが Coordinates はアプリで明示的に・共有する都度［正確な位置情報を共有］オプションを有効にしなければ共有されない（Foursquare/Swarm などのチェックインアプリでは共有されることもあるみたいだが、それはアプリの意図した動作だと思うので問題ない）。今回ほしいのは Coordinates なので、これを定期的に収集することにした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> CollectCheckIns()
{
<span class="synComment">// CONNECTION_STRING は Azure Table Storage の接続文字列</span>
<span class="synComment">//</span>
<span class="synComment">// Web Jobs プロジェクトを作成</span>
<span class="synComment">// ・単なるコンソールアプリみたい</span>
<span class="synComment">//</span>
<span class="synComment">// NuGet で</span>
<span class="synComment">// ・CoreTweet：Twitter のライブラリ</span>
<span class="synComment">// ・WindowsAzure.Storage</span>
<span class="synComment">// なんかをインストールしておく</span>

<span class="synStatement">try</span>
{
var account = CloudStorageAccount.Parse(CONNECTION_STRING);
var client = account.CreateCloudTableClient();
var table = client.GetTableReference(<span class="synConstant">&quot;checkins&quot;</span>);
table.CreateIfNotExists();

<span class="synComment">// めいいっぱいツイートをかき集めてくる</span>
var tweets = tokens.Statuses
.UserTimeline(count: <span class="synConstant">200</span>)
.Where(_ =&gt; _.Coordinates != <span class="synConstant">null</span>);

<span class="synStatement">foreach</span> (var tweet <span class="synStatement">in</span> tweets)
{
var entity = <span class="synStatement">new</span> CheckinEntity(tweet);

var operation = TableOperation.InsertOrReplace(entity);

table.Execute(operation);

Console.WriteLine($<span class="synConstant">&quot;{entity.Url} is collected&quot;</span>);
}
}
<span class="synStatement">catch</span> (Exception exception)
{
System.Diagnostics.Debug.WriteLine(exception.Message);
}
}
</pre><p>基本的な流れは簡単だと思った。Table Storage に保存するデータ（モデル？）を TableEntity の派生クラスとして定義し、InsertOrReplace 操作にそのインスタンスをわたし、実行するだけ。</p><p>モデルの定義には、引数のないコンストラクター（必須）と、使いやすいように引数を設定したコンストラクターを作り、後者で PartitionKey と RowKey（いずれも string 型、必須）を設定する。この二つのキーでデータを特定・範囲指定・並び替えするみたいだけど、よくわからんかったのでツイートの Id と CreatedAt をキーにしておいた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> CheckinEntity : TableEntity
{
<span class="synType">public</span> CheckinEntity() { }

<span class="synType">public</span> CheckinEntity(Status status)
{
<span class="synStatement">this</span>.PartitionKey = status.Id.ToString();
<span class="synComment">// RowKey にスラッシュは含められない</span>
<span class="synStatement">this</span>.RowKey = status.CreatedAt.UtcDateTime.ToString(<span class="synConstant">&quot;u&quot;</span>);

Id = status.Id;
Text = status.Text;
ScreenName = status.User.ScreenName;
Latitude = status.Coordinates.Latitude;
Longitude = status.Coordinates.Longitude;
CreatedAt = status.CreatedAt.UtcDateTime;
}

<span class="synType">public</span> <span class="synType">long</span> Id { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Text { get; set; }

<span class="synType">public</span> <span class="synType">string</span> ScreenName { get; set; }

<span class="synType">public</span> <span class="synType">double</span> Latitude { get; set; }

<span class="synType">public</span> <span class="synType">double</span> Longitude { get; set; }

<span class="synType">public</span> DateTime CreatedAt { get; set; }

<span class="synType">public</span> <span class="synType">string</span> Url { <span class="synStatement">get</span> { <span class="synStatement">return</span> $<span class="synConstant">&quot;https://twitter.com/{ScreenName}/status/{Id}&quot;</span>; } }
}
</pre><p>ちょっとハマったのは、RowKey にスラッシュを含められないこと。table.Execute() が 400 という HTTP ステータスコードを返して失敗するときは、このあたりを疑ってみるといいのかも。今回はスラッシュを含まず、並び替えにも使える書式 "u" で ToString() しておいた。</p><p>成功すると、こんな感じで Table Storage にデータが格納される。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170415165656.png" alt="f:id:daruyanagi:20170415165656p:plain" title="f:id:daruyanagi:20170415165656p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>データを読み出す場合は、こんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> IEnumerable&lt;CheckinEntity&gt; Get()
{
var account = CloudStorageAccount.Parse(CONNECTION_STRING);

var client = account.CreateCloudTableClient();

var table = client.GetTableReference(<span class="synConstant">&quot;checkins&quot;</span>);

var rangeQuery = <span class="synStatement">new</span> TableQuery&lt;CheckinEntity&gt;();

<span class="synStatement">return</span> table.ExecuteQuery(rangeQuery).OrderByDescending(_ =&gt; _.CreatedAt);
}
</pre><p>データが多くなってきたら、ちゃんと範囲を絞ってクエリしたほうがいいのかもしれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170415170111.png" alt="f:id:daruyanagi:20170415170111p:plain" title="f:id:daruyanagi:20170415170111p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとはこれを JSON で吐くようにして――</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> map_element = <span class="synStatement">document</span>.getElementById(<span class="synConstant">&quot;daru_map&quot;</span>);
<span class="synIdentifier">var</span> map;

<span class="synIdentifier">var</span> markerData;

<span class="synIdentifier">var</span> xhr = <span class="synStatement">new</span> XMLHttpRequest();

xhr.open(<span class="synConstant">&quot;get&quot;</span>, <span class="synConstant">&quot;/map/checkins&quot;</span>, <span class="synConstant">false</span>);
xhr.onload = <span class="synIdentifier">function</span>()<span class="synIdentifier">{</span>
markerData = JSON.parse(<span class="synIdentifier">this</span>.responseText);
<span class="synIdentifier">}</span>
xhr.send(<span class="synStatement">null</span>);

<span class="synIdentifier">function</span> initMap() <span class="synIdentifier">{</span>
map = <span class="synStatement">new</span> google.maps.Map(map_element, <span class="synIdentifier">{</span> center: markerData<span class="synIdentifier">[</span>0<span class="synIdentifier">]</span>, zoom: 15, <span class="synIdentifier">}</span>);

<span class="synStatement">for</span> (<span class="synIdentifier">var</span> i = 0; i &lt; markerData.length; i++) <span class="synIdentifier">{</span>
(<span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
<span class="synComment">//マーカーの設定と作成</span>
<span class="synIdentifier">var</span> marker = <span class="synStatement">new</span> google.maps.Marker(<span class="synIdentifier">{</span>
position: <span class="synIdentifier">{</span>
lat: markerData<span class="synIdentifier">[</span>i<span class="synIdentifier">]</span>.lat,
lng: markerData<span class="synIdentifier">[</span>i<span class="synIdentifier">]</span>.lng
<span class="synIdentifier">}</span>,
<span class="synComment">// title: markerData[i].title,</span>
icon: <span class="synConstant">&quot;/Assets/Marker.png&quot;</span>,
map: map
<span class="synIdentifier">}</span>);

<span class="synComment">//情報ウインドウの設定と作成</span>
<span class="synIdentifier">var</span> infoWindow = <span class="synStatement">new</span> google.maps.InfoWindow(<span class="synIdentifier">{</span>
content: markerData<span class="synIdentifier">[</span>i<span class="synIdentifier">]</span>.content
<span class="synIdentifier">}</span>);

<span class="synComment">//情報ウインドウのオープンをマーカーのクリックイベントに登録</span>
marker.addListener(<span class="synConstant">'click'</span>, <span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
infoWindow.open(map, marker);
setTimeout(<span class="synIdentifier">function</span> () <span class="synIdentifier">{</span> infoWindow.close(); <span class="synIdentifier">}</span>, 1000 * 3)
<span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>());
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>
</pre><p>Google マップにプロットしてみた（情報ウィンドウは一つ開いたら一つ閉じるようにしたかったけど、なんかうまくいかんのでタイマーで閉じた）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170415170311.png" alt="f:id:daruyanagi:20170415170311p:plain" title="f:id:daruyanagi:20170415170311p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>テキトーだけど、今回はこのぐらいで。</p>

</div>
<div class="section">
<h3>追伸</h3>
<p>Web Job の話をするのを忘れたけど、単に作った Job をアップロードしてスケジューリング実行するだけなので割愛。今は 3 時間おきにデータを収集するようにしている。</p>

</div>