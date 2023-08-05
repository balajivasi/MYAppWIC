import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageEBTAccount from "../Screens/ManageEBTAccount";
import AddCard from "../Screens/ManageEBTAccount/AddCard";
import EditNickName from "../Screens/ManageEBTAccount/EditNickName";

import Util from '../Common/Util';

import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import Notifications from "../Screens/Notifications";


const Stack = createNativeStackNavigator();


const EBTCardStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="ManageEBTAccount" component={ManageEBTAccount} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.manageEBTAccount') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="AddCard" component={AddCard} options={Util.ModelOptions} />
            <Stack.Screen name="EditNickName" component={EditNickName} options={{ ...Util.ModelOptions, title: t('pageTitles.editNickname') }} />
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default EBTCardStackNav;