---
date: 2019-02-03T00:51:14.0000000
draft: false
title: "2月1日：ぼっち 365 をやめる準備をした。G Suite でドメイン エイリアスを設定"
tags: ["G Suite", "Office 365"]
eyecatch: 20190203003129.png
---
<p>うちのメールは Office 365 のビジネスプランを1人で使う、いわゆる「ぼっち 365」だったんだけど、最近は</p>

<ul>
<li>OneDrive がプライベート用とビジネス用で分かれるのがだるい</li>
<li>よく考えたらビジネス向けの機能をほぼ使ってない</li>
</ul><p>みたいな感じでほぼ「メールを独自ドメインで運用」するためだけに使っている状態だった（他にもメリットがないわけではなかったが……）。しかし、それも不要になった。daruyanagi.net を取り返し、G Suite（むかしからずっと使ってた Google Apps の無料版）が再び利用できるようになったためだ。あとは daruyanagi.jp でも G Suite でメールを受け取れるようにすれば、ぼっち 365 は完全に要らなくなる。</p>

<div class="section">
<h3>ドメイン エイリアス</h3>
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20190203003129.png" alt="f:id:daruyanagi:20190203003129p:plain" title="f:id:daruyanagi:20190203003129p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>G Suite には「ドメイン エイリアス」という機能があって、これを利用すると</p>

<ul>
<li><b>mail@sample.net </b>：← 元のドメイン</li>
<li><b>mail@sample.jp</b>：sample.jp は sample.net のドメイン エイリアス</li>
</ul><p>のどっちでもメールを受け取れるようになる。うちの場合は、こんな感じ。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20190203003457.png" alt="f:id:daruyanagi:20190203003457p:plain" title="f:id:daruyanagi:20190203003457p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>Catch All（@ の前が何でも受信トレイに受け取れるようにするヤツ）にしてるので *@～ という表記になっているが、3つのドメインでメールアドレスが作られているのがわかる。</p><p>ドメイン エイリアスを利用するには、メイン ドメインと同様、ドメインの所有権を確認する必要がある。やり方はメイン ドメインと同じで、txt レコードを設定したり、meta タグを埋めたりするヤツ。メールを受信するための mx レコードの設定もメイン ドメインと同じ感じでやる。mx レコードのセットアップが Google 側で認識されると、勝手にメールアドレスが追加される。 すぐには反映されないので、半日ぐらい放っておくといいと思う。</p><p>あとは、Gmail で差出人アドレスとして使えるようにしたり～とかいろいろやれば完了。daruyanagi.net/jp のどちらでもメールを受け取れるようになった。送信もオッケーだ。</p><p>以前、名刺を刷った後に daruyanagi.net を失い、daruyanagi.jp のメールアドレスで名刺を作り直す羽目になったけど、今はどっちでも受け取れるから、昔の名刺を使っても問題ない。やったね！　無駄にならずにすんだよ！！（震え声</p>

</div>
<div class="section">
<h3>問題：メールボックスの容量が足りない</h3>
<p>こんな感じで Office 365（Outlook）から G Suite（Gmail）に移行できそうなのだけど、すべてがうれしいことだらけでもない。</p>

<ul>
<li>利点
<ul>
<li>Catch All が使える</li>
</ul></li>
<li>欠点
<ul>
<li>メールボックスが <s>3GB しかない</s>15GB だった（Office 365 は 50GB ぐらいあるのかな？　無料版だし仕方ないが）</li>
<li>Windows 10 メールで［優先トレイ］機能が利用できなくなる</li>
</ul></li>
</ul><p>まぁ、これは満タンになってから対処を考えることにする。ビジネス版の代わりに Office 365 Solo を契約してるから（メールボックス 50GB ある！）、古いメールはそっちに逃がしちゃってもいいな。</p>

</div>