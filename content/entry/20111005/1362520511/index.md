---
date: 2011-10-05T06:55:11.0000000
draft: false
title: "BlackbirdPie 1.4, StringSupport 1.4, DateTimeSupport 1.2"
tags: ["未分類"]
eyecatch: 
---
<p>気に入らない所があったので、修正・更新しました。ちょっとは使ってくれている人がいるみたいなのに、自分勝手にコロコロ仕様変更してごめんなさいデス。</p>

<div class="section">
<h4>[DateTimeSupport - 1.2](<a href="http://nuget.org/List/Packages/DateTimeSupport">http://nuget.org/List/Packages/DateTimeSupport</a>)</h4>
<p>1.  enum Locale を追加。BlackbirdPie のLocalesはこちらに移しました。仕様がコロコロ変わってごめんなさい。</p>

</div>
<div class="section">
<h4>[StringSupport - 1.4](<a href="http://nuget.org/List/Packages/StringSupport">http://nuget.org/List/Packages/StringSupport</a>)</h4>
<p>1.  ExpandUrl() を追加。短縮URLを引数に与えると、それを展開して返します。簡単なエラー処理も追加。</p><p>2.  Linkfy() で mailto: にもリンクを貼るように変更。メールアドレスの正規表現はふいんき（なぜか変換できない）であって、正確な正規表現は Perl の偉い人に聞くのがいいと思います。 ftp:// にも一応対応。</p><p>3.  一部メソッド名の変更。すみません、もうしません。</p>

</div>
<div class="section">
<h4>[BlackBirdPie - 1.4](<a href="http://nuget.org/List/Packages/BlackbirdPie">http://nuget.org/List/Packages/BlackbirdPie</a>)</h4>
<p>1.  DateTimeSupport (1) を参照。</p><p>2.  StringSupport (3) に対応。</p>

</div>
<div class="section">
<h4>NuGet 公開用のバッチファイル</h4>
<p>バッチファイルとか苦手なんですけど、こんな感じにしてみました。</p><p>	for /r %%x in (*.nuspec) do nuget pack "%%x"<br />
for /r %%y in (*.nupkg) do nuget push -source <a href="http://packages.nuget.org/v1/">http://packages.nuget.org/v1/</a> %%y {Hash}<br />
for /r %%z in (*.nupkg) do del %%z</p><p><code>NuGet.exe</code> と <code>*.nuspec</code> （1つだけ！）を同じフォルダにおいてバッチファイルを叩くと、いい感じに更新できました。</p>

</div>
<div class="section">
<h4>オープンソース</h4>
<p><a href="http://blog.daruyanagi.net/archives/280/sshot-3" rel="attachment wp-att-283"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/10/sshot-3-500x378.png" alt="" title="sshot-3" width="500" height="378" class="alignnone size-medium wp-image-283" /></a></p><p>[daruyanagi's Profile - GitHub](<a href="https://github.com/daruyanagi">https://github.com/daruyanagi</a>)</p><p>Github のアカウントを取りました。ソースコードを自由に閲覧できます。「おめえ、なにこのくっせえコード！」と思う人は自由に直してください。</p>

</div>