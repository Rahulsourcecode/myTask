import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const state = useSelector((state)=>state?.auth?.user)
    return state.type === "admin"|| state.roles.includes() ? <Outlet /> : <Navigate to='/' replace />;
}

export default PrivateRoute