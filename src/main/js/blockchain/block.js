const crypto = require('crypto');

class Block {
    constructor(index, previousBlockHash, previousProof, transactions) {
        this.index = index;
        this.proof = previousProof;
        this.previousBlockHash = previousBlockHash;
        this.transactions = transactions;
        this.timestamp = Date.now();
    }

    //TODO: Create a crypto class that will contain all hashing and encrypting
    hashValue() {
        const { index, proof, transactions, timestamp } = this;
        const blockString = `${index}-${proof}-${JSON.stringify(transactions)}-${timestamp}`;
        const hashFunction = crypto.createHash('sha256');
        hashFunction.update(blockString);
        return hashFunction.digest('hex');
    }

    //everything from here was also deleted, just like from the blockchain class.
    //the more I read about blockchain, the more I understand it and the more flaws
    //I find in the actual copied code that we have. We should add everything one by one
    //instead of having a prebuilt package. This will allow everything to be just the way
    //we want it and it'll also require complete understanding of the feature before
    //implementing it.
}

module.exports = Block;