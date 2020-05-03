---
date: 2013-04-30T19:00:04.0000000
draft: false
title: "Widows Store Apps: WSSE 認証（はてなフォトライフ）"
tags: ["はてな", "Windows ストア アプリ", "C#"]
eyecatch: 20130430181813.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130430181813.png" alt="f:id:daruyanagi:20130430181813p:plain" title="f:id:daruyanagi:20130430181813p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Surface RT（Windows RT）で“はてなブログ”を書くのが微妙にめんどくさいので、“はてなフォトライフ”のクライアントでも作ろうかと思い、@kanaharu ちゃんのブログ（<a href="http://cpp.kanaharu.com/entry/2013/01/06/133209">&#x306F;&#x3066;&#x306A;&#x30D5;&#x30A9;&#x30C8;&#x30E9;&#x30A4;&#x30D5;&#x306B;&#x753B;&#x50CF;&#x3092;&#x30A2;&#x30C3;&#x30D7;&#x30ED;&#x30FC;&#x30C9;&#x3059;&#x308B;&#x30D7;&#x30ED;&#x30B0;&#x30E9;&#x30E0;&#x3092;C#&#x3067;&#x5B9F;&#x88C5;&#x3057;&#x3066;&#x307F;&#x305F; - kanaharu.cpp</a>）を参考にしながら WSSE 認証を実装してみた。</p>


<div class="section">
<h3>HatenaFotolife クラス</h3>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">namespace</span> Hatena.Fotolife
{
<span class="synType">public</span> <span class="synType">class</span> HatenaFotolife
{
<span class="synType">const</span> <span class="synType">string</span> API_ENDPOINT = <span class="synConstant">&quot;http://f.hatena.ne.jp/atom/&quot;</span>;

<span class="synType">public</span> <span class="synType">string</span> UserName { get; <span class="synType">private</span> set; }
<span class="synType">public</span> <span class="synType">string</span> Password { get; <span class="synType">private</span> set; }
<span class="synType">public</span> <span class="synType">string</span> Title    { get; <span class="synType">private</span> set; }
<span class="synType">public</span> <span class="synType">string</span> PostUrl  { get; <span class="synType">private</span> set; }
<span class="synType">public</span> <span class="synType">string</span> FeedUrl  { get; <span class="synType">private</span> set; }
:
</pre><p>みたいなクラスをまず用意。</p><p><a href="http://d.hatena.ne.jp/keyword/%A4%CF%A4%C6%A4%CA%A5%D5%A5%A9%A5%C8%A5%E9%A5%A4%A5%D5AtomAPI">&#x306F;&#x3066;&#x306A;&#x30D5;&#x30A9;&#x30C8;&#x30E9;&#x30A4;&#x30D5;AtomAPI&#x3068;&#x306F; - &#x306F;&#x3066;&#x306A;&#x30AD;&#x30FC;&#x30EF;&#x30FC;&#x30C9;</a> によると、正しい X-WSSE ヘッダを含んだリクエストを <a href="http://f.hatena.ne.jp/atom/">http://f.hatena.ne.jp/atom/</a> に送ると、</p>
<pre class="code lang-xml" data-lang="xml" data-unlink>HTTP/1.1 200 OK
Content-Type: application/x.atom+xml

<span class="synComment">&lt;?</span><span class="synType">xml version</span>=<span class="synConstant">&quot;1.0&quot;</span><span class="synType"> encoding</span>=<span class="synConstant">&quot;utf-8&quot;</span><span class="synComment">?&gt;</span>
<span class="synIdentifier">&lt;feed </span><span class="synType">xmlns</span>=<span class="synConstant">&quot;http://purl.org/atom/ns#&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;link </span><span class="synType">type</span>=<span class="synConstant">&quot;application/x.atom+xml&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span>=<span class="synConstant">&quot;service.post&quot;</span>
<span class="synIdentifier">        </span><span class="synType">href</span>=<span class="synConstant">&quot;http://f.hatena.ne.jp/atom/post&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span>=<span class="synConstant">&quot;fotolife sample&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;link </span><span class="synType">type</span>=<span class="synConstant">&quot;application/x.atom+xml&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span>=<span class="synConstant">&quot;service.feed&quot;</span>
<span class="synIdentifier">        </span><span class="synType">href</span>=<span class="synConstant">&quot;http://f.hatena.ne.jp/atom/feed&quot;</span><span class="synIdentifier"> </span><span class="synType">title</span>=<span class="synConstant">&quot;fotolife sample&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/feed&gt;</span>
</pre><p>というレスポンスが帰ってくるらしいので、それを PostUrl と FeedUrl に格納してあげる。ついでにタイトルもとっておく。</p>

</div>
<div class="section">
<h3>コンストラクタ</h3>
<p>コンストラクタで <a href="http://f.hatena.ne.jp/atom/">http://f.hatena.ne.jp/atom/</a> を叩いて情報を得るようにした。コンストラクタで例外は出さないほうがいいんだっけ？　まぁ、いいや。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> HatenaFotolife(<span class="synType">string</span> user_name, <span class="synType">string</span> password)
{
<span class="synStatement">if</span> (<span class="synType">string</span>.IsNullOrEmpty(user_name))
<span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentNullException(<span class="synConstant">&quot;Username is null&quot;</span>);
<span class="synStatement">else</span>
UserName = user_name;

<span class="synStatement">if</span> (<span class="synType">string</span>.IsNullOrEmpty(password))
<span class="synStatement">throw</span> <span class="synStatement">new</span> ArgumentNullException(<span class="synConstant">&quot;Password is null&quot;</span>);
<span class="synStatement">else</span>
Password = password;

var request = <span class="synStatement">new</span> HttpRequestMessage(HttpMethod.Get, API_ENDPOINT);
request.Headers.Add(<span class="synConstant">&quot;Accept&quot;</span>,
<span class="synConstant">&quot;application/x.atom+xml, application/xml, text/xml, */*&quot;</span>);
request.Headers.Add(<span class="synConstant">&quot;X-WSSE&quot;</span>, GenerateWsseHeader());

var response = <span class="synStatement">new</span> HttpClient().SendAsync(request).Result;
<span class="synStatement">switch</span> (response.StatusCode)
{
<span class="synStatement">case</span> HttpStatusCode.OK:
var elements = XDocument
.Load(response.Content.ReadAsStreamAsync().Result)
.Root.Elements();

Title = elements
.First(_ =&gt; _.Attribute(<span class="synConstant">&quot;rel&quot;</span>).Value == <span class="synConstant">&quot;service.post&quot;</span>)
.Attribute(<span class="synConstant">&quot;title&quot;</span>).Value;
Title = WebUtility.HtmlDecode(Title);

PostUrl = elements
.First(_ =&gt; _.Attribute(<span class="synConstant">&quot;rel&quot;</span>).Value == <span class="synConstant">&quot;service.post&quot;</span>)
.Attribute(<span class="synConstant">&quot;href&quot;</span>).Value;
FeedUrl = elements
.First(_ =&gt; _.Attribute(<span class="synConstant">&quot;rel&quot;</span>).Value == <span class="synConstant">&quot;service.feed&quot;</span>)
.Attribute(<span class="synConstant">&quot;href&quot;</span>).Value;
<span class="synStatement">break</span>;

<span class="synStatement">default</span>:
Debug.WriteLine(request);
Debug.WriteLine(response);
<span class="synStatement">throw</span> <span class="synStatement">new</span> Exception(<span class="synType">string</span>.Format(<span class="synConstant">&quot;{0}: {1}&quot;</span>,
response.StatusCode, response.ReasonPhrase));
}
}
</pre><p>オリジナルと違うところは、</p>

<ul>
<li><a href="http://msdn.microsoft.com/ja-jp/library/system.net.http.httprequestmessage.aspx">HttpRequestMessage &#x30AF;&#x30E9;&#x30B9; (System.Net.Http)</a></li>
<li><a href="http://msdn.microsoft.com/ja-jp/library/system.net.http.httpclient.aspx">HttpClient &#x30AF;&#x30E9;&#x30B9; (System.Net.Http)</a></li>
<li><a href="http://msdn.microsoft.com/ja-jp/library/system.net.http.httpresponsemessage.aspx">HttpResponseMessage &#x30AF;&#x30E9;&#x30B9; (System.Net.Http)</a></li>
</ul><p>を使っているところ。これは .NET 4.5 で追加されたもので、Store Apps で通信を行う場合は基本的にこれを使うことになるらしい。うー、ちゃんと使えるようにならねばね。詳しくは、メイド好きの記事で。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20120822/1345563275">Web API &#x3088;&#x308A;&#x3082; HttpClient &#x306B;&#x6CE8;&#x76EE;&#x3057;&#x305F;&#x3044; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>ヘッダーの追加の仕方がよくわからなかったのだけど、HttpRequestMessage を作成してヘッダーを追加し、それを HttpClient で送るという方法でとりあえず動いた。あ、Dispose() してないな、using 使ったほうがよさそうだ。</p><p>あと、みんなお馴染み HttpUtility クラスは <a href="http://msdn.microsoft.com/ja-jp/library/system.net.webutility.aspx">WebUtility &#x30AF;&#x30E9;&#x30B9; (System.Net)</a> になっている。こういうところでいちいち躓いちゃうのが、今のところのストアアプリ開発の難点。慣れればどうってことないのだろうけど。</p>

</div>
<div class="section">
<h3>WSSE ヘッダーの生成</h3>

<blockquote cite="http://developer.hatena.ne.jp/ja/documents/auth/apis/wsse">
<p>WSSE認証はHTTPのX-WSSEヘッダを用いて認証用文字列を送信する認証手段です。WSSE認証用文字列にはユーザー名とパスワードが含まれます。このとき、パスワードはSHA1アルゴリズムによって暗号化されたダイジェストとして送信されるため、HTTP基本認証などに比べてセキュアな認証が可能です。</p>

<cite><a href="http://developer.hatena.ne.jp/ja/documents/auth/apis/wsse">&#x306F;&#x3066;&#x306A;&#x30B5;&#x30FC;&#x30D3;&#x30B9;&#x306B;&#x304A;&#x3051;&#x308B;WSSE&#x8A8D;&#x8A3C; - Hatena Developer Center</a></cite>
</blockquote>
<p>X-WSSE ヘッダーには以下の4つを含める必要がある。</p>

<ul>
<li>Username：はてなID</li>
<li>Nonce：HTTPリクエスト毎に生成したセキュリティ・トークン（ヘッダーに含める際はBase64エンコードが必要）</li>
<li>Created：Nonceが作成された日時をISO-8601表記で記述したもの</li>
<li>PasswordDigest：Nonce, Created, パスワード(はてなアカウントのパスワード)を文字列連結しSHA1アルゴリズムでダイジェスト化して生成された文字列を、Base64エンコードした文字列</li>
</ul><p>Nonce だけはよくわかんなかったのだけど、適当に 40 バイトぐらいの長さのランダムなデータであればいいみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">string</span> GenerateWsseHeader()
{
var nonce = GenerateNonce(<span class="synConstant">40</span>);
var created = DateTime.UtcNow.ToString(<span class="synConstant">&quot;yyyy-MM-ddTHH:mm:ssZ&quot;</span>);
var password_digest = SHA1ComputeHash(nonce
.Concat(Encoding.UTF8.GetBytes(created))
.Concat(Encoding.UTF8.GetBytes(Password))
.ToArray()
);

<span class="synStatement">return</span> <span class="synType">string</span>.Format(
<span class="synConstant">&quot;UsernameToken Username=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{0}</span><span class="synSpecial">\&quot;</span><span class="synConstant">, PasswordDigest=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{1}</span><span class="synSpecial">\&quot;</span><span class="synConstant">, &quot;</span> +
<span class="synConstant">&quot;Nonce=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{2}</span><span class="synSpecial">\&quot;</span><span class="synConstant">, Created=</span><span class="synSpecial">\&quot;</span><span class="synConstant">{3}</span><span class="synSpecial">\&quot;</span><span class="synConstant">&quot;</span>,
UserName,
Convert.ToBase64String(password_digest),
Convert.ToBase64String(nonce),
created
);
}
</pre>
<div class="section">
<h5>GenerateNonce()</h5>
<p>オリジナル（<a href="http://cpp.kanaharu.com/entry/2013/01/06/132031">&#x306F;&#x3066;&#x306A;&#x306E;WSSE&#x8A8D;&#x8A3C;&#x3092;C#&#x3067;&#x5B9F;&#x88C5;&#x3057;&#x3066;&#x307F;&#x305F; - kanaharu.cpp</a>）では RNGCryptoServiceProvider を使っていたのだけれど、Store Apps では使えないみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">byte</span>[] GenerateNonce(<span class="synType">int</span> length)
{
var buffer = <span class="synStatement">new</span> <span class="synType">byte</span>[length];
<span class="synStatement">new</span> Random(Environment.TickCount).NextBytes(buffer);
<span class="synStatement">return</span> buffer;
}
</pre><p>適当に作った。</p>

</div>
<div class="section">
<h5>SHA1 ハッシュの計算</h5>
<p>オリジナルでは SHA1Managed を使っていたのだけれど、Store Apps では（以下略</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">private</span> <span class="synType">byte</span>[] SHA1ComputeHash(<span class="synType">byte</span>[] input)
{
<span class="synStatement">return</span> HashAlgorithmProvider
.OpenAlgorithm(<span class="synConstant">&quot;SHA1&quot;</span>)
.HashData(input.AsBuffer())
.ToArray();
}
</pre><p>酢酸先生（@ch3cooh）の記事を参考に書いてみた。</p>

<ul>
<li><a href="http://ch3cooh.jp/index.php/tips/metro/system/cryptographic/compute-sha1-hash/">http://ch3cooh.jp/index.php/tips/metro/system/cryptographic/compute-sha1-hash/</a>（執筆時現在絶賛落下中、引越中だそうだ）</li>
</ul><p><a href="http://msdn.microsoft.com/ja-jp/library/system.runtime.interopservices.windowsruntime.windowsruntimebufferextensions.asbuffer.aspx">WindowsRuntimeBufferExtensions.AsBuffer &#x30E1;&#x30BD;&#x30C3;&#x30C9; (System.Runtime.InteropServices.WindowsRuntime)</a>（拡張メソッド）で byte[] から IBuffer へ変換できるよ！　これも知ってないとなかなか使いこなせないかもね……。</p>

</div>
</div>
<div class="section">
<h3>まとめ</h3>

<ul>
<li>WebClient → HttpClient</li>
<li>HttpUtility → WebUtility</li>
<li>RNGCryptoServiceProvider → Random</li>
<li>SHA1Managed → HashAlgorithmProvider.OpenAlgorithm("SHA1")</li>
</ul><p>地道にノウハウを貯めていくしかないな。</p>

</div>