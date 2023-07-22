import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myOrder } from '../../actions/orderAction';
import Table from "./Table";
import "./MyOrder.css"
import {BsCartX} from "react-icons/bs"
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import MetaData from '../layout/MetaData';

const MyOrder = () => {

    const {loading , error , orders} = useSelector(state=>state.myOrder); 
    const dispatch = useDispatch();

   

    const nestedOrders = orders && orders.map(order => ({
            id:order._id,
            price:`₹ ${order.totalPrice}`,
            date: new Date(order.createdAt).toLocaleString('en-IN'),
            itemQty:order.orderItems.length,
            status:order.orderStatus,
            link:order._id
      }));


useEffect( ()=>{
    dispatch(myOrder());
    if(error)
    return toast.error( error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
},[dispatch, error])
    
  return (
    <>
    <MetaData  title={`Your Orders`}/>
  {loading ? (
    <Loader />
  ) : (
    <>
      {orders && nestedOrders.length > 0 ? (
        <div className="mainTable">
          <Table data={nestedOrders} />
        </div>
      ) : (
        <div className='noOrders'><BsCartX/>
        <span>No Orders Placed </span></div>
      )}
    </>
  )}
  <ToastContainer/>
</>
  )
}
export default MyOrder