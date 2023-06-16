import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Benefits from "../Screens/Benefits";
import BenefitsDetails from "../Screens/Benefits/BenefitsDetails";
import { useTranslation } from "react-i18next";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import Util  from '../Common/Util';

const Stack = createNativeStackNavigator();

const BenefitsStackNav = () => {
    const { t } = useTranslation();

    return (<Stack.Navigator>
        <Stack.Screen name="BenefitsStack" component={Benefits} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.benefits') }) }/>
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
        <Stack.Screen name="BenefitsDetails" component={BenefitsDetails} options={{ ...Util.ModelOptions, title: t('pageTitles.benefitsDetails') }}   />
        </Stack.Group>
        
    </Stack.Navigator>)
};

export default BenefitsStackNav;