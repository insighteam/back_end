var express = require('express');
var mysql = require('mysql');
var router = express.Router();

const utils = require('../../utils/format');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect()

function validateForm(form) {
    if(!form.id) {
        return '아이디를 입력해주세요.';
    } 
    
    if(!form.password) {
        return '비밀번호를 입력해주세요.';
    } 
    
    if(!form.name) {
        return '이름을 입력해주세요.';
    }

    return null;
}

router.post('/', async(req, res) => {
    var err = validateForm(req.body);
    if(err) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, err));
    }

    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;

    const selectQuery = 'SELECT * FROM user WHERE id = ?';
    const insertQuery = 'INSERT INTO user (id, password, name) VALUES (?, ?, ?)';

    if (!id || !password || !name) {
        res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    } else { 
        conn.query(selectQuery, [id], function(err, user) {
            if (user.length > 0) {
                res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER));
            } else {
                bcrypt.hash(password, 10, function (err, hash) {
                    conn.query(insertQuery, [id, hash, name], function(err, insertResult) {
                        if (!insertResult) {
                            res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.USER_DB_INSERT_ERROR))
                        } else {
                            res.status(200).send(utils.successTrue(statusCode.CREATED, resMessage.CREATED_USER, req.body));
                        }

                        if (err) {
                            console.log(err);
                            res.status(200).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.CREATED_USER_FAIL));
                        }
                    });
                })
            }
        })
    }
});

module.exports = router;