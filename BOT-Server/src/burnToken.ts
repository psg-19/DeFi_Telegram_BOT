import axios from "axios";
import { ethers } from "ethers"
import dotenv from 'dotenv'

dotenv.config();


const  get_Token_Price_In_Terms_Of_ETH = async(token:string) =>{
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
    
      const TokenToEth = response?.data['usd-coin']?.eth;

      return TokenToEth;
}


const burnTokens= async (publicKey:string,token:string,amount:string)=>{

    const providerUrl:string = process.env.ALCHEMY_RPC!;

    const provider = new ethers.JsonRpcProvider(providerUrl);  

    const contractAddress =  process.env.TOKEN_TO_SERVER_CONTRACT!;

    const contractABI = [
         
     "function BurnToken(address to,uint256 burn_amount,uint256 eth_amount,string memory token) external",
    ];
    
    const walletPrivateKey = process.env.TOKEN_TO_SERVER_CONTRACT_OWNER_PRIVATE_KEY!;  
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, wallet);

    //call contract burn function and send eth 

    let res=await get_Token_Price_In_Terms_Of_ETH(token);
 
res=res*(parseFloat(amount));

    let ethAmt:bigint=ethers.parseEther(res.toString());

    // console.log("burn this much tokens "+ amount+" "+"and send this much eth "+res);
   
// return;

    try {
        
                const tx = await contractWithSigner.BurnToken(publicKey,ethers.parseUnits(amount,18),ethAmt,token);
          
          console.log('Transaction Hash:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction was mined in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error minting tokens:', error);
    }


}

export default burnTokens