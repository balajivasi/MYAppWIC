import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResourceLinks from "../Screens/ResourceLinks";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();


const ResourceStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Resource Stack" component={ResourceLinks} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.resourceLinks') }) }/>
    </Stack.Navigator>)
};

export default ResourceStackNav;