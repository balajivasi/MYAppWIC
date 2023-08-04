import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NotificationService } from '../Services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { handleInvalidWICAccount } from '../Common/handleInvalidWICAccount';

export default function Notifications() {
  const user = useSelector(state => state.user);
  const [NotificationData, setNotificationData] = useState([]);
  const dispatch = useDispatch();

  const getNotificationData = async () => {
    try {
      const response = await NotificationService(user.Token, user.language);
      console.log('[getNotificationData]', response)
      if (response.Status === 1) {
        setNotificationData(response.ServiceResponse);
      } else {
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Notifications Failed', error);
    }
  }

  useEffect(() => {
    getNotificationData();
  }, []);

  return (
    <View className="w-4/5 mx-auto mt-7">
      {NotificationData.map((data, index) => (
        <Text key={index} className="text-base mb-5">{data.Message}</Text>
      ))}
    </View>
  )
}
