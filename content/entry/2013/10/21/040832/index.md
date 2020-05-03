---
date: 2013-10-21T04:08:32.0000000
draft: false
title: "はてなブログの人気の記事リストを表示する"
tags: ["はてな", "JavaScript"]
eyecatch: http://cdn-ak.f.st-hatena.com/images/fotolife/d/daruyanagi/20131021/20131021035539.png
---
<p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131021035539.png" alt="f:id:daruyanagi:20131021035539p:plain" title="f:id:daruyanagi:20131021035539p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>このブログのサイドバーにある「人気記事」のリストは、しばやんが作ったはてなブログ用の人気エントリー API を利用している。</p>

<ul>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20130511/1368281675">Nancy &#x3067;&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;&#x7528;&#x306E;&#x4EBA;&#x6C17;&#x30A8;&#x30F3;&#x30C8;&#x30EA;&#x30FC; API &#x3092;&#x4F5C;&#x3063;&#x3066;&#x307F;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
<li><a href="http://shiba-yan.hatenablog.jp/entry/20130523/1369239060">&#x306F;&#x3066;&#x306A;&#x30D6;&#x30ED;&#x30B0;&#x7528;&#x306E;&#x4EBA;&#x6C17;&#x30A8;&#x30F3;&#x30C8;&#x30EA;&#x30FC;&#x8868;&#x793A;&#x30D1;&#x30FC;&#x30C4;&#x3092;&#x771F;&#x9762;&#x76EE;&#x306B;&#x4F5C;&#x3063;&#x305F; - &#x3057;&#x3070;&#x3084;&#x3093;&#x96D1;&#x8A18;</a></li>
</ul><p>最近ちょっと動かないことがあったのだけど、</p><p><script>    window.twttr = (function(d, s, id) {        var js, fjs = d.getElementsByTagName(s)[0],            t = window.twttr || {};        if (d.getElementById(id)) return t;        js = d.createElement(s);        js.id = id;        js.src = "https://platform.twitter.com/widgets.js";        fjs.parentNode.insertBefore(js, fjs);        t._e = [];        t.ready = function(f) {            t._e.push(f);        };        return t;    }(document, "script", "twitter-wjs"));</script><script>    twttr.ready(function (twttr) {        var el = document.getElementsByClassName('twitter-syntax-tweet-id-391341056127934464');        for (var i=0;i<el.length;i++) {            if (!!el[i].getAttribute('data-is-tweet-loaded')){                continue;            }            el[i].setAttribute('data-is-tweet-loaded', '1');            twttr.widgets.createTweet('391341056127934464',el[i],{});        }    });</script><div class="twitter-syntax-tweet-id-391341056127934464"></div></p><p>とのこと。最近、はてながスクリプトの読み込み順序をイジったのが原因らしい。というわけで、この対処法を組み込んで実行してみる。
<br />
<br />
</p>

<div class="section">
<h3>シンプルな例</h3>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;en&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">url</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    </span><span class="synIdentifier">var</span><span class="synSpecial"> ul = $</span>(<span class="synConstant">&quot;#hatena-bookmark&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    ul.</span><span class="synStatement">parent</span>()<span class="synSpecial">.prev</span>()<span class="synSpecial">.wrapInner</span>(<span class="synConstant">&quot;&lt;a href=</span><span class="synSpecial">\&quot;</span><span class="synConstant">http://b.hatena.ne.jp/entrylist?url=&quot;</span><span class="synSpecial"> + url + </span><span class="synConstant">&quot;&amp;sort=count</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;/a&gt;&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial"> </span>
<span class="synSpecial">                    $.ajax</span>(<span class="synIdentifier">{</span>
<span class="synSpecial">                        url: </span><span class="synConstant">&quot;http://rss2json.azurewebsites.net/hatena/bookmark&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                        data: </span><span class="synIdentifier">{</span><span class="synSpecial"> url: url </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                        dataType: </span><span class="synConstant">&quot;jsonp&quot;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span>)<span class="synSpecial">.done</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">entries</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synIdentifier">var</span><span class="synSpecial"> list = </span><span class="synIdentifier">[]</span><span class="synSpecial">;</span>
<span class="synSpecial">                        $.each</span>(<span class="synSpecial">entries, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> link = $</span>(<span class="synConstant">&quot;&lt;a/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> href: </span><span class="synIdentifier">this</span><span class="synSpecial">.link </span><span class="synIdentifier">}</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">$</span>(<span class="synConstant">&quot;&lt;span/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> text: </span><span class="synIdentifier">this</span><span class="synSpecial">.title </span><span class="synIdentifier">}</span>))<span class="synSpecial">;</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> count = $</span>(<span class="synConstant">&quot;&lt;a/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> href: </span><span class="synConstant">&quot;http://b.hatena.ne.jp/entry/&quot;</span><span class="synSpecial"> + </span><span class="synIdentifier">this</span><span class="synSpecial">.link, text: </span><span class="synIdentifier">this</span><span class="synSpecial">.count + </span><span class="synConstant">&quot;users&quot;</span><span class="synSpecial"> </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> container = $</span>(<span class="synConstant">&quot;&lt;span/&gt;&quot;</span>)<span class="synSpecial">.addClass</span>(<span class="synConstant">&quot;bookmark-count&quot;</span>)<span class="synSpecial">.append</span>(<span class="synIdentifier">this</span><span class="synSpecial">.count &gt; </span>10<span class="synSpecial"> ? $</span>(<span class="synConstant">&quot;&lt;strong/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">count</span>)<span class="synSpecial"> : </span><span class="synIdentifier">this</span><span class="synSpecial">.count &gt;= </span>5<span class="synSpecial"> ? $</span>(<span class="synConstant">&quot;&lt;em/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">count</span>)<span class="synSpecial"> : count</span>)<span class="synSpecial">;</span>
<span class="synSpecial"> </span>
<span class="synSpecial">                            list.push</span>(<span class="synSpecial">$</span>(<span class="synConstant">&quot;&lt;li/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">link, container</span>))<span class="synSpecial">;</span>
<span class="synSpecial">                        </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                        ul.append</span>(<span class="synSpecial">list</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synStatement">document</span><span class="synSpecial">.write</span>(<span class="synConstant">&quot;&lt;ul id=</span><span class="synSpecial">\&quot;</span><span class="synConstant">hatena-bookmark</span><span class="synSpecial">\&quot;</span><span class="synConstant"> class=</span><span class="synSpecial">\&quot;</span><span class="synConstant">hatena-urllist</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;/ul&gt;&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)(<span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;hatena-bookmark&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p>このコードをコピペして実行するとこんな感じに表示されるはず。</p><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131021035954.png" alt="f:id:daruyanagi:20131021035954p:plain" title="f:id:daruyanagi:20131021035954p:plain" class="hatena-fotolife" itemprop="image"></span><br />
</p>

</div>
<div class="section">
<h3>ちょっとリッチにしてみた</h3>

<blockquote>
<p>あとは API から返却している JSON に image というキーを追加しました。このキーには、はてなブックマークが保持しているエントリ画像への URL が格納されるので、こんな一覧表示もできます。</p>

</blockquote>
<p>これを利用すると、少しだけリッチになる（CSS は割と適当なので注意）。</p>
<pre class="code lang-html" data-lang="html" data-unlink><span class="synComment">&lt;!DOCTYPE html&gt;</span>

<span class="synIdentifier">&lt;</span><span class="synStatement">html</span><span class="synIdentifier"> </span><span class="synType">lang</span><span class="synIdentifier">=</span><span class="synConstant">&quot;ja&quot;</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">meta</span><span class="synIdentifier"> </span><span class="synType">charset</span><span class="synIdentifier">=</span><span class="synConstant">&quot;utf-8&quot;</span><span class="synIdentifier"> /&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>マイ サイトのタイトル<span class="synIdentifier">&lt;/</span><span class="synStatement">title</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">link</span><span class="synIdentifier"> </span><span class="synType">href</span><span class="synIdentifier">=</span><span class="synConstant">&quot;~/favicon.ico&quot;</span><span class="synIdentifier"> </span><span class="synType">rel</span><span class="synIdentifier">=</span><span class="synConstant">&quot;shortcut icon&quot;</span><span class="synIdentifier"> </span><span class="synType">type</span><span class="synIdentifier">=</span><span class="synConstant">&quot;image/x-icon&quot;</span><span class="synIdentifier"> /&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier"> </span><span class="synType">src</span><span class="synIdentifier">=</span><span class="synConstant">&quot;http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.js&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>
<span class="synSpecial">            </span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">url</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                $</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                    </span><span class="synIdentifier">var</span><span class="synSpecial"> ul = $</span>(<span class="synConstant">&quot;#hatena-bookmark&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    ul.</span><span class="synStatement">parent</span>()<span class="synSpecial">.prev</span>()<span class="synSpecial">.wrapInner</span>(<span class="synConstant">&quot;&lt;a href=</span><span class="synSpecial">\&quot;</span><span class="synConstant">http://b.hatena.ne.jp/entrylist?url=&quot;</span><span class="synSpecial"> + url + </span><span class="synConstant">&quot;&amp;sort=count</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;/a&gt;&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial"> </span>
<span class="synSpecial">                    $.ajax</span>(<span class="synIdentifier">{</span>
<span class="synSpecial">                        url: </span><span class="synConstant">&quot;http://rss2json.azurewebsites.net/hatena/bookmark&quot;</span><span class="synSpecial">,</span>
<span class="synSpecial">                        data: </span><span class="synIdentifier">{</span><span class="synSpecial"> url: url </span><span class="synIdentifier">}</span><span class="synSpecial">,</span>
<span class="synSpecial">                        dataType: </span><span class="synConstant">&quot;jsonp&quot;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span>)<span class="synSpecial">.done</span>(<span class="synIdentifier">function</span><span class="synSpecial"> </span>(<span class="synSpecial">entries</span>)<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                        </span><span class="synIdentifier">var</span><span class="synSpecial"> list = </span><span class="synIdentifier">[]</span><span class="synSpecial">;</span>
<span class="synSpecial">                        $.each</span>(<span class="synSpecial">entries, </span><span class="synIdentifier">function</span><span class="synSpecial"> </span>()<span class="synSpecial"> </span><span class="synIdentifier">{</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> image = $</span>(<span class="synConstant">&quot;&lt;img/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> src: </span><span class="synIdentifier">this</span><span class="synSpecial">.image === </span><span class="synConstant">&quot;&quot;</span><span class="synSpecial"> ? </span><span class="synConstant">&quot;/Images/404.jpg&quot;</span><span class="synSpecial"> : </span><span class="synIdentifier">this</span><span class="synSpecial">.image, alt: </span><span class="synIdentifier">this</span><span class="synSpecial">.title, text: </span><span class="synIdentifier">this</span><span class="synSpecial">.title </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> link = $</span>(<span class="synConstant">&quot;&lt;a/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> href: </span><span class="synIdentifier">this</span><span class="synSpecial">.link </span><span class="synIdentifier">}</span>)<span class="synSpecial">.addClass</span>(<span class="synConstant">&quot;bookmark-title&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">$</span>(<span class="synConstant">&quot;&lt;span/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> text: </span><span class="synIdentifier">this</span><span class="synSpecial">.title </span><span class="synIdentifier">}</span>))<span class="synSpecial">;</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> count = $</span>(<span class="synConstant">&quot;&lt;a/&gt;&quot;</span><span class="synSpecial">, </span><span class="synIdentifier">{</span><span class="synSpecial"> href: </span><span class="synConstant">&quot;http://b.hatena.ne.jp/entry/&quot;</span><span class="synSpecial"> + </span><span class="synIdentifier">this</span><span class="synSpecial">.link, text: </span><span class="synIdentifier">this</span><span class="synSpecial">.count + </span><span class="synConstant">&quot;users&quot;</span><span class="synSpecial"> </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                            </span><span class="synIdentifier">var</span><span class="synSpecial"> container = $</span>(<span class="synConstant">&quot;&lt;span/&gt;&quot;</span>)<span class="synSpecial">.addClass</span>(<span class="synConstant">&quot;bookmark-count&quot;</span>)<span class="synSpecial">.append</span>(<span class="synIdentifier">this</span><span class="synSpecial">.count &gt; </span>10<span class="synSpecial"> ? $</span>(<span class="synConstant">&quot;&lt;strong/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">count</span>)<span class="synSpecial"> : </span><span class="synIdentifier">this</span><span class="synSpecial">.count &gt;= </span>5<span class="synSpecial"> ? $</span>(<span class="synConstant">&quot;&lt;em/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">count</span>)<span class="synSpecial"> : count</span>)<span class="synSpecial">;</span>
<span class="synSpecial"> </span>
<span class="synSpecial">                            list.push</span>(<span class="synSpecial">$</span>(<span class="synConstant">&quot;&lt;li/&gt;&quot;</span>)<span class="synSpecial">.append</span>(<span class="synSpecial">image, link, container</span>))<span class="synSpecial">;</span>
<span class="synSpecial">                        </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                        ul.append</span>(<span class="synSpecial">list</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                    </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synIdentifier">}</span>)<span class="synSpecial">;</span>
<span class="synSpecial">                </span><span class="synStatement">document</span><span class="synSpecial">.write</span>(<span class="synConstant">&quot;&lt;ul id=</span><span class="synSpecial">\&quot;</span><span class="synConstant">hatena-bookmark</span><span class="synSpecial">\&quot;</span><span class="synConstant"> class=</span><span class="synSpecial">\&quot;</span><span class="synConstant">hatena-urllist</span><span class="synSpecial">\&quot;</span><span class="synConstant">&gt;&lt;/ul&gt;&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">            </span><span class="synIdentifier">}</span>)(<span class="synConstant">&quot;https://blog.daruyanagi.jp/&quot;</span>)<span class="synSpecial">;</span>
<span class="synSpecial">        </span><span class="synIdentifier">&lt;/</span><span class="synStatement">script</span><span class="synIdentifier">&gt;</span>

<span class="synPreProc">        </span><span class="synIdentifier">&lt;</span><span class="synStatement">style</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">#hatena-bookmark</span> <span class="synIdentifier">{</span>
<span class="synType">font-family</span>: Meiryo<span class="synSpecial">,</span> <span class="synConstant">sans-serif</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">#hatena-bookmark</span> <span class="synStatement">li</span> <span class="synIdentifier">{</span>
<span class="synType">display</span>: <span class="synConstant">block</span>;
<span class="synType">position</span>: <span class="synConstant">relative</span>;
<span class="synType">width</span>: <span class="synConstant">120px</span>;
<span class="synType">height</span>: <span class="synConstant">90px</span>;
<span class="synType">margin</span>: <span class="synConstant">6px</span>;
<span class="synType">float</span>: <span class="synConstant">left</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">#hatena-bookmark</span> <span class="synStatement">li</span> image <span class="synIdentifier">{</span>
<span class="synType">position</span>: <span class="synConstant">absolute</span>;
<span class="synType">bottom</span>: <span class="synConstant">0</span>;
<span class="synType">left</span>: <span class="synConstant">0</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">#hatena-bookmark</span> <span class="synStatement">li</span> <span class="synStatement">a</span><span class="synIdentifier">.bookmark-title</span> <span class="synIdentifier">{</span>
<span class="synType">position</span>: <span class="synConstant">absolute</span>;
<span class="synType">bottom</span>:<span class="synConstant">0</span>;
<span class="synType">left</span>: <span class="synConstant">0</span>;
<span class="synType">padding</span>: <span class="synConstant">6px</span>;
<span class="synType">font-size</span>: <span class="synConstant">10px</span>;
<span class="synType">height</span>: <span class="synConstant">26px</span>;
<span class="synType">overflow</span>: <span class="synConstant">hidden</span>;
<span class="synType">text-decoration</span>: <span class="synConstant">none</span>;
<span class="synType">color</span>: <span class="synConstant">white</span>;
<span class="synType">opacity</span>: <span class="synConstant">0.7</span>;
<span class="synType">background</span>: <span class="synConstant">gray</span>;
<span class="synIdentifier">}</span>

<span class="synIdentifier">#hatena-bookmark</span> <span class="synStatement">li</span> <span class="synIdentifier">.bookmark-count</span> <span class="synStatement">a</span> <span class="synIdentifier">{</span>
<span class="synType">position</span>: <span class="synConstant">absolute</span>;
<span class="synType">top</span>: <span class="synConstant">6px</span>;
<span class="synType">left</span>: <span class="synConstant">6px</span>;
<span class="synType">font-size</span>: <span class="synConstant">10px</span>;
<span class="synType">text-decoration</span>: <span class="synConstant">none</span>;
<span class="synType">text-shadow</span>: <span class="synConstant">1px</span> <span class="synConstant">1px</span> <span class="synConstant">12px</span> <span class="synConstant">gray</span>;
<span class="synType">color</span>: <span class="synConstant">red</span>;
<span class="synIdentifier">}</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">style</span><span class="synIdentifier">&gt;</span>
<span class="synPreProc">    </span><span class="synIdentifier">&lt;/</span><span class="synStatement">head</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;</span><span class="synStatement">ul</span><span class="synIdentifier"> </span><span class="synType">id</span><span class="synIdentifier">=</span><span class="synConstant">&quot;hatena-bookmark&quot;</span><span class="synIdentifier">&gt;&lt;/</span><span class="synStatement">ul</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">body</span><span class="synIdentifier">&gt;</span>
<span class="synIdentifier">&lt;/</span><span class="synStatement">html</span><span class="synIdentifier">&gt;</span>
</pre><p><span itemscope itemtype="http://schema.org/Photograph"><img src="20131021040518.png" alt="f:id:daruyanagi:20131021040518p:plain" title="f:id:daruyanagi:20131021040518p:plain" class="hatena-fotolife" itemprop="image"></span></p><p>サムネイルがない場合に表示する画像を ~/Images/404.jpg に用意してほしい。</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink><span class="synIdentifier">var</span> image = $(<span class="synConstant">&quot;&lt;img/&gt;&quot;</span>, <span class="synIdentifier">{</span> src: <span class="synIdentifier">this</span>.image === <span class="synConstant">&quot;&quot;</span> ? <span class="synConstant">&quot;/Images/404.jpg&quot;</span> : <span class="synIdentifier">this</span>.image, alt: <span class="synIdentifier">this</span>.title, text: <span class="synIdentifier">this</span>.title <span class="synIdentifier">}</span>);
</pre><p>と</p>
<pre class="code lang-javascript" data-lang="javascript" data-unlink>list.push($(<span class="synConstant">&quot;&lt;li/&gt;&quot;</span>).append(image, link, container));
</pre><p>の行以外はあんまり触っていない。できれば、もう少し大きいサムネイルもあればいいのにな。 <a href="http://daruyanagi.net/">http://daruyanagi.net/</a> にでも使うのに（チラッ</p>

</div>