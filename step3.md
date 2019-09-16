# API 開発と連携

## 現在のポイント取得 API の開発

1. `app.js` に以下のコードを追記して、保存してください。

```javascript
app.get('/point/:userId', (req, res) => {
	const userId = req.params.userId;
	const DEFAULT_POINT = 10;
	// 現在のポイントを取得
	let point = db.get(`point.${userId}`).value();
	if (!point) {
		// ポイント登録がない場合は10ポイント付与する
		point = DEFAULT_POINT;
		db.set(`point.${userId}`, DEFAULT_POINT).write();
	}
	res.send({
		point,
	});
});
```

2. http://localhost:5000/point/U123 にアクセスしてください。

以下の json が表示されたら成功です。

```json
{
	"point": 10
}
```

## 現在のポイント取得 API の呼び出しと表示

1. `card.js` の以下のコードを変更してください。

変更前のコード

```javascript
$('#point').text('100 ポイント');
```

変更後のコード

```javascript
$.get('/point/' + userData.userId, function(data, status) {
	$('#point').text(data.point + ' ポイント');
});
```

2. LINE アプリで LIFF を開き直して、確認してください。

10 ポイントになっていれば OK です。

3. `db.json` ファイルの `point.YOUR_USER_ID` を `20` に変更し保存して、LINE アプリで LIFF を開き直して確認してください。

20 ポイントになっていれば OK です。

[戻る](step2.md) | [次へ](step4.md)
