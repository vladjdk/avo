const Block = require('./block');
const { generateProof, isProofValid } = require('../utils/proof');

class Blockchain {
    constructor(blocks) {
        this.blocks = blocks || [new Block(0, 1, 0, [])];
        //unconfirmed transactions
        this.unconfirmed = [];
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    /**
     * Mining a block.
     * @param {Block} block
     */
    pushBlock(block) {
        this.blocks.push(block);
        console.log('Mined block: ' + block.index);
    }

    newTransaction(txId) {
        this.unconfirmed.push(txId)
    }

    lastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    getLength() {
        return this.blocks.length;
    }

    checkValidity() {
        const { blocks } = this;
        let previousBlock = blocks[0];
        for (let index = 1; index < blocks.length; index++) {
            const currentBlock = blocks[index];
            if(currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
                return false;
            }
            if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
                return false;
            }
            previousBlock = currentBlock;
        }
        return true;
    }
}
module.exports = Blockchain;