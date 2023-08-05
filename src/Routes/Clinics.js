import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clinics from "../Screens/Clinics";
import Util from '../Common/Util';
import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import Notifications from "../Screens/Notifications";
const Stack = createNativeStackNavigator();


const ClinicsStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Clinics Stack" component={Clinics} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.clinics') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default ClinicsStackNav;