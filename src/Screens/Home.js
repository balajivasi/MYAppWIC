import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Common/Footer";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { handleInvalidWICAccount } from "../Common/handleInvalidWICAccount";
import { AppointmentsService, NotificationService } from "../Services/apiService";
import { setAppointments, setNotifications } from "../slices/PreDataSlice";

export default function Home({ navigation }) {
  const user = useSelector((state) => state.user)
  const ActiveCardNumber = user.EBTCardNumber;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [notificationLength, setNotificationLength] = useState(null)

  const getNotificationData = async () => {
    try {
      const response = await NotificationService(user.Token, user.language);
      if (response.Status === 1) {
        dispatch(setNotifications(response.ServiceResponse));
        setNotificationLength(response.ServiceResponse.length)
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
  const getAppointments = async () => {
    try {
      const response = await AppointmentsService(user.Token);
      if (response?.Status === 1) {
        dispatch(setAppointments(response.ServiceResponse))
      } else {
        try {
          await handleInvalidWICAccount(response, dispatch);
        } catch (error) {
          console.log('handleInvalidWICAccount failed.', error)
        }
      }
    } catch (error) {
      console.error('Registration failed', error);
    }

  }

  useEffect(() => {
    getNotificationData();
    getAppointments();
    navigation.setOptions({
      NotificationsCount: notificationLength,
    });
  }, [ActiveCardNumber, notificationLength])

  return (
    <SafeAreaView>
      <View className="min-h-full">
        <ScrollView>
          <Image
            className="mx-auto my-5 rounded-2xl"
            source={require("../../assets/Images/EbtCard.jpg")}
            style={{ width: 300, height: 175 }}
          />
          <Text className="mx-auto mt-8 text-xl">{t('hello')} {user.fullName}</Text>
        </ScrollView>
        <Footer page="login" />
      </View>
    </SafeAreaView>
  );
}
