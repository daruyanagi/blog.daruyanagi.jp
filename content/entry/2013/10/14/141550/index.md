---
date: 2013-10-14T14:15:50.0000000
draft: false
title: "WebMatrix 3: Twitter Bot （＋リアルタイムログ表示付き）でも作ってみる。"
tags: ["Twitter", "WebMatrix", "ASP.net Web Pages", "ASP.net"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20131014/20131014141541.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014141541.png" alt="f:id:daruyanagi:20131014141541p:plain" title="f:id:daruyanagi:20131014141541p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>タイマーと <a href="https://blog.daruyanagi.jp/entry/2013/09/07/055029">WebMatrix 3: Twitter &#x30E9;&#x30A4;&#x30D6;&#x30E9;&#x30EA; Tweetinvi API &#x3067;&#x30C4;&#x30A4;&#x30FC;&#x30C8;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> を組み合わせれば、定期的に何かをつぶやく BOT も手軽に作れそうな予感。</p>


<div class="section">
<h3>タイマー</h3>
<p>.NET Framework にはいろんなタイマーがある（<a href="http://www.atmarkit.co.jp/fdotnet/dotnettips/374timerstimer/timerstimer.html">http://www.atmarkit.co.jp/fdotnet/dotnettips/374timerstimer/timerstimer.html</a>）。</p>

<ul>
<li>System.Windows.Forms.Timer（Windows Form のタイマーコントロール）</li>
<li>System.Threading.Time（軽量なマルチスレッドタイマー？）</li>
<li>System.Timers.Timer（サーバサイド・アプリケーションでの利用を想定したタイマー）</li>
</ul><p>ほかにも ASP.NET にはこんなのもある。</p>

<ul>
<li>System.Web.UI.Timer（Web Form のタイマーコントロール）</li>
</ul><p>今回は多分 <code>System.Timers.Timer</code> を使うべきなのだと思うので、<code>using Timer = System.Timers.Timer</code> にしておく。</p>

</div>
<div class="section">
<h3>Twitter クライアント</h3>
<p>Tweetinvi API を利用する。権限の変更（Write の付加とトークンの再生成）を忘れずに。自分は忘れてて、だいぶ時間を無駄にした。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/09/07/055029">WebMatrix 3: Twitter &#x30E9;&#x30A4;&#x30D6;&#x30E9;&#x30EA; Tweetinvi API &#x3067;&#x30C4;&#x30A4;&#x30FC;&#x30C8;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>アプリのセットアップだのといった手順は省く。</p>

</div>
<div class="section">
<h3>SignalR</h3>
<p>タイマーや Twitter クライアントがちゃんと動いているのか確かめるために、SignalR でログをブロードキャストしてみた。ブラウザーでサイトを開いておけば、リアルタイムでログが表示される。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/13/065552">WebMatrix 2: SignalR &#x3092;&#x52D5;&#x304B;&#x3059; &#xFF08; 1.0.1 &#x5BFE;&#x5FDC;&#x7248;&#xFF09; &#x203B;&#x540C;&#x6642;&#x63A5;&#x7D9A;&#x8005;&#x6570;&#x306E;&#x8FFD;&#x52A0; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>前に書いたコードをほとんど流用。</p>

</div>
<div class="section">
<h3>コード</h3>

<div class="section">
<h4>~/App_Code/MessageHub.cs</h4>
<p>SingalR のハブを記述。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Microsoft.AspNet.SignalR;
<span class="synStatement">using</span> Microsoft.AspNet.SignalR.Hubs;
<span class="synStatement">using</span> System.Collections.Concurrent;
<span class="synStatement">using</span> System.Threading.Tasks;

[HubName(<span class="synConstant">&quot;message&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> MessageHub : Hub
{
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">readonly</span> ConcurrentDictionary&lt;<span class="synType">string</span>, <span class="synType">bool</span>&gt;
_connections = <span class="synStatement">new</span> ConcurrentDictionary&lt;<span class="synType">string</span>, <span class="synType">bool</span>&gt;();

<span class="synType">public</span> <span class="synType">override</span> Task OnConnected()
{
_connections.TryAdd(Context.ConnectionId, <span class="synConstant">true</span>);

<span class="synStatement">return</span> Clients.All.notify(_connections.Count);
}

<span class="synType">public</span> <span class="synType">override</span> Task OnDisconnected()
{
<span class="synType">bool</span> <span class="synStatement">value</span>;

_connections.TryRemove(Context.ConnectionId, <span class="synStatement">out</span> <span class="synStatement">value</span>);

<span class="synStatement">return</span> Clients.All.notify(_connections.Count);
}

<span class="synType">public</span> <span class="synType">override</span> Task OnReconnected()
{
_connections.TryAdd(Context.ConnectionId, <span class="synConstant">true</span>);

<span class="synStatement">return</span> Clients.All.notify(_connections.Count);
}
}
</pre><p>なぜか同時接続数もカウントするようになっている（コピペのついでだ！）が、この処理が要らないのであればクラスの中身は空っぽでもいい。</p>

</div>
<div class="section">
<h4>~/_AppStart.cshtml</h4>
<p>このコードはアプリケーションの開始時に実行される。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Web.Routing
@<span class="synStatement">using</span> Microsoft.AspNet.SignalR
@<span class="synStatement">using</span> Timer = System.Timers.Timer

@{
RouteTable.Routes.MapHubs();

var interval = <span class="synConstant">1000</span> * <span class="synConstant">60</span> * <span class="synConstant">5</span>;

var timer = <span class="synStatement">new</span> Timer(interval);

var token = <span class="synStatement">new</span> TwitterToken.Token(<span class="synComment">/* 秘密♪ */</span>);

timer.Elapsed += (sender, args) =&gt;
{
var context = GlobalHost.ConnectionManager
.GetHubContext&lt;MessageHub&gt;();

<span class="synStatement">try</span>
{
var tweet = <span class="synStatement">new</span> Tweetinvi.Tweet(
DateTime.Now.ToString() + <span class="synConstant">&quot;をお知らせするで！&quot;</span>);
tweet.Publish(token);

context.Clients.All.log(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}: {1}&quot;</span>, DateTime.Now, tweet.Text));
}
<span class="synStatement">catch</span> (Exception e)
{
context.Clients.All.log(
<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}: {1}&quot;</span>, DateTime.Now, e.Message));
}
};

timer.Start();
}
</pre><p>やっていることは、</p>

<ul>
<li>ハブのマッピング（自動生成された JavaScript が ~/signalr/hubs にマッピングされる）</li>
<li>Twitter のアクセストークン生成</li>
<li>タイマーの準備</li>
</ul><p>の3つだけ。</p><p>タイマーイベントでは <code>GlobalHost.ConnectionManager.GetHubContex</code> でハブが取得できるので、これを利用してすべてのクライアントにログをブロードキャスト（<code>context.Clients.All.log</code>）している。</p>

</div>
<div class="section">
<h4>~/Default.cshtml</h4>
<p>SignalR のハブから受け取った情報をレンダリング。log 関数と notify 関数を定義しておいて、サーバーから呼べるようにしている。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{

}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/jquery-2.0.3.min.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/jquery.signalR-1.1.3.min.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/signalr/hubs&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                </span><span class="synIdentifier">var</span><span class="synSpecial"> message = $.connection.message;</span>

<span class="synSpecial">                message.client.log = </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">log</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    $</span>(<span class="synConstant">'#log'</span>)<span class="synSpecial">.append</span>(<span class="synConstant">'&lt;li&gt;'</span><span class="synSpecial"> + log + </span><span class="synConstant">'&lt;/li&gt;'</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span><span class="synSpecial">;</span>

<span class="synSpecial">                message.client.notify = </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">count</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    $</span>(<span class="synConstant">'#count'</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">count</span>)
<span class="synSpecial">                </span><span class="synIdentifier">}</span><span class="synSpecial">;</span>

<span class="synSpecial">                $.connection.hub.start</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>現在、<span class="synIdentifier">&lt;</span><span class="synStatement">span</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;count&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">span</span><span class="synIdentifier">&gt;</span>人が接続しています。<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;log&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
</div>
</div>
<div class="section">
<h3>結果</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014140909.png" alt="f:id:daruyanagi:20131014140909p:plain" title="f:id:daruyanagi:20131014140909p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ブラウザーにはログが表示される。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131014140930.png" alt="f:id:daruyanagi:20131014140930p:plain" title="f:id:daruyanagi:20131014140930p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Twitter には時報（Azure においた奴と、ローカルで動いている奴の二つ）がポストされる……けれど、Azure のほうはサーバーの時差を考えていなかったので、時間が狂ってる。まぁ、ここは適当にあとで手直ししよう。</p><p>WebMatrix だったらデータベース（SQL CE）との連携も簡単なので、データベースにストアしたテキストを定期的に吐く、なんてのは割と簡単なはず。Tweetinvi はユーザーストリームに対応するので、もしかしたらリアルタイムな応答も割と簡単に書けるのかもしれない。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-389621500333936640');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('389621500333936640',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-389621500333936640"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-389621492574478338');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('389621492574478338',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-389621492574478338"></div></p><p>怖い ((((；ﾟДﾟ)))ｻﾞｸｸﾞﾌｹﾞﾙｸﾞｸﾞ</p><p>のいえっちのブログ読んだけど、自分のやり方はなんかいろいろ穴があるっぽく思えてきた。</p>

</div>