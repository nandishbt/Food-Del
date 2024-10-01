import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'


const Verify = () => {

    const {url} = useContext(StoreContext)

    const navigate = useNavigate()

    const [searchParams,setsearchparams] = useSearchParams()

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const updatepayment = async()=>{
        try {

            const res = await axios.post(`${url}/api/order/verify`,{success,orderId})

            if(res.data.success){

                navigate('/myorders')
                
            }

            else{
                navigate('/')
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        updatepayment()
    })
    
   
    
  return (
    <div className='verify'>

        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify