import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, Alert, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import Footer from "../../Common/Footer";
import CustomTextInput from '../../Common/CustomTextInput';
import CustomButton from '../../Common/CustomButton';
import { loginUser } from "../../Services/authActions";

import { useDispatch, useSelector } from 'react-redux';
import ErrorText from "../../Common/ErrorText";
import { setProfileEmail } from "../../slices/profileSlice";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Util from '../../Common/Util';
import { googleIOSClientID, webClientId } from '../../../env'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


export default function LoginPage({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginTypeID, setLoginTypeID] = useState(1)
  const error = useSelector((state) => state.auth.error);
  const { wccMobile, apple, google } = Util.LoginType;

  const [socialSuccess, setSocialSuccess] = useState(null);

  const handleLogin = () => {
    if (email && password) {
      const LoginType = wccMobile;
      dispatch(loginUser({ email, password, LoginType }));
    } else {
      Alert.alert('Error', t('errorMessages.LoginEmailPass'));
    }
  };

  const submitRegister = () => {
    navigation.push('Register', { socialData: socialSuccess, LoginType: loginTypeID });
  };

  const submitForgotPass = () => {
    navigation.push('ForgotPassword');
  };
  // 1
  const handleAppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        // Handle the response
        const { authorizationCode, user } = appleAuthRequestResponse;
        setSocialSuccess(appleAuthRequestResponse)
        const LoginType = apple;
        setLoginTypeID(apple)
        const email = user;
        const password = authorizationCode;
        dispatch(loginUser({ email, password, LoginType }));
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('handleAppleSignIn-canceled')
        // User cancelled the sign-in request
      } else {
        // Handle other error cases
        console.log('Apple Sign-In error:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Access user information from the `userInfo` object

      const { authorizationCode, user } = userInfo;
      setSocialSuccess(userInfo?.user)
      const LoginType = google;
      setLoginTypeID(google)
      const email = user.id;
      const password = user.id;
      dispatch(loginUser({ email, password, LoginType }));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in request
        console.log('SIGN_IN_CANCELLED')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Another sign-in operation is already in progress
        console.log('IN_PROGRESS')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services are not available on the device
        console.log('PLAY_SERVICES_NOT_AVAILABLE')
      } else {
        // Handle other error cases
        console.log('Google Sign-In error:', error);
      }
    }
  };


  const { width } = Dimensions.get('window');
  const imageWidth = width * 0.5;
  const imageHeight = (imageWidth * 125) / 250;

  useEffect(() => {
    if (error === "Email address is Not Verified.") {
      dispatch(setProfileEmail(email));
      navigation.push('Confirmation');
    }
    if (error === "register") {
      submitRegister()
    }
  }, [error]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
      iosClientId: googleIOSClientID,
    });
  }, [])

  return (
    <SafeAreaView>
      <View className="min-h-full">
        <ScrollView>
          <Image className="mx-auto my-5" source={require("../../../assets/Images/EbtCard.jpg")} style={{ width: imageWidth, height: imageHeight }} resizeMode="contain" />
          <View>
            {error != null && error !== 'register' ? <ErrorText message={error} /> : null}
            <CustomTextInput label={t('labels.emailAddress')} placeholder={t('TPH.PH_Email')} value={email} FieldType='Email' onChangeText={setEmail} validate={true} />
            <CustomTextInput label={t('labels.password')} secureTextEntry={true} placeholder={t('TPH.PH_Password')} FieldType='Password' value={password} onChangeText={setPassword} validate={true} />
            <CustomButton title={t('buttons.login')} CSSName="w-4/5 mx-auto" onPress={handleLogin} />
            <View className="flex-row justify-around">
              <TouchableOpacity className="flex-row" onPress={handleGoogleSignIn} style={{ alignItems: 'center' }}>
                <Image source={require('../../../assets/Images/google.png')} style={{ width: 30, height: 30 }} />
                <Text className="text-base">{t('labels.googleSignIn')}</Text>
              </TouchableOpacity>
              {appleAuth.isSupported && <TouchableOpacity onPress={handleAppleSignIn} className="flex-row" style={{ alignItems: 'center' }}>
                <Image source={require('../../../assets/Images/Apple.png')} style={{ width: 30, height: 30 }} />
                <Text className="text-base">{t('labels.appleSignIn')}</Text>
              </TouchableOpacity>}
            </View>
          </View>
        </ScrollView>
        <View className="flex-row justify-center">
          <CustomButton title={t('buttons.register')} CSSName="w-2/5" onPress={submitRegister} />
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <CustomButton title={t('buttons.forgotPassword')} CSSName="w-2/5" onPress={submitForgotPass} />
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
