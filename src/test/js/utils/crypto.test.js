const crypto = require('../../../main/js/utils/crypto');
const Block = require('../../../main/js/blockchain/block');

let block = new Block(1,1,1,1,1);
console.log(block);

block.setNonce(0);
