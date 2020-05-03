---
date: 2017-10-06T09:48:18.0000000
draft: false
title: "Omawari 1.4.0.0：ユーザーインターフェイスを手直ししました"
tags: ["告知", "Omawari"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20171006093047.png" alt="f:id:daruyanagi:20171006093047p:plain" title="f:id:daruyanagi:20171006093047p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>内部的なところはあまりいじらず、今まで放置してたユーザーインターフェイスの改善（？）を行いました。あと、ぬるぽエラーをちまちま殺したり。</p>

<ul>
<li>複数環境での起動を考慮する</li>
<li>各部の名称を整理・わかりやすくする</li>
<li>ローカルフォルダーや親ルールにアクセスするボタンを追加</li>
<li>ログウィンドウに前後移動機能を追加</li>
<li>既存のウィンドウがあれば新規に開かずアクティブにする</li>
<li>New/No Changed ステータスの新設</li>
<li>アプリケーションアイコンの追加</li>
<li>データフォルダーを開くコマンドを新設</li>
<li>ウィンドウを開く位置をオーナーの真ん中に設定（不完全、動いてないかも</li>
</ul><p>日ごろ使っていて不便なところから、互換性をとりながら少しずつ、ね。“個人的にはログの前後移動”や“既存のウィンドウがあれば新規に開かずアクティブにする”なんかの実装に達成感を感じています。たかだか数行ちょろっと書くだけでだいぶ便利になった。でも、そろそろコードの整理しないといろいろあかんなぁ。</p><p>ついでにアプリケーションアイコンを付けたけど、なんとこれ Office の丸パクリ。あんまりよくないので、時間があるときにクラウドワークスあたりでお願いしようかなって思ってます。</p><p>あと、ウチの環境はだんだんデータが肥大化してきていてパフォーマンスが顕著に落ちているので、次はクリーニング機能を付けつつ、データベースへの移行とかも考えようかなーみたな。データ構造ももっとシンプルにできたのなぁー……最初はもっと使い捨てのつもりで作ってたから、あんまり考えてなくてね。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Fdaruyanagi%2FOmawari%2Freleases%2Ftag%2Fv1.4.0.0" title="daruyanagi/Omawari" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/daruyanagi/Omawari/releases/tag/v1.4.0.0">github.com</a></cite><br />
</p>

<div class="section">
<h3>Chocolatey パッケージ化の準備</h3>
<p>実は Chocolatey から簡単にインストールできるようにといろいろ準備をしています。Chocolatey ってのは yum とか apt-get みたいにアプリを入れられるヤツの<br />
Windows 版ですね。Chocolatey のパッケージは、</p>

<ul>
<li>パッケージに全部ファイルを入れちゃう</li>
<li>リモートに置いてあるインストーラーを叩く</li>
</ul><p>という2パターンで作れるので、最初は ZIP 版をベースに前者のパッケージを作っていたのですが、いろいろお約束事をクリアするのが面倒……ライセンスファイルとかいろいろもろもろ。後者はそういうのが要らないっぽいので、前バージョンから ClickOnce を用意しています。次回辺りはちゃんと申請を通したい。</p><p><a href="https://yanagi.blob.core.windows.net/clickonce-omawari/setup.exe">https://yanagi.blob.core.windows.net/clickonce-omawari/setup.exe</a></p><p>ついでにスクリプトでリリースパッケージ（ZIP）と Azure Blob へのアップロードも PowerShell で行うようにしてみました。毎回手でやんの鬱陶しくなってきたしね。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synComment"># Add-AzureAccount</span>

<span class="synIdentifier">$StorageAccountName</span> = <span class="synConstant">&quot;yanagi&quot;</span>
<span class="synIdentifier">$StorageAccountKey</span> = <span class="synConstant">&quot;***&quot;</span>
<span class="synIdentifier">$ContainerName</span> = <span class="synConstant">&quot;clickonce-omawari&quot;</span>

<span class="synIdentifier">$binRootDirectory</span>     = <span class="synConstant">&quot;C:\Users\Hideto\GitHub\Omawari\Omawari\bin&quot;</span>
<span class="synIdentifier">$publishRootDirectory</span> = <span class="synConstant">&quot;C:\Users\Hideto\GitHub\Omawari\Omawari\Publish&quot;</span>

<span class="synStatement">function</span> <span class="synIdentifier">New-ReleaseArchive</span> {
[cmdletbinding()]
<span class="synStatement">param</span>(
<span class="synIdentifier">$rootDirectory</span>,
<span class="synIdentifier">$Force</span>
)

<span class="synIdentifier">$releaseDirectory</span> = <span class="synStatement">Join-Path</span> <span class="synIdentifier">$rootDirectory</span> <span class="synConstant">&quot;Release&quot;</span>
<span class="synIdentifier">$version</span> = (<span class="synStatement">Get-ItemProperty</span> (<span class="synStatement">Join-Path</span> <span class="synIdentifier">$releaseDirectory</span> <span class="synConstant">&quot;Omawari.exe&quot;</span>)).VersionInfo.FileVersion
<span class="synIdentifier">$destinationPath</span> = <span class="synStatement">Join-Path</span> <span class="synIdentifier">$rootDirectory</span> Omawari-<span class="synIdentifier">$version</span>.zip
<span class="synStatement">Compress-Archive</span> -Path <span class="synIdentifier">$releaseDirectory</span>/* -DestinationPath <span class="synIdentifier">$destinationPath</span> -Force:<span class="synIdentifier">$Force</span>
<span class="synStatement">Invoke-Item</span> <span class="synIdentifier">$rootDirectory</span>
}

<span class="synStatement">function</span> <span class="synIdentifier">Upload-FileToAzureStorageContainer</span> {
[cmdletbinding()]
<span class="synStatement">param</span>(
<span class="synIdentifier">$StorageAccountName</span>,
<span class="synIdentifier">$StorageAccountKey</span>,
<span class="synIdentifier">$ContainerName</span>,
<span class="synIdentifier">$rootDirectory</span>,
<span class="synIdentifier">$Force</span>
)

<span class="synIdentifier">$context</span> = <span class="synStatement">New-AzureStorageContext</span> -StorageAccountName <span class="synIdentifier">$StorageAccountName</span> -StorageAccountKey <span class="synIdentifier">$StorageAccountKey</span>
<span class="synIdentifier">$container</span> = <span class="synStatement">Get-AzureStorageContainer</span> -Name <span class="synIdentifier">$ContainerName</span> -Context <span class="synIdentifier">$context</span>

<span class="synIdentifier">$container</span>.CloudBlobContainer.Uri.AbsoluteUri
<span class="synStatement">if</span> (<span class="synIdentifier">$container</span>) {
<span class="synIdentifier">$filesToUpload</span> = <span class="synStatement">Get-ChildItem</span> <span class="synIdentifier">$rootDirectory</span> -Recurse -File

<span class="synStatement">foreach</span> (<span class="synIdentifier">$x</span> <span class="synStatement">in</span> <span class="synIdentifier">$filesToUpload</span>) {
<span class="synIdentifier">$targetPath</span> = (<span class="synIdentifier">$x</span>.fullname.Substring(<span class="synIdentifier">$rootDirectory</span>.Length + <span class="synConstant">1</span>)).Replace(<span class="synConstant">&quot;\&quot;</span>, <span class="synConstant">&quot;/&quot;</span>)

<span class="synStatement">Write-Verbose</span> <span class="synConstant">&quot;Uploading </span><span class="synSpecial">$(</span><span class="synConstant">&quot;\&quot;</span> + <span class="synIdentifier">$x</span><span class="synType">.fullname.Substring</span>(<span class="synIdentifier">$rootDirectory</span><span class="synType">.Length</span> + <span class="synConstant">1</span>)<span class="synSpecial">)</span><span class="synConstant"> to </span><span class="synSpecial">$(</span><span class="synIdentifier">$container</span><span class="synType">.CloudBlobContainer.Uri.AbsoluteUri</span> + <span class="synConstant">&quot;/&quot;</span> + <span class="synIdentifier">$targetPath</span><span class="synSpecial">)</span><span class="synConstant">&quot;</span>
<span class="synStatement">Set-AzureStorageBlobContent</span> -File <span class="synIdentifier">$x</span>.fullname -Container <span class="synIdentifier">$container</span>.Name -Blob <span class="synIdentifier">$targetPath</span> -Context <span class="synIdentifier">$context</span> -Force:<span class="synIdentifier">$Force</span> | <span class="synStatement">Out-Null</span>
}
}
}

<span class="synStatement">New-ReleaseArchive</span> `
-rootDirectory <span class="synIdentifier">$binRootDirectory</span> `
-Force <span class="synConstant">$true</span>

<span class="synStatement">Upload-FileToAzureStorageContainer</span> `
-StorageAccountName <span class="synIdentifier">$StorageAccountName</span> `
-StorageAccountKey <span class="synIdentifier">$StorageAccountKey</span> `
-ContainerName <span class="synIdentifier">$ContainerName</span> `
-rootDirectory <span class="synIdentifier">$publishRootDirectory</span> `
-Verbose
</pre><p>リリースビルドや ClickOnce の発行も自動化すればいいのかもだけど、途中でコケたときにいろいろぐちゃぐちゃになるのが嫌だったので、もう少しいろいろわかってから挑戦しようかなって感じです。msbuild とかイマイチようわからんしね……（← いろいろエラーが出て困っている顔</p>

</div>