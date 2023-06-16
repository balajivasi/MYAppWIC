import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ActiveCard = ({CSSName,CSSText}) => {
    const ActiveCard = useSelector(state => state.user.EBTCardNumber || state.auth.user.authData[0]?.EBTCardNumber);

    const inputStyle = `w-4/5 mx-auto mb-5 mt-3 rounded-lg p-3 bg-gray-300 ${CSSName}`;
    const TextStyle = `text-center text-lg text-black ${CSSText}`
  return (
    <View className={inputStyle}>
      <Text className={TextStyle}>{ActiveCard}</Text>
    </View>
  )
}

export default ActiveCard