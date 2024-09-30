import express from 'express';
import verifyJWT from '../middlewares/auth.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',verifyJWT,placeOrder)


export default orderRouter;