import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ url }) => {
    const state = JSON.parse(localStorage.getItem('store'))
    const lastPart = url.substr(url.lastIndexOf('/') + 1)
    return state?.auth?.user ? state?.auth?.permissions?.includes(lastPart) ? <Outlet /> : <Navigate to={`${process.env.PUBLIC_URL}/page-404`} replace /> : <Navigate to={`${process.env.PUBLIC_URL}/sign-in`} replace />
}

export default PrivateRoute