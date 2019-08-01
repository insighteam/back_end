var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const authUtil = require('../../utils/auth-util');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect()

router.get('/:idx', async(req, res, next) => {
    try{
        const getWalletQuery = 'SELECT wallet_address FROM user WHERE idx = ?';
        conn.query(getWalletQuery, [req.params.idx], function(err, wallet_address) {
            console.log(wallet_address);
            if (wallet_address.length > 0) {
                return res.status(200).send(utils.successTrue(statusCode.OK, resMessage.FIND_WALLET_SUCCESS, wallet_address[0] ));
            } else {
                return res.status(200).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.FIND_WALLET_FAIL));
            }
        });
    } catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;