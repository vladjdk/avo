const Block = require('../../../main/js/blockchain/block');

describe('Block', () => {

  const previousBlockHash = 'prev-hash';
  const index = 'index';
  const previousProof = 'bar-hash';
  const timestamp = 'date';
  const transactions = ['blockchain', 'data'];
  const block = new Block(index, previousBlockHash, previousProof, transactions);
  

  test('has a timestamp, lastHash, hash, and data property', () => {
    expect(block.previousBlockHash).toEqual(previousBlockHash);
    expect(block.index).toEqual(index);
    expect(block.previousProof).toEqual(previousProof);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.transactions).toEqual(transactions);
  });
});