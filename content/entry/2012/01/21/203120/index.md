---
date: 2012-01-21T20:31:20.0000000
draft: false
title: "URLとして使えない文字が含まれているのを検出する"
tags: ["C#"]
eyecatch: 
---
<p>[Url]という属性を作成。 \"'|*`^><)(}{][#%;/?:@&=+$,. が含まれていたら IsValid() => false を返す。</p>

<pre class="code lang-C" data-lang="C">[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public sealed class UrlAttribute
: ValidationAttribute, IClientValidatable
{
public UrlAttribute()
{
ErrorMessage = &#34;URLに利用できない文字が含まれています。&#34;;
}

private readonly char[] INVALID_CHARS =
&#34;\\\&#34;&#39;|*`^&gt;&lt;)(}{][#%;/?:@&amp;=+$,.&#34;.ToCharArray();

public IEnumerable&lt;ModelClientValidationRule&gt;
GetClientValidationRules(
ModelMetadata metadata, ControllerContext context)
{
var rule = new ModelClientValidationRule
{
ValidationType = &#34;url&#34;,
ErrorMessage = FormatErrorMessage(
metadata.GetDisplayName()),
};

yield return rule;
}

public override bool IsValid(object value)
{
if (value == null || value.GetType() != typeof(string))
{
return true;
}

return !(INVALID_CHARS.Any(
c =&gt; ((string)value).Contains(c)));
}
}</pre>
<p>モデル側で適当なメンバーに[Url]を付与する。</p>

<pre class="code lang-C#" data-lang="C#">public class Post
{
[Required]
public int PostId { get; set; }

[Required]
[Url]
[DisplayName(&#34;タイトル&#34;)]
public string Title { get; set; }
:
:</pre>
<p><img src="20120121203055.png" alt="f:id:daruyanagi:20120121203055p:plain" title="f:id:daruyanagi:20120121203055p:plain" class="hatena-fotolife"></p>
