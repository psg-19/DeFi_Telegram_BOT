import axios from "axios";

const  get_Token_Price_In_Terms_Of_ETH = async() =>{
   
  
    
    // const tokenIds = ['usd_coin','binancecoin','pepe','shiba-inu','tether','wrapped-bitcoin','injective-protocol'];

    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: "usd-coin,binancecoin,pepe,shiba-inu,tether,wrapped-bitcoin,injective-protocol",       
          vs_currencies: 'eth',   
        },
      });
      
      console.log(response.data);
      return response.data;
}

export default get_Token_Price_In_Terms_Of_ETH;