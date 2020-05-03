---
date: 2013-04-05T13:35:15.0000000
draft: false
title: "WebMatrix：NuGet サーバーをたてる"
tags: ["WebMatrix", "NuGet"]
eyecatch: http://a0.twimg.com/profile_images/3067808861/99fc8ebada780f56a03492cd5eba4b3e_normal.jpeg
---
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://a0.twimg.com/profile_images/3067808861/99fc8ebada780f56a03492cd5eba4b3e_normal.jpeg" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      オレオレデザインのベースを NuGet 化しよう</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/319719585307844609" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-04</span> <span class="twitter-detail-info-time">16:54:23</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://a0.twimg.com/profile_images/3067808861/99fc8ebada780f56a03492cd5eba4b3e_normal.jpeg" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      プライベート NuGet サーバーがあれば、公式レポジトリを汚さなくてすむのだけど</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/319719769924308993" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-04</span> <span class="twitter-detail-info-time">16:55:07</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/shibayan"><img src="http://a0.twimg.com/profile_images/3246694761/82d00e7c243a3d38677c98a6e4a8491b_normal.jpeg" alt="shibayan" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> 立てればいいやん</p><p class="twitter-detail-info"><a href="http://twitter.com/shibayan/status/319719804137250816" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-04</span> <span class="twitter-detail-info-time">16:55:16</span></a> <span class="twitter-detail-info-source">via <a href="http://www.s-software.net/" rel="nofollow">みについ</a></span> to @<a href="http://twitter.com/daruyanagi/status/319719769924308993"  class="twitter-user-screen-name">daruyanagi</a></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi"><img src="http://a0.twimg.com/profile_images/3067808861/99fc8ebada780f56a03492cd5eba4b3e_normal.jpeg" alt="daruyanagi" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/shibayan" target="_top">shibayan</a> 前にブログに書いてた方法でまだいけんの？</p><p class="twitter-detail-info"><a href="http://twitter.com/daruyanagi/status/319719872550543360" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-04</span> <span class="twitter-detail-info-time">16:55:32</span></a> <span class="twitter-detail-info-source">via <a href="http://www.metrotwit.com/" rel="nofollow">MetroTwit</a></span> to @<a href="http://twitter.com/shibayan/status/319719804137250816"  class="twitter-user-screen-name">shibayan</a></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/shibayan"><img src="http://a0.twimg.com/profile_images/3246694761/82d00e7c243a3d38677c98a6e4a8491b_normal.jpeg" alt="shibayan" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> 多分</p><p class="twitter-detail-info"><a href="http://twitter.com/shibayan/status/319719938417897472" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-04</span> <span class="twitter-detail-info-time">16:55:48</span></a> <span class="twitter-detail-info-source">via <a href="http://www.s-software.net/" rel="nofollow">みについ</a></span> to @<a href="http://twitter.com/daruyanagi/status/319719872550543360"  class="twitter-user-screen-name">daruyanagi</a></p></div></div></p><p>というわけで、<a href="http://shiba-yan.hatenablog.jp/entry/20111017/1318860985">NuGet.Server &#x3092;&#x5229;&#x7528;&#x3057;&#x3066;&#x30D7;&#x30E9;&#x30A4;&#x30D9;&#x30FC;&#x30C8;&#x30EA;&#x30DD;&#x30B8;&#x30C8;&#x30EA;&#x3092;&#x69CB;&#x7BC9;&#x3059;&#x308B; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a> を参考に自分で NuGet サーバーをたててみた。<i>WebMatrix で。</i>このブログはできるだけ WebMatrix でなんとかやってしまう主義なのです。</p>
<p></p>

<div class="section">
<h3>プロジェクトを作成する</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405125533.png" alt="f:id:daruyanagi:20130405125533p:plain" title="f:id:daruyanagi:20130405125533p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、ASP.NET で「空の Web サイト」テンプレートを選択。最初はテンプレートじゃなくて、クイックスタートで［Empty Site］メニューを選んだのだけど、これだと NuGet が使えないみたい。ちょっと泣いた。</p><p>次に NuGet で <a href="http://nuget.org/packages/NuGet.Server">NuGet Gallery | NuGet.Server 2.2.2</a> をインストール。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405125949.png" alt="f:id:daruyanagi:20130405125949p:plain" title="f:id:daruyanagi:20130405125949p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>そのとき、あらかじめテンプレートの favicon.ico を削除しておくといい。NuGet.Server にはかわいい favicon が含まれているのだけど、インストールがスキップされてしまう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405125850.png" alt="f:id:daruyanagi:20130405125850p:plain" title="f:id:daruyanagi:20130405125850p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>下準備はこれで完了。</p>

</div>
<div class="section">
<h3>実行 & 手直し</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405130159.png" alt="f:id:daruyanagi:20130405130159p:plain" title="f:id:daruyanagi:20130405130159p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず実行するとエラーになる。~/App_Code/DataServices/Routes.cs に少し手を加えないといけないようだ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Data.Services;
<span class="synStatement">using</span> System.ServiceModel.Activation;
<span class="synStatement">using</span> System.Web.Routing;
<span class="synStatement">using</span> Ninject;
<span class="synStatement">using</span> NuGet.Server;
<span class="synStatement">using</span> NuGet.Server.DataServices;
<span class="synStatement">using</span> NuGet.Server.Infrastructure;
<span class="synStatement">using</span> RouteMagic;

<span class="synComment">// [assembly: WebActivator.PreApplicationStartMethod(typeof(.NuGetRoutes), &quot;Start&quot;)]</span>
[assembly: WebActivator.PreApplicationStartMethod(<span class="synStatement">typeof</span>(NuGetRoutes), <span class="synConstant">&quot;Start&quot;</span>)]

<span class="synComment">// namespace {</span>
<span class="synType">namespace</span> ASP {
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">class</span> NuGetRoutes {
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Start() {
MapRoutes(RouteTable.Routes);
}

<span class="synType">private</span> <span class="synType">static</span> <span class="synType">void</span> MapRoutes(RouteCollection routes) {
<span class="synComment">// The default route is http://{root}/nuget/Packages</span>
var factory = <span class="synStatement">new</span> DataServiceHostFactory();
var serviceRoute = <span class="synStatement">new</span> ServiceRoute(<span class="synConstant">&quot;nuget&quot;</span>, factory, <span class="synStatement">typeof</span>(Packages));
serviceRoute.Defaults = <span class="synStatement">new</span> RouteValueDictionary { { <span class="synConstant">&quot;serviceType&quot;</span>, <span class="synConstant">&quot;odata&quot;</span> } };
serviceRoute.Constraints = <span class="synStatement">new</span> RouteValueDictionary { { <span class="synConstant">&quot;serviceType&quot;</span>, <span class="synConstant">&quot;odata&quot;</span> } };
routes.Add(<span class="synConstant">&quot;nuget&quot;</span>, serviceRoute);
}

<span class="synType">private</span> <span class="synType">static</span> PackageService CreatePackageService() {
<span class="synStatement">return</span> NinjectBootstrapper.Kernel.Get&lt;PackageService&gt;();
}
}
}
</pre><p>修正個所は二か所かな？ WebActivator というのはよくわからないけれど、名前から察するに、おそらくアプリケーションの実行前にメソッドを挿入（インジェクション）するものだと思う。なぜわざわざ型名を .NuGetRoutes としてあったのかはよくわからない。</p><p>名前空間は空になっている。アプリケーションの名前空間を入れておこう。WebMatrix で作成するアプリケーションの名前空間は ASP みたいなので、それを加えておく。</p>

<div class="section">
<h4>追記（13:45）</h4>
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/shibayan"><img src="http://a0.twimg.com/profile_images/3246694761/82d00e7c243a3d38677c98a6e4a8491b_normal.jpeg" alt="shibayan" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      だるさん、名前空間が空っぽになったのは Web Pages に名前空間という概念が無いからとられへんかったんやろ</p><p class="twitter-detail-info"><a href="http://twitter.com/shibayan/status/320032320637788160" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-05</span> <span class="twitter-detail-info-time">13:37:05</span></a> <span class="twitter-detail-info-source">via <a href="http://www.s-software.net/" rel="nofollow">みについ</a></span></p></div></div><br />
<div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/shibayan"><img src="http://a0.twimg.com/profile_images/3246694761/82d00e7c243a3d38677c98a6e4a8491b_normal.jpeg" alt="shibayan" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      ほんとは .NuGetRoutes の前に名前空間が入る</p><p class="twitter-detail-info"><a href="http://twitter.com/shibayan/status/320032425063358464" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2013-04-05</span> <span class="twitter-detail-info-time">13:37:30</span></a> <span class="twitter-detail-info-source">via <a href="http://www.s-software.net/" rel="nofollow">みについ</a></span></p></div></div></p><p>NuGet をインストールする際、テンプレートにしたがって名前空間が補われるのだけど、Web Pages には名前空間がない（とれない）ので、空白になってしまうということみたいだね。なるほどなるほど。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405130851.png" alt="f:id:daruyanagi:20130405130851p:plain" title="f:id:daruyanagi:20130405130851p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これでコンパイルは通るのだけど…… <a href="http://localhost:43239/nuget/">http://localhost:43239/nuget/</a> （ポートはそれぞれの環境ごとに違うので読み替えてくれ）が 404 になってしまう。どうもさきほどの NuGetRoutes.Start() がちゃんとキックされていないみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#~/_AppStart.cshtml

@{
NuGetRoutes.Start();
}
</pre><p>というわけで、無理やりたたき起こしてやった（ぁ</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405131111.png" alt="f:id:daruyanagi:20130405131111p:plain" title="f:id:daruyanagi:20130405131111p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これでうまく動いた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405131421.png" alt="f:id:daruyanagi:20130405131421p:plain" title="f:id:daruyanagi:20130405131421p:plain" class="hatena-fotolife" itemprop="image"></span><br />
<span itemscope itemtype="http://schema.org/Photograph"><img src="20130405131127.png" alt="f:id:daruyanagi:20130405131127p:plain" title="f:id:daruyanagi:20130405131127p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://localhost:43239/nuget/">http://localhost:43239/nuget/</a> を NuGet のパッケージソースに加えれば、~/Packages に放り込んだ NuGet パッケージが検索できるようになるぞー！</p>

</div>
</div>
<div class="section">
<h3>ExpressWeb へデプロイ</h3>
<p>ローカルでそのまま使ってもいいのだけれど、リモートでホストした方が便利だと思う。今回は ExpressWeb へアップロードしたけれど、動作させるためにはエラーを二つ潰す必要がある。</p>

<div class="section">
<h4>複数サイトバインディング</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405132450.png" alt="f:id:daruyanagi:20130405132450p:plain" title="f:id:daruyanagi:20130405132450p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>よくわからんが、エラーメッセージにしたがって Web.config を書き換えればよい。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">serviceModel&gt;</span>
<span class="synIdentifier">&lt;serviceHostingEnvironment</span>
<span class="synIdentifier">        </span><span class="synType">aspNetCompatibilityEnabled</span>=<span class="synConstant">&quot;true&quot;</span>
<span class="synIdentifier">        </span><span class="synType">multipleSiteBindingsEnabled</span>=<span class="synConstant">&quot;true&quot;</span>
<span class="synIdentifier">    /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">serviceModel&gt;</span>
</pre>
</div>
<div class="section">
<h4>認証スキーム</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405132648.png" alt="f:id:daruyanagi:20130405132648p:plain" title="f:id:daruyanagi:20130405132648p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これまたよくわからんが、ExpressWeb 側で Windows 認証を無効化したらエラーが解消した。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130405132850.png" alt="f:id:daruyanagi:20130405132850p:plain" title="f:id:daruyanagi:20130405132850p:plain" class="hatena-fotolife" itemprop="image"></span></p>

<ul>
<li><a href="http://nuget.daruyanagi.net/">NuGet Private Repository</a></li>
</ul><p>できた！　プッシュできるようにしてもいいのだけれど、WebMatrix で管理するなら NuGet パッケージを ~/Packages に追加するのは別に苦じゃないので、今回はパス。</p>

</div>
</div>