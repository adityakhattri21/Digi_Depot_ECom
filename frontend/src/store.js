import {createStore , combineReducers , applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allReviews, createProductReducer, createReviewReducer, deleteProductReducer, productDetailsReducer, productReducer, reviewAction, updateProductReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, getAllUsersReducer, getUser, profileReducer, userActionReducer, userReducer } from "./reducers/userReducer";
import { cartReducers } from "./reducers/cartReducers";
import { adminOrdersReducer, myOrdersReducers, newOrderReducer, orderReducer, singleOrdersReducers } from "./reducers/orderReducers";

const reducers = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart:cartReducers,
    newOrder:newOrderReducer,
    myOrder:myOrdersReducers,
    singleOrder:singleOrdersReducers,
    createReview:createReviewReducer,
    newProduct:createProductReducer,
    deleteProduct:deleteProductReducer,
    updatedProduct:updateProductReducer,
    allOrders:adminOrdersReducer,
    orderAction:orderReducer,
    allUsers:getAllUsersReducer,
    userAction:userActionReducer,
    singleUser:getUser,
    allReviews:allReviews,
    reviewAction:reviewAction
});

const initialState  = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    ,
    shippingInfo: localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
    }
};

const middleware = [thunk];

const store = createStore(reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )
export default store;