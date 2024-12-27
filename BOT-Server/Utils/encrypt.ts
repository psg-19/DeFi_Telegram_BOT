
import dotenv from 'dotenv'

import crypto from 'crypto'

dotenv.config();


const encrypt =(data:string) :string=> {
    // console.log("in encrypt !!!!");
    // console.log(process.env.ALGORITHM);
    // console.log(process.env.ENCRYPTION_KEY);
    // console.log(process.env.ENCRYPTION_IV);

    if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
        throw new Error("Missing required environment variables");
      }

      const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
      const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');


        const cipher = crypto.createCipheriv(process.env.ALGORITHM!, keyBuffer, ivBuffer);
    
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
    return encrypted;
}

export default encrypt;