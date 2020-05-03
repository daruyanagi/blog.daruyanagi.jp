---
date: 2018-09-24T19:13:21.0000000
draft: false
title: "Amaguri をストアに申請しました（Desktop Bridge で2点躓きました……"
tags: ["Amaguri", "UWP"]
eyecatch: 
---
<p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2018%2F08%2F26%2F224927" title="「Amaguri」v1.0.0.0 - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://blog.daruyanagi.jp/entry/2018/08/26/224927">blog.daruyanagi.jp</a></cite></p><p>WPF アプリをストアに申請したのは2作目ですが、また新しく躓きました！</p>

<div class="section">
<h3>ターゲット フレームワーク '.NETCore,Version=v5.0' の mscorlib を解決できませんでした</h3>
<p>Windows Application Package プロジェクトに Amaguri.WPF の参照を追加するとコケました。</p><p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">プロジェクト システムでエラーが発生しました。<br><br>ターゲット フレームワーク &#39;.NETCore,Version=v5.0&#39; の mscorlib を解決できませんでした。これは、ターゲット フレームワークがインストールされていない場合、またはフレームワーク モニカーの形式が正しくない場合に発生する可能性があります。 <a href="https://t.co/gvVyEI3GxP">pic.twitter.com/gvVyEI3GxP</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1044134050263314432?ref_src=twsrc%5Etfw">September 24, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </p><p>最初、このエラーをみてもサッパリ意味が分からなかったのですが、そのままパッケージのビルドを進めてみると――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180924190106.png" alt="f:id:daruyanagi:20180924190106p:plain" title="f:id:daruyanagi:20180924190106p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんだ、そういうことか！　Desktop Bridge を利用するには .NET Framework 4.6.1 が必要なのだそうです。Amaguri はなぜか .NET Framework 4.5 で開発されていたので、フレームワークをアップデートして解決しました。</p>

</div>
<div class="section">
<h3>"プロセス起動" に関連した System.Diagnostics.Process.Start への参照があります</h3>
<p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">んー？　無視していいのかなぁ…… System.Diagnostics.Process.Start() が S mode でダメかもって怒られら <a href="https://t.co/RUBZha1fH5">pic.twitter.com/RUBZha1fH5</a></p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1044136465062477824?ref_src=twsrc%5Etfw">September 24, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </p><p>Desktop Bridge アプリは System.Diagnostics.Process.Start() で外部アプリを起動することができないらしい。ハイパーリンクをクリックしたらウチのサイトにジャンプするというだけの処理なのだけど……うーん。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">void</span> Hyperlink_Click(<span class="synType">object</span> sender, RoutedEventArgs e)
{
System.Diagnostics.Process.Start(<span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>);
}
</pre><p>最初はこの処理を削るしかないのかなと思っていたのですが、DesktopBridge.Helpers という NuGet を導入して「UWP で実行されている時だけ System.Diagnostics.Process.Start()  を実行しない」という処理を加えてみると、認定キットに合格することができました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">void</span> Hyperlink_Click(<span class="synType">object</span> sender, RoutedEventArgs e)
{
<span class="synStatement">if</span> (!IsRunningAsUwp())
{
System.Diagnostics.Process.Start(<span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>);
}
}

<span class="synType">public</span> <span class="synType">bool</span> IsRunningAsUwp()
{
DesktopBridge.Helpers helpers = <span class="synStatement">new</span> DesktopBridge.Helpers();
<span class="synStatement">return</span> helpers.IsRunningAsUwp();
}
</pre><p>IsRunningAsUwp() は公式サイトにあるサンプルコードそのままです。ソースコードをのぞいてみたのですが、GetCurrentPackageFullName() という API を呼んでみてエラーが出るかどうかで判別してるようですね。なるほでぃうす。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fqmatteoq%2FDesktopBridgeHelpers" title="qmatteoq/DesktopBridgeHelpers" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/qmatteoq/DesktopBridgeHelpers">github.com</a></cite></p><p>さてはて、S Mode でテストしてないので「クリップボードの画像をデスクトップに保存する」機能あたりでクラッシュしそうな気もするのですが、そのままストアに通ってくれるとありがたいなぁ。</p>

</div>