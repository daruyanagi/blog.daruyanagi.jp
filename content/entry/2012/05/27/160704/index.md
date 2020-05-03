---
date: 2012-05-27T16:07:04.0000000
draft: false
title: "シリアライズを利用したアプリケーションの設定保存"
tags: ["C#"]
eyecatch: 
---
<p>アプリケーションの設定保存はいくつか方法があるけど、<a class="keyword" href="http://d.hatena.ne.jp/keyword/XML">XML</a><a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA">シリアライズ</a>を使うのが一番楽な気がする。</p>
<pre class="code lang-csharp" data-lang="csharp" data-unlink>var settings = Settings.FromFile();

settings.ToFile();
</pre><p>って感じに使うようにしてみた（<a href="http://daruyanagi.net/Type08ScreenCapture">Type08ScreenCapture - Daruboard</a> のコードの一部）。</p>

<ul>
<li>パブリックフィールドおよびプロパティしか保存されない</li>
<li>引数のないコンストラクタが必要</li>
</ul><p>なのが注意なのかな。</p><p><script src="https://gist.github.com/2802525.js"> </script></p><p>FromFile() では、クラスの設計が変わって<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%B7%A5%EA%A5%A2%A5%E9%A5%A4%A5%BA">シリアライズ</a>がうまくいかなくなったら古い設定ファイルを破棄して、デフォルト値の設定を返すようにしている。ここのところをちゃんとしようと思ったらめんどくさそうなので、あくまでもちょろっとしたアプリを作るときにしか使えないのかもしれない。</p>
