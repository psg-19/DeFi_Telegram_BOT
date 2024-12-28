import axios from "axios";

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


const getTokenPrice=async(token:string,ethAmount:string)=>{

let eth_for_1Token=await get_Token_Price_In_Terms_Of_ETH(token);

let one_ETH_in_terms_of_token=1.0/eth_for_1Token;

return parseFloat(ethAmount)*one_ETH_in_terms_of_token;

/*

1 token = xth

1 eth =

 */ 

}

export default getTokenPrice;
