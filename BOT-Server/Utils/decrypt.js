"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const decrypt = (encryptedData) => {
    // console.log("in decrypt")
    // console.log(process.env.ALGORITHM);
    // console.log(process.env.ENCRYPTION_KEY);
    // console.log(process.env.ENCRYPTION_IV);
    if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
        throw new Error("Missing required environment variables");
    }
    const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
    const decipher = crypto_1.default.createDecipheriv(process.env.ALGORITHM, keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.default = decrypt;
