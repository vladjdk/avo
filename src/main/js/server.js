const bodyParser = require('body-parser');
const express = require('express');
const Blockchain = require('./blockchain/blockchain');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const blockPath = '/home/vlad/Documents/avo/blockchain_save/blockchain';
var blockchain;
const PORT = 7888;

try {
    /*
    * basically here there's going to be some sort of way to check if the file containing
    * all the blocks exists, and if not, it creates a completely new blockchain
    * object. Now that I think of it, the blockchain object shouldn't have all the
    * blocks in it since thats going to be way too much data in memory. We can probably
    * switch it from being a list of blocks to being a file that it reads from.
    */
    fs.readFileSync(blockPath);
} catch (e) {
    blockchain = new Blockchain();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//all these are basically the 'server side' of the node. Look at these functions
//as something that is sent out and given rather than being requested.
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/transaction', (req, res) => {
    //TODO: transactions
    if(req.txid == null || req.pubKey == null || req.signature == null || req.address == null) {
        res.send({err: 'nullError'});
        res.end();
    }
});

app.get('/height', (req, res) => {
    res.send({height: blockchain.height()});
});

app.get('/blocks', (req, res) => {
    //TODO: Would probably be nice to
    res.send({blocks: blockchain.blocks}) ;
});


app.post('/sendChain', (req, res) => {
    //TODO: getting a block sent to the server, verifying it using POF, and adding it to the current chain.
});


app.listen(7888, () =>
    console.log(`AVO listening on port ${PORT}`)
);
