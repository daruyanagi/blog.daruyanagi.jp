---
date: 2011-10-05T00:10:27.0000000
draft: false
title: "Flickr2Html 1.3, BlackbirdPie 1.3, StringSupport 1.3"
tags: ["未分類"]
eyecatch: 
---

<div class="section">
<h4>[StringSupport - 1.3](<a href="http://nuget.org/List/Packages/StringSupport">http://nuget.org/List/Packages/StringSupport</a>)</h4>
<p>1. Flickr の短縮URLを展開するために、string.Base58Decode 拡張メソッドを追加。 </p>
<pre class="code" data-unlink>        const string BASE58 = &#34;123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ&#34;;

public static long Base58Decode(this string input)
{
return BaseDecode(input, BASE58);
}

public static long BaseDecode(string input, string alphabet)
{
long decoded = 0, multi = 1;

foreach (var c in input.Reverse())
{
decoded += multi * alphabet.IndexOf(c);
multi *= alphabet.Length;
}

return decoded;
} </pre>
</div>
<div class="section">
<h4>[Flickr2Html - 1.3](<a href="http://nuget.org/List/Packages/Flickr2Html">http://nuget.org/List/Packages/Flickr2Html</a>)</h4>
<p>1.  GetHtml()/GetHtml5() の引数に短縮URL（<a href="http://flic.kr/p/***">http://flic.kr/p/***</a>）を指定できるように修正</p>
<pre class="code" data-unlink>        @Flickr2Html.GetHtml5(&#34;http://flic.kr/p/asHoxQ&#34;)</pre><p>2.  ShowCaption/DefauldSize プロパティの追加。あらかじめプロパティに値を設定しておけば GetHtml()/GetHtml5() の引数を省略できる</p>
<pre class="code" data-unlink>        @{
Flickr2Html.DefauldSize = Flickr2Html.Size.Medium640;
}</pre>
</div>
<div class="section">
<h4>[BlackBirdPie - 1.3](<a href="http://nuget.org/List/Packages/BlackbirdPie">http://nuget.org/List/Packages/BlackbirdPie</a>)</h4>
<p>1.  StyleSheetUrl/ExpandShortenedUrl/IncludeStyle/Locale プロパティの追加。あらかじめプロパティに値を設定しておけば GetHtml() の引数を省略できる</p>
<pre class="code" data-unlink>        @{
BlackbirdPie.IncludeStyle = false;
BlackbirdPie.Locale = BlackbirdPie.Locales.ja;
}
&lt;link rel=&#34;stylesheet&#34; href=&#34;@BlackbirdPie.StyleSheetUrl&#34; /&gt;</pre><p>2.   スタイルシートをインライン展開するStyleSheet()メソッドの追加。あまり使わないだろうけど。</p>

</div>