import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MobileSignatureService, SignaturesDocService } from '../Services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { WebViewReader } from '../Common/WebViewReader';
import RadioButton from '../Common/RadioButton';
import CustomButton from '../Common/CustomButton';
import Sign from '../Common/Sign';
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';
import { setLoading } from '../slices/loaderSlice';
import { useTranslation } from 'react-i18next';


const SignatureDetails = ({ navigation, route }) => {
  const signature = route.params.signature;
  const Token = useSelector(state => state.user.Token);
  const user = useSelector(state => state.user);
  const [signatureDoc, setSignatureDoc] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [signatureData, setSignatureData] = useState(null);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleRadioButtonChange = (value) => {
    setSelectedOption(value);
  };
  const loadSignature = async () => {
    dispatch(setLoading(true));
    try {
      const response = await SignaturesDocService(Token, signature.SignDocID, signature.CLDDocID, user.language, signature.CompletedStatus);

      if (response?.Status === 1) {
        setSignatureDoc(response.ServiceResponse[0]);
      } else {
        setServerError(response.ServiceResponse[0]?.Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Signature Item failed', error);
    }
    dispatch(setLoading(false));
  }
  useEffect(() => {
    loadSignature()
  }, [])

  const saveSignature = async () => {
    try {
      const response = await MobileSignatureService(Token, signature.SignDocID, selectedOption, user.language, signatureData);
      if (response?.Status === 1) {
        setSignatureDoc(response.ServiceResponse[0]);
      } else {
        setServerError(response.ServiceResponse[0]?.Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Signature Save failed', error);
    }
  }
  const handleClear = () => {
    setSignatureData(null);
  }
  const getSign = (data) => {
    setSignatureData(data);
  }

  const GetSign = () => {
    if (signatureDoc.CompletedStatus === 1) {
      var base64Icon = `data:image/png;base64,${signatureDoc.SignatureDoc}`
      return (<View className="h-2/4 w-11/12 mx-auto">
        <View className="mt-5 flex-col">
          <Text className="text-base">{signatureDoc.Signee[0]?.Description}</Text>
          <Image className="w-auto h-32 mt-5" source={{ uri: base64Icon }} resizeMode="stretch" />
        </View>
      </View>)
    }
    if (signatureDoc.CompletedStatus === 0) {
      return (<View className="w-11/12 mx-auto">{<View className="w-11/12">
        {!selectedOption && signatureDoc.Signee ? <RadioButton options={signatureDoc.Signee} selectedOption={selectedOption} onRadioButtonChange={handleRadioButtonChange} /> : null}
      </View>}
        {selectedOption ? <><View className="w-full h-40">
          <Sign onOK={getSign} onClear={handleClear} />
        </View>
          <CustomButton title={t('buttons.save')} onPress={saveSignature} disabled={(selectedOption && signatureData != null) ? false : true} /></> : null}</View>)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: signatureDoc.DocName,
    });
  }, [navigation, signatureDoc]);

  return (
    <View className="mt-2 h-screen">
      {/* <Text className="text-2xl mx-auto mb-2">{signatureDoc.DocName}</Text> */}
      {serverError ? <ErrorText message={serverError} /> : null}
      <View className="w-11/12 mx-auto pb-28 flex">
        <ScrollView className="h-2/4">
          {signatureDoc.Document ? <WebViewReader Data={signatureDoc.Document} className="grow" /> : null}
        </ScrollView>
        <View className="h-2/4">{GetSign()}</View>
      </View>
    </View>
  )
}

export default SignatureDetails