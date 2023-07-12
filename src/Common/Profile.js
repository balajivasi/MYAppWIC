import { View, Text } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { REACT_APP_VERSION } from '../../env';
export default function Profile() {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <View className="flex-col w-full border-b mb-3 pb-3  border-b-gray-300">
      <Text className="text-center text-lg">{t('welcome')} {user.fullName}</Text>
      <Text className="text-center text-lg">{user.email}</Text>
    </View>
  )
}

export const AppVersion = () => {
  const { t } = useTranslation();
  return (<View className="mx-auto my-10">
    <Text className="text-base">{t('version')}: {REACT_APP_VERSION}</Text>
  </View>)
}