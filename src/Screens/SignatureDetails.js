import { View, Text, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MobileSignatureService, SignaturesDocService } from '../Services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { WebViewReader } from '../Common/WebView';
import RadioButton from '../Common/RadioButton';
import CustomButton from '../Common/CustomButton';
import Sign from '../Common/Sign';
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';
import { setLoading } from '../slices/loaderSlice';


const SignatureDetails = ({ navigation, route }) => {
  const signature = route.params.signature;
  const Token = useSelector(state => state.user.Token);
  const user = useSelector(state => state.user);
  const [signatureDoc, setSignatureDoc] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [signatureData, setSignatureData] = useState(null);
  const [serverError, setServerError] = useState('');
  const dispatch = useDispatch()
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
      return (<>
        <View className="mt-5 flex-col">
          <Text className="text-base">{signatureDoc.Signee[0]?.Description}</Text>
          <Image className="border w-auto h-32 mt-5 border-gray-200" source={{ uri: base64Icon }} resizeMode="stretch" />
        </View>
      </>)
    }
    if (signatureDoc.CompletedStatus === 0) {
      return (<>{<View className="w-11/12">
        {signatureDoc.Signee ? <RadioButton options={signatureDoc.Signee} selectedOption={selectedOption} onRadioButtonChange={handleRadioButtonChange} /> : null}
      </View>}
        <View className="w-full h-40">
          <Sign onOK={getSign} onClear={handleClear} />
        </View>
        <CustomButton title="Save" onPress={saveSignature} disabled={(selectedOption && signatureData != null) ? false : true} /></>)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: signatureDoc.DocName,
    });
  }, [navigation,signatureDoc]);

  return (
    <View className="mt-2">
      {/* <Text className="text-2xl mx-auto mb-2">{signatureDoc.DocName}</Text> */}
      {serverError ? <ErrorText message={serverError} /> : null}
      <View className="min-h-screen w-11/12 mx-auto flex">
        <WebViewReader Data={signatureDoc.Document} className="grow" />
        <View className="h-4/6 w-11/12 mx-auto">
          {GetSign()}
        </View>
      </View>
    </View>
  )
}

export default SignatureDetails