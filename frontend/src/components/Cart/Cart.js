import React from 'react';
import "./Cart.css";
import CartItemCard from './CartItemCard';
import {useDispatch , useSelector} from 'react-redux'
import { addToCart, removeCart } from "../../actions/cartActions"
import {MdOutlineRemoveShoppingCart} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Metadata from "../layout/MetaData"

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart);

  const increaseItemHandler = (id,quantity,stock)=>{
    const newQty = quantity + 1;
    if(stock<=quantity){
      return ;
    }
    dispatch(addToCart(id,newQty));
  }

  const decreaseItemHandler = (id,quantity)=>{
    const newQty = quantity - 1;
    if(quantity<=1){
      return;
    }
    dispatch(addToCart(id,newQty));
  }

  const deleteCartItems = (id) =>{
    dispatch(removeCart(id));
  }

  const checkOutHandler = () =>{
    navigate("/login?redirect=shipping");
  }


  return (
    <>
    <Metadata title={`Your Cart`}/>
      {cartItems.length === 0 ? (    <>
      <div className='emptyCart'>
      <MdOutlineRemoveShoppingCart className='emptyIcon'/>
      <p className='emptyHeading'>Cart Empty !</p>
      <button onClick={()=>navigate("/products")}>View Products</button>
      </div>
    </>):
    (
      <><div className='mainCart'>
    <div className='cartMain'>
     <h1>Your Cart</h1>
   <div className='cartHeader'>
       <p>Product</p>
        <p>Quantity</p>
        <p>SubTotal</p>
   </div>
   {cartItems && cartItems.map((item)=>(
     <div className='cartContainer'>
       <CartItemCard item={item} deleteCartItem={deleteCartItems}/>
       <div className="cartInput">
                   <button onClick={()=>decreaseItemHandler(item.product,item.quantity)}>
                     -
                   </button>
                   <input type="number" value={item.quantity} readOnly />
                   <button onClick={()=>increaseItemHandler(item.product,item.quantity,item.stock)}>
                     +
                   </button>
                 </div>
                 <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
   </div>
   
   ))}
   </div>

   <div className='cartGrossProfit'>
     <div></div>
     <div className='cartGrossProfitBox'>
       <p>Gross Total</p>
       <p>{`₹${cartItems.reduce(
        (acc,item)=> acc+ item.quantity * item.price,0
       )}`}</p>
     </div>
     <div></div>
     <div className='checkOutButton'>
       <button onClick={checkOutHandler}>Check-Out</button>
     </div>
   </div>
   </div></> 
    )
    }
    </>


   
  )
}

export default Cart;
