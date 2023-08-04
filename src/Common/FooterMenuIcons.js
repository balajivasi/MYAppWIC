import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { BuildingOfficeIcon, CalendarDaysIcon, CreditCardIcon, GlobeAltIcon, ShoppingCartIcon, ArrowUpTrayIcon, DocumentTextIcon, PowerIcon } from "react-native-heroicons/outline";

const ImagePaths = {
  "Clinic": <BuildingOfficeIcon size={40} color={'#ff0000'} />,
  "stores": <ShoppingCartIcon size={40} color={'#ff9933'} />,
  "Resources": <GlobeAltIcon size={40} color={'#99cc66'} />,
  "Logout": <PowerIcon size={40} color={'#f00'} />,
  "Appointments": <CalendarDaysIcon size={40} color={'#339900'} />,
  "EbtCard": <CreditCardIcon size={40} color={'#99cc66'} />,
  "Signatures": <DocumentTextIcon size={40} color={'#ed5d09'} />,
  "Upload": <ArrowUpTrayIcon size={40} color={'#ff9933'} />,
  "UPCScan": ""
};


const FooterMenuIcons = ({ title, onPress, CSSName, ImgSrc }) => {
  const buttonStyle = `border w-1/3 py-5 border-gray-300 rounded-sm  ${CSSName}`;

  return (
    <TouchableOpacity className={buttonStyle} onPress={onPress}>
      <View className="mx-auto">{ImagePaths[ImgSrc]}</View>
      <Text className="text-base pt-2 text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterMenuIcons;
