import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View, Text } from 'react-native';

const PhoneNumberInput = ({ label, value, onChangeText, validate = false, FieldType }) => {
    const [error, setError] = useState('');
    const { t } = useTranslation();
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

    const handlePhoneNumberBlur = (text) => {
        if (validate && (text === undefined || text.trim().length === 0)) {
            setError(t('errorMessages.fieldRequired'));
        } else {
            setError('');
        }
    };

    const handlePhoneNumberChange = (text) => {
        const formattedNumber = formatPhoneNumber(text);
        onChangeText(formattedNumber);
    };

    const inputStyle = `rounded-lg border-y border-x px-4 h-12 pb-1 text-2xl ${error ? 'border-red-400' : 'border-gray-300'}`;

    const handleBlur = () => {
        if (validate) {
            handlePhoneNumberBlur(value);
        }
    };

    return (
        <View className="w-4/5 my-1 mx-auto">
            <Text className="text-xl">{label}</Text>
            <View>
                <TextInput
                    className={inputStyle}
                    value={value}
                    onBlur={handleBlur}
                    keyboardType="numeric"
                    onChangeText={handlePhoneNumberChange}
                    placeholder="(000)-000-0000"
                />
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            </View>
        </View>
    );
};

export default PhoneNumberInput;
