---
date: 2014-03-20T04:46:52.0000000
draft: false
title: "エラーコード 30088-4 により無償版 OneNote がインストールできない"
tags: ["OneNote", "Microsoft Office"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320040923.png" alt="f:id:daruyanagi:20140320040923p:plain" title="f:id:daruyanagi:20140320040923p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>正規版 Microsoft Office 2013 Home and Bussiness をアンインストールして、無償版の OneNote を試すことにした（無償版の機能制限などを調査するため）。そこでこのようなエラーに遭遇。もしかしたら過去に試用版 Office を利用していて、今回無償版の OneNote を使いたいといったユーザーは遭遇するかもしれない。</p>

<div class="section">
<h3>解決策: Microsoft Office 2013 を「完全に」アンインストールする</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320041423.png" alt="f:id:daruyanagi:20140320041423p:plain" title="f:id:daruyanagi:20140320041423p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>念のため、Microsoft Office Click-to-Run というプロセスが残っているときは事前に殺しておく。この処理は要らないかもしれないが、手元の環境ではこのプロセスが残っているとどうも Fix it の実行にやたら時間がかかるみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320041258.png" alt="f:id:daruyanagi:20140320041258p:plain" title="f:id:daruyanagi:20140320041258p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>次に <a href="http://support.microsoft.com/kb/2739501">How to uninstall Office 2013 or Office 365</a> で Microsoft Fix it を入手し、実行する。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320041730.png" alt="f:id:daruyanagi:20140320041730p:plain" title="f:id:daruyanagi:20140320041730p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>クリーンナップ処理は時間がかかるが、コマンドプロンプトが現れればちゃんと動いているので心配しなくてもよい。途中、Windows Explorer、Internet Explorer、Microsoft Office を閉じるよという警告がでるので、［OK］を押しておく。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320041947.png" alt="f:id:daruyanagi:20140320041947p:plain" title="f:id:daruyanagi:20140320041947p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>完了。</p>

</div>
<div class="section">
<h3>そのほかに遭遇しそうな問題</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320042900.png" alt="f:id:daruyanagi:20140320042900p:plain" title="f:id:daruyanagi:20140320042900p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>一番目につくダウンロードリンクから落とせるのは 32bit 版 OneNote なので、すでに 64bit版 Office がインストールされている場合は共存させることができない。なお、問題になるのは Office が 32bit 版かどうかで、Windows は関係ない。</p>

<table>
<tr>
<td></td>
<td>Windows x86</td>
<td>Windows x64</td>
</tr>
<tr>
<td>Office x86</td>
<td>32bit OneNote が利用可能</td>
<td>32bit OneNote が利用可能</td>
</tr>
<tr>
<td>Office x64</td>
<td>（不可能な組み合わせ）</td>
<td>64bit OneNote が利用可能</td>
</tr>
</table><p>Microsoft は互換性の問題で基本的に 32bit 版 Office を推奨している。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320043238.png" alt="f:id:daruyanagi:20140320043238p:plain" title="f:id:daruyanagi:20140320043238p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>64bit 版の無償 OneNote は“その他のダウンロード オプション”というセクションから入手できる。</p>

</div>
<div class="section">
<h3>おまけ: 無償版の OneNote の制限</h3>
<p>「有償版買ってしまった人はどうするの？」「無償版があるから有償版は買うな！」という話もあるけど、厳密には無償版と有償版は違っていて、さまざまな機能制限があるみたい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140320042153.png" alt="f:id:daruyanagi:20140320042153p:plain" title="f:id:daruyanagi:20140320042153p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>一番の違いは、無償版ではローカル .one ファイルを OneDrive フォルダ以外に保存できないこと。要は「無償版 OneNote ≒ OneDrive（OneNote Online）のクライアント」という位置付けみたい。 クラウド連携しないなら、有償版をどうぞ（業務利用ではクラウド連携が禁止されていることも少なくないと思う）。</p><p>あと、</p>

<blockquote cite="http://pc.watch.impress.co.jp/docs/news/20140318_640070.html">
<p>OneNote 2013デスクトップ版は、これまで有償で、単体では1万円以上していたが、有償版には、SharePointサポート、バージョン履歴、Outlook統合といった機能が付加価値として提供される。無償版は広告表示や期間制限などはないが、学校および個人の利用向けとされており、業務(商用)では利用できない。また、法人向けセキュアストレージであるOneNote for Businessや、SharePoint onlineへの保存、バージョン履歴の記録はできないため、同社では「法人向けには、Office Professional Plus 2013、Office 365 ProPlusに含まれるOneNoteをお勧めいたします」としている。</p>

<cite><a href="http://pc.watch.impress.co.jp/docs/news/20140318_640070.html">&#x6700;&#x65B0;&#x306E;Microsoft OneNote 2013&#x304C;&#x7A81;&#x5982;&#x7121;&#x511F;&#x306B; &#x301C;Mac&#x7248;&#x3082;&#x7121;&#x511F;&#x3067;&#x516C;&#x958B; - PC Watch</a></cite>
</blockquote>
<p>なのだそうだ。Microsoft Office のライセンスはなんか複雑で面倒くさいな。</p>

</div>