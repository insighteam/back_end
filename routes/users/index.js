var express = require('express');
var router = express.Router();

router.use('/', require('./userlist'));
// router.use('/signup', require('./signup'));

module.exports = router;