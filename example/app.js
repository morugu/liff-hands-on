const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const APP_URL = 'https://40012979.ngrok.io';

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`liff hand on app listening on port ${port}!`));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/card.html'));
});

app.get('/qr/view/:qrId', (req, res) => {
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

app.post('/qr/use/:qrId', (req, res) => {
	const userId = req.body.userId;
	const qrId = req.params.qrId;
	// 使用済QRチェック
	const usedQrIdList = db.get(`user.${userId}`).value();
	if (usedQrIdList === undefined) {
		db.set(`user.${userId}`, [qrId]).write();
	} else {
		if (usedQrIdList.includes(qrId)) {
			return res.send({
				error: '使用済のQRコードです。',
			});
		}
		db.get(`user.${userId}`)
			.push(qrId)
			.write();
	}
	const addPoint = db.get(`qr.${qrId}`).value();
	const currentPoint = db.get(`point.${userId}`).value();
	db.set(`point.${userId}`, currentPoint + addPoint).write();
	res.send({
		addPoint: addPoint,
		currentPoint: currentPoint,
	});
});

app.get('/point/:userId', (req, res) => {
	const userId = req.params.userId;
	const DEFAULT_POINT = 10;
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
