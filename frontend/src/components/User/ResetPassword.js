import React, { useEffect, useState } from 'react'
import { Button,  FormControl,  Input, InputGroup, InputLeftElement,  InputRightElement,  chakra} from '@chakra-ui/react'
import  { FaLock } from 'react-icons/fa';
import { loadUsers, resetPassword} from "../../actions/userAction";
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET} from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import "./UpdateProfile.css"
import reset from "../../images/resetP.jpg"
import "./ResetPassword.css";

const ResetPassword = () => {

    const CFaLock = chakra(FaLock);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();

    const {error,success,loading} = useSelector(state=>state.forgotPassword)

    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
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
      if (success) {
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
          navigate('/login');
        }, 6000);
  
        return () => clearTimeout(timeout); //read more on this
      }  
      },[dispatch, error, navigate, success])
      
      
        const updateSubmit = async (e)=>{
          e.preventDefault();
      
          const myForm = new FormData();
          myForm.set("password", newPassword);
          myForm.set("confirmPassword", confirmPassword);
          dispatch(resetPassword(token,myForm));
          
        }
      
  return (
    <>
    
        {loading ? <Loader/> :
        <>
        <MetaData title={`Reset Password`}/>
        <div className='rpasswordContainer'>
        <div>
            <h1 className='rheading'>Reset Password</h1>
            <img src={reset} alt='User'/>
        </div>
        <div>
        <form>
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
                       Reset
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

export default ResetPassword;

