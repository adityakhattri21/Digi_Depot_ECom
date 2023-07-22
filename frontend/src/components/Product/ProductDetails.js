import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useDispatch , useSelector} from "react-redux"
import {clearErrors, createReview, getProductDetails} from "../../actions/productActions"
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import {ToastContainer ,toast} from "react-toastify";
import MetaData from '../layout/MetaData';
import { addToCart } from '../../actions/cartActions';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';



const ProductDetails = () => {

    const dispatch = useDispatch();
    const {product , loading , error} = useSelector(state=>state.productDetails)
    const {isAuthenticated} = useSelector(state=>state.user)
    const{success , error: reviewError} = useSelector(state=>state.createReview)
    const [quantity,setQuantity] = useState(1);
    const [newReview , setNewReview] = useState("");
    const [newRating , setNewRating] = useState(0);
    let {id} = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure() 

    const increaseCount = ()=>{
        if(quantity >= product.stock)
        return

        const qty=quantity+1
        setQuantity(qty);
    }

    const decreseCount = () =>{
        if(quantity<=1)
        return
        const qty=quantity-1
        setQuantity(qty);
    }

    useEffect(()=>{
        if(error){

           toast.error(error, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
            dispatch(clearErrors);
          }
        dispatch(getProductDetails(id))
        if(success){
            return toast.success("Review Added", {
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
        if(reviewError){
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
              dispatch(clearErrors);
        }
    },[dispatch, id, error, success, reviewError])

    
    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product && product.ratings ? Number(product.ratings) : 0,
        isHalf:true,
        size: window.innerWidth < 600 ? 20 : 25
    }

    const reviewOptions ={
        edit:true,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value: 0,
        isHalf:false,
        size: window.innerWidth < 600 ? 30 : 25,
        onChange:e=>setNewRating(e)
    }

    const handleReviewSubmit = () =>{
        const myform = new FormData();
        myform.set("comment",newReview);
        myform.set("rating",newRating);
        myform.set("productId",id);
        dispatch(createReview(myform))
    }


    const addToCartHandler = ()=>{
        if(product.stock<1){
            return toast.warning("Item Out Of Stock", {
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
        dispatch(addToCart(id,quantity))
        return toast.success("Item added to Cart", {
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



  return (

<>
        {loading ? <Loader/> : (<Fragment>
            <MetaData title={`${product.name} :Digi-Depot `}/>
    <div className='productDetails'>
        <div>
        <Carousel className='carousel' showThumbs={false}>
        {product && product.images && product.images.map((item,i)=>(
            <img
                className='carouselImage' 
                src={item.url}
                key={item.url}
                alt={`${i} Slides`}
            />
        ))}
       </Carousel>
        </div>


        <div>
        <div className='detailsBlock-1'>
        <h2>{product && product.name}</h2>
        <p>Product # {product && product._id}</p>
        </div>

        <div className='detailsBlock-2'>
            <ReactStars {...options} />
            <span>({product && product.numOfReviews} Reviews)</span>
        </div>

        <div className='detailsBlock-3'>
        <h1>{`₹${product && product.price}`}</h1>
        <div className='detailsBlock-3-1'>
            <div className='detailsBlock-3-1-1'>
                <button onClick={decreseCount}>-</button>
                <input readOnly value={quantity} type='number'/>
                <button onClick={increaseCount} >+</button>
            </div>
            <button onClick={addToCartHandler}>Add To Cart</button>
        </div>

        <p>Status: <b className={product && product.stock < 1 ? 'redColor' : 'greenColor'}>
            {product && product.stock < 1 ? "Out Of Stock" : "In-Stock"}
        </b></p>
    </div>

    <div className='detailsBlock-4'>
        Description: <p>{product && product.description}</p>
    </div>

    <button onClick={onOpen} className='submitReview'>Submit Review</button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
       
        <ModalHeader>Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <ReactStars {...reviewOptions} />
            <Textarea placeholder='Your Review' size={'sm'} onChangeCapture={e=>setNewReview(e.target.value)}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='orange' mr={3} onClick={handleReviewSubmit} onClickCapture={onClose} disabled={isAuthenticated ? 'false':'true'}>
              Submit
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        
          
        </ModalContent>
      </Modal>



    </div>
    </div>

    <h3 className='reviewHeading'>REVIEWS</h3>
    {product && product.reviews && product.reviews[0] ? (
        <div className='reviews'>
            {product && product.reviews && product.reviews.map((review)=> <ReviewCard review={review}/>)}
        </div>
    ):(<p className='noReviews'>No Reivews Yet</p>)}

    
    <ToastContainer/>
    </Fragment>
    
    )}
    
    </>
  )
}

export default ProductDetails
