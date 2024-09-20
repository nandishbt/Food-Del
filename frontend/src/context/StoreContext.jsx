import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextprovider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const addToCart = (item)=>{
    if(!cartItems[item]){
      setcartItems({...cartItems, [item]:1})
    }

    else{
      setcartItems({...cartItems,[item]:cartItems[item]+1})
    }
  }

  const removeFromCart = (item)=>{
    setcartItems({...cartItems,[item]:cartItems[item]-1})
  }

  useEffect(()=>{
    console.log(cartItems);
    
  },[cartItems])

  const data = { food_list,
    cartItems,
    addToCart,
    removeFromCart
   };

  return (
    <StoreContext.Provider value={data}>{props.children}</StoreContext.Provider>
  );
};

export default StoreContextprovider;
