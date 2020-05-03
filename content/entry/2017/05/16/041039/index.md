---
date: 2017-05-16T04:10:39.0000000
draft: false
title: "Windows 10 Creators Update（1703）で esrv.exe アプリケーションエラー「0xc0000142」が発生する"
tags: ["Windows 10"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170516035953.png" alt="f:id:daruyanagi:20170516035953p:plain" title="f:id:daruyanagi:20170516035953p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Intel Driver Update Utility が悪さをしているらしい。</p>

<blockquote cite="https://answers.microsoft.com/en-us/windows/forum/windows_10-start/esrvexe-application-error-0xc0000142/24302510-82bb-4763-b860-2ad1284780b4">

<ol>
<li>Go to Control Panel (accessible by right clicking your Start Menu button if you are not on the Creators Update, if you are, type Control Panel into Cortana Search)</li>
<li>Open Programs and Features.</li>
<li>Look for Intel Driver Update Utility, if you find it, uninstall it</li>
<li>Reboot</li>
</ol>
<cite><a href="https://answers.microsoft.com/en-us/windows/forum/windows_10-start/esrvexe-application-error-0xc0000142/24302510-82bb-4763-b860-2ad1284780b4">ESRV.EXE Application Error (0xc0000142) - Microsoft Community</a></cite>
</blockquote>
<p>このアンサーではアンインストールして再起動しろと書いてあったけど、うちはとりあえず最新版にして様子見。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170516040844.png" alt="f:id:daruyanagi:20170516040844p:plain" title="f:id:daruyanagi:20170516040844p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>以下の URL から Intel Driver Update Utility の最新版を入手し、ドライバーのアップデートを行う。</p>

<ul>
<li><a href="http://www.intel.com/content/www/us/en/support/detect.html">http://www.intel.com/content/www/us/en/support/detect.html</a></li>
</ul><p>この URL は、Intel Driver Update Utility からもアクセスできる。［Ctrl］＋［Alt］＋［F12］キーを押して Intel Driver Update Utility を起動し、［オプションとサポート］－［サポート］画面を開けばよい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170516040825.png" alt="f:id:daruyanagi:20170516040825p:plain" title="f:id:daruyanagi:20170516040825p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ウチの場合、チップセットとグラフィックスドライバーのアップデートがきてた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170516040734.png" alt="f:id:daruyanagi:20170516040734p:plain" title="f:id:daruyanagi:20170516040734p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170516040740.png" alt="f:id:daruyanagi:20170516040740p:plain" title="f:id:daruyanagi:20170516040740p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>直ってたらいいなー。</p>
