import { userModel } from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item id is required" });
    }
    let user = await userModel.findById(userId);

    let cartData = await user.cartItems;

    if (!cartData[itemId]) {
      cartData = { ...cartData, [itemId]: 1 };
    } else {
      cartData = { ...cartData, [itemId]: cartData[itemId] + 1 };
    }

    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      cartItems: { ...cartData },
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found while updating" });
    }

    const newUser = await userModel.findById(updatedUser._id);

    return res.json({
      success: true,
      message: "Item added to cart successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item id is required" });
    }
    let user = await userModel.findById(userId);

    let cartData = await user.cartItems;

    if (cartData[itemId] > 0) {
      cartData = { ...cartData, [itemId]: cartData[itemId] - 1 };
    }

    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }

    const updatedUser = await userModel.findByIdAndUpdate(user._id, {
      cartItems: { ...cartData },
    });

    const newUser = await userModel.findById(updatedUser._id);

    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found while updating" });
    }

    return res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: newUser,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getCartItems = async (req,res) => {
    try {

        const {userId} = req.body

        const user = await userModel.findById(userId)

        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' })
        }

        let cartData = await user.cartItems

        

        return res.json({success:true,message:"cart data is available", data:cartData})

        
        
    } catch (error) {
        return res.json({ success: false, message: error.message });
        
    }
};

export { addToCart, removeFromCart, getCartItems };
