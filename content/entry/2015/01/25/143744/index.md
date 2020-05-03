---
date: 2015-01-25T14:37:44.0000000
draft: false
title: "WebMatrix： JR四国が止まったので、運行情報の取得プログラム作るのが捗った。"
tags: ["WebMatrix"]
eyecatch: 20150125141900.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150125141900.png" alt="f:id:daruyanagi:20150125141900p:plain" title="f:id:daruyanagi:20150125141900p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>密かに待ってました。人身事故ってのがちょっと胸痛むけれど。すみません。でも、これで運行に遅延が発生した時にどんなコードが吐かれるのかわかったやで。</p>

<ul>
<li><a href="http://www.jr-shikoku.co.jp/info/">&#xFF2A;&#xFF32;&#x56DB;&#x56FD;&#x5217;&#x8ECA;&#x904B;&#x884C;&#x60C5;&#x5831;</a></li>
</ul><p>遅れがないとき。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">ID</span><span class="synIdentifier">=</span><span class="synConstant">&quot;delay_info&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;no_delay&quot;</span><span class="synIdentifier">&gt;</span>◇現在、遅れ等の情報はありません。<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
</pre><p>遅れがあるとき。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">div</span><span class="synIdentifier"> </span><span class="synType">ID</span><span class="synIdentifier">=</span><span class="synConstant">&quot;delay_info&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>◇現在、以下のエリアで影響が出ています（*:**更新）。<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h4</span><span class="synIdentifier">&gt;</span>徳島線<span class="synIdentifier">&lt;/</span><span class="synStatement">h4</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h5</span><span class="synIdentifier">&gt;</span>徳島線（牛島駅構内）　運転再開<span class="synIdentifier">&lt;/</span><span class="synStatement">h5</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>徳島線では……<span class="synIdentifier">&lt;</span><span class="synStatement">br</span><span class="synIdentifier">&gt;</span>※高徳線の列車は……<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">div</span><span class="synIdentifier">&gt;</span>
</pre><p>同じ路線で複数の遅延情報があるケースも考えられるだろうので、タグはこんな感じになるんだろう（と思う）。</p>
<pre class="code" data-lang="" data-unlink>p

h4
h5
p

h5
p
:
h4
h5
p

h5
p
:</pre><p>というわけで、これをいい感じにデータオブジェクトに変換していくわけれだけれど、どうしよう。</p><p>とりあえず HtmlAgilityPack でやってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> DelayInfo
{
<span class="synType">public</span> <span class="synType">string</span> Line { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Status { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Message { get; set; }
}

<span class="synType">public</span> <span class="synType">static</span> List&lt;DelayInfo&gt; GetJRShikoku()
{
<span class="synType">const</span> <span class="synType">string</span> key = <span class="synConstant">&quot;jrshikoku&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> url = <span class="synConstant">&quot;http://www.jr-shikoku.co.jp/info/&quot;</span>;

<span class="synComment">// キャッシュを探す</span>
var result = WebCache.Get(key) <span class="synStatement">as</span> List&lt;DelayInfo&gt;;

<span class="synComment">// キャッシュがヒットしなければ、情報の取得</span>
<span class="synStatement">if</span> (result == <span class="synConstant">null</span>)
{
<span class="synStatement">using</span> (var client = <span class="synStatement">new</span> WebClient())
{
<span class="synComment">// !!</span>
client.Encoding = Encoding.GetEncoding(<span class="synConstant">&quot;Shift_JIS&quot;</span>);

var doc = <span class="synStatement">new</span> HtmlAgilityPack.HtmlDocument();
var src = client.DownloadString(url);

doc.LoadHtml(src);

var nodes = doc.DocumentNode
<span class="synComment">// div#delay_info タグを探す</span>
.SelectSingleNode(<span class="synSpecial">@</span><span class="synConstant">&quot;//div[@id=&quot;&quot;delay_info&quot;&quot;]&quot;</span>)
<span class="synComment">// 直下のノードを列挙</span>
.ChildNodes
<span class="synComment">// 改行・コメントなどのノードは読み飛ばす</span>
.Where(_ =&gt; _.NodeType == HtmlNodeType.Element)
<span class="synComment">// 最初の div#no_delay や p は読み飛ばす</span>
.Skip(<span class="synConstant">1</span>);

var line = <span class="synType">string</span>.Empty;
var status = <span class="synType">string</span>.Empty;

result = <span class="synStatement">new</span> List&lt;DelayInfo&gt;();

<span class="synStatement">foreach</span> (var node <span class="synStatement">in</span> nodes)
{
<span class="synStatement">switch</span> (node.Name)
{
<span class="synStatement">case</span> <span class="synConstant">&quot;h4&quot;</span>: <span class="synComment">// 線名を記憶</span>
line = node.InnerText;
<span class="synStatement">continue</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;h5&quot;</span>: <span class="synComment">// &quot;徳島線（牛島駅構内）　運転再開&quot;を記憶</span>
status = node.InnerText;
<span class="synStatement">continue</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;p&quot;</span>:  <span class="synComment">// p タグを見つけたらデータをプッシュ</span>
result.Add(<span class="synStatement">new</span> DelayInfo()
{
Line = line,
Status = status,
Message = node.InnerText,
});
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
<span class="synComment">// Do Nothing</span>
<span class="synStatement">break</span>;
}
}

<span class="synComment">// 遅延情報が見つからなかった場合、全線正常のデータをプッシュ</span>
<span class="synStatement">if</span> (result.Count == <span class="synConstant">0</span>)
{
result.Add(<span class="synStatement">new</span> DelayInfo()
{
Line = <span class="synConstant">&quot;全線&quot;</span>,
Status = <span class="synConstant">&quot;正常運行&quot;</span>,
Message = <span class="synConstant">&quot;現在通常通り運行しております。&quot;</span>,
});
}
}
}

<span class="synStatement">return</span> result;
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150125143551.png" alt="f:id:daruyanagi:20150125143551p:plain" title="f:id:daruyanagi:20150125143551p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ビューでこのデータを適当にレンダリング。まぁ、まぁ、いい感じかもしれない。もっといろんなケースを見てみたかったけれど、とりあえずこれが正しいとして、Twitter BOT でも実装してみるかな。</p>
