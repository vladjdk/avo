const Block = require('./block');

class Blockchain {
    constructor(blocks) {
        this.blocks = blocks || [new Block(0, 1, 0, [], 0)];
        //unconfirmed transactions
        this.unconfirmed = [];
        this.nodes = [];
    }
    height() {
        return this.blocks.length;
    }

}
module.exports = Blockchain;