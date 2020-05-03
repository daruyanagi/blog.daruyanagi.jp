---
date: 2012-09-23T23:42:41.0000000
draft: false
title: "オブジェクトを XML でシリアライズ"
tags: ["WinRT"]
eyecatch: 
---
<p><img src="20120923232820.png" alt="f:id:daruyanagi:20120923232820p:plain" title="f:id:daruyanagi:20120923232820p:plain" class="hatena-fotolife"></p><p>WinRT のファイル操作はまだ慣れていないので、いちいち MSDN を徘徊しなくちゃいけないのでつらい。でも、ちょっとずつ覚えていかなければ。</p><p>たとえば、.NET の XmlSerializer を使うときは Stream が必要なんだけれど、これは .NET のクラス。WinRT とどうやってつなげればいいんだろう…… </p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> async <span class="synType">void</span> Save(<span class="synType">object</span> o, <span class="synType">string</span> filename)
{
<span class="synStatement">if</span> (o == <span class="synConstant">null</span>) <span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentException();

<span class="synStatement">try</span>
{
<span class="synComment">// WinRT のファイル操作</span>
var folder = ApplicationData.Current.LocalFolder;
var file = await folder.CreateFileAsync(
filename,
CreationCollisionOption.ReplaceExisting
);

<span class="synComment">// .NET の書き込み stream として開く</span>
<span class="synStatement">using</span> (var stream = await file.OpenStreamForWriteAsync())
{
<span class="synComment">// おなじみの .NET ！</span>
<span class="synStatement">new</span> XmlSerializer(o.GetType()).Serialize(stream, o);
}
<span class="synComment">// *</span>
}
<span class="synStatement">catch</span>
{
<span class="synStatement">throw</span>;
}
}
</pre><p>調べてみると、 WindowsRuntimeStorageExtensions（<a href="http://msdn.microsoft.com/ja-jp/library/hh582101.aspx">http://msdn.microsoft.com/ja-jp/library/hh582101.aspx</a>）のような、WinRT と .NET のファイル操作を橋渡しする拡張メソッドが結構用意されているので、それを使えばいいみたい。</p><p>ちょっと注意が必要なのは、ファイルの保存場所。標準ではアプリフォルダしか認められていないみたい。アクセス権限がないって怒られまくってちょっと凹みそうになった。</p><p>そのアプリフォルダだけど、階層が結構深くてたどるのが面倒。なので、上記のコードの // * にダイアログを表示してパスをクリップボードにコピーするコードを仕込んでおいた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var dialog = <span class="synStatement">new</span> MessageDialog(
Path.GetFileName(file.Path) + <span class="synConstant">&quot; is saved successfully.&quot;</span>);
dialog.Commands.Add(<span class="synStatement">new</span> UICommand(<span class="synConstant">&quot;Close&quot;</span>));
dialog.Commands.Add(<span class="synStatement">new</span> UICommand(<span class="synConstant">&quot;Copy file's path to Clipboard&quot;</span>,
(_) =&gt; {
var p = <span class="synStatement">new</span> DataPackage();
p.SetText(file.Path);
Clipboard.SetContent(p);
Clipboard.Flush();
}));
await dialog.ShowAsync();
</pre><p><img src="20120923233730.png" alt="f:id:daruyanagi:20120923233730p:plain" title="f:id:daruyanagi:20120923233730p:plain" class="hatena-fotolife"></p><p>Process.Start() みたいなので一発でフォルダを開けたらいいんだけど、あり方がよくわからなかった。 Windows.System.Launcher はローカルフォルダ開くためには使えないのかなぁ。</p><p>アプリフォルダ、今回初めてのぞいてみたんだけど、いろいろ面白そうなファイルがあった。ふぅん、そういうことか、みたいな。</p>
