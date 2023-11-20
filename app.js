require('dotenv').config();
const express = require('express');
const fs = require('fs');
const app = express();

const router = require('./router');

app.use(express.json());
app.use(router);

app.get('/', function (req, res) {
    res.json({
        status: true,
        message: 'welcome to fast-parking-system api',
        error: null,
        data: null
    });
});

app.get('/docs', async function (req, res, next) {
    try {
        const filePath = './request.http';
        const fileContentBuffer = await fs.readFileSync(filePath, { encoding: 'utf-8' });
        const formattedContent = `<pre>${fileContentBuffer}</pre>`;
        res.send(formattedContent);
        // res.send(fileContentBuffer);
    } catch (err) {
        next(err);
    }
});

const PORT = process.env.PORT;
app.listen(PORT, function () {
    console.log('server running on port', PORT);
});