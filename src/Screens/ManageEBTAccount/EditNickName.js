import { View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from '../../Common/CustomTextInput';
import CustomButton from '../../Common/CustomButton';
import { UpdateNickNameService } from '../../Services/apiService';
import ErrorText from '../../Common/ErrorText';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';

const EditNickName = ({ navigation }) => {
  const { t } = useTranslation();
  const [nickName, setNickName] = useState('');
  const [serverError, setServerError] = useState('');
  const Token = useSelector((state) => state.user.Token);
  const route = useRoute();
  const { Card } = route.params;
  const dispatch=useDispatch()
  const closeNickname = () => {
    // if (typeof closeModal === 'function') {
    //   closeModal();
    // }
    navigation.goBack();
  }

  const clickSaveNickname = async () => {
    try {
      const response = await UpdateNickNameService(Token, Card, nickName);
      if (response?.Status === 1) {
        Alert.alert('Success', 'EBT Card Nickname Updated successfully', [
          { text: 'OK', onPress: closeNickname },
        ]);
      } else {
        setServerError(response.ServiceResponse[0]?.Message);
        try {
          await handleInvalidWICAccount(response,dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.',error)
        }
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };



  return (
    <View className="min-h-full">
      { serverError? <ErrorText message={serverError} /> : null}
      <ScrollView className="mt-10">
        <CustomTextInput label={t('labels.wicEBTCardNumber')} FieldType="WicEbtNumber" value={Card} numericValue={true} Disable={false} />
        <CustomTextInput label={t('labels.nickname')} placeholder="Enter Card Nickname" FieldType="nickName" value={nickName} onChangeText={setNickName} />
      </ScrollView>
      <CustomButton title={t('buttons.updateNickname')} CSSName="w-4/5 mx-auto" onPress={clickSaveNickname} />
    </View>
  );
};

export default EditNickName;
