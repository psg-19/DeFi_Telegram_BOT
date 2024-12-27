import { ethers } from "ethers";
import User from '../Models/User'
import encrypt from "../Utils/encrypt";
import decrypt from "../Utils/decrypt";
import dotenv from 'dotenv'
dotenv.config();

const createKeypair = async (userId: string): Promise<string> => {


    const existingUser=await User.findOne({userId:userId});

    if(existingUser){
      return  "Welcome To DeFi BOT";
    }


    const wallet = ethers.Wallet.createRandom();
// console.log(wallet.privateKey)
    // const encrypted_privateKey=bcrypt.hash(wallet.privateKey,process.env.SALT!);
// console.log(wallet.privateKey)
//    console.log("-----------------------");
//    console.log(process.env.ALGORITHM)
//    console.log("-----------------------");
   
   const encrypted:string=encrypt(wallet.privateKey);
//    if(!encrypted){
//        console.log("khali string")
//     }

    
    console.log("-----------------------");

    // console.log(typeof(encrypted))


    console.log("-----------------------");

    // console.log(decrypt(encrypted));

 const newUser = new User({
        userId:userId,
        privateKey:encrypted,
        publicKey:wallet.address
      });


try {
    
    await newUser.save();
   
} catch (error) {
    console.log("create keypair mei use creation fata hai !!!!");
    console.log(error)
}


return "user created"


}
export default createKeypair;