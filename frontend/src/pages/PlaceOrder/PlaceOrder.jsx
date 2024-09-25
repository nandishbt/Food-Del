import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalAmount} = useContext(StoreContext)
  return (
    <form className='order'>
      <div className="order-left">
        <p>Enter your Delivery Information</p>

        <div className="order-left-multi">
          <input type="text"placeholder='first name' />
          <input type="text" placeholder='lastname'/>
        </div>

        <input type="email" placeholder='email adress' />
        <input type="text" placeholder='street' />
        <div className="order-left-multi">
          <input type="text"placeholder='city' />
          <input type="text" placeholder='state'/>
        </div>

        <div className="order-left-multi">
          <input type="text"placeholder='Zip-code' />
          <input type="text" placeholder='country'/>
        </div>
        
        <input type="text" placeholder='phone nummber' />
      </div>
      <div className="order-right">
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

          <button >PROCEED TO PAYMENT</button>
        </div>


      </div>
    </form>
  )
}

export default PlaceOrder