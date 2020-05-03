---
date: 2017-05-17T07:33:39.0000000
draft: false
title: "PowerShell：環境構築を（なるべく）自動化する"
tags: ["PowerShell"]
eyecatch: 20170517072412.png
---
<p>Windows 10 は［回復］オプションで割と簡単に初期化できるので、なんか調子悪くなったときは気軽にキレイサッパリにしているのだけど、そのあとの環境構築を毎回手動でやるのがいい加減かったるいので、できるだけスクリプトでできんもんかなーと考えてみた。</p><p>ウチは OS をわりとプレーンな状態で使う派なので、実はやることがそんなにないんだけど、それでも以下のことが必要っぽかった。</p>

<ul>
<li>（データは OneDrive で同期する。スタンドアロンアプリもだいたい OneDrive で）</li>
<li>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned</li>
<li>chocolatey で必要なアプリをセットアップ
<ul>
<li>chocolatey で管理できない（するとかえって面倒）なものは OneDrive へ保存済みのインストーラーでセットアップ</li>
</ul></li>
<li>シンボリックリンクを張る
<ul>
<li>Picture\Screenshots -> OneDrive\Screenshots（スクリーンショットを同期するため）</li>
</ul></li>
</ul><p>これだったら自分の PowerShell 力でもなんとかなると思った。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synStatement">Write-Host</span> <span class="synConstant">&quot;STEP 0: Set-ExecutionPolicy を RemoteSigned に書き換えます……&quot;</span>

<span class="synStatement">Set-ExecutionPolicy</span> -ExecutionPolicy RemoteSigned
<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;STEP 1: chocolatey をセットアップしています……&quot;</span>

<span class="synStatement">if</span> (<span class="synStatement">Test-Path</span> <span class="synConstant">&quot;C:\ProgramData\chocolatey&quot;</span>)
{
<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;すでにインストールされています。&quot;</span>
}
<span class="synStatement">else</span>
{
iex ((<span class="synStatement">New-Object</span> System.Net.WebClient).DownloadString(<span class="synConstant">'https://chocolatey.org/install.ps1'</span>))
<span class="synComment"># Get-PackageProvider -name chocolatey</span>
<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;インストールが完了しました。&quot;</span>
}

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;STEP 2: ソフトウェアをインストールしています……&quot;</span>

choco install -y paint.net
choco install -y sizer
choco install -y <span class="synStatement">dotnetcore-sdk</span>
choco install -y visualstudiocode
choco install -y dropbox
choco install -y vlc

<span class="synComment"># Nullsoft Install System</span>
<span class="synStatement">Start-Process</span> -FilePath <span class="synConstant">&quot;</span><span class="synType">$Home</span><span class="synConstant">\OneDrive\Apps\WinSnap_4.5.8-setup.exe&quot;</span> -ArgumentList <span class="synConstant">&quot;/S&quot;</span>
<span class="synComment"># Advanced Installer</span>
<span class="synStatement">Start-Process</span> -FilePath <span class="synConstant">&quot;</span><span class="synType">$Home</span><span class="synConstant">\OneDrive\Apps\emed64_16.7.2.exe&quot;</span> -ArgumentList <span class="synConstant">&quot;/quiet&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;STEP 3: シンボリックリンクを作成しています……&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;Picture\Screenshots -&gt; OneDrive\Screenshots&quot;</span>
<span class="synStatement">Set-Location</span> <span class="synConstant">&quot;</span><span class="synType">$Home</span><span class="synConstant">\Pictures&quot;</span>
<span class="synStatement">Remove-Item</span> <span class="synConstant">&quot;Screenshots&quot;</span>
<span class="synStatement">New-Item</span> -Type SymbolicLink -Path <span class="synConstant">&quot;Screenshots&quot;</span> -Value <span class="synConstant">&quot;</span><span class="synType">$Home</span><span class="synConstant">\OneDrive\Screenshots&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;&quot;</span>

<span class="synStatement">Write-Host</span> <span class="synConstant">&quot;セットアップが終了しました。キーを押すと終了します。&quot;</span>
<span class="synType">$host</span>.UI.ReadLine()
</pre><p>このスクリプトを管理者権限で起動すればよいのだけど、PowerShell のコンテキストメニューには［管理者権限で実行する］コマンドはないんだな。バッチファイルならあるのに。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170517072412.png" alt="f:id:daruyanagi:20170517072412p:plain" title="f:id:daruyanagi:20170517072412p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>――というわけで、スクリプトをキックするためのバッチファイルも書いた。</p>
<pre class="code" data-lang="" data-unlink>@powershell -NoProfile -ExecutionPolicy RemoteSigned -File &#34;C:\Users\Hideto\OneDrive\Initialize.ps1&#34;</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170517072704.png" alt="f:id:daruyanagi:20170517072704p:plain" title="f:id:daruyanagi:20170517072704p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Surface 3 を初期化してテストした後に、デスクトップ PC でも試してみたのだけど、<code>choco install -y dropbox</code> が失敗して面倒くさいことになった<a href="#f-63094833" name="fn-63094833" title="利用したバージョンのオフラインインストーラーがどうにも動かない。Web インストーラーをダウンロード＆実行して解決">*1</a>以外は、割とスムーズにいった。</p><p>実は以前からところどころを自動化していたのだけど、ちゃんとメンテナンスすればいろいろ楽になるかなーと思った。Windows ストアからのインストールもコマンドでできたらいいんだけど……かつて「OneGet」で Windows ストアをプロバイダーにできるようになるとか聞いた覚えがあるんだが、どうなったんだろう。</p>
<div class="footnote">
<p class="footnote"><a href="#fn-63094833" name="f-63094833" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">利用したバージョンのオフラインインストーラーがどうにも動かない。Web インストーラーをダウンロード＆実行して解決</span></p>
</div>