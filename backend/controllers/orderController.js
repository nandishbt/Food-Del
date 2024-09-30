import { userModel } from "../models/userModel.js";
import { orderModel } from "../models/orderModel.js";
import Stripe from "stripe";

const stripe =  new Stripe(process.env.STRIPE_KEY)

const placeOrder = async (req, res) => {

 

  const frontendURL = 'http://localhost:5173'
  try {

    
    const { userId, items, amount, address } = req.body;

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
    });

    const Myorder = await orderModel.findById(order._id);

    if (!Myorder) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to place order" });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          cartItems: {},
        },
      },
      { new: true }
    );

   

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100  * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });


    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode:'payment',
        success_url : `${frontendURL}/verify?success=true&orderId=${Myorder._id}`,
        cancel_url : `${frontendURL}/verify?success=false&orderId=${Myorder._id}`

    })

    return res.json({ success: true, message: "Order placed successfully", sessionURL:session.url });




  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { placeOrder };
