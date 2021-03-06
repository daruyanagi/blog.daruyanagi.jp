---
date: 2020-01-06T17:20:12.0000000
draft: false
title: "UWP：SoftwareBitmap を縮小する"
tags: ["UWP"]
eyecatch: 
---
<p>はてなブログにデカい写真を貼るときのフローがめんどくさい。どれぐらいめんどくさいかというと、ブログを書くペースが月1回に落ちるぐらいめんどくさい。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fblog.daruyanagi.jp%2Fentry%2F2020%2F01%2F02%2F100000" title="スマホで写真を撮る → 「スマホ同期」アプリでコピー → はてなブログに張り付け - だるろぐ" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://blog.daruyanagi.jp/entry/2020/01/02/100000">blog.daruyanagi.jp</a></cite></p><p>――というわけで、年始は画像を縮小できるアプリを開発していた。要件は以下のとおり。</p>

<ul>
<li>［共有］コマンドに対応（必須）</li>
<li>シンプル。ブログへのアップロードに使いそうな機能しか追加しない
<ul>
<li>画像の縮小（できた）</li>
<li>画像の回転（すぐできそうだけどやってない）</li>
<li>顔認識して隠す（進捗半分）</li>
<li>画像のクロップ（優先度低）</li>
</ul></li>
</ul><p>UWP アプリの開発は1年以上ぶりで、右も左もわからぬ。Microsoft Docs をさまよった結果、内部での画像データは SoftwareBitmap あたりで持つのがよさげだったが、当初は縮小の方法もいまいちわからかった。</p>

<div class="section">
<h3>Win2D を使う</h3>
<p>そういうときは、やっぱり StackOverFlow だよね。親切にも SoftwareBitmap の拡張メソッドにしてくれていたので、そのまま使うことにした。ちなみに、これを利用するには NuGet で Win2D パッケージを別途インストールする必要がある。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// https://stackoverflow.com/questions/41251716/how-to-resize-a-softwarebitmap</span>

<span class="synType">public</span> <span class="synType">static</span> SoftwareBitmap Resize(<span class="synStatement">this</span> SoftwareBitmap softwareBitmap, <span class="synType">float</span> newWidth, <span class="synType">float</span> newHeight)
{
<span class="synStatement">using</span> (var resourceCreator = CanvasDevice.GetSharedDevice())
<span class="synStatement">using</span> (var canvasBitmap = CanvasBitmap.CreateFromSoftwareBitmap(resourceCreator, softwareBitmap))
<span class="synStatement">using</span> (var canvasRenderTarget = <span class="synStatement">new</span> CanvasRenderTarget(resourceCreator, newWidth, newHeight, canvasBitmap.Dpi))
<span class="synStatement">using</span> (var drawingSession = canvasRenderTarget.CreateDrawingSession())
<span class="synStatement">using</span> (var scaleEffect = <span class="synStatement">new</span> ScaleEffect())
{
scaleEffect.Source = canvasBitmap;
scaleEffect.Scale = <span class="synStatement">new</span> System.Numerics.Vector2(newWidth / softwareBitmap.PixelWidth, newHeight / softwareBitmap.PixelHeight);
drawingSession.DrawImage(scaleEffect);
drawingSession.Flush();
<span class="synStatement">return</span> SoftwareBitmap.CreateCopyFromBuffer(canvasRenderTarget.GetPixelBytes().AsBuffer(), BitmapPixelFormat.Bgra8, (<span class="synType">int</span>)newWidth, (<span class="synType">int</span>)newHeight, BitmapAlphaMode.Premultiplied);
}
}
</pre><p>おおむね快適に動作するが、特定のサイズ（縦×横）の組み合わせで画像が乱れる問題が見つかったのが問題（割ったり、int でキャストしているところでなんかおかしいのかなぁ）。頑張って直してみようとしたが、自分には無理だった。</p>

</div>
<div class="section">
<h3>BitmapEncoder を用いる（WrietableBitmap 経由）</h3>
<p>というわけで、基本に戻ることにした。BitmapEncoder を生成し、SoftwareBitmap を割り当てて、Transform してもらう。<a href="http://c5d5e5.asablo.jp/blog/2017/08/08/8642588">http://c5d5e5.asablo.jp/blog/2017/08/08/8642588</a> で提示されていたサンプルコードをベースに、SoftwareBitmap の拡張メソッドにしてみた。<br />
<br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// http://c5d5e5.asablo.jp/blog/2017/08/08/8642588</span>

<span class="synType">public</span> <span class="synType">static</span> async Task&lt;SoftwareBitmap&gt; ResizeAsync(<span class="synStatement">this</span> SoftwareBitmap source, <span class="synType">float</span> newWidth, <span class="synType">float</span> newHeight)
{
<span class="synStatement">if</span> (source == <span class="synConstant">null</span>) <span class="synStatement">return</span> <span class="synConstant">null</span>;

<span class="synStatement">using</span> (var memory = <span class="synStatement">new</span> InMemoryRandomAccessStream())
{
<span class="synComment">// BitmapEncoder を用いメモリ上で source をリサイズ</span>
var id = BitmapEncoder.PngEncoderId;
BitmapEncoder encoder = await BitmapEncoder.CreateAsync(id, memory);
encoder.BitmapTransform.ScaledHeight = (<span class="synType">uint</span>)newHeight;
encoder.BitmapTransform.ScaledWidth = (<span class="synType">uint</span>)newWidth;
encoder.BitmapTransform.InterpolationMode = BitmapInterpolationMode.Fant;
encoder.SetSoftwareBitmap(source);
await encoder.FlushAsync();

<span class="synComment">// リサイズしたメモリを WriteableBitmap に複写</span>
var writeableBitmap = <span class="synStatement">new</span> WriteableBitmap((<span class="synType">int</span>)newWidth, (<span class="synType">int</span>)newHeight);
await writeableBitmap.SetSourceAsync(memory);

<span class="synComment">// dest（XAML の Image コントロール互換）を作成し、WriteableBitmap から複写</span>
var dest = <span class="synStatement">new</span> SoftwareBitmap(BitmapPixelFormat.Bgra8, (<span class="synType">int</span>)newWidth, (<span class="synType">int</span>)newHeight, BitmapAlphaMode.Premultiplied);
dest.CopyFromBuffer(writeableBitmap.PixelBuffer);

<span class="synStatement">return</span> dest;
}
}
</pre><p>Encoder から SoftwareBitmap を得るのに WrietableBitmap を経由しているのがあまりしっくりこないけど、こっちは問題なく動作した。</p>

</div>
<div class="section">
<h3>BitmapEncoder ＋ BitmapDecorder</h3>
<p>他人の力ばかり借りるのも何なので、自分でも考えてみたのはこちら。基本的にはさっきのやり方と変わらないけれど、WrietableBitmap ではなく、BitmapDecorder を利用している。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> async Task&lt;SoftwareBitmap&gt; ResizeAsync2(<span class="synStatement">this</span> SoftwareBitmap source, <span class="synType">float</span> newWidth, <span class="synType">float</span> newHeight)
{
<span class="synStatement">if</span> (source == <span class="synConstant">null</span>) <span class="synStatement">return</span> <span class="synConstant">null</span>;

<span class="synStatement">using</span> (var memory = <span class="synStatement">new</span> InMemoryRandomAccessStream())
{
var encoder = await BitmapEncoder.CreateAsync(BitmapEncoder.PngEncoderId, memory);
encoder.SetSoftwareBitmap(source);
await encoder.FlushAsync();

var decoder = await BitmapDecoder.CreateAsync(memory);

var transform = <span class="synStatement">new</span> BitmapTransform()
{
ScaledHeight = (<span class="synType">uint</span>)newHeight,
ScaledWidth = (<span class="synType">uint</span>)newWidth,
InterpolationMode = BitmapInterpolationMode.Fant,
};

var dest = await decoder.GetSoftwareBitmapAsync(
BitmapPixelFormat.Bgra8, BitmapAlphaMode.Premultiplied,
transform,
ExifOrientationMode.IgnoreExifOrientation, ColorManagementMode.DoNotColorManage
);

<span class="synStatement">return</span> dest;
}
}
</pre><p>これも問題なく動いたが、どうも WrietableBitmap バージョンと比べると動作が遅い。Encoder/Decorder の生成にかなりコストがかかるようだ。となると、そもそも Encoder/Decorder は毎回生成せず、使いまわしたほうが良いのかもしれない（拡張メソッドにするのもあまりよくない、もしくは拡張メソッドに Encoder を渡すようにする）。</p><p>とりあえず、これで基本的な使い方はわかったような気がするので、画像の回転などは簡単に作れそう（Transform するだけ）。作るうちにペン対応なんかもやりだして、なかなか完成しないけれど、開発中のアプリはなかなかよく動いており、「ブログ、また書こうかな」っていう気がわいてきた。</p>

</div>