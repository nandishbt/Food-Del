import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            quam, mollitia accusamus quibusdam, labore inventore placeat sit
            explicabo, asperiores illo ad dolor magnam facere nulla! Ab nam
            consequuntur ut voluptas.
          </p>
          <div className="social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">

        <h2>CONTACT US</h2>
            <ul>
                <li>+1-222-333-4444</li>
                <li>conract@contact.com</li>
                
            </ul>

        </div>
      </div>
      <hr />
    <p>copyright 2024 © NandishBT - All Rights Reserved </p>
    </div>
  );
};

export default Footer;
