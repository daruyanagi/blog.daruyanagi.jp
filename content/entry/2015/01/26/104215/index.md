---
date: 2015-01-26T10:42:15.0000000
draft: false
title: "WebMatrix： 伊予鉄も止まったので、早速、遅延情報をゲットしてみる。"
tags: ["WebMatrix"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20150126/20150126102626.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150126102626.png" alt="f:id:daruyanagi:20150126102626p:plain" title="f:id:daruyanagi:20150126102626p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2015/01/25/143744">WebMatrix&#xFF1A; JR&#x56DB;&#x56FD;&#x304C;&#x6B62;&#x307E;&#x3063;&#x305F;&#x306E;&#x3067;&#x3001;&#x904B;&#x884C;&#x60C5;&#x5831;&#x306E;&#x53D6;&#x5F97;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30E0;&#x4F5C;&#x308B;&#x306E;&#x304C;&#x6357;&#x3063;&#x305F;&#x3002; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で喜んでたら、今朝は伊予鉄にも遅れが出た。これで、伊予鉄の運行情報もとれるぞ！</p>

<ul>
<li><a href="http://www.iyotetsu.co.jp/kinkyu/">&#x96FB;&#x8ECA;&#x30FB;&#x30D0;&#x30B9;&#x60C5;&#x5831; | &#x4F0A;&#x4E88;&#x9244;</a></li>
</ul><p>伊予鉄の運行情報ページの構造は、</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;about&quot;</span><span class="synIdentifier">&gt;</span>電車・バス　現在通常通り運行しております。<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">&quot;date&quot;</span><span class="synIdentifier">&gt;</span>2015/01/26(月) 10:26<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>

<span class="synComment">&lt;!-- 遅延がある場合だけ↓　--&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">table</span><span class="synIdentifier"> </span><span class="synType">class</span><span class="synIdentifier">=</span><span class="synConstant">default</span><span class="synIdentifier">&gt;</span>
:
:
<span class="synIdentifier">&lt;/</span><span class="synStatement">table</span><span class="synIdentifier">&gt;</span>
</pre><p>こんな感じになってるみたい。ということは、このテーブルがある前提で遅延情報を解析・出力、途中で例外が発生すれば正常運行とみなすという方針でよさそうだ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> List&lt;DelayInfo&gt; GetIyotestu()
{
<span class="synType">const</span> <span class="synType">string</span> name = <span class="synConstant">&quot;伊予鉄&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> url = <span class="synConstant">&quot;http://www.iyotetsu.co.jp/kinkyu/&quot;</span>;

<span class="synStatement">return</span> GetDelayInfo(name, url, Encoding.UTF8, _ =&gt;
{
var doc = <span class="synStatement">new</span> HtmlAgilityPack.HtmlDocument();

doc.LoadHtml(_);

<span class="synStatement">try</span>
{
<span class="synComment">// 遅延情報のテーブルを取得。発見できなければ例外 → 正常運行</span>
var rows = doc
.DocumentNode
<span class="synComment">// table.default のなかにある tr タグを取得</span>
.SelectNodes(<span class="synSpecial">@</span><span class="synConstant">&quot;//table[@class=&quot;&quot;default&quot;&quot;]//tr&quot;</span>)
<span class="synComment">// テキストノードなどは読み飛ばす</span>
.Where(n =&gt; n.NodeType == HtmlNodeType.Element);

var result = <span class="synStatement">new</span> List&lt;DelayInfo&gt;();

<span class="synStatement">foreach</span> (var row <span class="synStatement">in</span> rows)
{
var td = row.ChildNodes
<span class="synComment">// テキストノードなどは読み飛ばす</span>
.Where(n =&gt; n.NodeType == HtmlNodeType.Element)
<span class="synComment">// セルの結合があるので、ほしい情報のインデックスが列によって違う！</span>
<span class="synComment">// → 後ろから読む</span>
.Reverse()
.ToList();

result.Add(
<span class="synStatement">new</span> DelayInfo()
{
Line = td[<span class="synConstant">1</span>].InnerHtml,
Status = td[<span class="synConstant">0</span>].InnerHtml.IndexOf(<span class="synConstant">&quot;通常運行&quot;</span>) &lt; <span class="synConstant">0</span>
? <span class="synConstant">&quot;運休・遅延あり&quot;</span>
: <span class="synConstant">&quot;正常運行&quot;</span>,
Message = td[<span class="synConstant">0</span>].InnerHtml,
}
);
}

<span class="synStatement">return</span> result;
}
<span class="synStatement">catch</span>
{
<span class="synComment">// p.about の内容を解析して、正常運行というデータを返す    </span>
var text = doc.DocumentNode
.SelectSingleNode(<span class="synSpecial">@</span><span class="synConstant">&quot;//p[@class=&quot;&quot;about&quot;&quot;]&quot;</span>)
.InnerText;
var line = text.Split(<span class="synConstant">'　'</span>)[<span class="synConstant">0</span>];
var message = text.Split(<span class="synConstant">'　'</span>)[<span class="synConstant">1</span>];
<span class="synStatement">return</span> <span class="synStatement">new</span> List&lt;DelayInfo&gt;()
{
<span class="synStatement">new</span> DelayInfo()
{
Line = line,
Status = <span class="synConstant">&quot;正常運行&quot;</span>,
Message = message,
},
};
}
});
}
</pre><p>GetDelayInfo(name, url, encodsing, processor) は、指定した URL からソースコードの取得を取得するもので、キャッシュを Get/Set も行う（定型処理なので分離した）。HTML の解釈を string processor(string src) に委譲しているので、今回はその中身だけを書けばよい。</p><p>とくに難しいことはないのだけど、ただ一点、テーブルのセルがところどころ結合されている関係で、列によって取得したい情報のセルのインデックスがずれる。しかし、後ろから数えた場合のインデックスは変わらないので、Reverse() してから読んでやればいい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150126104125.png" alt="f:id:daruyanagi:20150126104125p:plain" title="f:id:daruyanagi:20150126104125p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これで数日様子を見てみる。</p>
