const http = require('http');
const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const app = express();
const PORT = 3000;

const chain = new Blockchain();

app.get('/lastblock', (request, response) => {
    response.json(chain.lastBlock());
});

app.post('/transaction', (request, response) => {
    const senderKey = request.body.sender.key;
    const senderSignature = request.body.sender.signature;
    const amount = request.body.sender.amount;
    const receiverAddress = request.body.receiver.address;


});

app.listen(PORT, (err) => {
    if(err) {
        return console.log('Error: ', err);
    }
    console.log(`Listening on port: ${PORT}.`)
});