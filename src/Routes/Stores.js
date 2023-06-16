import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stores from "../Screens/Stores";
import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
const Stack = createNativeStackNavigator();


const StoresStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Stores Stack" component={Stores} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.stores') }) }/>
    </Stack.Navigator>)
};

export default StoresStackNav;