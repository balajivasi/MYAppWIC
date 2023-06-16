import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, Alert, ScrollView } from "react-native";
import { useTranslation } from 'react-i18next';
import Footer from "../../Common/Footer";
import CustomTextInput from '../../Common/CustomTextInput';
import CustomButton from '../../Common/CustomButton';
import { loginUser } from "../../Services/authActions";

import { useDispatch } from 'react-redux';


export default function LoginPage({ navigation }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <SafeAreaView>
      <View className="min-h-full">
        <ScrollView>
          <Image className="mx-auto my-5" source={require("../../../assets/Images/EbtCard.jpg")} style={{ width: 200, height: 125 }} />
          <View className="mt-10">
            <CustomTextInput label={t('labels.emailAddress')} placeholder='Enter Email Address' value={email} FieldType='Email' onChangeText={setEmail} validate={true} />
            <CustomTextInput label={t('labels.password')} secureTextEntry={true} placeholder='Enter Password' FieldType='Password' value={password} onChangeText={setPassword} validate={true} />
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
