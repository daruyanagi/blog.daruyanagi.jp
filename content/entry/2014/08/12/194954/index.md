---
date: 2014-08-12T19:49:54.0000000
draft: false
title: "WebMatrix 3：oEmbed ヘルパーを作ってみた（２）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/08/08/185357">WebMatrix 3&#xFF1A;oEmbed &#x30D8;&#x30EB;&#x30D1;&#x30FC;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。今回は Flickr の埋め込みをやってみようかと思う。</p>

<div class="section">
<h3>~/App_Code/OEmbed.cshtml</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>@helper Flickr(<span class="synType">string</span> url) {
<span class="synType">const</span> <span class="synType">string</span> API_ENDPOINT = <span class="synConstant">&quot;http://www.flickr.com/services/oembed/&quot;</span>;

<span class="synStatement">using</span> (var downloader = <span class="synStatement">new</span> WebClient())
{
<span class="synStatement">try</span>
{
<span class="synComment">// URL を組み立てて JSON の oEmbed データを取得</span>
var request = <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}?url={1}&amp;format={2}&quot;</span>, API_ENDPOINT, url, <span class="synConstant">&quot;json&quot;</span>);
var oembed_data = downloader.DownloadString(request);
var oembed_json = Json.Decode(oembed_data);

@ObjectInfo.Print(oembed_json) <span class="synComment">// デバッグのため</span>

var embed_type = oembed_json.type <span class="synStatement">as</span> <span class="synType">string</span>;

<span class="synStatement">switch</span> (embed_type) <span class="synComment">// photo と video の二種類がある</span>
{
<span class="synStatement">case</span> <span class="synConstant">&quot;photo&quot;</span>:
&lt;figure&gt;
&lt;img src=<span class="synConstant">'</span><span class="synError">@oembed_json.url</span><span class="synConstant">'</span> alt=<span class="synConstant">'</span><span class="synError">@oembed_json.title</span><span class="synConstant">'</span>&gt;
&lt;figcaption&gt;
&lt;img src=<span class="synConstant">'</span><span class="synError">http://favicon.qfor.info/f/@oembed_json.provider_url</span><span class="synConstant">'</span> /&gt;
&lt;a href=<span class="synConstant">'</span><span class="synError">@oembed_json.web_page</span><span class="synConstant">'</span>&gt;@oembed_json.title&lt;/a&gt;
by &lt;a href=<span class="synConstant">'</span><span class="synError">@oembed_json.author_url</span><span class="synConstant">'</span>&gt;@oembed_json.author_name&lt;/a&gt;
&lt;/figcaption&gt;
&lt;/figure&gt;
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">&quot;video&quot;</span>:
&lt;figure&gt;
@Html.Raw(oembed_json.html)
&lt;/figure&gt;
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
<span class="synStatement">break</span>;

}
}
<span class="synStatement">catch</span> (Exception exception)
{
&lt;p <span class="synType">class</span>=<span class="synConstant">'</span><span class="synError">error</span><span class="synConstant">'</span>&gt;@url: @exception.Message&lt;/p&gt;
}
}
}
</pre>
</div>
<div class="section">
<h3>~/Default.cshtml</h3>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">http-equiv</span><span class="synIdentifier">=</span><span class="synConstant">&quot;Content-Type&quot;</span><span class="synIdentifier"> </span><span class="synType">content</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/html; charset=utf-8&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@OEmbed.Flickr(&quot;https://www.flickr.com/photos/daruyanagi/6219334657/&quot;)
@OEmbed.Flickr(&quot;https://www.flickr.com/photos/dmartinie/5760711397/&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
</div>
<div class="section">
<h3>結果</h3>
<p>たとえば Photo の場合。Twitter のときみたいに html を返してくれないので、自分で組み立てる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140812194342.png" alt="f:id:daruyanagi:20140812194342p:plain" title="f:id:daruyanagi:20140812194342p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span>figure<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">img</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">'https://farm7.staticflickr.com/6162/6219334657_ba91a4498d_z.jpg'</span><span class="synIdentifier"> </span><span class="synType">alt</span><span class="synIdentifier">=</span><span class="synConstant">'SMSはやく使えるようになりたい'</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span>figcaption<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">img</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">'http://favicon.qfor.info/f/https://www.flickr.com/'</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">'https://www.flickr.com/photos/daruyanagi/6219334657/'</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">SMSはやく使えるようになりたい</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
by <span class="synIdentifier">&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">'https://www.flickr.com/photos/daruyanagi/'</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">daruyanagi</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>figcaption<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>figure<span class="synIdentifier">&gt;</span>
</pre><p>Video の場合。これは html があるのでそれを使う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140812194506.png" alt="f:id:daruyanagi:20140812194506p:plain" title="f:id:daruyanagi:20140812194506p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span>figure<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">object</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;application/x-shockwave-flash&quot;</span><span class="synIdentifier"> </span><span class="synType">width</span><span class="synIdentifier">=</span><span class="synConstant">&quot;500&quot;</span><span class="synIdentifier"> </span><span class="synType">height</span><span class="synIdentifier">=</span><span class="synConstant">&quot;281&quot;</span><span class="synIdentifier"> </span><span class="synType">data</span><span class="synIdentifier">=</span><span class="synConstant">&quot;https://www.flickr.com/apps/video/stewart.swf?v=145061&quot;</span><span class="synIdentifier"> </span><span class="synType">classid</span><span class="synIdentifier">=</span><span class="synConstant">&quot;clsid:D27CDB6E-AE6D-11cf-96B8-444553540000&quot;</span><span class="synIdentifier">&gt;</span> <span class="synIdentifier">&lt;</span><span class="synStatement">param</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;flashvars&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;intl_lang=en-us&amp;photo_secret=5f7c3bff83&amp;photo_id=5760711397&amp;flickr_show_info_box=true&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">param</span><span class="synIdentifier">&gt;</span> <span class="synIdentifier">&lt;</span><span class="synStatement">param</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;movie&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;https://www.flickr.com/apps/video/stewart.swf?v=145061&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">param</span><span class="synIdentifier">&gt;</span> <span class="synIdentifier">&lt;</span><span class="synStatement">param</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;bgcolor&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;#000000&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">param</span><span class="synIdentifier">&gt;</span> <span class="synIdentifier">&lt;</span><span class="synStatement">param</span><span class="synIdentifier"> </span><span class="synType">name</span><span class="synIdentifier">=</span><span class="synConstant">&quot;allowFullScreen&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span><span class="synIdentifier">=</span><span class="synConstant">&quot;true&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">param</span><span class="synIdentifier">&gt;&lt;</span>embed<span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;application/x-shockwave-flash&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;https://www.flickr.com/apps/video/stewart.swf?v=145061&quot;</span><span class="synIdentifier"> </span><span class="synType">bgcolor</span><span class="synIdentifier">=</span><span class="synConstant">&quot;#000000&quot;</span><span class="synIdentifier"> allowfullscreen=</span><span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> flashvars=</span><span class="synConstant">&quot;intl_lang=en-us&amp;photo_secret=5f7c3bff83&amp;photo_id=5760711397&amp;flickr_show_info_box=true&quot;</span><span class="synIdentifier"> </span><span class="synType">height</span><span class="synIdentifier">=</span><span class="synConstant">&quot;281&quot;</span><span class="synIdentifier"> </span><span class="synType">width</span><span class="synIdentifier">=</span><span class="synConstant">&quot;500&quot;</span><span class="synIdentifier">&gt;&lt;/</span>embed<span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">object</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span>figure<span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140812194912.png" alt="f:id:daruyanagi:20140812194912p:plain" title="f:id:daruyanagi:20140812194912p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>写真の方は CSS でいい感じにデコってみた。なかなかいいかも。</p>

</div>