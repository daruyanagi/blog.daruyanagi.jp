---
date: 2015-07-05T22:06:34.0000000
draft: false
title: "「Visual Studio Community」で ASP.NET Web Pages をはじめる"
tags: ["ASP.NET Web Pages"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705212532.png" alt="f:id:daruyanagi:20150705212532p:plain" title="f:id:daruyanagi:20150705212532p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>みんなも大好きな「WebMatrix」ですが、そろそろ本格的に“なかったこと”になっているような気がしてならない今日この頃。代わりとなるのはおそらく「Visual Studio Code」なのでしょうが、まだちょっとベータ版なので、今回は定評のありまくる「Visual Studio Community」で ASP.NET Web Pages をはじめる方法を調べてみました。「WebMatrix」で“空のサイト”に相当するものを作るのが今回の目標です。</p>

<div class="section">
<h3>とりあえずプロジェクトを作成する</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705213348.png" alt="f:id:daruyanagi:20150705213348p:plain" title="f:id:daruyanagi:20150705213348p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まずはプロジェクトを作成する必要があります。プロジェクトの新規作成ダイアログで［Templates］－［Visual C#］－［Web］－［Visual Studio 2012］とツリーを辿り、「ASP.NET Empty Web Application」を選択します。Visual Basic じゃないと死んでしまう病に冒されている人は、［Visual C#］の代わりに［Visual Basic］を選択するとよいでしょう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705213553.png" alt="f:id:daruyanagi:20150705213553p:plain" title="f:id:daruyanagi:20150705213553p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちなみに、［Templates］－［Visual C#］－［Web］にある「ASP.NET Web Application」テンプレートを使っても構いません。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705213747.png" alt="f:id:daruyanagi:20150705213747p:plain" title="f:id:daruyanagi:20150705213747p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このテンプレートを選択すると、プロジェクトの種類なんかを選べるダイアログが現れるので、ここで「Empty」を選択すればさっきと同じ結果になると思います（厳密にくらべたわけじゃないから知らんけど）。このダイアログからプロジェクトを作ると Azure Web Sites も同時に作れるので、必要な場合はこっちを選ぶと手間が省けるかも。</p>

</div>
<div class="section">
<h3>ページの追加</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705214139.png" alt="f:id:daruyanagi:20150705214139p:plain" title="f:id:daruyanagi:20150705214139p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロジェクトを作成したら、ページの追加。コンテストメニューを開いて［Add］－［MVC 5 View Page (Razor)］を選択します。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705214317.png" alt="f:id:daruyanagi:20150705214317p:plain" title="f:id:daruyanagi:20150705214317p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あとは名前を付けると、cshtml ファイルが生成されます。ASP.NET（Web Pages）の流儀にしたがって、最初のファイルの名前は Default.cshtml にしておきましょうか。中身はこんな感じです。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Layout = <span class="synConstant">null</span>;
}

&lt;!DOCTYPE html&gt;

&lt;html&gt;
&lt;head&gt;
&lt;meta name=<span class="synConstant">&quot;viewport&quot;</span> content=<span class="synConstant">&quot;width=device-width&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;

&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>body が空っぽなので、ついでにこんな感じでサンプルコードを加えておきます。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
Layout = <span class="synConstant">null</span>;
var message = <span class="synConstant">&quot;Hello! World&quot;</span>; <span class="synComment">// 追加</span>
}

&lt;!DOCTYPE html&gt;

&lt;html&gt;
&lt;head&gt;
&lt;meta name=<span class="synConstant">&quot;viewport&quot;</span> content=<span class="synConstant">&quot;width=device-width&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;
@message &lt;!-- 追加 --&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p>これで［F5］キーを押せば、"Hello! World" と書かれたサイトが立ち上がるはず――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705214739.png" alt="f:id:daruyanagi:20150705214739p:plain" title="f:id:daruyanagi:20150705214739p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>――だったのですが、ダメでした。<a href="http://go.microsoft.com/fwlink/?LinkId=254126">http://go.microsoft.com/fwlink/?LinkId=254126</a> を読めと言われるのでそれに目を通してみますと、Web.config で利用する ASP.NET Web Pages のバージョンを指定しろと書いてあります。仕方ないので、言われたとおりにキーを追加。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synComment">&lt;!--</span>
<span class="synComment">  For more information on how to configure your ASP.NET application, please visit</span>
<span class="synComment">  http://go.microsoft.com/fwlink/?LinkId=169433</span>
<span class="synComment">  --&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.5&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;httpRuntime </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.5&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>

<span class="synIdentifier">&lt;appSettings&gt;</span> <span class="synComment">&lt;!-- このセクションを追加 --&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;webPages:Version&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;2.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20150705215117.png" alt="f:id:daruyanagi:20150705215117p:plain" title="f:id:daruyanagi:20150705215117p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>すると、サイトが立ち上がりました！　めでたしめでたし！　あとは SQL CE データベースを読み書きできるようにしたり、その中身を見るためのよさげなツールを探したり（クッソめんどくせー！）、追加の NuGet パッケージを入れたりするだけですね。これで WebMatrix を窓からポイできます。スターターサイトなんかは、Yeoman かなにかで準備する感じになるのかなぁ……ちょっとずつ新しい流儀に慣れていかないとね。</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p>ASP.NET Web Pages は .NET 言語で PHP っぽく Web ページのロジックを記述できるフレームワークです。PHP よりも安全に作られているので、お仕事で使わなければならないかわいそうな人でもなければ、こっちの方がお勧めデス。</p><p>書き方は @shibayan のサイトでも参考にしてください。PHP の記法と比べながら簡単に解説してくれています。</p><p><iframe src="http://blog.shibayan.jp/embed/20110714/1310652120" title="PHP と比較して覚える ASP.NET Web Pages (1) - しばやん雑記" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"><a href="http://blog.shibayan.jp/entry/20110714/1310652120">PHP と比較して覚える ASP.NET Web Pages (1) - しばやん雑記</a></iframe></p><p>「（1）」って書いてあるのに続編がないのは気にしないでおきましょう。あとは</p><p><iframe src="//hatenablog-parts.com/embed?url=http%3A%2F%2Fwebmatrix.g.hatena.ne.jp%2Fcx20%2F20110228%2F1298841518" title="ASP.NET Razor 記法 基礎文法最速マスター - CX&#39;s WebMatrix Diary" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"><a href="http://webmatrix.g.hatena.ne.jp/cx20/20110228/1298841518">ASP.NET Razor 記法 基礎文法最速マスター - CX&#39;s WebMatrix Diary</a></iframe></p><p>なんかが詳しいかもしれません。</p>

</div>