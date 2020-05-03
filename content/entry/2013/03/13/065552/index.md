---
date: 2013-03-13T06:55:52.0000000
draft: false
title: "WebMatrix 2: SignalR を動かす （ 1.0.1 対応版） ※同時接続者数の追加"
tags: ["WebMatrix", "SignalR"]
eyecatch: 
---
<p>緑タイツの中の人が Facebook で、昨日の記事（<a href="https://blog.daruyanagi.jp/entry/2013/03/12/093613">WebMatrix 2: SignalR &#x3092;&#x52D5;&#x304B;&#x3059; &#xFF08; 1.0.1 &#x5BFE;&#x5FDC;&#x7248;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）に<i>「SignalRのサンプル作るときは、「今何人接続」表示があるともっと便利ですよー」</i>とコメントを付けてくれました。これは要するに、<i>「そのやり方をブログに書け」</i>ということですよね！（違</p><p>幸い、しばやんが偶然たまたま <a href="http://shiba-yan.hatenablog.jp/entry/20130312/1363090277">ASP.NET SignalR &#x3067;&#x63A5;&#x7D9A;&#x4E2D;&#x306E;&#x30AF;&#x30E9;&#x30A4;&#x30A2;&#x30F3;&#x30C8;&#x3092;&#x6570;&#x3048;&#x3066;&#x307F;&#x308B; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a> という記事を書いてくれましたので、それを<del>コピペ</del>参考にして、昨日のサンプルに追加してみました。</p>

<div class="section">
<h3>~/_AppStart.cshtml</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.Web.Routing

@{
RouteTable.Routes.MapHubs();
}
</pre>
</div>
<div class="section">
<h3>~/App_Code/ChatHub.cshtml</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> Microsoft.AspNet.SignalR;

<span class="synComment">// 追加</span>
<span class="synStatement">using</span> Microsoft.AspNet.SignalR.Hubs;
<span class="synStatement">using</span> System.Collections.Concurrent;
<span class="synStatement">using</span> System.Threading.Tasks;

[HubName(<span class="synConstant">&quot;chat&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> ChatHub : Hub
{
<span class="synType">public</span> <span class="synType">void</span> Send(<span class="synType">string</span> message)
{
Clients.All.addMessage(message);
}

<span class="synComment">// 以下、追加</span>
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
</pre><p>Dictionary で 接続ID を管理する処理が追加されています。ConcurrentDictionary は、</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/vstudio/dd287191.aspx">
<p>複数のスレッドから同時にアクセスできるキーと値のペアのスレッド セーフなコレクションを表します。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/vstudio/dd287191.aspx">http://msdn.microsoft.com/ja-jp/library/vstudio/dd287191.aspx</a></cite>
</blockquote>
<p>.NET Framework 4 から使えるのかな？</p><p>しばやんの記事を読むまでは、単純に接続イベントで int Count をインクリメント・デクリメントしようと思っていたのですが、そんなに簡単なお話ではなかったようです。</p><p>あと、クラス名を ChatHub に変更しました。ファイル名とクラス名は合わせたいかな、と思ったので。これには追加の名前空間（Microsoft.AspNet.SignalR.Hubs）が必要です。 [HubName("chat")] という属性を追加すれば動作に影響はありません。</p>

</div>
<div class="section">
<h3>~/Default.cshtml</h3>
<pre class="code lang-html" data-lang="html" data-unlink>@{

}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/jquery-1.9.1.min.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Scripts/jquery.signalR-1.0.1.min.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/signalr/hubs&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                </span><span class="synIdentifier">var</span><span class="synSpecial"> chat = $.connection.chat;</span>

<span class="synSpecial">                chat.client.addMessage = </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">message</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    $</span>(<span class="synConstant">'#messages'</span>)<span class="synSpecial">.append</span>(<span class="synConstant">'&lt;li&gt;'</span><span class="synSpecial"> + message + </span><span class="synConstant">'&lt;/li&gt;'</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span><span class="synSpecial">;</span>

<span class="synSpecial">                </span><span class="synComment">// notify() を追加</span>
<span class="synSpecial">                chat.client.notify = </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">message</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    $</span>(<span class="synConstant">'#count'</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">message</span>)
<span class="synSpecial">                </span><span class="synIdentifier">}</span><span class="synSpecial">;</span>

<span class="synSpecial">                $.connection.hub.start</span>()<span class="synSpecial">.done</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    $</span>(<span class="synConstant">&quot;#broadcast&quot;</span>)<span class="synSpecial">.click</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        chat.server.send</span>(<span class="synSpecial">$</span>(<span class="synConstant">'#msg'</span>)<span class="synSpecial">.val</span>())<span class="synSpecial">;</span>
<span class="synSpecial">                        $</span>(<span class="synConstant">&quot;#msg&quot;</span>)<span class="synSpecial">.val</span>(<span class="synConstant">&quot;&quot;</span>)<span class="synSpecial">; </span><span class="synComment">// 追加</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span><span class="synComment">&lt;!-- 追加 --&gt;</span>
現在、<span class="synIdentifier">&lt;</span><span class="synStatement">span</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;count&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">span</span><span class="synIdentifier">&gt;</span>人が接続しています。
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span><span class="synComment">&lt;!-- ここまで --&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text&quot;</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;msg&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;broadcast&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;broadcast&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;messages&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>ハブが Clients.All.notify(接続数) するので、クライアント側でそれを span#count にセットします。</p><p>ついでに、ブロードキャストしたときにテキストボックスを空にする処理を加えておきました。</p>

</div>
<div class="section">
<h3>結果</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130313064343.png" alt="f:id:daruyanagi:20130313064343p:plain" title="f:id:daruyanagi:20130313064343p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>できました！</p>

</div>