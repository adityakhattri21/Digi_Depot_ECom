import React from 'react';
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import { Stack, VStack } from '@chakra-ui/react';
import "./Footer.css";

const Footer = () => {
  return (
    <Stack direction={'row'} className='footer' alignItems={['center']}>
        <VStack className='leftFooter' textAlign={['center']} >
            <h4>Download App</h4>
            <p>Download Our App and be the part of Trend.</p>
            <img src={playstore} alt="..." className='dimg'/>
            <img src={appstore} alt="..." className='dimg'/>
        </VStack>
        <VStack className='midFooter' textAlign={['center']} >
          <h1>Digi-Depot</h1>
          <h4>Suits Your Needs.</h4>
          <p>We Deliver on-time everytime.</p>
          <p>Copyright &copy; AdityaKhattri</p>
        </VStack>
        <VStack className='rightFooter' textAlign={['center']}>
        <h4>Follow Us</h4>
        <a href="http://instagram.com/thisisadityakhattri">Instagram</a>
        <a href="http://github.com/adityakhattri21">GitHub</a>
        <a href="http://linkedin.com/in/aditya-khattri">LinkedIn</a>
        </VStack>
    </Stack>
  );
}

export default Footer
