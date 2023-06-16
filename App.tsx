import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import LanguageProvider from './src/Context/LanguageProvider';
import AuthPersistence from './src/Services/AuthPersistence';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import Main from './src/Main';
import Spinner from './src/Common/Spinner';
export default function App() {
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
