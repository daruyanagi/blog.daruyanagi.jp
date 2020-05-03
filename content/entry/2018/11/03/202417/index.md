---
date: 2018-11-03T20:24:17.0000000
draft: false
title: "PowerShall：VPN 接続をセットアップする"
tags: ["PowerShell"]
eyecatch: 20181103201605.png
---
<p>OS をクリーンアップするたびに GUI で VPN をセットアップするのが面倒くさくなったので、PowerShell でできないかなーと思って少し調べた。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fnasunoblog.blogspot.com%2F2016%2F03%2Fhowto-add-vpn-adaptor-using-powershell.html" title="PowerShell を使ってVPN接続を追加する～Add-VpnConnection | 元「なんでもエンジニ屋」のダメ日記" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://nasunoblog.blogspot.com/2016/03/howto-add-vpn-adaptor-using-powershell.html">nasunoblog.blogspot.com</a></cite></p><p>必要な部分だけ、上記のサイトから拝借、うちの場合［データの暗号化］を“最強の暗号化”にしなきゃいけないので、`AuthenticationMethod` に `Maximum` を指定。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$PreKey</span> = <span class="synConstant">&quot;***&quot;</span>

<span class="synIdentifier">$VpnUrl</span> = <span class="synConstant">&quot;***&quot;</span>
<span class="synIdentifier">$VpnName</span> = <span class="synConstant">&quot;***&quot;</span>

<span class="synStatement">Add-VpnConnection</span> -Name <span class="synIdentifier">$VpnName</span> `
-ServerAddress <span class="synIdentifier">$VpnUrl</span> `
-RememberCredential -L2tpPsk <span class="synIdentifier">$PreKey</span> `
-AuthenticationMethod MSChapv2 `
-EncryptionLevel Maximum `
-TunnelType L2tp `
-Force
</pre><p>これであっさり VPN を追加できたのだけど、うちの環境では `CHAP` プロトコルも有効化しないと繋がらないらしい。ここのチェックボックスね。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20181103200617.png" alt="f:id:daruyanagi:20181103200617p:plain" title="f:id:daruyanagi:20181103200617p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>GUI ではできないのかなぁ、と思い設定後に `C:\Windows\system32\ncpa.cpl` を開いて手動でチェックを入れるスクリプトにしてみたりもしたけど、どうにもかっこ悪いので Twitter で聞いてみたら、幸い返事がいただけた。</p><p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">もうお試しかもしれませんが、-AuthenticationMethod で複数の認証方法をカンマ使って指定したらうまくできます。 <a href="https://t.co/4LsYAR7Ulv">pic.twitter.com/4LsYAR7Ulv</a></p>&mdash; のらねこ！ C95 12/30日曜 東ト27a (@ragemax) <a href="https://twitter.com/ragemax/status/1058674732021645312?ref_src=twsrc%5Etfw">November 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </p><p>ぉ、`AuthenticationMethod` って複数設定できるのか！　ってことでちょい修正。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$PreKey</span> = <span class="synConstant">&quot;***&quot;</span>

<span class="synIdentifier">$VpnUrl</span> = <span class="synConstant">&quot;***&quot;</span>
<span class="synIdentifier">$VpnName</span> = <span class="synConstant">&quot;テスト&quot;</span>

<span class="synStatement">Add-VpnConnection</span> -Name <span class="synIdentifier">$VpnName</span> `
-ServerAddress <span class="synIdentifier">$VpnUrl</span> `
-RememberCredential -L2tpPsk <span class="synIdentifier">$PreKey</span> `
-AuthenticationMethod Chap,MSChapv2 ` <span class="synComment"># ここ</span>
-EncryptionLevel Maximum `
-TunnelType L2tp `
-Force
</pre><p>確かめてみたところ、意図したとおりにチェックボックスがオンになっていた。やったねー！</p><p>ちなみに ID とパスワードを設定するコマンドレットはないとのこと。</p>
<pre class="code" data-lang="" data-unlink>$RasExec = &#34;C:\windows\system32\rasdial.exe&#34;
$VpnUser  = &#34;***&#34;
$VpnPass = &#34;***&#34;

#Add User &amp; Pass
cmd.exe /c $RasExec $VpnName $VpnUser $VpnPass</pre><p>上記サイトでは rasdial.exe を使った解決策が示されていたけど、うちは定期的なパスワード変更が義務付けられている & 1Password で資格情報を生成・管理しているので、バッチファイルにパスワードを書くのはやめた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20181103201605.png" alt="f:id:daruyanagi:20181103201605p:plain" title="f:id:daruyanagi:20181103201605p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>この認証ダイアログで［資格情報を記憶する］とかいうチェックボックスがあれば便利なんだがな―って思ってたけど、1度繋ぐと保存されるのかな？　2回目は聞かれなかった気がする。</p><p>とりあえずテストは完了したので、これを初期化スクリプトに追記して今日のお仕事は終わり。また便利になってしまった。</p>

<div class="section">
<h3>追伸</h3>
<p><blockquote class="twitter-tweet"><p lang="ja" dir="ltr">（もうめんどいからいいや）</p>&mdash; だるやなぎ准将 (@daruyanagi) <a href="https://twitter.com/daruyanagi/status/1058687649286746112?ref_src=twsrc%5Etfw">November 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> </p>

</div>