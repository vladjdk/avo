const http = require('http');
const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const app = express();
const PORT = 3000;

const chain = new Blockchain()

app.get('/', (request, response) => {
    response.send('Hello from Express!');
});

app.get('/lastblock', (request, response) => {
    response.json(blockchain.lastBlock());
})

app.listen(PORT, (err) => {
    if(err) {
        return console.log('Error: ', err);
    }
    console.log(`Listening on port: ${PORT}.`)
});