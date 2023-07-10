import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const CustomTextInput = ({ placeholder, label, FieldType, value, onChangeText, secureTextEntry = false, validate = false, passwordValue, numericValue = false, Disable = true }) => {
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.fieldRequired'));
    } else {
      setError('');
    }
  };

  const handleEmailValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.emailRequired'));
    } else if (validate && !isValidEmail(text)) {
      setError(t('errorMessages.ValidEmail'));
    } else {
      setError('');
    }
  };

  const handlePasswordValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.PasswordRequired'));
    } else if (validate && text.length < 6) {
      setError(t('errorMessages.Password6Long'));
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.confirmPasswordRequired'));
    } else if (validate && text.length < 6) {
      setError(t('errorMessages.confirmPassword6Long'));
    } else if (validate && text !== passwordValue) {
      setError(t('errorMessages.passwordMismatch'));
    } else {
      setError('');
    }
  };

  const handleWicEbtNumberValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.WicEbtNumberRequired'));
    } else if (validate && text.length !== 16) {
      setError(t('errorMessages.WicEbtNumberInvalid'));
    } else {
      setError('');
    }
  };

  const handleBirthDateValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.BirthDateRequired'));
    } else if (validate && !isValidBirthDate(text)) {
      setError(t('errorMessages.BirthDateInvalid'));
    } else {
      setError('');
    }
  };

  const handleZipCodeValidation = (text) => {
    if (validate && (text === undefined || text.trim().length === 0)) {
      setError(t('errorMessages.ZipCodeRequired'));
    } else if (validate && (text.length !== 5 || !isNumeric(text))) {
      setError(t('errorMessages.ZipCodeInvalid'));
    } else {
      setError('');
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidBirthDate = (birthDate) => {
    const birthDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return birthDateRegex.test(birthDate);
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const inputStyle = `rounded-lg border-y border-x px-4 h-12 pb-1 text-2xl ${error ? 'border-red-400' : 'border-gray-300'}`;

  const handleBlur = () => {
    if (validate) {
      switch (FieldType) {
        case 'Email':
          handleEmailValidation(value);
          break;
        case 'Password':
          handlePasswordValidation(value);
          break;
        case 'ConfirmPassword':
          handleConfirmPasswordValidation(value);
          break;
        case 'WicEbtNumber':
          handleWicEbtNumberValidation(value);
          break;
        case 'BirthDate':
          handleBirthDateValidation(value);
          break;
        case 'ZipCode':
          handleZipCodeValidation(value);
          break;
        default:
          handleValidation(value);
          break;
      }
    }
  };


  return (
    <View className="w-4/5 my-1 mx-auto">
      <Text className="text-xl">{label}</Text>
      <View>
        <TextInput
          className={inputStyle}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          keyboardType={numericValue ? 'numeric' : (FieldType == "Email" ? 'email-address' : undefined)}
          onBlur={handleBlur}
          editable={Disable}
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      </View>
    </View>

  );
};

export default CustomTextInput;
