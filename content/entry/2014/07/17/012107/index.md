---
date: 2014-07-17T01:21:07.0000000
draft: false
title: "WebMatrix：Web.config の appSettings を使いこなす"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140717/20140717005913.png
---
<p><a href="https://blog.daruyanagi.jp/entry/2014/07/15/224549">WebMatrix&#xFF1A;&#x30ED;&#x30FC;&#x30AB;&#x30EB;&#x3068;&#x30EA;&#x30E2;&#x30FC;&#x30C8;&#x3067;&#x7570;&#x306A;&#x308B;&#x8A2D;&#x5B9A;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B;&#x65B9;&#x6CD5;&#x3092;&#x8003;&#x3048;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> でちょっと興味がわいたので、Web.config について少しいろいろ試してみた。</p>

<div class="section">
<h3>基本</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717005913.png" alt="f:id:daruyanagi:20140717005913p:plain" title="f:id:daruyanagi:20140717005913p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<div class="section">
<h4>Default.cshtml</h4>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

@using System.Configuration

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@ObjectInfo.Print(ConfigurationManager.AppSettings)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>Web.config の appSettings セクションに記述したアプリケーション設定を読み込む。</p><p>@ObjectInfo.Print は WebMatrix でちょっとしたデバッグをするときに便利なのでぜひ覚えておこう。</p>

</div>
<div class="section">
<h4>Web.config</h4>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>

<span class="synIdentifier">&lt;appSettings </span><span class="synType">file</span>=<span class="synConstant">&quot;Web2.config&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;A&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;a&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;B&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;b&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;C&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;c&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;D&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;d&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;E&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;e&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;F&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;f&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;G&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;g&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>appSettings セクションにアプリケーション設定を記述。<code>file="Web2.config"</code> は後述。</p>

</div>
<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717011748.png" alt="f:id:daruyanagi:20140717011748p:plain" title="f:id:daruyanagi:20140717011748p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>たとえば、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var a = System.Configuration.ConfigurationManager.AppSettings[<span class="synConstant">&quot;A&quot;</span>];
</pre><p>などとすることで、Web.config の appSettings セクションに記述したアプリケーション設定が得られる。</p><p>ちょっとめんどくさいけれど、API キーなどの静的値はなるべくハードコードせず、appSettings に書いておくべき。</p>

</div>
</div>
<div class="section">
<h3>外部 .config ファイルを利用したアプリケーション設定のオーバーライド</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717011257.png" alt="f:id:daruyanagi:20140717011257p:plain" title="f:id:daruyanagi:20140717011257p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>以下のような Web2.config ファイルを追加。</p>

<div class="section">
<h4>Web2.config</h4>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;appSettings&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;E&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;F&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;G&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;3&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
</pre>
</div>
<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717010123.png" alt="f:id:daruyanagi:20140717010123p:plain" title="f:id:daruyanagi:20140717010123p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ConfigurationManager.AppSettings["E"] 以降の値が Web2.config の内容によって書き換えられる。</p><p>Web.config の file 属性で指定した外部 .config ファイルが存在しない場合は、読み込み処理がスキップされる。</p>

</div>
</div>
<div class="section">
<h3>外部 .config ファイルを利用したアプリケーション設定の強制削除</h3>
<p>ちょっと Web2.config をイジってみる。</p>

<div class="section">
<h4>Web2.config</h4>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;appSettings&gt;</span>
<span class="synIdentifier">&lt;clear /&gt;</span> // <span class="synIdentifier">&lt;- 追加</span>
<span class="synIdentifier">    </span><span class="synError">&lt;</span><span class="synIdentifier">add </span><span class="synType">key</span>=<span class="synConstant">&quot;E&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;F&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">key</span>=<span class="synConstant">&quot;G&quot;</span><span class="synIdentifier"> </span><span class="synType">value</span>=<span class="synConstant">&quot;3&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
</pre>
</div>
<div class="section">
<h4>結果</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717010556.png" alt="f:id:daruyanagi:20140717010556p:plain" title="f:id:daruyanagi:20140717010556p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Web.config で記述したアプリケーション設定がクリアされる。</p><p>要するに、ASP.NET は .config を読んで、appSettings セクションに書かれた add や clear といったコマンドを AppSettings（Dictionary 型）に対して行っているだけ。</p><p>なので、</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;appSettings&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">key</span>=<span class="synConstant">&quot;A&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/appSettings&gt;</span>
</pre><p>とすれば、特定のキーだけを消すことも可能。これを使えば、Web.config で行ったアプリケーション設定を Web2.config から自由にイジれる。使い方間違うとハマるかもだけど。</p>

</div>
</div>
<div class="section">
<h3>外部 .config ファイルを隠しファイルにする</h3>
<p>結論を先に言うと、Web2.config を隠しファイルにしても、appSettings はちゃんと読み込まれる。</p><p>なので <a href="https://blog.daruyanagi.jp/entry/2014/07/17/004650">WebMatrix&#xFF1A;&#x7279;&#x5B9A;&#x306E;&#x30D5;&#x30A1;&#x30A4;&#x30EB;&#x3092;&#x767A;&#x884C;&#x5BFE;&#x8C61;&#x306B;&#x542B;&#x307E;&#x306A;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a> と組み合わせることで、</p>

<ul>
<li>Web.config</li>
<li>Web2.config（隠しファイル、リモートに発行されない）</li>
</ul><p>という構成にすれば、</p>

<ul>
<li>ローカル：Web.config ＋ Web2.config のアプリケーション設定で動作</li>
<li>リモート：Web.config のアプリケーション設定で動作</li>
</ul><p>という風に運用できる（<a href="https://blog.daruyanagi.jp/entry/2014/07/15/224549">WebMatrix&#xFF1A;&#x30ED;&#x30FC;&#x30AB;&#x30EB;&#x3068;&#x30EA;&#x30E2;&#x30FC;&#x30C8;&#x3067;&#x7570;&#x306A;&#x308B;&#x8A2D;&#x5B9A;&#x3092;&#x5229;&#x7528;&#x3059;&#x308B;&#x65B9;&#x6CD5;&#x3092;&#x8003;&#x3048;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> は発想を逆にすればよかった！）。</p>

</div>