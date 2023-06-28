import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../Common/CustomButton';
import CustomTextInput from '../../Common/CustomTextInput';
import { useTranslation } from 'react-i18next';
import { saveAuthDataToStorage } from '../../Services/AuthPersistence';
import { setEBTCardNumber, setProfileEmail, setProfileFullName, setToken } from '../../slices/profileSlice';
import { loginSuccess } from '../../slices/authSlice';
import { ResentOTP, ValidateOTP } from '../../Services/apiService';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';

const Confirmation = () => {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(180); // 30 seconds
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)

  const submitVerifyCode = async () => {
    setServerError('');
    try {
      setLoader(true);
      const response = await ValidateOTP(user.email, user.Token, confirmCode);
      if (response.Status === 1) {
        await saveAuthDataToStorage(
          response.ServiceResponse,
          user.email,
          `${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`,
          response.ServiceResponse[0].Token
        );
        dispatch(setProfileEmail(user.email));
        dispatch(setProfileFullName(`${response.ServiceResponse[0].FirstName} ${response.ServiceResponse[0].LastName}`));
        dispatch(setToken(response.ServiceResponse[0].Token));
        dispatch(loginSuccess(response.ServiceResponse));
        dispatch(setEBTCardNumber(response.data.ServiceResponse[0].EBTCardNumber))
      } else {
        setServerError(response.ServiceResponse[0].Message);
      }
    } catch (error) {
      console.error('Verify OTP failed', error);
    }
    setLoader(false)
  };

  const submitResend = async () => {
    setServerError('');

    try {
      setLoader(true);
      const response = await ResentOTP(user.email, user.Token);
      if (response.Status === 1) {
        setServerSuccess(response.ServiceResponse[0].Message);
        setResendTimer(180); // Reset the timer to 180 seconds
        setResendDisabled(true); // Disable the button during the timer
        startResendTimer();
      } else {
        setServerError(response.ServiceResponse[0].Message);
      }
    } catch (error) {
      console.error('Resend OTP Failed', error);
    }
    setLoader(false)
  };

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(timer);
          setResendDisabled(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    startResendTimer()
  }, [])

  return (<><View className="flex-1">
    {loader ? <View className="min-h-screen absolute justify-center text-center min-w-full bg-black z-50 opacity-25" >
      <ActivityIndicator size="large" color="red" />
    </View> : null}
    <View className="w-4/5 mx-auto">
      {serverError ? (
        <Text className="rounded-md border w-4/5 bg-red-600 mx-auto p-3 text-white">{serverError}</Text>
      ) : null}
      <Text className="text-3xl text-center my-4 text-gray-400">{t('headings.confirm')}</Text>
      <Text className="text-lg">{t('pageText.confirmPage')}</Text>

      <CustomTextInput label={t('labels.confirmationCode')} placeholder={t('TPH.PH_confirmCode')} value={confirmCode} FieldType="confirmCode" onChangeText={setConfirmCode} numericValue={true} />

      <View className="flex-row justify-center">
        <CustomButton title={t('buttons.verify')} CSSName="w-2/5 mt-7 mr-5" onPress={submitVerifyCode} />
        <View className="w-2/5">
          {resendTimer > 0 ? (
            <Text className="text-center">
              {Math.floor(resendTimer / 60)} {t('InfoMessages.min')}:{String(resendTimer % 60).padStart(2, '0')} {t('InfoMessages.sec')}
            </Text>
          ) : <Text className="text-center">00 {t('InfoMessages.min')}: 00 {t('InfoMessages.sec')} </Text>}
          <CustomButton title={t('buttons.resend')} onPress={submitResend} disabled={resendDisabled} />
        </View>
      </View>
    </View>
  </View></>
  );
};

export default Confirmation;
