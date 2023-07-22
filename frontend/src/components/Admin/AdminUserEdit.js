import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import "./AdminUserEdit.css"
import {AiOutlineUser,AiOutlineMail, AiOutlineStar} from "react-icons/ai"
import { Button } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getUserAdmin, updateUserRole } from '../../actions/userAction'
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData'
import { ToastContainer, toast } from 'react-toastify'
import { GET_USER_RESET, UPDATE_USER_ROLE_RESET } from '../../constants/userConstants'

const AdminUserEdit = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [role,setRole] = useState("");
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {loading,user,error} = useSelector(state=>state.singleUser);
    const {isUpdated , error:updateError} = useSelector(state=>state.userAction);

    const userRoleUpdateHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("role",role);
       dispatch(updateUserRole(id,myForm));
        toast.success("Updated User", {
          position: "bottom-center",
          autoClose: 9000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        dispatch({type:GET_USER_RESET})
        navigate("/admin/users");
    }

    useEffect(()=>{
        if (!user) {
            dispatch(getUserAdmin(id));
          } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
          }
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
          if(isUpdated){
            dispatch({type:UPDATE_USER_ROLE_RESET})
            toast.success(isUpdated, {
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
          if(updateError){
            dispatch(clearErrors());
            toast.error(updateError, {
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
    },[dispatch, error, id, isUpdated, updateError, user])
  return (
    <>
    <MetaData title={`Update User --ADMIN`}/>
        {loading?<Loader/>:(
            <div className='dashboard'>
      <Sidebar/>
      <div className='userEdit'>
      <form onSubmit={userRoleUpdateHandler}>
      <h1>Edit User</h1>
        <div className='userEditForm'>
        <AiOutlineUser/>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className='userEditForm'>
        <AiOutlineMail/>
        <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div className='userEditForm'>
        <AiOutlineStar/>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={''}>Role</option>
            <option value={'admin'}>Admin</option>
            <option value={'user'}>User</option>
        </select>
        </div>
        <Button
                id="updateUserBtn"
                type="submit"
              >
                Update
        </Button>
      </form>
      </div>
    </div>
        )}
    <ToastContainer/>
    </>
  )
}

export default AdminUserEdit
