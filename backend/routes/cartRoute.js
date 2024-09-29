import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import verifyJWT from '../middlewares/auth.js';

const cartRouter = express.Router();


cartRouter.post('/add',verifyJWT,  addToCart)

cartRouter.post('/remove',verifyJWT,removeFromCart)

cartRouter.post('/list',verifyJWT,getCartItems)

export default cartRouter;