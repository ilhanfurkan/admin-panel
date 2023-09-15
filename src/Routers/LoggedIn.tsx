import React from 'react';
import { useAppSelector } from '../Store/hooks';
import { Outlet } from 'react-router-dom';
import Login from '../Views/Login';

const LoggedIn = () => {
    const jwt = useAppSelector((state) => state.loginReducer.jwt);
    const token = jwt ? jwt : localStorage.getItem('token');
    return token ? <Outlet /> : <Login />;
};

export default LoggedIn;
