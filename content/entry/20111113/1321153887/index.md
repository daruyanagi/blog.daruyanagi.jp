---
date: 2011-11-13T12:11:27.0000000
draft: false
title: "Markdown で好みのヘルパーを使えるようにする"
tags: ["未分類"]
eyecatch: 
---
<p>連日プログラミングの話になる。</p><p><a href="http://blog.daruyanagi.net/archives/424">WebMatrix + Markdown …… リファクタリング。</a> で、</p>

<blockquote>
<p>Daruboard.Transform(content); は、あらかじめ登録したヘルパーを利用してテキストを整形する仕組みを呼び出している。これについては、また今度。</p>

</blockquote>
<p>と書いたと思うんだけど、今日はその話。以下に <code>/App_Code/Daruboard.cshtml</code> の内容を示す。</p>
<pre class="code" data-unlink>	@using System.Text.RegularExpressions
@using System.Reflection

@functions {

private struct FormatHelper
{
public string Signature;
public Type Type;
public string Method;
public object[] DefaultParams;
}

private static List&lt;FormatHelper&gt; FormatHelpers = new List&lt;FormatHelper&gt;();

public static void RegisterHelper(
string signature, Type type, string method_name, object[] default_params)
{
if (FormatHelpers.Any(f =&gt; f.Signature == signature))
{
throw new Exception(string.Format(
&#34;Daruboard.RegisterHelper(): {0} has already exist.&#34;,
signature));
}

MethodInfo method = type.GetMethod(method_name);
if (method == null)
{
throw new Exception(string.Format(
&#34;Daruboard.RegisterHelper(): {0} does not have {1}().&#34;,
type, method_name));
}

FormatHelpers.Add(new FormatHelper() {
Signature = signature,
Type = type,
Method = method_name,
DefaultParams = default_params
});
}

public static string Transform(string text)
{
var r = new Regex(@&#34;
(&lt;p&gt;)?\[\[
(?&lt;signature&gt;[^\[\]\|]*)(\|(?&lt;params&gt;[^\[\]]*))*
\]\](&lt;/p&gt;)?&#34;,
RegexOptions.Singleline |
RegexOptions.IgnorePatternWhitespace |
RegexOptions.Compiled
);

text = r.Replace(text, m =&gt;
{
var s = m.Groups[&#34;signature&#34;].Value;
var p = m.Groups[&#34;params&#34;].Value.Split(&#39;|&#39;);
var f = FormatHelpers.Find(_ =&gt; _.Signature == s);

if (f.Signature == null)
{
return string.Format(&#34;&lt;a href=&#39;/{0}&#39;&gt;{0}&lt;/a&gt;&#34;, s);
}
else
{
try
{
MethodInfo method = f.Type.GetMethod(f.Method);
object[] parameter = f.DefaultParams;
parameter[0] = p[0];
return method.Invoke(null, parameter).ToString();
}
catch (Exception e)
{
return string.Format(&#34;[{0}: {1}]&#34;, e.GetType(), e.Message);
}
}
});

return text;
}
}</pre><p> <a href="http://d.hatena.ne.jp/keyword/sigunature%7Cparam1%7Cparam2...">sigunature|param1|param2...</a> という書式を見つけたら、指定した Signature をもつヘルパーを登録済みリストから探し出し、登録時に指定した Method をリフレクションで呼び出す。ヘルパーの登録は、<code>＿AppStart.cshtml</code>あたりで、</p>
<pre class="code" data-unlink>    Daruboard.RegisterHelper(&#34;twitter&#34;,
typeof(BlackbirdPie),
&#34;GetHtml&#34;,
new object[] { null, false, true, Locale.ja }
);</pre><p>などとと書いておく <a href="#f1" name="fn1" title="今のところ、パラメーターは一つ、しかも string 型しか渡せない。true/false ならともかく、Location.ja を string 型から変換するのは面倒くさすぎると思った。将来的には、もう少し改善したい">*1</a> 。書式に Signature しかない場合は、それを URL とみなしリンクにする <a href="#f2" name="fn2" title="Markdown の\[URL\](URL)記法の簡略表記として使えるので便利">*2</a> 処理を入れてある。</p><p>まぁ、これで、</p>
<pre class="code" data-unlink>    [[twitter|ツイートへのURL]]</pre><p>が、</p>
<pre class="code" data-unlink>    @BlackbirdPie.GetHtml(ツイートへのURL)</pre><p>と解釈されてレンダリングされるというわけ。</p><p>さて、ここまでやっちゃうとだんだん読み込み速度が気になってきた。というわけで、今度はキャッシュの使い方を勉強しようかなぁと思う。これまで作った Webアプリは、daruyanagi.net で実際に利用されている（11/11/13現在）。</p>
<div class="footnote">
<p class="footnote"><a href="#fn1" name="f1" class="footnote-number">*1</a><span class="footnote-delimiter">:</span><span class="footnote-text">今のところ、パラメーターは一つ、しかも string 型しか渡せない。true/false ならともかく、Location.ja を string 型から変換するのは面倒くさすぎると思った。将来的には、もう少し改善したい</span></p>
<p class="footnote"><a href="#fn2" name="f2" class="footnote-number">*2</a><span class="footnote-delimiter">:</span><span class="footnote-text">Markdown の\[URL\](URL)記法の簡略表記として使えるので便利</span></p>
</div>