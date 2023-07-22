import React, { useEffect, useState } from 'react'
import { Button,  FormControl,  Input, InputGroup, InputLeftElement,  InputRightElement,  chakra} from '@chakra-ui/react'
import  { FaLock } from 'react-icons/fa';
import { loadUsers, updatePassword} from "../../actions/userAction";
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET} from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import "./UpdateProfile.css"
import key from "../../images/key.jpg"
import { SlLockOpen } from "react-icons/sl";
import "./UpdatePassword.css";

const UpdatePassword = () => {

    const CFaLock = chakra(FaLock);
    const CLockOpen = chakra(SlLockOpen)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=>state.user)
    const {error,isUpdated,loading} = useSelector(state=>state.profile)

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [showPassword , setShowPassword] = useState(false);
    const [showNPassword , setShowNPassword] = useState(false);
    const [showCPassword , setShowCPassword] = useState(false);


    useEffect(()=>{

        if(error && error!=="Please Login to continue"){
          const toastId = toast.error(error, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            
            return () => {
      
              toast.dismiss(toastId); // Dismiss the toast when the component is unmounted
            };
      }
      if (isUpdated) {
        const toastId = toast.success('Profile Updated Successfully', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
  
        const timeout = setTimeout(() => {
        dispatch(loadUsers());
        toast.dismiss(toastId);
          
          dispatch({ type: UPDATE_PASSWORD_RESET });
          navigate('/account');
        }, 6000);
  
        return () => clearTimeout(timeout); //read more on this
      }  
      },[dispatch, error, isUpdated, navigate, user])
      
      
        const updateSubmit = async (e)=>{
          e.preventDefault();
      
          const myForm = new FormData();
      
          myForm.set("oldPassword", oldPassword);
          myForm.set("newPassword", newPassword);
          myForm.set("confirmPassword", confirmPassword);
          dispatch(updatePassword(myForm));
          
        }
      
  return (
    <>
    
        {loading ? <Loader/> :
        <>
        <MetaData title={`${user.name}'s Password`}/>
        <div className='upasswordContainer'>
        <div>
            <h1 className='pheading'>Update Password</h1>
            <img src={key} alt='User'/>
        </div>
        <div>
        <form>
            <div>
                <h4>Old Password</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CLockOpen color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input name='oldPassword' type={showPassword ? "text":"password"} required onChange={(e)=>setOldPassword(e.target.value)} placeholder='Password' />
                            <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
            </div>
            <div>
                <h4>New Password</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaLock color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input name='newPassword' type={showNPassword ? "text":"password"} required onChange={(e)=>setNewPassword(e.target.value)} placeholder='Password' />
                            <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={()=>setShowNPassword(!showNPassword)}>
                                {showNPassword ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
            </div>
            <div>
                <h4>Confirm Password</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaLock color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input name='confirmPassword' type={showCPassword ? "text":"password"} required onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Password' />
                            <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={()=>setShowCPassword(!showCPassword)}>
                                {showCPassword ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
            </div>
                    <Button
                    className='button'
                         borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="orange"
                        width={['50','full']}
                        onClick={updateSubmit}
                        ml={['0','30px']}
                     >
                       Update
                    </Button>
                    </form>
        </div>
        
        </div>
        <ToastContainer/>
        
        </> 
        }
        
    </>
  )
}

export default UpdatePassword;

