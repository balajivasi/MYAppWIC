import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signatures from "../Screens/Signatures";
import SignatureDetails from "../Screens/SignatureDetails";
import MenuHeaderOption, { HeaderOption } from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import Util from '../Common/Util';
import Notifications from "../Screens/Notifications";
const Stack = createNativeStackNavigator();


const SignaturesStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Signatures Stack" component={Signatures} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.signatures') })} />
        <Stack.Screen name="SignaturesDetails" component={SignatureDetails} options={HeaderOption} />
        {/* <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="SignaturesDetails" component={SignatureDetails} options={{...Util.ModelOptions }}/>
        </Stack.Group> */}
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default SignaturesStackNav;