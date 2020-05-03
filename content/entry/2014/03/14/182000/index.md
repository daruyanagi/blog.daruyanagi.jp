---
date: 2014-03-14T18:20:00.0000000
draft: false
title: "WebMatrix: Gmail 経由でアラートメールを送る（2）"
tags: ["WebMatrix", "ASP.net Web Pages"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20140314/20140314181207.png
---
<p>見事 WebMatrix で Gmail 経由のアラートメールが送れたわけだが（<a href="https://blog.daruyanagi.jp/entry/2014/03/08/220723">WebMatrix: Gmail &#x7D4C;&#x7531;&#x3067;&#x30A2;&#x30E9;&#x30FC;&#x30C8;&#x30E1;&#x30FC;&#x30EB;&#x3092;&#x9001;&#x308B; - &#x3060;&#x308B;&#x308D;&#x3050;</a>）、このやり方には一つ欠点（？　というか、仕様だな）があった。</p><p>たとえば、以下のようなコード。タイマーでとあるジョブ（必ず失敗する）を処理し、エラーが発生したらエラーメールを送る。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
WebMail.SmtpServer=<span class="synConstant">&quot;smtp.gmail.com&quot;</span>;
WebMail.SmtpPort = <span class="synConstant">587</span>;
WebMail.EnableSsl=<span class="synConstant">true</span>;
WebMail.UserName=<span class="synConstant">&quot;***&quot;</span>;
WebMail.From=<span class="synConstant">&quot;***@gmail.com&quot;</span>;
WebMail.Password=<span class="synConstant">&quot;***&quot;</span>;

var timer = <span class="synStatement">new</span> System.Timers.Timer(<span class="synConstant">1000</span> * <span class="synConstant">60</span>);

timer.Elapsed += (sender, args) =&gt;
{
<span class="synStatement">try</span>
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> Exception();
}
<span class="synStatement">catch</span> (Exception e)
{
WebMail.Send(<span class="synConstant">&quot;***@***.com&quot;</span>, e.Message, e.StackTrace);
}
};

timer.Start();
}
</pre><p>これは失敗する。しかも、WebMatrix だと例外が捕捉できないので気づきにくい。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140314181207.png" alt="f:id:daruyanagi:20140314181207p:plain" title="f:id:daruyanagi:20140314181207p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>よくわからんけれど、WebMail は <a href="http://msdn.microsoft.com/ja-jp/library/system.web.helpers(v=vs.111).aspx">System.Web.Helpers Namespace () | Microsoft Docs</a> に属するみたいで、Page のスレッドじゃないと動作しないのかもしれない。そういえば昔、こういうシチュエーションで Server.MapPath() が使えなかった覚えがある。</p>

<div class="section">
<h3>解決策</h3>
<p>System.Net.Mail.MailMessage と System.Net.Mail.SmtpClient を使ってみた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>@{
var timer = <span class="synStatement">new</span> System.Timers.Timer(<span class="synConstant">1000</span> * <span class="synConstant">60</span>);

timer.Elapsed += (sender, args) =&gt;
{
<span class="synStatement">try</span>
{
<span class="synStatement">throw</span> <span class="synStatement">new</span> Exception();
}
<span class="synStatement">catch</span> (Exception e)
{
SendMail(e.Message, e.StackTrace);
}
};

timer.Start();
}

@functions
{
<span class="synType">public</span> <span class="synType">void</span> SendMail(<span class="synType">string</span> title, <span class="synType">string</span> body)
{
<span class="synStatement">using</span> (var mail = <span class="synStatement">new</span> System.Net.Mail.MailMessage())
<span class="synStatement">using</span> (var smtp = <span class="synStatement">new</span> System.Net.Mail.SmtpClient())
{
<span class="synStatement">try</span>
{
mail.From = <span class="synStatement">new</span> System.Net.Mail.MailAddress(<span class="synConstant">&quot;***@***.com&quot;</span>);
mail.To.Add(<span class="synStatement">new</span> System.Net.Mail.MailAddress(<span class="synConstant">&quot;***@***.com&quot;</span>));
mail.Subject = title;
mail.Body = body;

smtp.Host = <span class="synConstant">&quot;smtp.gmail.com&quot;</span>;
smtp.Port = <span class="synConstant">587</span>;
smtp.EnableSsl = <span class="synConstant">true</span>;
smtp.UseDefaultCredentials = <span class="synConstant">false</span>;
smtp.Credentials = <span class="synStatement">new</span> System.Net.NetworkCredential(<span class="synConstant">&quot;***&quot;</span>, <span class="synConstant">&quot;***&quot;</span>);
smtp.Send(mail);

System.Diagnostics.Debug.WriteLine(<span class="synConstant">&quot;The mail has been sent successfully.&quot;</span>);
}
<span class="synStatement">catch</span>(Exception e)
{
System.Diagnostics.Debug.WriteLine(e.Message);
}
}
}
}
</pre><p>これは成功。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20140314181811.png" alt="f:id:daruyanagi:20140314181811p:plain" title="f:id:daruyanagi:20140314181811p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>成功したのはいいけどアプリを止め忘れて、気が付いたら 100 通以上メールがきてた ／(＾o＾)＼</p>

</div>