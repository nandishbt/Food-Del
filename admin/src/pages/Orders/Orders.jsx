import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import {assets} from  '../../assets/assets'
import { toast } from "react-toastify";

const Orders = ({url}) => {

  const [data,setdata] = useState([])

  const fetchOrders = async ()=>{
    try {

      const res = await axios.get(url+'/api/order/allorders')

      setdata(res.data.data)

      
      
      
    } catch (error) {
      
    }
  }

  const updateStatus = async (e,orderId)=>{

    try {

      const res = await axios.post(url+'/api/order/status',{orderId,status:e.target.value})

     if(res.data.success){
      toast.success(res.data.message)
      
     }

     else{
       toast.error(res.data.message)
     }
     
      
      
    } catch (error) {
      console.log(error);
      
      
    }

   
    
    

  }


  useEffect(()=>{
    fetchOrders()
  })

  return (
    <div className='admin-orders'>

      <h2>Orders</h2>

      <div className="admin-container">
        {data.map((order,index)=>(
          <div key={index} className='eachorder'>
            <img src={assets.parcel_icon} alt="" />
            
            <div>
            {order.items.map((item,index)=>{
              return <p key={index}>{item.name} X {item.quantity}</p>
            })}
            </div>
            <div className='address-details'>

            <p className='customer-name'>{order.address.first_name + " " + order.address.last_name}</p>

            <div>
              <p>{order.address.street}</p>
              <p>{order.address.city+", "+ order.address.state+", "+ order.address.country + ", " + order.address.zip_code}</p>
            </div>

            <p>{order.address.phone_number}</p>
            </div>

            <p>item: {order.items.length}</p>

            <p>${order.amount}</p>

            <select onChange={(e)=>updateStatus(e,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              
            </select>

           

          </div>
        ))}
      </div>


    </div>
  )
}

export default Orders