---
date: 2018-01-10T02:53:02.0000000
draft: false
title: "2018年1月9日の日記：ASP.NET Core Razor Page アプリを作るのが楽しくなってきてしまった。"
tags: ["日記", "ASP.NET Core Razor Page", "ASP.NET Core"]
eyecatch: 
---
<p>狂風、窓を叩き、昼間っから近所のババアがマンションのベランダから向かいのサンドウィッチ屋さんをヒステリックにディスるカオスな日だった。どんな事情があるのかは知らんが、サンドイッチ屋のおばさんはオマケにパンの耳を恵んでくれる天使だ。大方、猿叫喧しいババアが精神でも病んでるんだろう。お節介かもしれんが、これが続くなら警察でも呼ぼうかと思った。</p><p>関係ないけど、ワサビ入りサンドイッチ食べたくなったので、明日のお昼はサンドイッチを買いに行こうかと思う。</p><p>Web アプリケーション（仮称：Tsundoku。ヘボン式だとこの綴りでいいのだけど、個人的には Tshu<b>m</b>doku の方がしっくりくる？）の方は、パブリックタイムライン、書籍の検索画面、書籍の個別ページ、ユーザーページが完成した。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180110023404.png" alt="f:id:daruyanagi:20180110023404p:plain" title="f:id:daruyanagi:20180110023404p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>パブリックタイムライン。画面はこれだけあるけど、データベースのテーブルは（ユーザー管理と書籍情報のキャッシュ代わりに使っているテーブルを除けば）ユーザーアクティビティを管理するのが1つあるだけで、これは単にそれを引っ張ってきてる。Entity Framework のリレーションシップ回りも慣れてきて、Include()、IncludeThen() が使えるようになってきた。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180110023510.png" alt="f:id:daruyanagi:20180110023510p:plain" title="f:id:daruyanagi:20180110023510p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>書籍の検索画面。ちなみに Amazon 関連は Nager.AmazonProductAdvertising というのを使わせてもらっている。</p><p><iframe src="https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com%2Ftinohager%2FNager.AmazonProductAdvertising" title="tinohager/Nager.AmazonProductAdvertising" class="embed-card embed-webcard" scrolling="no" frameborder="0" style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"></iframe><cite class="hatena-citation"><a href="https://github.com/tinohager/Nager.AmazonProductAdvertising">github.com</a></cite><br />
</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>var authentication = <span class="synStatement">new</span> AmazonAuthentication();
authentication.AccessKey = <span class="synConstant">&quot;accesskey&quot;</span>;
authentication.SecretKey = <span class="synConstant">&quot;secretkey&quot;</span>;

var wrapper = <span class="synStatement">new</span> AmazonWrapper(authentication, AmazonEndpoint.US, <span class="synConstant">&quot;nager-20&quot;</span>);
var result = wrapper.Lookup(<span class="synConstant">&quot;B00BYPW00I&quot;</span>);
</pre><p>あまり自由度はないけれど、シンプルですごくいいと思った。Amazon アソシエイトのキーも久しぶりにもらったけど、UI がシンプルになってて昔よりハードルがだいぶ下がってる感じがある。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180110023613.png" alt="f:id:daruyanagi:20180110023613p:plain" title="f:id:daruyanagi:20180110023613p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>書籍の個別画面。書籍情報と本に紐づいたアクティビティをタイムラインで表示。</p><p>読書ステータスの更新もここから可能で、積読 → 読中 → 読了（→ 再読）のサイクルをボタンでぷちぷち変更できる。コメントをつけたり、進捗管理もできるようにするつもり。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20180110023533.png" alt="f:id:daruyanagi:20180110023533p:plain" title="f:id:daruyanagi:20180110023533p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>ユーザーページ。Twitter みたいにフォローできるようにするつもり。フォロー・フォロワーの表現だけならいいけど、フォロワーのタイムラインとか作るの割と大変そうな感じする？</p><p>このアプリは作って遊んでるだけで公開するかどうか微妙だけど、どうにも開発が楽しくなってきちゃって（なんかやっとこさ掌の上でくるくるできる感覚になってきたわけですよ！）、当分は止まらないかなって感じある。</p>

<div class="section">
<h3>ToDo</h3>

<ul>
<li>MVC と Razor Page の混在についてちょっと調べる。謎のルーティングエラーで30分無駄にされた</li>
<li>IEnumerable<string> を string にするスマートな拡張メソッドを作りたいけど名前が決まらん件について</li>
<li>enum の拡張メソッドをはやしておくとビューがスマートになるなぁ</li>
</ul>
</div>