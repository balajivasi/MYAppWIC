
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
import UPCScanStackNav from "./UPCScan";
import { ArrowLeftOnRectangleIcon, ArrowUpTrayIcon, BuildingOfficeIcon, CalendarDaysIcon, CreditCardIcon, DocumentTextIcon, GlobeAltIcon, HomeIcon, LockClosedIcon, PencilIcon, PencilSquareIcon, ShoppingCartIcon } from "react-native-heroicons/outline";

const Drawer = createDrawerNavigator();

const FLDrawer = () => {
    const dispatch = useDispatch();

    const LogOut = () => dispatch(logoutUser())

    const CustomDrawer = (props) => {
        return <DrawerContentScrollView {...props}>
            <Profile />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    }

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />} >
            <Drawer.Screen name="Home" component={HomeStackNav} options={{ drawerIcon: () => <HomeIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Manage EBT Account" component={EBTCardStackNav} options={{ drawerIcon: () => <PencilSquareIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Appointments" component={AppointmentsStackNav} options={{ drawerIcon: () => <CalendarDaysIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Benefits" component={BenefitsStackNav} options={{ drawerIcon: () => <CreditCardIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Clinics" component={ClinicsStackNav} options={{ drawerIcon: () => <BuildingOfficeIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Stores" component={StoresStackNav} options={{ drawerIcon: () => <ShoppingCartIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Change Password" component={ChangePassStackNav} options={{ drawerIcon: () => <LockClosedIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Signatures" component={SignaturesStackNav} options={{ drawerIcon: () => <DocumentTextIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Feedback" component={FeedbackStackNav} options={{ drawerIcon: () => <PencilIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Resource Links" component={ResourceStackNav} options={{ drawerIcon: () => <GlobeAltIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="Upload Documents" component={UploadDocumentsStackNav} options={{ drawerIcon: () => <ArrowUpTrayIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
            <Drawer.Screen name="UPCScan" component={UPCScanStackNav} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Logout" component={LogOut} options={{ drawerIcon: () => <ArrowLeftOnRectangleIcon name="fl-home" size={20} color={'red'} style={{ marginRight: -25 }} /> }} />
        </Drawer.Navigator>
    )
}

export default FLDrawer;