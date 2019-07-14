const Peer = require('peerjs').Peer;

//TODO: Generate a new cryptographic public key and use it as the ID.
const peer = new Peer(
    'CRYPTOGRAPHIC_PEER_ID',
    {
        host: "127.0.0.1",
        port: 7888,
        debug: 3
    });

peer.on('open', (id) => {
    console.log(id)
});

peer.on('connection', conn => {
    console.log(conn)
});

const conn = peer.connect('destination_peer_id');
conn.on('open', () => {
    conn.on('data', data => {
        console.log(data)
    });

    conn.send('hello');
});
