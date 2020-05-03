---
date: 2013-07-18T03:35:39.0000000
draft: false
title: "WebMatrix 3: Windows Store oEmbed API を利用する"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p><a href="http://wsoembed.com/">Windows Store oEmbed API</a> は、なかなかいいですね。ブログにこんなかんじでストアアプリの情報が貼り付けられます。</p><p><iframe width="453" height="252" src="http://wsoembed.com/embed?id=24b07f02-446a-4861-b265-1d2fe4dd5383" frameborder="0"></iframe></p><p><iframe width="453" height="252" src="http://wsoembed.com/embed?id=86b6ecdc-e810-4aa2-9bdb-bb0da5b34737" frameborder="0"></iframe></p><p>使い方などは以下の URL を参照してください。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20130717/1373987475">Windows Store oEmbed API &#x3068;&#x3057;&#x3066;&#x516C;&#x958B;&#x3057;&#x306A;&#x304A;&#x3057;&#x307E;&#x3057;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20130716/1373916091">Windows &#x30B9;&#x30C8;&#x30A2;&#x306E;&#x5185;&#x5BB9;&#x3092;&#x57CB;&#x3081;&#x8FBC;&#x3081;&#x308B; oEmbed API &#x3092;&#x4F5C;&#x3063;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>またストアアプリを作りたくなりました（ぁ</p>

<div class="section">
<h3>WebMatrix 3 で Windows Store oEmbed API を利用する</h3>
<p><a href="http://shiba-yan.hatenablog.jp/entry/20130718/1374073617">Windows Store oEmbed API &#x3068; jquery-oembed &#x3092;&#x7D44;&#x307F;&#x5408;&#x308F;&#x305B;&#x3066;&#x4F7F;&#x3046;&#x65B9;&#x6CD5; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a> のように JavaScript（クライアントサイド）で利用するのがよいと思いますが、C#（サーバーサイド）で使うこともできます。説明するのは面倒なので、コードだけおいておきます。APS.NET の“空のサイト”を作成し、Default.cshtml を以下のように編集してください。</p>
<pre class="code lang-html" data-lang="html" data-unlink>@{
const string API_ENDPOINT = @&quot;http://wsoembed.com/oembed&quot;;
const string APP_URL = @&quot;http://apps.microsoft.com/windows/ja-jp/app/86b6ecdc-e810-4aa2-9bdb-bb0da5b34737&quot;;

var url = string.Format(&quot;{0}?url={1}&quot;, API_ENDPOINT, APP_URL);
var response = string.Empty;

using (var downloader = new WebClient(){ Encoding = System.Text.Encoding.UTF8 })
{
response = downloader.DownloadString(url);
}

var json_object = Json.Decode(response);
}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Query<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>@url<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>JSON<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>
@response
<span class="synIdentifier">&lt;/</span><span class="synStatement">pre</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>json_object Member<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>var json_object = Json.Decode(response);<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
@foreach(var member in json_object.GetDynamicMemberNames())
{
<span class="synIdentifier">&lt;</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>json_object.@member<span class="synIdentifier">&lt;/</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>
}
<span class="synIdentifier">&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Html.Raw(json_object.html)<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
@Html.Raw(json_object.html)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>結果はこんなかんじです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130718032449.png" alt="f:id:daruyanagi:20130718032449p:plain" title="f:id:daruyanagi:20130718032449p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>API_ENDPOINT を叩けば JSON が返ってくるので、JSON ヘルパーを利用してオブジェクトにしてやりましょう。このオブジェクトは dynamic なので、json_object.html などとしてやれば値がとれます。大文字小文字に注意してね ☆（ゝω・）vｷｬﾋﾟ</p>

</div>
<div class="section">
<h3>Windows Store oEmbed API ヘルパー</h3>
<p>こんなコード、毎回書くのは面倒なので、ヘルパーにしてしまいましょう。ルートフォルダーに App_Code フォルダーを作成し、WindowsStore.cshtml を作成します。中身はこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@helper GetHtml(<span class="synType">string</span> app_id) {
<span class="synComment">// app_id が url で渡されても許容する</span>
app_id = app_id.Split(<span class="synConstant">'/'</span>).Last();

<span class="synType">const</span> <span class="synType">string</span> API_ENDPOINT = <span class="synSpecial">@</span><span class="synConstant">&quot;http://wsoembed.com/oembed&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> APP_BASEURL = <span class="synSpecial">@</span><span class="synConstant">&quot;http://apps.microsoft.com/windows/ja-jp/app/&quot;</span>;

var url = <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}?url={1}&quot;</span>, API_ENDPOINT, APP_BASEURL + app_id);

<span class="synStatement">using</span> (var downloader = <span class="synStatement">new</span> WebClient(){ Encoding = System.Text.Encoding.UTF8 })
{
var response = downloader.DownloadString(url);
var json_object = Json.Decode(response);

@Html.Raw(json_object.html)
}
}
</pre><p>使い方はこんな感じ。Default.cshtml の最後の方にでも書き足してみてください。</p>
<pre class="code lang-html" data-lang="html" data-unlink>        :
:
<span class="synIdentifier">&lt;</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>Helper<span class="synIdentifier">&lt;/</span><span class="synStatement">h1</span><span class="synIdentifier">&gt;</span>
@WindowsStore.GetHtml(APP_URL)

@WindowsStore.GetHtml(&quot;86b6ecdc-e810-4aa2-9bdb-bb0da5b34737&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>結果はこんなかんじです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130718033142.png" alt="f:id:daruyanagi:20130718033142p:plain" title="f:id:daruyanagi:20130718033142p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ja-jp で決め打ちになっているのはアレなので、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@helper GetHtml(<span class="synType">string</span> app_id, <span class="synType">string</span> locale = <span class="synConstant">&quot;en-us&quot;</span>) {
：
：
</pre><p>みたいなシグネチャの方がいいのかもしれませんね。</p>

</div>