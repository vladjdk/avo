const Block = require('./block');

class Blockchain {
    constructor(blocks) {
        this.blocks = blocks || [new Block(0, 1, 0, [])];
        //unconfirmed transactions
        this.unconfirmed = [];
        this.nodes = [];
    }
    height() {
        return this.blocks.length;
    }

    //I deleted everything inside of the blockchain class because most of it was
    //useless to me at this point and it was just copied from the internet
    //at a time where none of us understood what it meant. because of this,
    //it'd be better to just start anew.
}
module.exports = Blockchain;