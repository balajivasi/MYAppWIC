
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch } from 'react-redux';
import { ArrowLeftOnRectangleIcon, ArrowUpTrayIcon, BuildingOfficeIcon, CalendarDaysIcon, CreditCardIcon, DocumentTextIcon, GlobeAltIcon, HomeIcon, LockClosedIcon, PencilIcon, PencilSquareIcon, ShoppingCartIcon, UserGroupIcon } from "react-native-heroicons/outline";
import { useTranslation } from "react-i18next";
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
import CustomDrawer from "../Common/CustomDrawer";
import { logoutUser } from '../Services/authActions';
import UPCScanStackNav from "./UPCScan";


const Drawer = createDrawerNavigator();

const FLDrawer = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const LogOut = () => dispatch(logoutUser())
    const IconColor = '#ff9933';
    const IconSize = 24;

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />} >
            <Drawer.Screen name="Home" component={HomeStackNav} options={{ drawerIcon: () => <HomeIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.home') }} />
            <Drawer.Screen name="Manage EBT Account" component={EBTCardStackNav} options={{ drawerIcon: () => <UserGroupIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.manageEBTAccount') }} />
            <Drawer.Screen name="Appointments" component={AppointmentsStackNav} options={{ drawerIcon: () => <CalendarDaysIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.appointments') }} />
            <Drawer.Screen name="Benefits" component={BenefitsStackNav} options={{ drawerIcon: () => <CreditCardIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.benefits') }} />
            <Drawer.Screen name="Clinics" component={ClinicsStackNav} options={{ drawerIcon: () => <BuildingOfficeIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.clinics') }} />
            <Drawer.Screen name="Stores" component={StoresStackNav} options={{ drawerIcon: () => <ShoppingCartIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.stores') }} />
            <Drawer.Screen name="Signatures" component={SignaturesStackNav} options={{ drawerIcon: () => <DocumentTextIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.signatures') }} />
            <Drawer.Screen name="Upload Documents" component={UploadDocumentsStackNav} options={{ drawerIcon: () => <ArrowUpTrayIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.uploadDocuments') }} />
            <Drawer.Screen name="Resource Links" component={ResourceStackNav} options={{ drawerIcon: () => <GlobeAltIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.resourceLinks') }} />
            <Drawer.Screen name="Feedback" component={FeedbackStackNav} options={{ drawerIcon: () => <PencilSquareIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.feedback') }} />
            <Drawer.Screen name="Change Password" component={ChangePassStackNav} options={{ drawerIcon: () => <LockClosedIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.changePassword') }} />
            <Drawer.Screen name="Logout" component={LogOut} options={{ drawerIcon: () => <ArrowLeftOnRectangleIcon name="fl-home" size={IconSize} color={IconColor} style={{ marginRight: -25 }} />, title: t('pageTitles.logOut') }} />
            <Drawer.Screen name="UPCScan" component={UPCScanStackNav} options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer.Navigator>
    )
}

export default FLDrawer;