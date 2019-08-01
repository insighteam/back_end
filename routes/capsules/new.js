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
    const text = req.body.text || "";
    const image = req.body.image || "";
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    // end_date를 초로 만들어줘야 함, 아래 end_seconds
    const end_seconds = 10;

    const findIdxQuery = 'SELECT idx FROM user WHERE wallet_address = ?';
    conn.query(findIdxQuery, [req.body.wallet_address], function(err, findResult) {
        if(findResult == 0) {
            return res.status(200).send(utils.successFalse(statusCode.DB_ERROR, resMessage.NO_USER));
        } else {
            const insertInvitationQuery = 'INSERT INTO capsule (idx, capsule_address, money) VALUES (?, ?, ?)';
            conn.query(insertInvitationQuery, [findResult[0].idx, req.body.capsule_address, req.body.money], function(err, insertResult) {
                if (insertResult) {
                    // capsule 만들기 요청
                    let hash = '0x011111';  // ipfs 구현 후 수정

                    let Tx = require('ethereumjs-tx').Transaction;
                    let initConfig = require('../../contracts/web3/Bury_init');
                    let web3 = initConfig.web3;
                    let server_address = initConfig.user_address;
                    let server_pk = initConfig.user_pk;
                    
                    let manage = new web3.eth.Contract([
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "checking",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "uint256"
                                },
                                {
                                    "name": "",
                                    "type": "uint256"
                                },
                                {
                                    "name": "",
                                    "type": "address"
                                },
                                {
                                    "name": "",
                                    "type": "address"
                                },
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "show",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "_period",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_owner",
                                    "type": "address"
                                },
                                {
                                    "name": "_x",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_y",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_key",
                                    "type": "string"
                                },
                                {
                                    "name": "_limit",
                                    "type": "uint256"
                                },
                                {
                                    "name": "_hash",
                                    "type": "string"
                                }
                            ],
                            "name": "Bury",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": true,
                            "stateMutability": "payable",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [
                                {
                                    "name": "tmp",
                                    "type": "address"
                                }
                            ],
                            "name": "showmode",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "constant": true,
                            "inputs": [],
                            "name": "CheckLastCapsule",
                            "outputs": [
                                {
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "payable": false,
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "constant": false,
                            "inputs": [],
                            "name": "ServiceEnd",
                            "outputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "payable": false,
                            "stateMutability": "nonpayable",
                            "type": "constructor"
                        },
                        {
                            "payable": true,
                            "stateMutability": "payable",
                            "type": "fallback"
                        }
                    ], initConfig.manage_address);
                    web3.eth.getTransactionCount(user_address).then(function (nonce) {
                        let rawTx = {
                            nonce: nonce,
                            to: server_address,
                            gasPrice: 20000000000,
                            gasLimit: 6721975,
                            value: req.body.money
                        }

                        try {

                            let tx = new Tx(rawTx);
    
                            tx.sign(server_pk);
    
                            let serializedTx = tx.serialize();
    
                            let serialized_signed_tx = '0x' + serializedTx.toString('hex');
                            
                            manage.methods.Bury(end_seconds,req.body.wallet_address,latitude, longitude, 86400, hash).send(serialized_signed_tx);
                        }catch (err) {
                            console.log("Capsule bury - error");
                            console.log(err);
                        }

                    });




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

router.post('/money', async(req, res, next) => {
    var err = validateForm(req.body);
    if(err) {
        console.log(err);
        return res.status(200).send(utils.successFalse(statusCode.BAD_REQUEST, err));
    }

    const findIdxQuery = 'SELECT idx FROM user WHERE wallet_address = ?';
    conn.query(findIdxQuery, [req.body.wallet_address], function(err, findResult) {
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