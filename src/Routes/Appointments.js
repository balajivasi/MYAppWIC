import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointments from "../Screens/Appointments";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import Notifications from "../Screens/Notifications";
import Util from '../Common/Util';
const Stack = createNativeStackNavigator();


const AppointmentsStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="AppointmentsStack" component={Appointments} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.appointments') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default AppointmentsStackNav;