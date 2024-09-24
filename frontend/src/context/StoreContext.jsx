import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextprovider = (props) => {
  const [cartItems, setcartItems] = useState({});

  const addToCart = (item) => {
    if (!cartItems[item]) {
      setcartItems({ ...cartItems, [item]: 1 });
    } else {
      setcartItems({ ...cartItems, [item]: cartItems[item] + 1 });
    }
  };

  const removeFromCart = (item) => {
    setcartItems({ ...cartItems, [item]: cartItems[item] - 1 });
  };

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

  const data = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
  };

  return (
    <StoreContext.Provider value={data}>{props.children}</StoreContext.Provider>
  );
};

export default StoreContextprovider;
