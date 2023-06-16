
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import HomeStackNav from "./HomeStack";
import EBTCardStackNav from "./EBTCardStack";
import AppointmentsStackNav from "./Appointments";
import BenefitsStackNav from "./Benefits";
import ClinicsStackNav from "./Clinics";
import StoresStackNav from "./Stores";
import ChangePassStackNav from "./ChangePassword";
import SignaturesStackNav from "./Signatures";
import FeedbackStackNav from "./Feedback";
import ResourceStackNav from "./ResourceLinks";
import UploadDocumentsStackNav from "./UploadDocuments";
import Profile from "../Common/Profile";
import { logoutUser } from '../Services/authActions';
import { useDispatch } from 'react-redux';

const Drawer = createDrawerNavigator();

const FLDrawer = () => {
    const dispatch = useDispatch();

    const LogOut = () =>  dispatch(logoutUser()) 

    const CustomDrawer = (props) => {
        return <DrawerContentScrollView {...props}>
            <Profile />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    }

    return (
        <Drawer.Navigator screenOptions={{headerShown: false }} drawerContent={(props) => <CustomDrawer {...props}  />} >
            <Drawer.Screen name="Home" component={HomeStackNav}/>
            <Drawer.Screen name="Manage EBT Account" component={EBTCardStackNav} />
            <Drawer.Screen name="Appointments" component={AppointmentsStackNav} />
            <Drawer.Screen name="Benefits" component={BenefitsStackNav} />
            <Drawer.Screen name="Clinics" component={ClinicsStackNav} />
            <Drawer.Screen name="Stores" component={StoresStackNav} />
            <Drawer.Screen name="Change Password" component={ChangePassStackNav} />
            <Drawer.Screen name="Signatures" component={SignaturesStackNav} />
            <Drawer.Screen name="Feedback" component={FeedbackStackNav} />
            <Drawer.Screen name="Resource Links" component={ResourceStackNav} />
            <Drawer.Screen name="Upload Documents" component={UploadDocumentsStackNav} />
            <Drawer.Screen name="Logout" component={LogOut}  />
        </Drawer.Navigator>
    )
}

export default FLDrawer;