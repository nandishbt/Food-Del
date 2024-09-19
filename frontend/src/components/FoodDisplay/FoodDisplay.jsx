import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-items">
        {food_list
          .filter((item) =>
            category == "All" ? true : item.category == category
          )
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
