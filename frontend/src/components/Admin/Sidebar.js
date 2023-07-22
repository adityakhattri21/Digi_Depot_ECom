import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/logo.svg";
import { MdDashboard,MdGrading, MdOutlineHome, MdPerson, MdReviews } from 'react-icons/md';
import TreeView, { flattenTree } from "react-accessible-treeview";
import { IoMdArrowDropright } from "react-icons/io";
import {AiOutlinePlus,AiOutlineUnorderedList} from "react-icons/ai"
import "./Sidebar.css";

const Sidebar = () => {
    const ArrowIcon = ({ isOpen}) => {
        let dir;
        if(isOpen){
            dir='open'
        }
        else{
            dir ='closed'
        }
        return <IoMdArrowDropright className={`arrow-${dir}`} />;
      };
    const folder = {
        name:"",
        children:[
            {
                name:"Products",
                children:[
                    {name:<Link to={"/admin/products"} className='treeLink'><AiOutlineUnorderedList className='icon'/>All</Link>},
                    {name:<Link to={"/admin/product/create"} className='treeLink'><AiOutlinePlus className='icon'/>Create</Link>}
                ]
            }
        ]

    }

    const data = flattenTree(folder);
    const onSelect = (props) => console.log(props);

  return (
    <div className='sidebar'>
     <Link to={"/"}> 
        <img src={logo} alt="Digi-Depot" className='logo'/>
    </Link>
    <div className='options'>

    <Link to={"/"}>
        <p>
            <MdOutlineHome className='icon'/>Home
        </p>
    </Link>

    <Link to={"/admin/dashboard"}>
        <p>
            <MdDashboard className='icon'/>Dashboard
        </p>
    </Link>
    
    

     <Link to={"/admin/orders"}>
        <p>
            <MdGrading className='icon'/>Orders
        </p>
    </Link>

    <Link to={"/admin/users"}>
        <p>
            <MdPerson className='icon'/>Users
        </p>
    </Link>

    <div className='tree'>
      <TreeView
        data={data}
        aria-label="Checkbox tree"
        multiSelect
        propagateSelectUpwards
        onSelect={onSelect}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          level,
          handleExpand
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{ marginLeft: 20 * (level - 1) }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
              <span>{element.name}</span>
            </div>
          );
        }}
      />
    </div>

    <Link to={"/admin/reviews"}>
      <p>
        <MdReviews className='icon'/>Reviews
      </p>
    </Link>
    </div>
    </div>
  )
}

export default Sidebar
