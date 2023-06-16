import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { setProfileLanguage } from '../slices/profileSlice';
const LanguageContext = React.createContext();
import { useDispatch } from 'react-redux';
export default function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const getStoredLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('WICAppLanguage');
        if (storedLanguage !== null) {
          setLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        } else {
          setLanguage('en');
        }
        setIsLoaded(true);
      } catch (error) {
        console.log('Error retrieving language:', error);
      }
    };
    getStoredLanguage();
  }, []);

  const updateLanguage = useCallback((newLanguage) => {
    //setLanguage(newLanguage);
    dispatch(setProfileLanguage(language));
    i18n.changeLanguage(newLanguage);
  }, [i18n]);

  if (!isLoaded) {
    // Render a loading state or skeleton UI while language is being loaded
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, updateLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const { language, updateLanguage } = React.useContext(LanguageContext);
  return { language, updateLanguage };
}
