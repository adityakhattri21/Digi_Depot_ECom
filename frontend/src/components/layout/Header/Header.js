import React from 'react'
import {Button, Drawer,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,HStack,VStack,useDisclosure} from "@chakra-ui/react"
import {HamburgerIcon, Search2Icon} from "@chakra-ui/icons"
import logo from "../../../images/logo.svg"
import { Link } from 'react-router-dom'



const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
<Button leftIcon={<HamburgerIcon/>} position={'fixed'} top={'4'} left={'4'} zIndex={'1'} colorScheme= 'orange'
onClick={onOpen} size={['xs','lg']}>
   Menu
</Button>
<Drawer isOpen={isOpen} placement='left' onClose={onClose}>
  <DrawerOverlay/>
  <DrawerContent>
    <DrawerCloseButton/>
    <DrawerHeader><img src={logo} alt="..."/></DrawerHeader>

    <VStack alignItems={'center'}>
            <Button variant={'ghost'} colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/"}>Home</Link>
            </Button>


            <Button variant={'ghost'} colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/products"}>Products</Link>
            </Button>

            <Button rightIcon={<Search2Icon/>} variant={'ghost'} colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/search"}>Search</Link>
            </Button>

            <Button variant={'ghost'} colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/cart"}>Cart</Link>
            </Button>

            <Button variant={'ghost'} colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/about"}>About Us</Link>
            </Button>
        </VStack>
    <HStack position={'absolute'} bottom={'10'} left={'0'} width={'full'} justifyContent={'space-evenly'}>
            <Button colorScheme='orange' onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/login"}>Log In</Link>
            </Button>

            <Button colorScheme='orange' variant={'outline'} onClick={onClose} fontFamily={'Roboto'}>
                <Link to={"/signup"}>Sign Up</Link>
            </Button>
        </HStack>
  </DrawerContent>
</Drawer>
    </>
    
  )
}

export default Header
