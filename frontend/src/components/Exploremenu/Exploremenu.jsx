import React, { useRef } from "react";
import "./Exploremenu.css";
import { menu_list } from "../../assets/assets";

const Exploremenu = ({ category, setCategory }) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (event) => {
    event.preventDefault();
    scrollContainerRef.current.scrollLeft += event.deltaY * 2; // Adjust scroll speed with multiplier
  };

  return (
    <div className="explore-menu" id="menu">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">
        Explore our menu and discover a variety of flavors, from savory starters
        to decadent desserts. Each dish is thoughtfully prepared, offering a
        perfect blend of taste and creativity.
      </p>

      <div
        className="menu-list"
        ref={scrollContainerRef}
        onWheel={handleScroll}
      >
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="menu-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Exploremenu;
