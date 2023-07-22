import {CREATE_ORDER_FAILURE,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CLEAR_ERRORS,
MY_ORDER_FAILURE,MY_ORDER_REQUEST,MY_ORDER_SUCCESS, ID_ORDER_REQUEST, ID_ORDER_SUCCESS, ID_ORDER_FAILURE, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_FAILURE, ADMIN_ORDER_DELETE_RESET, ADMIN_ORDER_DELETE_FAILURE, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_DELETE_REQUEST, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE, UPDATE_ORDER_RESET
} from "../constants/orderConstants";

export const newOrderReducer = (state = {} ,action)=>{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading:false,
                order:action.payload
            }
        case CREATE_ORDER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}

export const myOrdersReducers = (state={orders:[]},action) =>{
switch (action.type) {
    case MY_ORDER_REQUEST:
        return{
            loading:true
        }
    case MY_ORDER_SUCCESS:
        return{
            loading:false,
            orders:action.payload
        }
    case MY_ORDER_FAILURE:
        return{
            loading:false,
            error:action.payload
        }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

    default:
        return state;
}
}


export const singleOrdersReducers = (state={order:{}},action) =>{
    switch (action.type) {
        case ID_ORDER_REQUEST:
            return{
                loading:true
            }
        case ID_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ID_ORDER_FAILURE:
            return{
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
    
        default:
            return state;
    }
    }

export const adminOrdersReducer = (state={orders:[]},action)=>{
    switch (action.type) {
        case ADMIN_ORDER_REQUEST:
            return{
                loading:true
            }
        case ADMIN_ORDER_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case ADMIN_ORDER_FAILURE:
            return{
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                }
    
        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ORDER_REQUEST:
      case ADMIN_ORDER_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case ADMIN_ORDER_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_ORDER_FAILURE:
      case ADMIN_ORDER_DELETE_FAILURE:
        return {
        ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case ADMIN_ORDER_DELETE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };