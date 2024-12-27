 
import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv'

import dbConnect from './Utils/mongoDB'
import createKeypair from './src/createKeypair'
import User from './Models/User';
import { ethers } from 'ethers';
import decrypt from './Utils/decrypt';

dotenv.config();



dbConnect();


// createKeypair("jj")



const token:string|undefined =process.env.BOT_API_KEY ;
 

const bot:TelegramBot = new TelegramBot(token!, { polling: true });
 

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

  if (!chatId) {
 return;
  }
    
    if (['buy', 'sell', 'publicKey', 'eject','balances'].includes(callbackData!)) {

//---------------------------buy ---------------------------------
if(callbackData=='buy'){
  bot.sendMessage(chatId!, `You selected ${callbackData}. Now, please choose a sub-option:`, CryptoMenuBuy);
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
        
        await User.deleteOne({userId:chatId!.toString()});

        bot.sendMessage(chatId!, `Your Private Key is ${wallet.privateKey}.`);
        
      }
      else{
        bot.sendMessage(chatId!, `Ejection cancelled.`);
      }
    }


    if(['USDC_sell','USDT_sell','SHY_sell','PEPE_sell','BNB_sell','SHIB_sell','WBTC_sell'].includes(callbackData!)){

      const token=callbackData?.split('_')[0];
      console.log(token)




    }

   
console.log(callbackData)
  
  
 
  bot.answerCallbackQuery(callbackQuery.id);
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

 