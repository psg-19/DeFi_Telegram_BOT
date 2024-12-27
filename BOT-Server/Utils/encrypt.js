"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const encrypt = (data) => {
    // console.log("in encrypt !!!!");
    // console.log(process.env.ALGORITHM);
    // console.log(process.env.ENCRYPTION_KEY);
    // console.log(process.env.ENCRYPTION_IV);
    if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
        throw new Error("Missing required environment variables");
    }
    const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
    const cipher = crypto_1.default.createCipheriv(process.env.ALGORITHM, keyBuffer, ivBuffer);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
exports.default = encrypt;
