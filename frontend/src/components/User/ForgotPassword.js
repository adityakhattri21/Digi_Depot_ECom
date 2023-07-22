import React, { useEffect, useState } from 'react'
import { Button,  FormControl,  Input, InputGroup, InputLeftElement,  chakra} from '@chakra-ui/react'
import {  forgotPassword} from "../../actions/userAction";
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import "./UpdateProfile.css"
import forgot from "../../images/forgot.webp"
import { SlEnvolope} from "react-icons/sl";
import "./ForgotPassword.css";

const ForgotPassword = () => {

    const CEmail = chakra(SlEnvolope);

    const dispatch = useDispatch();

    const {error,message,loading} = useSelector(state=>state.forgotPassword)

    const [email,setEmail] = useState("");


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
      if (message) {
        const toastId = toast.success(message, {
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
        toast.dismiss(toastId);
        }, 6000);
  
        return () => clearTimeout(timeout); //read more on this
      }  
      },[dispatch, error, message])
      
      
        const forgotSubmit = async (e)=>{
          e.preventDefault();
          dispatch(forgotPassword(email));
          
        }
      
  return (
    <>
    
        {loading ? <Loader/> :
        <>
        <MetaData title={`Forgot Password`}/>
        <div className='fpasswordContainer'>
        <div>
            
            <img src={forgot} alt='User'/>
        </div>
        <div>
        <h1 className='fheading'>Forgot Your Password ? </h1>
        <form>
            <div>
                <h4>Email</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CEmail color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input name='email' type='email' required onChange={(e)=>setEmail(e.target.value.trim())} placeholder='Your Email' />
    
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
                        onClick={forgotSubmit}
                        ml={['0','30px']}
                     >
                       Send Email
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

export default ForgotPassword;


