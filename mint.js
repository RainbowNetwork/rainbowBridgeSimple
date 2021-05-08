const {
    EnigmaUtils, Secp256k1Pen, SigningCosmWasmClient, pubkeyToAddress, encodeSecp256k1Pubkey, unmarshalTx
  } = require("secretjs");
const { Slip10RawIndex } = require("@iov/crypto");
const { fromUtf8 } = require("@iov/encoding");
  
const fs = require("fs");
  
  // Load environment variables
  require('dotenv').config();
  
  const customFees = {
    upload: {
        amount: [{ amount: "2000000", denom: "uscrt" }],
        gas: "2000000",
    },
    init: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    exec: {
        amount: [{ amount: "500000", denom: "uscrt" }],
        gas: "500000",
    },
    send: {
        amount: [{ amount: "80000", denom: "uscrt" }],
        gas: "80000",
    },
  }
  
    const mint = async (recipient, amount) => {
    const httpUrl = process.env.SECRET_REST_URL;
  
    // Use key created in tutorial #2
    const mnemonic = process.env.MNEMONIC;
  
    // A pen is the most basic tool you can think of for signing.
    // This wraps a single keypair and allows for signing.
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);
  
    // Get the public key
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
  
    // get the wallet address
    const accAddress = pubkeyToAddress(pubkey, 'secret');
  
    const txEncryptionSeed = EnigmaUtils.GenerateNewSeed();
    
    const client = new SigningCosmWasmClient(
        httpUrl,
        accAddress,
        (signBytes) => signingPen.sign(signBytes),
        txEncryptionSeed, customFees
    );
    console.log(`Wallet address=${accAddress}`)
    
    //address of token
    const tokenAddress = "secret19epqza8rsv6x59ls8t257hkmcjwwz0lekxvhzs" //sMATIC
    // const tokenAddress = "secret1yad3le38e63zuaqudmscq0889usw4jusjxdat6" //sRBT
    //const amount = "1000000"
    //const receipient = "secret1ltkkhhygrrg2tp8ealtqqflq7ayqxt3tfgsu6g"
    //mint some tokens
    let handleMsg = {
        mint: 
        {
            address: recipient, amount: amount
        }
    };
    response = await client.execute(tokenAddress, handleMsg);
    console.log("Check your mint");

  };

  module.exports=mint;
  