var express = require('express');
var router = express.Router();

router.use('/', require('./capsulelist'));
router.use('/', require('./new'));

module.exports = router;