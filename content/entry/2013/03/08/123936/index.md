---
date: 2013-03-08T12:39:36.0000000
draft: false
title: "Windows 8 のセキュリティ機能 ―― Windows XP 以降と比較して"
tags: ["Windows 8", "Windows", "セキュリティ"]
eyecatch: 
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20130610230039.png" alt="f:id:daruyanagi:20130610230039p:plain" title="f:id:daruyanagi:20130610230039p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>「Windows 8 イラネ！」の大合唱に悲しくなる今日この頃ですが、皆様いかがお過ごしでしょうか。まぁ、知ってて「要らねぇ」と言っているのだったら、かなりたいしたものだと思うのですけど。</p><p>たとえばセキュリティ機能だけみても、Windows 7 から Windows 8 へアップデートする意味はあると思うのですよ。</p>

<ul>
<li>Visual C++ コンパイラの改良（enhanced /GS）</li>
<li>ASLR の強化（実行時ランダム化）</li>
<li>ヒープ保護の強化</li>
<li>カーネル内部の強化</li>
</ul><p>マルウェアによる攻撃手法と OS による防御機能は共進化している。OS への出費をケチっても、結局おカネを出してサードパーティ製ソフトを導入するか、自分で保護と注意を徹底するか（できるものならな）、長年の怠慢の対価を支払うか、でしかないわけで。</p><p>ちなみに、セキュリティ機能を Windows XP 以降と比較。実に多くの機能が追加されているのがわかる。</p>

<table>
<tr>
<td></td>
<td>Win XP</td>
<td>XP SP2</td>
<td>Vista, 7</td>
<td>Win 8</td>
</tr>
<tr>
<td>DEP（ソフトウェア）</td>
<td>×</td>
<td>○</td>
<td>○</td>
<td>○</td>
</tr>
<tr>
<td>DEP（ハードウェア）</td>
<td>×</td>
<td>○</td>
<td>○</td>
<td>○</td>
</tr>
<tr>
<td>ASLR（スタック）</td>
<td>×</td>
<td>×</td>
<td>○</td>
<td>◎</td>
</tr>
<tr>
<td>ASLR（モジュール）</td>
<td>×</td>
<td>×</td>
<td>○</td>
<td>◎</td>
</tr>
<tr>
<td>ASLR（ヒープ）</td>
<td>×</td>
<td>×</td>
<td>×</td>
<td>○</td>
</tr>
<tr>
<td>ヒープ保護</td>
<td>×</td>
<td>×</td>
<td>△</td>
<td>○</td>
</tr>
<tr>
<td>カーネル保護（ASLR）</td>
<td>×</td>
<td>×</td>
<td>△</td>
<td>○</td>
</tr>
<tr>
<td>カーネル保護（DEP）</td>
<td>×</td>
<td>×</td>
<td>△</td>
<td>○</td>
</tr>
<tr>
<td>カーネル保護（NULL dereferences）</td>
<td>×</td>
<td>×</td>
<td>×</td>
<td>○</td>
</tr>
<tr>
<td>カーネル保護（SMEP/PXN）</td>
<td>×</td>
<td>×</td>
<td>×</td>
<td>○</td>
</tr>
</table><p>あと、32bit よりも 64bit の方が強化された ASLR の恩恵が大きい。</p><p>ただし、いかにシステムを強化しようと</p>

<ul>
<li>メンテナンスされていない古いプログラムを狙う</li>
<li>セキュリティの甘い“人間”を狙う</li>
</ul><p>といった攻撃は依然有効。緩和することはできるけれどネ。</p><p>以下は参考資料。とくにひとつ目の PDF が日本語でありがたい。</p>

<ul>
<li><a href="http://www.fourteenforty.jp/assets/files/monthly_research/MR201209_Windows8_Exploit_Mitigation.pdf">http://www.fourteenforty.jp/assets/files/monthly_research/MR201209_Windows8_Exploit_Mitigation.pdf</a></li>
<li><a href="http://ensiwiki.ensimag.fr/images/e/e8/GreHack-2012-talk-Kostya_Kortchinsky_Crypt0ad_-10_years_later_which_in_memory_vulnerabilities_still_matter.pdf">http://ensiwiki.ensimag.fr/images/e/e8/GreHack-2012-talk-Kostya_Kortchinsky_Crypt0ad_-10_years_later_which_in_memory_vulnerabilities_still_matter.pdf</a></li>
<li><a href="http://media.blackhat.com/bh-us-12/Briefings/M_Miller/BH_US_12_Miller_Exploit_Mitigation_Slides.pdf">http://media.blackhat.com/bh-us-12/Briefings/M_Miller/BH_US_12_Miller_Exploit_Mitigation_Slides.pdf</a></li>
</ul>