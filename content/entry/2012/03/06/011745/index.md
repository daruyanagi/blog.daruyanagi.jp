---
date: 2012-03-06T01:17:45.0000000
draft: false
title: "YouTube の URL を動画タグへ変換する（oEmbed）"
tags: ["C#", "ASP.NET"]
eyecatch: 
---
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/03/03/225037">Flickr &#x306E; URL &#x3092;&#x753B;&#x50CF;&#x30BF;&#x30B0;&#x3078;&#x5909;&#x63DB;&#x3059;&#x308B;&#xFF08;oEmbed&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の<a class="keyword" href="http://d.hatena.ne.jp/keyword/Youtube">Youtube</a>版も作ってみた。</p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/Youtube">Youtube</a> も oEmbed に対応しているのだけれど、画像ではなく動画なので、リンクを作る場合は url ではなく html （objectタグ）を使うのが、<a class="keyword" href="http://d.hatena.ne.jp/keyword/Flickr">Flickr</a> の写真の場合と少し違うところ<a href="#f1" name="fn1" title="Flickr も動画に対応しているのだけど、type=="video" の場合はやっぱり url ではなく html を使う">*1</a>。type には、ほかに rich だの link だのがあるっぽい。</p><p>詳しくは <a href="http://oembed.com/">oEmbed</a> に全部書いてあるので参照のこと。</p>

<pre class="code" data-unlink>private static readonly string SERVICE_ENDPOINT =
@&#34;http://www.youtube.com/oembed&#34;;
private static readonly string FORMAT_URL =
@&#34;{0}?url={1}&amp;maxwidth={2}&amp;maxheight={3}&amp;format={4}&#34;;

public static string FORMAT_HTML_VIDEO_TAG = @&#34;
&lt;blockquote class=&#39;youtube youtube-video&#39;&gt;
&lt;p&gt;{0}&lt;p&gt;
&lt;p&gt;&lt;small&gt;{1} by &lt;a href=&#39;{3}&#39;&gt;{2}&lt;/a&gt;&lt;/small&gt;&lt;p&gt;
&lt;/blockquote&gt;
&#34;;
public static string FORMAT_ERROR = @&#34;&lt;p class=&#39;error&#39;&gt;{0}&lt;/p&gt;&#34;;

public static string GetHtml(string url,
string max_width = &#34;500&#34;, string max_height = &#34;500&#34;)
{
try
{
return GetHtml(url,
int.Parse(max_width), int.Parse(max_height));
}
catch (Exception e)
{
return string.Format(FORMAT_ERROR, e.Message);
}
}

public static string GetHtml(
string url, int max_width, int max_height)
{
try
{
if (url.StartsWith(&#34;http://youtu.be/&#34;))
url = url.Replace(
&#34;http://youtu.be/&#34;,
&#34;http://www.youtube.com/watch?v=&#34;);

var format = &#34;json&#34;;

var address = string.Format(
FORMAT_URL, SERVICE_ENDPOINT, url,
max_width, max_height, format);

using (var client = new WebClient())
{
var response = client.DownloadString(address);
var info = DynamicJson.Parse(response);

switch (info.type as string)
{
case &#34;video&#34;:
return string.Format(FORMAT_HTML_VIDEO_TAG,
info.html, info.title,
info.author_name, info.author_url);

default:
throw new Exception(&#34;Unknown media type.&#34;);
}
}
}
catch (Exception e)
{
return string.Format(FORMAT_ERROR, e.Message);
}
}</pre>
<p>YouTube の短縮URLはドメイン部分を置換しただけみたい。実装も楽だし、開発者も楽だし、多少リンクが長くなる以外はなかなかイケていると思う。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">Flickr も動画に対応しているのだけど、type=="video" の場合はやっぱり url ではなく html を使う</span></p>
</div>