---
date: 2017-03-21T19:58:45.0000000
draft: false
title: "WPF ＋ PhantomJS で Web ページの内容を取得してみる"
tags: ["C#", "JavaScript"]
eyecatch: 20170321192456.png
---
<p>「AngularJS で作られた Web サイトの内容がとれないよ……」って Twitter で泣いてたら、@nakaji 先生が「PhantomJS 使えばええやろ」的なことを言っていた気がするので、ちょっと試してみました。</p>

<div class="section">
<h3>PhantomJS とは</h3>
<p>ぶっちゃけあんまりよくわかってないのですが、<i>“Google Chrome のユーザーインターフェイスがない<a href="#f-32b25991" name="fn-32b25991" title="ヘッドレスっていうらしい">*1</a>やつ”</i>だと思えばだいたい合ってるみたいです。JavaScript で動的にデータをとってくるタイプの Web サイトの DOM をわちゃわちゃしたり、スクリーンショットをとって保存したり、ユーザーインターフェイスの操作を自動化してテストしたり……みたいな感じに使えるっぽいですね。</p>

<ul>
<li><a href="http://phantomjs.org/">http://phantomjs.org/</a></li>
</ul><p>スタンドアロンのバイナリになっているので、C# からはそれを叩いて、あらかじめ用意しておいたスクリプトを処理してもらう感じになるようです。なので、任意のプロセスを叩けない UWP で使うのは難しそうですね。今回は WPF でサンプルを作りましたが、WPF 要素は皆無です。</p>

</div>
<div class="section">
<h3>使い方</h3>
<p>まず NuGet で PhantomJS をとってきます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170321192456.png" alt="f:id:daruyanagi:20170321192456p:plain" title="f:id:daruyanagi:20170321192456p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると phantomjs.exe というのがソリューションに追加されます。これはコンパイル時に出力フォルダーにコピーされます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170321193813.png" alt="f:id:daruyanagi:20170321193813p:plain" title="f:id:daruyanagi:20170321193813p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に、JavaScript を用意します。今回はソリューションフォルダーのルートに Hello.js を作成。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>console.log(<span class="synConstant">'Hello, world!'</span>);
phantom.exit();
</pre><p>最初なので、動作確認をするだけです。これも phantomjs.exe と同様、コンパイル時に出力フォルダーへコピーされるようにしておけばいいと思います。</p><p>次は、これを呼ぶための C# コードを書きます。標準出力でやり取りする感じにしてみました。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> MainWindow()
{
InitializeComponent();

Loaded += MainWindow_Loaded;
}

<span class="synType">private</span> <span class="synType">void</span> MainWindow_Loaded(<span class="synType">object</span> sender, RoutedEventArgs e)
{
var result = ProcessScript(<span class="synConstant">&quot;hello.js&quot;</span>);

System.Diagnostics.Debug.WriteLine(result);
}

<span class="synType">private</span> <span class="synType">string</span> ProcessScript(<span class="synType">string</span> script, <span class="synStatement">params</span> <span class="synType">string</span>[] args)
{
<span class="synStatement">using</span> (var process = <span class="synStatement">new</span> System.Diagnostics.Process())
{
process.StartInfo.CreateNoWindow = <span class="synConstant">true</span>;
process.StartInfo.UseShellExecute = <span class="synConstant">false</span>;
process.StartInfo.RedirectStandardOutput = <span class="synConstant">true</span>;
process.StartInfo.RedirectStandardInput = <span class="synConstant">false</span>;
process.StartInfo.FileName = <span class="synConstant">&quot;phantomjs.exe&quot;</span>;
process.StartInfo.Arguments = $<span class="synConstant">&quot;{script} {string.Join(&quot;</span> <span class="synConstant">&quot;, args)}&quot;</span>;

process.Start();
var result = process.StandardOutput.ReadToEnd();
process.WaitForExit();

System.Diagnostics.Debug.WriteLine($<span class="synConstant">&quot;ProcessScript() -&gt; Code {process.ExitCode}: {process.ExitTime - process.StartTime} has elapsed.&quot;</span>);

<span class="synStatement">return</span> result;
}
}
</pre><p>本当はパスの管理とかもう少し何とかしないとだめかもしれませんけど、まぁ、いいや。</p><p>とりあえず、実行してみましょう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170321194934.png" alt="f:id:daruyanagi:20170321194934p:plain" title="f:id:daruyanagi:20170321194934p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink>&gt; ProcessScript() -&gt; Code <span class="synConstant">0</span>: <span class="synConstant">00</span>:<span class="synConstant">00</span>:<span class="synConstant">01.7818442</span> has elapsed.
&gt; Hello, world!
</pre><p>いい感じになってる気がします。今度はちょっと複雑にしてみます。といっても、a.href の値を配列で受け取るだけです。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// MainWindow.cs</span>

<span class="synType">private</span> <span class="synType">void</span> MainWindow_Loaded(<span class="synType">object</span> sender, RoutedEventArgs e)
{
var result = ProcessScript(<span class="synConstant">&quot;hello.js&quot;</span>, <span class="synConstant">&quot;なんか URL&quot;</span>);

System.Diagnostics.Debug.WriteLine(result);
}
</pre><pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synComment">// hello.js</span>

<span class="synIdentifier">var</span> system = require(<span class="synConstant">'system'</span>);

<span class="synComment">// 引数のチェック</span>
<span class="synStatement">switch</span>(system.args.length) <span class="synIdentifier">{</span>
<span class="synStatement">case</span> 2:
<span class="synIdentifier">var</span> url = system.args<span class="synIdentifier">[</span>1<span class="synIdentifier">]</span>;
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
console.log(<span class="synConstant">'error: invalid argument'</span>);
phantom.exit(1);
<span class="synStatement">break</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">var</span> page = require(<span class="synConstant">'webpage'</span>).create();

<span class="synComment">// Web Page を開く</span>
page.open(url, <span class="synIdentifier">function</span> (<span class="synStatement">status</span>) <span class="synIdentifier">{</span>
<span class="synStatement">switch</span> (<span class="synStatement">status</span>) <span class="synIdentifier">{</span>
<span class="synStatement">case</span> <span class="synConstant">'success'</span>:
<span class="synIdentifier">var</span> links = page.evaluate(<span class="synIdentifier">function</span> () <span class="synIdentifier">{</span>
<span class="synStatement">return</span> <span class="synIdentifier">[]</span>.map.call(<span class="synStatement">document</span>.querySelectorAll(<span class="synConstant">'a'</span>), <span class="synIdentifier">function</span> (link) <span class="synIdentifier">{</span> <span class="synStatement">return</span> link.getAttribute(<span class="synConstant">'href'</span>); <span class="synIdentifier">}</span>);
<span class="synIdentifier">}</span>);
console.log(JSON.stringify(links));
phantom.exit(0);
<span class="synStatement">break</span>;
<span class="synStatement">default</span>:
console.log(<span class="synConstant">'error: page.open() '</span> + <span class="synStatement">status</span>);
phantom.exit(1);
<span class="synStatement">break</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">}</span>);
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170321195239.png" alt="f:id:daruyanagi:20170321195239p:plain" title="f:id:daruyanagi:20170321195239p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>とりあえず動いている気がします。JavaScript がよくわからないのが困ったちゃんですが、まぁ、おいおいマスターしていけばいいよね。これでいろんなことに使える気がしてきました。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-32b25991" name="f-32b25991" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ヘッドレスっていうらしい</span></p>
</div>