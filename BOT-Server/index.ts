 
import TelegramBot from 'node-telegram-bot-api';

import dotenv from 'dotenv'

import dbConnect from './Utils/mongoDB'
import createKeypair from './src/createKeypair'

dotenv.config();



dbConnect();


createKeypair("jj")



const token:string|undefined =process.env.BOT_API_KEY ;
 

const bot:TelegramBot = new TelegramBot(token!, { polling: true });
 
bot.on('message', (msg: TelegramBot.Message) => {
  const chatId: number = msg.chat.id;
  const messageText: string | undefined = msg.text;

  
  if (messageText === '/start') {
  
    bot.sendMessage(chatId, 'Choose a color:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Orange', callback_data: 'orange' }],
          [{ text: 'Red', callback_data: 'red' }],
          [{ text: 'Green', callback_data: 'green' }]
        ]
      }
    });
  } else {
  
    bot.sendMessage(chatId, `You said: ${messageText}`);
  }
});



bot.on('callback_query', (callbackQuery: TelegramBot.CallbackQuery) => {
  const chatId: number = callbackQuery.message!.chat.id;
  const selectedColor: string = callbackQuery.data!;

  

  bot.sendMessage(chatId, `You selected: ${selectedColor}`);

   
  if (selectedColor === 'red') {
      // Call your 'add' function when the 'Red' button is pressed
  }

  

  bot.answerCallbackQuery(callbackQuery.id);
});
