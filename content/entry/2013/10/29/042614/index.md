---
date: 2013-10-29T04:26:14.0000000
draft: false
title: "WebMatrix 3: プッシュしてデプロイ！"
tags: ["Windows Azure", "WebMatrix", "ASP.net Web Pages", "Bitbucket"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20131029/20131029041314.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029041314.png" alt="f:id:daruyanagi:20131029041314p:plain" title="f:id:daruyanagi:20131029041314p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows Azure Web Sites はソース管理（GitHub とか CodePlex とか）からのデプロイが可能。前々から使ってみたかったがついつい後回しにしていたのだけど、これが超便利だった。</p>


<div class="section">
<h3>Bitbucket</h3>
<p>今回はソース管理に <a href="https://bitbucket.org/">Bitbucket | The Git solution for professional teams</a> を使った。</p><p>Bitbucket のいいところは、なんといっても<b>無料でプライベートリポジトリが作れる</b>ところやな。Web アプリのソースコントロールでありがちなシチュエーションのなかに、シークレットキーを公開リポジトリにプッシュしちゃって消し方がわからんというのがあるけれど、プライベートリポジトリならそこらへんのことはあまり気にしなくてもいいのかもしれない（知らんけど）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029040633.png" alt="f:id:daruyanagi:20131029040633p:plain" title="f:id:daruyanagi:20131029040633p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あと、今回初めて知ったのだけど、ドメインの割り当て（CNAME）もできるのね。さっそくやってみたった。</p>

<ul>
<li><a href="http://code.daruyanagi.net/">http://code.daruyanagi.net/</a></li>
</ul><p>機能的には GitHub のほうが先進的なのかもしれないけれど、Bitbucket もだいぶアリだなと思った。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029040821.png" alt="f:id:daruyanagi:20131029040821p:plain" title="f:id:daruyanagi:20131029040821p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>唯一の弱点は WebMatrix 3 によるサポートがないところ（まぁ、使おうと思えば使えると思うけれど）。公式の GUI ツール「SourceTree」も、「GitHub for Windows」に比べるとメンドくさい（その分多機能ではある）。</p>

<ul>
<li><a href="http://www.forest.impress.co.jp/docs/news/20130917_615684.html">Atlassian&#x3001;&#x7121;&#x511F;&#x306E;Git/Mercurial&#x30AF;&#x30E9;&#x30A4;&#x30A2;&#x30F3;&#x30C8;&#x300C;SourceTree for Windows&#x300D;v1.2&#x3092;&#x516C;&#x958B; - &#x7A93;&#x306E;&#x675C;</a></li>
<li><a href="http://www.forest.impress.co.jp/docs/news/20130627_605293.html">&#x300C;SourceTree for Windows&#x300D;&#x304C;v1.0&#x306B;&#x3001;&ldquo;Mercurial&rdquo;&#x3092;&#x65B0;&#x305F;&#x306B;&#x30B5;&#x30DD;&#x30FC;&#x30C8; - &#x7A93;&#x306E;&#x675C;</a></li>
</ul><p>私の記憶が正しければ（←歳ばれ）、「SourceTree」の最新版は v1.3 ぐらいだったような気がする。</p><p>ちなみに、WebMatrix 3 は全部入りでスゴく便利だけど、決して万能ではない。だからソースコントロールにしろテキストエディターにしろ、自分に好みのツールがほかにあるならば、それと組み合わせてもいいんだよ？　なにも縛られることはないんだ。実際、自分はコードの半分か 1/3 ぐらいは Visual Studio で書いている。</p>

</div>
<div class="section">
<h3>Windows Azure＋ソースコントロール＝デプロイ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029041700.png" alt="f:id:daruyanagi:20131029041700p:plain" title="f:id:daruyanagi:20131029041700p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows Azure 側の設定はめっちゃ簡単。プロジェクトでデプロイの設定とやらをしてあるだけでいい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029041722.png" alt="f:id:daruyanagi:20131029041722p:plain" title="f:id:daruyanagi:20131029041722p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Azure から Bitbucket で認証すれば、Bitbucket にホストしているプロジェクトがリストアップされるので、そこで目当てのプロジェクトを選ぶだけでいい。ブランチも選べるんだな。今回はメンドくさいので master にしたけど、release みたいなブランチを切って置くほうがいいのかもしれない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029041854.png" alt="f:id:daruyanagi:20131029041854p:plain" title="f:id:daruyanagi:20131029041854p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>設定が終わったら、しばし待たれよー……。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029041915.png" alt="f:id:daruyanagi:20131029041915p:plain" title="f:id:daruyanagi:20131029041915p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>完成！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131029042046.png" alt="f:id:daruyanagi:20131029042046p:plain" title="f:id:daruyanagi:20131029042046p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>試しに darufeed.azurewebsites.net へフィード出力機能をちゃちゃっとつけて（<a href="http://darufeed.azurewebsites.net/Feed">http://darufeed.azurewebsites.net/Feed</a>）、Bitbucket にプッシュしてみたら、Azure にも勝手にデプロイされた。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p><a href="https://blog.daruyanagi.jp/entry/2013/04/17/065153">WebMatrix 3: RSS &#x30D5;&#x30A3;&#x30FC;&#x30C9;&#x3092;&#x51FA;&#x529B;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の内容には問題があるな。Writer を Close していないから、空のフィードが出力された。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.Xml
@<span class="synStatement">using</span> System.ServiceModel.Syndication

@{
<span class="synStatement">using</span> (var db = Database.Open(<span class="synConstant">&quot;darufeed&quot;</span>))
{
var items = db.Query(<span class="synConstant">&quot;SELECT * FROM Feeds ORDER BY FeedId DESC&quot;</span>).Take(<span class="synConstant">10</span>);

var feed = <span class="synStatement">new</span> SyndicationFeed(App.Title, App.Description, Request.Url)
{
Copyright = <span class="synStatement">new</span> TextSyndicationContent(App.Copyright.ToString()),
Items = items.Select(
item =&gt; <span class="synStatement">new</span> SyndicationItem(item.Title, <span class="synConstant">&quot;&quot;</span>, <span class="synStatement">new</span> Uri(item.Url))
),
};

Response.Clear();
Response.ContentType = <span class="synConstant">&quot;application/xml&quot;</span>;

<span class="synStatement">using</span> (var writer = XmlWriter.Create(Response.Output))
{
feed.SaveAsRss20(writer);
}
}
}
</pre><p>Writer を Using しておけば問題ない。Response.Close() や Response.Flush() はなくても動いたのだけど、つけといたほうがいいんだろうか。まだまだシロートなので、こういうところはよくわかんない。</p>

</div>