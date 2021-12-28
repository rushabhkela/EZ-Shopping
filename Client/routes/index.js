var express = require('express');
var router = express.Router();


router.get('/', async (req, res) => {
  res.render('index', { title: 'EZ-Shopping', home : "1" });
});

module.exports = router;
