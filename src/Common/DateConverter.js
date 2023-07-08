import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View, Text } from 'react-native';

const DateConverter = ({ label, value, onChangeText, validate = false, FieldType, placeholder, dateFormat }) => {
    const [error, setError] = useState('');

    const handleDateChange = (text) => {
        const formattedDate = formatToDate(text);
        onChangeText(formattedDate);
        if (validate) {
            DateValidation(formattedDate);
        }
    };

    const DateValidation = (text) => {
        if (text === undefined || text.trim().length === 0) {
            setError('Field is required');
        } else if (!isValidDate(text)) {
            setError('Invalid date');
        } else {
            setError('');
        }
    };

    const isValidDate = (inputDate) => {
        // Assuming inputDate is in the format "mm/dd/yyyy"
        const [month, day, year] = inputDate.split('/');

        const date = new Date(year, month - 1, day);
        return (
            date.getFullYear() === Number(year) &&
            date.getMonth() === Number(month) - 1 &&
            date.getDate() === Number(day)
        );
    };

    const formatToDate = (input) => {
        const cleanedInput = input.replace(/\D/g, '');

        if (cleanedInput.length === 0) {
            return '';
        }

        let formattedDate = '';

        if (cleanedInput.length > 0) {
            formattedDate += cleanedInput.substring(0, 2);
        }
        if (cleanedInput.length > 2) {
            formattedDate += '/' + cleanedInput.slice(2, 4);
        }
        if (cleanedInput.length > 4) {
            formattedDate += '/' + cleanedInput.slice(4, 8);
        }

        return formattedDate;
    };

    const formatMonth = (month) => {
        const numericMonth = parseInt(month, 10);
        if (numericMonth < 1) {
            return '01';
        } else if (numericMonth > 12) {
            return '12';
        } else if (numericMonth < 10) {
            return `0${numericMonth}`;
        } else {
            return month;
        }
    };

    const inputStyle = `rounded-lg border-y border-x px-4 h-12 pb-1 text-2xl ${error ? 'border-red-400' : 'border-gray-300'}`;
    return (
        <View className="w-4/5 my-1 mx-auto">
            <Text className="text-xl">{label}</Text>
            <View>
                <TextInput
                    className={inputStyle}
                    value={value}
                    keyboardType="numeric"
                    onChangeText={handleDateChange}
                    placeholder={placeholder}
                />
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            </View>
        </View>
    );
};

export default DateConverter;
