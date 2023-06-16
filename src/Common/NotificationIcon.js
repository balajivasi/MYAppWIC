import { View, Text } from 'react-native'
import React from 'react'
import { BellAlertIcon } from "react-native-heroicons/outline";
import { Link } from '@react-navigation/native';
export default function NotificationIcon() {
  return (
    <View>
      <Link to={{screen:'Notifications'}}><BellAlertIcon color={"#fff"} size={33} /></Link>
    </View>
  )
}