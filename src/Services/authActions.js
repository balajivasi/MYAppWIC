// authActions.js

import { loginRequest, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { setLoading } from '../slices/loaderSlice';
import { setProfileEmail, setProfileFullName, setToken, setClearProfileData, setEBTCardNumber } from '../slices/profileSlice';
import axios from 'axios';
import getEnvVars from '../../config';
import { clearAuthDataFromStorage, saveAuthDataToStorage } from './AuthPersistence';
import DeviceInfo from 'react-native-device-info';

const envVars = getEnvVars();
const apiUrl = envVars.API_URL;
const APIToken = envVars.APIToken;

//LoginType: 1= email , 2 = fB, 3=Google, 4=Twi, 5= Apple,  9= PasswordMD5 ON server

export const loginUser = (credentials) => {
  console.log('[loginUser]--', credentials)
  return async (dispatch) => {
    try {
      dispatch(loginRequest());
      dispatch(setLoading(true))
      const LoginOptions = {
        LoginType: credentials.LoginType,
        LoginEmail: credentials.email,
        Password: credentials.password,
        LoginPassword: "UeoJrlixzQP03p3SFMgXFQ==",
        LoginID: credentials.email,
        APIToken: APIToken,
        PushToken: "1234",
        DeviceType: "1",
        OldPushToken: "1",
        OSVersion: DeviceInfo.getVersion(),
        DeviceModel: DeviceInfo.getModel(),
        Version: "3.0"
      }
      console.log('[LoginOptions]-----', LoginOptions)
      //an API request to authenticate the user
      const response = await axios.post(`${apiUrl}/login`, LoginOptions);
      if (response.data.Status === 1) {
        // Save the authentication data to AsyncStorage
        await saveAuthDataToStorage(
          response.data.ServiceResponse,
          credentials.email,
          `${response.data.ServiceResponse[0].FirstName} ${response.data.ServiceResponse[0].LastName}`,
          response.data.ServiceResponse[0].Token
        );
        //
        dispatch(setProfileEmail(credentials.email));
        dispatch(setProfileFullName(`${response.data.ServiceResponse[0].FirstName} ${response.data.ServiceResponse[0].LastName}`));
        dispatch(setToken(response.data.ServiceResponse[0].Token));
        dispatch(setEBTCardNumber(response.data.ServiceResponse[0].EBTCardNumber));
        // Dispatch the success action with the user data
        dispatch(loginSuccess(response.data.ServiceResponse));
      } else {
        console.log('[LoginOptions]', response.data)
        if (credentials.LoginType != 1 && response.data.ServiceResponse[0].Message === "Email address/Password didn't match with our system.") {
          dispatch(loginFailure('register'))
        } else {
          dispatch(loginFailure(response.data.ServiceResponse[0].Message));
        }

      }
      dispatch(setLoading(false))
    } catch (error) {
      // Dispatch the failure action with the error message
      dispatch(loginFailure(error.message));
      dispatch(setLoading(false))
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // Dispatch the logout action to clear the authentication state
    dispatch(logout());
    dispatch(setClearProfileData());
    clearAuthDataFromStorage();
    console.log('[logoutUser],Auth data removed successfully.');
  };
};

