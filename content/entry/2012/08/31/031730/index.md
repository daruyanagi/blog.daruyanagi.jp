---
date: 2012-08-31T03:17:30.0000000
draft: false
title: "SignalR Deep Dive ! に参加してきた＋WebMatrix で SignalR 動かしてみた"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120830191311.jpg" alt="f:id:daruyanagi:20120830191311j:plain" title="f:id:daruyanagi:20120830191311j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>仕事を少し早くあがって、 @shibayan のリサイタルに参加してきました。最近ずっと眠れなくて、仕事中もずっと眠い状態だったけれど、結構面白かったので寝落ちせずにすんだよ（ぉ</p><p><iframe width="480" height="296" src="http://www.ustream.tv/embed/recorded/25059062?wmode=direct" scrolling="no" frameborder="0" style="border: 0px none transparent;">    </iframe><br />
<br /><a href="http://www.ustream.tv/" style="padding: 2px 0px 4px; width: 400px; background: #ffffff; display: block; color: #000000; font-weight: normal; font-size: 10px; text-decoration: underline; text-align: center;" target="_blank">Video streaming by Ustream</a></p><p>興味ある人は USTREAM をご覧あれ。わしもよくわからんけど、とりあえず SignalR （<a href="http://signalr.net/">http://signalr.net/</a>）というのは、</p>

<ul>
<li>ASP.NET テクノロジをベースとした</li>
<li>非同期でリアルタイムな</li>
<li>サーバーとクライアントの双方向通信</li>
</ul><p>を実現するライブラリ、ってことでいいのかな。サーバーとクライアントの通信で利用される技術は、 SignalR が勝手にチョイスしてくれるみたい（モダンな環境なら WebSocket を、クラシカルな環境だったらポーリングを、ってな感じ）。詳しくはエロいひと、じゃなくて偉いひとに聞いて欲しい。</p><p>ともあれ、忘れないうちにこれを WebMatrix で使ってみる。</p>

<div class="section">
<h3>サーバー側のコード</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/SampleHub.cs

<span class="synStatement">using</span> SignalR.Hubs; <span class="synComment">// &lt;-- NuGet でインストールしる！</span>

[HubName(<span class="synConstant">&quot;sample&quot;</span>)] <span class="synComment">// &lt;-- あとで createProxy(&quot;sample&quot;) と使う</span>
<span class="synType">public</span> <span class="synType">class</span> SampleHub : Hub
{
<span class="synType">private</span> <span class="synType">static</span> <span class="synType">string</span> _message = <span class="synConstant">&quot;&quot;</span>;

<span class="synType">private</span> <span class="synType">string</span> Message
{
<span class="synStatement">get</span> { <span class="synStatement">return</span> _message; }
<span class="synStatement">set</span>
{
_message = <span class="synStatement">value</span>;

<span class="synComment">// 接続中のクライアントすべてに Echo() 命令を送る</span>
Clients.Echo(_message);

<span class="synComment">// そのほかにも</span>
<span class="synComment">// Caller.Echo(); 呼び出したクライアントに命令</span>
<span class="synComment">// Groups[&quot;Hoge&quot;].Echo(); クライアントグループに命令</span>
<span class="synComment">// がある</span>
}
}

<span class="synType">public</span> <span class="synType">void</span> Add(<span class="synType">string</span> s)<span class="synComment">// &lt;-- ちゃんと公開しろよ</span>
{
Message += s;
}

<span class="synType">public</span> <span class="synType">void</span> Clear()
{
Message = <span class="synConstant">&quot;&quot;</span>;
}
}
</pre><p>まずは、 Hub というものを作る。今回は文字列（Message）を足す関数（Add）と、クリアする関数（Clear）を用意した。文字列が更新されるとクライアントにその結果を表示するように命令（Echo）する。これがサーバー側の処理。</p>

</div>
<div class="section">
<h3>クライアント側のコード</h3>
<pre class="code lang-html" data-lang="html" data-unlink># Default.cshtml

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

@{

}

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery-1.6.4.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery.signalR-0.5.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span><span class="synComment">// 接続を取得</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> connection = $.hubConnection</span>()<span class="synSpecial">;</span>

<span class="synSpecial">            </span><span class="synComment">// sample ハブ（のプロキシ）を取得</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> sample = connection.createProxy</span>(<span class="synConstant">&quot;sample&quot;</span>)<span class="synSpecial">;</span>

<span class="synSpecial">            </span><span class="synComment">// 接続開始（忘れたらしばやんみたいにエラー出るで）</span>
<span class="synSpecial">            connection.start</span>()<span class="synSpecial">;</span>

<span class="synSpecial">            </span><span class="synComment">// sample ハブの Echo() 命令を受け取ったら……</span>
<span class="synSpecial">            sample.on</span>(<span class="synConstant">&quot;Echo&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">value</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synConstant">&quot;#value&quot;</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">value</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;value&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span>
<span class="synIdentifier">               </span><span class="synSpecial">onclick=&quot;sample.invoke</span>(<span class="synConstant">'Add'</span><span class="synSpecial">, </span><span class="synConstant">'foobar'</span>)<span class="synSpecial">;&quot;</span>
<span class="synIdentifier">               </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;add&quot;</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;add&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;add&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">input</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;button&quot;</span>
<span class="synIdentifier">               </span><span class="synSpecial">onclick=&quot;sample.invoke</span>(<span class="synConstant">'clear'</span>)<span class="synSpecial">;&quot;</span>
<span class="synIdentifier">               </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;clear&quot;</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;clear&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;clear&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>クライアント側の処理は次のような感じ。</p><p>［クライアント］ボタンクリックで sample ハブの Add/Clear を呼ぶ<br />
→ ［サーバー］sample ハブが接続中のクライアントへ Echo() をブロードキャスト<br />
→ ［すべてのクライアント］#value が更新される</p><p>というカラクリ。</p>

</div>
<div class="section">
<h3>結果</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120831025740.png" alt="f:id:daruyanagi:20120831025740p:plain" title="f:id:daruyanagi:20120831025740p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>3つブラウザーを起動し、そのうち1つのブラウザーでボタンを押すと、ほかも全部いっぺんに更新される！　これはちょっと楽しいな。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20120823/1345724524">SignalR 0.5.3 &#x3067;&#x5909;&#x308F;&#x3063;&#x305F; JavaScript &#x30AF;&#x30E9;&#x30A4;&#x30A2;&#x30F3;&#x30C8; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/07/04/081647">SignalR &#x306E;&#x30C7;&#x30E2;&#x304C;&#x3061;&#x3087;&#x3063;&#x3068;&#x304B;&#x3063;&#x3053;&#x3044;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul>
</div>