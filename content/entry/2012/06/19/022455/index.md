---
date: 2012-06-19T02:24:55.0000000
draft: false
title: "デスクトップ全体を一時的に暗転させたい (2)"
tags: ["Windows", "C#"]
eyecatch: 
---
<p><a href="http://daruyanagi.hatenablog.com/entry/2012/05/27/155731">&#x30C7;&#x30B9;&#x30AF;&#x30C8;&#x30C3;&#x30D7;&#x5168;&#x4F53;&#x3092;&#x4E00;&#x6642;&#x7684;&#x306B;&#x6697;&#x8EE2;&#x3055;&#x305B;&#x305F;&#x3044; - &#x3060;&#x308B;&#x308D;&#x3050;</a> がなぜか動かんなぁ、と思っていろいろ試していた（<a href="http://daruyanagi.hatenablog.com/entry/2012/06/18/202158">08&#x5F0F;&#x673A;&#x4E0A;&#x64AE;&#x5F71;&#x6A5F; v1.5.0 - &#x3060;&#x308B;&#x308D;&#x3050;</a>）のだけど、原因は FormWindowState.Maximized だったっぽい。これをコメントアウトすると動いた。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_HIDE = <span class="synConstant">0x10000</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_ACTIVATE = <span class="synConstant">0x20000</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_SLIDE = <span class="synConstant">0x40000</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_BLEND = <span class="synConstant">0x80000</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_HOR_POSITIVE = <span class="synConstant">0x00000001</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_HOR_NEGATIVE = <span class="synConstant">0x00000002</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_VER_POSITIVE = <span class="synConstant">0x00000004</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_VER_NEGATIVE = <span class="synConstant">0x00000008</span>;
<span class="synType">public</span> <span class="synType">const</span> <span class="synType">int</span> AW_CENTER = <span class="synConstant">0x00000010</span>;

[DllImport(<span class="synConstant">&quot;user32.dll&quot;</span>, CharSet = CharSet.Auto, SetLastError = <span class="synConstant">true</span>)]
<span class="synType">public</span> <span class="synType">static</span> <span class="synType">extern</span> <span class="synType">int</span> AnimateWindow(
IntPtr hWnd, <span class="synType">int</span> dwTime, <span class="synType">int</span> dwFlags);

<span class="synStatement">using</span> (var form = <span class="synStatement">new</span> Form()
{
BackColor = Color.Black,
ShowInTaskbar = <span class="synConstant">false</span>,
TopMost = <span class="synConstant">true</span>,
<span class="synComment">// WindowState = FormWindowState.Maximized, &lt;- 諸悪の根源！</span>
Left = <span class="synConstant">0</span>,
Top = <span class="synConstant">0</span>,
Width = Screen.PrimaryScreen.Bounds.Width,
Height = Screen.PrimaryScreen.Bounds.Height,
FormBorderStyle = FormBorderStyle.None,
})
{
<span class="synType">int</span> result = <span class="synConstant">0</span>;
<span class="synType">const</span> <span class="synType">int</span> interval = <span class="synConstant">200</span>;

result = AnimateWindow(form.Handle,
interval, AW_BLEND | AW_ACTIVATE);
<span class="synStatement">if</span> (result != <span class="synConstant">0</span>) Debug.WriteLine(
Marshal.GetLastWin32Error());
form.Show();

<span class="synStatement">if</span> (settings.SoundEnabled &amp;&amp;
File.Exists(<span class="synConstant">&quot;PrintScreen.wav&quot;</span>))
<span class="synStatement">new</span> SoundPlayer(<span class="synConstant">&quot;PrintScreen.wav&quot;</span>).Play();

result = AnimateWindow(form.Handle, interval,
AW_BLEND | AW_HIDE);
<span class="synStatement">if</span> (result != <span class="synConstant">0</span>) Debug.WriteLine(
Marshal.GetLastWin32Error());
form.Hide();
}
</pre><p>調べてる時に知ったのだけど、Wind32 <a class="keyword" href="http://d.hatena.ne.jp/keyword/API">API</a> を DllImport するときに SetLastError = true を指定しておけば、GetLastError() を利用しなくてもマネージドな Marshal.GetLastWin32Error() でエラーの内容が取得できるのだそうだ。</p><p>一つ賢くなった。</p>
