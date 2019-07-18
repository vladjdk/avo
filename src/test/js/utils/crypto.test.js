const crypto = require('../../../main/js/utils/crypto');
const Block = require('../../../main/js/blockchain/block');

let block;

beforeEach(() => {
    block = new Block(1,1,1,1,1);
});

test('test setting the nonce to 2 and hashing it', () => {
    block.setNonce(2);
    expect(typeof crypto.sha256(block.info())).toBe('string');
});

test('test hashing 1', () => {
    expect(crypto.sha256([1])).toBe('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
});

test('hashing the same thing twice and getting the same result', () => {
    expect(crypto.sha256([1])).toBe('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
    expect(crypto.sha256([1])).toBe('6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
});

test('generating keys', () => {
    const keyPair = crypto.generateKeys();
    expect(keyPair.getPublic()).toBeDefined();
    expect(keyPair.getPrivate()).toBeDefined();
});

test('Signature generation', () => {
   const keyPair = crypto.generateKeys();
   const message = ['test'];
   const signature = crypto.ecdsa(keyPair, message);
   expect(signature).toBeDefined();
});

test('Signature verification using the public key ONLY', () => {
    const keyPair = crypto.generateKeys();
    const message = ['test'];
    const signature = crypto.ecdsa(keyPair, message);
    const pubKeyNoPriv = crypto.keyFromPublic(keyPair.getPublic());
    expect(pubKeyNoPriv.getPrivate()).toBeNull();
    expect(crypto.verify(pubKeyNoPriv, signature, message)).toBeTruthy();
});

test('Signature verification using someone elses public key', () => {
    const keyPair = crypto.generateKeys();
    const message = ['test'];
    const signature = crypto.ecdsa(keyPair, message);
    const newKeyPair = crypto.generateKeys();
    const pubKeyNoPriv = crypto.keyFromPublic(newKeyPair.getPublic());
    expect(crypto.verify(pubKeyNoPriv, signature, message)).toBeFalsy();
});

test('Creating a key from a private key should give you a public key as well', () => {
    const keyPair = crypto.generateKeys();
    const privKeyNoPublic = crypto.keyFromPrivate(keyPair.getPrivate());
    console.log(privKeyNoPublic.getPublic());
});

test('creating two keys from a private key should give you the same public key', () => {
    const keyPair = crypto.generateKeys();
    const privKeyNoPublic = crypto.keyFromPrivate(keyPair.getPrivate());
    const privKey2 = crypto.keyFromPrivate(keyPair.getPrivate());
    expect(privKeyNoPublic).toEqual(privKey2);
});