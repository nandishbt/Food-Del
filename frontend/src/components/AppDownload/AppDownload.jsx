import React from 'react'
import './AppDownload.css'
import {assets} from './../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='mobile-app'>
        <p>For Better Experience Download <br /> Tomato app </p>
        <div className="download-app">
            <img src={assets.play_store} alt="" /><img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload