import React from 'react'
import Steper from './Stepper';
import {useSelector} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import "./ConfirmOrder.css";
import MetaData from '../layout/MetaData';

const ConfirmOrder = () => {
    const {shippingInfo , cartItems} = useSelector(state=>state.cart);
    const {user} = useSelector(state=>state.user);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc,item)=>
        acc + item.quantity * item.price,0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const total = subtotal + shippingCharges + tax;

    const address = `${shippingInfo.address}, ${shippingInfo.pinCode}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`

    const paymentHandler = () =>{
      const data = {
        subtotal,
        shippingCharges,
        tax,
        total,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
      navigate("/process/payment");
    }
  return (
    <>
        <Steper step={2}/>
        <MetaData title={`${user.name}'s Orders`}/>
        <div className='confirmOrderPage'>
          <div>
             <div className='confirmShippingArea'>
               <h1>Shipping Info</h1>
               <div className='confirmShippingBox'>
                   <div>
                      <p>Name:</p>
                      <span>{user.name}</span>
                    </div>

                     <div>
                      <p>Phone:</p>
                      <span>{shippingInfo.phoneNo}</span>
                    </div>

                     <div>
                      <p>Address:</p>
                      <span>{address}</span>
                    </div>
                </div>
              </div>

              <div className='confirmCartItems'>
               <h1>Your Items</h1>
               <div className='confirmCartItemsContainer'>
                 {cartItems && cartItems.map((item)=>(
                    <div key={item.product}>
                     <img src={item.image} alt='Product'/>
                     <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                     <span>
                        {item.quantity} X ₹{item.price} = {" "}
                        <b>₹{item.quantity * item.price}</b>
                     </span>
                    </div>
                 ))}
               </div>
              </div>
            </div>
        {/*   */}
        <div>
        <div className='orderSummary'>
        <h1>Order Summary</h1>
        <div>
            <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
            </div>
            <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
            </div>
            <div>
                <p>GST:</p>
                <span>₹{tax}</span>
            </div>
        </div>

        <div className='orderSummaryTotal'>
            <p><b>Total:</b></p>
            <span>₹{total}</span>
        </div>

        <button onClick={paymentHandler}>Proceed To Payment</button>

        </div>

        </div>
        </div>

    </>
  )
}

export default ConfirmOrder
