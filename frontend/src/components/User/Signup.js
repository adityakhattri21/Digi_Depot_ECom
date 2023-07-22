import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, chakra , Link } from '@chakra-ui/react'
import  { FaLock, FaUserAlt  ,FaRegSmile } from 'react-icons/fa';
import "./Signup.css";
import {useDispatch,useSelector} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {register} from '../../actions/userAction';
import {ToastContainer ,toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaSmile = chakra(FaRegSmile);


const Signup = () => {

  const [showPassword , setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {error,loading,isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

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

if(isAuthenticated){
    navigate(`/account`)
}
},[error, isAuthenticated, navigate])


  const signupSubmit = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? <Loader/> : (
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
        <Heading color={'orange.200'} size={['md','xl']}>Create a Free Account Now</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
            <form>
                <Stack spacing={'4'} p={'1vmax'} background={'whiteAlpha.900'} boxShadow={'lg'}>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaSmile color='gray.300'/>} pointerEvents={'none'}/>
                            <Input type='text' required name='name' placeholder='Name' onChange={registerDataChange} />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaUserAlt color='gray.300'/>} pointerEvents={'none'}/>
                            <Input type='email' name='email' placeholder='Email Address' onChange={registerDataChange} required/>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaLock color={'gray.300'}/>} pointerEvents={'none'}/>
                            <Input type={showPassword ? "text":"password"} name='password' placeholder='Password' onChange={registerDataChange} required/>
                            <InputRightElement width="4.5rem">
                            <Button  h="1.75rem" size="sm" onClick={()=>setShowPassword(!showPassword)}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                    <Button
                         borderRadius={'md'}
                        type="submit"
                        variant="solid"
                        colorScheme="orange"
                        width="full"
                        onClick={signupSubmit}
                     >
                       Sign-Up
                    </Button>
                </Stack>
            </form>
        </Box>
    </Stack>
    <Box>
        Already Have An Account!{"  "}
        <Link  color={'orange'} href="/login">
          Login
        </Link>
      </Box>
   </Flex>
   <ToastContainer/>
        </>
      )}
    </>
  
  )
}

export default Signup
