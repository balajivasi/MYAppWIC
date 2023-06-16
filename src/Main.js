import React from 'react';
import { useSelector } from 'react-redux';
import LoginStackNav from './Routes/LoginStack';
import FLDrawer from './Routes/Drawer';

function Main() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn) {
        return <FLDrawer />;
    }
    else {
        return <LoginStackNav />;
    }
}

export default Main