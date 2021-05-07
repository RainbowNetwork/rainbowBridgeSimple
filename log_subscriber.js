const Web3 = require("web3");
// const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/69c833c16d17444cabe16e9a50c15b6b');
const web3 = new Web3('wss://ws-matic-mumbai.chainstacklabs.com');
// const CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // eth mainnet WETH
const CONTRACT_ADDRESS = "0xd6C2c41C8c2e6EADe0b78E9FD619cECD9eFca9F8"; // matic testnet MultiSigWallet
// const CONTRACT_ADDRESS = "0xf4B00C937b4ec4Bb5AC051c3c719036c668a31EC"; // eth mainnet MultiSigWallet
// const CONTRACT_ADDRESS = "0xFA22c1BF3b076D2B5785A527C38949be47Ea1082"; // eth rinkeby MultiSigWallet

topic_transfer = web3.utils.sha3("Transfer(address,address,uint256)");
console.log(topic_transfer); // '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
topic_swap = web3.utils.sha3("Swap(uint256,bytes)"); // '0x9c33cc77aa0c536ad2721956a5c74fe1ec4101d9c797f25b34cd9ff94344e5ea'
console.log(topic_swap);
web3.eth.subscribe("logs", {
    address: CONTRACT_ADDRESS,
    topics: [
        //topic_transfer
        topic_swap
    ]
}, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});
