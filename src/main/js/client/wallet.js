const { generateKeyPair, createSign, createVerify } = require('crypto');
const promise = require('promise');

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
                passphrase: (Math.random() / Math.random() * Date.now()).toString()
            }
        }, (err, publicKey, privateKey) => {
            console.log(publicKey);
            console.log(privateKey);
        });
    }

}
var wallet = new Wallet();
