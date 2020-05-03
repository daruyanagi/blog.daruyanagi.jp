---
date: 2012-10-16T20:40:27.0000000
draft: false
title: "［Windows］ Ruby + DevKit のインストール"
tags: ["Windows", "Ruby"]
eyecatch: 
---

<div class="section">
<h3>ダウンロード</h3>
<p><img src="20121016202218.png" alt="f:id:daruyanagi:20121016202218p:plain" title="f:id:daruyanagi:20121016202218p:plain" class="hatena-fotolife"></p><p><a href="http://rubyinstaller.org/downloads/">http://rubyinstaller.org/downloads/</a> で、</p>

<ul>
<li>Ruby 1.9.3-p194</li>
<li>DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe</li>
</ul><p>をダウンロード。古いバージョンの Ruby を利用する場合は、DevKit のバージョンに注意。</p>

</div>
<div class="section">
<h3>Ruby 1.9.3-p194 のインストール</h3>
<p><img src="20121016202401.png" alt="f:id:daruyanagi:20121016202401p:plain" title="f:id:daruyanagi:20121016202401p:plain" class="hatena-fotolife"></p><p>EXE 形式なので、そのまま実行。途中、Ruby の実行ファイルへパスを通しておくこと。なんでデフォでチェックが入っていないんだろう。関連付けは好きにすればいいと思う。</p>

</div>
<div class="section">
<h3>DevKit のインストール</h3>
<p><img src="20121016202743.png" alt="f:id:daruyanagi:20121016202743p:plain" title="f:id:daruyanagi:20121016202743p:plain" class="hatena-fotolife"></p><p>このままでも利用できるのだけど、一部ネイティブな RubyGems をビルド・インストールには DevKit が必要。</p><p>慣れていれば、自己解凍書庫の中身をそのまま Ruby のインストールフォルダへコピーすればよかったと思う。自信がない場合は、公式の手順（<a href="https://github.com/oneclick/rubyinstaller/wiki/Development-Kit">https://github.com/oneclick/rubyinstaller/wiki/Development-Kit</a>）に従っておく。</p>

<div class="section">
<h4>C:\DevKit へ解凍</h4>
<p>解凍先はどこでもいい。7z 形式の自己解凍書庫になっているので、実行して解凍先（C:\DevKit）を指定する。</p><p><img src="20121016203218.jpg" alt="f:id:daruyanagi:20121016203218j:plain" title="f:id:daruyanagi:20121016203218j:plain" class="hatena-fotolife"></p>

</div>
<div class="section">
<h4>ruby dk.rb init / ruby dk.rb install</h4>
<p>コマンドプロンプトを起動。解凍先（C:\DevKit）へ移動して、コマンドを二つ実行する。</p>
<pre class="code lang-sh" data-lang="sh" data-unlink><span class="synStatement">&gt;cd</span> C:\DevKit

C:\DevKit<span class="synStatement">&gt;</span>ruby dk.rb init
<span class="synStatement">[</span>INFO<span class="synStatement">]</span> found RubyInstaller v1.<span class="synConstant">9</span>.<span class="synConstant">3</span> at C:/Ruby193

Initialization <span class="synStatement">complete!</span> Please review and modify the auto-generated <span class="synStatement">'</span><span class="synConstant">config.yml</span><span class="synStatement">'</span> file to ensure it contains the root directories to all of the installed Rubies you want enhanced by the DevKit.

C:\DevKit<span class="synStatement">&gt;</span>ruby dk.rb <span class="synStatement">install</span>
<span class="synStatement">[</span>INFO<span class="synStatement">]</span> Updating convenience notice gem override <span class="synStatement">for</span> <span class="synStatement">'</span><span class="synConstant">C:/Ruby193</span><span class="synStatement">'</span>
<span class="synStatement">[</span>INFO<span class="synStatement">]</span> Installing <span class="synStatement">'</span><span class="synConstant">C:/Ruby193/lib/ruby/site_ruby/devkit.rb</span><span class="synStatement">'</span>
</pre><p>ruby dk.rb init は Ruby のインストールフォルダを検知して、config.yml を生成する。ruby dk.rb install はそれをもとに DevKit をインストールする。通常、config.yml の編集は必要ないはず。</p><p>どうせなら RubyInstaller に DevKit も同梱しておいてほしいけれど（ライセンスの関係かな？　知らんけど）、ゆとり過ぎますかね。</p>

</div>
</div>