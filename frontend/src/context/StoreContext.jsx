import React, { createContext } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextprovider = (props) => {

    const data = {food_list}

  return (
   <StoreContext.Provider value={data}>
    {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextprovider