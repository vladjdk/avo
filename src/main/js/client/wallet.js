const { generateKeyPair, createSign, createVerify } = require('crypto');
require('promise');

class Wallet {
    constructor() {
        const self = this;
        generateKeyPair('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        }, (err, publicKey, privateKey) => {
            self.privateKey = privateKey;
            self.publicKey = publicKey;
            console.log(self)
        });
    }

    getPrivateKey() {
        return this.privateKey;
    }

    getPublicKey() {
        return this.publicKey;
    }
}

var wallet = new Wallet();
console.log();
