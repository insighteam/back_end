var Web3 = require('web3');
var Tx = require('ethereumjs-tx')


// view, pure 함수 호출 양식
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));  
var manage_contract_abi = [
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
]
var manage_contract = new web3.eth.Contract(manage_contract_abi, '0x99BC800AEAf8Bf2Bc708a440855260B03A614f13')
manage_contract.methods.show().call({from: '0x916443f9f5A372200031918483f64250E6d47526'}).then((receipt) => {
    console.log(receipt);
})

var last_contract;
manage_contract.methods.CheckLastCapsule().call({from: '0x916443f9f5A372200031918483f64250E6d47526'}).then((receipt) => {
    console.log(receipt);
    last_contract = receipt;
})

// https://github.com/ethereum/web3.js/blob/1.x/docs/web3-eth.rst
var tx = new Tx()
var private_key = new Buffer('7909e86f821368dab1e1ff1a02770e4a99681ef05910fae83dd5773000c0b5b2', 'hex');
var rawTx = {
    nonce: '0x0',
    gasPrice: '1',
    gasLimit: '3000000',
    to: '',
    value: '',
    data: ''
}
var capusle_contract_abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "mode",
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
		"constant": true,
		"inputs": [],
		"name": "manager",
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
		"name": "BreakCapsule2",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "Participate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_mode",
				"type": "bool"
			}
		],
		"name": "ModeChange",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "check",
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
				"name": "_key",
				"type": "string"
			},
			{
				"name": "_latitude",
				"type": "uint256"
			},
			{
				"name": "_logitude",
				"type": "uint256"
			}
		],
		"name": "Open",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "BreakCapsule1",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
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
				"name": "_latitude",
				"type": "uint256"
			},
			{
				"name": "_longitude",
				"type": "uint256"
			},
			{
				"name": "_key",
				"type": "string"
			},
			{
				"name": "value",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
]
var capusle_contract = new web3.eth.Contract(capusle_contract_abi, );
var tx = {from: '0x5105538E6f4bCba192515B613b5eB3C9a6A271e2', }
// web3.eth.accounts.signTransaction(tx, private_key [call back])