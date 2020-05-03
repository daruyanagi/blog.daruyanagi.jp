---
date: 2017-03-18T03:08:10.0000000
draft: false
title: "UWP ＋ WebView ＋ XPath でスクレイピングする"
tags: ["UWP"]
eyecatch: 
---
<p>WebView の InvokeScriptAsync() を利用してスクレイピングしてみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">sealed</span> <span class="synStatement">partial</span> <span class="synType">class</span> MainPage : Page
{
<span class="synType">public</span> MainPage()
{
<span class="synStatement">this</span>.InitializeComponent();

Loaded += MainPage_Loaded;
}

<span class="synType">private</span> <span class="synType">void</span> MainPage_Loaded(<span class="synType">object</span> sender, RoutedEventArgs e)
{
var browser = <span class="synStatement">new</span> WebView();
var url = <span class="synConstant">&quot;https://google.co.jp/&quot;</span>;
var xpath = <span class="synConstant">&quot;//h1&quot;</span>;
var result_type = <span class="synConstant">&quot;XPathResult.FIRST_ORDERED_NODE_TYPE&quot;</span>;
var function = $<span class="synConstant">&quot;document.evaluate(&quot;</span> +
<span class="synConstant">&quot;'{xpath}', 'document', null, {result_type}, null&quot;</span> +
<span class="synConstant">&quot;).singleNodeValue.innerHTML;&quot;</span>;

browser.NavigationCompleted += async (s, args) =&gt;
{
<span class="synStatement">if</span> (!args.IsSuccess) <span class="synStatement">throw</span> <span class="synStatement">new</span> Exception();

var html = await browser.InvokeScriptAsync(
<span class="synConstant">&quot;eval&quot;</span>,
<span class="synStatement">new</span> <span class="synType">string</span>[] { function, }
);

System.Diagnostics.Debug.WriteLine(html);
};

browser.Navigate(<span class="synStatement">new</span> Uri(url));
}
}
</pre><p>一応うまくいっているみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170318025944.png" alt="f:id:daruyanagi:20170318025944p:plain" title="f:id:daruyanagi:20170318025944p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>しかし、Windows ストアなんかでスクレイピングをやろうとすると、アプリの切り替えダイアログが出てしまう（プロトコルハンドラーとか言うのか？　これ）。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170318030427.png" alt="f:id:daruyanagi:20170318030427p:plain" title="f:id:daruyanagi:20170318030427p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>あと、AngularJS みたいなサイトでは使えないかもしれない（やり方が悪いだけかもしれない）。また、WebView は UI スレッドで動作するらしいので、バックグラウンドタスクで利用することもできない。あんまりスジのいい方法ではなさそうだ、というのが今回の結論かも。</p>
