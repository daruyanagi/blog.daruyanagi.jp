---
date: 2014-06-20T16:08:24.0000000
draft: false
title: "オープン拡張辞書を Windows Runtime アプリで読み書きする（2）"
tags: ["Windows Runtime"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/06/19/210043">&#x30AA;&#x30FC;&#x30D7;&#x30F3;&#x62E1;&#x5F35;&#x8F9E;&#x66F8;&#x3092; Windows Runtime &#x30A2;&#x30D7;&#x30EA;&#x3067;&#x8AAD;&#x307F;&#x66F8;&#x304D;&#x3059;&#x308B;&#xFF08;1&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。まずは第一の手段「XmlDocument を使う」で実装してみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> async <span class="synType">void</span> Load(<span class="synType">string</span> path)
{
var file = await Package.Current.InstalledLocation.GetFileAsync(path);
var text = await Windows.Storage.FileIO.ReadTextAsync(file);

var xml = <span class="synStatement">new</span> XmlDocument();
var settings = <span class="synStatement">new</span> XmlLoadSettings();
xml.LoadXml(text, settings);

var dictionary = <span class="synStatement">new</span> OpenExtendedDictionary();

dictionary.DictionaryGuid = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:DictionaryGUID&quot;</span>).First().InnerText;
dictionary.DictionaryLanguage = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:DictionaryLanguage&quot;</span>).First().InnerText;
dictionary.DictionaryVersion = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:DictionaryVersion&quot;</span>).First().InnerText;

dictionary.DictionaryInfo.Language = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:DictionaryInfo&quot;</span>)[<span class="synConstant">0</span>].Attributes[<span class="synConstant">0</span>].NodeValue.AsString();
dictionary.DictionaryInfo.ShortName = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:ShortName&quot;</span>).First().InnerText;
dictionary.DictionaryInfo.LongName = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:LongName&quot;</span>).First().InnerText;
dictionary.DictionaryInfo.Description = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:Description&quot;</span>).First().InnerText;
dictionary.DictionaryInfo.Copyright = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:Copyright&quot;</span>).First().InnerText;

dictionary.DictionaryEntries = xml.GetElementsByTagName(<span class="synConstant">&quot;ns1:DictionaryEntry&quot;</span>)
.Select(entry =&gt; <span class="synStatement">new</span> OpenExtendedDictionaryEntry
{
PartOfSpeech = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:PartOfSpeech&quot;</span>).First().InnerText,
OutputString = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:OutputString&quot;</span>).First().InnerText,
InputString = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:InputString&quot;</span>).First().InnerText,
Priority = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:Priority&quot;</span>).First().InnerText.AsInt(),
ReverseConversion = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:ReverseConversion&quot;</span>).First().InnerText.AsBool(),
CommonWord = entry.ChildNodes.Where(_ =&gt; _.NodeName == <span class="synConstant">&quot;ns1:CommonWord&quot;</span>).First().InnerText.AsBool(),
})
.ToObservableCollection();
}
</pre><p><br />
書いてて辛かった。<a href="http://msdn.microsoft.com/ja-jp/library/system.xml.nametable(v=vs.110).aspx">NameTable Class (System.Xml) | Microsoft Docs</a> が IntelliSense で出てこないのはサポートされていないということだろうか。 <code>GetElementsByTagName()</code> とか <code>ChildNodes.Where(_ => _.NodeName == "ns1:PartOfSpeech")</code> とか、割とひどい感じだと思った。</p>

<blockquote cite="http://ufcpp.net/study/csharp/ap_modern.html">
<p><b>過去の書き方</b><br />
.NET 3.0 以前では、XmlDocument クラス（System.Xml 名前空間）を使っていました。</p><p><b>今の書き方</b><br />
.NET 3.5 で、XDocument クラスが追加されました。 IEnumerable<XElement> で要素一覧を読み出せるので、LINQ to Objects が使えます。</p>

<cite><a href="http://ufcpp.net/study/csharp/ap_modern.html">&#x4F7F;&#x308F;&#x306A;&#x304F;&#x306A;&#x3063;&#x305F;&#x6A5F;&#x80FD;&#x30FB;&#x65B0;&#x3057;&#x3044;&#x6A5F;&#x80FD; - C# &#x306B;&#x3088;&#x308B;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;&#x5165;&#x9580; | ++C++; // &#x672A;&#x78BA;&#x8A8D;&#x98DB;&#x884C; C</a></cite>
</blockquote>
<p>おとなしく XDocument を使うことにしよう。</p>
