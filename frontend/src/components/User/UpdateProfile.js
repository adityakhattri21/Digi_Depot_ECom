import React, { useEffect, useState } from 'react'
import { Button,  FormControl,  Input, InputGroup, InputLeftElement,  chakra} from '@chakra-ui/react'
import  { FaRegSmile, FaUserAlt } from 'react-icons/fa';
import { loadUsers, updateUser} from "../../actions/userAction";
import {useDispatch , useSelector} from 'react-redux';
import {ToastContainer ,toast} from "react-toastify";
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import "./UpdateProfile.css"

const UpdateProfile = () => {

    const CFaSmile = chakra(FaRegSmile);
    const CFaUserAlt = chakra(FaUserAlt);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state=>state.user)
    const {error,isUpdated,loading} = useSelector(state=>state.profile)

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    useEffect(()=>{

        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
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
          
          dispatch({ type: UPDATE_USER_RESET });
          navigate('/account');
        }, 6000);
  
        return () => clearTimeout(timeout); //read more on this
      }  
      },[dispatch, error, isUpdated, navigate, user])
      
      
        const updateSubmit = async (e)=>{
          e.preventDefault();
      
          const myForm = new FormData();
      
          myForm.set("name", name);
          myForm.set("email", email);
          myForm.set("avatar", avatar);
          dispatch(updateUser(myForm));
          
        }
      
        const registerDataChange = (e) => {
        
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
            reader.readAsDataURL(e.target.files[0]);
        };
  return (
    <>
    
        {loading ? <Loader/> :
        <>
        <MetaData title={`${user.name}'s Profile`}/>
        <div className='uprofileContainer'>
        <div>
            <h1 className='heading'>Update Profile</h1>
            <img src={avatarPreview} alt='User'/>
        </div>
        <div>
        <form>
            <div>
                <h4>Name</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaSmile color='gray.300'/>} pointerEvents={'none'}/>
                            <Input type='text' className='input'  name='name' placeholder='Name' onChange={(e)=>setName(e.target.value)} defaultValue={name}/>
                        </InputGroup>
                    </FormControl>
            </div>
            <div>
                <h4>Email</h4>
                <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<CFaUserAlt color='gray.300'/>} pointerEvents={'none'}/>
                            <Input className='input' type='email' name='email' placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)} defaultValue={email}/>
                        </InputGroup>
                    </FormControl>
            </div>
            <div id="registerImages">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
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

export default UpdateProfile;
