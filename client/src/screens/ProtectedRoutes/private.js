import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getRoles } from '../../utils/api';

const PrivateRoute = () => {
    const [roles,setRoles] = useState()
    useEffect(() => {
        async function getRoleData() {
            const res = await getRoles()
            setRoles(res.data)
            console.log(res);
        }
        getRoleData()
    }, [])
    const state =JSON.parse(localStorage.getItem('store'))
    return state?.auth?.user?.roles.includes("admin")? <Outlet /> : <Navigate to={`${process.env.PUBLIC_URL}/sign-in`} replace />;
}

export default PrivateRoute