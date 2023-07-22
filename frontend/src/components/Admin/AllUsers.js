import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { RxCrossCircled } from 'react-icons/rx';
import Table from "./UserTable.js"
import { ToastContainer, toast } from 'react-toastify';
import { clearErrors, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import "./AllUsers.css";



const AllUsers = () => {
    const {users,loading,error} = useSelector(state=>state.allUsers);
    const{isDeleted , error:deleteError} = useSelector(state=>state.userAction);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nestedUsers = users && users.map(user => ({
        id:user._id,
        name:user.name,
        role:user.role,
        email:user.email,
        link:user._id
  }));

  useEffect(()=>{
    dispatch(getAllUsers());
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

    if(isDeleted === true){
      toast.success( "Deleted User", {
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
        dispatch({ type: DELETE_USER_RESET });
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
    <MetaData title={`All Users --ADMIN`}/>
        {loading? <Loader/>: 
    <div className='dashboard'>
    <Sidebar/>
    {users.length ===0?<div className='noProducts'>
    <RxCrossCircled/>
    <p>No Users </p>
    </div>:
    <div className='usersList'>
      <h1>All Users</h1>
      <Table data={nestedUsers}/>
      </div>}
       
      
    </div>
        }
    <ToastContainer/>
    </>
  )
}

export default AllUsers
