import { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/layout/Header/Header.js";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Login from './components/User/Login';
import Signup from './components/User/Signup';
import store from "./store";
import {loadUsers} from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOption.js"
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js";
import ProtectedRoute from './components/Route/ProtectedRoute';
import AdminRoute from './components/Route/AdminRoute';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgotPassword from './components/User/ForgotPassword.js';
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import PaymentElement from "./components/Cart/PaymentElement.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrder from "./components/Order/MyOrder.js";
import SingleOrder from "./components/Order/SingleOrder.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductsList from "./components/Admin/ProductsList.js";
import CreateProduct from "./components/Admin/CreateProduct.js";
import EditProduct from "./components/Admin/EditProduct.js";
import AdminOrders from "./components/Admin/AdminOrders.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import AllUsers from "./components/Admin/AllUsers.js";
import AdminUsersEdit from "./components/Admin/AdminUserEdit.js";
import AdminReviews from "./components/Admin/AdminReviews.js";
import About from "./components/About/About.js";
import NoPageElement from "./components/Home/NoPageElement.js";
import axios from 'axios';





function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user);
  const [stripeApiKey , setStripeApiKey] = useState("");


  async function getstripekey(){
    const {data} = await axios.get(`/api/v1/sendApiKey`);
    setStripeApiKey(data.stripeApiKey);
   }

  

useEffect(()=>{
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans", "Chilanka"],
    },
  });

  store.dispatch(loadUsers());
  getstripekey();

  
  },[]);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>
      <Route exact path='/' Component={Home}/>
      <Route exact path='/product/:id' Component={ProductDetails}/>
      <Route exact path='/products' Component={Products}/>
      <Route  path='/products/:keyword' Component={Products}/>
      <Route exact path='/search' Component={Search}/>
      <Route exact path='/login' Component={Login}/>
      <Route exact path='/signup' Component={Signup}/>
      <Route
         exact
          path="/account"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />

        <Route
           exact
           path="/me/update"
           element={
             <ProtectedRoute>
               <UpdateProfile/>
             </ProtectedRoute>
          }
         />

        <Route
           exact
           path="/password/update"
           element={
             <ProtectedRoute>
               <UpdatePassword/>
             </ProtectedRoute>
           }
          />

          <Route exact path='/passwords/forgot' Component={ForgotPassword}/>
          <Route exact path='/passwords/reset/:token' Component={ResetPassword}/>

          <Route
           exact
           path="/cart"
          element={<Cart/>}
         />

         <Route
           exact
           path="/shipping"
           element={
             <ProtectedRoute>
               <Shipping/>
             </ProtectedRoute>
           }
          />

          <Route
           exact
           path="/order/confirm"
           element={
             <ProtectedRoute>
               <ConfirmOrder/>
             </ProtectedRoute>
           }
          />

          <Route
           exact
           path="/orders"
           element={
             <ProtectedRoute>
               <MyOrder/>
             </ProtectedRoute>
           }
          />

          <Route
           exact
           path="/order/:id"
           element={
             <ProtectedRoute>
               <SingleOrder/>
             </ProtectedRoute>
           }
          />

          <Route
           exact
           path="/process/payment"
           element={
             <ProtectedRoute>
               <PaymentElement stripeApiKey={stripeApiKey}/>
             </ProtectedRoute>
           }
          />

          <Route
           exact
           path="/success"
           element={
             <ProtectedRoute>
               <OrderSuccess/>
             </ProtectedRoute>
           }
          />

         <Route
           exact
           isAdmin={true}
           path="/admin/dashboard"
           element={
             <AdminRoute>
               <Dashboard/>
             </AdminRoute>
           }
          />

          <Route
            exact
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductsList/>
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/product/create"
            element={
              <AdminRoute>
                <CreateProduct/>
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/product/:id"
            element={
              <AdminRoute>
                <EditProduct/>
              </AdminRoute>
            }
          />

          <Route
            exact
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders/>
              </AdminRoute>
            }
          />

          <Route 
          exact 
          path='/admin/order/:id'
          element={
            <AdminRoute>
              <ProcessOrder/>
            </AdminRoute>
          }
          />

         <Route 
          exact 
          path='/admin/users'
          element={
            <AdminRoute>
              <AllUsers/>
            </AdminRoute>
          }
          />

         <Route 
          exact 
          path='/admin/user/:id'
          element={
            <AdminRoute>
              <AdminUsersEdit/>
            </AdminRoute>
          }
          />

        <Route 
          exact 
          path='/admin/reviews'
          element={
            <AdminRoute>
              <AdminReviews/>
            </AdminRoute>
          }
          />
          <Route
            exact path='/about' element={<About/>}
          />
          <Route
            path="*"
            element={<NoPageElement/>}
          />
         

      </Routes>
     
      <Footer/>
    </Router>
    

  );
}

export default App;

