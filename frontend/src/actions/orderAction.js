import {CREATE_ORDER_FAILURE,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CLEAR_ERRORS, MY_ORDER_FAILURE, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ID_ORDER_REQUEST, ID_ORDER_SUCCESS, ID_ORDER_FAILURE, ADMIN_ORDER_FAILURE, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_DELETE_FAILURE, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_SUCCESS, UPDATE_ORDER_FAILURE, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS} from "../constants/orderConstants";
import axios from "axios";

//Creating a new order
export const createOrder = (order) =>async(dispatch)=>{
    try {
        dispatch({type:CREATE_ORDER_REQUEST});
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post("/api/v1/order/new",order,config);

        dispatch({type:CREATE_ORDER_SUCCESS, payload:data})

    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAILURE,
            payload:error.response.data.message
        })
    }
}


//My Orders
export const myOrder = () => async(dispatch)=>{
    try {
        dispatch({type:MY_ORDER_REQUEST})

        const {data} = await  axios.get("/api/v1/order/me")
        dispatch({type:MY_ORDER_SUCCESS , payload:data.orders})
    } catch (error) {
        dispatch({
            type:MY_ORDER_FAILURE,
            payload:error.response.data.message
        })
    }
}

//Get Order By Id
export const singleOrder = (id) => async(dispatch)=>{
    try {
        dispatch({type:ID_ORDER_REQUEST})

        const {data} = await  axios.get(`/api/v1/order/${id}`);
        dispatch({type:ID_ORDER_SUCCESS , payload:data.order})
    } catch (error) {
        dispatch({
            type:ID_ORDER_FAILURE,
            payload:error.response.data.message
        })
    }
}

//Get all orders --ADMIN
export const adminAllOrders = () => async(dispatch)=>{
    try {
        dispatch({type:ADMIN_ORDER_REQUEST})
        const {data} = await axios.get(`/api/v1/admin/orders`);
        dispatch({type:ADMIN_ORDER_SUCCESS,payload:data.orders});
    } catch (error) {
        dispatch({type:ADMIN_ORDER_FAILURE,payload:error.response.data.message})
    }
}

//Updating Orders --ADMIN
export const updateOrders  = (status,id)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.put(`/api/v1/admin/order/${id}`,status,config);
        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success});
        
    } catch (error) {
        dispatch({type:UPDATE_ORDER_FAILURE,payload:error.response.message.data});
    }
};

//Deleting Orders --ADMIN
export const adminDeleteOrders = (id)=> async(dispatch)=>{
    try {
        dispatch({type:ADMIN_ORDER_DELETE_REQUEST});
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({type:ADMIN_ORDER_DELETE_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:ADMIN_ORDER_DELETE_FAILURE,payload:error.response.data.message})
    }
}

//Clearing all the errors.
export const clearErrors = ()=> async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}
