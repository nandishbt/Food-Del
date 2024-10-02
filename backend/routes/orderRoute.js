import express from 'express';
import verifyJWT from '../middlewares/auth.js';
import { allOrder, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',verifyJWT,placeOrder)

orderRouter.post('/verify',verifyOrder)

orderRouter.post('/userorders',verifyJWT,userOrder)

orderRouter.get('/allorders',allOrder)

orderRouter.post('/status',updateStatus)




export default orderRouter;