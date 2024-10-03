import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextprovider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const [token,setToken] = useState("")

  const [food_list,setFood_list] = useState([])

  const url = 'https://food-del-4rjl.onrender.com/'

  const addToCart = async (item) => {
    if (!cartItems[item]) {
      setcartItems({ ...cartItems, [item]: 1 });
    } else {
      setcartItems({ ...cartItems, [item]: cartItems[item] + 1 });
    }

    if(token){
      const res = await axios.post(`${url}/api/cart/add`,{itemId:item},{headers:{token}})
  }


  };

  const removeFromCart = async (item) => {

    if(cartItems[item]>0){
    setcartItems({ ...cartItems, [item]: cartItems[item] - 1 });
    }

    if(token){
      const res = await axios.post(`${url}/api/cart/remove`,{itemId:item},{headers:{token}})
  }
  };

  const getCartItems = async (token)=>{
      try {

        const res = await axios.post(`${url}/api/cart/list`,{},{headers:{token}})

        setcartItems(res.data.data)
        
      } catch (error) {
        console.log(error);
        
        
      }
   
  }

  const getTotalAmount = () => {
    let total = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const item_info = food_list.find((p) => p._id === item);
        total += item_info.price * cartItems[item];
      }
    }

    return total;
  };

  const FetchFoodList = async () =>{

    try {
      const res = await axios.get(`${url}/api/food/list`)
      setFood_list(res.data.data)
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

  useEffect(()=>{

    async function loaderFun(){
      await FetchFoodList()
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        await getCartItems(localStorage.getItem('token'))

      }
      

    }

    loaderFun()
    

    
  
   
  
    
  },[])

  const data = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={data}>{props.children}</StoreContext.Provider>
  );
};

export default StoreContextprovider;
