import React, { useContext } from 'react'
import { Context } from '../context/GlobalContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    
    const { isAuth } = useContext(Context)
    const location = useLocation()

    if(isAuth && location.pathname.includes('auth'))
    {
        return <Navigate to={`/`} replace />;
    }

    if(!isAuth && location.pathname.includes('user'))
    {
        return <Navigate to={`/auth/login`} replace />;
    }
 
    return children
}

export default ProtectedRoutes