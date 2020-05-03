---
date: 2014-11-04T07:54:49.0000000
draft: false
title: "RemoteIE"
tags: ["Internet Explorer"]
eyecatch: 20141104074707.png
---
<p>今のところ Windows 10 Technical Preview でしか利用できない次期バージョンの Internet Exolorer が、ほかの環境にも提供されることになった。名前は RemoteIE というらしい。</p>

<ul>
<li><a href="http://blogs.msdn.com/b/ie/archive/2014/11/02/announcing-remoteie-test-the-latest-ie-on-windows-mac-os-x-ios-and-android.aspx">MSDN Blogs</a> （はてなは MSDN Blog のタイトルが取れないバグをさっさと直してほしいと思う）</li>
</ul><p>前回は確か Hyper-V で、それ以外にも仮想マシンイメージなんかでも提供されたことがあった気がするが、今回は Microsoft RemoteApp で提供される。デカい OS イメージをわざわざダウンロードせずに済むし、Windows だけでなく、Mac、iOS、Android でも試せる。</p>

<ul>
<li><a href="https://remote.modern.ie/">RemoteIE</a></li>
</ul><p>まず Microsoft アカウントでログインし、RemoteApp クライアントをダウンロード・インストールする。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141104074707.png" alt="f:id:daruyanagi:20141104074707p:plain" title="f:id:daruyanagi:20141104074707p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>対応プラットフォームは以下の通り。</p>

<ul>
<li>Mac</li>
<li>iPhone and iPad</li>
<li>Android</li>
<li>Windows x86</li>
<li>Windows x64</li>
<li>Windows RT</li>
</ul><p>自分は Windows x64 をインストールした。remote.modern.ie で登録した Microsoft アカウントで Remote App クライアントにログインすると、RemoteIE の招待が届いているのでこれを許可すると、RemoteIE が使えるようになる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141104075200.png" alt="f:id:daruyanagi:20141104075200p:plain" title="f:id:daruyanagi:20141104075200p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>うぇーぃ。ほとんどローカルアプリと変わらんぜー。バージョンは 11.0.9860.0。手持ちの Windows 10 環境をぶっ壊してしまったので今は確認できないが、まぁ、たぶん一緒のバージョンだと思う。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20141104075300.png" alt="f:id:daruyanagi:20141104075300p:plain" title="f:id:daruyanagi:20141104075300p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>10分ぐらい放置するとセッションが切られる。また、1時間以上は連続して使えないようだ。</p>
