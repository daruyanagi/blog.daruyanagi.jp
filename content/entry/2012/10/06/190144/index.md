---
date: 2012-10-06T19:01:44.0000000
draft: false
title: "よい子はマネしちゃいけないデモを真似してみた"
tags: ["ASP.net Web Pages"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2012/10/04/221735">Developer Camp 2012 Japan Fall &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x307E;&#x3057;&#x305F;&#xFF01;&#xFF08;1&#x65E5;&#x76EE;&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でやってたデモを真似してみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Default.cshtml

@<span class="synStatement">using</span> System.IO
@<span class="synStatement">using</span> System.Diagnostics

@{
<span class="synComment">// 結果を出力するファイルのパスを決める</span>
var path = HttpContext.Current.Server.MapPath(<span class="synConstant">&quot;~/result.txt&quot;</span>);

<span class="synComment">// dir c:\ &gt; result.txt を実行（ /c は実行して終了するオプション）</span>
Process.Start(<span class="synConstant">&quot;cmd&quot;</span>, <span class="synSpecial">@</span><span class="synConstant">&quot;/c dir c:\ &gt; &quot;</span> + path).WaitForExit();

<span class="synComment">// result.txt　を読み込む</span>
var result = File.ReadAllText(path);
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;ja&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;utf-8&quot;</span> /&gt;
&lt;title&gt;マイ サイトのタイトル&lt;/title&gt;
&lt;link href=<span class="synConstant">&quot;~/favicon.ico&quot;</span> rel=<span class="synConstant">&quot;shortcut icon&quot;</span> type=<span class="synConstant">&quot;image/x-icon&quot;</span> /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;pre&gt;&lt;code style=<span class="synConstant">&quot;font-family: Consolas, monospace;&quot;</span>&gt;
@result
&lt;/code&gt;&lt;/pre&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121006184303.png" alt="f:id:daruyanagi:20121006184303p:plain" title="f:id:daruyanagi:20121006184303p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>わぉ！　サーバーの C ドライブ直下の内容がみえてる！　これをああしたりこうしたりすれば ruby が動いちゃったりするのか（ゲフンゲフン</p><p>でも、よい子は真似しないように。実際のデモでは WaitForExit() をし忘れて result.txt が読めなくなるなんてハプニングがあったけど、こういうことをやり続ければいずれサーバーが不安定になるよね（知らんけど）。少なくとも、Free/Share ではあんまりやらないほうがいいんだろう。Reserved が使えるお金持ちだけやれ。</p><p>ちなみに、帝国兵のひとは App_Code フォルダが好きだということでそこにクラスを書いていたけれど、今回はそのままだと面白くないかなと思ったので Default.cshtml に書いてある。わしも App_Code フォルダ大好き。結構いろんなところで使えて便利なんだよね。</p>

<ul>
<li><a href="https://blog.daruyanagi.jp/entry/2012/09/27/213159">SignalR + WebMatrix &#x3067;&#x30B5;&#x30FC;&#x30D0;&#x30FC;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x306E;&#x76E3;&#x8996;&#x3092;&#x884C;&#x3063;&#x3066;&#x307F;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/31/031730">SignalR Deep Dive ! &#x306B;&#x53C2;&#x52A0;&#x3057;&#x3066;&#x304D;&#x305F;&#xFF0B;WebMatrix &#x3067; SignalR &#x52D5;&#x304B;&#x3057;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/30/040609">&#x5BC4;&#x308A;&#x9053;&#xFF1A; Rails &#x306E; Flash &#x3063;&#x307D;&#x3044;&#x6A5F;&#x80FD;&#x3092; WebMatrix &#x3067;&#x4F7F;&#x3044;&#x305F;&#x3044;&#xFF08;2&#xFF09; &#x2015;&#x2015; @helper &#x3068; @functions &#x3068;&#x308F;&#x305F;&#x3057; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
<li><a href="https://blog.daruyanagi.jp/entry/2012/08/16/182105">App_Code &#x3067;&#x30B5;&#x30D6;&#x30D5;&#x30A9;&#x30EB;&#x30C0;&#x30FC;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a></li>
</ul><p>使いこなしていきたいところ。</p>

<div class="section">
<h3>ついでに（1） ―― ローカルで実行した場合</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121006184549.png" alt="f:id:daruyanagi:20121006184549p:plain" title="f:id:daruyanagi:20121006184549p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>dir c:\ > result.txt の時点でコケるみたい。きっと権限の問題なんだろうな。</p>

</div>
<div class="section">
<h3>ついでに（2） ―― ファイル、読んでみたくなるよね？</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121006184938.png" alt="f:id:daruyanagi:20121006184938p:plain" title="f:id:daruyanagi:20121006184938p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>試しに C:\eula.1028.txt を読んでみようと思ったけど失敗した。まぁ、そうだろうな。</p>

</div>