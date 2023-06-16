import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointments from "../Screens/Appointments";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();


const AppointmentsStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="AppointmentsStack" component={Appointments} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.appointments') }) }/>
    </Stack.Navigator>)
};

export default AppointmentsStackNav;