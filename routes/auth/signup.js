var express = require('express');
var mysql = require('mysql');
var Web3 = require('web3');
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); 
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); 
var router = express.Router();

const utils = require('../../utils/format');
const resMessage = require('../../utils/response-message');
const statusCode = require('../../utils/status-code');
const conn = mysql.createConnection(require('../../config/mysql-config.js'));
conn.connect();

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

router.post('/', async(req, res, next) => {
    var err = validateForm(req.body);
    if(err) {
        console.log(err);
        next(err);
    }

    console.log("out!");
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;

    const selectQuery = 'SELECT * FROM user WHERE id = ?';
    const insertQuery = 'INSERT INTO user (id, password, name, email, address, private_key, wallet_address) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const account = web3.eth.accounts.create();
    const walletAddress = account.address;
    const privateKey = account.privateKey;
    console.log(walletAddress);
    console.log(privateKey);

    conn.query(selectQuery, [id], function(err, user) {
        if (user.length == 0) {
            conn.query(insertQuery, [id, password, name, email, address, privateKey, walletAddress], function(err, insertResult) {
                if (insertResult) {
                    return res.json({code: 200});
                } else {
                    return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.CREATED_USER_FAIL));
                }

                if (err) {
                    console.log(err);
                    next(err);
                }
            });
        } else {
            return res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.ALREADY_USER));
        }

        if(err) {
            console.log(err);
            next(err);
        }
    })
});

module.exports = router;