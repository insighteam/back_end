var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/capsules', require('./capsules'));

module.exports = router;