var express = require('express');
var router = express.Router();

router.use('/', require('./wallet'));
router.use('/', require('./invitations'));

module.exports = router;