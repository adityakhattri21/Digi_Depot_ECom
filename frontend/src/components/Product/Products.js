import React, { useState } from 'react'
import "./Products.css";
import {useDispatch , useSelector} from "react-redux";
import {clearErrors , getProducts} from "../../actions/productActions";
import Loader from "../../components/layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Heading,Tooltip, RangeSlider, RangeSliderThumb, RangeSliderFilledTrack, RangeSliderTrack, Box,  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, } from '@chakra-ui/react';
import {ToastContainer ,toast} from "react-toastify";
import MetaData from '../layout/MetaData';

const categories = [
  "Laptop",
  "Footwear",
  "Bottoms",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {

    const [currentPage , setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000]);
    const [tprice , setTPrice] = useState([0,25000])
    const [showTooltip, setShowTooltip] = useState(false)
    const  [category,setCategory] = useState("");
    const [ratings , setRatings ] = useState(0);
    const [tRating , setTRating] = useState(0);
    const [showTooltipR, setShowTooltipR] = useState(false)

    const dispatch = useDispatch();
    const {products , loading , error , productsCount , resultPerPage,filteredProducts} = useSelector(state=>state.products)

    let {keyword} = useParams();

   const setCurrentPageNo=(e)=>{
    setCurrentPage(e);
   }

   const priceHandler = (newPrice) =>{
    setPrice(newPrice)
   }

   const tpriceHandler = (newPrice) =>{
    setTPrice(newPrice)
   }

    useEffect(()=>{
        if(error){
           return  toast.error(error, {
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
        dispatch(getProducts(keyword,currentPage,price,category,ratings));
        dispatch(clearErrors);
    },[dispatch,keyword,currentPage,price,error,category,ratings])

  return (
    <>
        {loading ? <Loader/> : (
        <>
        <MetaData title={"Products :Digi-Depot"}/>
        <h2 className='productsHeading'>Products</h2>
        <div className='products'>


        {
            !filteredProducts ? (
            <>
                 <p className='noProduct'>No Products Found</p>
            </>
           ) : (
               products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            )}
        </div>

        <div className='filterBox'>
            <Heading size='sm'>Price</Heading>
            <RangeSlider defaultValue={price}
           aria-label="price-filter" min={1000} max={25000}  onChangeEnd={(newPrice)=>priceHandler(newPrice)} onChange={(newPrice)=>tpriceHandler(newPrice)}
           onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          >
            <RangeSliderTrack bg="orange.100">
              <RangeSliderFilledTrack />
            </RangeSliderTrack>

            <Tooltip
              label={`₹${tprice[0]}`} hasArrow placement="top"  bg='orange'
              color='white'
              isOpen={showTooltip}>
              <RangeSliderThumb boxSize={4} index={0}>
              </RangeSliderThumb>
            </Tooltip>

            <Tooltip
             label={`₹${tprice[1]}`} hasArrow placement="top"  bg='orange'
             color='white'
             isOpen={showTooltip}>
              <RangeSliderThumb boxSize={4} index={1}>
              </RangeSliderThumb>
            </Tooltip>
          </RangeSlider>

         
          <div className='categoryBox'>
          <Heading size={'sm'}>Category</Heading>
            <ul>{
              categories.map(category=>(
                <li key={category}
                className='category-link'
                onClick={()=>setCategory(category)}
                >{category}</li>
                ))
                
            }
            <li className='remove-category category-link' onClick={()=>setCategory("")}>Remove Filter</li>
            </ul>
            
          </div>

         <Box as="fieldset" className='ratings-box'>
          <Heading size={'xs'}>Ratings Above</Heading>
    <Slider
      id='slider'
      defaultValue={ratings}
      min={0}
      max={5}
      colorScheme='blue'
      onMouseEnter={() => setShowTooltipR(true)}
      onMouseLeave={() => setShowTooltipR(false)}
      onChangeEnd={(newRatings)=>setRatings(newRatings)}
      onChange={(newTRating)=>setTRating(newTRating)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='orange'
        color='white'
        placement='top'
        isOpen={showTooltipR}
        label={`${tRating}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>

         </Box>

        </div>
        
        {
            
           resultPerPage < filteredProducts && (<div className='paginationBox'>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'


            />
        </div>)
        }
        
        </>
    )}
    <ToastContainer/>
    </>
    
  )
}

export default Products
