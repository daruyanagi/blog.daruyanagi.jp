---
date: 2014-06-21T13:32:54.0000000
draft: false
title: "オープン拡張辞書を Windows Runtime アプリで読み書きする（3）"
tags: ["Windows Runtime"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/06/20/160824">&#x30AA;&#x30FC;&#x30D7;&#x30F3;&#x62E1;&#x5F35;&#x8F9E;&#x66F8;&#x3092; Windows Runtime &#x30A2;&#x30D7;&#x30EA;&#x3067;&#x8AAD;&#x307F;&#x66F8;&#x304D;&#x3059;&#x308B;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。今度は第二の方法「XDocument を使う」でやってみる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Load(<span class="synType">string</span> path = <span class="synSpecial">@</span><span class="synConstant">&quot;Assets\Sample.dctx&quot;</span>)
{
var xml = XDocument.Load(Path.Combine(Package.Current.InstalledLocation.Path, path));
XNamespace ns1 = <span class="synConstant">&quot;http://www.microsoft.com/ime/dctx&quot;</span>;

var header = xml.Root.Element(ns1 + <span class="synConstant">&quot;DictionaryHeader&quot;</span>);
dictionary.DictionaryGuid = header.Element(ns1 + <span class="synConstant">&quot;DictionaryGUID&quot;</span>).Value;
dictionary.DictionaryLanguage = header.Element(ns1 + <span class="synConstant">&quot;DictionaryLanguage&quot;</span>).Value;
dictionary.DictionaryVersion = header.Element(ns1 + <span class="synConstant">&quot;DictionaryVersion&quot;</span>).Value;
dictionary.DictionaryInfo = header.Elements(ns1 + <span class="synConstant">&quot;DictionaryInfo&quot;</span>)
.ToDictionary(
_ =&gt; _.Attribute(<span class="synConstant">&quot;Language&quot;</span>).Value,
_ =&gt; <span class="synStatement">new</span> OpenExtendedDictionaryInfo()
{
ShortName = _.Element(ns1 + <span class="synConstant">&quot;ShortName&quot;</span>).Value,
LongName = _.Element(ns1 + <span class="synConstant">&quot;LongName&quot;</span>).Value,
Description = _.Element(ns1 + <span class="synConstant">&quot;Description&quot;</span>).Value,
Copyright = _.Element(ns1 + <span class="synConstant">&quot;Copyright&quot;</span>).Value,
}
);

dictionary.DictionaryEntries = xml.Root.Elements(ns1 + <span class="synConstant">&quot;DictionaryEntry&quot;</span>)
.Select(_ =&gt; <span class="synStatement">new</span> OpenExtendedDictionaryEntry
{
PartOfSpeech = _.Element(ns1 + <span class="synConstant">&quot;PartOfSpeech&quot;</span>).Value,
OutputString = _.Element(ns1 + <span class="synConstant">&quot;OutputString&quot;</span>).Value,
InputString = _.Element(ns1 + <span class="synConstant">&quot;InputString&quot;</span>).Value,
Priority = _.Element(ns1 + <span class="synConstant">&quot;Priority&quot;</span>).Value.AsInt(),
ReverseConversion = _.Element(ns1 + <span class="synConstant">&quot;ReverseConversion&quot;</span>).Value.AsBool(),
CommonWord = _.Element(ns1 + <span class="synConstant">&quot;CommonWord&quot;</span>).Value.AsBool(),
})
.ToList();
}
</pre><p>個人的には <code>XNamespace ns1 = "http://www.microsoft.com/ime/dctx";</code> や <code>xml.Root.Element(ns1 + "DictionaryHeader")</code> みたいなコードが気持ち悪いのだけど、XDocument では Namespace をこうやって扱うってことで割り切るしかない。</p><p>それ以外は割りとすっきりかけたので、DictionaruInfo たちは Dictionary<"ローケール文字列", DictionaryIndo> で管理するように書き換えてある。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionary
{
<span class="synType">public</span> OpenExtendedDictionary()
{
DictionaryInfo = <span class="synStatement">new</span> Dictionary&lt;<span class="synType">string</span>,OpenExtendedDictionaryInfo&gt;();
DictionaryEntries = <span class="synStatement">new</span> List&lt;OpenExtendedDictionaryEntry&gt;();
}

<span class="synType">public</span> <span class="synType">string</span> DictionaryGuid { get; set; }
<span class="synType">public</span> <span class="synType">string</span> DictionaryLanguage { get; set; }
<span class="synType">public</span> <span class="synType">string</span> DictionaryVersion { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> CommentInsertion { get; set; }
<span class="synType">public</span> Dictionary&lt;<span class="synType">string</span>, OpenExtendedDictionaryInfo&gt; DictionaryInfo { get; set; }
<span class="synType">public</span> List&lt;OpenExtendedDictionaryEntry&gt; DictionaryEntries { get; set; }
}

<span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionaryInfo
{
<span class="synType">public</span> <span class="synType">string</span> ShortName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> LongName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Description { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Copyright { get; set; }
}

<span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionaryEntry
{
<span class="synType">public</span> <span class="synType">string</span> PartOfSpeech { get; set; }
<span class="synType">public</span> <span class="synType">string</span> OutputString { get; set; }
<span class="synType">public</span> <span class="synType">string</span> InputString { get; set; }
<span class="synType">public</span> <span class="synType">int</span> Priority { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> ReverseConversion { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> CommonWord { get; set; }
}
</pre><p>あと、ASP.NET WebPages みたいな .As***() 系の拡張メソッドが好きなので、別途作っておいた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> ObjectExtentions
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> AsString(<span class="synStatement">this</span> <span class="synType">object</span> input, <span class="synType">string</span> defaultValue = <span class="synConstant">&quot;&quot;</span>)
{
<span class="synStatement">try</span>
{
<span class="synStatement">return</span> input.ToString();
}
<span class="synStatement">catch</span>
{
<span class="synStatement">return</span> defaultValue;
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">bool</span> AsBool(<span class="synStatement">this</span> <span class="synType">object</span> input, <span class="synType">bool</span> defaultValue = <span class="synConstant">false</span>)
{
<span class="synStatement">try</span>
{
<span class="synStatement">return</span> Boolean.Parse(input.ToString());
}
<span class="synStatement">catch</span>
{
<span class="synStatement">return</span> defaultValue;
}
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">int</span> AsInt(<span class="synStatement">this</span> <span class="synType">object</span> input, <span class="synType">int</span> defaultValue = <span class="synConstant">0</span>)
{
<span class="synStatement">try</span>
{
<span class="synStatement">return</span> <span class="synType">int</span>.Parse(input.ToString());
}
<span class="synStatement">catch</span>
{
<span class="synStatement">return</span> defaultValue;
}
}
}
</pre><p>別に Windows Runtime 関係なくなってきたな。</p><p>第三の手段、バインディングはやり方まったくわからないしめんどくさそうなので、今回は第二の手段をとることとし、今度は保存してみることにする。</p>
