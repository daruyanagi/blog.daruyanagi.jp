---
date: 2012-02-12T21:34:37.0000000
draft: false
title: "C# の Markdown エンジン"
tags: ["C#"]
eyecatch: 
---
<p><img src="20120212212225.png" alt="f:id:daruyanagi:20120212212225p:plain" title="f:id:daruyanagi:20120212212225p:plain" class="hatena-fotolife"></p><p>C# で Markdown エンジンを探すと、 MarkdownSharp と MarkdownDeep というのが見つかるけど、どっちがいいんだろうね。</p>

<ol>
<li><a href="http://code.google.com/p/markdownsharp/">
markdownsharp -


C# Markdown processor - Google Project Hosting
</a></li>
<li><a href="http://www.toptensoftware.com/markdowndeep/">Topten Software</a> （MarkdownDeep）</li>
</ol><p>どちらも NuGet からダウンロード可能。</p><p>基本的には MarkdownDeep の方が高速で、サンプルも充実している。（.Net版と<a class="keyword" href="http://d.hatena.ne.jp/keyword/JavaScript">JavaScript</a>版、そしてそれらを動かすサンプルを NuGet で取得できる）。ただ、使い込んでいくと、どうも一部HTMLタグの解釈に問題があるっぽい。</p><p><img src="20120212212227.png" alt="f:id:daruyanagi:20120212212227p:plain" title="f:id:daruyanagi:20120212212227p:plain" class="hatena-fotolife"></p><p>MarkdownSharp の場合は、 &lt;span class="label important"&gt;Important&lt;/span&gt; なんていう複数のクラスをもつタグでも正しく解釈できるが、</p><p><img src="20120212212228.png" alt="f:id:daruyanagi:20120212212228p:plain" title="f:id:daruyanagi:20120212212228p:plain" class="hatena-fotolife"></p><p>MarkdownDeep だと失敗してしまう。</p><p>今のところ MarkdownSharp の方がおすすめできるっぽい。</p>
