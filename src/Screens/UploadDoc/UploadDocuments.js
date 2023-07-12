import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import UploadInfo from '../../Common/UploadInfo'
import UploadSelectMethod from '../../Common/UploadSelectMethod';
import TakeAPicture from './TakeAPicture';
import SelectPhoto from './SelectPhoto';
import UploadFIle from './UploadFIle';
import { UploadDocService } from '../../Services/apiService';
import { handleInvalidWICAccount } from '../../Common/handleInvalidWICAccount';
import { useDispatch, useSelector } from 'react-redux';

export default function UploadDocuments({ navigation }) {
  const [showUploadInfo, setShowUploadInfo] = useState(true);
  const [showUploadPageInfo, setShowUploadPageInfo] = useState(false);
  const [method, setMethod] = useState("");
  const [serverError, setServerError] = useState();
  const [success, setSuccess] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const continueClick = () => {
    setShowUploadPageInfo(true);
    setShowUploadInfo(false)
  }
  const selectedMethod = (selectedMethod) => {
    switch (selectedMethod) {
      case 'camera':
      case 'file':
      case 'photo':
        setMethod(selectedMethod);
        setShowUploadPageInfo(false);
        setShowUploadInfo(false)
        break;
      case 'Info':
        setShowUploadPageInfo(false);
        setShowUploadInfo(true)
        break;
      default:
        console.log('[UploadDocuments][selectedMethod]', selectedMethod)
        break;
    }

  }

  const cancelClicked = () => {
    continueClick();
    setMethod("");
    console.log('cancelHandler');
  }
  const getDocumentPic = (FileDoc) => {
    uploadDocument(FileDoc)
  }

  const uploadDocument = async (FileDoc) => {
    try {
      const response = await UploadDocService(user.Token, 'png', "Notes test", FileDoc);
      console.log('[uploadDocument]', response)
      if (response.Status === 1) {
        setSuccess(response.ServiceResponse);
      } else {
        setServerError(response.ServiceResponse[0].Message);
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch {
      console.error('Upload Documents Failed', error);
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowUploadInfo(true);
      setShowUploadPageInfo(false);
      setMethod("");
    });

    return unsubscribe;
  }, [navigation]);
  return (<View>
    {showUploadInfo && <UploadInfo continueClick={continueClick} />}
    {showUploadPageInfo && <UploadSelectMethod selectedMethod={selectedMethod} />}
    {method === 'camera' && <TakeAPicture getDocumentPic={getDocumentPic} navigation={navigation} cancelClicked={cancelClicked} />}
    {method === 'photo' && <SelectPhoto cancelClicked={cancelClicked} navigation={navigation} getDocumentPic={getDocumentPic} />}
    {method === 'file' && <UploadFIle cancelClicked={cancelClicked} navigation={navigation} getDocumentPic={getDocumentPic} />}
  </View>
  )
}