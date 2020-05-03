---
date: 2016-04-12T17:19:03.0000000
draft: false
title: "UWP：ユーザーコントロールを作ってみる"
tags: ["UWP", "Windows開発"]
eyecatch: 20160412165802.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20160412165802.png" alt="f:id:daruyanagi:20160412165802p:plain" title="f:id:daruyanagi:20160412165802p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>今回作るのは、文字数カウンター付きのテキストボックス。まずはユーザーインターフェイス。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;UserControl</span>
<span class="synIdentifier">    </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Class</span>=<span class="synConstant">&quot;Hateboo.UserControls.TextBoxWithCounter&quot;</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot;</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">x</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot;</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">local</span>=<span class="synConstant">&quot;using:Hateboo.UserControls&quot;</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">d</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/expression/blend/2008&quot;</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">mc</span>=<span class="synConstant">&quot;http://schemas.openxmlformats.org/markup-compatibility/2006&quot;</span>
<span class="synIdentifier">    </span><span class="synType">mc</span><span class="synComment">:</span><span class="synType">Ignorable</span>=<span class="synConstant">&quot;d&quot;</span>
<span class="synIdentifier">    </span><span class="synType">d</span><span class="synComment">:</span><span class="synType">DesignHeight</span>=<span class="synConstant">&quot;300&quot;</span>
<span class="synIdentifier">    </span><span class="synType">d</span><span class="synComment">:</span><span class="synType">DesignWidth</span>=<span class="synConstant">&quot;400&quot;</span><span class="synIdentifier">&gt;</span>

<span class="synIdentifier">&lt;StackPanel&gt;</span>
<span class="synIdentifier">&lt;TextBox </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;textBox&quot;</span><span class="synIdentifier"> </span><span class="synType">TextChanged</span>=<span class="synConstant">&quot;textBox_TextChanged&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synIdentifier">&lt;StackPanel </span><span class="synType">Orientation</span>=<span class="synConstant">&quot;Horizontal&quot;</span><span class="synIdentifier"> </span><span class="synType">HorizontalAlignment</span>=<span class="synConstant">&quot;Right&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;TextBlock </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;textBlockCurrent&quot;</span><span class="synIdentifier">&gt;</span>0<span class="synIdentifier">&lt;/TextBlock&gt;</span>
<span class="synIdentifier">&lt;TextBlock&gt;</span>/<span class="synIdentifier">&lt;/TextBlock&gt;</span>
<span class="synIdentifier">&lt;TextBlock </span><span class="synType">x</span><span class="synComment">:</span><span class="synType">Name</span>=<span class="synConstant">&quot;textBlockMax&quot;</span><span class="synIdentifier">&gt;</span>0<span class="synIdentifier">&lt;/TextBlock&gt;</span>
<span class="synIdentifier">&lt;/StackPanel&gt;</span>
<span class="synIdentifier">&lt;/StackPanel&gt;</span>
<span class="synIdentifier">&lt;/UserControl&gt;</span>
</pre><p>単にテキストボックスとカウンターラベル（0/100 みたいな表示）を配置しただけ。</p><p>（コードを張り付けてから気づいたが、0/100 の / を表示するためだけに TextBlock 使ってるのはアレだな。Run とか使えばよかった）</p><p>このコントロールにほしいプロパティは、</p>

<ul>
<li>Text：TextBox の内容</li>
<li>Current：現在の TextBox 文字数</li>
<li>Max：TextBox に入力できる最大の文字数。これをオーバーすると、ラベルが赤くなる</li>
</ul><p>ぐらいかな。名前がいまいちなのは気にしないでくれ（Max は Limit とかのほうがよさげやな。英語わからんから知らんけど）。</p><p>というわけで、こいつらを<b>依存関係プロパティ</b>として実装する。依存関係プロパティというのはいまだによくわからんが、バインディングがいい感じに動くように <b>CLR プロパティ</b>（フツーの C# のプロパティ）をクラスに登録しておく仕組みって感じだろうか。</p><p>基本的にはこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 依存関係プロパティ</span>
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">readonly</span> DependencyProperty MaxProperty = DependencyProperty.Register(
<span class="synConstant">&quot;Max&quot;</span>,　<span class="synComment">// Max という名前の……</span>
<span class="synStatement">typeof</span>(<span class="synType">int</span>),　<span class="synComment">// int 型の CLR プロパティを……</span>
<span class="synStatement">typeof</span>(TextBoxWithCounter), <span class="synComment">// クラスに登録するやで―</span>
<span class="synStatement">new</span> PropertyMetadata(<span class="synConstant">0</span>));

<span class="synComment">// CLR プロパティ</span>
<span class="synType">public</span> <span class="synType">int</span> Max
{
<span class="synStatement">get</span> { <span class="synStatement">return</span> (<span class="synType">int</span>)GetValue(MaxProperty); }
<span class="synStatement">set</span>
{
SetValue(MaxProperty, <span class="synStatement">value</span>);
textBlockMax.Text = <span class="synStatement">value</span>.ToString();
}
}
</pre><p>だいたいはこれでいいのだけど、今回の Text プロパティだけは値が変わったときにいろいろごちゃごちゃしなきゃいけないので、コールバックを設定する。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">static</span> <span class="synType">readonly</span> DependencyProperty TextProperty = DependencyProperty.Register(
<span class="synConstant">&quot;Text&quot;</span>,
<span class="synStatement">typeof</span>(<span class="synType">string</span>),
<span class="synStatement">typeof</span>(TextBoxWithCounter),
<span class="synComment">// コールバックの追加</span>
<span class="synStatement">new</span> PropertyMetadata(<span class="synType">string</span>.Empty, <span class="synStatement">new</span> PropertyChangedCallback(TextPropertyChanged))
);

<span class="synType">private</span> <span class="synType">static</span> <span class="synType">void</span> TextPropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
{
var self = d <span class="synStatement">as</span> TextBoxWithCounter;
var <span class="synStatement">value</span> = e.NewValue <span class="synStatement">as</span> <span class="synType">string</span>;

<span class="synComment">// テキストボックスとラベルの値を更新しとく</span>
self.textBox.Text = <span class="synStatement">value</span>;
self.Current = <span class="synStatement">value</span>.Length;

<span class="synComment">// アカんときはアカくする</span>
<span class="synStatement">if</span> (self.Current &gt; self.Max)
{
self.IsOverflow = <span class="synConstant">true</span>;
self.textBlockCurrent.Foreground = <span class="synStatement">new</span> SolidColorBrush(Colors.Red);
}
<span class="synStatement">else</span>
{
self.IsOverflow = <span class="synConstant">false</span>;
self.textBlockCurrent.Foreground = （デフォのブラシ）;
}
}
</pre><p>かずきさんのおかげで、案外簡単に実装できた……WPF と UWP の違いでちょっとハマったけど。</p><p><iframe src="http://blog.okazuki.jp/embed/2014/09/08/203943" title="WPF4.5入門 その53 「ユーザーコントロール」 - かずきのBlog@hatena" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe></p>
