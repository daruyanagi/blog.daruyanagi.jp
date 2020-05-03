---
date: 2014-08-20T02:27:30.0000000
draft: false
title: "TwitterRT でストア アプリからお手軽ツイート（※要改修"
tags: ["Twitter", "Windows ストア アプリ", "WinRT"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140820020905.png" alt="f:id:daruyanagi:20140820020905p:plain" title="f:id:daruyanagi:20140820020905p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows ストア アプリへ手軽にツイート機能を追加したいときに便利なライブラリが、<a href="http://twitterrt.codeplex.com/">TwitterRt - Tweet from Windows Metro Apps - Home</a>。こういう感じの WebAuthenticationBroker を使った認証処理を一行で実現してくれるのがいい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> TwitterRt t = <span class="synStatement">new</span> TwitterRt(
<span class="synConstant">&quot;consumerKey&quot;</span>,
<span class="synConstant">&quot;consumerSecret&quot;</span>,
<span class="synConstant">&quot;callbackUrl&quot;</span>
);

<span class="synType">private</span> async <span class="synType">void</span> Button1_Click(<span class="synType">object</span> sender, Windows.UI.Xaml.RoutedEventArgs args)
{
<span class="synComment">// 認証</span>
await t.GainAccessToTwitter();
}

<span class="synType">private</span> async <span class="synType">void</span> Button2_Click(<span class="synType">object</span> sender, Windows.UI.Xaml.RoutedEventArgs args)
{
<span class="synComment">// ツイート</span>
await t.UpdateStatus(<span class="synConstant">&quot;Hello From TwitterRt&quot;</span>);
}
</pre><p>ソースコードを斜め読みしかしてないのだけど、認証処理で取得したトークンなんかは自動で ApplicationData.RoamingSettings に保存してくれるっぽい。一度どこかの端末で認証しておけば、ほかの端末でもそれが自動で同期されるはず。超便利だな。</p><p>でも、残念ながらメンテナンスされていないようで、NuGet で取得したバイナリが動かない。しょうがないのでソースコードを落としてきてちょろちょろっと直した。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 46行目ぐらい</span>

<span class="synComment">// const string _updateStatusUrl = &quot;https://api.twitter.com/1/statuses/update.json&quot;;</span>
<span class="synType">const</span> <span class="synType">string</span> _updateStatusUrl = <span class="synConstant">&quot;https://api.twitter.com/1.1/statuses/update.json&quot;</span>;
</pre><p>まずは Twitter の API を 1.0 → 1.1 へとアップデート。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 295行目ぐらい</span>

Request.Method = <span class="synConstant">&quot;POST&quot;</span>;
Request.ContentType = <span class="synConstant">&quot;application/x-www-form-urlencoded&quot;</span>; <span class="synComment">// 追加</span>
Request.Headers[<span class="synConstant">&quot;Authorization&quot;</span>] = headers;
</pre><p>ContentType も設定しなきゃいけないらしい。</p><p>これだけで一応動くのだけど……</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 179行目ぐらい</span>

<span class="synComment">// request.Add(&quot;status&quot;, Uri.EscapeDataString(status));</span>
request.Add(<span class="synConstant">&quot;status&quot;</span>, Uri.EscapeDataString(status.Replace(<span class="synConstant">&quot;</span><span class="synSpecial">\r\n</span><span class="synConstant">&quot;</span>, <span class="synConstant">&quot;</span><span class="synSpecial">\n</span><span class="synConstant">&quot;</span>)));
</pre><p>改行を含んだテキストをツイートできるように、もう一カ所修正しておいた。</p>

<ul>
<li><a href="http://coelacanth.jp.net/windows%E3%82%B9%E3%83%88%E3%82%A2%E3%82%A2%E3%83%97%E3%83%AA%E5%85%A5%E9%96%80-vol73twitterrt%E3%81%A7%E3%81%8A%E6%89%8B%E8%BB%BD%E3%81%AB%E3%81%A4%E3%81%B6%E3%82%84%E3%81%8F/">Windows&#x30B9;&#x30C8;&#x30A2;&#x30A2;&#x30D7;&#x30EA;&#x5165;&#x9580; vol73:TwitterRt&#x3067;&#x304A;&#x624B;&#x8EFD;&#x306B;&#x3064;&#x3076;&#x3084;&#x304F; | &#x7720;&#x308B;&#x30B7;&#x30FC;&#x30E9;&#x30AB;&#x30F3;&#x30B9;&#x3068;&#x6C34;&#x5E95;&#x306E;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DE;&#x30FC;</a></li>
</ul>