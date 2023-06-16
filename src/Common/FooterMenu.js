import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const ImagePaths = {
    "Clinic": require("../../assets/Images/Clinic.png"),
    "stores": require("../../assets/Images/stores.png"),
    "Resources": require("../../assets/Images/Resources.png"),
    "Logout": require("../../assets/Images/Logout.png"),
   // "appointments": require("../assets/Images/appointments.png"),
    "EbtCard": require("../../assets/Images/EbtCard.jpg"),
    "UPCScan": require("../../assets/Images/UPCScan.png"),
  };


const FooterMenu = ({ title, onPress, CSSName, ImgSrc }) => {
  const buttonStyle = `border w-1/3 py-5 border-gray-300 rounded-sm  ${CSSName}`;

  const imageSource = ImgSrc ? ImagePaths[ImgSrc] : null;
  return (
    <TouchableOpacity className={buttonStyle} onPress={onPress}>
      {imageSource && (
        <Image source={imageSource} className="mx-auto"  style={{ width: 53, height: 50 }} />
      )}
      <Text className="text-base pt-5 text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterMenu;
