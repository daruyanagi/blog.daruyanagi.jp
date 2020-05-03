---
date: 2012-12-07T11:28:35.0000000
draft: false
title: "Microsoft アカウントでサインインした Windows 8 で、異なるアカウントの SkyDrive を同期させる"
tags: ["Windows 8"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20120713083137.jpg" alt="f:id:daruyanagi:20120713083137j:plain" title="f:id:daruyanagi:20120713083137j:plain" class="hatena-fotolife" itemprop="image"></span></p><p>SkyDrive は 7GB まで無償で利用できるオンラインストレージサービスです。僕の場合、古くから利用しているので特典として 25GB のストレージ容量が与えられています。</p><p>けれど、Windows 8 を導入したときに新しい Microsoft アカウントを作成してしまったため、新規に無償提供される 7GB しか使えなくなりました。SkyDrive アプリを古いアカウントと同期させようとしても、アプリの設定がグレーアウトされてしまっています。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207104727.png" alt="f:id:daruyanagi:20121207104727p:plain" title="f:id:daruyanagi:20121207104727p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>OS のユーザーに紐づけた Microsoft アカウントでしか、同期させてくれないみたい。</p><p>というわけで、<a href="http://www.forest.impress.co.jp/docs/review/20121119_574024.html">&#x7A93;&#x306E;&#x675C; - &#x3010;REVIEW&#x3011;XP&#x306B;&#x3082;&#x5BFE;&#x5FDC;&#x3059;&#x308B;SkyDrive&#x30AF;&#x30E9;&#x30A4;&#x30A2;&#x30F3;&#x30C8;&#x300C;syncDriver&#x300D;</a> を使ってみた。記事では Windows XP で利用できることが推しになっているけれど、ちゃんと Windows 8 にも対応している。</p>

<div class="section">
<h3>ダウンロード</h3>
<p>GIGAZINE 風にいちから手順を説明しようか。わかってる人は読み飛ばしてください。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110345.png" alt="f:id:daruyanagi:20121207110345p:plain" title="f:id:daruyanagi:20121207110345p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="http://syncdriver.com/">http://syncdriver.com/</a> へアクセスして、［Download Now］ボタンからインストーラーをダウンロードして実行する。</p>

</div>
<div class="section">
<h3>インストール<a href="#f1" name="fn1" title="関係ない話だけど、うちのオカンは“いんすとろーる”って言ってる">*1</a></h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110105.png" alt="f:id:daruyanagi:20121207110105p:plain" title="f:id:daruyanagi:20121207110105p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>［Next］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110137.png" alt="f:id:daruyanagi:20121207110137p:plain" title="f:id:daruyanagi:20121207110137p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>利用許諾。"Accept"の方をチェックして、［Next］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110139.png" alt="f:id:daruyanagi:20121207110139p:plain" title="f:id:daruyanagi:20121207110139p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストール先フォルダを指定。そのまま［Next］ボタンを押していい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110145.png" alt="f:id:daruyanagi:20121207110145p:plain" title="f:id:daruyanagi:20121207110145p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストールする機能を選択。そのまま［Next］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110149.png" alt="f:id:daruyanagi:20121207110149p:plain" title="f:id:daruyanagi:20121207110149p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>スタートメニューへの追加。そのまま［Next］ボタンを押す。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110155.png" alt="f:id:daruyanagi:20121207110155p:plain" title="f:id:daruyanagi:20121207110155p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>最後の確認。［Install］ボタンを押せば、インストール処理が始まる。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110729.png" alt="f:id:daruyanagi:20121207110729p:plain" title="f:id:daruyanagi:20121207110729p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストールの完了。この状態で［Finish］ボタンを押せば、「syncDriver」が起動する。</p>

<div class="section">
<h4>旧バージョンの .NET Framework のインストール</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207110852.png" alt="f:id:daruyanagi:20121207110852p:plain" title="f:id:daruyanagi:20121207110852p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>途中、.NET Framework 2.0/3.5 のインストールが求められる場合がある。なくても動作すると思われるけれど、入れておいた方が無難かな。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111019.png" alt="f:id:daruyanagi:20121207111019p:plain" title="f:id:daruyanagi:20121207111019p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>インストール完了後に起動してエラーが出る場合は、「syncDriver」の再インストールを試みよう。やれやれ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207112324.png" alt="f:id:daruyanagi:20121207112324p:plain" title="f:id:daruyanagi:20121207112324p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このアプリは Windows サービス<a href="#f2" name="fn2" title="最近はローカル サービスって呼ぶのか？">*2</a>が同期処理を担当して、アプリがそのフロントエンドになっているみたい。</p>

</div>
</div>
<div class="section">
<h3>使い方</h3>

<div class="section">
<h4>Microsoft アカウントの入力</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111122.png" alt="f:id:daruyanagi:20121207111122p:plain" title="f:id:daruyanagi:20121207111122p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>まず、ログイン。古い方の Microsoft アカウントを入力したぞ。</p>

</div>
<div class="section">
<h4>同期フォルダの選択</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111214.png" alt="f:id:daruyanagi:20121207111214p:plain" title="f:id:daruyanagi:20121207111214p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>余計な部分の少ない、OS 標準の UI に準拠した好感の持てるデザイン。"click to setup root folder"をクリックして、SkyDrive をどのフォルダと同期するかを指定する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111353.png" alt="f:id:daruyanagi:20121207111353p:plain" title="f:id:daruyanagi:20121207111353p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>自分の場合は、ユーザーフォルダに SyDrive2 というフォルダを作成して、それを指定しておいた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111443.png" alt="f:id:daruyanagi:20121207111443p:plain" title="f:id:daruyanagi:20121207111443p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>続けて入力が求められる同期オプションはそのままでいい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111522.png" alt="f:id:daruyanagi:20121207111522p:plain" title="f:id:daruyanagi:20121207111522p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>これで設定は終了。10GB 以上利用していたせいか、同期処理が始まるまでかなりの時間がかかるけれど、のんびりお茶でも飲んで待つ。その間、左ペインにある"Options"をクリックして、追加で設定できるオプションを確認しておく。</p>

</div>
<div class="section">
<h4>同期フォルダにドライブレターを割り当てる</h4>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111707.png" alt="f:id:daruyanagi:20121207111707p:plain" title="f:id:daruyanagi:20121207111707p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>基本的な設定は先ほど現れた同期オプションの内容とあまり変わらない。唯一の違いは、同期フォルダをドライブとしてマウントできる設定があること。これは便利そうだ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207111944.png" alt="f:id:daruyanagi:20121207111944p:plain" title="f:id:daruyanagi:20121207111944p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>試しに S ドライブにしてみた<a href="#f3" name="fn3" title=""S"kydrive なので">*3</a>。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20121207112047.png" alt="f:id:daruyanagi:20121207112047p:plain" title="f:id:daruyanagi:20121207112047p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>プロキシにも対応しているようだ。この機能は地味に要望が多いので、あると喜ぶ人も多そう。</p>

</div>
</div><div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">関係ない話だけど、うちのオカンは“いんすとろーる”って言ってる</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">最近はローカル サービスって呼ぶのか？</span></p>
<p class="footnote"><a href="#fn3" name="f3" class="footnote-number">*3</a><span class="footnote-delimiter">:</span><span class="footnote-text">"S"kydrive なので</span></p>
</div>