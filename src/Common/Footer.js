import { View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../Services/authActions";
import FooterMenu from './FooterMenu';
import { useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FooterMenuIcons from "./FooterMenuIcons";
const Footer = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation();

  const resetUPCScanStack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'UPCScan' }]
      })
    );
  };


  return (
    <View className="flex-row flex-wrap-reverse mx-auto">
      <FooterMenuIcons title={t('footerIcon.clinics')} ImgSrc="Clinic" onPress={() => { navigation.navigate('Clinics') }} />
      <FooterMenuIcons title={t('footerIcon.stores')} ImgSrc="stores" onPress={() => { navigation.navigate('Stores') }} />
      {!isLoggedIn && <FooterMenuIcons title={t('footerIcon.resourceLinks')} ImgSrc="Resources" onPress={() => { navigation.navigate('Resource') }} />}
      {isLoggedIn && <>
        <FooterMenuIcons title={t('footerIcon.logOut')} ImgSrc="Logout" onPress={() => { dispatch(logoutUser()) }} />
        <FooterMenuIcons title={t('footerIcon.appointments')} ImgSrc="Appointments" onPress={() => { navigation.navigate('Appointments') }} />
        <FooterMenuIcons title={t('footerIcon.benefits')} ImgSrc="EbtCard" onPress={() => { navigation.navigate('Benefits') }} />
        <FooterMenu title={t('footerIcon.UPCScan')} ImgSrc="UPCScan" onPress={resetUPCScanStack} />
      </>}
    </View>
  );
};

export default Footer;
