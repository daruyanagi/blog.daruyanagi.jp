---
date: 2015-11-28T16:19:08.0000000
draft: false
title: "OneDrive を強制的に再起動・同期させる"
tags: ["OneDrive"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20151128161611.png" alt="f:id:daruyanagi:20151128161611p:plain" title="f:id:daruyanagi:20151128161611p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>諸事情あって OneDrive と Dropbox を併用しているのだけど、どうも OneDrive の同期がたまにとまるので、バッチ書いてみた。</p>
<pre class="code lang-sh" data-lang="sh" data-unlink>@<span class="synStatement">echo</span><span class="synConstant"> off</span>
taskkill /f /im onedrive.exe
<span class="synStatement">start</span> %USERPROFILE%\AppData\Local\Microsoft\OneDrive\OneDrive.exe /background
</pre><p>今のところ問題はない気がする。</p>
