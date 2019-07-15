const elliptic = require('elliptic');
const EC = elliptic.ec;
const ec = new EC('secp256k1');
const crypto = require('crypto');

/**
 *  Signs the message (block or transaction information) using elliptic curve
 *  with the secp265k1 curve.
 * @param {KeyPair} key the key
 * @param {Array} array
 * @return {Signature} the r and s signature
 */
function ecdsa(key, array) {
    if(key == null) {
        throw new Error('Key is null.')
    }
    if(!Array.isArray(array)) {
        throw new Error('Second arg must be of type array.')
    }
    return key.sign(array);
}

/**
 * Hashes the information in provided array using the sha256 algorithm
 * @param {Array} array
 */
function sha256(array) {
    let string = "";
    const hash = crypto.createHash('sha256');
    for (var i = 0; i < array.length; i++) {
        string+=array[i];
    }
    hash.update(string);
    return hash.digest('hex');
}

/**
 * Generates a keypair
 * @return {KeyPair} the key pair.
 */
function generateKeys() {
    return ec.genKeyPair();
}

/**
 * Generates a KeyPair object when just given a public key.
 * This is for verifying without sending over your private key
 * over the wire.
 * @param pub public key
 * @returns {KeyPair} keypair
 */
function keyFromPublic(pub) {
    return ec.keyFromPublic(pub, 'hex');
}

/**
 * Creates a KeyPair object using a private key.
 * @param priv private key
 * @return {KeyPair} keypair
 */
function keyFromPrivate(priv) {
    return ec.keyFromPrivate(priv, 'hex');
}

/**
 * Verifies the signature using a public key to ensure that the message was
 * sent by the public key provided
 * @param {KeyPair} key keypair containing the public key related to the signature
 * @param {Signature} signature signature related to the public key
 * @param  {Array} message message to decrypt
 * @return {boolean} true or false
 */
function verify(key, signature, message) {
    return key.verify(message, signature);
}

module.exports = {ecdsa, sha256, generateKeys, keyFromPublic, keyFromPrivate, verify};

