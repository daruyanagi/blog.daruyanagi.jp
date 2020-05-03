---
date: 2012-08-17T03:46:31.0000000
draft: false
title: "Highlight.js を NuGet パッケージにしてみました"
tags: ["NuGet", "WebMatrix", "Visual Studio", "ASP.net Web Pages"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2012/08/16/155714">WebMatrix &#x3067; Markdown &#x3092;&#x5C11;&#x3057;&#x3060;&#x3051;&#x62E1;&#x5F35;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> と <a href="https://blog.daruyanagi.jp/entry/2012/08/16/182105">App_Code &#x3067;&#x30B5;&#x30D6;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で扱った Highlight.js を NuGet パッケージにしてみました。</p><p>最初は Highlight.js の NuGet パッケージは存在しないと思い込んでいたのですが、ただ検索のやり方が悪かったようで、「Highlight」というパッケージがあったり、似たような機能を実現できそうな「ColorCode」というパッケージもみつけたのですが、見なかったふりをします。 nuget.org はまだちょっと検索機能がイケてないような気がしますね（責任転嫁）。</p>

<div class="section">
<h3>準備</h3>

<div class="section">
<h4>nuget.org のアカウントを作成</h4>
<p><a href="http://nuget.org">NuGet Gallery | Home</a> でアカウントを作成してください。だいぶ前にやったのでやり方は忘れましたが、難しくはないはずです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817024658.png" alt="f:id:daruyanagi:20120817024658p:plain" title="f:id:daruyanagi:20120817024658p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>アカウントページで API キーが取得できるので、それをローカル環境に登録します。</p>
<pre class="code" data-lang="" data-unlink>nuget.exe setApiKey ********-****-****-****-************
nuget.exe push MyPackage.1.0.nupkg</pre><p>NuGet.exe を入手（<a href="http://nuget.codeplex.com/releases">http://nuget.codeplex.com/releases</a> NuGet.exe Command Line）して、1行目を実行すればOKです<a href="#f-f45a0f4e" name="fn-f45a0f4e" title="初回起動時に実行ファイルのアップデートが行われます">*1</a>。</p>

</div>
<div class="section">
<h4>パッケージに含めるファイルを用意</h4>
<p>今回パッケージに含めるファイルは以下のとおりです。</p>
<pre class="code" data-lang="" data-unlink>Highlight.js/

Highlight.js.nuspec &lt;-- あとで作りましょう！

content/
（ ~/ 以下に展開されます）
App_Code/
Highlight/
Highlight.cs
Lisence Files
Content/
Highlight/
Theme Skins
Scripts/
Highlight/
hilight.pack.js
web.config.transform &lt;-- あとで説明します！

tools/
（セットアップなどに利用するスクリプトなどを含めます）

lib/
（必要な参照アセンブリを格納しておきます）</pre><p>今回は tools と lib が空ですけど、それなりに大規模なパッケージを作るときは必要になるのだと思います。ほかにも .NET やら Silverlight やら、ターゲットによってフォルダー構成を変えなきゃダメみたいだけれど、今回はまぁ、いいかな。その代わり、 NuSpec （後述）のタグに「asp.net」と対象ターゲットを書いておくことにします。</p><p>web.config.transform の内容はこんな感じです。 App_Code のサブフォルダーに格納した Highlight.cs のコンパイルを有効にするための設定が記述されています。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;false&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">directoryName</span>=<span class="synConstant">&quot;Highlight&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>.transform という拡張子をつけて content フォルダーに置いておくだけで、勝手にインストール先の Web アプリの web.config とマージしてくれるみたいですね。あらまー、簡単！</p>

<ul>
<li><a href="http://haacked.com/archive/2010/11/19/nuget-transformation.aspx">NuGet Package Transformations | You&rsquo;ve Been Haacked</a></li>
</ul>
</div>
</div>
<div class="section">
<h3>NuGet パッケージ（NuPack）の作成</h3>
<p>では、 NuGet のパッケージを作成します。手順は NuSpec ファイルに名前やバージョンなどのメタデータを記述して、 NuPack へ Pack（パッケージング）し、 nuget.org へ push （公開）するといった感じ。</p>

<div class="section">
<h4>NuSpec の作成</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817031210.png" alt="f:id:daruyanagi:20120817031210p:plain" title="f:id:daruyanagi:20120817031210p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code" data-lang="" data-unlink>nuget.exe spec</pre><p>で雛形を出力します。内容はこんな感じになっているので、てけとーに編集します。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;package &gt;</span>
<span class="synIdentifier">&lt;metadata&gt;</span>
<span class="synIdentifier">&lt;id&gt;</span>Package<span class="synIdentifier">&lt;/id&gt;</span>
<span class="synIdentifier">&lt;version&gt;</span>1.0.0<span class="synIdentifier">&lt;/version&gt;</span>
<span class="synIdentifier">&lt;authors&gt;</span>Hidetoshi Yanagi<span class="synIdentifier">&lt;/authors&gt;</span>
<span class="synIdentifier">&lt;owners&gt;</span>Hidetoshi Yanagi<span class="synIdentifier">&lt;/owners&gt;</span>
<span class="synIdentifier">&lt;licenseUrl&gt;</span>http://LICENSE_URL_HERE_OR_DELETE_THIS_LINE<span class="synIdentifier">&lt;/licenseUrl&gt;</span>
<span class="synIdentifier">&lt;projectUrl&gt;</span>http://PROJECT_URL_HERE_OR_DELETE_THIS_LINE<span class="synIdentifier">&lt;/projectUrl&gt;</span>
<span class="synIdentifier">&lt;iconUrl&gt;</span>http://ICON_URL_HERE_OR_DELETE_THIS_LINE<span class="synIdentifier">&lt;/iconUrl&gt;</span>
<span class="synIdentifier">&lt;requireLicenseAcceptance&gt;</span>false<span class="synIdentifier">&lt;/requireLicenseAcceptance&gt;</span>
<span class="synIdentifier">&lt;description&gt;</span>Package description<span class="synIdentifier">&lt;/description&gt;</span>
<span class="synIdentifier">&lt;releaseNotes&gt;</span>Summary of changes made in this release of the package.<span class="synIdentifier">&lt;/releaseNotes&gt;</span>
<span class="synIdentifier">&lt;copyright&gt;</span>Copyright 2012<span class="synIdentifier">&lt;/copyright&gt;</span>
<span class="synIdentifier">&lt;tags&gt;</span>Tag1 Tag2<span class="synIdentifier">&lt;/tags&gt;</span>
<span class="synIdentifier">&lt;dependencies&gt;</span>
<span class="synIdentifier">&lt;dependency </span><span class="synType">id</span>=<span class="synConstant">&quot;SampleDependency&quot;</span><span class="synIdentifier"> </span><span class="synType">version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/dependencies&gt;</span>
<span class="synIdentifier">&lt;/metadata&gt;</span>
<span class="synIdentifier">&lt;/package&gt;</span>
</pre><p>自分の場合はこんな感じになりました（v1.0.4 の場合）。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;package &gt;</span>
<span class="synIdentifier">&lt;metadata&gt;</span>
<span class="synIdentifier">&lt;id&gt;</span>Highlight.js<span class="synIdentifier">&lt;/id&gt;</span>
<span class="synIdentifier">&lt;version&gt;</span>1.0.4<span class="synIdentifier">&lt;/version&gt;</span>
<span class="synIdentifier">&lt;authors&gt;</span>Ivan Sagalaev<span class="synIdentifier">&lt;/authors&gt;</span>
<span class="synIdentifier">&lt;owners&gt;</span>daruyanagi<span class="synIdentifier">&lt;/owners&gt;</span>
<span class="synIdentifier">&lt;projectUrl&gt;</span>http://softwaremaniacs.org/soft/highlight/en/<span class="synIdentifier">&lt;/projectUrl&gt;</span>
<span class="synIdentifier">&lt;requireLicenseAcceptance&gt;</span>false<span class="synIdentifier">&lt;/requireLicenseAcceptance&gt;</span>
<span class="synIdentifier">&lt;description&gt;</span>Syntax Highlighter written by JavaScript and CSS (and C# Helper)<span class="synIdentifier">&lt;/description&gt;</span>
<span class="synIdentifier">&lt;releaseNotes&gt;</span>Package for v7.1 release.<span class="synIdentifier">&lt;/releaseNotes&gt;</span>
<span class="synIdentifier">&lt;copyright&gt;</span>Copyright 2012 Hidetoshi Yanagi (@daruyanagi)<span class="synIdentifier">&lt;/copyright&gt;</span>
<span class="synIdentifier">&lt;tags&gt;</span>webmatrix javascript css syntax asp.net .net40<span class="synIdentifier">&lt;/tags&gt;</span>
<span class="synIdentifier">&lt;/metadata&gt;</span>
<span class="synIdentifier">&lt;/package&gt;</span>
</pre>
</div>
<div class="section">
<h4>NuPack の作成</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817031339.png" alt="f:id:daruyanagi:20120817031339p:plain" title="f:id:daruyanagi:20120817031339p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>コマンドを実行して、 NuPack を作成します。</p>
<pre class="code" data-lang="" data-unlink>nuget.exe pack Highlight.js.nuspec</pre><p>すると、 nuget.exe のフォルダーに（パッケージ名）.（バージョン）.nupaack（今回なら Highlight.js.1.0.4.nupack）が作成されます。解凍ソフトでバラして中身を確認してみると面白いかも。</p>

</div>
<div class="section">
<h4>NuPack の公開</h4>
<p>コマンドを実行して、 NuPack を公開します。</p>
<pre class="code" data-lang="" data-unlink>nuget.exe push Highlight.js.1.0.4.nupack</pre><p>これで、 nuget.org にパッケージが公開されるはず。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817031425.png" alt="f:id:daruyanagi:20120817031425p:plain" title="f:id:daruyanagi:20120817031425p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://nuget.org/packages/Highlight.js">https://nuget.org/packages/Highlight.js</a></p><p>もしよかったら使ってみてくださいね！</p>

</div>
</div>
<div class="section">
<h3>パッケージのテスト</h3>
<p>アップロードしたパッケージは、パッケージマネージャーでインストール・アンインストールしてちゃんと動くか確かめましょう<a href="#f-a0ca43e7" name="fn-a0ca43e7" title="ごめんなさい、今までめんどくさくてだいたい動いていればOKかなって思ってました！">*2</a>。あと、「WebMatrix 2」で動くからといって「Visual Studio」でもそのまま動くかというとそうでもないみたいです。今回躓いたところを何点か補足しておきます。</p>

<div class="section">
<h4>パッケージが見つからない……</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817032039.png" alt="f:id:daruyanagi:20120817032039p:plain" title="f:id:daruyanagi:20120817032039p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>アップロードしたばかりのパッケージは「WebMatrix 2」の検索で引っかかりにくいです。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817032125.png" alt="f:id:daruyanagi:20120817032125p:plain" title="f:id:daruyanagi:20120817032125p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>そんなときは、フルネームでの検索を試みたり、パッケージのソースを変えてみるといいかもしれません。「Visual Studio」で利用する場合もそうですが、既定の検索結果が「ダウンロード数」順になっているみたいで、新参者はなかなか見つけにくい。「Visual Studio」の場合は、 CUI でインストールしてしまうのが手っ取り早いかもしれませんね。「WebMatrix 2」でも簡単に CUI で NuGet パッケージをインストールできるといいのですけど。</p>

</div>
<div class="section">
<h4>.NET Framework のターゲット</h4>
<p>「WebMatrix 2」のプロジェクトを「Visual Studio 2012」で開いたのですが、そのままではヘルパー（自作の静的クラス）がうまく動きませんでした。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817032540.png" alt="f:id:daruyanagi:20120817032540p:plain" title="f:id:daruyanagi:20120817032540p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「パラメーター初期化子を使うな」だの「System.Web.HtmlString なんてないよ！」だの言われるのでちょっと変だなと思っていたのですが、どうも .NET 2.0 でコンパイルしようとしているみたい。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> </span><span class="synType">debug</span>=<span class="synConstant">&quot;false&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">directoryName</span>=<span class="synConstant">&quot;Highlight&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/codeSubDirectories&gt;</span>
<span class="synIdentifier">&lt;/compilation&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>web.config.transform を少し書き換えて、 .NET 4 を利用するようにしてみたら（targetFramework="4.0"）ちゃんと動きました。ついでに、 NuSpec のタグに「.net 40」を追加して「.NET 4 用ですよ！」とわかるようにしておくと<a href="#f-b9e55fda" name="fn-b9e55fda" title="周りのパッケージをみていると、そうしているのが多いように思います">*3</a>いいんじゃないでしょうか。</p>

</div>
</div>
<div class="section">
<h3>おわり！</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817034817.png" alt="f:id:daruyanagi:20120817034817p:plain" title="f:id:daruyanagi:20120817034817p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これまでの3つのエントリー</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/16/043012">WebMatrix &#x3067; Markdown &#x3092;&#x4F7F;&#x304A;&#x3046;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/16/155714">WebMatrix &#x3067; Markdown &#x3092;&#x5C11;&#x3057;&#x3060;&#x3051;&#x62E1;&#x5F35;&#x3057;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/16/182105">App_Code &#x3067;&#x30B5;&#x30D6;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>で使ってきたサンプルプロジェクトでも、既存の Highlight.js 関連のコードをバッサリ消して NuGet パッケージに置き換えてみました。入れたり消したり、好き放題だ！</p>

</div>
<div class="section">
<h3>おまけ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120817033216.png" alt="f:id:daruyanagi:20120817033216p:plain" title="f:id:daruyanagi:20120817033216p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「NuGet Package Explorer」ってなんだよ！　最初から知ってたらこっちを使ってたかもしれない（くっそくっそ！</p><p>なんかしらんけどプラグインでカスタマったりできるらしいゼ？ </p>

<ul>
<li><a href="http://npe.codeplex.com/wikipage?title=How%20to%20write%20a%20plugin%20for%20NuGet%20Package%20Explorer">CodePlex Archive</a></li>
</ul><p>ダウンロードは nuget.exe と同じところから。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-f45a0f4e" name="f-f45a0f4e" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">初回起動時に実行ファイルのアップデートが行われます</span></p>
<p class="footnote"><a href="#fn-a0ca43e7" name="f-a0ca43e7" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">ごめんなさい、今までめんどくさくてだいたい動いていればOKかなって思ってました！</span></p>
<p class="footnote"><a href="#fn-b9e55fda" name="f-b9e55fda" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">周りのパッケージをみていると、そうしているのが多いように思います</span></p>
</div>