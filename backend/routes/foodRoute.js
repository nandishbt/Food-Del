import express from 'express';
import { addFood } from '../controllers/foodController.js';
import { upload } from '../middlewares/multer.js';

const foodRouter = express.Router()

foodRouter.post('/add', upload.single('image'), addFood)

export default foodRouter;