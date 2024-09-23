import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from './../../context/StoreContext'

const Cart = () => {
  const {food_list,removeFromCart, cartItems} = useContext(StoreContext)
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



    </div>
  )
}

export default Cart