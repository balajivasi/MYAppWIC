import { View, Alert, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../Common/CustomButton';
import CustomTextInput from '../../Common/CustomTextInput';
import {
  validateWicEbtNumber,
  validateBirthDate,
  validateZipCode,
} from '../../Common/FormValidation';
import { AddAccountService, VerifyAccountService } from '../../Services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import ErrorText from '../../Common/ErrorText';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import DateConverter from '../../Common/DateConverter';

const AddCard = ({ navigation, route }) => {
  const { Card, PageTitle, isVerify } = route.params;
  const { t } = useTranslation();
  const Token = useSelector(state => state.user.Token);
  const [serverError, setServerError] = useState('');
  const [wicEbtNumber, setWicEbtNumber] = useState('6102969');
  const [birthDate, setBirthDate] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [nickName, setNickName] = useState('');
  const dispatch = useDispatch();
  const submitCard = async () => {
    const wicEbtNumberValid = validateWicEbtNumber(wicEbtNumber);
    const birthDateValid = validateBirthDate(birthDate);
    const zipCodeValid = validateZipCode(zipCode);
    if (
      wicEbtNumberValid &&
      birthDateValid &&
      zipCodeValid
    ) {

      if (isVerify) {
        try {
          // OldEBTCard,wicEbtNumber, birthDate, zipCode, Token
          const response = await VerifyAccountService(Card, wicEbtNumber, birthDate, zipCode, Token);
          // Handle the successful response
          if (response?.Status === 1) {
            Alert.alert('Success', 'Account Verified Successfully', [{ text: 'OK', onPress: closeAddCard }]);
          } else {
            setServerError(response.ServiceResponse[0]?.Message);
            try {
              await handleInvalidWICAccount(response, dispatch);
            } catch (error) {
              console.log('handleInvalidWICAccount failed.', error)
            }
          }
          // Perform any additional actions or update the UI accordingly
        } catch (error) {
          // Handle the error
          console.error('Registration failed', error);
          // Display an error message or perform any error handling logic
        }
      } else {
        try {
          const response = await AddAccountService(wicEbtNumber, birthDate, zipCode, nickName, Token);
          // Handle the successful response
          if (response?.Status === 1) {
            Alert.alert('Success', 'EBT Card added successfully', [{ text: 'OK', onPress: closeAddCard }]);
          } else {
            setServerError(response.ServiceResponse[0]?.Message);
          }
          // Perform any additional actions or update the UI accordingly
        } catch (error) {
          // Handle the error
          console.error('Registration failed', error);
          // Display an error message or perform any error handling logic
        }
      }

    }
  }

  const closeAddCard = () => {
    /*if (typeof closeModal === 'function') {
      closeModal();
    }*/
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      title: PageTitle,
    });
  }, [PageTitle]);


  return (
    <View className="min-h-full">
      <ScrollView className="mt-10">
        {serverError ? <ErrorText message={serverError} /> : null}
        <CustomTextInput label={t('labels.wicEBTCardNumber')} placeholder="" FieldType="WicEbtNumber" value={wicEbtNumber} numericValue={true} onChangeText={setWicEbtNumber} validate={true} />
        <DateConverter label={t('labels.ARBirthDate')} placeholder="Enter AR Birth Date in (mm/dd/yyyy) format" FieldType="BirthDate" value={birthDate} onChangeText={setBirthDate} validate={true} />
        <CustomTextInput label={t('labels.ARMailingAddressZipCode')} placeholder="Enter AR Mailing Address Zip Code" FieldType="ZipCode" numericValue={true} value={zipCode} onChangeText={setZipCode} validate={true} />
        {!isVerify ? <CustomTextInput label={t('labels.nickname')} placeholder="Enter Card Nickname (Optional)" FieldType="nickName" value={nickName} onChangeText={setNickName} /> : null}
      </ScrollView>
      <CustomButton title={isVerify ? t('buttons.verifyCard') : t('buttons.confirm')} CSSName="w-4/5 mx-auto" onPress={() => submitCard()} />
    </View>
  )
}

export default AddCard 