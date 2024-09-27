import { foodModel } from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  //check if the food already exists with the same name
  const foodExists = await foodModel.findOne({ name });

  if (foodExists) {
   req.file &&  fs.unlinkSync(`./uploads/${req.file.filename}`);
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
    .json({ msg: "food item added successfully", data: foodItem });
};

const listFood = async (req, res) => {
  const foodList = await foodModel.find({});

  if (!foodList) {
    return res.status(400).json({ msg: "Failed to fetch food list" });
  }

  return res
    .status(200)
    .json({ msg: "Food list fetched successfully", data: foodList });
};

const removeFood = async (req, res) => {
  const foodItem = await foodModel.findById(req.params.id);

  if (!foodItem) {
    return res.status(400).json({ msg: "Food item not found" });
  }

  if (foodItem.image) {
    fs.unlinkSync(`./uploads/${foodItem.image}`);
  }

  await foodModel.findByIdAndDelete(foodItem._id);

  return res.status(200).json({ msg: "Food item removed successfully" });
};

const editFood = async (req, res) => {
  try {
    const { id } = req.params;

    const newImage = req.file && req.file.filename;

    const foodItem = await foodModel.findById(id);

    if (!foodItem) {
     newImage && fs.unlinkSync(`./uploads/${newImage}`);
      return res.status(400).json({ msg: "Food item not found" });
    }

    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      newImage && fs.unlinkSync(`./uploads/${newImage}`);
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (foodItem.image) {
      fs.unlinkSync(`./uploads/${foodItem.image}`);
    }

    const updatedFoodItem = await foodModel.findByIdAndUpdate(id, {
      $set: {
        image: newImage || "",
        name,
        description,
        category,
        price,
      },
    });

    const newItem = await foodModel.findById(updatedFoodItem._id);

    if (!newItem) {
      return res.status(400).json({ msg: "Failed to update food item" });
    }

    return res
      .status(200)
      .json({ msg: "Food item updated successfully", data: newItem });
  } catch (error) {
    req.file && fs.unlinkSync(`uploads/${req.file.filename}`);
    return res.status(500).json({ msg: "Server error" });
  }
};

export { addFood, listFood, removeFood, editFood };
