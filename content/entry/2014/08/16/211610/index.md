---
date: 2014-08-16T21:16:10.0000000
draft: false
title: "WinRT: COM コンポーネントを表す型のインターフェイスを COM コンポーネントを表さない型にキャストすることはできません。"
tags: ["WinRT"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140816205113.png" alt="f:id:daruyanagi:20140816205113p:plain" title="f:id:daruyanagi:20140816205113p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote>
<p>COM コンポーネントを表す型のインターフェイスを COM コンポーネントを表さない型にキャストすることはできません。</p>

</blockquote>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140816210519.png" alt="f:id:daruyanagi:20140816210519p:plain" title="f:id:daruyanagi:20140816210519p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>なんかこんな感じの、まぁ、自分でもよくわからん感じの設計になっていたのだけど、ShareTargetPage の ViewModel でエラーが発生する。</p><p>問題のコードはこの部分。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">protected</span> <span class="synType">void</span> OnPropertyChanged([CallerMemberName] <span class="synType">string</span> propertyName = <span class="synConstant">null</span>)
{
var eventHandler = <span class="synStatement">this</span>.PropertyChanged;
<span class="synStatement">if</span> (eventHandler != <span class="synConstant">null</span>)
{
eventHandler(<span class="synStatement">this</span>, <span class="synStatement">new</span> PropertyChangedEventArgs(propertyName));
}
}
</pre><p>ここで InvalidCastException が出る……。<a href="http://okazuki.hatenablog.com/entries/2012/10/13">&#x304B;&#x305A;&#x304D;&#x306E;Blog@hatena</a> ともちょっと違うのだけど、どうせ似たような原因だと思う。</p>

<blockquote>
<p>結果として別スレッドでコレクションを操作したため、エラーになるというWPFやSilverlightなどでおなじみのエラーパターンと同じでした。それにしても、何故InvalidCastExceptionなのだ！！</p>

</blockquote>
<p>いろいろ試してみたが、結局、自分の場合は Visual Studio でデバッグ実行しているときだけ発生することが判明（？）。共有のテストをするときはデバッグ実行したアプリを終了してから行うという手段で回避できた。</p><p>いつか根本的に解決できるようになりたいです（小並</p>
