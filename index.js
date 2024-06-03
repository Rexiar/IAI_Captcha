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

app.get("/", (req, res) => {
  res.send(`<main>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
    main{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
      color: #1B2430;
    }
    img {
      width: 200px;
    }
    p, h2 {
      text-align: center;
    }
  </style>
  <div>
    <h2>Custom Captcha Service</h2>
    <p>Ver 1.0</p>
  </div>
</main>`);
})

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
