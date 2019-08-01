const Web3 = require('web3');

console.log(process.env.KALEIDO);

rpcEndpointURL = `http://localhost:7545`;
user_address = `0x916443f9f5A372200031918483f64250E6d47526`;
user_pk = Buffer.from(`6fe9b1e42a28dab325dcb950fda2718bf6c895e4084f3f5b73a9ee3eebfb4a37`,'hex');
proxy_ledger = `null`;
logic_ledger = `null`;
manage_address = `0x54500EABa875B0Ad282Cc6F35C8EE7c983C47a88`;
console.log(`Check rpcEndpointURL : ${rpcEndpointURL} `);

let provider = new Web3.providers.HttpProvider(rpcEndpointURL);
let web3 = new Web3(provider);


module.exports = {
    web3 : web3,
    user_address : user_address,
    user_pk : user_pk,
    manage_address : manage_address
};
