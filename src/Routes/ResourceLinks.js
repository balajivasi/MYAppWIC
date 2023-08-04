import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourceLinks from "../Screens/ResourceLinks";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import Notifications from "../Screens/Notifications";
import Util from '../Common/Util';
const Stack = createNativeStackNavigator();


const ResourceStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Resource Stack" component={ResourceLinks} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.resourceLinks') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default ResourceStackNav;