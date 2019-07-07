const crypto = require('crypto');

class Block {
    constructor(index, previousBlockHash, previousProof, transactions) {
        this.index = index;
        this.proof = previousProof;
        this.previousBlockHash = previousBlockHash;
        this.transactions = transactions;
        this.timestamp = Date.now();
        this.hash = hashValue()
        this.rando = 0;
    }

    hashValue() {
        const { index, proof, transactions, timestamp, rando } = this;
        const blockString = `${index}-${proof}-${JSON.stringify(transactions)}-${timestamp}-${rando}`;
        const hashFunction = crypto.createHash('sha256');
        hashFunction.update(blockString);
        return hashFunction.digest('hex');
    }

    setProof(proof) {
        this.proof = proof;
    }

    getProof() {
        return this.proof;
    }

    getIndex() {
        return this.index;
    }

    getPreviousBlockHash() {
        return this.previousBlockHash;
    }

    mineBlock(Diff) {
        while (this.hash.substring(0, Diff) !== Array(Diff + 1).join("0")){
            this.rando++;
            this.hash = hashValue();
        }

        console.log("Block mined: " + this.hash);
    }
}

module.exports = Block;