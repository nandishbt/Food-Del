import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopUp.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopUp = ({ setLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const { url, setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const res = await axios.post(newUrl, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setLogin(false);
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <form onSubmit={submitHandler} className="login-form">
          {currState === "Sign Up" && (
            <input
              onChange={onChangeHandler}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={onChangeHandler}
            name="password"
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing I agree to terms of use and privacy policy</p>
          </div>
        </form>

        {currState === "Sign Up" ? (
          <p>
            {" "}
            Already have a Account{" "}
            <span onClick={() => setCurrState("Login")}>click here</span>
          </p>
        ) : (
          <p>
            Dont have a account{" "}
            <span onClick={() => setCurrState("Sign Up")}>Create account</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopUp;
