var express = require('express');
var router = express.Router();

router.use('/', require('./userlist'));

module.exports = router;