import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BellAlertIcon } from "react-native-heroicons/outline";
import { useSelector } from 'react-redux';

export default function NotificationIcon({ navigation }) {
  const [length, setLength] = useState()
  const Notifications = useSelector(state => state.preData.Notifications);

  useEffect(() => {
    setLength(Notifications.length)
  }, [Notifications]);

  onPressButton = () => {
    navigation.push('Notifications')
  }

  return (
    <TouchableOpacity className="relative" onPress={onPressButton}>
      <BellAlertIcon color={"#fff"} size={33} />
      <View className="absolute right-3 top-0 z-50"><Text className="text-red-600 text-lg font-bold">{length}</Text></View>
    </TouchableOpacity>
  )
}