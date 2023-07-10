import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../../Common/CustomTextInput';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateWicEbtNumber,
  validateBirthDate,
  validateZipCode,
} from '../../Common/FormValidation';
import CustomButton from '../../Common/CustomButton';
import { RegisterService } from '../../Services/apiService';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../../slices/loaderSlice';
import { useDispatch } from 'react-redux';
import { setEBTCardNumber, setProfileEmail, setProfileFullName, setToken } from '../../slices/profileSlice';
import Spinner from '../../Common/Spinner';
import DateConverter from '../../Common/DateConverter';
import { saveAuthDataToStorage } from '../../Services/AuthPersistence';
import { loginSuccess } from '../../slices/authSlice';

export default function Register({ route }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wicEbtNumber, setWicEbtNumber] = useState('61029690');
  const [birthDate, setBirthDate] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true)
  const { socialData, LoginType } = route.params;

  const handleWicEbtNumber = (text) => {
    if (text.length <= 16) {
      setWicEbtNumber(text)
    }
  }
  const handleZip = (text) => {
    if (text.length <= 5) {
      setZipCode(text)
    }
  }


  const handleRegister = async () => {
    setError(false);
    setServerError("");
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const confirmPasswordValid = validateConfirmPassword(password, confirmPassword);
    const wicEbtNumberValid = validateWicEbtNumber(wicEbtNumber);
    const birthDateValid = validateBirthDate(birthDate);
    const zipCodeValid = validateZipCode(zipCode);
    dispatch(setLoading(true))
    if (
      (socialData === null &&
        emailValid &&
        passwordValid &&
        confirmPasswordValid &&
        wicEbtNumberValid &&
        birthDateValid &&
        zipCodeValid) ||
      (socialData !== null &&
        wicEbtNumberValid &&
        birthDateValid &&
        zipCodeValid)
    ) {
      // All validations passed, submit registration
      try {
        setLoader(true);
        let socialEmail = '';
        let socialPassword = '';
        console.log('handleRegister', socialData)
        if (socialData !== null) {
          socialEmail = socialData?.user || socialData?.id;
          socialPassword = socialData?.authorizationCode || socialData?.id;
        }

        const response = await RegisterService(
          socialData !== null ? socialEmail : email,
          socialData !== null ? socialPassword : password,
          wicEbtNumber,
          birthDate,
          zipCode,
          nickName,
          LoginType
        );
        // Handle the successful response
        if (response.Status === 1) {
          dispatch(setProfileEmail(email));
          dispatch(setProfileFullName(`${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`));
          dispatch(setToken(response.ServiceResponse[0].Token));
          setLoader(false);
          if (socialData === null) {
            navigation.navigate('Confirmation');
          }
          else {
            console.log('[Register--response]', response.ServiceResponse)
            await saveAuthDataToStorage(
              response.ServiceResponse,
              (socialData?.user || socialData?.id),
              `${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`,
              response.ServiceResponse[0].Token
            );
            dispatch(loginSuccess(response.ServiceResponse));
            dispatch(setEBTCardNumber(wicEbtNumber));
          }
          navigation.goBack();
        }
        else {
          setServerError(response.ServiceResponse[0]?.Message);
        }
        // Perform any additional actions or update the UI accordingly
      } catch (error) {
        // Handle the error
        console.error('Registration failed', error);
        // Display an error message or perform any error handling logic
      }
      //6102969000571554
      //08/15/1998
      //32662

    } else {
      // Display error message for any invalid field
      setError(true);
    }
    setLoader(false);
    dispatch(setLoading(false))
  };


  return (<>
    <View>
      {loader ? <Spinner /> : null}
      <ScrollView className="mt-8">
        {error ? <Text className="rounded-md border w-4/5 bg-red-600 mx-auto p-3 text-white">{t('errorMessages.allRequiredFields')}</Text> : null}
        {serverError ? <Text className="rounded-md border w-4/5 bg-red-600 mx-auto p-3 text-white">{serverError}</Text> : null}
        {socialData === null ? <><CustomTextInput label={t('labels.emailAddress')} placeholder={t('TPH.PH_Email')} FieldType="Email" value={email} onChangeText={setEmail} validate={true} />
          <CustomTextInput label={t('labels.password')} placeholder={t('TPH.PH_Password')} FieldType="Password" value={password} onChangeText={setPassword} secureTextEntry={true} validate={true} />
          <CustomTextInput label={t('labels.confirmPassword')} placeholder={t('TPH.PH_ConfirmPassword')} FieldType="ConfirmPassword" value={confirmPassword} onChangeText={setConfirmPassword} passwordValue={password} secureTextEntry={true} validate={true} /></> : <CustomTextInput label={t('labels.socialID')} FieldType="ID" value={socialData?.user || socialData?.id} Disable={false} />}
        <CustomTextInput label={t('labels.wicEBTCardNumber')} placeholder="" FieldType="WicEbtNumber" value={wicEbtNumber} numericValue={true} onChangeText={handleWicEbtNumber} validate={true} />
        <DateConverter label={t('labels.ARBirthDate')} placeholder={t('TPH.PH_birthDay')} value={birthDate} onChangeText={setBirthDate} validate={true} formatDate="mm/dd/yyyy" />
        <CustomTextInput label={t('labels.ARMailingAddressZipCode')} placeholder={t('TPH.PH_AddressZip')} FieldType="ZipCode" numericValue={true} value={zipCode} onChangeText={handleZip} validate={true} />
        <CustomTextInput label={t('labels.nickname')} placeholder={t('TPH.PH_nickname')} FieldType="nickName" value={nickName} onChangeText={setNickName} />
        <CustomButton title={t('buttons.register')} CSSName="w-4/5 mx-auto mb-4" onPress={handleRegister} />
      </ScrollView>
    </View></>
  );
}
