let transaction = require('./Transaction');

class Block {

    /**
     * Constructing the block object.
     */
    constructor() {
        this.index = 0;
        this.previousHash = "";
        this.hash = "";
        this.nonce = 0;
        this.transactions = []
    }

    /**
     * Adding a transaction to the environment.
     * @param {Transaction} transaction
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Get the key for the current block.
     * @returns {string} the key.
     */
    get key() {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
    }

}

module.exports = Block;