---
date: 2013-05-09T19:11:52.0000000
draft: false
title: "Formula Pad 1.1.0 for Windows 8"
tags: ["Formula Pad", "Windows 8", "Windows ストア アプリ", "告知"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20130509/20130509185340.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509185340.png" alt="f:id:daruyanagi:20130509185340p:plain" title="f:id:daruyanagi:20130509185340p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>いろいろありましたが（<a href="https://blog.daruyanagi.jp/entry/2013/05/07/220402">Windows &#x30B9;&#x30C8;&#x30A2; &#x30A2;&#x30D7;&#x30EA;&#xFF1A;&#x30EA;&#x30B8;&#x30A7;&#x30AF;&#x30C8;&#x3092;&#x98DF;&#x3089;&#x3044;&#x307E;&#x3057;&#x305F;&#x3002; - &#x3060;&#x308B;&#x308D;&#x3050;</a>、<a href="https://blog.daruyanagi.jp/entry/2013/05/09/011459">Windows Store Apps&#xFF1A;&#x516C;&#x958B;&#x3055;&#x308C;&#x307E;&#x3057;&#x305F;&hellip;&hellip;&#x304C;&#xFF01; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）、無事（日本の）Windows ストアにも公開されました。</p>

<ul>
<li><a href="http://apps.microsoft.com/windows/ja-JP/app/formula-pad/86b6ecdc-e810-4aa2-9bdb-bb0da5b34737">http://apps.microsoft.com/windows/ja-JP/app/formula-pad/86b6ecdc-e810-4aa2-9bdb-bb0da5b34737</a></li>
</ul>
<div class="section">
<h3>1.1.0（2013/05/09）</h3>

<ul>
<li>日本市場をはじめとするすべての市場に公開しました</li>
</ul><p>1.0.0 なんてなかったんや……！</p>

</div>

<div class="section">
<h3>基本的な機能</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509185803.png" alt="f:id:daruyanagi:20130509185803p:plain" title="f:id:daruyanagi:20130509185803p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ほとんど <a href="https://blog.daruyanagi.jp/entry/2013/05/02/021238">Formula Pad 1.0.1 - &#x3060;&#x308B;&#x308D;&#x3050;</a> と同じです。Surface RT で使うために作りました。まぁ、むかしカメラ目当てで作ったアプリ（<a href="https://blog.daruyanagi.jp/entry/2012/09/27/195233">&#x521D;&#x3081;&#x3066;&#x306E; Windows &#x30B9;&#x30C8;&#x30A2;&#x30A2;&#x30D7;&#x30EA;&#x304C;&#x7121;&#x4E8B;&#x30B9;&#x30C8;&#x30A2;&#x3067;&#x516C;&#x958B;&#x3055;&#x308C;&#x307E;&#x3057;&#x305F; &#xFF3C;(&#xFF3E;o&#xFF3E;)&#xFF0F; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）よりは役に立つと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509191047.png" alt="f:id:daruyanagi:20130509191047p:plain" title="f:id:daruyanagi:20130509191047p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>アプリバーから数式をテキストや画像として保存したり、クリップボードへコピーできます。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509185853.png" alt="f:id:daruyanagi:20130509185853p:plain" title="f:id:daruyanagi:20130509185853p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>スナップ表示にも対応しているよ！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130509185918.png" alt="f:id:daruyanagi:20130509185918p:plain" title="f:id:daruyanagi:20130509185918p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>でも、ソフトウェアキーボードで使う場面を考慮するのを忘れていました……これは直さねばならない。どうすればええんや……</p>

</div>
<div class="section">
<h3>プライバシーポリシーのリンクを［設定］チャームへ追加</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>SettingsPane.GetForCurrentView().CommandsRequested += (s, e) =&gt;
{
<span class="synType">const</span> <span class="synType">string</span> LAVEL_PRIVACY_POLICY = <span class="synConstant">&quot;Privacy Policy&quot;</span>;
<span class="synType">const</span> <span class="synType">string</span> URL_PRIVACY_POLICY = <span class="synConstant">&quot;http://download.daruyanagi.net/Privacy%20Policy&quot;</span>;

var show_privacy_policy = <span class="synStatement">new</span> UICommandInvokedHandler(async (target) =&gt;
{
<span class="synStatement">switch</span> (target.Id <span class="synStatement">as</span> <span class="synType">string</span>)
{
<span class="synStatement">case</span> LAVEL_PRIVACY_POLICY:
await Launcher.LaunchUriAsync(<span class="synStatement">new</span> Uri(URL_PRIVACY_POLICY));
<span class="synStatement">break</span>;
}
});

e.Request.ApplicationCommands.Clear();

e.Request.ApplicationCommands.Add(
<span class="synStatement">new</span> SettingsCommand(
LAVEL_PRIVACY_POLICY,
LAVEL_PRIVACY_POLICY,
show_privacy_policy
)
);
};
</pre><p>OnLaunched イベントハンドラに以下のコードを追加しておいた。これでいいのかな？</p>

</div>