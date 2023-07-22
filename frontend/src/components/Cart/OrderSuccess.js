import React from 'react'
import {MdVerified} from 'react-icons/md'
import "./OrderSuccess.css";
import { useNavigate} from "react-router-dom"

const OrderSuccess = () => {
    const navigate = useNavigate();


  return (
    <div className='orderSuccess'>
    <MdVerified className='tick'/>
    <h1 className='orderHeading'>Order Placed SuccessFully!</h1>
    <button onClick={()=>navigate("/orders")}>View Orders</button>
    </div>
  )
}

export default OrderSuccess
