import { View, Text } from 'react-native'
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { REACT_APP_VERSION } from '../../env';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <View className="flex-col w-full border-b pb-3 border-b-gray-300">
      <Text className="text-center text-lg">{t('welcome')} {user.fullName}</Text>
      <Text className="text-center text-lg">{user.email}</Text>
    </View>
  )
}

const AppVersion = () => {
  const { t } = useTranslation();
  return (<View className="border-t border-gray-300 w-full py-3">
    <Text className="text-base text-center">{t('version')}: {REACT_APP_VERSION}</Text>
  </View>)
}

export default CustomDrawer = (props) => {
  return (
    <View className="flex-1 mt-10">
      <Profile />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <AppVersion />
    </View>
  );
};