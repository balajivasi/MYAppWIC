import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";
import authReducer from '../slices/authSlice';
import loaderReducer from '../slices/loaderSlice';

export const store=configureStore({
    reducer:{
        user:profileReducer,
        auth: authReducer,
        loader:loaderReducer
    }
})