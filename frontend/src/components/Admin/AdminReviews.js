import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import "./AdminReviews.css";
import { Button } from '@chakra-ui/react';
import {useDispatch, useSelector} from 'react-redux'
import { allReviews } from '../../actions/productActions';
import ReviewTable from "./ReviewTable.js";
import Loader from "../layout/Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const AdminReviews = () => {
    const [productId,setProductId] = useState("");
    const dispatch = useDispatch();
    const {loading,reviews,error} = useSelector(state=>state.allReviews);
    const {isDeleted , error:reviewError} = useSelector(state=>state.reviewAction);
    const navigate=useNavigate();
    const fetchReviewsHandler= (e) =>{
        e.preventDefault()
        dispatch(allReviews(productId))
    }
    
    const nestedReviews = reviews && reviews.map(review=>({
        id:review._id,
        user:review.name,
        rating:review.rating,
        comment:review.comment
    }));

    useEffect(()=>{
        if(error)
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

          if(isDeleted){
            toast.success("Review Deleted", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
              dispatch({type:DELETE_REVIEW_RESET})
              navigate("/admin/reviews")
          }

          if(reviewError)
          toast.error(reviewError, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        
    },[dispatch, error, isDeleted, navigate, reviewError])

  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='adminReview'>
      <div className='reviewSearch'>
      <h1>Reviews</h1>
      <form onSubmit={fetchReviewsHandler}>
      <div>
      <MdOutlineProductionQuantityLimits/>
        <input
            type='text'
            placeholder='Enter Product Id'
            onChange={(e)=>setProductId(e.target.value)}
        />
      </div>
      <Button
                id="getReviews"
                type="submit"
              >
                Fetch
        </Button>
      </form>
      </div>

      {loading?<Loader/>:<div className='reviewTable'>
      {reviews && reviews.length!==0? <ReviewTable className="reviewTable" data={nestedReviews} productId={productId}/>: <p className='noReviews noReview'>No Reivews Yet</p>}
      </div>}
      
      </div>
      
      <ToastContainer/>
    </div>
  )
}

export default AdminReviews
