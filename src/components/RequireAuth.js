import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../context/auth'

const RequireAuth = ({children}) => {
    const auth = useAuth()
    if(auth.user.email===''){
        return <Navigate to='/' />
    }
  return children
}

export default RequireAuth