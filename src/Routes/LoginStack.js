import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingIcon from "../Common/SettingIcon";
import LoginPage from "../Screens/Login/Login";
import Settings from "../Screens/Login/Settings";
import Register from "../Screens/Login/Register";
import ForgotPassword from "../Screens/Login/ForgotPassword";
import Util from '../Common/Util'
import { useTranslation } from "react-i18next";
import ResourceLinks from "../Screens/ResourceLinks";
import Clinics from "../Screens/Clinics";
import Stores from "../Screens/Stores";
import Confirmation from "../Screens/Login/Confirmation";
const Stack = createNativeStackNavigator();



const LoginStackNav = () => {

    const { t, i18n } = useTranslation();

    return (<Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ ...Util.LoginOption, headerRight: () => <SettingIcon /> }} />
        <Stack.Group
            screenOptions={() => ({
                presentation: 'modal',
            })}
        >
            <Stack.Screen name="Settings" component={Settings} options={{...Util.ModelOptions, title:t('pageTitles.settings')}} />
            <Stack.Screen name="Register" component={Register}  options={{...Util.ModelOptions, title:t('pageTitles.register')}}  />
            <Stack.Screen name="Confirmation" component={Confirmation}  options={{...Util.ModelOptions, title:t('pageTitles.confirmation')}}  />
            <Stack.Screen name="Resource" component={ResourceLinks}  options={{...Util.ModelOptions, title:t('pageTitles.resourceLinks')}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{...Util.ModelOptions, title:t('pageTitles.forgotPassword')}} />
        </Stack.Group>
        
        <Stack.Screen name="Clinics" component={Clinics} options={{ ...Util.LoginOption, title:t('pageTitles.clinics') }} />
        <Stack.Screen name="Stores" component={Stores} options={{ ...Util.LoginOption, title:t('pageTitles.stores') }} />

    </Stack.Navigator>)
};

export default LoginStackNav;