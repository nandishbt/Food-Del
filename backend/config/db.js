import mongoose from "mongoose";

export const mongoDb =  async () =>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('mongodb connected successfully'))
    .catch((err)=>console.log('mongodb connection error',err))
    
}
