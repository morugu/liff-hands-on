# LIFF アプリ開発

## カード画面の作成と LIFF SDK の読み込み

1. `card.html` 以下の HTML コードをコピペして保存

```html
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>ポイントカード</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://static.line-scdn.net/liff/edge/2.1/sdk.js"></script>
    <script src="./public/card.js"></script>
    <link rel="stylesheet" type="text/css" href="./public/card.css">
</head>
<body>
    <div class="card1">
        <p class="title1">ポイントカード</p>
        <div id="name" class="content1"></div>
        <div id="point" class="content2"></div>
    </div>
</body>
</html>
```

## LIFF の初期化処理・プロフィール情報取得処理を実装

1. `public` というフォルダを作成

2. `public` フォルダの下に `card.js` というファイルを作成

3. `card.js` に以下の JavaScript コードをコピペして保存

```javascript
$(document).ready(function() {
	var liffId = 'YOUR_LIFF_ID';
	// LIFF 初期化
	liff.init(
		{
			liffId: liffId,
		},
		function(data) {
			console.log('liff.init 完了');
			// プロフィール情報取得
			liff.getProfile()
				.then(function(userData) {
					console.log(`liff.getProfile 完了 userId: ${userData.userId}, displayName: ${userData.displayName}`);
					userId = userData.userId;
					$('#name').text(userData.displayName + ' 様');
					$('#point').text('100 ポイント');
				})
				.catch(function(err) {
					console.log(`liff.getProfile 失敗 code: ${err.code}, detail: ${err.message}`);
				});
		},
		function(err) {
			console.log(`liff.init 失敗 ${err}`);
		}
	);
});
```

4. `YOUR_LIFF_ID` にメモしておいた `LIFF ID` に置き換える

## デザインの調整

1. `public` フォルダの下に `card.css` というファイルを作成

2. 以下の CSS をコピペ

```css
.card1 {
	width: 100%;
	border-radius: 5px;
	background-color: #fff;
	box-shadow: 0 3px 6px #ccc;
}

.title1 {
	border-radius: 5px 5px 0px 0px;
	font-size: 150%;
	padding: 15px;
	text-align: center;
	color: #444;
	background-color: #1dcd00;
}

.content1 {
	padding: 10px;
	color: #666;
	text-align: right;
}

.content2 {
	padding: 10px;
	color: #666;
	text-align: right;
}
```

## 表示の確認

1. http://localhost:5000 にアクセスして確認しましょう。  
   ※`ポイントカード`とだけ表示されていれば OK です。

2. メモしておいた LIFF URL(line://app/xxxxxxxxxx-xxxxxxxx) を LINE アプリに送信してください。

3. LINE アプリから LIFF URL にアクセスしてみましょう。以下の画面が表示されたら LIFF 開発設定の完了です！  
   ※`ポイントカード`に加えて、`自分の名前`と`保有ポイント`が表示されていれば OK です。

[戻る](step1.md) | [次へ](step3.md)
