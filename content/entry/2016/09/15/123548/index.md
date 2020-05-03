---
date: 2016-09-15T12:35:48.0000000
draft: false
title: "C#：非同期なイベント？"
tags: ["C#"]
eyecatch: 
---
<p>たとえばこんなコードがあるとする。ラムダ式でイベントハンドラを実装する、よくあるヤツ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">void</span> Run(IBackgroundTaskInstance taskInstance)
{
taskInstance.Canceled += (sender, reason) =&gt; { Hoge(); };
}
</pre><p>イベントハンドラ内で非同期コードがある場合は、こんな感じになる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">void</span> Run(IBackgroundTaskInstance taskInstance)
{
taskInstance.Canceled += async (sender, reason) =&gt;
{
await Hoge();
};
}
</pre><p>async/await を付け足すだけなので、そんなに難しくはない。</p><p>次に、イベントハンドラのコードが肥大化してきたので、これを外に出すことにする。</p><p>非同期じゃない場合はこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">void</span> Run(IBackgroundTaskInstance taskInstance)
{
taskInstance.Canceled += taskInstanceCanceled;
}

<span class="synType">private</span> <span class="synType">void</span> taskInstanceCanceled(
IBackgroundTaskInstance sender,
BackgroundTaskCancellationReason reason)
{
Hoge();
：
：
}
</pre><p>これをさっきみたいに非同期にすると、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">void</span> Run(IBackgroundTaskInstance taskInstance)
{
taskInstance.Canceled += taskInstanceCanceled;
<span class="synComment">// taskInstance.Canceled += async taskInstanceCanceled;</span>
}

<span class="synType">private</span> async Task taskInstanceCanceled(
IBackgroundTaskInstance sender,
BackgroundTaskCancellationReason reason)
{
await Hoge();
：
：
}
</pre><p>になると思うんだけど、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>taskInstance.Canceled += taskInstanceCanceled;
</pre><p>ここでエラーになる（taskInstanceCanceled の返り値が void ではなく Task なので）。</p><p>しょうがないので、ちょっと考えてこうした。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">void</span> Run(IBackgroundTaskInstance taskInstance)
{
taskInstance.Canceled += async (sender, reason) =&gt;
{
await taskInstanceCanceled(sender, reason);
};
}

<span class="synType">private</span> async Task taskInstanceCanceled(
IBackgroundTaskInstance sender,
BackgroundTaskCancellationReason reason)
{
await Hoge();
：
：
}
</pre><p>動いたっぽいんだけどなんかしっくりこないので、今度詳しい人に聞いてみたい。</p>
