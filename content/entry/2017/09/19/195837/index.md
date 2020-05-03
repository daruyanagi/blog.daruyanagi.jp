---
date: 2017-09-19T19:58:37.0000000
draft: false
title: "Omawari 1.1：Web 更新を巡回するヤツ。静的スクレイピングとか追加した"
tags: ["告知", "WPF", "Omawari"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170919194055.png" alt="f:id:daruyanagi:20170919194055p:plain" title="f:id:daruyanagi:20170919194055p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>だいぶサマになってきた気がする。あっちこっちにぬるぽエラーがあって、潰すのに難儀した。Swift とか羨ましいかもね？（よく知らんけど）</p>

<ul>
<li>デバッグビルドとリリースビルドの共存（開発の都合）</li>
<li>通知アイコンの改善</li>
<li>（タイマーの通算稼働時間のカウント）</li>
<li>Updated を Pending に変えるまでの時間をグローバル設定から読み込むように</li>
<li>ステータス色分けの改善</li>
<li>内部で保持している UTC を Local Time にちゃんと直して表示</li>
<li>コードの整理</li>
<li><b>静的スクレイピング機能の追加</b></li>
<li><b>プレビューの文字化けを修正</b></li>
<li><b>更新ログウィンドウの追加</b></li>
<li>スクレイピングルールのダブルクリックでログを表示（編集画面の方がよかったか？）</li>
</ul><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FOmawari%2Freleases%2Ftag%2Fv1.1" title="daruyanagi/Omawari" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Omawari/releases/tag/v1.1">github.com</a></cite><br />
</p>

<div class="section">
<h3>静的スクレイピング機能の追加</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170919194450.png" alt="f:id:daruyanagi:20170919194450p:plain" title="f:id:daruyanagi:20170919194450p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>PhantomJS は遅いので、AngleSharp を使った静的スクレイピングをデフォルトにしました。下手したら3分ぐらいかかっていた処理が、たった数秒に。</p><p><iframe src="https://hatenablog-parts.com/embed?url=http%3A%2F%2Fqiita.com%2Fmatarillo%2Fitems%2Fa92e7efbfd2fdec62595" title="C#でモダンにスクレイピングするならAngleSharp - Qiita" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="http://qiita.com/matarillo/items/a92e7efbfd2fdec62595">qiita.com</a></cite></p><p>AngleSharp は HtmlAgilityPack より断然使いやすいので、今後はこっちをメインに使おうと思います。</p>

</div>
<div class="section">
<h3>プレビューの文字化けを修正</h3>
<p>WebBrowser.NavigateToString() を使うとたまに文字化けする問題。HTML で UTF-8 エンコードを指定すればよかったのですが、Diff の方だけやって、プレビューの方には適用されてなかった（爆死</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> WebBrowserExtension
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">readonly</span> DependencyProperty HtmlProperty = DependencyProperty.RegisterAttached(
<span class="synConstant">&quot;Html&quot;</span>, <span class="synStatement">typeof</span>(<span class="synType">string</span>), <span class="synStatement">typeof</span>(WebBrowserExtension),
<span class="synStatement">new</span> UIPropertyMetadata(<span class="synConstant">null</span>, HtmlPropertyChanged));

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">string</span> GetHtml(DependencyObject obj)
{
<span class="synStatement">return</span> (<span class="synType">string</span>)obj.GetValue(HtmlProperty);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> SetHtml(DependencyObject obj, <span class="synType">string</span> <span class="synStatement">value</span>)
{
obj.SetValue(HtmlProperty, <span class="synStatement">value</span>);
}

<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> HtmlPropertyChanged(DependencyObject o, DependencyPropertyChangedEventArgs e)
{
WebBrowser browser = o <span class="synStatement">as</span> WebBrowser;
<span class="synStatement">if</span> (browser == <span class="synConstant">null</span>) <span class="synStatement">return</span>;
<span class="synType">string</span> html = e.NewValue <span class="synStatement">as</span> <span class="synType">string</span>;
<span class="synStatement">if</span> (html == <span class="synConstant">null</span>) <span class="synStatement">return</span>;
html = $<span class="synSpecial">@</span><span class="synConstant">&quot;</span>
<span class="synConstant">&lt;html&gt;</span>
<span class="synConstant">&lt;head&gt;</span>
<span class="synConstant">    &lt;meta http-equiv='Content-Type' content='text/html;charset=UTF-8'&gt;</span>
<span class="synConstant">    &lt;style&gt;</span>
<span class="synConstant">        ins.diffins {{ background-color: #cfc; text-decoration: none; }} </span>
<span class="synConstant">        del.diffdel {{ color: #999; background-color:#FEC8C8; }}</span>
<span class="synConstant">    &lt;/style&gt;</span>
<span class="synConstant">&lt;/head&gt;</span>
<span class="synConstant">&lt;body&gt;</span>
<span class="synConstant">    {html}</span>
<span class="synConstant">&lt;/body&gt;</span>
<span class="synConstant">&lt;/html&gt;&quot;</span>;
browser.NavigateToString(html);
}
}
</pre><p>バインディング拡張の方でやるように処理を統一。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synIdentifier">&lt;</span>WebBrowser<span class="synIdentifier"> u:WebBrowserExtension.Html=</span><span class="synConstant">&quot;{Binding ViewModel.SelectedResult.Text}&quot;</span><span class="synIdentifier"> /&gt;</span>
</pre>
</div>
<div class="section">
<h3>更新ログウィンドウの追加</h3>
<p>更新を検知したら ObservableCollection にログを追加してウィンドウに表示……っていうのをやってたのだけど、NotSupportedException が出て死んだ。異なるスレッドから書き込んだらダメみたい。</p><p>結局こっちの解決 AsyncObservableCollection を拝借した。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fwww.thomaslevesque.com%2F2009%2F04%2F17%2Fwpf-binding-to-an-asynchronous-collection%2F" title="[WPF] Binding to an asynchronous collection" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://www.thomaslevesque.com/2009/04/17/wpf-binding-to-an-asynchronous-collection/">www.thomaslevesque.com</a></cite></p><p>要するに、コンストラクターでディスパッチャーを保存しておいて、コレクション操作でエラーが出たら保存しておいたディスパッチャーにお願いする感じみたい。便利だなー（小並感</p>

</div>
<div class="section">
<h3>今後の予定</h3>

<ul>
<li>Diff 周りが混乱していて、何と何を比較しているのかわかんないから UI を見直す</li>
<li>よくわかんなくなってきたので、コードの整理する</li>
<li>スタートアップ登録・解除機能</li>
<li>5,000円ぐらいでアイコン作ってもらおうかな？</li>
<li>Desktop Bridge に挑戦するときがきた！！</li>
</ul><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170919195536.png" alt="f:id:daruyanagi:20170919195536p:plain" title="f:id:daruyanagi:20170919195536p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Desktop Bridge を利用した WPF → UWP の移植は理想的にはこうなるらしいけど、やってるアプリ見たことないので、ちょっと挑戦してみようと思う。cmd とのやり取りは排除できないけど、それ以外の要素は UWP にできんことはない気がする。まぁ、早くても来年やね。</p>

</div>