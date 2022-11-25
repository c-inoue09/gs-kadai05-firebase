# リアル対戦！イントロクイズ「イントロドン」
<img src ="https://user-images.githubusercontent.com/113824527/203875055-031456a8-3faa-4f91-9399-7f6f1f27da51.png" width="600px">

## ①課題内容（どんな作品か）
- 現在はひとりで遊ぶクイズになってますが、本当は同時接続のユーザとリアルタイムで対戦できるイントロクイズゲームになるはずでした！が消化不良です！
- 一人用のゲームとして成立するバージョンをデプロイしてますが、本当に作業してたコードは動かなくなっちゃいました(Githubには、動かないほうのコードを載せてます)
- Firebaseの仕様を知り、複数人で遊べる早押しゲームができたら楽しそう！と思って作りました。

- 主な機能
  - 誰かがスタートボタンを押すと、イントロがランダムで流れる
  - 正解の曲名を入力してボタンを押すとポイントが加算される
  - (重要だけどできなかった) botのトーク内容とユーザの入力内容をRealtime Databaseに送り、各自の表示画面に逐一反映される
  - (重要だけどできなかった)最も新しいレコードの内容に応じて、同時接続ユーザの画面を制御する

## ②工夫した点・こだわった点
- 出題中は力技で入力制御
  - 早押しクイズの実現方法を調査していたら、データベースロック(同時にアクセスする可能性がある場合に、ロックをかける)を理解しなければいけないらしかったが、今の自分には難しすぎたので「出題中のみ入力エリアを表示させる」「正解したら入力エリアを非表示にする」などのjQueryゴリ押しで対処しようとした
  - 結局複数人で遊べるところまでいってないので、意味はないのだが…

## ③難しかった点・次回トライしたいこと(又は機能)
- 【できてない】onValueを使いこなす
  - 実現したいことはonValueという関数を使えばできそうと森田先生に教わった(のと、冨田さんや岡野さんがちゃんと使われてるぽいのも横目でコード拝見してました！)が、自分のコードに組み込むと object object状態になり、うまいこと動きませんでした。

- 【てこずった】onChildAddedを使う
  - 同じメッセージが2回送信される状態が、わりと最終段階まで解消できなかった
  - JavaScriptの操作とonChildAddedが同じ動作をしていることに気づき(中澤さんが気づいてくれました)、JavaScriptを削除したら解消しました。

## ④質問・疑問・感想、シェアしたいこと等なんでも
### 疑問・感想
- 今回のような(API Keyをネットに乗せてはいけない)場合、バージョン管理ってどうすると良いのでしょう？
  - 3回くらい先祖がえりしたり、バックアップファイルが3個くらいあったり、ストレスがいっぱいです。
- Firebaseの勝ち、井上の負けです。苦手意識あります。卒業制作だいじょうぶかなあ。
- 地味にCSSの右寄せ中央寄せを毎回ググっており、いいかげんマスターしたい

###  参考記事
 - Firebase関連
   - [Firebaseコマンドが実行出来ない場合の対処法](https://qiita.com/ebichan_88/items/e3e30461ad4ddd9368f5)
   - [Nuxt.js + Firebaseで早押しボタンを作ってみた](https://qiita.com/nonsugarless/items/e9853a5536e201445c7a)

 - JavaScript
   - [【JavaScript】スクロールバーの位置を要素の最下部に設定する](https://into-the-program.com/javascript-set-scrollbar-position-to-bottom/)
   - [JavaScriptで配列の要素数を取得する方法【Array.length】](https://eng-entrance.com/javascript-array-length)
   - [【JavaScript】モジュール構文（import, export）](https://hidekazu-blog.com/javascript-module/)

 - HTML / CSS
   - [【初心者でも簡単】CSSで要素を右寄せする5つの方法を解説](https://zero-plus.io/media/css-right/)
 - Hosting関連
   - [Node.jsとnpmをアップデートする方法](https://parashuto.com/rriver/tools/updating-node-js-and-npm)
   - [【npm入門】npm（パッケージ管理ツール）の基礎を解説！インストール方法やよく使うコマンドもまとめて紹介！](https://agency-star.co.jp/column/npm)
