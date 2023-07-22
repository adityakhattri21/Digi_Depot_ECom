import {CLEAR_ERRORS, LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,REGISTER_USER_FAIL,
REGISTER_USER_REQUEST,
REGISTER_USER_SUCCESS,
LOAD_USER_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
LOGOUT_FAIL,
LOGOUT_SUCCESS,
UPDATE_USER_FAIL,
UPDATE_USER_REQUEST,
UPDATE_USER_RESET,
UPDATE_USER_SUCCESS,
UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_FAIL,
UPDATE_PASSWORD_RESET,
UPDATE_PASSWORD_SUCCESS,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
RESET_PASSWORD_FAIL,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
GET_ALL_USERS_REQUEST,
GET_ALL_USERS_SUCCESS,
GET_ALL_USERS_FAIL,
DELETE_USERS_REQUEST,
DELETE_USER_RESET,
DELETE_USERS_FAIL,
DELETE_USERS_SUCCESS,
GET_USER_REQUEST,
GET_USER_SUCCESS,
GET_USER_FAIL,
UPDATE_USER_ROLE_REQUEST,
UPDATE_USER_ROLE_RESET,
UPDATE_USER_ROLE_FAIL,
UPDATE_USER_ROLE_SUCCESS,
GET_USER_RESET
} from "../constants/userConstants";

export const userReducer = (state= {user:{}},action )=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated : false
            }
        
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated : true,
                user:action.payload
            }

        case LOGOUT_SUCCESS:
            return{
                loading:false,
                user:null,
                isAuthenticated:false
            }

        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated : false,
                user:null,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null      
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
    
        default:
            return state;
    }
}


//Profile Reducer
export const profileReducer = (state= {},action )=>{
    switch (action.type) {
        case UPDATE_USER_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        
        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated:action.payload
            }
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null      
            }
        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                isUpdated:null
            };
    
        default:
            return state;
    }
}

//Forgot Password Reducer
export const forgotPasswordReducer = (state= {},action )=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                error:null
            }
        
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:action.payload
            }
        
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success:action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
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

//get all user reducer
export const getAllUsersReducer = (state={users:[]},action)=>{
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GET_ALL_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                users:action.payload
            }
        case GET_ALL_USERS_FAIL:
            return{
                ...state,
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

//Update / Delete User reducer
export const userActionReducer = (state={},action)=>{
    switch (action.type) {
        case DELETE_USERS_REQUEST:
        case UPDATE_USER_ROLE_REQUEST:
            return {
                loading:true
            }
        case DELETE_USERS_SUCCESS:
            return {
                loading :false,
                isDeleted:action.payload,
                error:null
            }

        case UPDATE_USER_ROLE_SUCCESS:
            return {
                loading :false,
                isUpdated:action.payload,
                error:null
            }

        case DELETE_USERS_FAIL:
        case UPDATE_USER_ROLE_FAIL:
            return {
                loading:false,
                isDeleted:false,
                isUpdated:false,
                error:action.payload
            }
        case DELETE_USER_RESET:
        case UPDATE_USER_ROLE_RESET:
        return{
            loading:false,
            isDeleted:false,
            isUpdated:false,
            error:null
        }
        default:
            return state;
    }
}

//get a user --ADMIN
export const getUser = (state={},action)=>{
    switch (action.type) {
        case GET_USER_REQUEST:
            return{
                loading:true
            }
        case GET_USER_SUCCESS:
            return{
                loading:false,
                user:action.payload
            }
        case GET_USER_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case GET_USER_RESET:
            return{
                loading:false,
                user:null
            }
    
        default:
            return state;
    }
}