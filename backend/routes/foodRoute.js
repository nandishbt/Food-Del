import express from 'express';
import { addFood,listFood, removeFood,editFood } from '../controllers/foodController.js';
import { upload } from '../middlewares/multer.js';

const foodRouter = express.Router()

foodRouter.post('/add', upload.single('image'), addFood)

foodRouter.get('/list',listFood)

foodRouter.delete('/remove/:id',removeFood)


foodRouter.put('/edit/:id',upload.single('image'),editFood)





export default foodRouter;