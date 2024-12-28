 
import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv'

import dbConnect from './Utils/mongoDB'
import createKeypair from './src/createKeypair'
import User from './Models/User';
import { ethers } from 'ethers';
import decrypt from './Utils/decrypt';
import burnTokens from './src/burnToken';
import getTokens from './src/getToken';
import getTokenPrice from './src/getTokenPrice';
import get_Token_Price_In_Terms_Of_ETH from './src/get_Token_Price_In_Terms_Of_ETH';

dotenv.config();



dbConnect();

// getTokens("jjj","USDC","0.1");
// burnTokens("hhh","USDC","333")
// createKeypair("jj")


// ExitStatus(0)
const token_bot:string|undefined =process.env.BOT_API_KEY ;
 

const bot:TelegramBot = new TelegramBot(token_bot!, { polling: true });
 

let userBuyState: { [chatId: number]: string } = {};

const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Buy Crypto', callback_data: 'buy' }],
      [{ text: 'Sell Crypto', callback_data: 'sell' }],
      [{ text: 'Get Public KEy', callback_data: 'publicKey' }],
      [{ text: 'Get Your Token Balances', callback_data: 'balances' }],
      [{ text: 'Eject Your Private Key', callback_data: 'eject' }]
    ]
  }
};
 
 

const CryptoMenuBuy = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'USDC', callback_data: 'USDC_buy' }],
      [{ text: 'USDT', callback_data: 'USDT_buy' }],
      [{ text: 'SHY Coin', callback_data: 'SHY_buy' }],
      [{ text: 'PEPE', callback_data: 'PEPE_buy' }],
      [{ text: 'BNB', callback_data: 'BNB_buy' }],
      [{ text: 'SHIBA INU', callback_data: 'SHIB_buy' }],
      [{ text: 'Wrapped BITCOIN', callback_data: 'WBTC_buy' }],

    ]
  }
}


const CryptoMenuSell = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'USDC', callback_data: 'USDC_sell' }],
      [{ text: 'USDT', callback_data: 'USDT_sell' }],
      [{ text: 'SHY Coin', callback_data: 'SHY_sell' }],
      [{ text: 'PEPE', callback_data: 'PEPE_sell' }],
      [{ text: 'BNB', callback_data: 'BNB_sell' }],
      [{ text: 'SHIBA INU', callback_data: 'SHIB_sell' }],
      [{ text: 'Wrapped BITCOIN', callback_data: 'WBTC_sell' }],

    ]
  }
}
 
bot.onText(/\/start/,async (msg) => {
  const chatId = msg.chat.id;
  const result = await createKeypair(chatId.toString());

  
  
    bot.sendMessage(chatId,  result);
  
  bot.sendMessage(chatId, 'Please select an option:', mainMenu);
});

 


bot.on('callback_query', async(callbackQuery) => {
  const chatId = callbackQuery.message?.chat.id;
  const callbackData = callbackQuery.data;
  const queryId = callbackQuery.id;
  const messageId = callbackQuery.message?.message_id;
  if (!chatId) {
 return;
  }
    
    if (['buy', 'sell', 'publicKey', 'eject','balances'].includes(callbackData!)) {

//---------------------------buy ---------------------------------
if(callbackData=='buy'){
 
const res=await get_Token_Price_In_Terms_Of_ETH();

console.log(res)
type SimplifiedData = { [key: string]: number };

// Simplify the data
const simplifiedData: SimplifiedData = Object.keys(res).reduce((acc, coin) => {
  acc[coin] = res[coin].eth; // Extract the ETH value
  return acc;
}, {} as SimplifiedData);

// await delay(100);
const priceMessage = `
Here are the current prices of tokens in terms of Ethereum:

- USDC: ${simplifiedData['usd-coin']} ETH
- USDT: ${simplifiedData['tether']} ETH
- PEPE: ${simplifiedData['pepe']} ETH
- WBTC: ${simplifiedData['wrapped-bitcoin']} ETH
- SHY: ${simplifiedData['injective-protocol']} ETH
- BNB: ${simplifiedData['binancecoin']} ETH
- SHIB: ${simplifiedData['shiba-inu']} ETH

You selected ${callbackData}. Now, please choose a sub-option:
`;
 
bot.sendMessage(chatId!, priceMessage, CryptoMenuBuy);
}




//---------------------------sell ---------------------------------

else if (callbackData=='sell'){
  
  bot.sendMessage(chatId!, `You selected ${callbackData}. Now, please choose a sub-option:`, CryptoMenuSell);
  
  
  
}




//---------------------------publicKey ---------------------------------

    else if(callbackData=='publicKey'){
      const user=await User.findOne({userId:chatId!.toString()});
      
      
      
      bot.sendMessage(chatId!, `Your Public Key is ${user?.publicKey}.`);
      
    }

//--------------------------eject -------------------------------
else if(callbackData=='eject'){
  console.log("in ejection ")
  
  const confirmationMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Yes', callback_data: 'confirmEject' }],
        [{ text: 'No', callback_data: 'cancelEject' }]
      ]
    }
  };
  
  bot.sendMessage(chatId!, `Are you sure you want to eject your \n private key, this will delete your private key \n from our database and give here in chat.`, confirmationMenu);
  
  
  
}



//--------------------------balances  -------------------------------
     else if(callbackData=='balances'){
      
      

      //smart contract interaction



     }



    }


    if(['confirmEject','cancelEject'].includes(callbackData!)){
      if(callbackData=='confirmEject'){
        const user=await User.findOne({userId:chatId!.toString()});
        const privateKeYY=decrypt(user?.privateKey!)
        const wallet = new ethers.Wallet(privateKeYY);
        
        // await User.deleteOne({userId:chatId!.toString()});

        bot.sendMessage(chatId!, `Your Private Key is ${wallet.privateKey}.`);
        
      }
      else{
        bot.sendMessage(chatId!, `Ejection cancelled.`);
      }
    }


    if(['USDC_sell','USDT_sell','SHY_sell','PEPE_sell','BNB_sell','SHIB_sell','WBTC_sell'].includes(callbackData!)){
      
      const token=callbackData?.split('_')[0];
      console.log(token)
      const user=await User.findOne({userId:chatId!.toString()});
      
      
      // burnTokens(user?.publicKey!,token!);
      
      
    }
    
    if(['USDC_buy','USDT_buy','SHY_buy','PEPE_buy','BNB_buy','SHIB_buy','WBTC_buy'].includes(callbackData!)){
      
      userBuyState[chatId!] = callbackData!;
    const  textPrompt = 'You selected '+callbackData?.split("_")[0]+". Please enter the amount of Ethereum you want to spend to buy "+callbackData?.split("_")[0]+": ";
    const  replyMarkup = {
        reply_markup: {
          force_reply: true,
        },
      };

      bot.sendMessage(chatId, textPrompt, replyMarkup);
      const token=callbackData?.split('_')[0];
      console.log(token)
      
      
      
      // bot.sendMessage(chatId!, msg!);
      // burnTokens(user?.publicKey!,token!);
      
      
    //   try {
    //     // Make sure to answer the callback query quickly
    //     await bot.answerCallbackQuery(queryId, { text: 'Processing your request...' });

    //     let msg=  await getTokens(chatId.toString(),token!,"0.01")
    //     if(!msg){
    //       msg="something went wrong";
    //     }
    //     // Perform your logic (e.g., processing inline button click)
    //     // You can send a new message or edit the existing message
    //     await bot.sendMessage(chatId, msg, {
    //         reply_to_message_id: messageId
    //     });
    // } catch (error) {
    //     console.error('Error handling callback query:', error);
    // }

    }

   
console.log(callbackData)
  
  
 
  bot.answerCallbackQuery(callbackQuery.id);
});





bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;
const messageId=msg.message_id;
  // Check if the user has a pending state (i.e., they selected an option and need to provide input)
  if (userBuyState[chatId]) {
    let response = '';

   

    if (userBuyState[chatId].split('_')[1] === 'buy') {


      const regex = /^[0-9]*\.?[0-9]+$/;
      if (!regex.test(userText!)){
        bot.sendMessage(chatId, "Invalid Input !!!, Please Select Coin To Buy",CryptoMenuBuy);
  
    // Clear the user's state after they provide input
    delete userBuyState[chatId];
    return;
  
      }


      response = `You entered ${userText} eth to buy ${userBuyState[chatId].split('_')[0]}. Proceeding with your request...`;
      bot.sendMessage(chatId, response);
      console.log("hiii userstae")
     

     

        // console.log(typeof(userText))
        try {
        // Make sure to answer the callback query quickly
        
        console.log(userBuyState[chatId].split('_')[0])
        let msgToSend=  await getTokens(chatId.toString(),userBuyState[chatId].split('_')[0]!,userText!)
        if(!msgToSend){
          msgToSend="something went wrong";
        }
        // Perform your logic (e.g., processing inline button click)
        // You can send a new message or edit the existing message
        await bot.sendMessage(chatId, msgToSend, {
          reply_to_message_id: messageId
        });
      } catch (error) {
        console.error('Error handling callback query:', error);
      }
      
      
      // Send a response based on the user's input
    
    // Clear the user's state after they provide input
    delete userBuyState[chatId];
  } 



}
  // else {
  //   bot.sendMessage(chatId, "Please choose an option first.");
  // }
});




// bot.on('message', async(msg: TelegramBot.Message) => {
//   const chatId: number = msg.chat.id;
//   const messageText: string | undefined = msg.text;

  
//   if (messageText === '/start') {
//   // const msg=await createKeypair(chatId.toString());
//   const result = await createKeypair(chatId.toString());

//     bot.sendMessage(chatId,  result);
//   } else {
  
//     bot.sendMessage(chatId, `You said: ${messageText}`);
//   }
// });

 