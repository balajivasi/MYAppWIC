import React from "react";
import NotificationIcon from "./NotificationIcon";
import MenuIcon from "./MenuIcon";
import { useSelector } from "react-redux";

const MenuHeaderOption = ({ navigation, title }) => {

  return {
    headerLeft: () => <MenuIcon navigation={navigation} />,
    headerRight: () => <NotificationIcon navigation={navigation} />,
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

export const HeaderOption = () => {
  return {
    headerStyle: {
      backgroundColor: "#006666",
      color: '#fff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      color: '#fff',
    }
  };
}

export default MenuHeaderOption;
