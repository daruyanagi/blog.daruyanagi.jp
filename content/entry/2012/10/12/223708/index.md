---
date: 2012-10-12T22:37:08.0000000
draft: false
title: "WebMatrixの拡張機能を作るぜー"
tags: ["WebMatrix"]
eyecatch: 
---
<p><div class="twitter-detail twitter-detail-left"><div class="twitter-detail-user"><a class="twitter-user-screen-name" href="http://twitter.com/shibayan"><img src="http://a0.twimg.com/profile_images/1643734151/1321063605936_normal.jpg" alt="shibayan" height="48" width="48"></a></div><div class="twitter-detail-tweet"><p class="twitter-detail-text">      だるさんより先に WebMatrix の拡張機能を作るか</p><p class="twitter-detail-info"><a href="http://twitter.com/shibayan/status/256648181352366081" class="twitter-detail-info-permalink"><span class="twitter-detail-info-date">2012-10-12</span> <span class="twitter-detail-info-time">15:51:09</span></a> <span class="twitter-detail-info-source">via <a href="http://www.s-software.net/" rel="nofollow">みについ</a></span></p></div></div></p><p>いや、それはそれでだいぶうれしいのだけど、「WebMatrixの拡張機能を作るぜー」をブログネタにしようと思ってたのに、書くことがなくなってしまう！</p><p>というわけで、準備編だけでも書いて唾をつけておこうかなーと思っていたのだけど。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20111028/1319729739">WebMatrix 2 &#x306E;&#x62E1;&#x5F35;&#x6A5F;&#x80FD;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B; (1) - &#x306F;&#x3058;&#x3081;&#x306B; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20111029/1319822805">WebMatrix 2 &#x306E;&#x62E1;&#x5F35;&#x6A5F;&#x80FD;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B; (2) - IExtension &#x3068; MEF - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20111031/1319986953">WebMatrix 2 &#x306E;&#x62E1;&#x5F35;&#x6A5F;&#x80FD;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B; (3) - &#x901A;&#x77E5;&#x30FB;&#x30C0;&#x30A4;&#x30A2;&#x30ED;&#x30B0; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20111123/1322053299">WebMatrix 2 &#x306E;&#x62E1;&#x5F35;&#x6A5F;&#x80FD;&#x3092;&#x4F5C;&#x6210;&#x3059;&#x308B; (4) - &#x30EA;&#x30DC;&#x30F3; UI - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>もう書いてあるやん。そういえば昔に読んだ気がするわ（爆</p>

<blockquote>
<p>次回はダッシュボードの拡張について説明したいと思います。お疲れ様でした。</p>

</blockquote>
<p>から300日以上経っているのは気にしない。</p>

<div class="section">
<h3><a href="http://extensions.webmatrix.com/">WebMatrix Gallery</a></h3>
<p><img src="20121012211650.png" alt="f:id:daruyanagi:20121012211650p:plain" title="f:id:daruyanagi:20121012211650p:plain" class="hatena-fotolife"></p><p>@shibayan の記事から変わった点と言えば、<a href="http://extensions.webmatrix.com/">WebMatrix Gallery</a> という素敵なサイトができたことぐらいかな。<a href="http://extensions.webmatrix.com/documentation">WebMatrix Gallery</a> に開発に必要なドキュメントがまとめられているので、目を通すとよいでしょう。それだけではなんなので、そのなかからいくつかつまんでみたいと思います。</p>

<div class="section">
<h4>拡張機能でできること</h4>

<blockquote cite="http://extensions.webmatrix.com/documentation_1">
<p>Available extensibility points:</p>

<ul>
<li>Look up the site's local path, URL, and application identifier</li>
<li>Look up the currently active workspace (Site, Files, Databases, or Reports)</li>
<li>Add items to the Site workspace dashboard</li>
<li>Add groups and buttons to the ribbon</li>
<li>Add a dialog box</li>
<li>Add a shortcut menu for when a user right-clicks a file in the Files workspace</li>
<li>Add status information to the notification bar</li>
<li>In the editor, get and modify selected text in the active open file</li>
<li>In the editor, get the location of the insertion point and insert text in the active open file</li>
</ul>
<cite><a href="http://extensions.webmatrix.com/documentation_1">WebMatrix Gallery</a></cite>
</blockquote>
<p>まぁ、いろいろできるみたいですな。</p>

</div>
<div class="section">
<h4>拡張機能のタイプ</h4>

<blockquote cite="http://extensions.webmatrix.com/documentation_1">

<ol>
<li><b>Task-based extensibility</b> refers to the ability of third party web applications to embed a file within the install package to customize the WebMatrix user interface for that particular application. By providing some simple XML, applications in the Web App Gallery can add custom links to the Ribbon or dashboard, protect core application files, provide enhanced Intellisense for PHP, and more.</li>
<li><b>Help extensibility</b> makes it possible to integrate custom content with WebMatrix's new, context-sensitive help pane. The new help system shows links to relevant content and videos based on where the user is in the application and what they are doing. Help content is drawn from a variety of sources; content providers can create custom feeds to cover new topics or provide more context on existing ones. This article explains how to create custom help content.</li>
<li><b>WebMatrix Extensions.</b> For developers, the real power lies in the ability to write extensions that run inside WebMatrix because they're capable of far richer customization. WebMatrix extensions can be written in any .NET language, are loaded by MEF, the Managed Extensibility Framework, and installed/uninstalled (behind the scenes) as NuGet packages (with a slight twist I'll explain in a different post). Similar to Visual Studio, WebMatrix has an extension gallery that allows users to browse and install extensions from a central feed - or create and share custom feeds!</li>
</ol>
<cite><a href="http://extensions.webmatrix.com/documentation_1">WebMatrix Gallery</a></cite>
</blockquote>
<p>拡張機能には大きく分けて、Task-based extensibility、Help extensibility、WebMatrix Extensions の 3 つ。</p>

<div class="section">
<h5>Task-based extensibility</h5>
<p><img src="20121012215402.png" alt="f:id:daruyanagi:20121012215402p:plain" title="f:id:daruyanagi:20121012215402p:plain" class="hatena-fotolife"><img src="20121012215459.png" alt="f:id:daruyanagi:20121012215459p:plain" title="f:id:daruyanagi:20121012215459p:plain" class="hatena-fotolife"></p><p>アプリケーションギャラリーからインストールするオープンソースの Web アプリケーションに固有の機能拡張。たとえば「WordPress」の場合、管理画面へアクセスするためのボタンや IntelliSense のサポートなどが含まれます。やったことはないけど、XML ファイルだけで結構簡単に実現できるみたい。</p>

</div>
<div class="section">
<h5>Help extensibility</h5>
<p><img src="20121012220959.png" alt="f:id:daruyanagi:20121012220959p:plain" title="f:id:daruyanagi:20121012220959p:plain" class="hatena-fotolife"></p><p>WebMatrix のヘルプ機能を拡充します。「WebMatrix 2」では、ファイルタイプに応じたコンテンツをヘルプペインに表示できます。</p>

</div>
<div class="section">
<h5>WebMatrix Extensions</h5>
<p>MEF（Managed Extensibility Framework）で「WebMatrix 2」を拡張できます。「WebMatrix拡張機能」と言えば、これのことだと思って問題ないと思う。</p>

</div>
</div>
</div>
<div class="section">
<h3>WebMatrix Extensions の開発</h3>
<p>「WebMatrix拡張機能」は、WebMatrix Extension Kit （<a href="http://webmatrix2.blob.core.windows.net/webmatrix2/WebMatrix2ExtensionKit.zip">http://webmatrix2.blob.core.windows.net/webmatrix2/WebMatrix2ExtensionKit.zip</a>）を利用して比較的簡単に開発できます。さっき言ったみたいに MEF ベースなので、その知識があれば少し楽になるけれど、まぁ、なくてもなんとなくわかるんじゃないかな。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/vstudio/dd460648.aspx">Managed Extensibility Framework &#x306E;&#x6982;&#x8981;</a></li>
</ul>
<div class="section">
<h4>テンプレートのインストール</h4>
<p><img src="20121012222830.png" alt="f:id:daruyanagi:20121012222830p:plain" title="f:id:daruyanagi:20121012222830p:plain" class="hatena-fotolife"></p><p>WebMatrix Extension Kit に入っている WebMatrixExtension.zip を Visual Studio 2012\Templates\ProjectTemplates\Visual C# へコピー。</p><p><img src="20121012222849.png" alt="f:id:daruyanagi:20121012222849p:plain" title="f:id:daruyanagi:20121012222849p:plain" class="hatena-fotolife"></p><p>すると、［テンプレート］‐［Visual C#］に「WebMatrix Extension」というテンプレートが現れる。</p>

</div>
<div class="section">
<h4>ビルド＆実行</h4>
<p><img src="20121012224142.png" alt="f:id:daruyanagi:20121012224142p:plain" title="f:id:daruyanagi:20121012224142p:plain" class="hatena-fotolife"></p><p>そのままビルドして「WebMatrix 2」を起動（Visual Studio 2012 Express Edition で動作確認）。ビルドイベントに登録しておくといいみたい。なんか ReadMe に書いてあったけど無視した。</p><p><img src="20121012223128.png" alt="f:id:daruyanagi:20121012223128p:plain" title="f:id:daruyanagi:20121012223128p:plain" class="hatena-fotolife"></p><p>リボンに「My Button」が追加されているのがわかる。あとはソースコード読むなり、@shibayan の記事を読むなりして頑張ってください。</p>

</div>
</div>