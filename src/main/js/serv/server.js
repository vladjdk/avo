const http = require('http');
const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const app = express();
const PORT = 3000;
//TODO: honestly, changing th
const chain = new Blockchain();

app.get('/lastblock', (request, response) => {
    response.json(chain.lastBlock());
});

app.post('/transaction', (request, response) => {
    const senderKey = request.body.sender.key;
    const senderSignature = request.body.sender.signature;
    const amount = request.body.sender.amount;
    const receiverKey = request.body.receiver.address;
    //TODO: Verify sender signature using sender key.
    //TODO: add send and receive.
    console.log(response);
});

/**
 * Requests the unconfirmed transactions from the transaction pool.
 * Listed from newest to oldest transaction. People can sort through
 * them however they want.
 */
app.get('unconfirmed', (request, response) => {
    response.json(chain.unconfirmed);
});

app.listen(PORT, (err) => {
    if(err) {
        return console.log('Error: ', err);
    }
    console.log(`Listening on port: ${PORT}.`)
});