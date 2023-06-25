import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

const PhoneNumberInput = ({ label, value, onChangeText }) => {
    const [error, setError] = useState('');
    const formatPhoneNumber = (number) => {
        const cleanedNumber = number.replace(/\D/g, '');
        let formattedNumber = '';

        if (cleanedNumber.length > 0) {
            formattedNumber += '(' + cleanedNumber.substring(0, 3) + ')';
        }
        if (cleanedNumber.length > 3) {
            formattedNumber += '-' + cleanedNumber.substring(3, 6);
        }
        if (cleanedNumber.length > 6) {
            formattedNumber += '-' + cleanedNumber.substring(6, 10);
        }

        return formattedNumber;
    };

    const handlePhoneNumberChange = (text) => {
        const formattedNumber = formatPhoneNumber(text);
        onChangeText(formattedNumber);
    };

    const inputStyle = `rounded-lg border-y border-x px-4 h-12 pb-1 text-2xl ${error ? 'border-red-400' : 'border-gray-300'}`;

    return (
        <View className="w-4/5 my-1 mx-auto">
            <Text className="text-xl">{label}</Text>
            <View>
                <TextInput
                    className={inputStyle}
                    value={value}
                    onChangeText={handlePhoneNumberChange}
                    placeholder="(000)-000-0000"
                />
            </View>
        </View>
    );
};

export default PhoneNumberInput;
