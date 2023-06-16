import React, { useState } from 'react';
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
import { setProfileEmail, setProfileFullName, setToken } from '../../slices/profileSlice';
import Spinner from '../../Common/Spinner';

export default function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wicEbtNumber, setWicEbtNumber] = useState('6102969000571554');
  const [birthDate, setBirthDate] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true)

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
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      wicEbtNumberValid &&
      birthDateValid &&
      zipCodeValid
    ) {
      // All validations passed, submit registration
      try {
        setLoader(true);
        console.log('Registration successful');
        const response = await RegisterService(email, password, wicEbtNumber, birthDate, zipCode, nickName);
        // Handle the successful response
        console.log('Registration successful', response);
        if (response.Status === 1) {
          dispatch(setProfileEmail(email));
          dispatch(setProfileFullName(`${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`));
          dispatch(setToken(response.ServiceResponse[0].Token));
          setLoader(false);
          navigation.goBack();
          navigation.navigate('Confirmation');
        } else {
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

        <CustomTextInput label={t('labels.emailAddress')} placeholder="Enter Email Address" FieldType="Email" value={email} onChangeText={setEmail} validate={true} />
        <CustomTextInput label={t('labels.password')} placeholder="Enter Password" FieldType="Password" value={password} onChangeText={setPassword} secureTextEntry={true} validate={true} />
        <CustomTextInput label={t('labels.confirmPassword')} placeholder="Enter Confirm Password" FieldType="ConfirmPassword" value={confirmPassword} onChangeText={setConfirmPassword} passwordValue={password} secureTextEntry={true} validate={true} />
        <CustomTextInput label={t('labels.wicEBTCardNumber')} placeholder="" FieldType="WicEbtNumber" value={wicEbtNumber} numericValue={true} onChangeText={setWicEbtNumber} validate={true} />
        <CustomTextInput label={t('labels.ARBirthDate')} placeholder="Enter AR Birth Date in (mm/dd/yyyy) format" FieldType="BirthDate" value={birthDate} onChangeText={setBirthDate} validate={true} />
        <CustomTextInput label={t('labels.ARMailingAddressZipCode')} placeholder="Enter AR Mailing Address Zip Code" FieldType="ZipCode" numericValue={true} value={zipCode} onChangeText={setZipCode} validate={true} />
        <CustomTextInput label={t('labels.nickname')} placeholder="Enter Card Nickname (Optional)" FieldType="nickName" value={nickName} onChangeText={setNickName} />
        <CustomButton title={t('buttons.register')} CSSName="w-4/5 mx-auto mb-4" onPress={handleRegister} />
      </ScrollView>

    </View></>
  );
}
