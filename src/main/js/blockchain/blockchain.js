const Block = require('./block');
const { generateProof, isProofValid } = require('../utils/proof');

class Blockchain {
    constructor(blocks) {
        this.blocks = blocks || [new Block(0, 1, 0, [])];
        this.currentTransactions = [];
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    /**
     * Mining a block.
     * @param {Block} block
     */
    mineBlock(block) {
        this.blocks.push(block);
        console.log('Mined block: ' + block.index);
    }

    async newTransaction(transaction) {
        this.currentTransactions.push(transaction);

        //block size is 2
        //TODO: Change the block size to something, or even make another threshold for mining the blocks.
        if (this.currentTransactions.length === 2) {
            console.info('Started mining the block...');
            const previousBlock = this.lastBlock();
            process.env.BREAK = false;
            const block = new Block(previousBlock.getIndex() + 1,
                previousBlock.hashValue(),
                previousBlock.getProof(),
                this.currentTransactions);
            const { proof, dontMine } = await generateProof(previousBlock.getProof());
            block.setProof(proof);
            this.currentTransactions = [];
            if(dontMine !== 'true') {
                this.mineBlock(block)
            }
        }
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