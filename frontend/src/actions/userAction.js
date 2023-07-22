import {CLEAR_ERRORS, LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS , REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
LOAD_USER_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
LOGOUT_FAIL,
LOGOUT_SUCCESS,
UPDATE_USER_FAIL,
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_FAIL,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
RESET_PASSWORD_FAIL,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
GET_ALL_USERS_FAIL,
GET_ALL_USERS_REQUEST,
GET_ALL_USERS_SUCCESS,
DELETE_USERS_FAIL,
DELETE_USERS_REQUEST,
DELETE_USERS_SUCCESS,
GET_USER_FAIL,
GET_USER_REQUEST,
GET_USER_SUCCESS,
UPDATE_USER_ROLE_FAIL,
UPDATE_USER_ROLE_REQUEST,
UPDATE_USER_ROLE_SUCCESS
} from "../constants/userConstants";
import axios from "axios";

//LOGIN
export const login = (email,password) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST})

        const config = {headers:{"Content-Type":"application/json" }}

        const {data} = await axios.post(
            `/api/v1/login`,
            {email,password},
            config
        )
        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    } catch (error) {
        dispatch({type:LOGIN_FAIL , payload:error.response.data.message});
    }
}


//REGISTER
export const register = (formData) => async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})

        const config = {headers:{"Content-Type":"multipart/form-data" }}

        const {data} = await axios.post(
            `/api/v1/register`,
            formData,
            config
        )
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.user})
    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL , payload:error.response.data.message});
    }
}

//LOAD USERS
export const loadUsers = () => async(dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST})

        const {data} = await axios.get(
            `/api/v1/me`,
          
        )
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL , payload:error.response.data.message});
    }
}

//LOGOUT USERS
export const logoutUser = () => async(dispatch)=>{
    try {

        const {data} = await axios.get(
            `/api/v1/logout`,
          
        )
        dispatch({type:LOGOUT_SUCCESS,payload:data.message})
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({type:LOGOUT_FAIL , payload:error.response.data.message});
    }
}


//UPDATE USER
export const updateUser = (formData) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USER_REQUEST})

        const config = {headers:{"Content-Type":"multipart/form-data" }}

        const {data} = await axios.put(
            `/api/v1/me/update`,
            formData,
            config
        )
        dispatch({type:UPDATE_USER_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL , payload:error.response.data.message});
       }
}


//UPDATE PASSWORD
export const updatePassword = (passwords) => async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST})

        const config = {headers:{"Content-Type":"application/json" }}

        const {data} = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        )
        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:UPDATE_PASSWORD_FAIL , payload:error.response.data.message});
    }
}

//Forgot PASSWORD
export const forgotPassword = (email) => async(dispatch)=>{
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST})

        const config = {headers:{"Content-Type":"application/json" }}

        const {data} = await axios.post(
            `/api/v1/password/forgot`,
            {email},
            config
        )
        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message})
    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL , payload:error.response.data.message});
    }
}

//Reset PASSWORD
export const resetPassword = (token,passwords) => async(dispatch)=>{
    try {
        dispatch({type:RESET_PASSWORD_REQUEST})

        const config = {headers:{"Content-Type":"application/json" }}

        const {data} = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        )
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success})
    } catch (error) {
        dispatch({type:RESET_PASSWORD_FAIL , payload:error.response.data.message});
    }
}



//Clearing all the errors.
export const clearErrors = ()=> async (dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}

//get all Users --Admin
export const getAllUsers = () =>async(dispatch)=>{
    try {
        dispatch({type:GET_ALL_USERS_REQUEST});

        const {data} = await axios.get(`/api/v1/admin/users`);

        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data.users});
        
    } catch (error) {
        dispatch({type:GET_ALL_USERS_FAIL,payload:error.response.data.message})
    }
}

//Delete User --Admin
export const deleteUser = (id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_USERS_REQUEST});
        const {data} = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch({type:DELETE_USERS_SUCCESS,payload:data.success});
    } catch (error) {
        dispatch({type:DELETE_USERS_FAIL,payload:error.response.data.message});
    }
}

//Get a user --Admin
export const getUserAdmin = (id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_USER_REQUEST})

        const {data} = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({type:GET_USER_SUCCESS,payload:data.user});

    } catch (error) {
        dispatch({type:GET_USER_FAIL,payload:error.response.data.message})
    }
}

//update user role --ADMIN
export const updateUserRole  = (id,formData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_USER_ROLE_REQUEST})
        const config ={
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
        const {data} = await axios.put(`/api/v1/admin/user/${id}`,formData,config)

        dispatch({type:UPDATE_USER_ROLE_SUCCESS,payload:data.success});
    } catch (error) {
        dispatch({type:UPDATE_USER_ROLE_FAIL,payload:error.response.data.message})
    }
}