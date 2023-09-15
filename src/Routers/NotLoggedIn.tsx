import React from 'react';
import { useAppSelector } from '../Store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const NotLoggedIn = () => {
    const jwt = useAppSelector((state) => state.loginReducer.jwt);
    const token = jwt ? jwt : localStorage.getItem('token');
    return token ? <Navigate to="/" /> : <Outlet />;
};

export default NotLoggedIn;
