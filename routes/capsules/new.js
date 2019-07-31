var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect();

function validateForm(form) {
    if(!form.private_key) {
        return 'private key 값이 없습니다.';
    } 

    if(!form.capsule_address) {
        return 'capsule address 값이 없습니다.';
    } 

    if(!form.money) {
        return '예치금 값이 없습니다.';
    } 

    return null;
}

router.post('/', async(req, res, next) => {
    var err = validateForm(req.body);
    if(err) {
        console.log(err);
        return res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, err));
    }

    const findIdxQuery = 'SELECT idx FROM user WHERE private_key = ?';
    conn.query(findIdxQuery, [req.body.private_key], function(err, findResult) {
        if(findResult == 0) {
            return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.NO_USER));
        } else {
            const insertInvitationQuery = 'INSERT INTO capsule (idx, capsule_address, money) VALUES (?, ?, ?)';
            conn.query(insertInvitationQuery, [findResult[0].idx, req.body.capsule_address, req.body.money], function(err, insertResult) {
                if (insertResult) {
                    return res.json({code: 200});
                } else {
                    if(err) {
                        console.log(err);
                        next(err);
                    }
                    return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.CREATED_CAPSULE_FAIL));
                }
            });
        }
    })

});


module.exports = router;