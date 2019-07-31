var express = require('express');
var mysql = require('mysql');
var web3 = require('web3');
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

    if(!form.email) {
        return '이메일을 입력해주세요.';
    }

    if(!form.address) {
        return '주소을 입력해주세요.';
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
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;

    const selectQuery = 'SELECT * FROM user WHERE id = ?';
    const insertQuery = 'INSERT INTO user (id, password, name, email, address, private_key) VALUES (?, ?, ?, ?, ?, ?)';

    const privateKey = web3.eth.accounts.create().privateKey.substr(2);
    console.log(privateKey);

    conn.query(selectQuery, [id], function(err, user) {
        if (!user) {
            conn.query(insertQuery, [id, password, name, email, address, privateKey], function(err, insertResult) {
                if (insertResult) {
                    return res.json({code: 200});
                }

                if (err) {
                    console.log(err);
                    return null;
                }
            });
        }
    })
});

module.exports = router;