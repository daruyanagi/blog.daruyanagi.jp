---
date: 2011-11-13T11:11:08.0000000
draft: false
title: "Page のものは Page に、App のものは App に"
tags: ["未分類"]
eyecatch: 
---
<p>たとえば、WebMatrix で作るWebサイトで、Webサイト全体で使える変数や、Webページでのみ参照できる変数というものはどうすれば実現できるのだろう？ ―― と思ったのだけど、簡単だった。<a href="http://blog.daruyanagi.net/archives/424">WebMatrix + Markdown …… リファクタリング。</a> のコードで言えばこんな感じ。</p>
<pre class="code" data-unlink>	@functions {
string ReadTextFile(string path)
{
path = string.Format(&#34;/Pages/{0}.txt&#34;, path);
path = Server.MapPath(path);

if (!File.Exists(path))
{
throw new HttpException(404, path + &#34;is not found.&#34;);
}

Page.CreatedAt = File.GetCreationTime(path);
Page.UpdatedAt = File.GetLastWriteTime(path);
// あとで@Page.CreatedAt 、＠Page.UpdatedAt で参照できる！

return File.ReadAllText(path);
}
}</pre><p><code>Page</code> は匿名型になっているので、自由にメンバー変数（？）を増やせる。Webサイト全体の場合は、<code>App</code> を使えばいいらしい。たとえば、<code>App.Title</code> にWebサイト名、<code>Page.Title</code>にページタイトルに突っ込んでおけば、_<i>&lt;title>@Page.Title - @App.Title&lt;/title></i>_ という風にレイアウトファイルでタイトルをセットできる。</p><p>僕は初めこの作法を知らなかったから、 <code>App_Code</code> にグローバル変数を保持するヘルパーを書いていた。見る人が見れば当たり前なんだろうけどね......orz</p>
