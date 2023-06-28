import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { TextInput } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import CustomButton from '../Common/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { FeedbackService } from '../Services/apiService'
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount'

export default function Feedback() {
  const { t } = useTranslation();
  const Token = useSelector(state => state.user.Token);
  const [catType, setCatType] = useState();
  const [comments, setComments] = useState();
  const [feedbackSuccess, setFeedbackSuccess] = useState([]);
  const dispatch = useDispatch();

  const SaveFeedback = async () => {
    if (catType === undefined || catType === "") {
      Alert.alert(t('errorMessages.selectReason'));
      return false;
    }
    if (comments === undefined) {
      Alert.alert(t('errorMessages.descriptionReq'));
      return false;
    }

    try {
      const response = await FeedbackService(Token, catType, comments);
      console.log(response)
      if (response.Status === 1) {
        setFeedbackSuccess(response.ServiceResponse[0].Message);
        setComments();
        setCatType();
      } else {
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Feedback Failed', error);
    }
  }
  return (
    <View className="flex-col h-screen w-5/5 mt-6">
      {feedbackSuccess ? <Text className="text-base w-screen text-center">{feedbackSuccess}</Text> : null}
      <View className="flex-col">
        <Text className="text-center text-2xl">{t('labels.reason')}</Text>
        <Picker selectedValue={catType} onValueChange={setCatType}>
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="New Feature" value="New Feature" />
          <Picker.Item label="Existing Feature" value="Existing Feature" />
          <Picker.Item label="Suggestion" value="Suggestion" />
          <Picker.Item label="Complaint" value="Complaint" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      <View className="flex-col">
        <Text className="text-lg text-center">{t('labels.description')}</Text>
        <Text className="text-md text-center">({t('InfoMessages.maxAllowedCharacters')}- {comments?.length > 0 && `${comments.length}/`}500) </Text>
        <TextInput multiline className="rounded-lg border-y border-x border-cyan-950 px-4 h-40 m-5 pb-1 text-xl" value={comments} onChangeText={setComments} maxLength={500} />
      </View>
      <CustomButton title={t('buttons.save')} CSSName="w-4/5 mx-auto mb-4" onPress={SaveFeedback} />
    </View>
  )
}