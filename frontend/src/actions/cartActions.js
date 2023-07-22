import {ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import axios from "axios";


//Add To Cart
export const addToCart = (id,quantity) => async(dispatch , getState)=>{
    try {
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: ADD_TO_CART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.stock,
                quantity
            }
        })
        const cartItems=getState().cart.cartItems;
    
        localStorage.setItem("cartItems",JSON.stringify(cartItems)); 
    } catch (error) {
        console.log(error)
    }
}

//Remove From Cart
export const removeCart = (id) => async(dispatch , getState)=>{
    dispatch({
        type:REMOVE_FROM_CART,
        payload:id
    })

    const cartItems=getState().cart.cartItems;
    localStorage.setItem("cartItems",JSON.stringify(cartItems));

}

export const saveShippingInfo = (data) => async(dispatch)=>{
dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data
});

localStorage.setItem("shippingInfo",JSON.stringify(data));

}