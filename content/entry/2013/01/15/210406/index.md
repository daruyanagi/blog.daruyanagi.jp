---
date: 2013-01-15T21:04:06.0000000
draft: false
title: "Google Chart を使った数式ツールを作ってみた（2）"
tags: ["C#", "WPF"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130115205240.png" alt="f:id:daruyanagi:20130115205240p:plain" title="f:id:daruyanagi:20130115205240p:plain" class="hatena-fotolife" itemprop="image"></span></p><p><a href="https://blog.daruyanagi.jp/entry/2013/01/14/221302">Google Chart &#x3092;&#x4F7F;&#x3063;&#x305F;&#x6570;&#x5F0F;&#x30C4;&#x30FC;&#x30EB;&#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3060;&#x308B;&#x308D;&#x3050;</a> の続き。さすがにもう少し完成度を上げようと思って、</p>

<ul>
<li>数式テキストの新規作成・開く・保存</li>
<li>編集機能（切り取り・コピー・貼り付けなど）</li>
<li>数式イメージのファイル保存・クリップボードへコピー</li>
</ul><p>なんかを、ちびちびと実装。そのうち欲が出てきて、［Tab］キーでブラケット移動なんかもしたいなぁ、と思い始めた。で、とりあえず考えたのかこんなの。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">void</span> FormulaText_PreviewKeyDown(<span class="synType">object</span> sender, KeyEventArgs e)
{
<span class="synStatement">if</span> (e.Key == Key.Tab)
{
e.Handled = <span class="synConstant">true</span>; <span class="synComment">// 握りつぶす！</span>

var text = FormulaText.Text;
<span class="synType">int</span> start = FormulaText.SelectionStart;
<span class="synType">int</span> end = -<span class="synConstant">1</span>;
FormulaText.SelectionLength = <span class="synConstant">0</span>;

<span class="synStatement">if</span> ((Keyboard.Modifiers &amp; ModifierKeys.Shift) != ModifierKeys.Shift)
{
start = text.IndexOf(<span class="synConstant">'{'</span>, start);
<span class="synStatement">if</span> (start &lt; <span class="synConstant">0</span>) <span class="synStatement">return</span>;
FormulaText.SelectionStart = start + <span class="synConstant">1</span>;

end = text.IndexOf(<span class="synConstant">'}'</span>, FormulaText.SelectionStart);
<span class="synStatement">if</span> (end &lt; <span class="synConstant">0</span>) <span class="synStatement">return</span>;
FormulaText.SelectionLength = end - start - <span class="synConstant">1</span>;
}
<span class="synStatement">else</span> <span class="synComment">// Shift + Tab キー</span>
{

}
}
}
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130115205746.png" alt="f:id:daruyanagi:20130115205746p:plain" title="f:id:daruyanagi:20130115205746p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>適当に書いたのだけど、これでも案外使える感じになった。ただ、</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130115205946.png" alt="f:id:daruyanagi:20130115205946p:plain" title="f:id:daruyanagi:20130115205946p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ネスト（入れ子）が認識できない。あと、［Shift］+［Tab］キーで逆向きに移動したいけれど、これがなかなかめんどくさい。{} だけじゃなくて () にも対応させたい、なんて考えだすと破たんするのが目に見えてるし。</p><p>というわけで、解決策は正規表現か、構文解析かって感じなんだけど。正規表現も大変だし、しかも限界が見えているので、ここは頑張って簡単な構文解析をするべきかと思っている。</p>
