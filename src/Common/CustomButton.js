import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, onPress, CSSName, disabled = false }) => {


  const buttonStyle = disabled ? `bg-gray-300 mb-5 mt-3 rounded-lg p-3  ${CSSName}` : `bg-orange-400 mb-5 mt-3 rounded-lg p-3  ${CSSName}`;

  return (
    <TouchableOpacity className={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text className="text-center text-white text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
