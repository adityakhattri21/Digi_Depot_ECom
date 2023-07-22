import React, { useState } from 'react';
import { Box, IconButton, Icon, Button, Tooltip } from '@chakra-ui/react';
import { MdExitToApp, MdShoppingCart, MdPerson, MdDashboard ,MdGrading} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch ,useSelector} from "react-redux"
import { logoutUser } from '../../../actions/userAction';

const UserOption = ({user}) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const {cartItems} = useSelector(state=>state.cart)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function profile(){
    navigate("/account")
  }

  function cart(){
    navigate("/cart")
  }

  function logout(){
    
    toast.success("Logged Out Successfully", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      dispatch(logoutUser());
  }

  function dashboard(){
    navigate("/admin/dashboard");
  }

  function order(){
    navigate("/orders")
  }

  const options = [
    { icon: MdPerson, label: 'Profile', func: profile },
    { icon: MdShoppingCart, label: `Cart(${cartItems.length})`, func: cart },
    { icon: MdGrading, label: 'Orders', func: order },
    { icon: MdExitToApp, label: 'Logout', func: logout },
  ];

  if(user.role==='admin'){
    options.unshift(    { icon: MdDashboard, label: 'Dashboard', func: dashboard },)
  }

  return (
    <Box position="fixed" top={6} right={2} zIndex={1}>
      <Button
        size="lg"
        colorScheme="orange"
        onClick={handleToggle}
        zIndex={isOpen ? 'unset' : 'overlay'}
        position="relative"
        borderRadius={'100%'}
        width={['32px','64px']}
        height={['48px','64px']}
        backgroundImage={`url(${user.avatar.url})`}
        backgroundSize="cover"
        backgroundPosition="center"
        variant={'link'}
        boxShadow={isOpen?'dark-lg':'none'}
      >
      </Button>
      {isOpen && (
        <Box position="absolute" marginBottom={'10px'} top={[12,16]} right={2} display="flex" flexDir={'column'} justifyContent="center" gap={2}>
        {options.map((option) => (
            <Tooltip key={option.label} label={option.label} placement="left" >
                <IconButton
                  key={option.label}
                  icon={<Icon as={option.icon} />}
                  aria-label={option.label}
                  variant="ghost"
                  onClick={option.func}
                />
                </Tooltip>
              ))}
          </Box>
      )}
      <ToastContainer/>
    </Box>
  );
};

export default UserOption;
