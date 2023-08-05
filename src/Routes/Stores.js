import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stores from "../Screens/Stores";
import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import Notifications from "../Screens/Notifications";
import Util from '../Common/Util';
const Stack = createNativeStackNavigator();


const StoresStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Stores Stack" component={Stores} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.stores') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default StoresStackNav;