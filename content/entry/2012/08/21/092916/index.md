---
date: 2012-08-21T09:29:16.0000000
draft: false
title: "WebMatrix でファイルのアップロード（4） - アップロードしたファイルの表示"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><img src="20120821091848.png" alt="f:id:daruyanagi:20120821091848p:plain" title="f:id:daruyanagi:20120821091848p:plain" class="hatena-fotolife"></p><p>そういえば、アップロードしたファイルの表示をやっていなかった<a href="#f1" name="fn1" title="アップロード「結果」の表示はやっていたけれど">*1</a>。アップロードフォルダには画像ファイルしかないはずなので、今回は img タグで決め打ちしていいかな。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># List.cshtml

@functions {
<span class="synType">private</span> <span class="synType">const</span> <span class="synType">string</span> OUTPUT_DIR = <span class="synConstant">&quot;~/Files/&quot;</span>;
}

@{
var dir = Server.MapPath(OUTPUT_DIR);
var files = <span class="synStatement">new</span> System.IO.DirectoryInfo(dir)
.EnumerateFiles()
.Select((f) =&gt; VirtualPathUtility
.ToAbsolute(OUTPUT_DIR + f.Name));
}

&lt;!DOCTYPE html&gt;

&lt;html lang=<span class="synConstant">&quot;en&quot;</span>&gt;
&lt;head&gt;
&lt;meta charset=<span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&quot;</span> /&gt;
&lt;title&gt;&lt;/title&gt;
&lt;style&gt;
a {
<span class="synStatement">            display:</span> block;
<span class="synStatement">            float:</span> left;
<span class="synStatement">            height:</span> 48px; width: 48px;
<span class="synStatement">            margin:</span> 6px;
text-align: center;
}
a img {
max-height: 48px; max-width: 48px;
<span class="synStatement">            border:</span> none;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
@<span class="synStatement">foreach</span> (var file <span class="synStatement">in</span> files)
{
&lt;a href=<span class="synConstant">&quot;@file&quot;</span>&gt;&lt;img src=<span class="synConstant">&quot;@file&quot;</span> /&gt;&lt;/a&gt;
}
&lt;/body&gt;
&lt;/html&gt;
</pre><p>結果はこんな感じ。</p><p><img src="20120821092040.png" alt="f:id:daruyanagi:20120821092040p:plain" title="f:id:daruyanagi:20120821092040p:plain" class="hatena-fotolife"></p><p>びっくりするほど難しくなかった。</p><p>OUTPUT_DIR はアップロード処理と共通なので、どこかにまとめておいたほうがいいな。むしろ、 OUTPUT_DIR フォルダーの内容を管理するクラスを作って、それを経由してファイルの保存・一覧をするようにするのが望ましいと思った。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">アップロード「結果」の表示はやっていたけれど</span></p>
</div>