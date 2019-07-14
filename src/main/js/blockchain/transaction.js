class Transaction {
    constructor(sender, recipient, quantity) {
        this.txID = "1";//TODO: hash the transation ID using a util/crypto class.
        this.sender = sender;
        this.recipient = recipient;
        this.quantity = quantity;
        this.timestamp = Date.now();
    }
}
module.exports = Transaction;