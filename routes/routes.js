const express = require('express');

const router = express.Router();

let min = 0, max = 100;
let result;
router.get('/', (req, res) => {
    result = Math.floor(Math.random() *  max - min);

    res.json({
        answer: result
    });
});

module.exports = router;
