import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Flex, FormControl, FormHelperText, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, chakra , Link } from '@chakra-ui/react'
import  { FaLock, FaUserAlt } from 'react-icons/fa';
import {login} from "../../actions/userAction";
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import { useNavigate,useLocation } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {

    const dispatch = useDispatch();
    const {error,loading,isAuthenticated} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const location = useLocation();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");  
  const [showPassword , setShowPassword] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
   dispatch(login(loginEmail,loginPassword));
  };

  const redirect = location.search ? "/"+location.search.split("=")[1] : "/account";

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
            // onClose: () => {
            //     setTimeout(()=>{
            //         window.location.reload(); // Refresh the page when the toast is closed
            //     },5000)
              
            // }
          });
          
          return () => {
    
            toast.dismiss(toastId); // Dismiss the toast when the component is unmounted
          };
    }

    if(isAuthenticated){
        navigate(redirect);
    }
    

  },[error, isAuthenticated, navigate, redirect])

  return (
    <>
        {loading? <Loader/> : (
            <>
        <Flex
   direction={'column'}
   width={'100%'}
   height={'100vh'}
   justifyContent={'center'}
   alignItems={'center'}
   >
    <Stack flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
    <Avatar bg={'orange'}></Avatar>
        <Heading color={'orange.200'}>Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={loginSubmit}>
                <Stack spacing={'4'} p={'1vmax'} background={'whiteAlpha.900'} boxShadow={'lg'}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaUserAlt color='gray.300'/>} pointerEvents={'none'}/>
                            <Input type='email' required placeholder='Email Address'  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaLock color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input type={showPassword ? "text":"password"} required placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                            <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText textAlign="right">
                             <Link href='/passwords/forgot'>Forgot password?</Link>
                        </FormHelperText>
                    </FormControl>
                    <Button
                         borderRadius={"md"}
                        type="submit"
                        variant="solid"
                        colorScheme="orange"
                        width="full"
                     >
                       Login
                    </Button>
                </Stack>
            </form>
        </Box>
    </Stack>
    <Box>
        New to us?{"  "}
        <Link  color={'orange'} href="/signup">
          Sign Up
        </Link>
      </Box>
      
   </Flex>
   <ToastContainer/>
    </>
        )}
    </>
    
   
   
  )
}

export default Login
