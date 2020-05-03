---
date: 2011-08-15T06:52:36.0000000
draft: false
title: "WordPress で Markdown 記法を利用する"
tags: ["未分類"]
eyecatch: 
---
<p><a href="http://blog.daruyanagi.net/wp-content/uploads/2011/08/20110816-071641.jpg"><img src="http://blog.daruyanagi.net/wp-content/uploads/2011/08/20110816-071641.jpg" alt="20110816-071641.jpg" class="alignnone size-full" /></a></p><p>今回のブログは、スマートフォン（iPhone/iPad）からも簡単に更新できるようにしたかったが、HTMLタグの入力が結構面倒臭い。そこで_Markdown for WordPress and bbPress_プラグインを利用して、Markdown記法で記述できるようにしてみた。引用・強調・コード貼り付けが格段に楽になる上、いざとなればHTMLタグを含めることができるので、気張って文法を覚えなくてもいいのがよろしい。</p><p>インストール方法は簡単で、プラグインの新規追加画面で「Markdown」をキーワードに検索、本プラグインがでてきたらそれをインストール・有効にするだけ。_WordPress 3.2.1_で試したところ、今のところうまく動いているようだ。</p><p>さて、ここでしょうもないMarkdownのTipsを紹介。</p><p>ときどき <code><br /></code> を使いたくなる時があるが、Markdownでは改行1つだけ挿入しても期待した動作にはならない。そんなときは、文末に空白を二つ挿入して改行しよう。</p>

<blockquote>
<p>ふるいけや  <br />
かわず おぼれて  <br />
みずのそこ</p>

</blockquote>
<p>どうでしょ？ もしこれができなくて Markdown は糞だ！と思っている人がいたなら、考えを改めていただきたいですね（きりっ 無論、 <code><br /></code> タグを直打ちしても同じ表示が得られる。</p>
