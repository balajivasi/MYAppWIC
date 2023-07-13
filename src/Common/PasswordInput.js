import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, View, Text, Alert } from 'react-native';
import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from 'react-native-heroicons/outline';

const PasswordInput = ({ label, value, onChangeText, validate = false, placeholder, passwordValue = null, secureTextEntry = true, showInfo = true, showEye = true }) => {
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const [passwordShow, setPasswordShow] = useState(secureTextEntry)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
    const handlePasswordChange = (text) => {
        if (text.length <= 20) {
            onChangeText(text);
            if (passwordValue === null) {
                validatePassword(text);
            } else {
                validateConfirmPassword(text)
            }
        }
    };

    const validatePassword = (text) => {
        if (validate && (text === undefined || text.trim().length === 0)) {
            setError(t('errorMessages.PasswordRequired'));
        } else if (validate && !passwordRegex.test(text)) {
            setError(t('errorMessages.PasswordValid'));
        } else {
            setError('');
        }
    };
    const showPasswordInfo = () => {
        Alert.alert('Info', t('InfoMessages.PasswordInfo'));
    }

    const validateConfirmPassword = (text) => {
        if (validate && (text === undefined || text.trim().length === 0)) {
            setError(t('errorMessages.confirmPasswordRequired'));
        } else if (validate && !passwordRegex.test(text)) {
            setError(t('errorMessages.PasswordValid'));
        } else if (validate && text !== passwordValue) {
            setError(t('errorMessages.passwordMismatch'));
        } else {
            setError('');
        }
    };

    const inputStyle = `rounded-lg border-y border-x flex-row ${error ? 'border-red-400' : 'border-gray-300'}`;
    return (
        <View className="w-4/5 my-1 mx-auto">
            <Text className="text-xl">{label}</Text>
            <View className={inputStyle} style={{ alignItems: 'center' }}>
                <TextInput className="text-2xl px-4 h-12 pb-1 flex-1"
                    value={value}
                    secureTextEntry={passwordShow}
                    onChangeText={handlePasswordChange}
                    placeholder={placeholder}
                />
                <View className="flex-row gap-2 mr-1">
                    {showEye ? !passwordShow ? <EyeIcon size={25} color={'#f00'} onPress={() => setPasswordShow(true)} /> : <EyeSlashIcon size={25} color={'#99cc66'} onPress={() => setPasswordShow(false)} /> : null}
                    {showInfo && <InformationCircleIcon size={25} color={'#808080'} onPress={showPasswordInfo} />}
                </View>
            </View>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        </View>
    );
};

export default PasswordInput;
