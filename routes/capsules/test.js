let hash = '0x011111';  // ipfs 구현 후 수정

let Tx = require('ethereumjs-tx').Transaction;
let initConfig = require('../../contracts/web3/Bury_init');
let Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:7545`));
let server_address = initConfig.user_address;
let server_pk = initConfig.user_pk;

let manage = new web3.eth.Contract([
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
      "inputs": [],
      "name": "ServiceEnd",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ], '0x65A060487D836f56f7731554b45936fa66c51315');
  web3.eth.getTransactionCount(server_address).then( function (nonce) {
    let rawTx = {
        nonce: nonce,
        to: server_address,
        gasPrice: 20000000000,
        gasLimit: 6721975,
        value: 1111
    }

    manage.methods.Bury(10,'0x6cd3a93c7110cF79fF50979430e9FF2D4DE315F7',11, 11, 86400, hash)
    .send(
        {nonce: nonce,
        from: server_address,
        to: '0x65A060487D836f56f7731554b45936fa66c51315',
        gasPrice: 20000000000,
        gasLimit: 6721975,
        value: 1111}, (err, txhash)=> {
        if(err) {
            console.log(err);
        }
        return;
    }).on('receipt', (receipt)=> {
        console.log(receipt);
    }).then((txhash)=>{
        console.log(txhash);
    }).then(()=> {
        
        manage.methods.CheckLastCapsule().send({})
    });
    

});


