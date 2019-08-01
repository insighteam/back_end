var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const Tx = require('ethereumjs-tx');
const initConfig = require('../../init.js');
const LogicHelloWorldJSON = require('../../build/contracts/manage.json');
const web3 = initConfig.web3;
const user_address = initConfig.user_address;
const user_pk = initConfig.user_pk;
const logic_ledger = initConfig.logic_leger;
const proxy_ledger = initConfig.proxy_ledger;
const registed_user_address = initConfig.registed_user_address;
const gasPrice = initConfig.gas_price;

let hash = '0x011111'; // ipfs 구현 후 수정
var server_address = user_address;
let manage_contract = '0x13FcDeD35083D926f2BC6d64028a8A643B835c3f'
let manage = new web3.eth.Contract(LogicHelloWorldJSON.abi, manage_contract);

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
    const idx = req.body.idx
    const text = req.body.text || "";
    const image = req.body.image || "";
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    // end_date를 초로 만들어줘야 함, 아래 end_seconds
    const end_seconds = 10;
    var hash = '0x1343'

    web3.eth.getTransactionCount(server_address).then((nonce) => {
      manage.methods.Bury(end_seconds, req.body.wallet_address, latitude, longitude, 86400, hash)
      .send({
        nonce: nonce,
        from: server_address,
        to: manage_contract,
        gasPrice: 20000000000,
        gasLimit: 6721975,
        value: 0
      }, (err, txhash) => {
        if (err) {
          console.log(err);
        }
        return txhash;
      }).then((res) => {
          return manage.methods.CheckLastCapsule().call({
              from: server_address,
              gasPrice: 20000000000,
              gasLimit: 6721975
          }).then((newAddress) => {
              console.log(newAddress);
          });
      });
    })
    web3.eth.getTransactionCount(server_address)
        .then(function (nonce) {
            manage.methods.Bury(10, '0x6cd3a93c7110cF79fF50979430e9FF2D4DE315F7', 11, 11, 86400, hash)
                .send({
                    nonce: nonce,
                    from: server_address,
                    to: manage_contract,
                    gasPrice: 20000000000,
                    gasLimit: 6721975,
                    value: 11
                }, (err, txhash) => {
                    if (err) {
                        console.log(err);
                    }

                    return txhash;
                }).then((res) => {
                    return manage.methods.CheckLastCapsule().call({
                        from: server_address,
                        gasPrice: 20000000000,
                        gasLimit: 6721975
                    }).then((newAddress) => {
                        console.log(newAddress);
                        //주소 받음.
                    });
                });
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
