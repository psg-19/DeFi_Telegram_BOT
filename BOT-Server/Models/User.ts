import mongoose from "mongoose";
 
const UserSchema=new mongoose.Schema({
    
    userId:{
        type:String,
        required:true,
        trim:true
    },
    privateKey:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    },




})



export default mongoose.model("User",UserSchema) ;