import express from 'express';
import verifyJWT from '../middlewares/auth.js';
import { placeOrder, userOrder, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',verifyJWT,placeOrder)

orderRouter.post('/verify',verifyOrder)

orderRouter.post('/userorders',verifyJWT,userOrder)


export default orderRouter;