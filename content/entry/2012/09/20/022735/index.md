---
date: 2012-09-20T02:27:35.0000000
draft: false
title: "WinRT/XAML のお勉強 ―― さまざまな利用シーンに対応する"
tags: ["WinRT"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120917220924.png" alt="f:id:daruyanagi:20120917220924p:plain" title="f:id:daruyanagi:20120917220924p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今作ってる燃費管理アプリだけど、データの入出力と表示ぐらいまではあらかたできている。ただ、タッチ操作で日付や数値を入力するのは案外めんどい。 InputScope でソフトウェアキーボードの初期レイアウトを制御できるので多少マシにはなるけれど、やっぱりタッチ専用のユーザーインターフェイスがほしい。まぁ、でも、そこは妥協してもいい。問題は回転と解像度、スナップやでぇ……</p>

<div class="section">
<h3>回転と解像度</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920020106.png" alt="f:id:daruyanagi:20120920020106p:plain" title="f:id:daruyanagi:20120920020106p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たとえば、さっきのアプリを90度回転させてみる。これは惨めだ……。解像度を大きくすると画面が間延びしたりするのも悲しい。</p><p>XAML では、いわゆるテーブルレイアウトのようなことが可能な Grid が便利なのだけれど、あまり頼りすぎるとすぐに破たんする感じ。なるべく特定の解像度に依存しないフローレイアウトを行うようにしたいけれど……GridView を中心にしたほうがいいのかなぁ。</p>

</div>
<div class="section">
<h3>スナップ</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120917220217.png" alt="f:id:daruyanagi:20120917220217p:plain" title="f:id:daruyanagi:20120917220217p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows ストアアプリは、端っこに寄せる「スナップ」をサポートしなければならない。</p><p>これを当初、HTML でいうレスポンシブレイアウト的な考えで対応しようと思っていたのだけれど、やってみるとあまり現実的ではない。というのも、さまざまな解像度に加え、回転まで考えると、考慮すべきケースが結構多くて手に負えなくなる。これを一つのビューで対応するのはできないこともないけど、結構大変だ。</p><p>そこで標準のテンプレートをよく読んでみたところ、どうも <del>ViewState（どっかで聞いたような名前だけど気にしない）</del> VisualState という仕組みがあるらしい。要は、縦表示なのか、スナップ状態なのか、といった表示の状態を管理してくれる。これを利用して、スナップ状態の時だけ表示されるリストを作ってしまえばいい。それあったまいいね！　標準テンプレートの最後のほうにある XAML をちょいちょいっといじるといいみたい。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;!-- The back button and title have different styles when snapped --&gt;</span>
<span class="synIdentifier">&lt;VisualState </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;Snapped&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Storyboard&gt;</span>
<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;backButton&quot;</span><span class="synIdentifier"> </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Style&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;{StaticResource SnappedBackButtonStyle}&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>
<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;pageTitle&quot;</span><span class="synIdentifier"> </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Style&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;{StaticResource SnappedPageHeaderTextStyle}&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>

<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;contentGrid&quot;</span><span class="synIdentifier"> </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Visibility&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;Collapsed&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>
<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;logListView&quot;</span><span class="synIdentifier"> </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Visibility&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;Visible&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>
<span class="synIdentifier">&lt;/Storyboard&gt;</span>
<span class="synIdentifier">&lt;/VisualState&gt;</span>
</pre><p>下の二つの ObjectAnimationUsingKeyFrames がそれで、contentGrid/logListView という二つのエレメントの Visibility を VisualState に応じて切り替えている。コードの意味はあんまりよくわかってなくて、辛うじて StoryBoard を知っている程度だけど、まぁ、コピペでいけるから今はそれでいいことにしておく。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920022229.png" alt="f:id:daruyanagi:20120920022229p:plain" title="f:id:daruyanagi:20120920022229p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows ストアアプリは、こういうところが難しいなぁ、と思った。デスクトップアプリと違って、「未完成だけど公開してみます」というのはストアが認めてくれないわけで、ハードルはかなり高い。それに比べれば、開発者登録にお金が要るのはあまり大した問題じゃない気もする。けれど、一つアプリを完成させた（<a href="https://blog.daruyanagi.jp/entry/2012/09/18/075242">&#x521D;&#x3081;&#x3066;&#x306E; Windows &#x30B9;&#x30C8;&#x30A2;&#x30A2;&#x30D7;&#x30EA;&#x3092;&#x63D0;&#x51FA;&#x3057;&#x3066;&#x307F;&#x307E;&#x3057;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）おかげで、ちょっとだけ慣れてきたかもしれない。やっぱり案ずるより産むが横山やすしやでぇ。</p><p>あとは WinRT <-> .NET Framework の関係があまりよくわかってなくて、MSDN ライブラリで迷子になったりするのもつらい。最初はファイルをどうやって開けばいいのかもわからなかった。けれど、これは経験を積んでいけば解消できそうな問題かな。</p>

</div>