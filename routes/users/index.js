var express = require('express');
var router = express.Router();

router.use('/', require('./wallet'));

module.exports = router;