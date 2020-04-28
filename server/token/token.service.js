'use strict';
const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

exports.transferFrom = function (Obj) {
    return (async () => {
        const web3 = new Web3('http://localhost:8545');
        const accounts = await web3.eth.getAccounts();
        const loader = setupLoader({ provider: web3 }).web3;
// Set up a web3 contract, representing our deployed Box instance, using the contract loader
       const address = '0xA57B8a5584442B467b4689F1144D269d096A3daF';
       const SimpleToken = loader.fromArtifact('SimpleToken', address);
       const value = await SimpleToken.methods.balanceOf('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1').call();
       return value;
    })();
};