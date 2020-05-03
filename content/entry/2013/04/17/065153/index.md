---
date: 2013-04-17T06:51:53.0000000
draft: false
title: "WebMatrix 3: RSS フィードを出力する"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p>とあるフォルダー内のファイルのリストを RSS で出力したいなぁ、と思って昔に書いた記事（<a href="https://blog.daruyanagi.jp/entry/2012/02/02/225759">RSS 2.0 &#x3092;&#x5B9F;&#x88C5;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）をコピペしてみたのだけれど、ちゃんと動かなかった……なぜだ。まぁ、原因を追求するのも面倒だったので、SyndicationFeed クラスを利用して書きなおしてみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.Xml
@<span class="synStatement">using</span> System.ServiceModel.Syndication

@{
var url = <span class="synStatement">new</span> Uri(Request.Url.Scheme + <span class="synConstant">&quot;://&quot;</span> + Request.Url.Authority);

<span class="synComment">// ココらへんはあんまり気にしないで</span>
var files = Directory.GetFiles(Server.MapPath(<span class="synConstant">&quot;~/App_Text/&quot;</span>))
.Select(_ =&gt; <span class="synStatement">new</span> FileInfo(_))
.Where(_ =&gt; !_.Name.StartsWith(<span class="synConstant">&quot;_&quot;</span>))
.OrderByDescending(_ =&gt; _.LastWriteTime)
.Take(<span class="synConstant">10</span>);

var feed = <span class="synStatement">new</span> SyndicationFeed(App.Title, App.Description, <span class="synStatement">new</span> Uri(url, <span class="synConstant">&quot;Feed&quot;</span>))
{
Copyright = <span class="synStatement">new</span> TextSyndicationContent(App.Copyright.ToString()),
Items = files.Select(file =&gt;
{
var name = Path.GetFileNameWithoutExtension(file.FullName);

<span class="synComment">// ファイルの内容を読み込んで自作の Markdown エンジンにかけている</span>
var content = TextFormatEngine.Transform(File.ReadAllText(file.FullName));

<span class="synStatement">return</span> <span class="synStatement">new</span> SyndicationItem(
name, content.ToString(), <span class="synStatement">new</span> Uri(url, name), name, file.LastWriteTime
);
}),
};

Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/xml&quot;</span>;
var writer = XmlWriter.Create(Response.Output);
feed.SaveAsRss20(writer);
Response.End();
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130417064514.png" alt="f:id:daruyanagi:20130417064514p:plain" title="f:id:daruyanagi:20130417064514p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>できた！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130417064526.png" alt="f:id:daruyanagi:20130417064526p:plain" title="f:id:daruyanagi:20130417064526p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>と思ったけど、Internet Explorer ではちゃんと表示できない。なんか XML が尻切れトンボで出力されておる……</p>
