import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginStackNav from './Routes/LoginStack';
import FLDrawer from './Routes/Drawer';
import { logout } from './slices/authSlice';

function Main() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLoggedIn && user.Token === null && user.EBTCardNumber === null) {
            dispatch(logout());
        }
    }, [user, isLoggedIn])
    if (isLoggedIn) {
        return <FLDrawer />;
    }
    else {
        return <LoginStackNav />;
    }
}

export default Main