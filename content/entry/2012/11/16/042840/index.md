---
date: 2012-11-16T04:28:40.0000000
draft: false
title: "WebMatrix で数式を表現する（１）"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p><img src="20121116034508.png" alt="f:id:daruyanagi:20121116034508p:plain" title="f:id:daruyanagi:20121116034508p:plain" class="hatena-fotolife"></p><p>まず考えられる方法は <a href="https://developers.google.com/chart/?hl=ja">Google Chart Tools &mdash; Google Developers</a> を利用することです。TeX の数式を画像ファイルに変換してくれます。</p>

<ul>
<li><a href="https://developers.google.com/chart/infographics/docs/formulas">Mathematical Formulas - Infographics (Deprecated) &mdash; Google Developers</a></li>
</ul><p>Deprecated（非推奨）になっているのが気になりますけれど、まぁ、使えなくなるまで使えばいいんじゃないでしょうか。TeX による数式表現は業界標準（？）でもあるんで、万が一使えなくなってもいろいろ対処法はあるかと。あと、はてな記法でも使えるので覚えておくと使うことがあるかもしれない。</p><p>必要なパラメーターは、</p>

<ul>
<li>cht=tx</li>
<li>chl=DATA</li>
</ul><p>で、DATA は TeX による数式表現を URL エンコードしたものになります。たとえばこんな感じ。</p><p><img src="20121116035411.png" alt="f:id:daruyanagi:20121116035411p:plain" title="f:id:daruyanagi:20121116035411p:plain" class="hatena-fotolife"></p>
<pre class="code lang-html" data-lang="html" data-unlink># Default.cshtml

@{

}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">img</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;http://chart.apis.google.com/chart?cht=tx&amp;chl=@UrlEncode(@&quot;</span><span class="synIdentifier">\bar{H}_{n+2}(x) =</span><span class="synConstant"> \sqrt{\frac{2}{n+2}}</span><span class="synIdentifier"> x \bar{H}_{n+1}(x) \sqrt{\frac{n+1}{n+2}} \bar{H}_n(x)</span><span class="synConstant">&quot;);&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>まぁ、 \bar{H}_{n+2}(x) = \sqrt{\frac{2}{n+2}} x \bar{H}_{n+1}(x) \sqrt{\frac{n+1}{n+2}} \bar{H}_n(x) なんてスラスラ書くのは無理だけど、自分の場合、</p>

<ul>
<li>\hoge：文字 hoge の埋め込み（\alpha で α）</li>
<li>\hoge{}：引数をとって hoge る（\sqrt{0} なら √ {0}、\frac{0}{1} なら分数 {0} / {1} ）</li>
<li>^{Hoge}：上付き文字（指数とか）</li>
<li>_{hoge}：下付き文字（添え字とか）</li>
</ul><p>の4つだけ覚えている。あとはググる。</p>

<div class="section">
<h3>ヘルパー化</h3>
<p>さて、毎回イメージタグを書くのは不毛なので、これをヘルパー化することを考えましょう。たとえばこんな感じ。</p>
<pre class="code lang-html" data-lang="html" data-unlink>#App_Code\GoogleChart.cshtml

@helper Formula(string tex_expression){
const string API = &quot;http://chart.apis.google.com/chart?cht={0}<span class="synError">&amp;</span>chl={1}&quot;;
var cht = &quot;tx&quot;;
var chl = HttpUtility.UrlEncode(tex_expression);
<span class="synIdentifier">&lt;</span><span class="synStatement">img</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;@string.Format(API, cht, chl)&quot;</span><span class="synIdentifier"> /&gt;</span>
}
</pre><p>使い方はこんな感じ。</p>
<pre class="code lang-html" data-lang="html" data-unlink># Default.cshtml

@{

}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
@GoogleChart.Formula(@&quot;\bar{H}_{n+2}(x) = \sqrt{\frac{2}{n+2}} x \bar{H}_{n+1}(x) \sqrt{\frac{n+1}{n+2}} \bar{H}_n(x)&quot;)
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre>
</div>
<div class="section">
<h3>注意</h3>
<p>リクエストのリミットはとくに決まっていないようですが、250,000/日 を超える場合は chart-api-notifications@google.com に連絡しなければいけないそうです。</p>

</div>