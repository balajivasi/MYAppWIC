import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UPCScan from "../Screens/UPC/UPCScan";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import UPCLanding from "../Screens/UPC/UPCLanding";
import UPCSubmit from "../Screens/UPC/UPCSubmit";
import UPCScanInfo from "../Screens/UPC/UPCScanInfo";
import UPCSubmitProduct from "../Screens/UPC/UPCSubmitProduct";
import UPCSubmitLabel from "../Screens/UPC/UPCSubmitLabel";
import UPCSubmitDetails from "../Screens/UPC/UPCSubmitDetails";

const Stack = createNativeStackNavigator();


const UPCScanStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        {/* <Stack.Screen name="UPCScanStack" component={UPCScan} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.UPCScan') })} /> */}
        <Stack.Screen name="UPCLanding" component={UPCLanding} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.UPCScan') })} />

        <Stack.Screen name="UPCScanInfo" component={UPCScanInfo} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.submitUPC') })} />
        <Stack.Screen name="UPCSubmitProduct" component={UPCSubmitProduct} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.submitUPC') })} />
        <Stack.Screen name="UPCSubmitLabel" component={UPCSubmitLabel} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.submitUPC') })} />
        <Stack.Screen name="UPCSubmitDetails" component={UPCSubmitDetails} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.submitUPC') })} />
        <Stack.Screen name="UPCSubmit" component={UPCSubmit} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.submitUPC') })} />
    </Stack.Navigator>)
};

export default UPCScanStackNav;