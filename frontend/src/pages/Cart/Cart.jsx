import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from './../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {food_list,removeFromCart, cartItems, getTotalAmount} = useContext(StoreContext)

  const navigate = useNavigate()
  return (
    <div className='cart'>

      <div className="cart-items-title heading">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      <div className="cart-items-item">

        {food_list.map((item,index)=>
        {
          if(cartItems[item._id]>0){
           return ( 
           <div className="div">
           <div className="items  cart-items-title ">
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{cartItems[item._id]}</p>
            <p>${item.price * cartItems[item._id]}</p>
            <p className='x' onClick={()=>removeFromCart(item._id)}>x</p>
            
            </div>
            <hr />
            </div>
            
          )
          }
        
})}

      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Total</h2>
          <div>
            <div className="cart-total-bill">
              <p>Sub Total</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-bill">
              <p>Delivery fee</p>
              <p>${getTotalAmount() && 2}</p>
            </div>
            <hr />
            <div className="cart-total-bill">
              <p>Total</p>
              <p>${getTotalAmount() && getTotalAmount() + 2}</p>
            </div>
            <hr />
          </div>

          <button onClick={()=>getTotalAmount()>0 ? navigate('/placeorder'):alert('please add food items')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="promocode">
          <div className='promo'>
            <input type="text" placeholder="Enter your promo code" />
            <button>APPLY</button>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Cart