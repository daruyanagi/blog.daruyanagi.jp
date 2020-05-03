---
date: 2012-03-17T20:49:50.0000000
draft: false
title: "最初に生成されたウィンドウがメインウィンドウ"
tags: ["WPF", "C#"]
eyecatch: 
---

<pre class="code" data-unlink>﻿&lt;Application x:Class=&#34;SoundKeyboard2012.App&#34;
xmlns=&#34;http://schemas.microsoft.com/winfx/2006/xaml/presentation&#34;
xmlns:x=&#34;http://schemas.microsoft.com/winfx/2006/xaml&#34;
StartupUri=&#34;MainWindow.xaml&#34;&gt;
&lt;Application.Resources&gt;

&lt;/Application.Resources&gt;
&lt;/Application&gt;</pre>
<p>こう書いたら、MainWindow がメインウィンドウになると思うじゃないですか。けれど、WPF って「最初に生成されたウインドウがメインウィンドウになる」んだね。Windows型のメンバ変数をフィールドで初期化していた（ public Window HogeWindow = new HogeWindow() ）ので、デバッグ時の動作（MainWindow.xaml がメインウィンドウ）と、リリースバイナリの動作（HogeDialog.xamlがメインウィンドウ）が違っていて、ちょっと困った。</p>

<pre class="code" data-unlink>private void Application_Startup(object sender, StartupEventArgs e)
{
MainWindow = new MainWindow();
}</pre>
<p>明示的にメインウィンドウを指定してあげれば問題ない。</p>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/system.windows.application.startupuri.aspx">
<p>StartupUri を宣言で設定してもプログラムで設定しても、対応する UI リソースは Startup イベントが処理されるまで読み込まれません。 したがって、Startup の処理時には、Windows プロパティまたは MainWindow プロパティからのウィンドウにアクセスできません。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/system.windows.application.startupuri.aspx">

Application.StartupUri &#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3;  (System.Windows)

</a></cite>
</blockquote>

<blockquote cite="http://msdn.microsoft.com/ja-jp/library/system.windows.application.mainwindow.aspx">
<p>MainWindow には、AppDomain で<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%A4%A5%F3%A5%B9%A5%BF%A5%F3%A5%B9">インスタンス</a>化される最初の Window オブジェクトへの参照が自動的に設定されます。</p>

<cite><a href="http://msdn.microsoft.com/ja-jp/library/system.windows.application.mainwindow.aspx">

Application.MainWindow &#x30D7;&#x30ED;&#x30D1;&#x30C6;&#x30A3;  (System.Windows)

</a></cite>
</blockquote>
