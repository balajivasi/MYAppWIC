import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function Notifications() {
  const Notifications = useSelector(state => state.preData.Notifications);
  const [NotificationData, setNotificationData] = useState(Notifications);

  return (
    <View className="w-4/5 mx-auto mt-7">
      {NotificationData.map((data, index) => (
        <Text key={index} className="text-base mb-5">{data.Message}</Text>
      ))}
    </View>
  )
}
