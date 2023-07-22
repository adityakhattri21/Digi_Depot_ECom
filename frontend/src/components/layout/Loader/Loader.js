import React from 'react';
import {Spinner} from "@chakra-ui/react"
import "./Loader.css";

const Loader = () => {
  return (
    <div className='loading'>
        <Spinner color='red.500' size={'xl'} emptyColor='gray.200'/>
    </div>
    
  )
}

export default Loader
