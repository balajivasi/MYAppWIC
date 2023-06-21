import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UPCScan from "../Screens/UPCScan";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();


const UPCScanStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="UPCScan Stack" component={UPCScan} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.UPCScan') })} />
    </Stack.Navigator>)
};

export default UPCScanStackNav;