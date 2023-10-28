import React from 'react';
import { useGlobalContex } from './useGlobalContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivetRoute = () => {
    const { user } = useGlobalContex()
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivetRoute;
