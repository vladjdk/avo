let Block = require('./block');
let sha256 = require('js-sha256');

class Blockchain {

    /**
     * Constructing the blockchain.
     * @param {Block} genesisBlock
     */
    constructor(genesisBlock) {
        this.blocks = [];
        this.addBlock(genesisBlock)
    }

    /**
     * Adding a block to the chain.
     * @param {Block} block
     */
    addBlock(block) {
        if(this.blocks.length === 0) {
            block.previousHash = "0000000000000000";
            block.hash = Blockchain.generateHash(block)
        }

        this.blocks.push(block);
    }

    /**
     * Getting the next block in the chain.
     * @param {Transaction[]} transactions.
     * @return {Block} the next block in the chain.
     */
    getNextBlock(transactions) {
        let block = new Block();
        transactions.forEach(function(transaction) {
            block.addTransaction(transaction)
        });

        let previousBlock = this.getPreviousBlock();
        block.index = this.blocks.length;
        block.previousHash = previousBlock.hash;
        block.hash = Blockchain.generateHash(block);
        return block
    }

    /**
     * Generates a new hash for the block.
     * @param {Block} block
     */
    static generateHash(block){
        let hash = sha256(block.key)

        while(hash.startsWith("0000")) {
            block.nonce++;
            hash = sha256(block.key);
            console.log(hash)
        }

        return hash
    }

    /**
     * Gets the previous block in the blockchain.
     * @returns {*}
     */
    getPreviousBlock() {
        return this.blocks[this.blocks.length-1]
    }
}

module.exports = Blockchain;