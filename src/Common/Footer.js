import { View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../Services/authActions";
import FooterMenu from './FooterMenu';
import { useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import FooterMenuIcons from "./FooterMenuIcons";
import AppointmentsFooterIcon from "./AppointmentsFooterIcon";
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
      {!isLoggedIn && <><FooterMenuIcons title={t('pageTitles.clinics')} ImgSrc="Clinic" onPress={() => { navigation.navigate('Clinics') }} />
        <FooterMenuIcons title={t('pageTitles.stores')} ImgSrc="stores" onPress={() => { navigation.navigate('Stores') }} />
        <FooterMenuIcons title={t('pageTitles.resourceLinks')} ImgSrc="Resources" onPress={() => { navigation.navigate('Resource') }} /></>}
      {isLoggedIn && <>
        <FooterMenuIcons title={t('pageTitles.signatures')} ImgSrc="Signatures" onPress={() => { navigation.navigate('Signatures') }} />
        <FooterMenuIcons title={t('pageTitles.uploadDocuments')} ImgSrc="Upload" onPress={() => { navigation.navigate('Upload Documents') }} />
        <FooterMenuIcons title={t('pageTitles.logOut')} ImgSrc="Logout" onPress={() => { dispatch(logoutUser()) }} />
        <AppointmentsFooterIcon title={t('pageTitles.appointments')} ImgSrc="Appointments" onPress={() => { navigation.navigate('Appointments') }} />
        <FooterMenuIcons title={t('pageTitles.benefits')} ImgSrc="EbtCard" onPress={() => { navigation.navigate('Benefits') }} />
        <FooterMenu title={t('pageTitles.UPCScan')} ImgSrc="UPCScan" onPress={resetUPCScanStack} />
      </>}
    </View>
  );
};

export default Footer;
