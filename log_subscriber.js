const Web3 = require("web3");
const BigNumber = require('bignumber.js');
const mint = require("./mint");
// const web3 = new Web3('wss://rinkeby.infura.io/ws/v3/69c833c16d17444cabe16e9a50c15b6b');
const web3 = new Web3('wss://ws-matic-mumbai.chainstacklabs.com');
// const CONTRACT_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // eth mainnet WETH
const CONTRACT_ADDRESS = "0xd6C2c41C8c2e6EADe0b78E9FD619cECD9eFca9F8"; // matic testnet MultiSigWallet
// const CONTRACT_ADDRESS = "0xf4B00C937b4ec4Bb5AC051c3c719036c668a31EC"; // eth mainnet MultiSigWallet
// const CONTRACT_ADDRESS = "0xFA22c1BF3b076D2B5785A527C38949be47Ea1082"; // eth rinkeby MultiSigWallet

topic_swap = web3.utils.sha3("Swap(uint256,bytes)"); // '0x9c33cc77aa0c536ad2721956a5c74fe1ec4101d9c797f25b34cd9ff94344e5ea'
// topic_swapToken = web3.utils.sha3("SwapToken(address,bytes,uint256,address)"); // '0x7bad95c5817621d8789091ae63d99bf8f7bed9ea4963b10c3d3c6bb7273522b3'

console.log(topic_swap);
// console.log(topic_swapToken);
web3.eth.subscribe("logs", {
    address: CONTRACT_ADDRESS,
    topics: [
        //topic_swapToken
        topic_swap
    ]
}, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        logData = result.data;
        swapAmount = Web3.utils.hexToNumberString('0x'+logData.substring(2, 66));
        const x = new BigNumber(swapAmount).shiftedBy(-12)
        recipientSecretAddress = Web3.utils.hexToUtf8('0x'+logData.substring(194, 284));
        console.log(x.toString());
        console.log(recipientSecretAddress);
        mint(recipientSecretAddress, x.toString());
    }
});
