---
date: 2013-03-12T09:36:13.0000000
draft: false
title: "WebMatrix 2: SignalR を動かす （ 1.0.1 対応版）"
tags: ["SignalR", "WebMatrix"]
eyecatch: 
---
<p>もうだいぶ昔の話になりますが、ASP.NET SignalR が正式リリースされました。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20130303/1362291390">ASP.NET SignalR 1.0.1 &#x304C;&#x51FA;&#x3066;&#x307E;&#x3057;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>最新版は 1.0.1 ですかね。</p><p>ASP.NET SignalR は「WebMatrix 2」からも使えますが、ベータのとき（<a href="https://blog.daruyanagi.jp/entry/2012/08/31/031730">SignalR Deep Dive ! &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x305F;&#xFF0B;WebMatrix &#x3067; SignalR &#x52D5;&#x304B;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）とは少し変わっている部分もあるようなので、もう一度やってみました。とりあえず、<a href="https://github.com/SignalR/SignalR/wiki/QuickStart-Hubs">QuickStart Hubs &middot; SignalR/SignalR Wiki &middot; GitHub</a> を動作させるのが目標。</p>

<div class="section">
<h3>NuGet で SignalR を取得</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130312085421.png" alt="f:id:daruyanagi:20130312085421p:plain" title="f:id:daruyanagi:20130312085421p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>公式パッケージソースで「SignalR」を検索すると、三番目ぐらいに出てくるはず。</p>

</div>
<div class="section">
<h3>サーバー（ハブ）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130312090003.png" alt="f:id:daruyanagi:20130312090003p:plain" title="f:id:daruyanagi:20130312090003p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>~/App_Code フォルダに ChatHub.cs を作成し、以下のようなクラスを用意します。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Microsoft.AspNet.SignalR;

<span class="synType">public</span> <span class="synType">class</span> Chat : Hub
{
<span class="synType">public</span> <span class="synType">void</span> Send(<span class="synType">string</span> message)
{
<span class="synComment">// Call the addMessage method on all clients            </span>
Clients.All.addMessage(message);
}
}
</pre><p>受け取ったメッセージを接続中のすべてのクライアントへそのまま一斉送信する（クライアントクラスの addMessage() を呼び出す）だけの簡単なクラスです。これがサーバー側のコードになります。</p><p>名前空間が変わったのかな？</p>

</div>
<div class="section">
<h3>ハブのマッピング</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130312090455.png" alt="f:id:daruyanagi:20130312090455p:plain" title="f:id:daruyanagi:20130312090455p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さきほど記述したハブをルートテーブルにマップして使えるようにします。~/_AppStart.cshtml を作成し、以下のように記述しましょう。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Web.Routing

@{
RouteTable.Routes.MapHubs();
}
</pre><p><a href="https://github.com/SignalR/SignalR/wiki/QuickStart-Hubs">QuickStart Hubs &middot; SignalR/SignalR Wiki &middot; GitHub</a> に掲載されているコードと少し違いますが、「WebMatrix 2」の場合はこれで OK です。</p><p>正直、あんまりよくわかっていないのですけれど、これをコメントアウトすると次のセクションに出てくる &lt;script src="/signalr/hubs"&gt;&lt;/script&gt; が 404 になってしまうので、まぁ、そういうのことをしてくれているのではないでしょうか。クライアントコードで $.connection.chat と書いてハブプロキシを呼び出せるようにごにょごにょするとか、そういう準備全般だと思います。</p>

</div>
<div class="section">
<h3>クライアント（Javascript + HTML）</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130312091147.png" alt="f:id:daruyanagi:20130312091147p:plain" title="f:id:daruyanagi:20130312091147p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>~/Default.cshtml を以下のように書き換えます。自分の場合は jQuery をアップデートしてあるのですが、古いものでも大丈夫なのかな？　コピペで動かす場合は、スクリプトのバージョンだけ間違わないように気を付けてくださいね。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{

}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta http-equiv=<span class="synConstant">&quot;Content-Type&quot;</span> content=<span class="synConstant">&quot;text/html; charset=utf-8&quot;</span>/&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;

&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;

&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;

&lt;script src=<span class="synConstant">&quot;~/Scripts/jquery-1.9.1.min.js&quot;</span>&gt;&lt;/script&gt;
&lt;script src=<span class="synConstant">&quot;~/Scripts/jquery.signalR-1.0.1.min.js&quot;</span>&gt;&lt;/script&gt;
&lt;script src=<span class="synConstant">&quot;~/signalr/hubs&quot;</span>&gt;&lt;/script&gt;
&lt;script&gt;
$(function () {
<span class="synComment">// ハブプロキシを作成        </span>
var chat = $.connection.chat;

<span class="synComment">// サーバーが addMessage() を呼んだら……         </span>
chat.client.addMessage = function (message) {
$(<span class="synConstant">'</span><span class="synError">#messages</span><span class="synConstant">'</span>).append(<span class="synConstant">'</span><span class="synError">&lt;li&gt;</span><span class="synConstant">'</span> + message + <span class="synConstant">'</span><span class="synError">&lt;/li&gt;</span><span class="synConstant">'</span>);
};

<span class="synComment">// 接続開始</span>
$.connection.hub.start().done(function() {
<span class="synComment">// imput#broadcast がクリックされたら……</span>
$(<span class="synConstant">&quot;#broadcast&quot;</span>).click(function () {
<span class="synComment">// サーバーの Send() を実行する</span>
chat.server.send($(<span class="synConstant">'</span><span class="synError">#msg</span><span class="synConstant">'</span>).val());
});
});
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;
&lt;input type=<span class="synConstant">&quot;text&quot;</span> id=<span class="synConstant">&quot;msg&quot;</span> /&gt;
&lt;input type=<span class="synConstant">&quot;button&quot;</span> id=<span class="synConstant">&quot;broadcast&quot;</span> <span class="synStatement">value</span>=<span class="synConstant">&quot;broadcast&quot;</span> /&gt;

&lt;ul id=<span class="synConstant">&quot;messages&quot;</span>&gt;
&lt;/ul&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>input#broadcast を押したら、input#msg の内容を引数にサーバーの ChatHub.Send(string） を実行します。 すると、それがすべてのクライアントに送信され、それを受け取ったクライアントは ul#messages にそれを追加する、というわけ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130312092011.png" alt="f:id:daruyanagi:20130312092011p:plain" title="f:id:daruyanagi:20130312092011p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえずブラウザーをいくつか起動して適当に入力してみてください。ちゃんとブロードキャストされているかな？</p>

</div>