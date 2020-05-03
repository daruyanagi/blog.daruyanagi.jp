---
date: 2017-04-02T01:35:53.0000000
draft: false
title: "Google Search Console から“「404」ページの増加”というメールが来た"
tags: ["はてなブログ"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170402011929.png" alt="f:id:daruyanagi:20170402011929p:plain" title="f:id:daruyanagi:20170402011929p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>(゜レ゜)！</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170402012135.png" alt="f:id:daruyanagi:20170402012135p:plain" title="f:id:daruyanagi:20170402012135p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>確かにめっちゃ増えてる。これはヤバい。</p>

<blockquote cite="http://blog.daruyanagi.jp/entry/2017/03/26/234347">
<p>というわけで、daruyanagi.jp/entry、daruyanagi.jp/archive、daruyanagi.jp/about へのリクエストをそのまま blog.daruyanagi.jp の各ディレクトリへリダイレクトすればよさそう。</p>

<cite><a href="http://blog.daruyanagi.jp/entry/2017/03/26/234347">&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;&#x306E;&#x30C9;&#x30E1;&#x30A4;&#x30F3;&#x3092; daruyanagi.jp &#x304B;&#x3089; blog.daruyanagi.jp &#x3078;&#x5F15;&#x8D8A;&#x3057;&#x3057;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>これでは少し足りなかったみたいですね。いろいろ調査した結果</p>

<ul>
<li>/entry</li>
<li>/archive</li>
<li>/about</li>
<li><b>/category</b></li>
<li><b>/entries</b></li>
<li><b>/search</b></li>
<li><b>/touch</b></li>
<li><b>/embed</b></li>
</ul><p>PC 向けでは下の5つが足りなかったみたいです。同じようなリダイレクトページを足して解決。</p>

<ul>
<li>/mobile</li>
<li>/m</li>
</ul><p>モバイルでこいつらもエラーになるのですが、こいつらはリダイレクトしても はてなブログ でエラーになるので、何かやり方が間違ってるかも。まぁ、いいや。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20170402013419.png" alt="f:id:daruyanagi:20170402013419p:plain" title="f:id:daruyanagi:20170402013419p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ちょっとっだけエラー減ってきたかなぁ。当分はこれで様子見です。</p>
