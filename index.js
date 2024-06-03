const express = require('express');
const captchaRoute = require('./routes/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/captcha', captchaRoute);

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
