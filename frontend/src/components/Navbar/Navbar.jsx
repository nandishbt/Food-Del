import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({setLogin}) => {
  const [menu, setMenu] = useState("home");
  const {getTotalAmount} = useContext(StoreContext)
  return (
    <div className="navbar">
      <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className="navbar-menu">
        {["home", "menu", "mobile-app", "contact-us"].map((e, i) => (
          <a href={e==='home'?'/':`#${e}`}
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
         <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link> 
          <div className={getTotalAmount()?"dot":""}></div>
        </div>
        <button onClick={()=>setLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
