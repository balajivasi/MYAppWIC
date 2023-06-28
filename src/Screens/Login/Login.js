import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, Alert, ScrollView, Dimensions } from "react-native";
import { useTranslation } from 'react-i18next';
import Footer from "../../Common/Footer";
import CustomTextInput from '../../Common/CustomTextInput';
import CustomButton from '../../Common/CustomButton';
import { loginUser } from "../../Services/authActions";

import { useDispatch, useSelector } from 'react-redux';
import ErrorText from "../../Common/ErrorText";


export default function LoginPage({ navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.error)
  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser({ email, password }));
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };
  const submitRegister = () => {
    navigation.push('Register');
  };
  const submitForgotPass = () => {
    navigation.push('ForgotPassword');
  };
  const { width } = Dimensions.get('window');
  const imageWidth = width * 0.5;
  const imageHeight = (imageWidth * 125) / 200;

  return (
    <SafeAreaView>
      <View className="min-h-full">
        <ScrollView>
          <Image className="mx-auto my-5" source={require("../../../assets/Images/EbtCard.jpg")} style={{ width: imageWidth, height: imageHeight }} resizeMode="contain" />
          <View>
            {error != null ? <ErrorText message={error} /> : null}
            <CustomTextInput label={t('labels.emailAddress')} placeholder={t('TPH.PH_Email')} value={email} FieldType='Email' onChangeText={setEmail} validate={true} />
            <CustomTextInput label={t('labels.password')} secureTextEntry={true} placeholder={t('TPH.PH_Password')} FieldType='Password' value={password} onChangeText={setPassword} validate={true} />
            <CustomButton title={t('buttons.login')} CSSName="w-4/5 mx-auto" onPress={handleLogin} />
          </View>
        </ScrollView>
        <View className="flex-row justify-center">
          <CustomButton title={t('buttons.register')} CSSName="w-2/5" onPress={submitRegister} /><Text>&nbsp;&nbsp;&nbsp;</Text>
          <CustomButton title={t('buttons.forgotPassword')} CSSName="w-2/5" onPress={submitForgotPass} />
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
}
