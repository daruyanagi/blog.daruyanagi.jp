---
date: 2018-06-09T16:35:00.0000000
draft: false
title: "UWP：FullTrustProcessLauncher で起動したプログラムに引数を渡す"
tags: ["UWP", "C#"]
eyecatch: 
---
<p>できないのかなーと思ってたのだけど、イケるっぽい。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F39487135%2Fuwp-javascript-app-run-win32-exe-with-parameters" title="UWP JavaScript APP: run win32 EXE with parameters" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://stackoverflow.com/questions/39487135/uwp-javascript-app-run-win32-exe-with-parameters">stackoverflow.com</a></cite></p><p>こんな風に desktop:ParameterGroup をあらかじめ登録して……</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;Package ……</span>
<span class="synIdentifier">    </span><span class="synType">xmlns</span><span class="synComment">:</span><span class="synType">desktop</span>=<span class="synConstant">&quot;http://schemas.microsoft.com/appx/manifest/desktop/windows10&quot;</span>
<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Applications&gt;</span>
<span class="synIdentifier">&lt;Application </span><span class="synType">Id</span>=<span class="synConstant">&quot;App&quot;</span><span class="synIdentifier"> </span><span class="synType">Executable</span>=<span class="synConstant">&quot;$targetnametoken$.exe&quot;</span><span class="synIdentifier"> </span><span class="synType">EntryPoint</span>=<span class="synConstant">&quot;$targetentrypoint$&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;Extensions&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">Extension </span><span class="synType">Category</span>=<span class="synConstant">&quot;windows.fullTrustProcess&quot;</span>
<span class="synIdentifier">                </span><span class="synType">Executable</span>=<span class="synConstant">&quot;Yakitori.Console\Yakitori.Console.exe&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">FullTrustProcess&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">ParameterGroup </span><span class="synType">GroupId</span>=<span class="synConstant">&quot;Desktop&quot;</span><span class="synIdentifier"> </span><span class="synType">Parameters</span>=<span class="synConstant">&quot;/d&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">ParameterGroup </span><span class="synType">GroupId</span>=<span class="synConstant">&quot;Active&quot;</span><span class="synIdentifier"> </span><span class="synType">Parameters</span>=<span class="synConstant">&quot;/a&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">FullTrustProcess&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synSpecial">desktop</span><span class="synComment">:</span><span class="synIdentifier">Extension&gt;</span>
<span class="synIdentifier">&lt;/Extensions&gt;</span>
<span class="synIdentifier">&lt;/Application&gt;</span>
<span class="synIdentifier">&lt;/Applications&gt;</span>
<span class="synIdentifier">&lt;/Package&gt;</span>
</pre><p>それを使えばいいみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> async <span class="synType">void</span> Button_Click(<span class="synType">object</span> sender, Windows.UI.Xaml.RoutedEventArgs e)
{
await FullTrustProcessLauncher.LaunchFullTrustProcessForCurrentAppAsync(<span class="synConstant">&quot;Desktop&quot;</span>);
}
</pre><p>これをコンソールアプリで受けてみると、こんな感じになった。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> Yakitori.Console
{
<span class="synType">class</span> Program
{
<span class="synType">static</span> <span class="synType">void</span> Main(<span class="synType">string</span>[] args)
{
<span class="synStatement">foreach</span> (var arg <span class="synStatement">in</span> args)
{
System.Console.WriteLine(arg);
}

System.Console.ReadKey();
}
}
}
</pre><p>意味はよく分からんし、本来の使い方と違う気がするけど、これで UWP ⇔ コンソール連携できそう。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180609163221.png" alt="f:id:daruyanagi:20180609163221p:plain" title="f:id:daruyanagi:20180609163221p:plain" class="hatena-fotolife" itemprop="image"></span></p>
