import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const dbConnect = async (): Promise<void> => {
    try {
     
      const mongoUri = process.env.MONGO_DB;
      if (!mongoUri) {
        throw new Error('MONGO_DB environment variable is not set');
      }
  
       
      await mongoose.connect(mongoUri);
  
      console.log('Database connection successful');
    } catch (error) {
     
      console.error('Database connection error ---> ', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  };
  
  
  export default dbConnect;