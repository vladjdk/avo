const SocketActions = require('./constants');

const Transaction = require('./blockchain/transaction');
const Blockchain = require('./blockchain/blockchain');

const socketListeners = (socket, chain) => {
    socket.on(SocketActions.ADD_TRANSACTION, (sender, receiver, amount) => {
        const transaction = new Transaction(sender, receiver, amount);
        chain.newTransaction(transaction);
        //TODO: Fix getDetails.
        console.info(`Added transaction: ${JSON.stringify(transaction.getDetails(), null, '\t')}`);
    });

    socket.on(SocketActions.END_MINING, (newChain) => {
        console.log('End Mining encountered');
        process.env.BREAK = true;
        const blockChain = new Blockchain();
        blockChain.parseChain(newChain);
        if (blockChain.checkValidity() && blockChain.getLength() >= chain.getLength()) {
            chain.blocks = blockChain.blocks;
        }
    });

    return socket;
};

module.exports = socketListeners;