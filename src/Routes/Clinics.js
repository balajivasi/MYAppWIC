import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clinics from "../Screens/Clinics";

import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
const Stack = createNativeStackNavigator();


const ClinicsStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Clinics Stack" component={Clinics} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.clinics') }) }/>
    </Stack.Navigator>)
};

export default ClinicsStackNav;