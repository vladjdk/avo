const { generateKeyPair, createSign, createVerify createDiffieHellman} = require('crypto');
const promise = require('promise');
const util = require('util');

class Wallet {
    constructor() {
        const self = this;
        var diffieHellman = createDiffieHellman(2048)
    }

    getPublicKey() {
        return this.publicKey;
    }
}



