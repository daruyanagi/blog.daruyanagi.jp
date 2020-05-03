---
date: 2012-09-27T21:31:59.0000000
draft: false
title: "SignalR + WebMatrix でサーバーフォルダの監視を行ってみる"
tags: ["WebMatrix", "SignalR"]
eyecatch: 
---
<p>SignalR の面白い使い方ってないかなーと思ってたのだけど、たとえば誰かがファイルをアップロードした時、同時接続している人たちにそれを知らせられたら面白くないかな？　と思いついた。さっそくやってみる。</p><p>自分の作ったサンプルコード（<a href="https://blog.daruyanagi.jp/entry/2012/08/31/031730">SignalR Deep Dive ! &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x305F;&#xFF0B;WebMatrix &#x3067; SignalR &#x52D5;&#x304B;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）をコピペして、必要な処理を足して、要らない部分を消して……以下のようなコードを書いてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/SampleHub.cs

<span class="synStatement">using</span> SignalR.Hubs;
<span class="synStatement">using</span> System.IO;

[HubName(<span class="synConstant">&quot;sample&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> SampleHub : Hub
{
<span class="synType">public</span> SampleHub()
{
var watcher = <span class="synStatement">new</span> FileSystemWatcher();

watcher.Path =  System.Web.HttpContext.Current
.Server.MapPath(<span class="synSpecial">@</span><span class="synConstant">&quot;~/_Documents&quot;</span>);
watcher.Filter = <span class="synConstant">&quot;*.txt&quot;</span>;
watcher.NotifyFilter = NotifyFilters.FileName
| NotifyFilters.DirectoryName
| NotifyFilters.LastWrite;
watcher.IncludeSubdirectories = <span class="synConstant">false</span>;
watcher.Changed +=
(o, s) =&gt; { Clients.Echo(<span class="synConstant">&quot;なんかかわったで&quot;</span>); };
watcher.Created +=
(o, s) =&gt; { Clients.Echo(<span class="synConstant">&quot;あたらしいのできたで&quot;</span>); };
watcher.Deleted +=
(o, s) =&gt; { Clients.Echo(<span class="synConstant">&quot;きえてもうた……&quot;</span>); };
watcher.Renamed +=
(o, s) =&gt; { Clients.Echo(<span class="synConstant">&quot;なまえかわったわ&quot;</span>); };
watcher.EnableRaisingEvents = <span class="synConstant">true</span>;
}
}
</pre><p>めんどくさいので <a href="http://dobon.net/vb/dotnet/file/filesystemwatcher.html">&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x3001;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x306E;&#x5909;&#x66F4;&#x3092;&#x76E3;&#x8996;&#x3059;&#x308B; - .NET Tips (VB.NET,C#...)</a> をほとんど丸コピしている。原理的には、これで _Documents フォルダ内のテキストファイルが更新されると、クライアント側の Echo() が呼ばれるはず。</p><p>ちなみにクライアント側はこんな感じ。</p>
<pre class="code lang-html" data-lang="html" data-unlink># ~/Default.cshtml

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery-1.6.4.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery.signalR-0.5.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> connection = $.hubConnection</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> sample = connection.createProxy</span>(<span class="synConstant">&quot;sample&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            connection.start</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            sample.on</span>(<span class="synConstant">&quot;Echo&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">value</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synConstant">&quot;#value&quot;</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">value</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;value&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
<div class="section">
<h3>反応がない、ただの屍のようだ。</h3>
<p>でも、これだと動かない。なぜだ！</p><p>元のサンプルコードをいじりながらいろいろ試してみたところ、クライアントから一度なんらかのアクションがあれば、期待通りの動作をするみたい。ということで、コードを少し足した。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/SampleHub.cs

<span class="synStatement">using</span> SignalR.Hubs;
<span class="synStatement">using</span> System.IO;

[HubName(<span class="synConstant">&quot;sample&quot;</span>)]
<span class="synType">public</span> <span class="synType">class</span> SampleHub : Hub
{
<span class="synType">public</span> SampleHub()
{
（省略）
}

<span class="synType">public</span> <span class="synType">void</span> Initialize()
{
<span class="synComment">// 追加：コネクションを叩き起こすための何もしないメソッド</span>
}
}
</pre><p>で、クライアント側から SampleHub.Initialize() を叩く。</p>
<pre class="code lang-html" data-lang="html" data-unlink># ~/Default.cshtml

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery-1.6.4.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery.signalR-0.5.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> connection = $.hubConnection</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> sample = connection.createProxy</span>(<span class="synConstant">&quot;sample&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            connection.start</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            sample.on</span>(<span class="synConstant">&quot;Echo&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">value</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synConstant">&quot;#value&quot;</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">value</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            sample.invoke</span>(<span class="synConstant">'initialize'</span>)<span class="synSpecial">; </span><span class="synComment">// &lt;-- 追加！</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;value&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
</div>
<div class="section">
<h3>無理やり叩いたらゲロ吐きやがった</h3>
<p>そうしたらエラーで止まった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120927212447.png" alt="f:id:daruyanagi:20120927212447p:plain" title="f:id:daruyanagi:20120927212447p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>connection.start() が終わってないのに SampleHub.Initialize() を叩くんじゃねえ、バカ。そういいたいらしい。connection.start().done() を使えというので、素直に従おう。</p>
<pre class="code lang-html" data-lang="html" data-unlink># ~/Default.cshtml

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery-1.6.4.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/javascript&quot;</span>
<span class="synIdentifier">                </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Scripts/jquery.signalR-0.5.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> connection = $.hubConnection</span>()<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">var</span><span class="synSpecial"> sample = connection.createProxy</span>(<span class="synConstant">&quot;sample&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            connection.start</span>()<span class="synSpecial">.done</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span><span class="synSpecial"> </span><span class="synComment">// &lt;-- done()!</span>
<span class="synSpecial">                sample.invoke</span>(<span class="synConstant">'initialize'</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            sample.on</span>(<span class="synConstant">&quot;Echo&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">value</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synConstant">&quot;#value&quot;</span>)<span class="synSpecial">.html</span>(<span class="synSpecial">value</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;value&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120927212701.png" alt="f:id:daruyanagi:20120927212701p:plain" title="f:id:daruyanagi:20120927212701p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ぉー！ ちゃんと動いたぞ。けれど、あんまりスマートじゃないな？　まぁ、いいか。</p>

</div>