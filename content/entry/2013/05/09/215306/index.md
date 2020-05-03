---
date: 2013-05-09T21:53:06.0000000
draft: false
title: "Windows Store Apps： オンスクリーンキーボードの存在を考慮したレイアウト（未解決 → 解決）"
tags: ["WinRT"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130509/20130509185918.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509185918.png" alt="f:id:daruyanagi:20130509185918p:plain" title="f:id:daruyanagi:20130509185918p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/05/09/191152">Formula Pad 1.1.0 for Windows 8 - &#x3060;&#x308B;&#x308D;&#x3050;</a> は大失敗だった。オンスクリーンキーボード（ソフトウェアキーボード）を表示した状態では、肝心の数式プレビューが見えないことがある。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509211809.png" alt="f:id:daruyanagi:20130509211809p:plain" title="f:id:daruyanagi:20130509211809p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>理想としてはこうなってほしいわけだが。</p>


<div class="section">
<h3>InputPane によるオンスクリーンキーボードイベントと領域の取得</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509212322.png" alt="f:id:daruyanagi:20130509212322p:plain" title="f:id:daruyanagi:20130509212322p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>一応 <a href="http://msdn.microsoft.com/ja-JP/library/windows/apps/windows.ui.viewmanagement.inputpane(v=win.10).aspx">InputPane Class (Windows.UI.ViewManagement) - Windows UWP applications | Microsoft Docs</a> を利用すればオンスクリーンキーボードの表示・非表示は取得できるというのはわかった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var input_pane = InputPane.GetForCurrentView();

input_pane.Showing += (sender, e) =&gt;
{
Debug.WriteLine(<span class="synConstant">&quot;Showing -----&quot;</span>);
Debug.WriteLine(<span class="synConstant">&quot;Window.Current.Bounds: &quot;</span> + Window.Current.Bounds);
Debug.WriteLine(<span class="synConstant">&quot;input_pane.OccludedRect&quot;</span> + input_pane.OccludedRect);
};

input_pane.Hiding += (sender, e) =&gt;
{
Debug.WriteLine(<span class="synConstant">&quot;Hiding -----&quot;</span>);
Debug.WriteLine(<span class="synConstant">&quot;Window.Current.Bounds: &quot;</span> + Window.Current.Bounds);
Debug.WriteLine(<span class="synConstant">&quot;input_pane.OccludedRect&quot;</span> + input_pane.OccludedRect);
};
</pre>
</div>
<div class="section">
<h3>オンスクリーンキーボード表示の際のアニメーション</h3>
<p>しかし、これを利用して Page の高さを操作しても、期待通りの動作はしない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509212804.png" alt="f:id:daruyanagi:20130509212804p:plain" title="f:id:daruyanagi:20130509212804p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>初期表示。画面をスクロールして位置を補正することはできない。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509212814.png" alt="f:id:daruyanagi:20130509212814p:plain" title="f:id:daruyanagi:20130509212814p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>オンスクリーンキーボードを一度非表示にして表示。画面をスクロールして位置を補正することは可能。</p><p>オンスクリーンキーボードキーボードの出し入れで、アプリがアニメーションして上に移動するのが邪魔なのだけど、それを無効化するにはどうすればいいのだろうか。たとえば「Internet Explorer 10」などはこのアニメーションが無効化されているようなので、やり方はあるような気がするのだけど。</p>

</div>
<div class="section">
<h3>暫定の修正案</h3>
<p>とりあえず、今回は「オンスクリーンキーボードを表示したときのみスペーサーとなるグリッド列を用意する」という方法をとった。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509214522.png" alt="f:id:daruyanagi:20130509214522p:plain" title="f:id:daruyanagi:20130509214522p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>初期表示。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509214830.png" alt="f:id:daruyanagi:20130509214830p:plain" title="f:id:daruyanagi:20130509214830p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>オンスクリーンキーボードを一度非表示にして表示。</p><p>上に少しズレているが、スクロールして戻せる。これで当分は我慢することにする。</p>

</div>
<div class="section">
<h3>解決</h3>
<p>諦めきれず電子の海をさまよっていたら、浴衣の似合う漢のサイトに答え（<a href="http://mimumimu.net/blog/2012/08/22/windows-%E3%82%B9%E3%83%88%E3%82%A2%E3%82%A2%E3%83%97%E3%83%AA-%E6%97%A7-metro-%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%97%E3%83%AA-%E3%81%A7%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3/">Windows &#x30B9;&#x30C8;&#x30A2;&#x30A2;&#x30D7;&#x30EA; (&#x65E7; Metro &#x30B9;&#x30BF;&#x30A4;&#x30EB;&#x30A2;&#x30D7;&#x30EA;) &#x3067;&#x30B9;&#x30AF;&#x30EA;&#x30FC;&#x30F3;&#x30AD;&#x30FC;&#x30DC;&#x30FC;&#x30C9;&#x306E;&#x30B5;&#x30A4;&#x30BA;&#x306B;&#x3042;&#x308F;&#x305B;&#x3066;&#x753B;&#x9762;&#x3092;&#x8ABF;&#x7BC0;&#x3059;&#x308B;&#x3002; | &#x307F;&#x3080;&#x3089;&#x306E;&#x624B;&#x8A18;&#x624B;&#x5E33;</a>）が書いてあった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>input_pane.Showing += (sender, e) =&gt;
{
Debug.WriteLine(<span class="synConstant">&quot;Showing -----&quot;</span>);
Debug.WriteLine(<span class="synConstant">&quot;Window.Current.Bounds: &quot;</span> + Window.Current.Bounds);
Debug.WriteLine(<span class="synConstant">&quot;input_pane.OccludedRect&quot;</span> + input_pane.OccludedRect);

Spacer.Height = input_pane.OccludedRect.Height + <span class="synConstant">36</span>;
e.EnsuredFocusedElementInView = <span class="synConstant">true</span>;
};
</pre>
<blockquote cite="http://msdn.microsoft.com/ja-JP/library/windows/apps/windows.ui.viewmanagement.inputpanevisibilityeventargs.ensuredfocusedelementinview.aspx">
<p>このプロパティが false の場合、Windows では、入力ウィンドウがフォーカスのある要素に重ならないようにします。</p>

<cite><a href="http://msdn.microsoft.com/ja-JP/library/windows/apps/windows.ui.viewmanagement.inputpanevisibilityeventargs.ensuredfocusedelementinview.aspx">InputPaneVisibilityEventArgs Class (Windows.UI.ViewManagement) - Windows UWP applications | Microsoft Docs</a></cite>
</blockquote>
<p>つまり、true にしておけば勝手にスクロールしない。なるほど。</p>

</div>