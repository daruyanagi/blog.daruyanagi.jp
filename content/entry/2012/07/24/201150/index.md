---
date: 2012-07-24T20:11:50.0000000
draft: false
title: "失敗の数だけ強くなりたい"
tags: ["C#", "WPF"]
eyecatch: 
---
<p><img src="20120724200928.png" alt="f:id:daruyanagi:20120724200928p:plain" title="f:id:daruyanagi:20120724200928p:plain" class="hatena-fotolife"></p><p>朝起きてボーっとしてたんだけど、そしたらふと「Windows Phone端末使って Gist でメモ取れたら便利じゃね？」と思いついた。早速、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/Visual%20Studio">Visual Studio</a> を起動。けれど、趣味<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D7%A5%ED%A5%B0%A5%E9%A5%DE">プログラマ</a>ーの悲しさ、久しぶりだと何もかもすっかり忘れている<a href="#f1" name="fn1" title="歳もとったし">*1</a>。しかも、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/Silverlight">Silverlight</a> だといろいろ機能が欠けてて面倒くさいことも判明。とりあえず、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/WPF">WPF</a> で試作品でも作ることにした。 OAuth は面倒そうだったので、それも後回し。まずは Public の Gist を取得して ListBox に並べるところから始めよう。</p><p><b>MainWindow.<a class="keyword" href="http://d.hatena.ne.jp/keyword/xaml">xaml</a></b></p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Grid&gt;</span>
<span class="synIdentifier">&lt;ListBox </span><span class="synType">Name</span>=<span class="synConstant">&quot;listBoxGists&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/ListBox&gt;</span>
<span class="synIdentifier">&lt;/Grid&gt;</span>
</pre><p><b>MainWindow.<a class="keyword" href="http://d.hatena.ne.jp/keyword/xaml">xaml</a>.cs</b></p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System.Net;
<span class="synStatement">using</span> Newtonsoft.Json;

<span class="synComment">/// </span><span class="synIdentifier">&lt;</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synComment">/// MainWindow.<a class="keyword" href="http://d.hatena.ne.jp/keyword/xaml">xaml</a> の相互作用ロジック</span>
<span class="synComment">/// </span><span class="synIdentifier">&lt;/</span><span class="synStatement">summary</span><span class="synIdentifier">&gt;</span>
<span class="synType">public</span> <span class="synStatement">partial</span> <span class="synType">class</span> MainWindow : Window
{
<span class="synType">public</span> MainWindow()
{
InitializeComponent();
}

<span class="synType">private</span> <span class="synType">void</span> MainWindow_Loaded(
<span class="synType">object</span> sender, RoutedEventArgs e)
{
var client = <span class="synStatement">new</span> WebClient();

client.DownloadStringCompleted += (_sender, _e) =&gt;
{
listBoxGists.ItemsSource = JsonConvert
.DeserializeObject&lt;Gist[]&gt;(_e.Result);
};

client.DownloadStringAsync(
<span class="synStatement">new</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/Uri">Uri</a>(<span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/https">https</a>://<a class="keyword" href="http://d.hatena.ne.jp/keyword/api">api</a>.github.com/gists&quot;</span>));
}
}

<span class="synType">public</span> <span class="synType">struct</span> Gist
{
<span class="synType">public</span> <span class="synType">string</span> html_url;
<span class="synType">public</span> <span class="synType">string</span> git_push_url;
<span class="synType">public</span> User user;
<span class="synType">public</span> <span class="synType">string</span> description;
<span class="synType">public</span> <span class="synType">int</span> comments;
<span class="synType">public</span> <span class="synType">bool</span> @<span class="synType">public</span>;
<span class="synType">public</span> Dictionary&lt;<span class="synType">string</span>, File&gt; files;
<span class="synType">public</span> <span class="synType">string</span> created_at;
<span class="synType">public</span> <span class="synType">string</span> url;
<span class="synType">public</span> <span class="synType">string</span> id;
<span class="synType">public</span> <span class="synType">string</span> updated_at;
<span class="synType">public</span> <span class="synType">string</span> git_pull_url;
}

<span class="synType">public</span> <span class="synType">struct</span> User
{
<span class="synType">public</span> <span class="synType">string</span> <a class="keyword" href="http://d.hatena.ne.jp/keyword/avatar">avatar</a>_url;
<span class="synType">public</span> <span class="synType">string</span> gravatar_id;
<span class="synType">public</span> <span class="synType">string</span> login;
<span class="synType">public</span> <span class="synType">string</span> url;
<span class="synType">public</span> <span class="synType">string</span> id;
}

<span class="synType">public</span> <span class="synType">struct</span> File
{
<span class="synType">public</span> <span class="synType">string</span> @type;
<span class="synType">public</span> <span class="synType">string</span> filename;
<span class="synType">public</span> <span class="synType">string</span> raw_url;
<span class="synType">public</span> <span class="synType">string</span> language;
<span class="synType">public</span> <span class="synType">string</span> size;
}
</pre><p>これは酷いベタ書きでござる<a href="#f2" name="fn2" title="意外なことに、ここまではぐぐることもなく、案外すんなり書けたんだよ！">*2</a>。見る人が見たら殴りにくるよね？</p>

<div class="section">
<h3>第一の失敗</h3>
<p>初回ビルドは成功。しかも、ちゃんと動いているみたいだ。けれど、数分後にもう一度試すと例外が発生するようになった。なぜだ。</p><p><img src="20120724194531.png" alt="f:id:daruyanagi:20120724194531p:plain" title="f:id:daruyanagi:20120724194531p:plain" class="hatena-fotolife"></p><p>けれど、これは比較的簡単に原因がわかった。エラーがでた箇所の JSON をみてみる。</p><p><img src="20120724194701.png" alt="f:id:daruyanagi:20120724194701p:plain" title="f:id:daruyanagi:20120724194701p:plain" class="hatena-fotolife"></p><p>日本語がうまく処理されていないらしい。ちゃんと WebClient の<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A8%A5%F3%A5%B3%A1%BC%A5%C9">エンコード</a>を指定していなかった……</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var client = <span class="synStatement">new</span> WebClient()
{
Encoding = System.Text.UTF8Encoding.UTF8
};
</pre><p>日本語のデータが含まれていても、例外が出なくなった。うまくいった。</p>

</div>
<div class="section">
<h3>第二の失敗</h3>
<p>気をよくしたので、ついでに ListBox の見た目をもう少しよくしようと思った。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;Grid&gt;</span>
<span class="synIdentifier">&lt;ListBox </span><span class="synType">Name</span>=<span class="synConstant">&quot;listBoxGists&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;ListBox</span><span class="synComment">.</span><span class="synIdentifier">ItemTemplate&gt;</span>
<span class="synIdentifier">&lt;DataTemplate&gt;</span>
<span class="synIdentifier">&lt;StackPanel&gt;</span>
<span class="synIdentifier">&lt;TextBlock </span><span class="synType">Text</span>=<span class="synConstant">&quot;{Binding description}&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/StackPanel&gt;</span>
<span class="synIdentifier">&lt;/DataTemplate&gt;</span>
<span class="synIdentifier">&lt;/ListBox</span><span class="synComment">.</span><span class="synIdentifier">ItemTemplate&gt;</span>
<span class="synIdentifier">&lt;/ListBox&gt;</span>
<span class="synIdentifier">&lt;/Grid&gt;</span>
</pre><p><img src="20120724195003.png" alt="f:id:daruyanagi:20120724195003p:plain" title="f:id:daruyanagi:20120724195003p:plain" class="hatena-fotolife"></p><p>うまくいかないでござる！　うまくいかないでござる！</p>

<blockquote>
<p>System.Windows.Data Error: 40 : BindingExpression path error: 'description' property not found on 'object' ''Gist' (HashCode=284350719)'. BindingExpression:Path=description; DataItem='Gist' (HashCode=284350719); target element is 'TextBlock' (Name=''); target property is 'Text' (type 'String')</p>

</blockquote>
<p>などというエラーがたくさんでている。ここで1時間が経過してタイムオーバー。さすがにもう会社へ行かなくてはいけない。</p><p>しかし、会社の椅子に座った途端、ふと気がついた。もしかしたら……！</p><p>家に帰って早速コードを一行だけ変更。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">struct</span> Gist
{
<span class="synType">public</span> <span class="synType">string</span> html_url;
<span class="synType">public</span> <span class="synType">string</span> git_push_url;
<span class="synType">public</span> User user;
<span class="synType">public</span> <span class="synType">string</span> description { get; set; } <span class="synComment">/* Here! */</span>
<span class="synType">public</span> <span class="synType">int</span> comments;
<span class="synType">public</span> <span class="synType">bool</span> @<span class="synType">public</span>;
<span class="synType">public</span> Dictionary&lt;<span class="synType">string</span>, File&gt; files;
<span class="synType">public</span> <span class="synType">string</span> created_at;
<span class="synType">public</span> <span class="synType">string</span> url;
<span class="synType">public</span> <span class="synType">string</span> id;
<span class="synType">public</span> <span class="synType">string</span> updated_at;
<span class="synType">public</span> <span class="synType">string</span> git_pull_url;
}
</pre><p><img src="20120724195343.png" alt="f:id:daruyanagi:20120724195343p:plain" title="f:id:daruyanagi:20120724195343p:plain" class="hatena-fotolife"></p><p>お見事！　フィールドは<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%D0%A5%A4%A5%F3%A5%C7%A5%A3%A5%F3%A5%B0">バインディング</a>できないのでした。</p><p>しかし、なんでこんなところで躓いているんだろう……まったく、わたくしさまの人生そのものですな。</p>

</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">歳もとったし</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">意外なことに、ここまではぐぐることもなく、案外すんなり書けたんだよ！</span></p>
</div>