var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const authUtil = require('../../utils/auth-util');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect();

function validateForm(form) {
    if(!form.latitude) {
        return '위도 값이 없습니다.';
    } 
    
    if(!form.longitude) {
        return '경도 값이 없습니다.';
    } 

    if(!form.money) {
        return '예치금 값이 없습니다.';
    } 

    if(!form.end_date) {
        return '끝나는 날짜 값이 없습니다.';
    } 

    return null;
}

router.get('/:idx/invitations', async(req, res, next) => {
    try{
        const getInvitationsQuery = 'SELECT latitude, longitude, money, end_date FROM invitation WHERE idx = ?';
        conn.query(getInvitationsQuery, [req.params.idx], function(err, invitations) {
            if (invitations.length > 0) {
                return res.status(200).send(utils.successTrue(statusCode.OK, resMessage.INVITATIONS_SUCCESS, invitations));
            } else {
                return res.status(200).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.NO_INVITATIONS));
            }
        });
    } catch(err) {
        console.log(err);
        next(err);
    }
});

router.post('/:idx/invitations', async(req, res, next) => {
    var err = validateForm(req.body);
    if(err) {
        console.log(err);
        next(err);
    }

    try{
        const findIdxQuery = 'SELECT idx FROM user WHERE id = ?';
        conn.query(findIdxQuery, [req.body.id], function(err, idx) {
            if(idx[0].idx == 0) {
                return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.NO_USER));
            } else {
                const insertInvitationQuery = 'INSERT INTO invitation (idx, latitude, longitude, money, end_date) VALUES (?, ?, ?, ?, ?)';
                conn.query(insertInvitationQuery, [idx[0].idx, req.body.latitude, req.body.longitude, req.body.money, req.body.end_date], function(err, insertResult) {
                    if (insertResult) {
                        return res.json({code: 200});
                    } else {
                        return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.CREATED_INVITATION_FAIL));
                    }
                });
            }
        })
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;