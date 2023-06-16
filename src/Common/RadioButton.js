import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const RadioButton = ({ options, selectedOption, onRadioButtonChange }) => {
    
  return (
    <View>
      {options.map((option,index) => (
        <TouchableOpacity className="flex-row justify-start my-2" key={index} onPress={() => onRadioButtonChange(option.SigneeID)} >
          <View className={`w-5 h-5 rounded-3xl border-2 border-black mt-1 mr-1 ${selectedOption == option.SigneeID ? ' bg-sky-500' : ''}`} />
          <Text className="text-lg leading-5">{option.Description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default RadioButton;
