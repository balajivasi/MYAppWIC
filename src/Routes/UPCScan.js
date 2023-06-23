import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UPCScan from "../Screens/UPC/UPCScan";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import UPCLanding from "../Screens/UPC/UPCLanding";

const Stack = createNativeStackNavigator();


const UPCScanStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="UPCScanStack" component={UPCScan} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.UPCScan') })} />
        <Stack.Screen name="UPCLanding" component={UPCLanding} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.UPCScan') })} />
    </Stack.Navigator>)
};

export default UPCScanStackNav;