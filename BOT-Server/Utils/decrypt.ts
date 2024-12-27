import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config();


const decrypt = (encryptedData: string): string => {
    // console.log("in decrypt")
    // console.log(process.env.ALGORITHM);
    // console.log(process.env.ENCRYPTION_KEY);
    // console.log(process.env.ENCRYPTION_IV);

    if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.ENCRYPTION_IV) {
        throw new Error("Missing required environment variables");
      }

      const keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
      const ivBuffer = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

    const decipher = crypto.createDecipheriv(process.env.ALGORITHM!, keyBuffer, ivBuffer);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };

  export default decrypt;