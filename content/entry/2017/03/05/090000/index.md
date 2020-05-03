---
date: 2017-03-05T09:00:00.0000000
draft: false
title: "PowerShell：メールが文字化けする"
tags: ["PowerShell"]
eyecatch: 
---
<p>PowerShell で SmtpClient を使ってメールを送ったのだけど、件名が化けてしまった。</p>

<blockquote cite="http://blog.shibayan.jp/entry/20130317/1363521503">
<p>NET 4.5 では内部でエンコードされた件名をデコードして持つように実装が変わったので、2 回エンコードして元の文字列が保持されるようにしないといけないということでした。</p>

<cite><a href="http://blog.shibayan.jp/entry/20130317/1363521503">.NET 4.5 &#x3067; SmtpClient &#x306E;&#x6319;&#x52D5;&#x304C;&#x5909;&#x308F;&#x3063;&#x3066;&#x3044;&#x305F;&#x3089;&#x3057;&#x3044; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></cite>
</blockquote>
<p>よくわかんないのだけど、"ISO-2022-JP と Base64 でエンコードするような処理"を件名に対して2回行えばいいらしい。リンク先のコード（C#）をそのまま PowerShell に書き換えてみた。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synComment">#「=?iso-2022-jp?B?&lt;エンコード文字列&gt;?=」形式に変換</span>
<span class="synStatement">function</span> <span class="synIdentifier">Encode-MailHeader</span>(<span class="synIdentifier">$subject</span>)
{
<span class="synIdentifier">$enc</span> = <span class="synType">[System.Text.Encoding]</span>::GetEncoding(<span class="synConstant">&quot;iso-2022-jp&quot;</span>);
<span class="synIdentifier">$strBase64</span> = <span class="synType">[Convert]</span>::ToBase64String(<span class="synIdentifier">$enc</span>.GetBytes(<span class="synIdentifier">$subject</span>));

<span class="synConstant">&quot;=?{0}?B?{1}?=&quot;</span> -<span class="synStatement">f</span> <span class="synConstant">&quot;iso-2022-jp&quot;</span>, <span class="synIdentifier">$strBase64</span>
}
</pre><p>あとはこの関数を使って、</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$subject</span> = <span class="synStatement">Encode-MailHeader</span>(<span class="synStatement">Encode-MailHeader</span>(<span class="synIdentifier">$title</span>))
</pre><p>とでもすればよい。とりあえず文字化けはなくなった気がする。</p>

<div class="section">
<h3>今日学んだこと</h3>

<div class="section">
<h4>関数をパイプ対応にする</h4>
<p>これで完成――でもいいのだけど、なんかダサいので、パイプで繋げるようにしてみた。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synComment">#「=?iso-2022-jp?B?&lt;エンコード文字列&gt;?=」形式に変換</span>
<span class="synStatement">function</span> <span class="synIdentifier">Encode-MailHeader</span>([Parameter(ValueFromPipeline=<span class="synConstant">$true</span>)]<span class="synIdentifier">$subject</span>)
{
<span class="synStatement">process</span>
{
<span class="synIdentifier">$enc</span> = <span class="synType">[System.Text.Encoding]</span>::GetEncoding(<span class="synConstant">&quot;iso-2022-jp&quot;</span>);
<span class="synIdentifier">$strBase64</span> = <span class="synType">[Convert]</span>::ToBase64String(<span class="synIdentifier">$enc</span>.GetBytes(<span class="synIdentifier">$subject</span>));

<span class="synConstant">&quot;=?{0}?B?{1}?=&quot;</span> -<span class="synStatement">f</span> <span class="synConstant">&quot;iso-2022-jp&quot;</span>, <span class="synIdentifier">$strBase64</span>
}
}
</pre><p>パイプを処理できるように、さっきの関数を改良。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$subject</span> = <span class="synIdentifier">$title</span> | <span class="synStatement">Encode-MailHeader</span> | <span class="synStatement">Encode-MailHeader</span>
</pre><p>ちょっとだけスマートになった気がする。</p>

</div>
</div>