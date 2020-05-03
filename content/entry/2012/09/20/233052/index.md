---
date: 2012-09-20T23:30:52.0000000
draft: false
title: "WinRT/XAML のお勉強 ―― 4つの表示状態"
tags: ["WinRT"]
eyecatch: 
---
<p>Windows ストアアプリには4つの状態（VisualState）がある</p>

<ul>
<li><b>FullScreenLandscape</b>：全画面表示（横）</li>
<li><b>FullScreenPortrait</b>：全画面表示（縦）</li>
<li><b>Snapped</b>：端に寄せる（幅300px）</li>
<li><b>Filled</b>：ほかのアプリを Snap した残りの領域に表示</li>
</ul><p>これを一つのデザインで対応しようとするととても難しい、という話が前回（<a href="https://blog.daruyanagi.jp/entry/2012/09/20/022735">WinRT/XAML &#x306E;&#x304A;&#x52C9;&#x5F37; &#x2015;&#x2015; &#x3055;&#x307E;&#x3056;&#x307E;&#x306A;&#x5229;&#x7528;&#x30B7;&#x30FC;&#x30F3;&#x306B;&#x5BFE;&#x5FDC;&#x3059;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）だった。あれからいろいろ試したんだけれど、ひとつのデザインですべてをカバーしようとするより、4つの VisualState にそれぞれ個別にデザインを作って割り当てたほうがよさそうだ<a href="#f-d1bfc3d2" name="fn-d1bfc3d2" title="ただ、FullScreenLandscape と Filled はとてもよく似ているので、分ける必要はないかもしれない">*1</a>。</p><p>じゃぁ、VisualState によってビューを切り替えるのってどうすればいいんだ？　ってのが今日の主題。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Grid </span><span class="synType">Style</span>=<span class="synConstant">&quot;{StaticResource LayoutRootStyle}&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Grid</span><span class="synComment">.</span><span class="synIdentifier">RowDefinitions&gt;</span>
<span class="synIdentifier">&lt;RowDefinition </span><span class="synType">Height</span>=<span class="synConstant">&quot;140&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;RowDefinition </span><span class="synType">Height</span>=<span class="synConstant">&quot;*&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/Grid</span><span class="synComment">.</span><span class="synIdentifier">RowDefinitions&gt;</span>

<span class="synComment">&lt;!-- Back button and page title --&gt;</span>
<span class="synIdentifier">&lt;Grid&gt;</span>
（ヘッダー。内容省略）
<span class="synIdentifier">&lt;/Grid&gt;</span>

<span class="synIdentifier">&lt;Grid </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;FullScreenLandscapeGrid&quot;</span><span class="synIdentifier"> </span>
<span class="synIdentifier">          </span><span class="synType">Grid</span><span class="synComment">.</span><span class="synType">Row</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">Background</span>=<span class="synConstant">&quot;Blue&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Grid </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;FullScreenPortraitGrid&quot;</span>
<span class="synIdentifier">          </span><span class="synType">Grid</span><span class="synComment">.</span><span class="synType">Row</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">Background</span>=<span class="synConstant">&quot;Yellow&quot;</span><span class="synIdentifier"> </span><span class="synType">Visibility</span>=<span class="synConstant">&quot;Collapsed&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Grid </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;SnappedGrid&quot;</span>
<span class="synIdentifier">          </span><span class="synType">Grid</span><span class="synComment">.</span><span class="synType">Row</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">Background</span>=<span class="synConstant">&quot;Green&quot;</span><span class="synIdentifier"> </span><span class="synType">Visibility</span>=<span class="synConstant">&quot;Collapsed&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;Grid </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;FilledGrid&quot;</span>
<span class="synIdentifier">          </span><span class="synType">Grid</span><span class="synComment">.</span><span class="synType">Row</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">Background</span>=<span class="synConstant">&quot;Red&quot;</span><span class="synIdentifier"> </span><span class="synType">Visibility</span>=<span class="synConstant">&quot;Collapsed&quot;</span><span class="synIdentifier"> /&gt;</span>
</pre><p>こうやって VisualState に対応する Grid を用意する（名前でわかるよね！）。わかりやすくセンスの悪い背景色をそれぞれ割り当てておいた。Grid.Row="1" なのはヘッダー（Grid.Row[0]）の下に表示するためやね。 </p><p>で、初期状態の FullScreenLandscape 以外は非表示（Visibility="Collapsed"）にしておく。あとは、最後のほうにある <VisualStateManager.VisualStateGroups> のところで、表示非表示を切り替えるだけ。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;VisualStateManager</span><span class="synComment">.</span><span class="synIdentifier">VisualStateGroups&gt;</span>
<span class="synComment">&lt;!-- Visual states reflect the application's view state --&gt;</span>
<span class="synIdentifier">&lt;VisualStateGroup </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;ApplicationViewStates&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;VisualState </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;FullScreenLandscape&quot;</span><span class="synIdentifier">&gt;</span>
（初期表示なので別に何もしないでいい感じ）
<span class="synIdentifier">&lt;/VisualState&gt;</span>

<span class="synComment">&lt;!-- The entire page respects the narrower 100-pixel margin convention for portrait --&gt;</span>
// 全画面（横向きになったら……）
<span class="synIdentifier">&lt;VisualState </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;FullScreenPortrait&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Storyboard&gt;</span>
（関係のないところ省略）

// FullScreenLandscapeGrid を非表示に
<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames</span>
<span class="synIdentifier">                    </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;FullScreenLandscapeGrid&quot;</span>
<span class="synIdentifier">                    </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Visibility&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame</span>
<span class="synIdentifier">                        </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;Collapsed&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>

// FullScreenPortraitGrid を表示に
<span class="synIdentifier">&lt;ObjectAnimationUsingKeyFrames</span>
<span class="synIdentifier">                    </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetName</span>=<span class="synConstant">&quot;FullScreenPortraitGrid&quot;</span>
<span class="synIdentifier">                    </span><span class="synType">Storyboard</span><span class="synComment">.</span><span class="synType">TargetProperty</span>=<span class="synConstant">&quot;Visibility&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;DiscreteObjectKeyFrame</span>
<span class="synIdentifier">                        </span><span class="synType">KeyTime</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> </span><span class="synType">Value</span>=<span class="synConstant">&quot;Visible&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/ObjectAnimationUsingKeyFrames&gt;</span>
<span class="synIdentifier">&lt;/Storyboard&gt;</span>
<span class="synIdentifier">&lt;/VisualState&gt;</span>

// Filled になったら……
<span class="synIdentifier">&lt;VisualState </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;Filled&quot;</span><span class="synIdentifier">&gt;</span>
:
: （以下略）
</pre><p>結果はこんな感じ。</p>

<div class="section">
<h4>FullScreenLandscape</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920231821.png" alt="f:id:daruyanagi:20120920231821p:plain" title="f:id:daruyanagi:20120920231821p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

</div>
<div class="section">
<h4>FullScreenPortrait</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920231828.png" alt="f:id:daruyanagi:20120920231828p:plain" title="f:id:daruyanagi:20120920231828p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>FullScreenLandscapeGrid.Visibility -> Collapsed<br />
FullScreenPortraitGrid.Visibility -> Visible</p>

</div>
<div class="section">
<h4>Snapped</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920231839.png" alt="f:id:daruyanagi:20120920231839p:plain" title="f:id:daruyanagi:20120920231839p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>FullScreenLandscapeGrid.Visibility -> Collapsed<br />
SnappedGrid.Visibility -> Visible</p>

</div>
<div class="section">
<h4>Filled</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120920231848.png" alt="f:id:daruyanagi:20120920231848p:plain" title="f:id:daruyanagi:20120920231848p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>FullScreenLandscapeGrid.Visibility -> Collapsed<br />
FilledGrid.Visibility -> Visible</p><p>あとはそれぞれ、解像度が変わる場合をよく考えながらデザインしていけばいいと思う。まぁ、なるべくテンプレ使うのがよさそうだけど、ちょっと試してみたところ、自分の目的には合わない気がしたのでやっぱこれで行こうと思う。</p>

</div>
<div class="section">
<h3>余談</h3>
<p>ここまでやるのはそんなに難しくなかったけど、途中、シミュレーターの回転に異様に時間がかかり、いろんなエラーをはいてしまってちょっと躓いた。再起動でなおったけど……。最初は自分のソースが悪かったのかなぁと思ってあちこち直してたのだけど、結局新規にページを作ってもエラーが出るので、やっとシミュレーターがおかしいんだってわかった。</p><p>まぁ、そんなこともあるよね。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn-d1bfc3d2" name="f-d1bfc3d2" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">ただ、FullScreenLandscape と Filled はとてもよく似ているので、分ける必要はないかもしれない</span></p>
</div>