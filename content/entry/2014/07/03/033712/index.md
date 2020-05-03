---
date: 2014-07-03T03:37:12.0000000
draft: false
title: "オープン拡張辞書を Windows Runtime アプリで読み書きする（4）"
tags: ["Windows Runtime"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/06/21/133254">&#x30AA;&#x30FC;&#x30D7;&#x30F3;&#x62E1;&#x5F35;&#x8F9E;&#x66F8;&#x3092; Windows Runtime &#x30A2;&#x30D7;&#x30EA;&#x3067;&#x8AAD;&#x307F;&#x66F8;&#x304D;&#x3059;&#x308B;&#xFF08;3&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でオープン拡張辞書の読み込みは成功したので、今度は書き込み。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> async <span class="synType">void</span> Save(<span class="synType">string</span> filename)
{
XNamespace ns1 = <span class="synConstant">&quot;http://www.microsoft.com/ime/dctx&quot;</span>;

var xml = <span class="synStatement">new</span> XDocument(
<span class="synStatement">new</span> XDeclaration(<span class="synConstant">&quot;1.0&quot;</span>, <span class="synConstant">&quot;utf-8&quot;</span>, <span class="synConstant">&quot;yes&quot;</span>),
<span class="synStatement">new</span> XComment(<span class="synConstant">&quot;Build by Open Extended Dictionary Editor for WinRT&quot;</span>),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;Dictionary&quot;</span>, <span class="synStatement">new</span> XAttribute(XNamespace.Xmlns + <span class="synConstant">&quot;ns1&quot;</span>, ns1),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryHeader&quot;</span>,
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryGUID&quot;</span>, dictionary.DictionaryGuid),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryLanguage&quot;</span>, dictionary.DictionaryLanguage),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryVersion&quot;</span>, dictionary.DictionaryVersion),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;CommentInsertion&quot;</span>, dictionary.CommentInsertion),
dictionary.DictionaryInfo.Select(_ =&gt; <span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryInfo&quot;</span>,
<span class="synStatement">new</span> XAttribute(<span class="synConstant">&quot;Language&quot;</span>, _.Key),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;ShortName&quot;</span>, _.Value.ShortName),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;LongName&quot;</span>, _.Value.LongName),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;Description&quot;</span>, _.Value.Description),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;Copyright&quot;</span>, _.Value.Copyright)
))
),
dictionary.DictionaryEntries.Select(_ =&gt; <span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;DictionaryEntry&quot;</span>,
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;PartOfSpeech&quot;</span>, _.PartOfSpeech),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;OutputString&quot;</span>, _.OutputString),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;InputString&quot;</span>, _.InputString),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;Priority&quot;</span>, _.Priority),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;ReverseConversion&quot;</span>, _.ReverseConversion),
<span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;CommonWord&quot;</span>, _.CommonWord)
))
)
);

var file = await DownloadsFolder.CreateFileAsync(filename, CreationCollisionOption.GenerateUniqueName);
var stream = await file.OpenStreamForWriteAsync();
xml.Save(stream);
}
</pre><p>割とエレガントに書けたような気がする（あ、Stream って Dispose() とかしなきゃダメなのかな……あとで調べてもう一度書き直そう）。</p><p>ポイントは</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">new</span> XElement(ns1 + <span class="synConstant">&quot;Dictionary&quot;</span>, <span class="synStatement">new</span> XAttribute(XNamespace.Xmlns + <span class="synConstant">&quot;ns1&quot;</span>, ns1),
</pre><p>の部分。<code> new XAttribute(XNamespace.Xmlns + "ns1", ns1</code>を省くと</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;!--Build by Open Extended Dictionary Editor for WinRT--&gt;</span>
<span class="synIdentifier">&lt;Dictionary </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;http://www.microsoft.com/ime/dctx&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DictionaryHeader&gt;</span>
</pre><p>となってしまい失敗（？、イケるのかもしれないけど、サンプルとは違う形式になる）。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;!--Build by Open Extended Dictionary Editor for WinRT--&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">ns1</span><span class="synComment">:</span><span class="synIdentifier">Dictionary </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">ns1</span>=<span class="synConstant">&quot;http://www.microsoft.com/ime/dctx&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">ns1</span><span class="synComment">:</span><span class="synIdentifier">DictionaryHeader&gt;</span>
</pre><p>こんな感じにするには、明示的に XML Namespace の属性を足してやることが必要になる。</p><p>ちなみに開発のほうは共有コントラクトで選択テキストを辞書に追加……っていうところまではできたのだけど、ユーザーインターフェイスを作りこむのが面倒になって開発は止まってる。お盆休みに取り組むことにしよう。</p>
