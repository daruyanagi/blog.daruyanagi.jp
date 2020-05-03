---
date: 2014-07-26T03:53:49.0000000
draft: false
title: "WebMatrix 3：サイトをライブタイルに対応させてみた"
tags: ["Internet Explorer", "WebMatrix"]
eyecatch: 20140726031239.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140726031239.png" alt="f:id:daruyanagi:20140726031239p:plain" title="f:id:daruyanagi:20140726031239p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Windows 8.1 で（Windows 8 は切り捨てた）<a href="http://daruyanagi.net/">http://daruyanagi.net/</a> をスタート画面へピン留めすると、こんな感じになるハズ。前々からやってみたかったのだけど、なかなか腰が上がらなかった。</p>

<div class="section">
<h3>用意するもの</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140726033408.png" alt="f:id:daruyanagi:20140726033408p:plain" title="f:id:daruyanagi:20140726033408p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<ul>
<li>browserconfig.xml
<ul>
<li>この名前でなくてもいいが、その場合はメタタグに名前を記述</li>
</ul></li>
<li>通知タイルを定義した XML ファイル
<ul>
<li>browserconfig.xml の notifications 属性に記述。必須ではないが、用意しておくとタイルがくるくる切り替わるようになる</li>
<li>今回はデータベースをもとに Notifications.cshtml で動的に生成</li>
<li>最大5つまで</li>
</ul></li>
<li><code>&lt;meta name="application-name" content="アプリ名"/&gt;</code>
<ul>
<li>レイアウトファイルに一行挿入</li>
<li>browserconfig.xml の内容をメタタグとして埋め込むスタイルもあるが、今回は分離しておく。はてなブログをタイルに対応させる場合は、ヘッダーへメタタグを記述する方式がよさそう</li>
</ul></li>
<li>tiny、square、wide、large の各サイズ向けタイル画像
<ul>
<li>今回は青色に塗りつぶしただけのシンプルなものを用意</li>
<li>タイルの背景に使う tile.jpg も準備しておいた（「画像は .JPG、.GIF、.PNG 形式のファイルであり、容量を 200 KB 未満、サイズを 1024 x 1024 ピクセル未満にする必要があります。」とのこと）</li>
</ul></li>
</ul>
<table>
<tr>
<td>タイルのサイズ	</td>
<td>標準のタイルのサイズ	</td>
<td>最小画像サイズ	</td>
<td>推奨される画像のサイズ</td>
</tr>
<tr>
<td>小サイズ	</td>
<td>70 x 70	</td>
<td>56 x 56	</td>
<td>128 x 128</td>
</tr>
<tr>
<td>普通サイズ	</td>
<td>150 x 150	</td>
<td>120 x 120	</td>
<td>270 x 270</td>
</tr>
<tr>
<td>ワイド サイズ	</td>
<td>310 x 150	</td>
<td>248 x 120	</td>
<td>558 x 270</td>
</tr>
<tr>
<td>大サイズ	</td>
<td>310 x 310	</td>
<td>248 x 248	</td>
<td>558 x 558</td>
</tr>
</table>
</div>
<div class="section">
<h3>browserconfig.xml</h3>
<p>こんな感じで記述</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;browserconfig&gt;</span>
<span class="synIdentifier">&lt;msapplication&gt;</span>
<span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;square70x70logo </span><span class="synType">src</span>=<span class="synConstant">&quot;tiny.png&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;square150x150logo </span><span class="synType">src</span>=<span class="synConstant">&quot;square.png&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;wide310x150logo </span><span class="synType">src</span>=<span class="synConstant">&quot;wide.png&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;square310x310logo </span><span class="synType">src</span>=<span class="synConstant">&quot;large.png&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;TileColor&gt;</span>#007fff<span class="synIdentifier">&lt;/TileColor&gt;</span> // “aliceblue”なんかは使えない鴨
<span class="synIdentifier">&lt;/tile&gt;</span>
<span class="synIdentifier">&lt;notification&gt;</span> // 必須ではない。まずはこれなしで動くかテストすることをお勧め
<span class="synIdentifier">&lt;polling-uri </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Notifications/0&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;polling-uri2 </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Notifications/1&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;polling-uri3 </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Notifications/2&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;polling-uri4 </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Notifications/3&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;polling-uri5 </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Notifications/4&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;frequency&gt;</span>30<span class="synIdentifier">&lt;/frequency&gt;</span> // 30、60、360、720、1440 のいずれか
<span class="synIdentifier">&lt;cycle&gt;</span>1<span class="synIdentifier">&lt;/cycle&gt;</span> // 0 ～ 7 のいずれか
<span class="synIdentifier">&lt;/notification&gt;</span>
<span class="synIdentifier">&lt;/msapplication&gt;</span>
<span class="synIdentifier">&lt;/browserconfig&gt;</span>
</pre><p>cycle 属性の値はこんな感じ。</p>

<ul>
<li>0: (通知が 1 つだけの場合の既定値) 循環しません。</li>
<li>1: (通知が複数ある場合の既定値) すべてのタイルのサイズで通知を循環します。</li>
<li>2: 普通サイズのタイルに対する通知のみを循環します。</li>
<li>3: ワイド タイルに対する通知のみを循環します。</li>
<li>4: 大きいタイルに対する通知のみを循環します。</li>
<li>5: 普通サイズのタイルやワイド タイルに対する通知のみを循環します。</li>
<li>6: 普通サイズのタイルや大きいタイルに対する通知のみを循環します。</li>
<li>7: ワイド タイルや大きいタイルに対する通知のみを循環します。</li>
</ul><p>ちゃんと規定値があるので、めんどくさいなら省いてもいいぐらい。</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/dn455106(v=vs.85).aspx">IE11 &#x3067;&#x306E; Web &#x30B5;&#x30A4;&#x30C8;&#x7528;&#x30AB;&#x30B9;&#x30BF;&#x30E0; &#x30BF;&#x30A4;&#x30EB;&#x306E;&#x4F5C;&#x6210; (Windows)</a></li>
</ul>
</div>
<div class="section">
<h3>Notifications.cshtml</h3>
<p>小・ワイド・大の3つに対応したタイルスキーマを返しておく。テンプレートについては</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/dn456348(v=vs.85).aspx">Internet Explorer 11 &#x3067;&#x306E;&#x30E9;&#x30A4;&#x30D6; &#x30BF;&#x30A4;&#x30EB; &#x30C6;&#x30F3;&#x30D7;&#x30EC;&#x30FC;&#x30C8;&#x306E;&#x9078;&#x629E; (Windows)</a></li>
</ul><p>を参照のこと。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink>@{
Response.ContentType = &quot;application/xml&quot;;

dynamic item;

using (var db = Database.Open(“***”))
{
item = db.Query(&quot;SELECT * From ***&quot;)
.ElementAt(UrlData[0].AsInt(0));
}
}
<span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;visual </span><span class="synType">lang</span>=<span class="synConstant">&quot;en-US&quot;</span><span class="synIdentifier"> </span><span class="synType">version</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare150x150PeekImageAndText04&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;name&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@App.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>@item.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>

<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileWide310x150SmallImageAndText04&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;logo&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@App.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>@item.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>

<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare310x310ImageAndTextOverlay02&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;logo&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@App.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>@item.Title<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>
<span class="synIdentifier">&lt;/visual&gt;</span>
<span class="synIdentifier">&lt;/tile&gt;</span>
</pre><p><a href="http://daruyanagi.net/Notifications/0">http://daruyanagi.net/Notifications/0</a> を叩くと</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;visual </span><span class="synType">lang</span>=<span class="synConstant">&quot;en-US&quot;</span><span class="synIdentifier"> </span><span class="synType">version</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare150x150PeekImageAndText04&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;name&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@daruyanagi<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Surface Pro 3：COM Surrogate や Peer Name Resolution Protcol が妙にリソースを食っている<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>

<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileWide310x150SmallImageAndText04&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;logo&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@daruyanagi<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Surface Pro 3：COM Surrogate や Peer Name Resolution Protcol が妙にリソースを食っている<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>

<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare310x310ImageAndTextOverlay02&quot;</span><span class="synIdentifier"> </span><span class="synType">branding</span>=<span class="synConstant">&quot;logo&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;http://daruyanagi.net/Tile.jpg&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>@daruyanagi<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Surface Pro 3：COM Surrogate や Peer Name Resolution Protcol が妙にリソースを食っている<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>
<span class="synIdentifier">&lt;/visual&gt;</span>
<span class="synIdentifier">&lt;/tile&gt;</span>
</pre><p>が返る。branding 属性はタイル左下に表示される項目を指定するもので、規定は name のようだ。logo にしておくと favicon が表示される。</p><p>これで準備は完了のはず。</p>

</div>
<div class="section">
<h3>注意する点。</h3>

<ul>
<li>画像へのパスが間違ってるとライブタイルは更新されない</li>
<li>パスの指定はドメインを含めたすべてを指定しなければならないようだ</li>
<li>タイルの version 1 は要らない</li>
<li>フォールバック（fallback）属性を書くと、ライブタイルは動作しない</li>
</ul><p>とくに最後の項目は <a href="http://msdn.microsoft.com/ja-jp/library/hh761491.aspx">&#x30BF;&#x30A4;&#x30EB; &#x30C6;&#x30F3;&#x30D7;&#x30EC;&#x30FC;&#x30C8; &#x30AB;&#x30BF;&#x30ED;&#x30B0; (Windows &#x30E9;&#x30F3;&#x30BF;&#x30A4;&#x30E0; &#x30A2;&#x30D7;&#x30EA;) - Windows app development</a> からコードをコピペした場合に注意。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;visual&gt;</span>
<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquarePeekImageAndText02&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;image1&quot;</span><span class="synIdentifier"> </span><span class="synType">alt</span>=<span class="synConstant">&quot;alt text&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>Text Field 1 (larger text)<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Text Field 2<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>
<span class="synIdentifier">&lt;/visual&gt;</span>
<span class="synIdentifier">&lt;/tile&gt;</span>

<span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;visual </span><span class="synType">version</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare150x150PeekImageAndText02&quot;</span><span class="synIdentifier"> </span><span class="synType">fallback</span>=<span class="synConstant">&quot;TileSquarePeekImageAndText02&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;image1&quot;</span><span class="synIdentifier"> </span><span class="synType">alt</span>=<span class="synConstant">&quot;alt text&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>Text Field 1 (larger text)<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Text Field 2<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>
<span class="synIdentifier">&lt;/visual&gt;</span>
<span class="synIdentifier">&lt;/tile&gt;</span>
</pre><p>これをコピペしても動かない。正しくはこんな感じ。</p>
<pre class="code lang-xml" data-lang="xml" data-unlink><span class="synIdentifier">&lt;tile&gt;</span>
<span class="synIdentifier">&lt;visual </span><span class="synType">version</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;binding </span><span class="synType">template</span>=<span class="synConstant">&quot;TileSquare150x150PeekImageAndText02&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;image </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier"> </span><span class="synType">src</span>=<span class="synConstant">&quot;image1&quot;</span><span class="synIdentifier"> </span><span class="synType">alt</span>=<span class="synConstant">&quot;alt text&quot;</span><span class="synIdentifier">/&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;1&quot;</span><span class="synIdentifier">&gt;</span>Text Field 1 (larger text)<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;text </span><span class="synType">id</span>=<span class="synConstant">&quot;2&quot;</span><span class="synIdentifier">&gt;</span>Text Field 2<span class="synIdentifier">&lt;/text&gt;</span>
<span class="synIdentifier">&lt;/binding&gt;</span>
<span class="synIdentifier">&lt;/visual&gt;</span>
<span class="synIdentifier">&lt;/tile&gt;</span>
</pre>
</div>