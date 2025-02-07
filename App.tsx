import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import LanguageProvider from './src/Context/LanguageProvider';
import AuthPersistence from './src/Services/AuthPersistence';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Main from './src/Main';
import Spinner from './src/Common/Spinner';
//import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    //SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AuthPersistence />
      <NavigationContainer>
        <LanguageProvider>
          <Main />
        </LanguageProvider>
      </NavigationContainer>
      <Spinner />
    </Provider>
  );
}
