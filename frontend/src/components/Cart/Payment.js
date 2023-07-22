import React, { useEffect, useRef } from 'react'
import Steper from './Stepper';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from "@stripe/react-stripe-js"
import {SlCreditCard,SlKey ,SlCalender} from "react-icons/sl";
import "./Payment.css";
import MetaData from '../layout/MetaData';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors , createOrder } from '../../actions/orderAction';



const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const payBtn = useRef(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch= useDispatch();

    const {user} = useSelector(state=>state.user);
    const {shippingInfo,cartItems} = useSelector(state=>state.cart);
    const {error} = useSelector(state=>state.newOrder);

    

       const paymentData = {
        amount: Math.round(orderInfo.total*100),
      };

      const order = {
        shippingInfo:shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.total
      }

      

       const submitHandler = async (e) =>{
           e.preventDefault();
           payBtn.current.disabled=true;
        
           try {

              const config = {
                  headers:{
                    "Content-Type":"application/json"
                  },
                };

            const {data} = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config
            );

          const client_secret = data.client_secret;

          if(!stripe || !elements) return;

          const result = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
              card:elements.getElement(CardNumberElement),
              billing_details:{
                name:user.name,
                email:user.email,
                address:{
                  line1:shippingInfo.address.trim(),
                  city:shippingInfo.city.trim(),
                  state:shippingInfo.state.trim(),
                  country:shippingInfo.country.trim(),
                  postal_code:shippingInfo.pinCode.trim()
                },
              },
            },
          });
          if(result.error){
            payBtn.current.disabled=false;
           toast.error( result.error.message, {
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
          else {
            if(result.paymentIntent.status === 'succeeded'){
              order.paymentInfo = {
                id:result.paymentIntent.id.trim(),
                status:result.paymentIntent.status.trim()
              }
              dispatch(createOrder(order));
              navigate("/success");
            }
            else{
              toast.error("Some Error occured during PAYMENT", {
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
          }
          
        } 
        catch (error) {
          payBtn.current.disabled = false;
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
        

       }


  useEffect(()=>{
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
    dispatch(clearErrors());
  },[dispatch, error])

      
  return (
    <>
        <Steper step={3}/>
        <MetaData  title={`Payment`}/>
        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={submitHandler}>
                <h1>Card Info</h1>
                <div>
                    <SlCreditCard className='icon'/>
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <SlCalender className='icon'/>
                    <CardExpiryElement className='paymentInput'/>
                </div>
                <div>
                    <SlKey className='icon'/>
                    <CardCvcElement className='paymentInput'/>
                </div>
            <button
            type="submit"
            ref={payBtn}
            className="paymentFormBtn"
          >{`Pay - ₹${orderInfo && orderInfo.total}`}</button>
          </form>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Payment
