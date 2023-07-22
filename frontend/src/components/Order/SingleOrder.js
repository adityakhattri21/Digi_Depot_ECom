import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singleOrder } from '../../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import "./SingleOrder.css";

const SingleOrder = () => {
    const dispatch = useDispatch();
    const {loading,order,error} = useSelector(state=>state.singleOrder);
    let {id} = useParams();
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
        
    },[dispatch,id])
  return (
    <>
    <MetaData title={`Order ${id}`}/>
    {
        loading? <Loader/>:( order &&
            <>
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
                {order && order.orderStatus === 'Delivered'?<p><span>At:</span>{order.deliveredAt.substr(0,10)}</p>:<></>}
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
            <ToastContainer/>
            </>
           
        )
    }
    
    </>
  )
}

export default SingleOrder
