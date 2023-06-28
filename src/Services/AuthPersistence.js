import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../slices/authSlice';
import { setProfileEmail, setProfileFullName, setToken, setProfileLanguage } from '../slices/profileSlice';

// Save authentication data to AsyncStorage
export const saveAuthDataToStorage = async (authData, email, fullName, Token) => {
  try {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; // Set expiration time to 30 minutes from the current time
    const dataToSave = {
      authData,
      email,
      fullName,
      token: Token,
      expirationTime,
    };

    await AsyncStorage.setItem('authData', JSON.stringify(dataToSave));
    console.log('Auth data saved successfully.');
  } catch (error) {
    console.log('Error saving auth data:', error);
  }
};

// Clear authentication data from AsyncStorage
export const clearAuthDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('authData');
    console.log('Auth data removed successfully.');
  } catch (error) {
    console.log('Error removing auth data:', error);
  }
};

// Retrieve authentication data from AsyncStorage
export const getAuthDataFromStorage = async () => {
  try {
    const storedData = await AsyncStorage.getItem('authData');
    if (storedData) {
      const data = JSON.parse(storedData);
      const expirationTime = data.expirationTime;

      if (expirationTime && expirationTime > new Date().getTime()) {
        return {
          authData: data.authData,
          email: data.email,
          fullName: data.fullName,
          token: data.token,
          language: data.language,
        };
      } else {
        await clearAuthDataFromStorage();
      }
    }
  } catch (error) {
    console.log('Error retrieving auth data:', error);
  }

  return null;
};

const AuthPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          dispatch(setProfileEmail(email));
        }
      } catch (error) {
        console.log('Error retrieving Email data:', error);
      }
    };

    const getFullNameFromStorage = async () => {
      try {
        const fullName = await AsyncStorage.getItem('fullName');
        if (fullName) {
          dispatch(setProfileFullName(fullName));
        }
      } catch (error) {
        console.log('Error retrieving Full Name data:', error);
      }
    };

    const getTokenFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.log('Error retrieving Token data:', error);
      }
    };

    const getLanguageFromStorage = async () => {
      try {
        const language = await AsyncStorage.getItem('WICAppLanguage') || 'en';
        dispatch(setProfileLanguage(language));
      } catch (error) {
        console.log('Error retrieving Language data:', error);
      }
    };

    const fetchAuthData = async () => {
      try {
        const authData = await getAuthDataFromStorage();
        if (authData?.authData) {
          dispatch(loginSuccess(authData));
        }

        getEmailFromStorage();
        getFullNameFromStorage();
        getTokenFromStorage();
        getLanguageFromStorage();
      } catch (error) {
        console.log('[AuthPersistence] Error fetching auth data:', error);
      }
    };

    fetchAuthData();
  }, [dispatch]);

  return null;
};

export default AuthPersistence;
