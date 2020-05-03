---
date: 2014-03-08T22:07:23.0000000
draft: false
title: "WebMatrix: Gmail 経由でアラートメールを送る"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 20140308220635.png
---
<p><a href="https://twitter.com/YanagiHidetoshi">Hidetoshi Yanagi&#xFF08;&#x7121;&#x8077;&#xFF09; (YanagiHidetoshi) on Twitter</a> に仕掛けておいた Twitter Bot が少しおかしいことに気が付いた。このブログのフィードだけ配信されていない。アプリが吐いたログを見ると、どうやらツイートが長すぎたようだ。修正、修正っと。</p><p>で、この問題は解決したのだけど、こういうことはメールでお知らせしてほしいなと思う。WebMatrix/ASP.NET Web Pages では簡単にメールが遅れるので、使わないなんて損だ。</p><p>以下は Gmail の SMTP サーバーを利用する場合。最初に WebMail クラスの設定をしておく。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// _AppStart.cshtml</span>

@{
WebMail.SmtpServer=<span class="synConstant">&quot;smtp.gmail.com&quot;</span>;
WebMail.SmtpPort = <span class="synConstant">587</span>;
WebMail.EnableSsl=<span class="synConstant">true</span>;
WebMail.UserName=<span class="synConstant">&quot;***&quot;</span>;
WebMail.From=<span class="synConstant">&quot;***@gmail.com&quot;</span>;
WebMail.Password=<span class="synConstant">&quot;***&quot;</span>;
}
</pre><p>使い方はこんな感じ。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
<span class="synStatement">try</span>
{
（なんかエラーの起こりそうな処理）
}
<span class="synStatement">catch</span> (Exception e)
{
WebMail.Send(
<span class="synStatement">             to:</span> <span class="synConstant">&quot;***@***.**&quot;</span>,
<span class="synStatement">             subject:</span> <span class="synConstant">&quot;Error が起こったで！&quot;</span>,
<span class="synStatement">             body:</span> e.Message
);
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140308220635.png" alt="f:id:daruyanagi:20140308220635p:plain" title="f:id:daruyanagi:20140308220635p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>さっそく ALTER TABLE が失敗したメールが来た ／(＾o＾)＼</p>
