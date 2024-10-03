import express from 'express';
import cors from 'cors';
import { mongoDb } from './config/db.js';
import dotenv from 'dotenv'
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

//config
const app = express();
const port =  process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

//database
mongoDb()

//api endpoints
app.use('/api/food',foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.get('/',(req,res)=>{
    res.send('Hello World!');
})


app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`);
    
})
