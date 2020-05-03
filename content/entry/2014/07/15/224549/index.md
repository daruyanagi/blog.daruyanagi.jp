---
date: 2014-07-15T22:45:49.0000000
draft: false
title: "WebMatrix：ローカルとリモートで異なる設定を利用する方法を考えてみた"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>たとえば Twitter BOT を作っている場合に、</p>

<ul>
<li>ローカルテスト中は、テスト用に作成したアカウントでポスト</li>
<li>リモート展開中は、本番用のアカウントでポスト</li>
</ul><p>したい。<a href="http://msdn.microsoft.com/ja-jp/library/dd465318(v=vs.100).aspx">Visual Studio &#x3060;&#x3063;&#x305F;&#x3089;&#x30C7;&#x30D7;&#x30ED;&#x30A4;&#x6642;&#x306B; XDT &#x3067; Web.config &#x3092;&#x66F8;&#x304D;&#x63DB;&#x3048;&#x3089;&#x308C;&#x308B;</a>ので簡単だけど、わしはそれを WebMatrix でやりたいのさ。</p><p>で、AppSettings についていろいろ調べてたのだけど……</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/aa903313(v=vs.71).aspx">

<div class="section">
<h5>file 属性</h5>
<p>カスタム アプリケーションの構成設定を含む外部ファイルへの相対パスを指定します。指定されたファイルには、<add>、<remove>、および <clear> の各要素で指定されたものと同じ種類の設定が含まれ、これらの要素と同じキーと値のペア形式を使用します。</p><p>指定するパスはメイン構成ファイルへの相対パスです。Windows フォーム アプリケーションの場合は、アプリケーションの構成ファイルの場所ではなく、バイナリ フォルダ (/bin/debug など) になります。Web フォーム アプリケーションの場合は、web.config ファイルが置かれているアプリケーション ルートへの相対パスになります。<br />
<b>指定されたファイルが見つからない場合、ランタイムはこの属性を無視します。</b></p>

</div>
<cite><a href="http://msdn.microsoft.com/ja-jp/library/aa903313(v=vs.71).aspx">&lt;appSettings&gt; &#x8981;&#x7D20;</a></cite>
</blockquote>
<p>これは使えそう。方針はこんな感じ。</p>

<ul>
<li>ローカルテスト時：Web.config（テスト用の Twitter アカウントの設定を記述）</li>
<li>リモートテスト時：Web.config ＋ RemoteOnly.config（本番用の Twitter アカウントの設定で上書き）</li>
</ul><p>発行のときにリモートの RemoteOnly.config を消さないように気を付けなきゃいけない運用上の注意はあるけれど、これは割とイケるのではないか。</p>

<div class="section">
<h3>Web.config</h3>
<p>appSettings にテスト用アカウントの設定を記述。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;customErrors </span><span class="synType">mode</span>=<span class="synConstant">&quot;Off&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>

<span class="synIdentifier">&lt;appSettings </span><span class="synType">file</span>=<span class="synConstant">&quot;RemoteOnly.config&quot;</span><span class="synIdentifier">&gt;</span> // <span class="synIdentifier">&lt;-- </span><span class="synType">file</span><span class="synIdentifier"> 属性を記述</span>
<span class="synIdentifier">        </span><span class="synError">&lt;</span><span class="synIdentifier">add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterAccessToken&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterAccessTokenSecret&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterConsumerKey&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterConsumerSecret&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>RemoteOnly.config がない場合は、ConfigurationManager.AppSettings["***"] こちらの設定が取得される。<br />
<br />
</p>

</div>
<div class="section">
<h3>RemoteOnly.config</h3>
<p>本番用アカウントの設定を記述。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;appSettings&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterAccessToken&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterAccessTokenSecret&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterConsumerKey&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;twitterConsumerSecret&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
</pre><p>上書きする appSettings をルートに書けばいいんだね。</p>

</div>