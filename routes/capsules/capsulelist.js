var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const authUtil = require('../../utils/auth-util');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect()

router.get('/:idx', authUtil.isLoggedin, async(req, res) => {

});

module.exports = router;