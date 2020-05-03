---
date: 2014-06-19T21:00:43.0000000
draft: false
title: "オープン拡張辞書を Windows Runtime アプリで読み書きする（1）"
tags: ["Windows Runtime"]
eyecatch: 
---

<blockquote cite="http://windows.microsoft.com/ja-jp/windows-8/ime-open-dictionary-help">
<p>オープン拡張辞書は、Microsoft IMEの追加辞書を作成、共有する機能です。簡単にインストールができるので、Webページや共有フォルダーに置いたり、メールに添付して配布したり、シーンに応じて多様な方法で共有と配布ができます。</p>

<cite><a href="http://windows.microsoft.com/ja-jp/windows-8/ime-open-dictionary-help">Microsoft IME &#x30AA;&#x30FC;&#x30D7;&#x30F3;&#x62E1;&#x5F35;&#x8F9E;&#x66F8;&#x306B;&#x3064;&#x3044;&#x3066;</a></cite>
</blockquote>
<p>Windows 8 以降だと OS 標準の IME で使えるのに、割りと流行ってない感じ。もっと使われないともったいなーと思ったので、こいつが編集できる Windows ストア アプリでも作ろうと思い立った。</p><p>オープン拡張辞書には二種類ある。</p>

<ul>
<li>.dctx：　UTF-8 でエンコードされた XML ファイル</li>
<li>.dctxc：　.dctx を ZIP で圧縮したもの</li>
</ul><p>あと署名を付けると収録できる単語数が増えるとか（署名されていない場合は1万語まで）いろいろあるのだけど、これはまぁ、今のところどうでもいい。今回はとりあえず .dctx が読めることを目標にする。ZIP うんぬんは、まぁ、.NET Framework 4.5 でごにょごにょすれば割と簡単にできるのだろう（慢心</p><p>とりあえずはクラス作りから。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink><span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionary
{
<span class="synType">public</span> OpenExtendedDictionary()
{
DictionaryInfo = <span class="synStatement">new</span> OpenExtendedDictionaryInfo();
}

<span class="synType">public</span> <span class="synType">string</span> DictionaryGuid { get; set; }
<span class="synType">public</span> <span class="synType">string</span> DictionaryLanguage { get; set; }
<span class="synType">public</span> <span class="synType">string</span> DictionaryVersion { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> CommentInsertion { get; set; }
<span class="synType">public</span> OpenExtendedDictionaryInfo DictionaryInfo { get; set; }
<span class="synType">public</span> ObservableCollection&lt;OpenExtendedDictionaryEntry&gt; DictionaryEntries { get; set; }
}

<span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionaryInfo
{
<span class="synType">public</span> <span class="synType">string</span> ShortName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> LongName { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Description { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Copyright { get; set; }
<span class="synType">public</span> <span class="synType">string</span> Language { get; set; }
}

<span class="synType">public</span> <span class="synType">class</span> OpenExtendedDictionaryEntry
{
<span class="synType">public</span> <span class="synType">string</span> PartOfSpeech { get; set; }
<span class="synType">public</span> <span class="synType">string</span> OutputString { get; set; }
<span class="synType">public</span> <span class="synType">string</span> InputString { get; set; }
<span class="synType">public</span> <span class="synType">int</span> Priority { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> ReverseConversion { get; set; }
<span class="synType">public</span> <span class="synType">bool</span> CommonWord { get; set; }
}
</pre><p>こんな感じだろうか。ほんとは INotifyPropertyChanged とかも実装すべきなんだろうけれど、今回はまだいいや。</p><p>あと、ここまで書いてから仕様を見直して知ったのだけど、DictionaryInfo は言語ごとに複数持てるので、リスト（言語で引けるようにディクショナリにしたほうがいいかな）じゃないとだめだ。めんどくさいので、あとで直すことにする。</p>

<div class="section">
<h3>次回</h3>
<p>XML を読み書きする方法は3つほどある。</p>

<ol>
<li>XmlDocument を使う。あまり使ったことがないから知らん</li>
<li>XDocument を使う。LINQ と相性がいい</li>
<li>シリアライズする。どうやるのかわからんが、一番かっこよさそうな実装</li>
</ol><p>気が向いたら続きを書く。</p>

</div>