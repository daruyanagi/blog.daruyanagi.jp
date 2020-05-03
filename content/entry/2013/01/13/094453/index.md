---
date: 2013-01-13T09:44:53.0000000
draft: false
title: "WebMatrix 2：RESTful？な Web アプリケーション （4）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130113093131.png" alt="f:id:daruyanagi:20130113093131p:plain" title="f:id:daruyanagi:20130113093131p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/01/11/060424">WebMatrix 2&#xFF1A;RESTful&#xFF1F;&#x306A; Web &#x30A2;&#x30D7;&#x30EA;&#x30B1;&#x30FC;&#x30B7;&#x30E7;&#x30F3; &#xFF08;3&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。サーバーへ手軽に PUT/DELETE できる方法はないかなぁ、と思って探していたのだけど、</p>

<ul>
<li><a href="https://addons.mozilla.org/ja/firefox/addon/poster/">https://addons.mozilla.org/ja/firefox/addon/poster/</a></li>
</ul><p>という Firefox 拡張機能が簡単でよかった。ただ、最近はあんまりメンテナンスされていないようで</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130113093440.png" alt="f:id:daruyanagi:20130113093440p:plain" title="f:id:daruyanagi:20130113093440p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>わざわざアドオンバーを表示して、このクソちっちゃいボタンをポチッとしなきゃいけないのだけど。</p><p>それはともかく。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130113093755.png" alt="f:id:daruyanagi:20130113093755p:plain" title="f:id:daruyanagi:20130113093755p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>IIS（Express）は標準で PUT や DELETE を認識してくれないみたいで、リクエストを投げても 404 が返ってきてしまう。Web.config を書き換えて、PUT や DELETE をハンドリングできるようにする必要があるみたい。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>

<span class="synIdentifier">&lt;configuration&gt;</span>
<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>
<span class="synIdentifier">&lt;compilation </span><span class="synType">debug</span>=<span class="synConstant">&quot;true&quot;</span><span class="synIdentifier"> </span><span class="synType">targetFramework</span>=<span class="synConstant">&quot;4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">web&gt;</span>

<span class="synIdentifier">&lt;system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;handlers&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">name</span>=<span class="synConstant">&quot;WebDAV&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-ISAPI-4.0_32bit&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-ISAPI-4.0_64bit&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-Integrated-4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-ISAPI-4.0_32bit&quot;</span><span class="synIdentifier"> </span><span class="synType">path</span>=<span class="synConstant">&quot;*.&quot;</span><span class="synIdentifier"> </span><span class="synType">verb</span>=<span class="synConstant">&quot;GET,HEAD,POST,DEBUG,PUT,DELETE,PATCH,OPTIONS&quot;</span><span class="synIdentifier"> </span><span class="synType">modules</span>=<span class="synConstant">&quot;IsapiModule&quot;</span><span class="synIdentifier"> </span><span class="synType">scriptProcessor</span>=<span class="synConstant">&quot;%windir%\Microsoft.NET\Framework\v4.0.30319\aspnet_isapi.dll&quot;</span><span class="synIdentifier"> </span><span class="synType">preCondition</span>=<span class="synConstant">&quot;classicMode,runtimeVersionv4.0,bitness32&quot;</span><span class="synIdentifier"> </span><span class="synType">responseBufferLimit</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-ISAPI-4.0_64bit&quot;</span><span class="synIdentifier"> </span><span class="synType">path</span>=<span class="synConstant">&quot;*.&quot;</span><span class="synIdentifier"> </span><span class="synType">verb</span>=<span class="synConstant">&quot;GET,HEAD,POST,DEBUG,PUT,DELETE,PATCH,OPTIONS&quot;</span><span class="synIdentifier"> </span><span class="synType">modules</span>=<span class="synConstant">&quot;IsapiModule&quot;</span><span class="synIdentifier"> </span><span class="synType">scriptProcessor</span>=<span class="synConstant">&quot;%windir%\Microsoft.NET\Framework64\v4.0.30319\aspnet_isapi.dll&quot;</span><span class="synIdentifier"> </span><span class="synType">preCondition</span>=<span class="synConstant">&quot;classicMode,runtimeVersionv4.0,bitness64&quot;</span><span class="synIdentifier"> </span><span class="synType">responseBufferLimit</span>=<span class="synConstant">&quot;0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;add </span><span class="synType">name</span>=<span class="synConstant">&quot;ExtensionlessUrlHandler-Integrated-4.0&quot;</span><span class="synIdentifier"> </span><span class="synType">path</span>=<span class="synConstant">&quot;*.&quot;</span><span class="synIdentifier"> </span><span class="synType">verb</span>=<span class="synConstant">&quot;GET,HEAD,POST,DEBUG,PUT,DELETE,PATCH,OPTIONS&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span>=<span class="synConstant">&quot;System.Web.Handlers.TransferRequestHandler&quot;</span><span class="synIdentifier"> </span><span class="synType">preCondition</span>=<span class="synConstant">&quot;integratedMode,runtimeVersionv4.0&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/handlers&gt;</span>
<span class="synIdentifier">&lt;modules&gt;</span>
<span class="synIdentifier">&lt;remove </span><span class="synType">name</span>=<span class="synConstant">&quot;WebDAVModule&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/modules&gt;</span>
<span class="synIdentifier">&lt;/system</span><span class="synComment">.</span><span class="synIdentifier">webServer&gt;</span>
<span class="synIdentifier">&lt;/configuration&gt;</span>
</pre><p>さっぱりわかんないけど、WebDAV モジュールを切っておくのがコツみたい。</p>

<ul>
<li><a href="http://bradkingsley.com/putpostdelete-verb-errors-on-site/">PUT/POST/DELETE Verb Errors On Site | ASPNetFAQ.com: What is ASP.NET?</a></li>
</ul><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130113094219.png" alt="f:id:daruyanagi:20130113094219p:plain" title="f:id:daruyanagi:20130113094219p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>手元の環境では、ちゃんと動いたっぽい。</p>
