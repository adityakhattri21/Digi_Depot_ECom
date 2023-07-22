import React from 'react';
import {TbError404} from "react-icons/tb";
import "./NoPage.css";

const NoPageElement = () => {
  return (
    <div className='noPage'>
      <div>
        <TbError404/>
        <p>Page Not Found</p>
      </div>
    </div>
  )
}

export default NoPageElement
