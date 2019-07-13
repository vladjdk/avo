const eccrypto = require('eccrypto');
const crypto = require('crypto');

class Wallet {
    constructor() {
        const self = this;
        var diffieHellman = createDiffieHellman(2048)
    }

    getPublicKey() {
        return this.publicKey;
    }
}



