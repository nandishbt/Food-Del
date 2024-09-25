import { foodModel } from "../models/foodModel.js";
import fs from "fs";

//add the food

const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  //check if the food already exists with the same name
  const foodExists = await foodModel.findOne({ name });

  if (foodExists) {
    fs.unlinkSync(`./uploads/${req.file.filename}`);
    return res
      .status(400)
      .json({ msg: "Food with the same name already exists" });
  }

  const image_url = req.file && req.file.filename;

  const foodItem = await foodModel.create({
    name,
    description,
    price,
    category,
    image: image_url || "",
  });

  if (!foodItem)
    return res.status(400).json({ msg: "Failed to create food item" });

  return res
    .status(200)
    .json({ msg: "food item created successfully", data: foodItem });
};

export { addFood };
