class Transaction {
    constructor(sender, recipient, quantity) {
        this.sender = sender;
        this.recipient = recipient;
        this.quantity = quantity;
        this.timestamp = Date.now();
    }
}
module.exports = Transaction;