import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadDocuments from "../Screens/UploadDoc/UploadDocuments";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
import Notifications from "../Screens/Notifications";
import Util from '../Common/Util';
const Stack = createNativeStackNavigator();


const UploadDocumentsStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Upload Documents  Stack" component={UploadDocuments} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.uploadDocuments') })} />
        <Stack.Group screenOptions={() => ({ presentation: 'modal' })}>
            <Stack.Screen name="Notifications" component={Notifications} options={{ ...Util.ModelOptions, title: t('pageTitles.notifications') }} />
        </Stack.Group>
    </Stack.Navigator>)
};

export default UploadDocumentsStackNav;