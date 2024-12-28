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
console.log("in burn tokenssssssssssss")

    console.log(publicKey)
    console.log(token)
    console.log(amount)

    // return "done"
    const providerUrl:string = process.env.ALCHEMY_RPC!;

    const provider = new ethers.JsonRpcProvider(providerUrl);  

    const contractAddress =  process.env.TOKEN_TO_SERVER_CONTRACT!;

    const contractABI = [
         "function GetBalances(address user,string memory token)external view returns (uint256)",
     "function BurnToken(address to,uint256 burn_amount,uint256 eth_amount,string memory token) external",
    ];
    
    const walletPrivateKey = process.env.TOKEN_TO_SERVER_CONTRACT_OWNER_PRIVATE_KEY!;  
const wallet = new ethers.Wallet(walletPrivateKey, provider);
const contractWithSigner = new ethers.Contract(contractAddress, contractABI, wallet);

    //call contract burn function and send eth 
    let userBalance:bigint=BigInt(0);
    try {
        const tx:bigint = await contractWithSigner.GetBalances(publicKey,token);
        
            //   console.log('Transaction Hash:', tx.hash);
        // console.log(typeof(tx))
        console.log(tx)
        userBalance=tx;
        // Wait for the transaction to be mined
        // const receipt = await tx.wait();
        // console.log('Transaction was mined in block:', receipt.blockNumber);
    } catch (error) {
            console.error('Error minting tokens:', error);
        }
        
        if(userBalance<ethers.parseUnits(amount,18)){
            return "Insuffiecient "+token;
        }
        console.log("Debug starts here ---> ")
            let res=await get_Token_Price_In_Terms_Of_ETH(token);
         console.log(res);
         res=res*(parseFloat(amount));
         res=res.toFixed(18);
         console.log(res);

            let ethAmt:bigint=ethers.parseEther(res.toString());
console.log(ethAmt)
    console.log("burn this much tokens "+ amount+" "+"and send this much eth "+res);
   
// return;
let response1 :string="";
    try {
        
                const tx = await contractWithSigner.BurnToken(publicKey,ethers.parseUnits(amount,18),ethAmt,token);
          
          console.log('Transaction Hash:', tx.hash);
        response1='Transaction Hash:'+ tx.hash;
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction was mined in block:', receipt.blockNumber);
    } catch (error) {
        console.error('Error minting tokens:', error);
        response1=error!.toString();
    }
    

return response1;
}

export default burnTokens