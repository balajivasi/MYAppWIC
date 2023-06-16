import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../../Common/CustomTextInput';
export default function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [emailValidError, setEmailValidError] = useState('');
  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('email address must be enter');
    } else if (reg.test(val) === false) {
      setEmailValidError('enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const submitForgotPass = () => {
    Alert.alert('Forgot password submitted')
  }

  const randomViews = [
      <CustomTextInput key="1" label={t('labels.wicEBTCardNumber')} placeholder='' value='6102969' />,
      <CustomTextInput key="2" label={t('labels.ARBirthDate')} placeholder='Enter AR Birth Datein (mm/dd/yyyy) format' />,
      <CustomTextInput key="3" label={t('labels.ARMailingAddressZipCode')} placeholder='Enter AR Mailing Address Zip Code' />
  ];
  const randomView = randomViews[Math.floor(Math.random() * randomViews.length)];


  return (
    <View className="mt-8">
      {emailValidError ? <Text className="rounded-xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-4/5 mx-auto">{emailValidError}</Text> : null}
      
      <CustomTextInput label={t('labels.emailAddress')} placeholder='Enter Email Address' onChangeText={value => { setEmail(value); handleValidEmail(value); }} />

      {randomView}
      <TouchableOpacity
        className="bg-orange-400 w-4/5 mx-auto mb-5 mt-3 rounded-lg p-3 "
        onPress={() => submitForgotPass()}
      >
        <Text className="text-center text-white text-lg">{t('buttons.submit')}</Text>
      </TouchableOpacity>
    </View>
  )
}