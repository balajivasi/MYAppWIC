import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, Alert, ScrollView, Dimensions } from "react-native";
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

export default function LoginPage({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.error);
  const { wccMobile, apple, google } = Util.LoginType;

  const [socialSuccess, setSocialSuccess] = useState(null);

  const handleLogin = () => {
    if (email && password) {
      const LoginType = wccMobile;
      dispatch(loginUser({ email, password, LoginType }));
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  const submitRegister = () => {
    navigation.push('Register', { socialData: socialSuccess });
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

  const { width } = Dimensions.get('window');
  const imageWidth = width * 0.5;
  const imageHeight = (imageWidth * 125) / 200;

  useEffect(() => {
    if (error === "Email address is Not Verified.") {
      dispatch(setProfileEmail(email));
      navigation.push('Confirmation');
    }
    if (error === "register") {
      submitRegister()
    }
  }, [error]);

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
          </View>
          <View className="flex-row justify-center">
            <CustomButton title="Sign In with Apple" CSSName="w-4/5 mx-auto" onPress={handleAppleSignIn} />
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
