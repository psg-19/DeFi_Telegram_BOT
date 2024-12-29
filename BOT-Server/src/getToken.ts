import axios from "axios";
import { ethers } from "ethers"
import dotenv from 'dotenv'
import User from "../Models/User";
import decrypt from "../Utils/decrypt";

dotenv.config();


const  func = async(token:string) =>{
    let tokenId:string;
    if (token === 'USDC') {
        tokenId = 'usd-coin';
    }
     else if (token === 'BNB') {
        tokenId = 'binancecoin';
    }
     else if (token === 'PEPE') {
        tokenId = 'pepe';
    }
     else if (token === 'SHIB') {
        tokenId = 'shiba-inu';
    }
     else if (token === 'USDT') {
        tokenId = 'tether';
    }
     else if (token === 'WBTC') {
        tokenId = 'wrapped-bitcoin';
    }
     else if (token === 'SHY') {
       tokenId = 'injective-protocol';
    }

     else {
        throw new Error('Token not supported');
    }

    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: tokenId,       
          vs_currencies: 'eth',   
        },
      });
    
      const TokenToEth = response?.data[tokenId]?.eth;

      return TokenToEth;
}



const getTokens= async (chatId:string,token:string,ethAmount:string)=>{

    const providerUrl:string = process.env.ALCHEMY_RPC!;

    const provider = new ethers.JsonRpcProvider(providerUrl);  

    const contractAddress =  process.env.TOKEN_TO_SERVER_CONTRACT!;

    const contractABI = [
        "function GetToken(address to,uint256 amount,string memory token) external payable"
        ];
    
    const walletPrivateKey = process.env.TOKEN_TO_SERVER_CONTRACT_OWNER_PRIVATE_KEY!;  
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, wallet);

    //call contract GetToken function and send eth to contract
console.log("debug begin ...")

    let price_1Token_to_eth=await func(token);
console.log("price_1Token_to_eth = "+price_1Token_to_eth);
let number_of_tokens_in_1ETH=(1.0/price_1Token_to_eth);
console.log("number_of_tokens_in_1ETH = "+number_of_tokens_in_1ETH);

const number_of_tokens_to_be_minted=(number_of_tokens_in_1ETH*(parseFloat(ethAmount))).toFixed(18);
console.log("number_of_tokens_to_be_minted = "+number_of_tokens_to_be_minted);
console.log("mint this much "+number_of_tokens_to_be_minted+" "+token+" for this much eth "+ethAmount);


const user=await User.findOne({userId:chatId})


if(!user){
    console.log("hello")
    return "user not found, please create a user by typing /start ....";
}


console.log("11111")
console.log("11111")
// console.log(user.p)
const privatekey:string=decrypt(user.privateKey);
console.log("22222")


const UserWallet = new ethers.Wallet(privatekey,provider);
console.log("33333")

const walletAddress = UserWallet.address;
console.log("44444")

const balanceWei = await provider.getBalance(walletAddress);
console.log("55555")

const balanceEther = ethers.formatEther(balanceWei);
console.log("66666")


console.log(parseFloat(balanceEther))
console.log(parseFloat(ethAmount))
// return;
// return;

if(parseFloat(balanceEther)<parseFloat(ethAmount)){
    return "Not Enough Balanace ....";
}
console.log("trying to debugggg")
// console.log(ethAmount)
// console.log(ethers.parseEther(ethAmount));
console.log(number_of_tokens_to_be_minted)
console.log(ethers.parseUnits(number_of_tokens_to_be_minted.toString(),18))
        console.log(token)

console.log("done debuggg")

UserWallet.connect(provider)


let messageToSend='';

await UserWallet.sendTransaction({
    to: "0x20753c621FcC8ab20aD53958e807AD78146970Bb",  // The address to send to
    value: ethers.parseEther(ethAmount),  // The amount to send in wei (converted from Ether)
  })
  .then(async()=>{


    try {
        console.log("in tryyyyyyyyyyy")
        
        const tx = await contractWithSigner.GetToken(UserWallet.address,ethers.parseUnits(number_of_tokens_to_be_minted.toString(),18),token,{
            value:ethers.parseEther(ethAmount)
        });
  
  console.log('Transaction Hash:', tx.hash);

// Wait for the transaction to be mined
const receipt = await tx.wait();
console.log('Transaction was mined in block:', receipt.blockNumber);
messageToSend+= 'Transaction Hash:'+ tx.hash;
} catch (error) {
console.error('Error minting tokens:', error);
messageToSend+='Error minting tokens:'+ error;
}



  })
  .catch((error)=>{
    console.log(error.message)
    messageToSend=error.message.toString()
    // console.log(error.message?.info.message)
  });

return messageToSend;


 /*

 1 token = x eth

 1 eth = 1 token/x

 


 */



}
 
export default getTokens