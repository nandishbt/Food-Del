import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />

      <ul className="navbar-menu">
        {["home", "menu", "mobile-app", "contact-us"].map((e, i) => (
          <a href={`#${e}`}
            key={e}
            onClick={() => setMenu(e)}
            className={menu === e ? "active" : ""}
          >
            {e}
          </a>
        ))}
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="basket">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
