---
date: 2012-08-29T20:18:34.0000000
draft: false
title: "寄り道： Rails の Flash っぽい機能を WebMatrix で使いたい"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>Flash っていうのは、別に <a class="keyword" href="http://d.hatena.ne.jp/keyword/Adobe">Adobe</a> Flash Player のことなんかじゃなくて、</p>

<blockquote cite="http://d.hatena.ne.jp/kiyo560808/20110913/1315882887">

<ul>
<li>ログイン時のウェルカムメッセージや、項目追加の成功通知など、ユーザに簡単な通知を行いたい時に利用する。</li>
<li>コントローラでflashメッセージを設定し、ビューで表示する。</li>
<li>flashは全体で見ればHash。あるキーに対する値としてメッセージを設定する。キーは自由に設定できるが、デフォルトとしてalertとnoticeがある。</li>
<li>設定したメッセージは、sessionに保存される。つまり、flashは、sessionを利用した機能の１つ。</li>
<li>普通のセッション変数では破棄するまで値は保持されるが、flash の場合は一度表示されるとアクション終了時に自動的に消去される。</li>
</ul>
<cite><a href="http://d.hatena.ne.jp/kiyo560808/20110913/1315882887">flash&#x306E;&#x4F7F;&#x3044;&#x65B9;&#x3000;&#x301C;Rails&#x306E;&#x57FA;&#x790E; - &#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30DE;&#x30FC;kk&#x306E;&#x52C9;&#x5F37;/&#x6210;&#x9577;&#x30D6;&#x30ED;&#x30B0;@&#x30E9;&#x30A4;&#x30D6;&#x30EC;&#x30DC;&#x30EA;&#x30E5;&#x30FC;&#x30B7;&#x30E7;&#x30F3;</a></cite>
</blockquote>
<p>というもの。ログアウト＋ホームへリダイレクトしたときに「Good bye!」って表示したい（でも、一度表示したら二度目からは表示しない）なんて場合、あるよね。</p><p><a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Pages にもそういう仕組があるのかもしれないけれど、よくわからなかったので自分で実装してみた。本物の Flash はHash（<a class="keyword" href="http://d.hatena.ne.jp/keyword/C%23">C#</a> なら Dictionary）らしいのだけれど、今回はそこまで高機能なのはいらないので、単に文字列を一つだけ保持することにする。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Logout.cshtml

@{
WebSecurity.Logout();
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">&quot;Good bye!&quot;</span>; <span class="synComment">// &lt;-- ココ！</span>
Response.Redirect(Request[<span class="synConstant">&quot;ReturnUrl&quot;</span>] ?? <span class="synConstant">&quot;~/&quot;</span>);
}
</pre><p>実装には Session を利用した。 Session["flash"] にテキストを入れておけば、リダイレクトしたあとでも値を参照できる。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ＿SiteLayout.cshtml

&lt;body&gt;
@<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] != <span class="synConstant">null</span>)
{
&lt;div <span class="synType">class</span>=<span class="synConstant">&quot;message info&quot;</span>&gt;
&lt;p&gt;@Session[<span class="synConstant">&quot;flash&quot;</span>]&lt;/p&gt; <span class="synComment">// &lt;-- 読みだして……</span>
&lt;/div&gt;
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>; <span class="synComment">// &lt;-- 消す！……</span>
}

@RenderBody()
&lt;/body&gt;
</pre><p>表示する側では、かならず Session["flash"] をクリアしておく。これで Session["flash"] の内容が表示されるのは一度きりになるはず。</p><p><img src="20120829200628.png" alt="f:id:daruyanagi:20120829200628p:plain" title="f:id:daruyanagi:20120829200628p:plain" class="hatena-fotolife"></p><p>これでいいのかは自信がないのだけれど、うまくいったのではないかな。</p>

<div class="section">
<h3>ステップアップ</h3>
<p>ビューでぐちゃぐちゃコード書くのはあまり格好よくないから、これはぜひ<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%AB%A5%D7%A5%BB%A5%EB%B2%BD">カプセル化</a>しておきたいよね。ヘルパーにしておくとよさそうだ。</p><p>というわけで、 Flash ヘルパーを作ってみた。インターフェイスは単純で、 Write(string) で書き込んで、 Read() で読むだけ。読むと内容が破棄される。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ~/App_Code/Flash.cshtml

@helper Read()
{
<span class="synStatement">if</span> (Session[<span class="synConstant">&quot;flash&quot;</span>] != <span class="synConstant">null</span>)
{
&lt;div <span class="synType">class</span>=<span class="synConstant">&quot;message info&quot;</span>&gt;&lt;p&gt;@Session[<span class="synConstant">&quot;flash&quot;</span>]&lt;/p&gt;&lt;/div&gt;
}
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synConstant">null</span>;
}

@functions
{
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">void</span> Write(<span class="synType">string</span> <span class="synStatement">value</span>)
{
Session[<span class="synConstant">&quot;flash&quot;</span>] = <span class="synStatement">value</span>;
}
}
</pre><p>Helper は<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9">インスタンス</a>作って使うわけじゃないから、 static で宣言せえへんだら外から使えへんで。で、これを使うと、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># Logout.cshtml

@{
WebSecurity.Logout();
Flash.Write(<span class="synConstant">&quot;Good bye!&quot;</span>); <span class="synComment">// &lt;-- ココ！</span>
Response.Redirect(Request[<span class="synConstant">&quot;ReturnUrl&quot;</span>] ?? <span class="synConstant">&quot;~/&quot;</span>);
}
</pre><p>で書いて、</p>
<pre class="code lang-cs" data-lang="cs" data-unlink># ＿SiteLayout.cshtml

&lt;body&gt;
@Flash.Read() <span class="synComment">// &lt;-- これ！</span>

@RenderBody()
&lt;/body&gt;
</pre><p>で、読むって感じになる。結構簡単だったから、少し手を加えて Dictionary へ拡張してもいいかも。</p>

</div>