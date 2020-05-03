---
date: 2014-07-17T04:53:21.0000000
draft: false
title: "WebMatrix：キーワード &#39;file access retry timeout&#39; はサポートされていません。"
tags: ["WebMatrix"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140717044635.png" alt="f:id:daruyanagi:20140717044635p:plain" title="f:id:daruyanagi:20140717044635p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>WebMatrix.Data.Database.Open(<span class="synConstant">&quot;MYDB&quot;</span>);
</pre><p>ローカルと Azure ではイケるのに、ExpressWeb では WebMatrix.Data.DatabaseOpen() が失敗する件について。</p>

<div class="section">
<h3>解決策その一</h3>

<blockquote cite="http://erikej.blogspot.jp/2012/03/sql-server-compact-40-sp1-ctp1.html">
<p>New connection string keyword: “File Access Retry Timeout” – will reattempt connection open from 0 – 30 seconds, with a default value of 0.</p>

<cite><a href="http://erikej.blogspot.jp/2012/03/sql-server-compact-40-sp1-ctp1.html">Everything SQL Server Compact: SQL Server Compact 4.0 SP1 CTP1 available</a></cite>
</blockquote>
<p>SQL Server Compact 4.0 SP1 CTP1 で追加された要素らしいので、それ以前のバージョンを利用する。</p>

</div>
<div class="section">
<h3>解決策その二</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink>WebMatrix.Data.Database.OpenConnectionString(
<span class="synConstant">&quot;Data Source=|DataDirectory|</span><span class="synSpecial">\\</span><span class="synConstant">MYDB.sdf&quot;</span>,
<span class="synConstant">&quot;System.Data.SqlServerCe.4.0&quot;</span>
);
</pre><p>.NET Framework データ プロバイダーを指定して、接続文字列で開く。</p>

<ul>
<li><a href="http://stackoverflow.com/questions/11299263/file-access-retry-timeout-asp-net-webpages-razor-c">File access retry timeout (ASP.NET WebPages/Razor/C#) - Stack Overflow</a></li>
</ul>
</div>