---
date: 2014-07-20T22:35:07.0000000
draft: false
title: "WebMatrix：IHttpModule で定期実行を実装する"
tags: ["WebMatrix", "ASP.net"]
eyecatch: 
---
<p><a href="https://blog.daruyanagi.jp/entry/2013/10/14/141550">WebMatrix 3: Twitter Bot &#xFF08;&#xFF0B;&#x30EA;&#x30A2;&#x30EB;&#x30BF;&#x30A4;&#x30E0;&#x30ED;&#x30B0;&#x8868;&#x793A;&#x4ED8;&#x304D;&#xFF09;&#x3067;&#x3082;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x308B;&#x3002; - &#x3060;&#x308B;&#x308D;&#x3050;</a> で System.Timers.Timer を使って ASP.NET の定期処理を実装したのだけど、のいえ先生の <a href="http://neue.cc/2013/07/20_416.html">neue cc - ASP.NET&#x3067;&#x306E;&#x5B9A;&#x671F;&#x7684;&#x306A;&#x30E2;&#x30CB;&#x30BF;&#x30EA;&#x30F3;&#x30B0;&#x624B;&#x6CD5;</a> でもう一度実装しなおしてみた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140720222501.png" alt="f:id:daruyanagi:20140720222501p:plain" title="f:id:daruyanagi:20140720222501p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h3>Web.config</h3>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>

<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;modules&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">name</span>=<span class="synConstant">&quot;SchedulerModule&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span>=<span class="synConstant">&quot;SchedulerModule&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/modules&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>Web.config でモジュールを登録する。</p>

</div>
<div class="section">
<h3>~/App_Code/ScheduleModule.cs</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synStatement">using</span> System;
<span class="synStatement">using</span> System.Threading;
<span class="synStatement">using</span> System.Web;

<span class="synType">public</span> <span class="synType">class</span> SchedulerModule : IHttpModule
{
<span class="synType">static</span> <span class="synType">int</span> initializedModuleCount = <span class="synConstant">0</span>;
<span class="synType">static</span> Timer timer;

<span class="synType">public</span> <span class="synType">void</span> Init(HttpApplication context)
{
var count = Interlocked.Increment(<span class="synStatement">ref</span> initializedModuleCount);

<span class="synStatement">if</span> (count != <span class="synConstant">1</span>) <span class="synStatement">return</span>;

timer = <span class="synStatement">new</span> Timer(_ =&gt;
{
<span class="synStatement">try</span>
{
System.Diagnostics.Debug.WriteLine(<span class="synConstant">&quot;だん！&quot;</span>);
}
<span class="synStatement">catch</span> (Exception e)
{
System.Diagnostics.Debug.WriteLine(e.Message);
}
}, <span class="synConstant">null</span>, TimeSpan.FromMinutes(<span class="synConstant">1</span>), TimeSpan.FromMinutes(<span class="synConstant">1</span>));
}

<span class="synType">public</span> <span class="synType">void</span> Dispose()
{
var count = Interlocked.Decrement(<span class="synStatement">ref</span> initializedModuleCount);

<span class="synStatement">if</span> (count != <span class="synConstant">0</span>) <span class="synStatement">return</span>;

var target = Interlocked.Exchange(<span class="synStatement">ref</span> timer, <span class="synConstant">null</span>);

<span class="synStatement">if</span> (target != <span class="synConstant">null</span>) target.Dispose();
}
}
</pre><p>SchedulerModule はこんな感じ。IHttpModule インターフェイス（Init、Dispose）を実装する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140720222920.png" alt="f:id:daruyanagi:20140720222920p:plain" title="f:id:daruyanagi:20140720222920p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>（ExpressWeb で動かして initializedModuleCount をインクリメント・デクリメントをメールで通知するようにしてみたらこんな感じ）</p><p>SchedulerModule はいくつも作成（＆いくつも殺される）ので、ちゃんと数をカウントして、タイマーが大量生産されないように管理する必要があるそうな（← ASP.NET のライフサイクルをちゃんとわかってない。確かライフサイクルを書いたポスターがあったはずなので、今度確認しておこう）。</p>

</div>