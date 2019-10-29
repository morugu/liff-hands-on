## ポイント付与 API と QR コード読み取り機能の開発

## QR コード表示機能機能

1. `app.js` の `YOUR_APP_URL` を ngrock で発行した Web URL に置き換えてください。  
   https://xxx.ngrock.io  
   ※最後のスラッシュは入れないでください。

2. `app.js` に以下のコードを追記してください。

```javascript
app.get('/qr/view/:qrId', (req, res) => {
	// ポイント付与 API の URL で QR コード画像を生成する
	qrcode.toDataURL(`${APP_URL}/qr/use/${req.params.qrId}`, (err, url) => {
		const data = url.split(',')[1];
		const img = Buffer.from(data, 'base64');
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': img.length,
		});
		res.end(img);
	});
});
```

3. `db.json` の `qr: {}` の配下に `"1": 100` を追記してください。

```json
{
	"qr": {
		"1": 100
	}
}
```

4. http://localhost:5000/qr/view/1 にアクセスしてください。

QR コードが表示されていれば OK です。

## ポイント付与 API の実装

1. `app.js` に以下のコードを追記してください。

```javascript
app.post('/qr/use/:qrId', (req, res) => {
	const userId = req.body.userId;
	// db.json から追加するポイントを取得
	const addPoint = db.get(`qr.${req.params.qrId}`).value();
	// 現在のポイントを取得
	const currentPoint = db.get(`point.${userId}`).value();
	// 追加分と現在のポイントを合算して保存
	db.set(`point.${userId}`, currentPoint + addPoint).write();
	res.send({
		addPoint: addPoint,
		currentPoint: currentPoint,
	});
});
```

## QR コード読み取り機能実装

1. `card.html` の body 内に以下のコードを追記してください。

```html
<button id="qr-button">QRコード読み取り</button>
```

2. `card.js` の `// step4 でQR コード読み取り機能を入れる場所` と記述してある箇所の下に以下のコードを追記してください。

```javascript
$('#qr-button').click(function() {
	// LIFF の QR コード読み取り機能呼び出し
	liff.scanCode().then(function(result) {
		$.post(result.value, { userId: userId }, function(data) {
			alert(data.addPoint + ' ポイントを獲得しました！');
			$('#point').text(data.currentPoint + data.addPoint + ' ポイント');
		}).catch(function(err) {
			console.log(err);
		});
	});
});
```

## QR コードでポイント付与

1. http://localhost:5000/qr/view/1 を PC で開いてください。

2. LINE アプリで LIFF を開き直してください。

3. PC に表示された QR コードを、LINE 内で開いた LIFF の[QR コード読み取り]ボタンから開いて読み取ってください。

4. ポイントが付与された通知と実際にポイントが増えていれば OK です。

## QR コードの種類を増やす

1. `db.json` の `qr: {}` の配下に `"2": 200` を追記してください。

```json
{
	"qr": {
		"1": 100,
		"2": 200
	}
}
```

2. http://localhost:5000/qr/view/2 を PC で開いてください。

3. PC に表示された QR コードを、LINE 内で開いた LIFF の[QR コード読み取り]ボタンから開いて読み取ってください。

4. 200 ポイントが付与されれば OK です。

[戻る](step3.md) | [次へ](step5.md)
