---
title: "Hatena2Hugo v1.1.0"
date: 2020-05-09T05:58:18+09:00
draft: false
tags: ["Hatena2Hugo", "Announce"]
eyecatch: image1.png
---
![Hatena2Hugo v1.1.0](image1.png)

Hatena2Hugo v1.1.0 をリリースしました。

[https://github.com/daruyanagi/Hatena2Hugo/releases/tag/v1.1.0](https://github.com/daruyanagi/Hatena2Hugo/releases/tag/v1.1.0)

## 変更点

- バージョン情報を出力するスイッチ
- コンソール出力の改善
- ハードコードしていたデフォルトタイトルを起動オプションに
- リファクタリング

`fotolife` フラグを `string` ではなく `bool` にしたかったのですが、バインディングがちゃんと機能しない原因がよくわからなかったのでそのままです。まぁ、別にいいよね。
