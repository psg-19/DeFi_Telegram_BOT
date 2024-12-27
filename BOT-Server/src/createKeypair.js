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
const ethers_1 = require("ethers");
const User_1 = __importDefault(require("../Models/User"));
const encrypt_1 = __importDefault(require("../Utils/encrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createKeypair = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_1.default.findOne({ userId: userId });
    if (existingUser) {
        return "Welcome To DeFi BOT";
    }
    const wallet = ethers_1.ethers.Wallet.createRandom();
    // console.log(wallet.privateKey)
    // const encrypted_privateKey=bcrypt.hash(wallet.privateKey,process.env.SALT!);
    // console.log(wallet.privateKey)
    //    console.log("-----------------------");
    //    console.log(process.env.ALGORITHM)
    //    console.log("-----------------------");
    const encrypted = (0, encrypt_1.default)(wallet.privateKey);
    //    if(!encrypted){
    //        console.log("khali string")
    //     }
    console.log("-----------------------");
    // console.log(typeof(encrypted))
    console.log("-----------------------");
    // console.log(decrypt(encrypted));
    const newUser = new User_1.default({
        userId: userId,
        privateKey: encrypted,
        publicKey: wallet.address
    });
    try {
        yield newUser.save();
    }
    catch (error) {
        console.log("create keypair mei use creation fata hai !!!!");
        console.log(error);
    }
    return "user created";
});
exports.default = createKeypair;
