---
date: 2017-06-24T23:25:57.0000000
draft: false
title: "XAML：オブジェクト参照がオブジェクト インスタンスに設定されていません。"
tags: ["XAML", "UWP"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170624231314.png" alt="f:id:daruyanagi:20170624231314p:plain" title="f:id:daruyanagi:20170624231314p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>XAML をガリガリ書いてビルドすると、こんなエラーが出た。</p>

<blockquote>
<p>オブジェクト参照がオブジェクト インスタンスに設定されていません。</p>

</blockquote>
<p>エラーの説明がふんわりし過ぎていて、場所すら特定できない。ソースコードはコンパイルされているみたいなので、XAML の実行時エラーっぽいが……しょうがないのであちこちコメントアウトしながら、がんばって場所を特定した。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170624232247.png" alt="f:id:daruyanagi:20170624232247p:plain" title="f:id:daruyanagi:20170624232247p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>どうやら、このコメント部分が原因らしい。ぱっと見、問題はなさそうにも見えるが――</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170624232355.png" alt="f:id:daruyanagi:20170624232355p:plain" title="f:id:daruyanagi:20170624232355p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>バインディングしていた Checked の定義を見て悟った。イベントにプロパティをバインドしている……orz</p><p>Checked イベントを IsChecked プロパティに書き換えることで問題は解消されました＼(＾o＾)／</p>
