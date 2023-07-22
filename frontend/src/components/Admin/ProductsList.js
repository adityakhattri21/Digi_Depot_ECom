import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import "./ProductsList.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProducts } from '../../actions/productActions';
import Table from './ProductTable.js';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import {RxCrossCircled} from 'react-icons/rx'
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {products,loading,error} = useSelector(state=>state.products);
    const {error:deleteError , success,message}=useSelector(state=>state.deleteProduct)


    const nestedProducts = products && products.map(product => ({
        id:product._id,
        name:product.name,
        price:`₹ ${product.price}`,
        stock:product.stock,
        link:product._id
  }));

  useEffect(()=>{
    if(error){
        dispatch(clearErrors());
        toast.error(error, {
          position: "bottom-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        
      }
      if(deleteError){
        dispatch({type:DELETE_PRODUCT_RESET});
        toast.error(error, {
          position: "bottom-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        
      }
      if(success){
        dispatch({type:DELETE_PRODUCT_RESET});
        toast.success(message, {
          position: "bottom-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        navigate("/admin/dashboard")
      }
    dispatch(getAdminProducts());
  },[deleteError, dispatch, error, message, navigate, success])

  return (
    <>
    <MetaData title={`Products --ADMIN`}/>
        {loading? <Loader/>: 
    <div className='dashboard'>
    <Sidebar/>
    {products.length ===0?<div className='noProducts'>
    <RxCrossCircled/>
    <p>No Products</p>
    </div>:
    <div className='productsList'>
      <h1>All Products</h1>
      <Table data={nestedProducts}/>
      </div>}
       
      
    </div>
        }
    <ToastContainer/>
    </>
    
  )
}

export default ProductsList
