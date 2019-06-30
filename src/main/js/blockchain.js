let block = require('./block');
let sha256 = require('js-sha256').sha256;

class blockchain {

    /**
     * Constructing the blockchain.
     * @param {block} genesisBlock
     */
    constructor(genesisBlock) {
        this.blocks = [];
        this.addBlock(genesisBlock)
    }

    /**
     * Adding a block to the chain.
     * @param {block} block
     */
    addBlock(block) {
        if(this.blocks.length === 0) {
            block.previousHash = "0000000000000000";
            block.hash = blockchain.generateHash(block)
        }

        this.blocks.push(block);
    }

    /**
     * Getting the next block in the chain.
     * @param {transaction[]} transactions.
     * @return {block} the next block in the chain.
     */
    getNextBlock(transactions) {
        let block =
            new block();
        transactions.forEach(function(transaction) {
            block.addTransaction(transaction)
        });

        let previousBlock = this.getPreviousBlock();
        block.index = this.blocks.length;
        block.previousHash = previousBlock.hash;
        block.hash = blockchain.generateHash(block);
        return block
    }

    /**
     * Generates a new hash for the block.
     * @param {block} block
     */
    static generateHash(block){
        let hash = sha256(block.key);

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

module.exports = blockchain;