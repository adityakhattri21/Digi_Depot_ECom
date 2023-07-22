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
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET} from "../constants/productConstants"; 

export const productReducer = (state={products:[]},action) =>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.products,
                productsCount : action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProducts : action.payload.filteredProductsCount
            }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}

export const createProductReducer = (state={product:{}},action) =>{

    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                loading:true,
                ...state
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                product:action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}

export const updateProductReducer = (state={},action) =>{

    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading:true,
                ...state
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading:false,
                isUpdated:action.payload
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                loading:false,
                isUpdated:false,
                error:action.payload
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
                message:null
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}

export const deleteProductReducer = (state={},action) =>{

    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                loading:true,
                ...state
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading:false,
                success:action.payload.success,
                message:action.payload.message
            }
        case DELETE_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                success: false,
                message:null
            };
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}

export const productDetailsReducer = (state={product:{}},action) =>{

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload.product
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
    
        default:
            return state;
    }

}




export const createReviewReducer = (state={} , action)=>{
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return{
                success:false,
                message:"Review Request"
            }
        
        case CREATE_REVIEW_SUCCESS:
            return{
                success:action.payload,
                message:"Review Created"
            }
        
        case CREATE_REVIEW_FAILURE:
            return {
                success:false,
                error:action.payload
            }
        
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
    
        default:
            return state;
    }
}

//Get Reviews of a Product
export const allReviews = (state={reviews:[]},action)=>{
    switch (action.type) {
        case GET_REVIEWS_REQUEST:
            return{
                loading:true,
            }
        case GET_REVIEWS_SUCCESS:
            return{
                loading:false,
                reviews:action.payload
            }
        case GET_REVIEWS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
    
        default:
            return state;
    }
}

export const reviewAction = (state={},action)=>{
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return{
                loading:true,
                isDeleted:false
            }
        case DELETE_REVIEW_SUCCESS:
            return{
                loading:false,
                isDeleted:true
            }
        case DELETE_REVIEW_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case DELETE_REVIEW_RESET:
            return{
                loading:false,
                isDeleted:false,
                error:null
            }
        default:
            return state;
    }
}