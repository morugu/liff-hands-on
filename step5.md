# チャレンジ 💪

## 1. カードを自分好みのデザインにしてみましょう。

ヒント 1: `app/card.html`, `app/public/card.css` を修正することで、カードのデザインが変えられます。

## 2. カードにプロフィール写真を表示させてみましょう。

ヒント 1: [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile) でユーザー情報を取得できます。

## 3. ブラウザからでもポイントカードが確認できるようにしてみましょう。

ヒント 1: LIFF v2 で LINE ログイン機能が使えるようになりました。

ヒント 2: [`liff.isLoggedIn()`](https://developers.line.biz/ja/reference/liff/#is-logged-in) でログイン状態を取得でき、[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login) で LINE ログインを利用できます。

## 4. 同じ QR コードは 1 度しか使えないようにしてみましょう。

ヒント 1: `app.js` の `/qr/use/:qrId` で QR コードポイントの加算処理を行っています。

ヒント 2: `db.json` に新たな項目(例えば`user`)を追加することで userId ごとに使用した qrId を管理できます。

## 5. お店側が使用するポイント利用(減算)ができる QR コードを生成してみましょう。

ヒント 1: お店側専用の QR 表示 API を実装してみましょう。

ヒント 2: `app.js` の `/qr/use/:qrId` で加算処理を行っています。逆の実装が必要になります。

## 質問がある場合

[LINE developers community の Q&A サイト](https://www.line-community.me/questions)

[LINE developers community の Discord](https://discordapp.com/invite/2MEsUCN)

[LINE developers community の Facebook グループ](https://www.facebook.com/groups/linedevelopercommunity/)

[戻る](step4.md) | [TOP へ](README.md)
