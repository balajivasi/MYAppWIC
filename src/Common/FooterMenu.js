import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";

const ImagePaths = {
  "Clinic": require("../../assets/Images/Clinic.png"),
  "stores": require("../../assets/Images/stores.png"),
  "Resources": require("../../assets/Images/Resources.png"),
  "Logout": require("../../assets/Images/Logout.png"),
  "Appointments": require("../../assets/Images/Appointments.png"),
  "EbtCard": require("../../assets/Images/Benefits.png"),
  "UPCScan": require("../../assets/Images/UPCScan.png"),
};


const FooterMenu = ({ title, onPress, CSSName, ImgSrc }) => {
  const buttonStyle = `border w-1/3 py-5 border-gray-300 rounded-sm  ${CSSName}`;

  const imageSource = ImgSrc ? ImagePaths[ImgSrc] : null;
  return (
    <TouchableOpacity className={buttonStyle} onPress={onPress}>
      {(imageSource && ImgSrc == "EbtCard") ? <Image source={imageSource} className="mx-auto mt-3" style={{ width: 50, height: 35 }} /> : <Image source={imageSource} className="mx-auto" style={{ width: 52, height: 47 }} />}
      <Text className="text-base pt-5 text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterMenu;
