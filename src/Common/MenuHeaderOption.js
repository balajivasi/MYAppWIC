import React from "react";
import NotificationIcon from "./NotificationIcon";
import MenuIcon from "./MenuIcon";
const MenuHeaderOption = ({ navigation, title }) => {
  return {
    headerLeft: () => <MenuIcon navigation={navigation} />,
    headerRight: () => <NotificationIcon />,
    title: title,
    headerStyle: {
        backgroundColor: "#006666",
    },
    //headerTintColor: '#f00',
    //activeTintColor: '#f00',
    headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#fff",
    }
  };
};

export default MenuHeaderOption;
