"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDB_1 = __importDefault(require("./Utils/mongoDB"));
const createKeypair_1 = __importDefault(require("./src/createKeypair"));
const User_1 = __importDefault(require("./Models/User"));
const ethers_1 = require("ethers");
const decrypt_1 = __importDefault(require("./Utils/decrypt"));
dotenv_1.default.config();
(0, mongoDB_1.default)();
// createKeypair("jj")
const token = process.env.BOT_API_KEY;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
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
};
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
};
bot.onText(/\/start/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const result = yield (0, createKeypair_1.default)(chatId.toString());
    bot.sendMessage(chatId, result);
    bot.sendMessage(chatId, 'Please select an option:', mainMenu);
}));
bot.on('callback_query', (callbackQuery) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = (_a = callbackQuery.message) === null || _a === void 0 ? void 0 : _a.chat.id;
    const callbackData = callbackQuery.data;
    if (!chatId) {
        return;
    }
    if (['buy', 'sell', 'publicKey', 'eject', 'balances'].includes(callbackData)) {
        //---------------------------buy ---------------------------------
        if (callbackData == 'buy') {
            bot.sendMessage(chatId, `You selected ${callbackData}. Now, please choose a sub-option:`, CryptoMenuBuy);
        }
        //---------------------------sell ---------------------------------
        else if (callbackData == 'sell') {
            bot.sendMessage(chatId, `You selected ${callbackData}. Now, please choose a sub-option:`, CryptoMenuSell);
        }
        //---------------------------publicKey ---------------------------------
        else if (callbackData == 'publicKey') {
            const user = yield User_1.default.findOne({ userId: chatId.toString() });
            bot.sendMessage(chatId, `Your Public Key is ${user === null || user === void 0 ? void 0 : user.publicKey}.`);
        }
        //--------------------------eject -------------------------------
        else if (callbackData == 'eject') {
            console.log("in ejection ");
            const confirmationMenu = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Yes', callback_data: 'confirmEject' }],
                        [{ text: 'No', callback_data: 'cancelEject' }]
                    ]
                }
            };
            bot.sendMessage(chatId, `Are you sure you want to eject your \n private key, this will delete your private key \n from our database and give here in chat.`, confirmationMenu);
        }
        //--------------------------balances  -------------------------------
        else if (callbackData == 'balances') {
            //smart contract interaction
        }
    }
    if (['confirmEject', 'cancelEject'].includes(callbackData)) {
        if (callbackData == 'confirmEject') {
            const user = yield User_1.default.findOne({ userId: chatId.toString() });
            const privateKeYY = (0, decrypt_1.default)(user === null || user === void 0 ? void 0 : user.privateKey);
            const wallet = new ethers_1.ethers.Wallet(privateKeYY);
            yield User_1.default.deleteOne({ userId: chatId.toString() });
            bot.sendMessage(chatId, `Your Private Key is ${wallet.privateKey}.`);
        }
        else {
            bot.sendMessage(chatId, `Ejection cancelled.`);
        }
    }
    if (['USDC_sell', 'USDT_sell', 'SHY_sell', 'PEPE_sell', 'BNB_sell', 'SHIB_sell', 'WBTC_sell'].includes(callbackData)) {
        const token = callbackData === null || callbackData === void 0 ? void 0 : callbackData.split('_')[0];
        console.log(token);
    }
    console.log(callbackData);
    bot.answerCallbackQuery(callbackQuery.id);
}));
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
