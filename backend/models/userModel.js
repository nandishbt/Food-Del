import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartItems:{
        type:Object,
        default: {}
    }
},{minimize:false})


export const userModel = mongoose.model('User',userSchema)