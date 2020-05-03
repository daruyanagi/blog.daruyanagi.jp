---
date: 2013-04-07T14:40:08.0000000
draft: false
title: "WebMatrix でプログラミング生放送してみた #pronama"
tags: ["SignalR", "WebMatrix", "勉強会"]
eyecatch: 
---
<p><iframe src="http://www.slideshare.net/slideshow/embed_code/18071351" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="http://www.slideshare.net/daruyanagi/web-matrix-18071351" title="Web matrix でプログラミング生放送してみた" target="_blank">Web matrix でプログラミング生放送してみた</a> </strong> from <strong><a href="http://www.slideshare.net/daruyanagi" target="_blank">Hidetoshi Yanagi</a></strong> </div></p><p><a href="https://blog.daruyanagi.jp/entry/2013/04/03/072017">&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DF;&#x30F3;&#x30B0;&#x751F;&#x653E;&#x9001;&#x52C9;&#x5F37;&#x4F1A; &#x7B2C;22&#x56DE;&#xFF20;&#x677E;&#x5C71;&#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x307E;&#x3057;&#x305F; #pronama - &#x3060;&#x308B;&#x308D;&#x3050;</a> でやった LT の補足です。</p>

<div class="section">
<h3>何をしていたか</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130407140632.jpg" alt="f:id:daruyanagi:20130407140632j:plain" title="f:id:daruyanagi:20130407140632j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>もう少し絵がうまかったらよかったのだけど。</p>

<ul>
<li>WebMatrix 拡張機能で WebMatrix のエディター画面の情報を取得</li>
<li>WebMatrix 拡張機能（SignalR .NET Client）で Windows Azure 上の SignalR サーバー（Hub）へテキストを送信</li>
<li>SignalR Hub が Web ページ（SignalR JavaScript Client を仕込んである）へ接続中のブラウザーへ向けてテキストを一斉送信</li>
</ul><p>これで「手元の WebMatrix で書いたコードを一斉配信する」システムができた。なお、Windows Azure  上の SignalR Hub も WebMatrix で記述しているので、「ピュア WebMatrix 製」ってことやね！</p>

<ul>
<li>WebMatrix の拡張機能って自分でも作れるんだよ</li>
<li>SignalR は WebMatrix でも使えます！</li>
<li>.NET でも JavaScript でも OK！</li>
</ul><p>ってことが伝わればうれしかったのだけど、なかなかそこまでうまくいかなかった。</p>

</div>
<div class="section">
<h3>WebMatrix で SignalR を使う</h3>
<p>この辺りを参考にしてください。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/12/093613">WebMatrix 2: SignalR &#x3092;&#x52D5;&#x304B;&#x3059; &#xFF08; 1.0.1 &#x5BFE;&#x5FDC;&#x7248;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2013/03/13/065552">WebMatrix 2: SignalR &#x3092;&#x52D5;&#x304B;&#x3059; &#xFF08; 1.0.1 &#x5BFE;&#x5FDC;&#x7248;&#xFF09; &#x203B;&#x540C;&#x6642;&#x63A5;&#x7D9A;&#x8005;&#x6570;&#x306E;&#x8FFD;&#x52A0; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>サーバーのソースコードは、<a href="http://codecast.codeplex.com/">CodePlex Archive</a> に置いてあります。</p>

</div>
<div class="section">
<h3>WebMatrix 拡張機能を作成する</h3>
<p>だいぶ前に書きました。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/10/12/223708">WebMatrix&#x306E;&#x62E1;&#x5F35;&#x6A5F;&#x80FD;&#x3092;&#x4F5C;&#x308B;&#x305C;&#x30FC; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>ただ、ちょっと古くなっているかもしれない。</p>

<div class="section">
<h4>Visual Studio 2012 Professional</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130407142451.png" alt="f:id:daruyanagi:20130407142451p:plain" title="f:id:daruyanagi:20130407142451p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Visual Studio 2012 Professional向けに、開発テンプレートが Visual Studio 拡張機能として用意されているようです。</p>

<ul>
<li><a href="http://visualstudiogallery.msdn.microsoft.com/f40607ae-66ba-4982-a4e5-5ea969ea43e1">WebMatrix ExtensionTemplate - Visual Studio Marketplace</a></li>
</ul><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130407143053.png" alt="f:id:daruyanagi:20130407143053p:plain" title="f:id:daruyanagi:20130407143053p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとはビルドイベントで WebMatrix を起動するように設定すれば OK。</p>

</div>
<div class="section">
<h4>Visual Studio 2012 Express for Desktop</h4>
<p>また、多少手間はかかりますが、無償の Express エディションでも開発は可能です。</p>

<ul>
<li><a href="http://extensions.webmatrix.com/documentation_2">http://extensions.webmatrix.com/documentation_2</a></li>
</ul><p>上記のサイトから WebMatrix Extension Kit（ZIP形式）をダウンロードして、（ドキュメント）\Visual Studio 2012\Templates\ProjectTemplates\Visual C# へコピーします。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121012222849.png" alt="f:id:daruyanagi:20121012222849p:plain" title="f:id:daruyanagi:20121012222849p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、［テンプレート］‐［Visual C#］に「WebMatrix Extension」というテンプレートが現れるので新規プロジェクトを作成。</p><p>さらに、Express エディションではビルドイベントの機能が使えないようなので、デバッグ実行するためのコンソールアプリケーションを作成。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130407142440.png" alt="f:id:daruyanagi:20130407142440p:plain" title="f:id:daruyanagi:20130407142440p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Collections.Generic;
<span class="synStatement">using</span> System.Linq;
<span class="synStatement">using</span> System.Text;
<span class="synStatement">using</span> System.Diagnostics;

<span class="synType">namespace</span> ConsoleApplication1
{
<span class="synType">class</span> Program
{
<span class="synType">static</span> <span class="synType">void</span> Main(<span class="synType">string</span>[] args)
{
Process webMatrix = <span class="synStatement">new</span> Process();

webMatrix.StartInfo.FileName = <span class="synSpecial">@</span><span class="synConstant">&quot;C:\Program Files (x86)\Microsoft WebMatrix\WebMatrix.exe&quot;</span>;
webMatrix.Start();
webMatrix.WaitForExit();
}
}
}
</pre><p>あとは拡張機能のソリューションをリビルド → コンソールアプリを実行 という感じで開発を進めていけるはず。</p>

</div>
<div class="section">
<h4>WebMatrix 拡張機能のソースコード</h4>
<p>さすがに恥ずかしくて公開できないレベル……調査不足で、リボンボタンを押したときしかコードを送出できない。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">void</span> HandleBloadcastButtonInvoke(<span class="synType">object</span> obj)
{
<span class="synStatement">if</span> (!ConnectionAvailable) <span class="synStatement">return</span>;

<span class="synStatement">try</span>
{
var workspace = _webMatrixHost.Workspace <span class="synStatement">as</span> IEditorWorkspace;
<span class="synStatement">if</span> (workspace == <span class="synConstant">null</span>) <span class="synStatement">return</span>;

var selection = workspace
.CurrentEditor
.ServiceProvider
.GetService(<span class="synStatement">typeof</span>(IEditorSelection)) <span class="synStatement">as</span> IEditorSelection;

Send(selection.Text);
}
<span class="synStatement">catch</span> (Exception exception)
{
Send(<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}: {1}&quot;</span>, exception, exception.Message));
}
}

<span class="synType">public</span> <span class="synType">void</span> Send(<span class="synType">string</span> message)
{
proxy.Invoke(<span class="synConstant">&quot;Send&quot;</span>, message).ContinueWith(_ =&gt;
{
<span class="synStatement">if</span> (_.IsFaulted)
{
_webMatrixHost.ShowNotification(message);
}
<span class="synStatement">else</span>
{
<span class="synComment">// _webMatrixHost.ShowNotification(message);</span>
}
});
}
</pre><p>テキストの入力が取れなくても、たとえば、</p>

<ul>
<li>ファイルを保存したとき（File Watcher を利用）</li>
<li>ショートカットキー</li>
</ul><p>なんかはとれるはずなので、もう少し何とかしてから公開したいですね。あと、簡単な認証機能。</p>

</div>
</div>