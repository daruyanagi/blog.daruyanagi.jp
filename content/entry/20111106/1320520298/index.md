---
date: 2011-11-06T04:11:38.0000000
draft: false
title: "WebMatrix + Markdown で手軽に更新できる（？）Webサイトを作る"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-10.png"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-10-500x379.png" alt="" title="sshot-10" width="500" height="379" class="alignnone size-medium wp-image-389" /></a></p><p>指定したフォルダに Markdown 形式のプレーンテキストを配置して、 <i><a href="http://sample.com/Hoge">http://sample.com/Hoge</a></i> にアクセスしたら、 <i>Hoge.txt</i> がHTMLへ整形のうえ表示できる……なんてWebサイトがあったら、テキストファイルをぽいぽい書いていくだけでページを更新できて楽かなぁ、なんて思いませんかね。</p><p>ちょっとやってみたのだけど、それに近いことができたので、ちょっと晒してみる。その前に、必要な NuGet を入れておこう。</p>

<ul>
<li>Markdown Deep （最近気に入っている Markdown パーサ。MVC3 向けのサンプルもある）</li>
<li>Razor Engine （ちょっとあとで面白い機能を付けるために入れておく）</li>
</ul><p>んで、 _Pages.cshtml_ に以下のコードを追加。</p>
<pre class="code" data-unlink>	@using System.IO

@{
// Layout = &#34;_SiteLayout.cshtml&#34;; レイアウトを使うならコメントアウト

// http://sample.com/Pages/Hoge のうち、Hoge を取得
string id = UrlData[0];
if (string.IsNullOrEmpty(id)) { id = &#34;Home&#34;; }

Page.Title = id; // IDをページタイトルにセット。レイアウトで使う

// サーバー上の /Pages/Hoge.txt をロード
string path = Server.MapPath(string.Format(&#34;/Pages/{0}.txt&#34;, id));

if (!File.Exists(path)) // ファイルあらへん =&gt; 404を投げる
{
throw new HttpException(404, path + &#34;is not found.&#34;);
}

var content = File.ReadAllText(path);

// Markdown エンジン を用意
var markdown = new MarkdownDeep.Markdown()
{
ExtraMode = true,
};

// HTML へ変換
var body = content;
body = RazorEngine.Razor.Parse(body); // ※
body = markdown.Transform(body);
}

@Html.Raw(body) </pre><p>※ の部分を入れたお陰で、Markdown に埋め込んだ Razor コードが使える <a href="#f1" name="fn1" title="たとえば、@DateTime.Now とか">*1</a> 。ただし、自分で作った Helper を追加したところ、呼び出すのは失敗。基本的なクラスなら使えるのだけど、あとから追加したのは RazorEngine に知らせてあげないといけないのかな？ ちょっとそこまでは使い方がわからない。</p><p><a href="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-11.png"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/11/sshot-11-500x366.png" alt="" title="sshot-11" width="500" height="366" class="alignnone size-medium wp-image-390" /></a></p><p>ともあれ、これで  <i><a href="http://sample.com/Pages/Hoge">http://sample.com/Pages/Hoge</a></i> にアクセスしたら、 <i>/Pages/Hoge.txt</i> がHTMLとして表示される。_Pages_フォルダにテキストを追加していけば、ページをどんどん増やせる。</p><p>あんまりエラー処理していない <a href="#f2" name="fn2" title="ファイル名として使えない文字が渡された場合など">*2</a> ので、実際に使う場合はもう少し手を加えなきゃいけないし、入力用のインターフェイスだってほしいかもしれない。「WebMatrix 2」は NuGet の導入も簡単になっているので、さっさと正式版におなりになっていただきたいものですね！</p>

<ul>
<li>
<ul>
<li>-</li>
</ul></li>
</ul><p>ほんとは Pages ってのも消したいのだけど、そこもわからなかった。 ASP.NET MVC3 ならば Routing をいじってって感じなのだけど、WebMatrix だとどうやればいいのかなぁ。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">たとえば、@DateTime.Now とか</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">ファイル名として使えない文字が渡された場合など</span></p>
</div>