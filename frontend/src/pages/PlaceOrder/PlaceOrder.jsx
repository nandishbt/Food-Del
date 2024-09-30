import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
  });

  const { getTotalAmount, url, token, cartItems, food_list } =
    useContext(StoreContext);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const items = [];

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let foodItem = await food_list.find((item) => item._id == itemId);

        foodItem.quantity = cartItems[itemId]

        items.push({
          ...foodItem
          
        });
      }
    }

    const orderdata = {
      items,
      amount: getTotalAmount() + 2,
      address: data,
    };

    try {
      const res = await axios.post(`${url}/api/order/place`, orderdata, {
        headers: { token ,
          Authorization: 'Bearer pk_test_51Q4duvFLkbXavIevsF2rU26kiJx4KEhvm0OiVGq2nYK9Bny1OIyuF5WCwi9V9kxNrE8TamG8PjKFsC6XUNNQYNdM00I37HZAVf' 
        },

      });
      console.log(res);

      if (res.data.success) {
        setData({
          first_name: "",
          last_name: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
          phone_number: "",
        });
        const { sessionURL } = res.data;
        window.location.replace(sessionURL);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="order">
      <div className="order-left">
        <p>Enter your Delivery Information</p>

        <div className="order-left-multi">
          <input
            onChange={onchangeHandler}
            name="first_name"
            value={data.first_name}
            type="text"
            placeholder="first name"
            required

          />
          <input
            onChange={onchangeHandler}
            name="last_name"
            value={data.last_name}
            type="text"
            placeholder="lastname"
            required
          />
        </div>

        <input
          onChange={onchangeHandler}
          type="email"
          name="email"
          value={data.email}
          placeholder="email adress"
          required
        />
        <input
          onChange={onchangeHandler}
          name="street"
          value={data.street}
          type="text"
          placeholder="street"
          required
        />
        <div className="order-left-multi">
          <input
            onChange={onchangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="city"
            required
          />
          <input
            onChange={onchangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="state"
            required
          />
        </div>

        <div className="order-left-multi">
          <input
            onChange={onchangeHandler}
            value={data.zip_code}
            name="zip_code"
            type="text"
            placeholder="Zip-code"
            required
          />
          <input
            onChange={onchangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="country"
            required
          />
        </div>

        <input
          onChange={onchangeHandler}
          type="text"
          value={data.phone_number}
          name="phone_number"
          placeholder="phone nummber"
          required
        />
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

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
