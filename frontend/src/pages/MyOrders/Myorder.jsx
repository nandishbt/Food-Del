import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Myorder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setdata] = useState([]);

  console.log(data);
  

  const getUserOrders = async () => {
    try {
      const res = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setdata(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserOrders();
    }
  }, [token]);

  return <div className="my-orders">

    <h2>My Orders</h2>

    <div className="container">

        {data.map((item,index)=>(
            <div key={index} className="each-order">

                <img src={assets.parcel_icon} alt="" />
                <p className="each-order-name">{item.items.map((eachfood,index)=>(
                    
                    <p key={index}>{eachfood.name} x {eachfood.quantity}, </p>
                ))}</p>

                <p>${item.amount}.00</p>

                <p>items: {item.items.length}</p>

                <p className="food-status"><span>&#x2022;</span> {item.status}</p>

                <button onClick={()=>getUserOrders()}>track order</button>
            </div>
        ))}

    </div>
    
    
    
    </div>;
};

export default Myorder;
