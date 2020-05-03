---
date: 2012-08-24T09:50:23.0000000
draft: false
title: "WebMatrix でユーザー認証機能 ―― 準備編"
tags: ["ASP.net Web Pages", "WebMatrix"]
eyecatch: 
---
<p>お次はユーザー認証機能に挑戦しますかね？　Webサイトでデータを扱うとき、ユーザー認証機能がなかったらだいぶ困る。</p><p>というわけで、“Startar Site”テンプレートをみながら勉強しようかなぁ、と思ったのだけど……</p><p><img src="20120824092022.png" alt="f:id:daruyanagi:20120824092022p:plain" title="f:id:daruyanagi:20120824092022p:plain" class="hatena-fotolife"></p><p>ナンテコッタイ／(^o^)＼　ソースを見てみたら文字化けしてたり改行が吹っ飛んでたりで、一部<a class="keyword" href="http://d.hatena.ne.jp/keyword/%A5%BD%A1%BC%A5%B9%A5%B3%A1%BC%A5%C9">ソースコード</a>がぶっ壊れていた。修正を試みたのだけれど、途中で「いや待て、“Empty Site”から自分で作ったほうが勉強になるかもしれない」と思い直し、まっさらなWebサイトを作ってユーザー認証機能を追加してみることにした。</p><p><img src="20120824092316.png" alt="f:id:daruyanagi:20120824092316p:plain" title="f:id:daruyanagi:20120824092316p:plain" class="hatena-fotolife"></p>

<div class="section">
<h3>データベースを作成</h3>
<p>まずはユーザー情報を格納するデータベースを作成。名前は……思いつかなかったから“database.sdf”でいいや。</p><p><img src="20120824092517.png" alt="f:id:daruyanagi:20120824092517p:plain" title="f:id:daruyanagi:20120824092517p:plain" class="hatena-fotolife"></p><p>リネームした時のことを考えて、データベース名は App に格納しておくことにした。アプリケーションの起動時に実行される _AppStart.cshtml に記述しておく。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#_AppStart.cshtml

@{
App.Database = <span class="synConstant">&quot;database&quot;</span>; <span class="synComment">// 拡張子は要らないっぽい</span>
}
</pre>
</div>
<div class="section">
<h3>ユーザー情報テーブルを作成</h3>
<p>次に、認証情報を保存しておくテーブルを作成する。 <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a> では WebSecurity Helper というお手軽な認証システムがあるらしい。“Startar Site”テンプレートでも利用されていたのでそれを使おう。 WebSecurity.InitializeDatabaseConnection() でユーザー情報を管理するテーブルが初期化されるみたい。</p>
<pre class="code lang-cs" data-lang="cs" data-unlink>#_AppStart.cshtml

@{
App.Database = <span class="synConstant">&quot;database&quot;</span>;

WebSecurity.InitializeDatabaseConnection(
App.Database, <span class="synComment">// データベース名</span>
<span class="synConstant">&quot;Users&quot;</span>,      <span class="synComment">// テーブル名</span>
<span class="synConstant">&quot;UserId&quot;</span>,     <span class="synComment">// ID を格納するカラム</span>
<span class="synConstant">&quot;Name&quot;</span>,       <span class="synComment">// 一意なユーザー名を格納するカラム</span>
<span class="synConstant">true</span>          <span class="synComment">// テーブルがなかったら作れ</span>
);
}
</pre><p>しかし、「WebSecurity などというクラスは知らない」と怒られてしまう。デフォルトでは入っていないのね……</p><p><img src="20120824093457.png" alt="f:id:daruyanagi:20120824093457p:plain" title="f:id:daruyanagi:20120824093457p:plain" class="hatena-fotolife"></p><p>“Startar Site”テンプレートを「<a class="keyword" href="http://d.hatena.ne.jp/keyword/Visual%20Studio">Visual Studio</a>」でみてみたら、 <a class="keyword" href="http://d.hatena.ne.jp/keyword/WebMatrix">WebMatrix</a>.WebData.dll というアセンブリが必要であるらしい。これもどうせ NuGet で取得できるんでしょ？ わかってる、わかってる！</p>

</div>
<div class="section">
<h3>Microsoft <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Page 2 Web Data をインストール</h3>
<p><img src="20120824093635.png" alt="f:id:daruyanagi:20120824093635p:plain" title="f:id:daruyanagi:20120824093635p:plain" class="hatena-fotolife"></p><p>そこで適当に「WebData」などと検索してみたところ、「Microsoft <a class="keyword" href="http://d.hatena.ne.jp/keyword/ASP.NET">ASP.NET</a> Web Page 2 Web Data」というのがどうもあやしいくさい。さっそくインストールしてみると……ビンゴ！　無事、Web サイトを［実行］できました。テーブルもちゃんと作成されているみたい（まだからっぽだけど！）。</p><p><img src="20120824093836.png" alt="f:id:daruyanagi:20120824093836p:plain" title="f:id:daruyanagi:20120824093836p:plain" class="hatena-fotolife"></p>
<pre class="code lang-html" data-lang="html" data-unlink>#Default.cshtml

@{

}

<span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;<a class="keyword" href="http://d.hatena.ne.jp/keyword/utf-8">utf-8</a>&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synComment">&lt;!-- Starter Site テンプレートからパクって<a class="keyword" href="http://d.hatena.ne.jp/keyword/%CB%E2%B2%FE%C2%A4">魔改造</a>してみた！ --&gt;</span>
<span class="synIdentifier">&lt;</span>section<span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;login&quot;</span><span class="synIdentifier">&gt;</span>
@if (WebSecurity.IsAuthenticated) {
<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">li</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Users/@WebSecurity.CurrentUserName&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synUnderlined">                @WebSecurity.CurrentUserName</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">li</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Account/Logout&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">ログアウト</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
} else {
<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">li</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Account/Register&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">登録</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">li</span><span class="synIdentifier">&gt;&lt;</span><span class="synStatement">a</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/Account/Login&quot;</span><span class="synIdentifier">&gt;</span><span class="synUnderlined">ログイン</span><span class="synIdentifier">&lt;/</span><span class="synStatement">a</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">li</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
}
<span class="synIdentifier">&lt;/</span>section<span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>コレで準備は完了といったところかな。とりあえず、 Register / Login / Logout を作って、ユーザーページも表示できるようにしたいな。</p>

</div>