var express = require('express');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect()

function validateForm(form) {
    console.log(form.id);
    if(!form.id) {
        return '아이디를 입력해주세요.';
    } 
    
    if(!form.password) {
        return '비밀번호를 입력해주세요.';
    } 

    return null;
}


router.post('/', async(req, res) => {

    var err = validateForm(req.body);
    if(err) {
        return res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, err));
    }

    const id = req.body.id;
    const password = req.body.password;
    const selectQuery = 'SELECT * FROM user WHERE id = ?';

    conn.query(selectQuery, [id], function(err, selectResult) {
        if(!selectResult || selectResult.length == 0) { 
            res.status(200).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.LOGIN_FAIL));
        } else {
            console.log(selectResult)
            if(!bcrypt.compareSync(password, selectResult[0].password)) {
                console.log("ehre??");
                const user = {
                    idx: selectResult[0].idx,
                    id: selectResult[0].id,
                    name: selectResult[0].name
                };
    
                res.status(200).send(utils.successTrue(statusCode.OK, resMessage.LOGIN_SUCCESS, user));
                
                if (err) {
                    res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.LOGIN_FAIL));
                }
            } else {
                res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.MISSMATCH_PW));
            }
        }
    })

    res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.LOGIN_FAIL));
});

module.exports = router;