import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './LoginPopUp.css'

const LoginPopUp = ({setLogin}) => {
    const [currState, setCurrState ] = useState('Login')

  return (
    <div className="login">
    <div className='login-container'>

        <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />

        </div>

        <div className="login-form">
            {currState === 'Sign Up' && <input type="text" placeholder='Your name' required /> }

            <input type="email" placeholder='Your email' required />
            <input type="password" placeholder='Your password' required />
        </div>

        <button>{currState === 'Sign Up' ? "Create account" : "Login"}</button>

        <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing I agree to terms of use and privacy policy</p>
        </div>

        {currState === 'Sign Up' ? 
        <p> Already have a Account <span onClick={()=>setCurrState('Login')}>click here</span></p>:
        <p>Dont have a account <span onClick={()=>setCurrState('Sign Up')}>Create account</span></p>}





    </div>
    </div>
  )
}

export default LoginPopUp