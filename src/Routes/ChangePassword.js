import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePassword from "../Screens/ChangePassword";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();


const ChangePassStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Change Password Stack" component={ChangePassword} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.changePassword') })} />
    </Stack.Navigator>)
};

export default ChangePassStackNav;