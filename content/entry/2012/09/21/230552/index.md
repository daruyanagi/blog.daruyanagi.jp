---
date: 2012-09-21T23:05:52.0000000
draft: false
title: "WinRT/XAML のお勉強 ―― 「分割アプリケーション」テンプレートを活かす"
tags: ["WinRT"]
eyecatch: 
---
<p><img src="20120921221949.png" alt="f:id:daruyanagi:20120921221949p:plain" title="f:id:daruyanagi:20120921221949p:plain" class="hatena-fotolife"></p><p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/okazuki"><img src="http://a0.twimg.com/profile_images/1279095044/____normal.jpg" alt="okazuki" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/xin9le" target="_top">xin9le</a> @<a class="twitter-user-screen-name" href="http://twitter.com/daruyanagi" target="_top">daruyanagi</a> MSが提供している基本構造を理解したうえで無視るのはありだと思います！知らないで無視るのは、大変だと思います。個人的に。</p><p class="twitter-detail-info"><a href="http://twitter.com/okazuki/status/248781444867035136" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-09-20</span> <span class="twitter-detail-info-time">22:51:33</span></a> <span class="twitter-detail-info-source">via <a href="http://krile2.starwing.net/" rel="nofollow">Krile2</a></span> to @<a href="http://twitter.com/xin9le/status/248781270149128193"  class="twitter-user-screen-name">xin9le</a></p></div></div></p><p>昨日、@okazuki さんにいろいろ教えてもらったのだけど、ちょっとチンプンカンプンなところもあったので、今日は「標準テンプレート縛り」で燃費管理アプリを一から開発してみた。</p><p>使ったのは 「分割アプリケーション」。2階層のデータ表示が可能なのかな。List<Group> を表示する ItemsPage.xaml と、そこで Group を選択して List<Group.Items> を表示する SplitPage.xaml が用意されている。</p><p><img src="20120921222935.jpg" alt="f:id:daruyanagi:20120921222935j:plain" title="f:id:daruyanagi:20120921222935j:plain" class="hatena-fotolife"></p><p>いろいろ考えてみたんだけれど、キモはこのテンプレートが要求する仕様に沿ったデータを用意することかな。</p><p>じゃぁ、仕様に沿ったデータ構造って？　DataModel/SampleDataSource.cs を読むと、データは</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>SampleDataSource
<span class="synStatement">    List:</span> SampleDataGroup (SampleDataCommon)
<span class="synStatement">        List:</span> SampleDataItem (SampleDataCommon)
</pre><p>になってる。こういう感じに作ればいい。うちのアプリの場合は、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>DataSource
<span class="synStatement">    List:</span> Vehicle (乗り物)
<span class="synStatement">        List:</span> RefuelLog (給油ログ)
</pre><p>って感じになるかな。乗り物＝Group、給油ログ＝Itemというイメージ。</p><p>んで、Group も Item も SampleDataCommon を継承している。要は <b>UniqueId、Title、Subtitle、Description、Image というプロパティを持ちなさい</b>ということだ。実装したら、テンプレートでバインドされますよ、と<a href="#f1" name="fn1" title="SplitPage ではこれに加えて Content というプロパティも要求する">*1</a>。</p><p>でも、だったらインターフェイスでもいいわけで、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> App5.Common
{
<span class="synStatement">using</span> Windows.UI.Xaml.Media;
<span class="synStatement">using</span> Windows.UI.Xaml.Media.Imaging;

<span class="synType">public</span> <span class="synType">interface</span> ITemplateGridViewItem
{
Guid UniqueId { get; } <span class="synComment">// &lt;- string は嫌だったので改造</span>
<span class="synType">string</span> Title { get; }
<span class="synType">string</span> Subtitle { get; }
<span class="synType">string</span> Description { get; }
ImageSource Image { get; }
ITemplateGridViewItem Parent { get; } <span class="synComment">// &lt;- なくてもいい</span>
}
}
</pre><p>というのを作って、Group/Item はこれを実装するということにした。乗り物データと給油ログデータが一つのデータから継承されてるってなんかアレだけど、インターフェイスなら個人的にしっくりくる。</p><p>燃費管理アプリのデータには、タイトルやサブタイトルなどという概念はない。でも、そこは給油量（Amout）や日付（Date）といったふさわしいプロパティを別途もっておいて、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">string</span> Title
{
<span class="synStatement">get</span> { <span class="synStatement">return</span> <span class="synType">string</span>.Format(<span class="synConstant">&quot;{0:#,##0.00 L}&quot;</span>, amount); }
}

<span class="synType">public</span> <span class="synType">string</span> Subtitle
{
<span class="synStatement">get</span> { <span class="synStatement">return</span> date.ToString(<span class="synConstant">&quot;d&quot;</span>); }
}
</pre><p>という感じで、ビューに表示したいデータ（給油量をタイトルに、日付をサブタイトルに）を適当に返せばいい。なんか M-VM を分けたくなってきたね。まぁ、それは今度でいい。今回はこの汚い実装のまま先に進もう。DataSource（自分で書いたデータソース）も、SampleDataSource のコピペをベースにあまり構造を変えないように実装していく。</p><p>あとは SampleDataSource.cs を消すなりリネームして、ビルドエラーが出た個所をこちょこちょ DataSource に置き換えれば、こんな感じ！</p><p><img src="20120921225136.png" alt="f:id:daruyanagi:20120921225136p:plain" title="f:id:daruyanagi:20120921225136p:plain" class="hatena-fotolife"><img src="20120921225137.png" alt="f:id:daruyanagi:20120921225137p:plain" title="f:id:daruyanagi:20120921225137p:plain" class="hatena-fotolife"><img src="20120921225140.png" alt="f:id:daruyanagi:20120921225140p:plain" title="f:id:daruyanagi:20120921225140p:plain" class="hatena-fotolife"><img src="20120921225143.png" alt="f:id:daruyanagi:20120921225143p:plain" title="f:id:daruyanagi:20120921225143p:plain" class="hatena-fotolife"></p><p>さすが標準テンプレート、Snapped にもばっちり対応だぜ。</p>

<div class="section">
<h3>デザイン時バインディング</h3>
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/okazuki"><img src="http://a0.twimg.com/profile_images/1279095044/____normal.jpg" alt="okazuki" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      @<a class="twitter-user-screen-name" href="http://twitter.com/xin9le" target="_top">xin9le</a> d:DataContext="{d:DesignInstance Type=***, IsDesignTimeCreatable=True}"を適切なところに設定することで、デザイナの支援も受けれます</p><p class="twitter-detail-info"><a href="http://twitter.com/okazuki/status/248781837265170433" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-09-20</span> <span class="twitter-detail-info-time">22:53:06</span></a> <span class="twitter-detail-info-source">via <a href="http://krile2.starwing.net/" rel="nofollow">Krile2</a></span> to @<a href="http://twitter.com/xin9le/status/248781431248134146"  class="twitter-user-screen-name">xin9le</a></p></div></div></p><p>Page.Resource の CollectionViewSource で、d:Source って書いてある部分は、デザイン時のみ有効なデータバインディング。これをやっておけばサンプルデータがバインディングされて、デザインがやりやすくなる。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Page</span><span class="synComment">.</span><span class="synIdentifier">Resources&gt;</span>

<span class="synComment">&lt;!-- このページで表示されるアイテムのコレクション --&gt;</span>
<span class="synIdentifier">&lt;CollectionViewSource</span>
<span class="synIdentifier">        </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;itemsViewSource&quot;</span>
<span class="synIdentifier">        </span><span class="synType">Source</span>=<span class="synConstant">&quot;{Binding Items}&quot;</span>
<span class="synIdentifier">        </span><span class="synType">d</span><span class="synComment">:</span><span class="synType">Source</span>=<span class="synConstant">&quot;{Binding AllGroups[0].Items, Source={d:DesignInstance Type=local:DataSource, IsDesignTimeCreatable=True}}&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/Page</span><span class="synComment">.</span><span class="synIdentifier">Resources&gt;</span>
</pre><p>標準では DataModel/SampleDataSource がバインディングされているけれど、これもちょちょいと local:DataSource <a href="#f2" name="fn2" title="local はアプリケーションの名前空間。XAML の最初のほうに定義してある">*2</a>に書き換えれば……</p><p><img src="20120921222338.png" alt="f:id:daruyanagi:20120921222338p:plain" title="f:id:daruyanagi:20120921222338p:plain" class="hatena-fotolife"><img src="20120921222344.png" alt="f:id:daruyanagi:20120921222344p:plain" title="f:id:daruyanagi:20120921222344p:plain" class="hatena-fotolife"></p><p>うおおー、デザイン時にもバインディングされてる。これは超便利だな！</p><p>ちょっとわかった気がするので、これでテンプレートから足を踏み外せるぜー。これで今日のお勉強は終わり！</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">SplitPage ではこれに加えて Content というプロパティも要求する</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">local はアプリケーションの名前空間。XAML の最初のほうに定義してある</span></p>
</div>