var Web3 = require('web3');	//1.2.0
var wc = require('web3-eth-contract');
var Tx = require('ethereumjs-tx').Transaction;



// view, pure 함수 호출 양식
web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/aeda1612f1744383b56cd7f45b2dc5d4"));  
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
var manage_contract_bytecode = '608060405260646008556000600b60006101000a81548160ff02191690831515021790555060405162000e0c38038062000e0c833981018060405261010081101561004957600080fd5b8101908080519060200190929190805190602001909291908051906020019092919080519060200190929190805164010000000081111561008957600080fd5b8281019050602081018481111561009f57600080fd5b81518560018202830111640100000000821117156100bc57600080fd5b5050929190602001805190602001909291908051906020019092919080516401000000008111156100ec57600080fd5b8281019050602081018481111561010257600080fd5b815185600182028301116401000000008211171561011f57600080fd5b505092919050505087420160008190555060028790806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506000600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555032600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600660010181905550846006600001819055508360099080519060200190610259929190610290565b5082600a8190555081884201016001819055508060059080519060200190610282929190610290565b505050505050505050610335565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102d157805160ff19168380011785556102ff565b828001600101855582156102ff579182015b828111156102fe5782518255916020019190600101906102e3565b5b50905061030c9190610310565b5090565b61033291905b8082111561032e576000816000905550600101610316565b5090565b90565b610ac780620003456000396000f3fe608060405260043610610088576000357c010000000000000000000000000000000000000000000000000000000090048063295a52121461008a578063481c6a75146100b9578063484cb004146101105780634a85b5f4146101275780634c5bbf0914610183578063919840ad146101c0578063f005b2c4146101ef578063ff1e001314610344575b005b34801561009657600080fd5b5061009f6103b0565b604051808215151515815260200191505060405180910390f35b3480156100c557600080fd5b506100ce6103c3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561011c57600080fd5b506101256103e9565b005b6101696004803603602081101561013d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610480565b604051808215151515815260200191505060405180910390f35b34801561018f57600080fd5b506101be600480360360208110156101a657600080fd5b8101908080351515906020019092919050505061055d565b005b3480156101cc57600080fd5b506101d56105d6565b604051808215151515815260200191505060405180910390f35b3480156101fb57600080fd5b506102c96004803603606081101561021257600080fd5b810190808035906020019064010000000081111561022f57600080fd5b82018360208201111561024157600080fd5b8035906020019184600183028401116401000000008311171561026357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919080359060200190929190505050610687565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103095780820151818401526020810190506102ee565b50505050905090810190601f1680156103365780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561035057600080fd5b50610359610983565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561039c578082015181840152602081019050610381565b505050509050019250505060405180910390f35b600b60009054906101000a900460ff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561044557600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b60003373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104de57600080fd5b600a54341415156104ee57600080fd5b60028290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060019050919050565b3373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156105b957600080fd5b80600b60006101000a81548160ff02191690831515021790555050565b6000806000905060008090505b60028054905081101561066f573373ffffffffffffffffffffffffffffffffffffffff1660028281548110151561061657fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561066257600191505b80806001019150506105e3565b5080151561067c57600080fd5b600054421191505090565b60606001546000540142111580156106a157506000544210155b15156106ac57600080fd5b8380519060200120600960405180828054600181600116156101000203166002900480156107115780601f106106ef576101008083540402835291820191610711565b820191906000526020600020905b8154815290600101906020018083116106fd575b50509150506040518091039020148015610754575060026008540a600261073d60066001015486610a6d565b0a600261074f60066000015486610a6d565b0a0111155b151561075f57600080fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515156107b857600080fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600b60009054906101000a900460ff1615610873573373ffffffffffffffffffffffffffffffffffffffff166108fc600a549081150290604051600060405180830381858888f1935050505015801561086d573d6000803e3d6000fd5b5061097b565b600c3390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060058054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561096f5780601f106109445761010080835404028352916020019161096f565b820191906000526020600020905b81548152906001019060200180831161095257829003601f168201915b5050505050905061097c565b5b9392505050565b60603373ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109e157600080fd5b600c805480602002602001604051908101604052809291908181526020018280548015610a6357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610a19575b5050505050905090565b600081831115610a81578183039050610a95565b8183111515610a94578282039050610a95565b5b9291505056fea165627a7a7230582015d11d06cb989ade1c1c9d37607337ef9a9e2a6cec9e5189cc3af4170c04ac440029';
var manage_contract = new web3.eth.Contract(manage_contract_abi, '0x4746f0d819f54245cc7ccd4a9c47545970f301bf')
manage_contract.methods.show().call({from: '0x916443f9f5A372200031918483f64250E6d47526'}).then((receipt) => {
    console.log(receipt);
})
// ----------------------------


// 컨트랙트 배포 방식
var server_pk = new Buffer('EFA2AB9745C9E482E2125A8760FABC57AE27704F7BB1F7E03D6EEA1613830D99', 'hex');
var server_address = '0x6cd3a93c7110cF79fF50979430e9FF2D4DE315F7';
var count = web3.eth.getTransactionCount(server_address);
count++;
console.log(count++);

var rawTx = {nonce: count++, gas: 8000000, data: '0x'+manage_contract_bytecode};
var tx = new Tx(rawTx);
console.log(1);
tx.sign(server_pk);
console.log(2);
var serializedTx = tx.serialize();
console.log(3);
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).catch((err)=> {
	console.log(err);
})

// var manage_contract = new web3.eth.Contract(manage_contract_abi);

// console.log('Deploying the contract');

// manage_contract.deploy({data: manage_contract_bytecode}).send({
// 	from: server_address,
// 	gas: '1500000',
// 	gasPrice: '100'
// }).catch(function(err){
// 	console.log('hi');
// });


// .send({
// 	from: server_address,
// 	gas: 1500000,
// 	gasPrice: '1000000000'
// }, (err, transactionHash) => {
// 	console.log(transactionHash);
// }).on('receipt', (receipt) => {
// 	console.log(receipt.contractAddress);
// })

// var last_contract;
// manage_contract.methods.CheckLastCapsule().call({from: '0x916443f9f5A372200031918483f64250E6d47526'}).then((receipt) => {
//     console.log(receipt);
//     last_contract = receipt;
// })

// https://github.com/ethereum/web3.js/blob/1.x/docs/web3-eth.rst
// var private_key = new Buffer('7909e86f821368dab1e1ff1a02770e4a99681ef05910fae83dd5773000c0b5b2', 'hex');
// var rawTx = {
//     nonce: '0x0',
//     gasPrice: '1',
//     gasLimit: '3000000',
//     to: last_contract,
//     value: '',
//     data: ''
// }

// var tx = new Tx(rawTx);
// tx.sign(private_key);
// var serializedTx = tx.serialize();
// web3.eth.sendSignedTransaction('0x'+serializedTx.toString('hex'));
// var capsule_contract_abi = [
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "mode",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "manager",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [],
// 		"name": "BreakCapsule2",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "Participate",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_mode",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "ModeChange",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "check",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_key",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_latitude",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_logitude",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Open",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "BreakCapsule1",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address[]"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"name": "_period",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_owner",
// 				"type": "address"
// 			},
// 			{
// 				"name": "_latitude",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_longitude",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_key",
// 				"type": "string"
// 			},
// 			{
// 				"name": "value",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_limit",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "_hash",
// 				"type": "string"
// 			}
// 		],
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "constructor"
// 	},
// 	{
// 		"payable": true,
// 		"stateMutability": "payable",
// 		"type": "fallback"
// 	}
// ]
// var capsule_contract = new web3.eth.Contract(capsule_contract_abi, );
// var tx = {from: '0x5105538E6f4bCba192515B613b5eB3C9a6A271e2', }
// web3.eth.accounts.signTransaction(tx, private_key [call back])