import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminAllOrders } from '../../actions/orderAction';
import { BsCartX } from 'react-icons/bs';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import OrderTable from './OrderTable';
import { ADMIN_ORDER_DELETE_RESET } from '../../constants/orderConstants';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import "./AdminOrder.css";

const AdminOrders = () => {
    const navigate = useNavigate();
    const {orders,error,loading} = useSelector(state=>state.allOrders);
    const {isDeleted , error:deleteError}  = useSelector(state=>state.orderAction);
    const dispatch = useDispatch();

    const nestedOrders = orders && orders.map(order => ({
        id:order._id,
        user:order.user.name,
        price:`₹ ${order.totalPrice}`,
        date: new Date(order.createdAt).toLocaleString('en-IN'),
        status:order.orderStatus,
        link:order._id
  }));

    useEffect(()=>{
        dispatch(adminAllOrders());
        if(error)
          toast.error( error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })

    if(isDeleted === true){
        toast.success( "Deleted Order", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
          navigate(`/admin/dashboard`);
          dispatch({ type: ADMIN_ORDER_DELETE_RESET });
    }
          
    if(deleteError){
        if(error)
          toast.error( deleteError, {
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
    },[deleteError, dispatch, error, isDeleted, navigate])
  return (
    <>
    <MetaData  title={`All Orders --ADMIN`}/>
  {loading ? (
    <Loader />
  ) : (
    <>
    <div className='dashboard'>
     <Sidebar/>
      {orders && nestedOrders.length > 0 ? (
        <div className="mainTable" >
          <OrderTable data={nestedOrders} />
        </div>
      ) : (
        <div className='noOrders'><BsCartX/>
        <span>No Orders Placed </span></div>
      )}
      </div>
    </>
  )}
  <ToastContainer/>
</>
  )
}

export default AdminOrders
