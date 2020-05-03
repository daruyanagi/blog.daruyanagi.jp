---
date: 2012-09-10T06:21:01.0000000
draft: false
title: "CSS / Javascript の Bunlde と Minify を WebMatrix で利用する"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><img src="20120910054553.png" alt="f:id:daruyanagi:20120910054553p:plain" title="f:id:daruyanagi:20120910054553p:plain" class="hatena-fotolife"></p><p>ほんとは OAuth を早く試してみたいのだけれど……</p><p><img src="20120910054633.png" alt="f:id:daruyanagi:20120910054633p:plain" title="f:id:daruyanagi:20120910054633p:plain" class="hatena-fotolife"></p><p>残念ながらこの通りなので。NuGet Gallery にいくとこのバージョンは存在するのだけど、何がおかしいのだろうか。とりあえず報告しておいた。</p>

<div class="section">
<h3>Bunlde ＋ Minify ＝ Optimization</h3>
<p>さてはて。というわけで、最後にやってみたかった CSS / Javascript の Bunlde とMinify を試してみる。 </p><p>Minify はコードの可読性のためにもうけられたコメントや改行なんかを取っ払ってファイルサイズを小さくすること。 </p><p>Bundle はヘルパーやパーシャルビューからメインテンプレートにリソースを登録可能にする CSS / Javascript の管理機能だと思えばいいと思う。ちいさなリソースをまとめて（Bunlde）ドバッと送信しちゃえば、多少パフォーマンスも上がるしねぇ。あと、 jQuery なんかはファイル名にバージョンナンバーが含まれていて、アップデートするたびに手動でリンクも書き換えなくちゃならないのだけど、そういう管理も少し楽になる。</p>
<pre class="code" data-unlink>bundles.Add(
new ScriptBundle(&#34;~/bundles/jquery&#34;, jqueryCdnPath)
.Include(&#34;~/Scripts/jquery-{version}.js&#34;));</pre>
</div>
<div class="section">
<h3>公式の Optimization ライブラリ</h3>
<p>とはいえ、最後にしたのにはわけがあって……</p><p><img src="20120910055103.png" alt="f:id:daruyanagi:20120910055103p:plain" title="f:id:daruyanagi:20120910055103p:plain" class="hatena-fotolife"></p><p>名前がコロコロ変わっているうえ、まだ v1.0 に到達していないというありさま（<a href="http://nuget.org/packages/microsoft.web.optimization">http://nuget.org/packages/microsoft.web.optimization</a>）。WebMatrix からも一応（一番古いのを）使うことはできるのだけど……もう少し様子見が必要かな。今回はそのまま突っ切っちゃうけど、将来的にはこんな感じにできるんだよっていう参考程度に。 MVC 4 だったらもう使えるのかなぁ。</p>

</div>
<div class="section">
<h3>Microsoft.Web.Optimization</h3>
<p><img src="20120910055942.png" alt="f:id:daruyanagi:20120910055942p:plain" title="f:id:daruyanagi:20120910055942p:plain" class="hatena-fotolife"></p><p>まず、Microsoft.Web.Optimization をインストール。</p>
<pre class="code" data-unlink># ＿AppStart.cshtml

@<span class="synStatement">using</span> Microsoft.Web.Optimization

@{
var csses = <span class="synStatement">new</span> Bundle(<span class="synConstant">&quot;~/css&quot;</span>, <span class="synStatement">typeof</span>(CssMinify)); <span class="synComment">// 仮想パス</span>
csses.AddDirectory(<span class="synConstant">&quot;~/Content/&quot;</span>, <span class="synConstant">&quot;*.css&quot;</span>, <span class="synConstant">true</span>); <span class="synComment">// ファイル登録</span>
BundleTable.Bundles.Add(csses); <span class="synComment">// マネージャーに登録</span>

var scripts = <span class="synStatement">new</span> Bundle(<span class="synConstant">&quot;~/js&quot;</span>, <span class="synStatement">typeof</span>(JsMinify));
scripts.AddDirectory(<span class="synConstant">&quot;~/Scripts/&quot;</span>, <span class="synConstant">&quot;*.js&quot;</span>, <span class="synConstant">true</span>);
BundleTable.Bundles.Add(scripts);
}
</pre><p>で、 Scripts フォルダーや Content フォルダーを Bundle に登録。</p>
<pre class="code" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

@using Microsoft.Web.Optimization

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span>
<span class="synIdentifier">              </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        // 仮想パス &quot;~/css&quot; として登録したバンドルを解決</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;stylesheet&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;text/css&quot;</span>
<span class="synIdentifier">         </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@BundleTable.Bundles.ResolveBundleUrl(&quot;</span><span class="synIdentifier">~/css</span><span class="synConstant">&quot;)&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@BundleTable.Bundles.ResolveBundleUrl(&quot;</span><span class="synIdentifier">~/js</span><span class="synConstant">&quot;)&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>これはテストです。<span class="synIdentifier">&lt;/</span><span class="synStatement">p</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>で、テンプレートで Bundle を解決。スクリプトなんかは body の最後につっこむほうがナウいかもしれない。ページの読み込みが早くなるんだってさ。</p><p><img src="20120910060245.png" alt="f:id:daruyanagi:20120910060245p:plain" title="f:id:daruyanagi:20120910060245p:plain" class="hatena-fotolife"></p><p>ソースを見たらこんな感じ。 ?v=*** というのは最新版が読み込まれますように、というオマジナイだと思う。</p><p><img src="20120910060250.png" alt="f:id:daruyanagi:20120910060250p:plain" title="f:id:daruyanagi:20120910060250p:plain" class="hatena-fotolife"></p><p>肝心の中身を見てみると…… CSS はちゃんと Minify されているようにみえる。</p><p><img src="20120910060252.png" alt="f:id:daruyanagi:20120910060252p:plain" title="f:id:daruyanagi:20120910060252p:plain" class="hatena-fotolife"></p><p>JavaScript はなんかエラー出た。使い方が悪いのかもしれないけれど、まぁ、正式版になったらまた検証してみるって感じで。</p>

</div>
<div class="section">
<h3>Scripts セクションで誤魔化す</h3>
<p>とまぁ、こんな感じなのだけれど、「ちょろっとビューからスクリプトを動的に追加したいなぁ」というだけならば、もっとお手軽な方法も使える。</p>
<pre class="code" data-unlink># Sample.cshtml

@section Scripts
{
&lt;link rel=&#34;stylesheet&#34; type=&#34;text/css&#34; href=&#34;***1&#34; /&gt;
&lt;link rel=&#34;stylesheet&#34; type=&#34;text/css&#34; href=&#34;***2&#34; /&gt;
}</pre><p>こうやって Scripts セクションを用意しておいて、</p>
<pre class="code" data-unlink># _SiteLayout.cshtml

:
:
@RenderBody(&#34;Scripts&#34;, false)
&lt;/body&gt;
&lt;/html&gt;</pre><p>とレイアウト側で呼び出せば OK。“スターター サイト”テンプレートで使われていたやり方をマネしてみただけだけどね！</p>

</div>
<div class="section">
<h3>追記</h3>
<p>@chack411 さん曰く、 <a href="http://nuget.org/packages/Microsoft.AspNet.Web.Optimization">http://nuget.org/packages/Microsoft.AspNet.Web.Optimization</a> を使うのが正しいそうです（ありがとうございます！）。また後日試してみましょう。</p>

</div>