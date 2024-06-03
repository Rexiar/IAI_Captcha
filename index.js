const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

const captchasDir = path.join(__dirname, 'captchas');
const captchaImages = fs.readdirSync(captchasDir).map(fileName => ({
  fileName: fileName.split('.')[0], // Remove file extension
  url: `/captchas/${fileName}` // Construct URL
}));

// Serve static files from the 'captchas' directory
app.use('/captchas', express.static(captchasDir));

// API endpoint to get captcha
app.get('/captcha', (req, res) => {
  const randomIndex = Math.floor(Math.random() * captchaImages.length);
  const captcha = captchaImages[randomIndex];
  res.json({
    image: captcha.url,
    answer: captcha.fileName
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
