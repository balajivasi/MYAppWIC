import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { SignaturesService } from '../Services/apiService';
import { useTranslation } from 'react-i18next';
import SignatureList from '../Common/SignatureList';
import ErrorText from '../Common/ErrorText';
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';
import { setLoading } from '../slices/loaderSlice';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';

export default function Signatures({ navigation }) {
  const { t } = useTranslation();
  const Token = useSelector(state => state.user.Token);
  const user = useSelector(state => state.user);
  const [serverError, setServerError] = useState('');
  const [signature, setSignature] = useState([]);
  const dispatch = useDispatch()
  const ActiveCardNumber = useSelector(state => state.user.EBTCardNumber);
  const loadSignatures = async () => {
    dispatch(setLoading(true));
    try {
      const response = await SignaturesService(Token, user.language);
      if (response?.Status === 1) {
        setSignature(response.ServiceResponse)
      } else {
        setServerError(response.ServiceResponse[0].Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Signature list failed', error);
    }
    dispatch(setLoading(false));
  }
  const handleSelect = (signature) => {
    navigation.push('SignaturesDetails', { signature: signature, pageTitle: 'Signature Details' });
  }

  useEffect(() => {
    loadSignatures()
  }, [ActiveCardNumber])
  return (
    <View className="min-h-full">
      <ScrollView className="flex-1">
        {serverError ? <ErrorText message={serverError} /> : null}
        {signature ? <View className=" w-11/12 mx-auto mt-4">
          {signature.map((signature, index) => <SignatureList key={index} data={signature} selectSign={() => handleSelect(signature)} />)}
        </View>
          : <View className="w-screen pt-16" style={{ alignItems: "center" }}>
            <ExclamationTriangleIcon size={150} color={'gray'} />
            <Text className="text-center text-red-500">{t('pageText.noSignatureDoc')}</Text>
          </View>
        }
      </ScrollView>
    </View>
  )
}