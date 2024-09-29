import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate()

  const logOut = ()=>{
    setToken("")
    setLogin(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        {["home", "menu", "mobile-app", "contact-us"].map((e, i) => (
          <a
            href={e === "home" ? "/" : `#${e}`}
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
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalAmount() ? "dot" : ""}></div>
        </div>

        {token ? (
          <div className="profile">
            <img  src={assets.profile_icon} alt="" />

            <ul className="dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p> </li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
            </ul>

          </div>
        ) : (
          <button onClick={() => setLogin(true)}>sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
