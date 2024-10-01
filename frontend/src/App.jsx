import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import Myorder from './pages/MyOrders/Myorder'

const App = () => {
  const [Login , setLogin] = useState(false)
  return (
    <>
    {Login?<LoginPopUp  setLogin = {setLogin}/>:<></>}
    <div className='app'>
      <Navbar  setLogin = {setLogin}/>
      <ToastContainer />

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/placeorder' element={<PlaceOrder />} />
        <Route exact path='/verify' element={<Verify />} />
        <Route exact path='/myorders' element={<Myorder />} />
        
      </Routes>

    </div>
    <Footer />
    </>
  )
}

export default App