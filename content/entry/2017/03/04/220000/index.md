---
date: 2017-03-04T22:00:00.0000000
draft: false
title: "PowerShell：ストアアプリのセール情報を取得する"
tags: ["PowerShell"]
eyecatch: 
---
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synComment"># スクリプトと同じパスにある StoreApps.txt から URL を読み込む</span>
<span class="synIdentifier">$path</span> = <span class="synIdentifier">$PSScriptRoot</span> | <span class="synStatement">Join-Path</span> -ChildPath <span class="synConstant">&quot;StoreApps.txt&quot;</span>
<span class="synIdentifier">$urls</span> = (<span class="synStatement">Get-Content</span> <span class="synIdentifier">$path</span>) -<span class="synStatement">as</span> <span class="synType">[string[]]</span>

<span class="synComment"># デバッグ用のサンプル</span>
<span class="synComment"># $urls =@(</span>
<span class="synComment"># &quot;https://www.microsoft.com/ja-jp/store/p/nextgen-reader/9wzdncrfj262&quot;</span>
<span class="synComment"># )</span>

<span class="synStatement">foreach</span> (<span class="synIdentifier">$url</span> <span class="synStatement">in</span> <span class="synIdentifier">$urls</span>)
{
<span class="synStatement">try</span>
{
<span class="synIdentifier">$request</span> = <span class="synStatement">Invoke-WebRequest</span> <span class="synIdentifier">$url</span>

<span class="synComment"># アプリ名を取得</span>
<span class="synIdentifier">$title</span> = <span class="synIdentifier">$request</span>.AllElements.FindById(<span class="synConstant">&quot;page-title&quot;</span>).innerText

<span class="synComment"># ParsedHtml もめっちゃ便利やったぞ！</span>
<span class="synComment"># 例：打消し線の付いた定価タグを取得</span>
<span class="synIdentifier">$body</span> = <span class="synIdentifier">$request</span>.ParsedHtml
<span class="synIdentifier">$price_node</span> = <span class="synIdentifier">$body</span>.getElementsByTagName(<span class="synConstant">&quot;s&quot;</span>) | <span class="synStatement">where</span> {
<span class="synType">$_</span>.getAttributeNode(<span class="synConstant">&quot;class&quot;</span>).Value  -<span class="synStatement">eq</span> <span class="synConstant">&quot;srv_saleprice&quot;</span>
}

<span class="synComment"># 定価が打ち消されていたらセール中ってこと</span>
<span class="synStatement">if</span> (<span class="synIdentifier">$price_node</span>)
{
<span class="synIdentifier">$price</span> = <span class="synIdentifier">$price_node</span>.innerText

<span class="synComment"># 販売価格（セール価格）の取得</span>
<span class="synIdentifier">$sales_node</span> = <span class="synIdentifier">$body</span>.getElementsByTagName(<span class="synConstant">&quot;meta&quot;</span>) | <span class="synStatement">where</span> {
<span class="synType">$_</span>.getAttributeNode(<span class="synConstant">&quot;itemprop&quot;</span>).Value  -<span class="synStatement">eq</span> <span class="synConstant">&quot;price&quot;</span>
}
<span class="synIdentifier">$sales</span> = <span class="synConstant">&quot;&amp;yen;{0:#,0}&quot;</span>
-<span class="synStatement">f</span> <span class="synType">[int]</span><span class="synIdentifier">$sales_node</span>.getAttributeNode(<span class="synConstant">&quot;content&quot;</span>).Value

<span class="synComment"># セール期間を取得</span>
<span class="synIdentifier">$countdown_node</span> = <span class="synIdentifier">$body</span>.getElementsByTagName(<span class="synConstant">&quot;div&quot;</span>) | <span class="synStatement">where</span> {
<span class="synType">$_</span>.getAttributeNode(<span class="synConstant">&quot;class&quot;</span>).Value
-<span class="synStatement">eq</span> <span class="synConstant">&quot;caption text-muted srv_countdown&quot;</span>
}
<span class="synIdentifier">$countdown</span> = <span class="synIdentifier">$countdown_node</span>.innerText
<span class="synIdentifier">$countdown</span> = <span class="synIdentifier">$countdown</span>.Replace(<span class="synConstant">&quot; • &quot;</span>, <span class="synConstant">&quot;&quot;</span>).Trim()

<span class="synComment"># デバッグに使ってた</span>
<span class="synComment"># [PSCustomObject] @{</span>
<span class="synComment">#    Title = $title; Sales = $sales;</span>
<span class="synComment">#    Price = $price; Url = $url</span>
<span class="synComment"># }</span>

<span class="synComment"># 今回は成形したはてな記法テキストを出力</span>
<span class="synConstant">@&quot;</span>
<span class="synConstant">* </span><span class="synIdentifier">$title</span>

<span class="synConstant">&lt;s&gt;</span><span class="synIdentifier">$price</span><span class="synConstant">&lt;/s&gt; → &lt;b&gt;</span><span class="synIdentifier">$sales</span><span class="synConstant">&lt;/b&gt;（</span><span class="synIdentifier">$countdown</span><span class="synConstant">）</span>

<span class="synIdentifier">$url</span><span class="synSpecial">`:</span><span class="synConstant">embed</span>

<span class="synConstant">&quot;@</span>
}

}
<span class="synStatement">catch</span>
{
<span class="synStatement">Write-Host</span> <span class="synType">$Error[0]</span> <span class="synIdentifier">$url</span>
}
<span class="synStatement">finally</span>
{
<span class="synIdentifier">$sales_node</span> = <span class="synConstant">$null</span>
<span class="synIdentifier">$sales</span> = <span class="synConstant">$null</span>
<span class="synIdentifier">$price_node</span> = <span class="synConstant">$null</span>
<span class="synIdentifier">$price</span> = <span class="synConstant">$null</span>
}
}
</pre><p>結果はこんな感じ。</p>
<pre class="code" data-lang="" data-unlink>* Nextgen Reader

&lt;s&gt;¥200&lt;/s&gt; → &lt;b&gt;&amp;yen;100&lt;/b&gt;（¥100 値引き  あと 7 日です）

https://www.microsoft.com/ja-jp/store/p/nextgen-reader/9wzdncrfj262:embed

* Minecraft: Windows 10 Edition

&lt;s&gt;¥3,150&lt;/s&gt; → &lt;b&gt;&amp;yen;1,150&lt;/b&gt;（¥2,000 値引き  あと 17 日です）

https://www.microsoft.com/ja-jp/store/p/minecraft-windows-10-edition/9nblggh2jhxj:embed
</pre><p>これをそのまま投稿するとこんな記事になりました。</p><p><iframe src="http://store-watch.hatenadiary.jp/embed/2017/03/04/174241" title="本日のセール：Nextgen Reader、Minecraft: Windows 10 Edition - Windows Store Watch" class="embed-card embed-blogcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 190px; max-width: 500px; margin: 10px 0px;"></iframe><br />
</p>

<div class="section">
<h3>今日学んだこと</h3>

<div class="section">
<h4>スクリプトのあるフォルダーを取得する</h4>
<p>PowerScript v3 以降では</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$PSScriptRoot</span>
</pre><p>が利用できる。それ以前だと、ちょっとめんどい（といってもひと手間増える程度だけど</p>

</div>
<div class="section">
<h4>キャストっぽいことをする</h4>
<p>型演算子 -as が使える。割と柔軟に使えるみたいだけど、俺みたいな万年初心者には、どこまで柔軟にやってくれるのかよくわかんないのが不安。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$urls</span> = (<span class="synStatement">Get-Content</span> <span class="synIdentifier">$path</span>) -<span class="synStatement">as</span> <span class="synType">[string[]]</span>
</pre><p>失敗すると $null が返る。親戚として -is、-isnot もチェック！</p>

</div>
<div class="section">
<h4>指定したクラスのタグを取得する</h4>
<p>たとえば s.srv_saleprice は以下のコードでとれる。</p>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synIdentifier">$price_node</span> = <span class="synIdentifier">$request</span>.ParsedHtml.getElementsByTagName(<span class="synConstant">&quot;s&quot;</span>) | <span class="synStatement">where</span> {
<span class="synType">$_</span>.getAttributeNode(<span class="synConstant">&quot;class&quot;</span>).Value  -<span class="synStatement">eq</span> <span class="synConstant">&quot;srv_saleprice&quot;</span>
}
<span class="synIdentifier">$price_node</span>.innerText
</pre><p>ちなみに、クラスが"caption text-muted srv_countdown"みたいに複数指定されてるときは"srv_countdown"だけで -eq 判定してもダメ。全体で -eq 評価するか、-match を使う。</p><p>まぁ、デフォルトでここまでできるのは便利だけど、それ以上はいろいろめんどいし、そろそろ HtmlAgilityPack でやるかなー。AllElements でとったタグの innerText を読むと改行が飛ぶといった挙動もあまり気に入らない（正規表現でお茶を濁した）。</p>

</div>
<div class="section">
<h4>ヒアドキュメント</h4>
<pre class="code lang-ps1" data-lang="ps1" data-unlink><span class="synConstant">@&quot;</span>
<span class="synConstant">ヒアドキュメント </span><span class="synIdentifier">$url</span><span class="synConstant"> 変数も評価される</span>
<span class="synIdentifier">$url</span><span class="synSpecial">`:</span><span class="synConstant">embed（はてな記法</span>
<span class="synConstant">&quot;@</span>
</pre><p>変数に“:”が続くとそのまま評価されてしまう。困る場合は、バッククォートでエスケープすればいいみたい。</p><p>ちなみに、変数を評価してほしくない場合はシングルクォートでくくる。</p>

</div>
<div class="section">
<h4>はてな記法で PowerShell を構文色分け</h4>
<p>コード記法で`ps1`を使う。</p>

</div>
</div>