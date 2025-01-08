const sha256 = require("crypto-js/sha256");

//class for each block ( how a block will look like)
class Block {
  constructor(index, sender, receiver, money, prevHash = "", timestamps) {
    this.index = index;
    this.sender = sender;
    this.receiver = receiver;
    this.money = money;
    this.prevHash = prevHash;
    this.timestamps = timestamps;

    this.hash = this.calculateHash();
  }

  //function to calculate hash
  calculateHash() {
    return sha256(
      this.index +
        this.sender +
        this.receiver +
        this.money +
        this.prevHash +
        this.timestamps
    ).toString();
  }
}

//for checking block is working or not
// const firstBlock = new Block(0, "owner", "rupe", 100, "debit", 0, "08/01/2025");
// console.log(firstBlock);

//class for blockchain ( How a blockchain will look like )
class blockchain {
  constructor() {
    //we create a fresh chain and added our first block
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "owner", "rupe", 100, "0", "08/01/2025");
  }

  addBlock(sender, receiver, money) {
    let newblock = new Block(
      this.chain.length,
      sender,
      receiver,
      money,
      this.chain[this.chain.length - 1].hash,
      Date.now().toString()
    );
    this.chain.push(newblock);
  }
}

const myBlockChain = new blockchain();

console.log("Before transaction");
console.log(myBlockChain);

console.log("After transactions");
myBlockChain.addBlock("rupesh", "krish", 100);
myBlockChain.addBlock("krish", "aarav", 100);
console.log(myBlockChain);
