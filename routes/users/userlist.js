var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const authUtil = require('../../utils/auth-util');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect()

router.get('/', authUtil.isLoggedin, async(req, res) => {
    try{
        const getUsersQuery = 'SELECT * FROM user';
        const users = await conn.query(getDiaryQuery);

        console.log(users);
        res.json(users);

        // if (!users) {
        //     res.status(200).send(util.successFalse(statusCode.DB_ERROR, resMessage.USER_LIST_FAIL));
        // } else {
        //     res.status(200).send(util.successTrue(statusCode.OK, resMessage.USER_LIST_SUCCESS, users));
        //     console.log(users);
        // }

        }catch(err){
            console.log(err);
        }
});

module.exports = router;