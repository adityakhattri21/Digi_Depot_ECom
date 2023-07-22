import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {loading , user} = useSelector(state=>state.user)
  if(loading===false){
    if( loading === false && (!user || user.role !=='admin'))
    return <Navigate to="/login" replace/>
    else 
    return children
  }
   
}

export default ProtectedRoute
