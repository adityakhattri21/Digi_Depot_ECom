import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singleOrder, updateOrders } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { MdCategory } from 'react-icons/md';
import { Button } from '@chakra-ui/react';
import './ProcessOrder.css';
import {TbTruckDelivery} from "react-icons/tb"
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const {loading,order,error} = useSelector(state=>state.singleOrder);
    const {isUpdated , error:updateError} = useSelector(state=>state.orderAction);
    let {id} = useParams();
    const [status, setStatus] = useState("");

    const updateOrderSubmitHandler = (e) =>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.set('status',status);
      dispatch(updateOrders(myForm,id));
    }



    useEffect(()=>{
        dispatch(singleOrder(id))
        if(error){
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
        }
        if(isUpdated){
          dispatch({type:UPDATE_ORDER_RESET})
          toast.success("Status Updated", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }

        if(updateError){
          toast.error(updateError, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
        
    },[dispatch, error, id, isUpdated, updateError])
  return (
    <div className='processing'>
    <MetaData title={`Order ${id}`}/>
    {
        loading? <Loader/>:( order &&
            <>
            <div className='dashboard'>
            <Sidebar/>

            <div className='processPage'>
            <div className='shippingInfo'>
            <div className='topDiv'>
            <div className='topHeading'>
            <h1>Order #{`${id}`}</h1>
            </div>
            <div className='topData'>
            <div className='innerDivLeft'>
                <h2>Shipping Info</h2>
                <p><span>Name:</span>{order.user && order.user.name}</p>
                <p><span>Phone:</span>{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                <p><span>Address:</span>{order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
            </div>
            <div className='innerDivMiddle'>
                <h2>Payment Info</h2>
                <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                  <p><span>Amount:</span>{order.totalPrice && order.totalPrice}</p>
            </div>

            <div className='innerDivRight'>
                <h2>Order Status</h2>
                <p className={
                    order.orderStatus === "Delivered" ? 'greenColor':'redColor'
                }>{order.orderStatus && order.orderStatus}</p>
            </div>  
            </div>
            </div>



            <div className='lowerDiv'>
            <h2 className='lowerHeading'>Order Items</h2>
            <div>
            {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className='orderItem'>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
            </div>
            </div>
            </div>


            <div className='processShipping'>
            {order.orderStatus === "Delivered"?<div className='delivered'>
                <TbTruckDelivery/>
                <h1>Order Delivered</h1>
                <h2><span>At:</span>{order && order.deliveredAt.substr(0,10)}</h2>
            </div>:<>
            <form  onSubmit={updateOrderSubmitHandler}  className='processForm'>
       <h1>Process Product</h1>
        <div className='createFormDiv'>
        <MdCategory/>
        <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
        </div>
        
            <Button
              id="updateOrderBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Process
            </Button>
       </form>
            </>}
            
            </div>
            </div>
            
            </div>
            
            <ToastContainer/>
            </>
           
        )
    }
    
    </div>
  )
}

export default ProcessOrder
