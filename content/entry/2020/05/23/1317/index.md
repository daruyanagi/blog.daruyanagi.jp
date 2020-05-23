---
title: "選択テキストを Markdown の引用としてコピーするブックマークレット"
date: 2020-05-23T13:17:30+09:00
draft: false
tags: ["JavaScript"]
eyecatch: 
---
[前回の試み](https://blog.daruyanagi.jp/entry/2020/05/23/1142/)が比較的うまくいったようで、少し興に乗ってきた。ついでに __選択テキストを Markdown の引用としてコピーする__ というブックマークレットも考えてみた。

```
var lines = document.getSelection().toString().split(/\r\n|\r|\n/);
var s = '';
for (var line of lines) s += `>\t${ line }  \n>\t\n`;
s += `>\t<footer><cite><a href='${ document.URL }'>${ document.title }</a></cite></footer>\n`;

var t = document.createElement("textarea");
t.textContent = s;
var b = document.getElementsByTagName("body")[0];
b.appendChild(t);
t.select();
document.execCommand('copy');
b.removeChild(t);
```

<a href="javascript:(function(){ var lines = document.getSelection().toString().split(/\r\n|\r|\n/); var s = ''; for (var line of lines) s += `>\t${ line }  \n>\t\n`; s += `>\t<footer><cite><a href='${ document.URL }'>${ document.title }</a></cite></footer>\n`; var t = document.createElement('textarea'); t.textContent = s; var b = document.getElementsByTagName('body')[0]; b.appendChild(t); t.select(); document.execCommand('copy'); b.removeChild(t); })()">選択テキストを Markdown の引用としてコピーする</a>

試してみた結果。

>	なるほど立派な青い瀬戸の塩壺は置いてありましたが、こんどというこんどは二人ともぎょっとしてお互にクリームをたくさん塗った顔を見合せました。  
>	
>	「どうもおかしいぜ。」  
>	
>	「ぼくもおかしいとおもう。」  
>	
>	<footer><cite><a href='https://www.aozora.gr.jp/cards/000081/files/43754_17659.html'>宮沢賢治 注文の多い料理店</a></cite></footer>

```
<blockquote class="blockquote">
<p>なるほど立派な青い瀬戸の塩壺は置いてありましたが、こんどというこんどは二人ともぎょっとしてお互にクリームをたくさん塗った顔を見合せました。</p>
<p>「どうもおかしいぜ。」</p>
<p>「ぼくもおかしいとおもう。」</p>
  <footer><cite><a href="https://www.aozora.gr.jp/cards/000081/files/43754_17659.html" target="_blank" rel="noopener">宮沢賢治 注文の多い料理店</a></cite></footer>
</blockquote>
```

選択テキストの改行を `br` にするか（文末に半角空白を2つ挿入）、段落とみなして `p` タグで囲うかは人それぞれ、好みかもしれませんね。今回はとりあえず `p` タグで括られるようにして、`br` にしたければ行間を詰めればよいようにしておきました。

`blockquote` と `cite` をどうマークアップすればよいのかは諸説あってわからなかったのですが、一番スタンダードな雰囲気を漂わせている MDN のマークアップを真似てみました。

```
<blockquote cite="https://www.huxley.net/bnw/four.html">
    <p>Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.</p>
    <footer>—Aldous Huxley, <cite>Brave New World</cite></footer>
</blockquote>
```

[<blockquote>: ブロック引用要素 - HTML: HyperText Markup Language | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/blockquote#embed)

`footer` に入っている `—` は CSS で実現する方が好きなので、抜いてあります。`brefore:content` にしておけば、あとから「――」でも「引用元：」でも自由に装飾できますしね










