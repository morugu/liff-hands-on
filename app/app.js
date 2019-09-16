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
const APP_URL = 'YOUR_APP_URL';

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
