
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../slices/authSlice';
import { setProfileEmail, setProfileFullName, setToken,setProfileLanguage } from '../slices/profileSlice';

// Save authentication data to AsyncStorage
export const saveAuthDataToStorage = async (authData, email, fullName,Token) => {
  try {
    await AsyncStorage.setItem('authData', JSON.stringify(authData));
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('fullName', fullName);
    await AsyncStorage.setItem('token',Token)
    console.log('Auth data saved successfully.');
  } catch (error) {
    console.log('Error saving auth data:', error);
  }
};

// Clear authentication data from AsyncStorage
export const clearAuthDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('authData');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('fullName');
    await AsyncStorage.removeItem('token')
    console.log('Auth data removed successfully.');
  } catch (error) {
    console.log('Error removing auth data:', error);
  }
};

// Retrieve authentication data from AsyncStorage
export const getAuthDataFromStorage = async () => {
  try {
    const authDataString = await AsyncStorage.getItem('authData');
    const email = await AsyncStorage.getItem('email');
    const fullName = await AsyncStorage.getItem('fullName');
    const token = await AsyncStorage.getItem('token');
    const authData = JSON.parse(authDataString);
    const language = await AsyncStorage.getItem('WICAppLanguage');
    return {
      authData,
      email,
      fullName,
      token,
      language
    };
  } catch (error) {
    console.log('Error retrieving auth data:', error);
    return null;
  }
};

const AuthPersistence = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const authData = await getAuthDataFromStorage();
        if (authData.authData !== null) {
          dispatch(loginSuccess(authData));
        }
        const email = await getEmailFromStorage();
        if (email) {
          dispatch(setProfileEmail(email));
        }
        const fullName = await getFullNameFromStorage();
        if (fullName) {
          dispatch(setProfileFullName(fullName));
        }
        const token = await getTokenFromStorage();
        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.log('[AuthPersistence] Error fetching auth data:', error);
      }
    };

    fetchAuthData();
  }, [dispatch]);

  return null;
};

const getEmailFromStorage = async () => {
  try {
    const emailDataString = await AsyncStorage.getItem('email');
    return emailDataString ? emailDataString : null;
  } catch (error) {
    console.log('Error retrieving Email data:', error);
    return null;
  }
};

const getFullNameFromStorage = async () => {
  try {
    const fullNameDataString = await AsyncStorage.getItem('fullName');
    return fullNameDataString ? fullNameDataString : null;
  } catch (error) {
    console.log('Error retrieving Full Name data:', error);
    return null;
  }
};

const getTokenFromStorage = async () =>{
  try {
    const tokenDataString = await AsyncStorage.getItem('token');
    return tokenDataString ? tokenDataString : null;
  } catch (error) {
    console.log('Error retrieving Full Name data:', error);
    return null;
  }
}
const getLanguageFromStorage = async () =>{
  try {
    const languageDataString = await AsyncStorage.getItem('WICAppLanguage');
    return languageDataString ? languageDataString : 'en';
  } catch (error) {
    console.log('Error retrieving Full Name data:', error);
    return null;
  }
}


export default AuthPersistence;
