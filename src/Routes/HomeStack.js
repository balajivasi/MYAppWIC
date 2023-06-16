import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Notifications from "../Screens/Notifications";
import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import Util  from '../Common/Util';
const Stack = createNativeStackNavigator();

const HomeStackNav = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.home') }) } />
      <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{...Util.ModelOptions,title:t('pageTitles.notifications') }} />
        </Stack.Group>

    </Stack.Navigator>
  );
};

export default HomeStackNav;
