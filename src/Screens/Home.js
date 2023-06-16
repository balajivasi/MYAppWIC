import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Footer from "../Common/Footer";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const user =useSelector((state)=>state.user)
  const { t } =useTranslation();
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
