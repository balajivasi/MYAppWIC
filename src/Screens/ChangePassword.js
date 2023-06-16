import { View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomTextInput from '../Common/CustomTextInput';
import CustomButton from '../Common/CustomButton';
import ErrorText from '../Common/ErrorText';
import {
  validatePassword,
  validateConfirmPassword
} from '../Common/FormValidation';
import { ChangePasswordService } from '../Services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slices/loaderSlice';
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';

export default function ChangePassword({ navigation }) {

  const { t } = useTranslation();
  const user = useSelector(state => state.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch()

  const submitChangePass = async () => {
    dispatch(setLoading(true));
    const currentPasswordVal = validatePassword(currentPassword);
    const newPasswordVal = validatePassword(newPassword);
    const confirmPasswordValid = validateConfirmPassword(newPassword, confirmPassword);

    if (
      currentPasswordVal &&
      newPasswordVal &&
      confirmPasswordValid
    ) {
      try {
        const response = await ChangePasswordService(user.Token, currentPasswordVal, newPasswordVal);
        // Handle the successful response
        if (response.Status === 1) {
          Alert.alert('Password changed');
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
        console.error('Change Password failed', error);
        // Display an error message or perform any error handling logic
      }
    }
    else {
      Alert.alert('All fields are mandatory');
    }
    dispatch(setLoading(false));
  }
  useEffect(() => {
    console.log('change password..')
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("")
  }, [navigation]);

  return (
    <View className="mt-8">
      {serverError ? <ErrorText message={serverError} /> : null}
      <CustomTextInput label={t('labels.currentPassword')} placeholder="Enter Current Password" FieldType="currentPassword" value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={true} validate={true} />
      <CustomTextInput label={t('labels.newPassword')} placeholder="Enter New Password" FieldType="newPassword" value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} validate={true} />
      <CustomTextInput label={t('labels.confirmPassword')} placeholder="Enter Confirm Password" FieldType="ConfirmPassword" value={confirmPassword} onChangeText={setConfirmPassword} passwordValue={newPassword} secureTextEntry={true} validate={true} />
      <CustomButton title={t('buttons.changePassword')} CSSName="w-4/5 mx-auto mb-4" onPress={submitChangePass} />
    </View>
  )
}