import axios from "axios";
import {ALL_PRODUCT_FAIL , 
    ALL_PRODUCT_REQUEST , 
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS, 
    CLEAR_ERRORS,
    CREATE_REVIEW_FAILURE,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS
} from "../constants/productConstants";
import { UPDATE_PASSWORD_FAIL } from "../constants/userConstants";

export const getProducts = (keyword="",currentPage=1,price=[0,2500000],category,ratings=0) => async(dispatch) =>{
try {
    dispatch({type:ALL_PRODUCT_REQUEST});
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if(category){
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    const {data} = await axios.get(link);
    console.log(category)
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    });
    
} catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response.data.message
    })
}
}

//Get All Products ADMIN
export const getAdminProducts = () => async (dispatch)=> {
    try {
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        const {data} = await axios.get(`/api/v1/admin/products`);
        dispatch({type:ADMIN_PRODUCT_SUCCESS , payload:data.products}) 
    } catch (error) {
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:error.resposne.data.message})
    }
}

//Create Product Admin
export const createProduct = (productData) =>async(dispatch)=>{
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
    } catch (error) {
        dispatch({type:NEW_PRODUCT_FAIL,payload:error.response.data.message})
    }
}


//Update a product 
export const updateProduct = (id,productData)=>async(dispatch)=>{
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.message})
    }
}

//Delete Product
export const deleteProduct = (id) =>async(dispatch)=>{
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });


    const { data } = await axios.delete(
      `/api/v1/admin/product/${id}`,
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAIL,payload:error.response.data.message})
    }
}

export const getProductDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});
    
        const {data} = await axios.get(`/api/v1/product/${id}`);
    
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
    }

//Clearing all the errors.
export const clearErrors = ()=> async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}

//Creating Reviews
export const createReview = (reviewData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_REVIEW_REQUEST})
        const config = {
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.put("/api/v1/review",reviewData,config)
        dispatch({type:CREATE_REVIEW_SUCCESS , payload:data.success})
    } catch (error) {
        dispatch({type:CREATE_REVIEW_FAILURE,payload:error.response.data.message})
    }
}

//Getting all reviews of a product 
export const allReviews = (productId)=>async(dispatch)=>{
    try {
        dispatch({type:GET_REVIEWS_REQUEST});

        const {data} = await axios.get(`/api/v1/reviews?productId=${productId}`)
        dispatch({type:GET_REVIEWS_SUCCESS,payload:data.reviews});
    } catch (error) {
        dispatch({type:GET_REVIEWS_FAIL,payload:error.response.data.message})
    }
}

//Delete a review 
export const deleteReview = (productId,id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST});
        const {data} = await axios.delete(`/api/v1/reviews?productId=${productId}&id=${id}`);
        dispatch({type:DELETE_REVIEW_SUCCESS,payload:data.success});
    } catch (error) {
        dispatch({type:DELETE_REVIEW_FAIL,payload:error.response.data.message})
    }
}