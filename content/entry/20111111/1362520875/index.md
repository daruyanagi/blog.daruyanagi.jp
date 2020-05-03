---
date: 2011-11-11T07:01:15.0000000
draft: false
title: "WebMatrix + Markdown ...... リファクタリング。"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://blog.daruyanagi.net/archives/388">WebMatrix + Markdown で手軽に更新できる（？）Webサイトを作る </a> のコードをリファクタリングしてみた。ついでに、</p>

<ul>
<li>.md/.markdown という拡張子だったらプレーンテキストを表示する機能</li>
<li>フォルダ階層への対応</li>
</ul><p>の2機能を追加した。</p>
<pre class="code" data-unlink>	@using System.IO

@functions {
string ReadTextFile(string path)
{
path = string.Format(&#34;/Pages/{0}.txt&#34;, path);
path = Server.MapPath(path);

if (!File.Exists(path))
{
throw new HttpException(404, path + &#34;is not found.&#34;);
}

return File.ReadAllText(path);
}
}

@{
var url = UrlData.Count &gt; 0
? string.Join(&#34;/&#34;, UrlData)
: &#34;Home&#34;;
url = url.TrimEnd(&#39;/&#39;);

var extension = Path.GetExtension(url);

var content = string.Empty;

switch (extension)
{
case &#34;.markdown&#34;:
case &#34;.md&#34;:
// Remove extension
url = url.Replace(extension, &#34;&#34;);

content = ReadTextFile(url);
Response.ContentType = &#34;text/plain&#34;;
Response.Write(content);
return;

default:
// Prepare Layout
Layout = &#34;_SiteLayout.cshtml&#34;;
Page.Title = url;

// Process by Markdown Deep
var markdown = new MarkdownDeep.Markdown()
{
ExtraMode = true,
};

content = ReadTextFile(url);
content = markdown.Transform(content);
// content = Daruboard.Transform(content);
break;
}
}

@Html.Raw(content) </pre><p><code>Daruboard.Transform(content);</code> は、あらかじめ登録したヘルパーを利用してテキストを整形する仕組みを呼び出している。これについては、また今度。まだちょっとイケてない部分がある。</p>
