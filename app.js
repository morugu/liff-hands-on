const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const qrcode = require('qrcode');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/card', (req, res) => {
	res.sendFile(path.join(__dirname + '/card.html'));
});

app.get('/qr', (req, res) => {
	qrcode.toDataURL('line://app/xxx', (err, url) => {
		const im = url.split(',')[1];
		const img = Buffer.from(im, 'base64');
		res.writeHead(200, {
			'Content-Type': 'image/png',
			'Content-Length': img.length,
		});
		res.end(img);
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
