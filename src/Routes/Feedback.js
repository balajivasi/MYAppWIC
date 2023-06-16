import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feedback from "../Screens/Feedback";
import MenuHeaderOption from "../Common/MenuHeaderOption";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();


const FeedbackStackNav = () => {
    const { t } = useTranslation();
    return (<Stack.Navigator>
        <Stack.Screen name="Feedback Stack" component={Feedback} options={({ navigation }) => MenuHeaderOption({ navigation, title: t('pageTitles.feedback') }) }/>
    </Stack.Navigator>)
};

export default FeedbackStackNav;