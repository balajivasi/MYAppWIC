import { View, Text } from 'react-native'
import React from 'react'
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import { Link } from '@react-navigation/native';
export default function SettingIcon() {
  return (
    <View>
      <Link to={{screen:'Settings'}}><Cog6ToothIcon color={"#fff"} size={33} /></Link>
    </View>
  )
}