import axios from "axios";
import { ethers } from "ethers"
import dotenv from 'dotenv'
import User from "../Models/User";
import decrypt from "../Utils/decrypt";

dotenv.config();

 


const getUserBalance= async (chatId:string )=>{

    const providerUrl:string = process.env.ALCHEMY_RPC!;

    const provider = new ethers.JsonRpcProvider(providerUrl);  

    const contractAddress =  "0xeE658FFFb3A0734192839d34662D3bd32b46a170";

    const contractABI = [
        // "function balanceOf(address account) external view returns (uint256)",
"function GetBalances(address user,string memory token)public view returns (uint256)"
];
    
    const walletPrivateKey = process.env.TOKEN_TO_SERVER_CONTRACT_OWNER_PRIVATE_KEY!;  
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, wallet);

  
const user=await User.findOne({userId:chatId});
  

 let messageToSend:object;


 


    try {
        console.log("in tryyyyyyyyyyy")
        
        const [tx1, tx2, tx3, tx4, tx5, tx6, tx7,response] = await Promise.all([
            contractWithSigner.GetBalances(user?.publicKey, 'USDC'),
            contractWithSigner.GetBalances(user?.publicKey, 'USDT'),
            contractWithSigner.GetBalances(user?.publicKey, 'SHY'),
            contractWithSigner.GetBalances(user?.publicKey, 'PEPE'),
            contractWithSigner.GetBalances(user?.publicKey, 'BNB'),
            contractWithSigner.GetBalances(user?.publicKey, 'SHIB'),
            contractWithSigner.GetBalances(user?.publicKey, 'WBTC'),
              provider.getBalance(user?.publicKey!)
    
            // Convert balance from Wei to Ether (1 Ether = 10^18 Wei)
        ]);


       
        const balanceEther = ethers.formatUnits(response, 18);
          
    
          // Convert Wei to Ether (1 Ether = 10^18 Wei)
           
          // Create an object with token names as keys and balances as values
          messageToSend = {
            ETH: balanceEther.toString(),
            USDC: ethers.formatUnits(tx1,18),
            USDT:ethers.formatUnits(tx2,18),
            SHY:ethers.formatUnits(tx3,18),
            PEPE: ethers.formatUnits(tx4,18),
            BNB: ethers.formatUnits(tx5,18),
            SHIB:ethers.formatUnits(tx6,18),
            WBTC:ethers.formatUnits(tx7,18),
          };
          
          
          console.log(messageToSend)
// Wait for the transaction to be mined
// const receipt = await tx.wait();
// console.log('Transaction was mined in block:', receipt.blockNumber);
// messageToSend+= 'Transaction Hash:'+ tx.hash;
} catch (error:any) {
console.error('Error balance tokens:', error);
messageToSend={'Error fetching token balance: ': error.toString()};
}
  




return messageToSend;


 /*

 1 token = x eth

 1 eth = 1 token/x

 


 */



}
 
export default getUserBalance