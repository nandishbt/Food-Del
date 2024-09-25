import express from 'express';
import cors from 'cors';
import { mongoDb } from './config/db.js';
import dotenv from 'dotenv'
import foodRouter from './routes/foodRoute.js';

dotenv.config();

//config
const app = express();
const port = 8000;

//middleware
app.use(cors());
app.use(express.json());

//database
mongoDb()

//api endpoints
app.use('/api/food',foodRouter)



app.get('/',(req,res)=>{
    res.send('Hello World!');
})


app.listen(port,(req,res)=>{
    console.log(`app listening on port ${port}`);
    
})
