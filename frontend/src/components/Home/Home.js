import React, { Fragment, useEffect } from 'react'
import { GrCart } from 'react-icons/gr'
import './Home.css'
import { Button, Heading} from '@chakra-ui/react';
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import {getProducts} from "../../actions/productActions";
import {useDispatch , useSelector} from "react-redux";
import Loader from '../layout/Loader/Loader';
import {ToastContainer ,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const Home = () => {
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector(state=>state.products)



  useEffect(()=>{
    if(error){
      return  toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    dispatch(getProducts());
  },[dispatch,error]);



  return (
    <>
   
       {loading ? <Loader/> : <Fragment>
    <MetaData title={"Digi-Depot: Your Digital Shop"}/>

        <div className='banner'>
            <Heading className='paragraph'>Welcome To Digi-Depot</Heading>
            <Heading  className='headingHome'>Get Amazing Deals on all Products.</Heading>
            <a href='#container'>
            <Button variant={'outline'} rightIcon={<GrCart />} colorScheme='orange'>Explore</Button>
            </a>

        </div>

        <h2 className='homeHeading'>Featured Products</h2>

        <div className='container' id='container'>
        {products && products.map(product=>(
          <ProductCard product={product} />
        ))}
        </div>
    </Fragment>}
    <ToastContainer/>
    </>
   
  )
}

export default Home
