const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const captchasDir = path.join(__dirname, 'captchas');

// Helper function to get random captcha
function getRandomCaptcha() {
  const files = fs.readdirSync(captchasDir);
  const randomIndex = Math.floor(Math.random() * files.length);
  const fileName = files[randomIndex];
  const filePath = path.join(captchasDir, fileName);
  const fileContent = fs.readFileSync(filePath);
  const base64String = fileContent.toString('base64');
  const answer = path.parse(fileName).name; // Get file name without extension

  return {
    image: base64String,
    answer: answer
  };
}

// API endpoint to get captcha
app.get('/captcha', (req, res) => {
  const captcha = getRandomCaptcha();
  res.json(captcha);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
