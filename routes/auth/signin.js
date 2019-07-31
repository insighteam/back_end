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

    return null;
}


router.post('/', async(req, res) => {

    var err = validateForm(req.body);
    if(err) {
        return null;
    }

    const id = req.body.id;
    const password = req.body.password;
    const selectQuery = 'SELECT * FROM user WHERE id = ?';

    conn.query(selectQuery, [id], function(err, selectResult) {
        if(selectResult && selectResult.length > 0) {
            if(password == selectResult[0].password) {
                return res.json({idx: selectResult[0].idx});
            }
        }
    })

    return null;
});

module.exports = router;