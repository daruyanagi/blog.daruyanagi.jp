---
date: 2012-10-07T11:39:45.0000000
draft: false
title: "WebMatrix/ASP.NET Web Pages で YAML を扱う"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>ちょっと YAML を使いたいなーというシーンがあったので、いろいろ調べたみた。</p>

<div class="section">
<h3>YAML って？</h3>

<blockquote>
<p>YAML は XML よりも読みやすく、書きやすく、JSON よりも型にうるさく、しかも自由度がある、Ruby 使い達に人気の(?) データ記述形式です。</p>

</blockquote>
<p>ほんとう？　それを確かめるためにちょっと比較してみました。例は <a href="http://www.ibm.com/developerworks/jp/xml/library/x-matters23/">XML&#x306E;&#x8AD6;&#x8003;: YAML&#x306F;XML&#x306B;&#x6539;&#x826F;&#x3092;&#x52A0;&#x3048;&#x308B;</a> のものをベースに、<a href="http://bluehawk.infinitybird.com/dev/xmljson.html">XML-JSON&#x76F8;&#x4E92;&#x5909;&#x63DB;&#x30C4;&#x30FC;&#x30EB; - Bluehawk&#39;s lab.</a> で作成した JSON 形式のものを追加してあります。</p>

<div class="section">
<h4>XML で表現した場合</h4>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;club&gt;</span>
<span class="synIdentifier">&lt;players&gt;</span>
<span class="synIdentifier">&lt;player </span><span class="synType">id</span>=<span class="synConstant">&quot;kramnik&quot;</span>
<span class="synIdentifier">            </span><span class="synType">name</span>=<span class="synConstant">&quot;Vladimir Kramnik&quot;</span>
<span class="synIdentifier">            </span><span class="synType">rating</span>=<span class="synConstant">&quot;2700&quot;</span>
<span class="synIdentifier">            </span><span class="synType">status</span>=<span class="synConstant">&quot;GM&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;player </span><span class="synType">id</span>=<span class="synConstant">&quot;fritz&quot;</span>
<span class="synIdentifier">            </span><span class="synType">name</span>=<span class="synConstant">&quot;Deep Fritz&quot;</span>
<span class="synIdentifier">            </span><span class="synType">rating</span>=<span class="synConstant">&quot;2700&quot;</span>
<span class="synIdentifier">            </span><span class="synType">status</span>=<span class="synConstant">&quot;Computer&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;player </span><span class="synType">id</span>=<span class="synConstant">&quot;mertz&quot;</span>
<span class="synIdentifier">            </span><span class="synType">name</span>=<span class="synConstant">&quot;David Mertz&quot;</span>
<span class="synIdentifier">            </span><span class="synType">rating</span>=<span class="synConstant">&quot;1400&quot;</span>
<span class="synIdentifier">            </span><span class="synType">status</span>=<span class="synConstant">&quot;Amateur&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/players&gt;</span>
<span class="synIdentifier">&lt;matches&gt;</span>
<span class="synIdentifier">&lt;match&gt;</span>
<span class="synIdentifier">&lt;Date&gt;</span>2002-10-04<span class="synIdentifier">&lt;/Date&gt;</span>
<span class="synIdentifier">&lt;White </span><span class="synType">refid</span>=<span class="synConstant">&quot;fritz&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Black </span><span class="synType">refid</span>=<span class="synConstant">&quot;kramnik&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Result&gt;</span>Draw<span class="synIdentifier">&lt;/Result&gt;</span>
<span class="synIdentifier">&lt;/match&gt;</span>
<span class="synIdentifier">&lt;match&gt;</span>
<span class="synIdentifier">&lt;Date&gt;</span>2002-10-06<span class="synIdentifier">&lt;/Date&gt;</span>
<span class="synIdentifier">&lt;White </span><span class="synType">refid</span>=<span class="synConstant">&quot;kramnik&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Black </span><span class="synType">refid</span>=<span class="synConstant">&quot;fritz&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Result&gt;</span>White<span class="synIdentifier">&lt;/Result&gt;</span>
<span class="synIdentifier">&lt;/match&gt;</span>
<span class="synIdentifier">&lt;/matches&gt;</span>
<span class="synIdentifier">&lt;/club&gt;</span>
</pre><p>タグがウザい。何でもできるけれど、少し厳格すぎるきらいがある。</p>

</div>
<div class="section">
<h4>JSON で表現した場合</h4>
<pre class="code lang-" data-lang="" data-unlink>{
&#34;club&#34;: {
&#34;players&#34;: {
&#34;player&#34;: [
{
&#34;-id&#34;: &#34;kramnik&#34;,
&#34;-name&#34;: &#34;Vladimir Kramnik&#34;,
&#34;-rating&#34;: &#34;2700&#34;,
&#34;-status&#34;: &#34;GM&#34;
},
{
&#34;-id&#34;: &#34;fritz&#34;,
&#34;-name&#34;: &#34;Deep Fritz&#34;,
&#34;-rating&#34;: &#34;2700&#34;,
&#34;-status&#34;: &#34;Computer&#34;
},
{
&#34;-id&#34;: &#34;mertz&#34;,
&#34;-name&#34;: &#34;David Mertz&#34;,
&#34;-rating&#34;: &#34;1400&#34;,
&#34;-status&#34;: &#34;Amateur&#34;
}
]
},
&#34;matches&#34;: {
&#34;match&#34;: [
{
&#34;Date&#34;: &#34;2002-10-04&#34;,
&#34;White&#34;: { &#34;-refid&#34;: &#34;fritz&#34; },
&#34;Black&#34;: { &#34;-refid&#34;: &#34;kramnik&#34; },
&#34;Result&#34;: &#34;Draw&#34;
},
{
&#34;Date&#34;: &#34;2002-10-06&#34;,
&#34;White&#34;: { &#34;-refid&#34;: &#34;kramnik&#34; },
&#34;Black&#34;: { &#34;-refid&#34;: &#34;fritz&#34; },
&#34;Result&#34;: &#34;White&#34;
}
]
}
}
}</pre><p>ネストが深い。JavaScript との相性が抜群だが、いろいろユルい部分も多い。</p>

</div>
<div class="section">
<h4>YAML で表現した場合</h4>
<pre class="code lang-yaml" data-lang="yaml" data-unlink><span class="synPreProc">---</span>
<span class="synIdentifier">players</span><span class="synSpecial">:</span>
<span class="synIdentifier">Vladimir Kramnik</span><span class="synSpecial">:</span> <span class="synType">&amp;kramnik</span>
<span class="synIdentifier">rating</span><span class="synSpecial">:</span> <span class="synConstant">2700</span>
<span class="synIdentifier">status</span><span class="synSpecial">:</span> GM
<span class="synIdentifier">Deep Fritz</span><span class="synSpecial">:</span> <span class="synType">&amp;fritz</span>
<span class="synIdentifier">rating</span><span class="synSpecial">:</span> <span class="synConstant">2700</span>
<span class="synIdentifier">status</span><span class="synSpecial">:</span> Computer
<span class="synIdentifier">David Mertz</span><span class="synSpecial">:</span> <span class="synType">&amp;mertz</span>
<span class="synIdentifier">rating</span><span class="synSpecial">:</span> <span class="synConstant">1400</span>
<span class="synIdentifier">status</span><span class="synSpecial">:</span> Amateur
<span class="synIdentifier">matches</span><span class="synSpecial">:</span>
<span class="synStatement">-</span>
<span class="synIdentifier">Date</span><span class="synSpecial">:</span> <span class="synConstant">2002-10-0</span>4
<span class="synIdentifier">White</span><span class="synSpecial">:</span> <span class="synType">*fritz</span>
<span class="synIdentifier">Black</span><span class="synSpecial">:</span> <span class="synType">*kramnik</span>
<span class="synIdentifier">Result</span><span class="synSpecial">:</span> Draw
<span class="synStatement">-</span>
<span class="synIdentifier">Date</span><span class="synSpecial">:</span> <span class="synConstant">2002-10-0</span>6
<span class="synIdentifier">White</span><span class="synSpecial">:</span> <span class="synType">*kramnik</span>
<span class="synIdentifier">Black</span><span class="synSpecial">:</span> <span class="synType">*fritz</span>
<span class="synIdentifier">Result</span><span class="synSpecial">:</span> White
</pre><p>タグがないし、ネストも深くないのでスッキリ。ただ、構造化データを記述する以外の用途には向かない。</p><p>あと、参照の仕組み（アンカーとエイリアス、アドレスとポインタのようなもの）をもっているのがいい。これって、データベースをテキストに書きだしたり、オブジェクトをシリアライズするときにも便利だよね。</p>

<ul>
<li><a href="http://jp.rubyist.net/magazine/?0009-YAML">Rubyist Magazine - &#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DE;&#x30FC;&#x306E;&#x305F;&#x3081;&#x306E; YAML &#x5165;&#x9580; (&#x521D;&#x7D1A;&#x7DE8;)</a></li>
</ul>
</div>
</div>
<div class="section">
<h3><a href="http://yamlserializer.codeplex.com/wikipage?title=Home-ja">
YamlSerializer for .NET
</a></h3>

<blockquote>
<p>主に２つの目的で使うことができます。</p>

<ul>
<li>C# のオブジェクトをそのまま YAML テキストにシリアライズ・デシリアライズすることができます。=> YamlSerizlizer クラス</li>
<li>一般の YAML ファイルを扱うこともできます。 => YamlNode クラス</li>
</ul>
</blockquote>
<p>というわけで、今日はこのライブラリを使ってみる。ちゃんと NuGet にもパッケージングされていて、WebMatrix からもサックリ使えるよ。</p><p><img src="20121007113028.png" alt="f:id:daruyanagi:20121007113028p:plain" title="f:id:daruyanagi:20121007113028p:plain" class="hatena-fotolife"></p>

<div class="section">
<h4>サンプルコード</h4>
<pre class="code lang-cs" data-lang="cs" data-unlink># Default.cshtml

@functions {
<span class="synComment">// シリアライズ・デシリアライズのためのサンプルクラス</span>
<span class="synType">public</span> <span class="synType">class</span> Person
{
<span class="synType">public</span> <span class="synType">string</span> FirstName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> LastName { get; set; }

<span class="synType">public</span> <span class="synType">override</span> <span class="synType">string</span> ToString()
{
<span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0} {1}&quot;</span>, FirstName, LastName);
}
}
}

@{
var person = <span class="synStatement">new</span> Person()
{
FirstName = <span class="synConstant">&quot;Hidetoshi&quot;</span>, LastName = <span class="synConstant">&quot;Yanagi&quot;</span>,
};

<span class="synComment">// シリアライザの生成</span>
<span class="synComment">// using System.Yaml.Serialization;</span>
var serializer = <span class="synStatement">new</span> YamlSerializer();

<span class="synComment">// YML形式のテキスト</span>
<span class="synType">string</span> yml =<span class="synSpecial">@</span><span class="synConstant">&quot;</span>
<span class="synStatement">LastName:</span> 柳
<span class="synStatement">FirstName:</span> 英俊
<span class="synConstant">&quot;;</span>

<span class="synComment">// YMLテキスト → Person</span>
var deserialised = serializer.Deserialize(
yml, <span class="synStatement">typeof</span>(Person)
);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;pre&gt;
@serializer.Serialize(person) <span class="synComment">//&lt;-- YMLテキストに！</span>
&lt;/pre&gt;

<span class="synComment">// 返り値は object 配列だよ！</span>
&lt;h1&gt;フルネームは @(deserialised[<span class="synConstant">0</span>] <span class="synStatement">as</span> Person) です。&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
</div>
<div class="section">
<h4>結果</h4>
<p><img src="20121007113045.png" alt="f:id:daruyanagi:20121007113045p:plain" title="f:id:daruyanagi:20121007113045p:plain" class="hatena-fotolife"></p><p>ちょっとアレだな、とおもったのは @(deserialised[0] as Person) の部分だけれど、dynamic でうければいいのかもしれない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>dynamic deserialised = serializer.Deserialize(
yml, <span class="synStatement">typeof</span>(Person)
)[<span class="synConstant">0</span>];

deserialised.FirstName;
</pre>
</div>
</div>