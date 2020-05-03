---
date: 2013-01-17T06:57:07.0000000
draft: false
title: "Google Chart を使った数式ツールを作ってみた（3）"
tags: ["C#", "WPF"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130115205946.png" alt="f:id:daruyanagi:20130115205946p:plain" title="f:id:daruyanagi:20130115205946p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

<blockquote cite="https://blog.daruyanagi.jp/entry/2013/01/15/210406">
<p>ネスト（入れ子）が認識できない。あと、［Shift］+［Tab］キーで逆向きに移動したいけれど、これがなかなかめんどくさい。{} だけじゃなくて () にも対応させたい、なんて考えだすと破たんするのが目に見えてるし。</p><p>というわけで、解決策は正規表現か、構文解析かって感じなんだけど。正規表現も大変だし、しかも限界が見えているので、ここは頑張って簡単な構文解析をするべきかと思っている。</p>

<cite><a href="https://blog.daruyanagi.jp/entry/2013/01/15/210406">Google Chart &#x3092;&#x4F7F;&#x3063;&#x305F;&#x6570;&#x5F0F;&#x30C4;&#x30FC;&#x30EB;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F;&#xFF08;2&#xFF09; - &#x3060;&#x308B;&#x308D;&#x3050;</a></cite>
</blockquote>
<p>構文解析というか、対応する { と } をペアにして、その出現位置をメモる方向で考えてみた。括弧の種類が増えていけば破たんするけれど、とりあえず最初は動けばいいや。アルゴリズムは、</p>

<ul>
<li>テキストを先頭から一文字ずつ取り出して、</li>
<li>{ だったら [i, ?] をリストに保存。（i は { の出現位置、? は } の位置を保存するプレースホルダ）</li>
<li>} だったら最後の ? へ出現位置を保存。</li>
<li>これを文末まで繰り返す。</li>
</ul><p>みたいな感じ。大雑把に言えば、{ は前から詰めて、} は後ろから詰める、と。</p><p>たとえば、</p>

<table>
<tr>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>8</td>
<td>9</td>
<td>10</td>
<td>11</td>
<td>12</td>
<td>13</td>
<td>14</td>
<td>15</td>
</tr>
<tr>
<td>\</td>
<td>f</td>
<td>r</td>
<td>a</td>
<td>c</td>
<td>{</td>
<td>\</td>
<td>f</td>
<td>r</td>
<td>a</td>
<td>c</td>
<td>{</td>
<td>}</td>
<td>{</td>
<td>}</td>
<td>}</td>
</tr>
</table><p>だったら、</p>

<table>
<tr>
<td>{ の出現位置</td>
<td>（対応する）} の出現位置</td>
</tr>
<tr>
<td>5</td>
<td>15</td>
</tr>
<tr>
<td>11</td>
<td>12</td>
</tr>
<tr>
<td>13</td>
<td>14</td>
</tr>
</table><p>こういうリストを得るのがゴールになるかな。もしかしたら再帰でイケるのかな？　と思ったけど、よくわかんなかったので素直に for を使って書くことにした。あと、? には text.Length - 1 を突っ込んでおいた。int? にして null をプレースホルダにしてもよかったのだけれど、ちょっとめんどくさいかな、と思って。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> Dictionary&lt;<span class="synType">int</span>, <span class="synType">int</span>&gt; BuidBracketIndo(<span class="synType">string</span> text)
{
var result = <span class="synStatement">new</span> Dictionary&lt;<span class="synType">int</span>, <span class="synType">int</span>&gt;();
var last_index = text.Length - <span class="synConstant">1</span>;

<span class="synStatement">for</span> (<span class="synType">int</span> i = <span class="synConstant">0</span>; i &lt;= last_index; i++)
{
<span class="synStatement">switch</span> (text[i])
{
<span class="synStatement">case</span> <span class="synConstant">'{'</span>:
result.Add(i, last_index);
<span class="synStatement">break</span>;
<span class="synStatement">case</span> <span class="synConstant">'}'</span>:
<span class="synStatement">try</span>
{
var item = result.Last(_ =&gt; _.Value == last_index);
result[item.Key] = i;
}
<span class="synStatement">catch</span> { }
<span class="synStatement">break</span>;
}
}

<span class="synStatement">return</span> result;
}
</pre><p>これを TextChanged イベントで呼んで括弧の対応位置情報を毎回リフレッシュし、［Tab］キーの入力時に利用する。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synComment">// 「\frac{}{}」（分数の TeX 表現）を挿入する。</span>
<span class="synComment">// 挿入後は［Tab］キーの押し下げを一度行い、</span>
<span class="synComment">// 最初の {} の間にキャレットを移動させる</span>
<span class="synType">private</span> <span class="synType">void</span> Button_Click_4(<span class="synType">object</span> sender, RoutedEventArgs e)
{
<span class="synComment">// 途中でFormulaText.SelectionStart == 0 になってしまう（？）ので</span>
<span class="synComment">// キャレット位置を保存しておく</span>
var start = FormulaText.SelectionStart;
FormulaText.Text = FormulaText.Text
.Remove(start, FormulaText.SelectionLength)
.Insert(start, <span class="synSpecial">@</span><span class="synConstant">&quot;\frac{}{}&quot;</span>);
FormulaText.Focus();
FormulaText.SelectionStart = start;

<span class="synComment">// ［Tab］キーの押し下げをエミュレート</span>
var tab_key_down_event_args = <span class="synStatement">new</span> KeyEventArgs(
Keyboard.PrimaryDevice,
PresentationSource.FromVisual(FormulaText),
(<span class="synType">int</span>)DateTime.Now.Ticks,
Key.Tab
);
tab_key_down_event_args.RoutedEvent = Keyboard.PreviewKeyDownEvent;
FormulaText_PreviewKeyDown(sender, tab_key_down_event_args);
}

<span class="synComment">// 括弧の位置情報： TextChanged イベントでリフレッシュされる</span>
<span class="synType">private</span> Dictionary&lt;<span class="synType">int</span>, <span class="synType">int</span>&gt; brackets = <span class="synConstant">null</span>;

<span class="synComment">// キーの押し下げイベントを処理</span>
<span class="synType">private</span> <span class="synType">void</span> FormulaText_PreviewKeyDown(<span class="synType">object</span> sender, KeyEventArgs e)
{
<span class="synStatement">switch</span> (e.Key)
{
<span class="synStatement">case</span> Key.Tab:
<span class="synStatement">try</span>
{
<span class="synComment">/* ［Tab］キーで次のブラケット内へ進む */</span>
<span class="synStatement">if</span> ((Keyboard.Modifiers &amp; ModifierKeys.Shift) != ModifierKeys.Shift)
{
var b = brackets.First(_ =&gt; FormulaText.SelectionStart &lt; _.Key);
FormulaText.SelectionStart = b.Key + <span class="synConstant">1</span>;
FormulaText.SelectionLength = b.Value - b.Key - <span class="synConstant">1</span>;
}
<span class="synComment">/* ［Shift］＋［Tab］キーで前のブラケット内へ戻る */</span>
<span class="synStatement">else</span>
{
var b = brackets.Last(_ =&gt; _.Key &lt; FormulaText.SelectionStart - <span class="synConstant">1</span>);
FormulaText.SelectionStart = b.Key + <span class="synConstant">1</span>;
FormulaText.SelectionLength = b.Value - b.Key - <span class="synConstant">1</span>;
}
}
<span class="synStatement">catch</span>
{
<span class="synComment">/* 不正な操作を行ったらビープ音を鳴らす */</span>
System.Media.SystemSounds.Beep.Play();
}
<span class="synStatement">finally</span>
{
e.Handled = <span class="synConstant">true</span>; <span class="synComment">// イベントを握りつぶす！</span>
}
<span class="synStatement">break</span>;

<span class="synStatement">case</span> Key.Escape:
<span class="synComment">/* 選択状態を解除する */</span>
FormulaText.SelectionLength = <span class="synConstant">0</span>;
<span class="synStatement">break</span>;
}
}
</pre><p>ついでに［Esc］キーで選択を解除できるようにしておいた。手元ではちゃんと動いている気がするけど、もう少し様子を見てから、アイコンなんかをつけて公開しようかと思う。</p>

<div class="section">
<h3>追記</h3>
<p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-291670265044295681');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('291670265044295681',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-291670265044295681"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-291671521745846272');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('291671521745846272',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-291671521745846272"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-291672851386351616');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('291672851386351616',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-291672851386351616"></div><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-291673084769992704');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('291673084769992704',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-291673084769992704"></div></p><p>ご指摘感謝！　ブログの方はそのままにしておくので適当に読み直してください。List&lt;KeyValuePair&lt;int,int&gt;&gt; に書き換えればいいんですよね？</p>

</div>