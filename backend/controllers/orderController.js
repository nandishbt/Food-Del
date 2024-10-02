import { userModel } from "../models/userModel.js";
import { orderModel } from "../models/orderModel.js";
import Stripe from "stripe";



const placeOrder = async (req, res) => {

  const stripe =  new Stripe(process.env.STRIPE_KEY)

 

  const frontendURL = 'http://localhost:5174'
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

const verifyOrder = async (req,res)=>{
  try {
    const {orderId,success} = req.body

    if(success === 'true'){
      const order = await orderModel.findByIdAndUpdate(orderId,
        {$set:{
          payment:true
        }},
        {new:true}
      )

      return res.json({ success: true, message: "Payment successful" });
    }

    else{
      const order = await orderModel.findByIdAndDelete(orderId)

      return res.json({ success: false, message: "Payment failed"})

    }

    
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}

const userOrder = async (req,res)=>{
  try {

    const {userId} = req.body

    const orders = await orderModel.find({userId:userId})

    return res.json({ success: true, message: "Order fetched successfully", orders:orders });

    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}

const allOrder = async (req,res) =>{
  try {

    const orders = await orderModel.find({})
    return res.json({ success: true, message: "All orders fetched successfully", data:orders });
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}

const updateStatus = async (req,res)=>{
  try {

    const{orderId,status} = req.body

    const order = await orderModel.findByIdAndUpdate(orderId,
      {$set:{
        status:status
      }},
      {new:true}
    )

    const updatedOrder = await orderModel.findById(order._id)

    if(!updatedOrder){
      return res.json({ success: false, message: "Failed to update order status" });
    }

    return res.json({ success: true, message: "Order status updated successfully", data:updatedOrder });
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}

export { placeOrder,verifyOrder,userOrder,allOrder ,updateStatus};
